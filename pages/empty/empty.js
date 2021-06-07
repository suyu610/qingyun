// pages/empty/empty.js
const app = getApp()
const router = require('../../utils/router/index.js');
var utils = require('../../utils/util.js')
import UserService from '../../net/service/userService.js'

Page({

  data:{
    version:app.globalData.version
  },
  
  handleGetInitDataSuccess(data) {
    // 检测token是否有效
    setTimeout(() => {
      router.relaunch({
        name: "homepage"
      })
    }, 800);
  },

  // token失效
  handleGetInitDataFail(data) {
    console.log("empty.js  token失效")
    router.relaunch({
      name: "login"
    })

    setTimeout(() => {
      wx.showToast({
        icon: 'none',
        title: '请重新登录',
      })
    }, 800);
  },


  /**
   * 生命周期函数--监听页面加载
   * 逻辑，该页面为所有页面的根结点
   * 他会执行login，当有返回值后，执行获取flag，然后再执行业务逻辑
   */
  onLoad: function (options) {
    ///////////// 这里是debug用的 ///////////////////// 
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

    ///////////// 这里是跳转用的 ///////////////////// 
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
    let openid = wx.getStorageSync('openid');
    if (token != '' && ssNumber != '') {
      let params = {
        "ssNumber": ssNumber,
        "token": token,
        "openid": openid
      }
      UserService.checkTokenAndGetInitData(this.handleGetInitDataSuccess, this.handleGetInitDataFail,params)
    } else {
      console.log("没有token或ssNumber")
      // 跳转到登陆页面
      router.replace({
        name: "login"
      })
      return;
    }


  },

  onReady: function () {

  }


})