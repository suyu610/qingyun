// pages/quiz/quiz_ques_list/quiz_ques_list.js
import QuizService from '../../../net/service/quizService.js'
import router from '../../../utils/router/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterActiveNames: ['1'],
    ideaActiveNames: ['1'],
    quiz: {},
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

  getQuizByIdSuccess: function (e) {
    console.log(e)
    this.setData({
      quiz: e
    })

    wx.setNavigationBarTitle({
      title: e.title,
    })
  },

  getQuizByIdFail: function (e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);
    QuizService.GetQuesListByQuizId(this.getQuizByIdSuccess, this.getQuizByIdFail, data.id)


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