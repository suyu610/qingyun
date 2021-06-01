// pages/empty/empty.js
const app = getApp()
const router = require('../../utils/router/index.js');
var utils = require('../../utils/util.js')

Page({
  /**
   * 初始化数据函数
   */

  initData: function (e) {},

  handleGetWeatherSuccess(data) {
    // console.log(data)
    data.createtime = utils.formatTime2(new Date());
    app.globalData.weather = data
  },

  /**
   * 生命周期函数--监听页面加载
   * 逻辑，该页面为所有页面的根结点
   * 他会执行login，当有返回值后，执行获取flag，然后再执行业务逻辑
   */
  onLoad: function (options) {
    // 这里是debug用的
    if (app.globalData.debug) {
      console.log("empty.js: debug模式")
      router.replace({
        name: app.globalData.debugRouter
      });
      return;
    }

    wx.setNavigationBarTitle({
      title: '青云知识库',
    })

    if (null != options && null != options.url) {
      app.globalData.url = options.url
      app.globalData.params = options.params
      router.replace({
        name: app.globalData.url,
        data: params
      });
    }
        // 检查本地是否有学号+token，若有，则发送验证
    // 若无，说明是第一次登录，跳转至登陆页面
    // 若验证不通过，说明token失效，则使用code去换取token
    let token = wx.getStorageSync('token')
    let ssNumber = wx.getStorageSync('ssNumber')

    if (token != '' && ssNumber != '') {
      console.log("都存在")
      // 检测token是否有效
    } else {
      console.log("没有token或ssNumber")
      // 跳转到登陆页面
      router.replace({
        name: "login"
      })
      return;
    }

    setTimeout(() => {
      router.relaunch({
        name: "homepage"
      })
    }, 500);
  },

  onReady: function () {

  }


})