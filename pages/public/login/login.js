// pages/public/login/login.js
import router from '../../../utils/router/index.js';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import UserService from '../../../net/service/userService.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    ssNumber: "",
    password: "",
    isInitLogin: true,
    showInputPwdPopup: false,
    tempHide: false
  },

  /////////////////// 1. 点击登录 ///////////////////
  onLoginBtnTap: function () {
    if (this.data.name == "" || this.data.ssNumber == "") {
      Toast({
        type: 'fail',
        message: '不能为空',
        duration: 1000
      });
      return;
    }
    let params = {
      "name": this.data.name,
      "ssNumber": this.data.ssNumber,
    }
    UserService.matchNameAndNumber(this.handleLogin,this.handleLoginByPwdFailure, params);
    Toast.loading({
      message: '认证中',
      forbidClick: true,
      loadingType: 'spinner',
    });
  },

  /////////////////// 2. 处理登录的服务端返回 ///////////////////
  handleLogin: function (e) {
    if (e.flag == "error") {
      // 不匹配
      Toast({
        type: 'html',
        message: '信息不匹配\n还可尝试 ' + e.retryCount + ' 次',
        duration: 1000
      });
      return;
    }
    if (e.flag == "success") {
      Toast({
        type: 'success',
        message: '匹配成功',
        duration: 500,
        onClose: () => {
          this.setData({
            isInitLogin: e.isFirstLogin,
            showInputPwdPopup: true
          })
        },
      });
      return;
    }
    Toast({
      type: 'fail',
      message: '系统错误\n请联系客服',
      duration: 1000
    });
  },
  ///////////////////////// 3. 处理输入密码 ////////////////////////
  onTapInputPwdBtn: function () {
    Toast.loading({
      message: '处理中',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    });
    if(this.data.password==""){
      Toast.fail("密码不能为空")
      return}
    let params = {
      "name": this.data.name,
      "ssNumber": this.data.ssNumber,
      "password": this.data.password,
      "openid": app.globalData.openid
    }
    UserService.loginBySSNumberAndPwd(this.handleLoginByPwdSuccess,this.handleLoginByPwdFailure, params)
  },

  /////////////////// 4. 【成功】处理输入密码的服务端返回 ///////////////////
  handleLoginByPwdSuccess: function (e) {
    console.log(e)
    this.jump2Homepage()
    wx.setStorageSync('ssNumber', this.data.ssNumber)
    
    Toast.success("成功")
  },

  /////////////////// 5. 【失败】处理输入密码的服务端返回 ///////////////////
  handleLoginByPwdFailure: function (e) {
    Toast.clear();
   
    Toast({
      type: 'fail',
      message: e,
      onClose: () => {
        console.log('执行OnClose函数');
      },
    });
    
    // this.jump2Homepage()
    // wx.setStorageSync('ssNumber', this.data.ssNumber)
  },

  ////////////////// 监听输入组件的改变事件 ///////////////////////////
  nameValueChanged: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  ssNumberValueChanged: function (e) {
    this.setData({
      ssNumber: e.detail.value
    })
  },
  

  //////////////// 跳转事件 ////////////////////
  // 跳转到用户须知
  jump2NeedKnow: function (e) {
    router.push({
      name: "need_know",
      data: {
        type: 'login',
      },
    })
  },
  
  //跳转到首页
  jump2Homepage: function () {
    this.setData({
      tempHide: true
    })
    router.relaunch({
      name: "homepage"
    })
  },

  /////////////////  隐藏密码弹窗   /////////////////////
  onCloseInputPwdPopup: function () {
    this.setData({
      showInputPwdPopup: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登陆页面',
    })
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