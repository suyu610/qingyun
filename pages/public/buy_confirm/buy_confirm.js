// pages/public/buy_confirm/buy_confirm.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import OrderService from '../../../net/service/orderService.js'
import router from '../../../utils/router/index.js';
import UserService from '../../../net/service/userService.js'

let app = getApp()
const beforeClose = (action) => new Promise((resolve) => {
  setTimeout(() => {
    if (action === 'confirm') {
      router.replace({
        name: "order_list"
      });
    } else {
      // 拦截取消操作
      router.relaunch({
        name: "homepage"
      })
    }
  }, 0);
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "https://cdns.qdu.life/qingyun/images/ad_1.jpg",
    docId: 0,
    comment: "",
    address: "",
    tel: "",
  },

  jump2SettingProfile: function () {
    router.push({
      name: "setting_profile"
    })
  },

  pay_success: function () {
    wx.hideLoading()
    Dialog.confirm({
      title: '支付成功',
      message: '可在订单页查看文档\n网页地址为 book.qdu.life',
      customStyle: 'font-weight:bold',
      messageAlign: 'left',
      confirmButtonText: '前往订单页',
      cancelButtonText: '返回首页',
      beforeClose
    })
  },

  handleCheckHasBoughtSuccess(e) {
    let that = this;

    var createTime = new Date(); //支付时间
    var timestamp = (new Date()).getTime(); //时间戳
    // 已经买过
    if (e) {
      wx.hideLoading()
      console.log("res.result.data.length != 0")
      wx.showToast({
        title: '您已经购买过这个课程了，无需重复购买。',
        icon: 'none',
        duration: 4000
      })
      return;
    }
    if (this.data.price <= 0) {
      wx.cloud.callFunction({
        name: 'payment',
        data: {
          $url: 'addorder',
          address: that.data.address,
          out_trade_no: app.globalData.ssNumber + timestamp,
          ssNumber: app.globalData.ssNumber,
          courseId: that.data.docId, //课程_id
          coursePrice: that.data.price, //课程价格
          courseTitle: that.data.title, //课程标题
          createTime: timestamp, //生成时间
          timestamp: timestamp, //时间戳
        },
        success(e) {
          // 添加成功
          if (e.result.result.data) {
            that.pay_success()
          }
        },
        fail(e) {
          console.log(e)
        }
      })
    } else {
      // 没有购买过
      wx.cloud.callFunction({
        name: 'payment',
        data: {
          $url: 'topay',
          ssNumber: app.globalData.ssNumber,
          courseTitle: this.data.title,
          _id: this.data.title + this.data.docId, //商品的_id
          price: this.data.price * 100, //价格that.data.seriesLessonsData.price
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
              // 付款成功
              // 通过云函数，往后端服务器发送一个添加订单请求
              wx.cloud.callFunction({
                name: 'payment',
                data: {
                  $url: 'addorder',
                  address: that.data.address,
                  out_trade_no: app.globalData.ssNumber + timestamp,
                  ssNumber: app.globalData.ssNumber,
                  courseId: that.data.docId, //课程_id
                  coursePrice: that.data.price, //课程价格
                  courseTitle: that.data.title, //课程标题
                  createTime: timestamp, //生成时间
                  timestamp: timestamp, //时间戳
                  payData: payData, //支付信息
                },
                success(e) {
                  // 添加成功
                  if (e.result.result.data) {
                    that.pay_success()
                  }
                },
                fail(e) {
                  wx.showToast({
                    icon: 'none',
                    title: e,
                  })
                  // console.log(e)
                }
              })
            },
            fail(err) {
              if (err.errMsg == "requestPayment:fail cancel") {
                wx.showToast({
                  title: '取消支付',
                  icon: 'none'
                })
              } else {
                console.log(err)
                wx.showToast({
                  title: '网络波动，请重试',
                  icon: 'none'
                })
              }
            }
          })
        },
        fail(err) {
          console.log(err)
          wx.hideLoading()
          wx.showToast({
            title: '网络波动，请重试',
            icon: 'none'
          })
        }
      })
    }
  },
  pay: function () {
    wx.showLoading({
      title: '处理中，请稍后',
    })
    // 先往后端查询看是否有这个订单
    // 根据学号+docid查询
    // 后端去查

    OrderService.CheckHasBought(this.handleCheckHasBoughtSuccess, this.handleCheckHasBoughtFail, this.data.docId);
    //没有订单， 提交订单

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);
    this.setData({
      docId: data.id,
      price: data.price,
      authorName: data.authorName,
      introduce: data.introduce,
      title: data.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleGetSuccess: function (e) {
    console.log(e)
    this.setData({
      name:e.name,
      address:e.address,
      tel: e.contact
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取下用户信息
    UserService.GetSelfProfile(this.handleGetSuccess, this.handleGetFail)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})