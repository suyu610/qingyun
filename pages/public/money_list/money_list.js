// pages/public/money_list/money_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    checkPwdRight: false,
    showCheckPwdPopup: false,
    checkPwdLoading: false,
    pwd: ""

  },
  // 点击提现按钮
  onSubmit: function () {

  },

  onTapWithdrawBtn: function () {
    this.setData({
      showCheckPwdPopup: true
    })
  },

  hideCheckPwdPopup: function () {
    this.setData({
      showCheckPwdPopup: false
    })
  },
  // 检查密码是否正确
  checkPwd: function () {
    this.setData({
      checkPwdLoading: true
    })

    setTimeout(() => {
      console.log(this.data.pwd)
      if (this.data.pwd == "123") {
        wx.showToast({
          title: '验证通过',
        })
        this.setData({
          showCheckPwdPopup: false,
          checkPwdRight: true,
          checkPwdLoading: false
        })
      } else {

        wx.showToast({
          icon: 'none',
          title: '密码错误,还可尝试2次',
        })

        this.setData({
          pwd: "",
          checkPwdLoading: false
        })
      }
    }, 2000);


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          height: res.windowHeight - 64 - 44 - 10 - 240 + "px"
        })
        console.log(res.windowHeight)
      }
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