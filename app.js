// app.js
const router = require('utils/router/index.js');

App({
  onLaunch() {
    let that = this
    wx.cloud.init({
      traceUser: true,
    });

    // 获取openid
    wx.cloud.callFunction({
      name: 'getOpenId',
      success(res) {
        console.log(res.result.openid)
        that.globalData.openid = res.result.openid
      }
    })


  },
  globalData: {
    openid: "",
    token: "",
    ssNumber: ""
  }
})