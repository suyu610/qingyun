// pages/me/me.js
import {
  push
} from '../../utils/router/index.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    remainMoney: 0,
    boughtCount: 0,
    starCount: 0
  },
  jump2MsgList: function () {
    push({
      name: "msg_list"
    })
  },

  jump2About: function () {
    push({
      name: "webview",
      data:{
        "url":"https://mp.weixin.qq.com/s?__biz=Mzg4NTQ3NjE5MQ==&mid=100000039&idx=1&sn=327a94ebc74fd7cebcbd6275e65f88a8&chksm=4fa91f1778de9601ec4b2ef693eca119955bd790bdeffd4e469a5e45bbdc404d64402dc50f57"
      }
    })
  },

  jump2Admin: function () {
    push({
      name: "admin"
    })
  },
  jump2StarList: function () {
    push({
      name: "star_list"
    })
  },

  jump2MyUploadList: function () {
    push({
      name: "my_upload_list"
    })
  },


  jump2OrderList: function () {
    push({
      name: "order_list"
    })
  },
  jump2SettingProfile: function () {
    if(this.data.token=='tourist'){
      push({
        name: "login"
      })
      return
    }
    push({
      name: "setting_profile"
    })
  },
  jump2Upload: function () {
    push({
      name: "upload"
    })
  },

  jump2MoneyList: function () {
    push({
      name: "money_list"
    })
  },
  /**
   * 生命周期函数
   */
  onLoad: function (options) {
    console.log(app.globalData.initData.userInitDataBO)
    this.setData({
      isAdmin: app.globalData.initData.userInitDataBO.isAdmin,
      remainMoney: app.globalData.initData.userInitDataBO.remainMoney,
      boughtCount: app.globalData.initData.userInitDataBO.boughtCount,
      starCount: app.globalData.initData.userInitDataBO.starCount,
      remainMoney: app.globalData.initData.userInitDataBO.remainMoney,
      uploadCount: app.globalData.initData.userInitDataBO.uploadCount,
      avatarUrl: app.globalData.initData.userInitDataBO.avatarUrl,
      college: app.globalData.initData.userInitDataBO.collegeName,
      ssNumber: app.globalData.ssNumber,
      name: app.globalData.initData.userInitDataBO.name,
      msgCount: app.globalData.initData.msgList == null ? 0 : app.globalData.initData.msgList.length
    })
  },

  onReady: function () {

  },

  onShow: function () {
    let token = wx.getStorageSync('token')
    this.setData({token})
  },

})