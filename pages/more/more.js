// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionList: [{
      icon: 'search',
      color: 'black',
      badge: 0,
      name: '找空教室',
      router: 'index'
    }, {
      icon: 'favor',
      color: 'black',
      badge: 0,
      name: '蹭课查询',
      router: 'course_search'
    }, {
      icon: 'text',
      color: 'black',
      badge: 0,
      name: '专业课表',
      router: 'major_list'
    }, {
      icon: 'people',
      color: 'black',
      badge: 0,
      name: '社团课表',
      router: 'multi_course'
    }],
    gridCol: 3,
    skin: true,
    gridBorder: true
  },
  jump: function (e) {
    let router = e.currentTarget.dataset.router
    if (router == "index") {
      wx.navigateToMiniProgram({
        appId: 'wx607821b428f6d5d1',
      })
    } else {
      wx.navigateToMiniProgram({
        appId: 'wx607821b428f6d5d1',
        path: 'pages/empty/empty?url=' + router,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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