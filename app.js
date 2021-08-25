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
          imageUrl: "https://cdns.qdu.life/qingyun/images/share_3.png",
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
      } else {
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
      if (!res.hasUpdate) {}
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

  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },

  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  },

   // 获取本地存储,如果没写默认值，则返回空
   get: function (key, defautValue = '') {
    var value = wx.getStorageSync(key)
    if (value === '') {
      return defautValue;
    } else {
      return value
    }
  },
  
  onLaunch() {


    this.networkManage(); //调用监听网络状态的方法
    this.updateManage(); //调用检测小程序版本更新的方法   

    this.globalData.initData = wx.getStorageSync('initData')
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
    debug: false,
    // debugRouter:"homepage",
    userInfo: {
      userId: null, // 用户唯一id
      name: null, // 微信名称
      gender: 0, // 性别：0未知、1男、2女
      photoUrl: null, // 头像url地址
      address: "全国", // 用户定位地址精确到市，默认为全国
      isSuper: false, // 该用户是否为超级用户，如果是的话就有回复和删除留言的能力
    },
    token: "",
    ssNumber: "",
    version: "1.0.1",
    categoryList: null
  }
})