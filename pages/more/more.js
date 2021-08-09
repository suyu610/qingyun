// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionList: [{
      icon: 'order',
      color: 'black',
      badge: 0,
      name: '顺序答题'
    }, {
      icon: 'text',
      color: 'black',
      badge: 0,
      name: '模拟测试'
    }, {
      icon: 'warn',
      color: 'black',
      badge: 0,
      name: '错题本'
    }, {
      icon: 'favor',
      color: 'black',
      badge: 0,
      name: '收藏本'
    }],
    gridCol: 3,
    skin: true,
    gridBorder:true
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