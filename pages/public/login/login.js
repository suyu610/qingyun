// pages/public/login/login.js
import router from '../../../utils/router/index.js';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    ssNumber: "",
    pwd: "",
    showInputPwdPopup: false,
  },

  onCloseInputPwdPopup: function () {
    this.setData({
      showInputPwdPopup: false
    })
  },


  onTapInputPwdBtn: function () {
    Toast.loading({
      message: '设置中',
      duration: 1000,
      forbidClick: true,
      loadingType: 'spinner',
      onClose: () => {
        router.relaunch({
          name: "homepage"
        })
      },
    });

  },
  onLoginBtnTap: function () {
    if (this.data.name == "" || this.data.ssNumber == "") {
      Toast({
        type: 'fail',
        message: '不能为空',
        duration: 1000
      });
      return;
    }
    Toast.loading({
      message: '认证中',
      forbidClick: true,
      loadingType: 'spinner',
    });
    setTimeout(() => {
      if (this.data.name == "1" && this.data.ssNumber == "") {
        Toast({
          type: 'success',
          message: '认证成功',
          duration: 1000,
          onClose: () => {

            this.setData({
              showInputPwdPopup: true
            })

          },
        });


      } else {
        // 不匹配
        Toast({
          type: 'html',
          message: '匹配失败\n还可尝试 2 次',
          onClose: () => {
            console.log('执行OnClose函数');
          },
        });
      }


    }, 1000);
    wx.setStorageSync('token', 123)
    wx.setStorageSync('ssNumber', 2019205913)

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