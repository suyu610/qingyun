// pages/document_detail/document_detail.js
import {
  push
} from '../../utils/router/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 预览图
    previewList: [{
        "id": 0,
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-1.jpg"
      },
      {
        "id": 0,
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-2.jpg"
      },
      {
        "id": 0,
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-3.jpg"
      },
    ],
    previewIndicatorDots: true,
    previewAutoplay: false,
    previewInterval: 8000,
    previewDuration: 1000,

  },

  pay: function () {
    wx.showLoading({
      title: '处理中，请稍后',
    })
    var createTime = new Date(); //支付时间
    var timestamp = (new Date()).getTime(); //时间戳
    // 先查询看是否有这个订单
    wx.cloud.callFunction({
      name: 'payment',
      data: {
        $url: 'selectorder',
        openId: "test", //用户openId
        courseId: "testId", //课程_id
      },
      success(res) {
        //如果有这个订单记录，提示已购买
        if (res.result.data.length != 0) {
          wx.hideLoading()
          console.log("res.result.data.length != 0")
          wx.showToast({
            title: '您已经购买过这个课程了，无需重复购买。',
            icon: 'none',
            duration: 4000
          })
        } else {
          //没有订单， 提交订单
          wx.cloud.callFunction({
            name: 'payment',
            data: {
              $url: 'topay',
              openId: "123", //用户openId
              _id: "12", //商品的_id
              price: 1, //价格that.data.seriesLessonsData.price
              timestamp: timestamp,
            },
            success(res) {
              wx.hideLoading()
              // 订单生成成功，进行支付环节
              var payData = res.result.result;
              //返回的参数含义在微信小程序官方开发文档中有说明
              //调用wx.requestPayment api
              wx.requestPayment({
                timeStamp: res.result.result.timeStamp,
                nonceStr: res.result.result.nonceStr,
                package: res.result.result.package,
                signType: 'MD5',
                paySign: res.result.result.paySign,
                success(re) {
                  console.log(re)
                  // 付款成功添加订单记录到数据库orders
                  wx.cloud.callFunction({
                    name: 'payment',
                    data: {
                      $url: 'addorder',
                      openId: "openid", //用户openId
                      courseId: "course_id", //课程_id
                      coursePrice: "price_1", //课程价格
                      courseTitle: "高等数学", //课程标题
                      courseClassName: "test", //课程分类
                      createTime: createTime, //生成时间
                      timestamp: timestamp, //时间戳
                      payData: payData, //支付返回的信息
                    },
                    success(e) {
                      console.log(e)
                      wx.showToast({
                        title: '支付成功',
                        icon: 'success'
                      })
                    },
                    fail(err) {
                      console.log(err)
                      wx.showToast({
                        title: '网络波动，请重试',
                        icon: 'none'
                      })
                    }
                  })
                },
                fail(err) {
                  if (err.errMsg == "requestPayment:fail cancel") {

                  } else {
                    wx.showToast({
                      title: '网络波动，请重试',
                      icon: 'none'
                    })
                  }
                }
              })
            },
            fail(err) {
              wx.hideLoading()
              wx.showToast({
                title: '网络波动，请重试',
                icon: 'none'
              })
            }
          })
        }
      },
      fail(err) {
        console.log(err)
        wx.showToast({
          title: '网络波动，请重试',
          icon: 'none'
        })
      }
    })
  },
  jump2Chat: function () {
    push({
      name: 'chat',
      data: {
        id: '123',
        type: 1,
      },
    });
  },
  //预览图片
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    var previewImgArr = [];
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = that.data.previewList;
    for (var i in data) {
      previewImgArr.push(data[i].imgUrl);
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
  },

  // 跳转小程序
  jump2Qk: function () {
    wx.navigateToMiniProgram({
      appId: 'wx607821b428f6d5d1',
      path: '',
      envVersion: 'release', // 打开正式版
      success(res) {
        // 打开成功
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '资料详情',
    })
  },

  onReady: function () {

  },


  onShow: function () {

  },

  onHide: function () {

  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})