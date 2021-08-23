// pages/quiz/quiz_ques_list/quiz_ques_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterActiveNames: ['1'],
    ideaActiveNames: ['1'],
    quiz: {
      title: '计算机二级C语言',
      total_num: 215,
      idea_num: 78,
      chapter_num: 7,
      score: 3.7,
      chapter: [{
        id: 0,
        title: "第一章 解剖学",
        description: "这一章分值大概在12%左右，是重点章节",
        total_num: 30,
        done_num: 3,
        idea: [{
            title: "第1节 消化系统",
            right_num: 0,
            err_num: 0,
            undo_num: 0
          },
          {
            title: "第2节 运动系统",
            right_num: 0,
            err_num: 0,
            undo_num: 0
          }, {
            title: "第3节 泌尿系统",
            right_num: 0,
            err_num: 0,
            undo_num: 0
          }
        ]

      }, {
        id: 1,

        title: "第二章 生物化学",
        description: "分值大概在18%左右，是重点章节",
        total_num: 483,
        done_num: 0,
        idea: [{
            title: "第1节 蛋白质",
            right_num: 0,
            err_num: 0,
            undo_num: 0
          },
          {
            title: "第2节 核酸的结构和功能",
            right_num: 0,
            err_num: 0,
            undo_num: 0
          }, {
            title: "第3节 糖代谢",
            right_num: 0,
            err_num: 0,
            undo_num: 0
          }
        ]

      }]

    }
  },
  onChangeChapter(event) {
    this.setData({
      chapterActiveNames: event.detail,
      ideaActiveNames: []
    });
  },

  onChangeIdea(event) {
    this.setData({
      ideaActiveNames: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.quiz.title,
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