// pages/quiz/quiz_pre_questions/quiz_pre_questions.js
import router from '../../../utils/router/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    numIndex: 0,
    practiceMode: 'undo',
    isShowAnswer: false,
    quesNum: 30,
    quiz: {
      id: 0,
      title: "计算机二级C语言",
      totalNum: 359,
      hasDone: 5
    }
  },


  startPractice: function (e) {
    router.push({
      name: 'quiz_answer_questions',
      data: {
        id: this.data.quiz.id,
        practiceMode: this.data.practiceMode,
        isShowAnswer: this.data.isShowAnswer,
        quesNum: this.data.quesNum
      }
    })
  },
  onClickNumGrid: function (e) {
    let index = e.currentTarget.dataset.index;
    if (index != 5) {
      this.setData({
        quesNum: 5 * (index + 1)
      })
    }

    this.setData({
      numIndex: index
    })
  },

  onChangeQuesNumStepper: function (e) {
    this.setData({
      quesNum: e.detail
    })
  },


  onChangeShowAnswer: function (e) {
    this.setData({
      isShowAnswer: e.detail
    })
  },


  onChangePracticeMode: function (e) {
    this.setData({
      practiceMode: e.currentTarget.dataset.name
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);

    this.setData({
      quiz:data
    })
    wx.setNavigationBarTitle({
      title: '刷题设置',
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