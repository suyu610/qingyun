// pages/public/buy_confirm/buy_confirm.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {
  relaunch,
  replace,
  push
} from '../../../utils/router/index.js';

const beforeClose = (action) => new Promise((resolve) => {
  setTimeout(() => {
    if (action === 'confirm') {
      replace({
        name: "order_list"
      });
    } else {
      // 拦截取消操作
      relaunch({
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
    imageURL: "https://cdns.qdu.life/qingyun/images/ad_1.jpg"
  },

  jump2SettingProfile: function () {
    push({
      name: "setting_profile"
    })
  },
  pay_success: function () {
    Dialog.confirm({
      title: '支付成功',
      message: '可在订单页查看文档\n网页地址为 book.qdu.life',
      // customStyle:'font-weight:bold',
      messageAlign: 'left',
      confirmButtonText: '前往订单页',
      cancelButtonText: '返回首页',
      beforeClose
    })
  },

  pay: function () {
    let that = this;
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
                      that.pay_success()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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