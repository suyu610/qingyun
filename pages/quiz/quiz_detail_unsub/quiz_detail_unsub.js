// pages/quiz/quiz_detail/quiz_detail.js
const wxCharts = require("../../../utils/lib/wxcharts.js")
var radarChart = null
import util from '../../../utils/util.js'
import QuizService from '../../../net/service/quizService.js'


import router from '../../../utils/router/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quiz: {
      id: 0,
      title: '标题',
      author: '黄鹏宇',
      desc: '巴拉巴拉巴了',
      totalQuizNum: 12,
      userAddNum: 13,
      version: 5,
      commentNum: 8,
      noteNum: 8,
      createTime: "2020.8.8",
    }
  },

  getQuizByIdSuccess: function (e) {
    wx.hideLoading()
    console.log(e)
    e.createTime = util.timeFormatSeconds_short(e.createTime)
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

  addQuizSuccess: function (e) {
    wx.hideLoading()

    let quiz = this.data.quiz;
    quiz.hasStar = true;
    this.setData({
      quiz
    })
    console.log(e)
  },

  addQuizFail: function (e) {
    console.log(e)
  },

  removeQuizSuccess: function (e) {
    wx.hideLoading()

    let quiz = this.data.quiz;
    quiz.hasStar = false;
    this.setData({
      quiz
    })
  },

  onClickAddQuiz: function () {
    wx.showLoading({
      title: '添加中',
    })
    QuizService.AddQuiz(this.addQuizSuccess, this.addQuizFail, this.data.quiz.id)
  },

  onClickRemoveQuiz: function () {
    wx.showLoading({
      title: '删除中',
    })

    QuizService.RemoveQuiz(this.removeQuizSuccess, this.addQuizFail, this.data.quiz.id)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    const data = router.extract(options);
    console.log(data)

    QuizService.GetQuizById(this.getQuizByIdSuccess, this.getQuizByIdFail, data.id)
    //下面是图表一显示的数据，只需替换掉数据折现就会发生变化实现动态生成
    var x_data = ["题目完整度", "解答准确度", "解答完整度", "分类合理", "通俗易懂"]
    var y_data_1 = ["4", "6", "3", "9", "7"]
    var y_data_2 = ["6", "6", "6", "6", "6"]

    //绘制折线图
    this.OnWxChart(x_data, y_data_1, y_data_2, '本题库')


    wx.setNavigationBarTitle({
      title: '计算机二级 - C语言',
    })
  },

  //图表点击事件
  touchcanvas: function (e) {
    radarChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },


  //折线图绘制方法
  OnWxChart: function (x_data, y_data, y_data_2, name) {
    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 650 //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    }
    radarChart = new wxCharts({
      canvasId: 'radarCanvas', //输入wxml中canvas的id
      type: 'radar', // 图表类型
      dataLabel: false,
      categories: x_data, // 模拟的x轴横坐标参数
      animation: true, // 是否开启动画
      series: [{
        name: "平均值",
        data: y_data_2,
        color: "#FFC265",
      }, {
        name: name,
        data: y_data,
        color: "#27B1FF",
      }],
      dataPointShape: false,
      width: windowWidth * 1.1 * 0.7, //图表展示内容宽度
      height: windowHeight * 0.6, //图表展示内容高度
      extra: {
        radar: {
          // 线的颜色
          gridColor: "#ddd",
          // 文字的颜色
          labelColor: "#000",
          max: "10"
        }
      },
    });
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