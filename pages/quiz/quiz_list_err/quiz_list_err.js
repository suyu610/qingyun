// pages/quiz/quiz_list_err/quiz_list_err.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    err_list: [{
      title: '计算机二级C语言',
      chapter: [{
        title: '第一章 公共知识常识',
        quizzes: [{
          id: 1,
          title: "巴拉巴拉巴拉巴拉",
          type: "单选"
        }, {
          id: 2,
          title: "巴拉巴拉巴拉巴拉",
          type: "填空"

        }, {
          id: 3,
          title: "巴拉巴拉巴拉巴拉",
          type: "完型"

        }]
      }, {
        title: '第三章 指针',
        quizzes: [{
          id: 1,
          title: "巴拉巴拉巴拉巴拉",
          type: "单选"

        }, {
          id: 2,
          title: "巴拉巴拉巴拉巴拉",
          type: "简答"

        }, {
          id: 3,
          title: "巴拉巴拉巴拉巴拉",
          type: "多选"

        }]
      }, ]
    }, {
      title: '固体物理'
    }, {
      title: '信号与系统'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '错题本',
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