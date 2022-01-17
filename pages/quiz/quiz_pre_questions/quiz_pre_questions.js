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
    quesNum: 5,
    quiz: {
      id: 0,
      title: "计算机二级C语言",
      totalNum: 359,
      hasDone: 5
    }
  },

  startPractice: function (e) {
    router.replace({
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
    console.log(data)
    this.setData({
      quiz:data
    })
    wx.setNavigationBarTitle({
      title: '刷题设置',
    })
  },

})