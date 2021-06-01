// app.js
const router = require('utils/router/index.js');

! function () {
  var PageTmp = Page;

  Page = function (pageConfig) {
    // 设置全局默认分享
    pageConfig = Object.assign({
      onShareAppMessage: function () {
        return {
          title: '青云知识库',
          imageUrl: "https://cdns.qdu.life/qingyun/images/share_1.png",
          path: '/pages/empty/empty',
        };
      }
    }, pageConfig);
    
    pageConfig = Object.assign({
    onShareTimeline: function (res) {
      return {
        title: '青云知识库',
        query: 'id=12345678'
      }
    }  }, pageConfig);
  
    PageTmp(pageConfig);
  };
}();
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