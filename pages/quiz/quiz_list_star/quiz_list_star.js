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
          quesType: "单选"
        }, {
          id: 2,
          title: "巴拉巴拉巴拉巴拉",
          quesType: "填空"
        }, {
          id: 3,
          title: "巴拉巴拉巴拉巴拉",
          quesType: "完型"
        }]
      }, {
        title: '第三章 指针',
        quizzes: [{
          id: 1,
          title: "巴拉巴拉巴拉巴拉",
          quesType: "单选"

        }, {
          id: 2,
          title: "巴拉巴拉巴拉巴拉",
          quesType: "简答"

        }, {
          id: 3,
          title: "巴拉巴拉巴拉巴拉",
          quesType: "多选"

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
      title: '收藏本',
    })
  },
})