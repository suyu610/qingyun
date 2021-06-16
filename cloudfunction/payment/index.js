// 云函数入口文件
const cloud = require('wx-server-sdk')
var request = require('request-promise');

const config = {
  appid: 'wx573a4ffa05381ed1', //小程序AppId
  envName: 'qy-5g4ibdgl4ed1a9f1', // 小程序云开发环境ID
  mchid: '1610020186', //商户号
  partnerKey: '', //此处商户密钥
  notify_url: 'https://mp.weixin.qq.com', //这个就这样
  spbill_create_ip: '127.0.0.1' //调用微信支付API的机器IP
};

cloud.init({ 
  env: config.envName
})
const db = cloud.database();
const TcbRouter = require('tcb-router'); //云函数路由
var rp = require('request-promise')
const tenpay = require('tenpay'); //支付核心模块

//添加模块：鼠标右键点击pay云函数-->在外部打开终端-->执行 npm i tenpay -D    -->完成

exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  });

  const wxContext = cloud.getWXContext()

  // 添加订单记录
  app.router('addorder', async (ctx) => {
    await db.collection('orders').add({
      data: {
        openId: wxContext.openId, //用户openId
        out_trade_no: event.out_trade_no,
        ssNumber: event.ssNumber,
        courseId: event.courseId, //课程_id
        coursePrice: event.coursePrice, //课程价格
        courseTitle: event.courseTitle, //课程标题
        createTime: event.createTime, //生成时间
        timestamp: event.timestamp, //时间戳
        payData: event.payData, //支付信息
      }
    })

    let result;

    var options = {
      method: 'POST',
      uri: 'https://api.book.uutrack.cn/v1/order/addOrder',
      body: {
        outTradeNo: event.out_trade_no,
        createTime: event.createTime, 
        buyerSsNumber: event.ssNumber,
        address: event.address==null?'为空':event.address,
        price: event.coursePrice,
        docId: event.courseId,
        comment: event.comment==null?'为空':event.comment
      },
      json: true
    };

    await
    rp(options).then(html => {
      result = html
    }).catch(err => {
      console.log(err)
    })
    ctx.body = {
      result,
      event
    }; //返回前端结果  
  });

  //支付回调
  app.router('topay', async (ctx) => {
    const api = tenpay.init(config)
    let result = await api.getPayParams({
      //商户订单号，我这里是定义的seriesLessons+用户openID+当前时间戳
      out_trade_no: event.ssNumber + event.timestamp, // 空格 '' 不能忘了，字符串最长为32位
      body: event._id, //商品名称，设置为商品的_id
      total_fee: event.price, //金额，单位为分，注意是数字，不是字符串，不能有小数点。这里应该是要*100的，测试就支付0.01元。
      openid: wxContext.OPENID //进行支付用户的openid
    });
    ctx.body = {
      result,
      event
    }; //返回前端结果
    // 给后端发送一个请求
  });
  return app.serve();
}