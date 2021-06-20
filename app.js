// app.js
const router = require('utils/router/index.js');

// 设置全局的分享
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
      }
    }, pageConfig);
    PageTmp(pageConfig);
  };
}();
App({

   // ---------------------------------------------网络状态 
   networkManage: function () {
    var that = this;
    //监听网络状态
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        console.log("123")
        that.msg('网络似乎不太顺畅');
      }else{
        console.log(res)
      }
    })
  },
  //---------------------------------------------检测小程序版本更新
  updateManage: function () {
    var that = this; 
    var updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (!res.hasUpdate) {
      }
    })
    // 监听新版本下载成功
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          } else {
            that.updateManage();
          }
        }
      })
    })
    // 监听新版本下载失败
    updateManager.onUpdateFailed(function () {
      app.showModal({
        content: '新版本更新失败，是否重试？',
        confirmText: '重试',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    })
  },

  onLaunch() {
    this.networkManage(); //调用监听网络状态的方法
    this.updateManage(); //调用检测小程序版本更新的方法   
    
    this.globalData.initData =  wx.getStorageSync('initData')
    let that = this
    wx.cloud.init({
      traceUser: true,
    });
    // 获取openid
    wx.cloud.callFunction({
      name: 'getOpenId',
      success(res) {
        that.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
      }
    });

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })

    let token = wx.getStorageSync('token')
    this.globalData.token = token
  },


  globalData: {
    openid: "",
    token: "",
    ssNumber: "",
    version:"1.0.1",
    categoryList:null
  }
})