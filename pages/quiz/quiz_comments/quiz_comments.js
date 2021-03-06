// pages/quiz/quiz_comments/quiz_comments.js
const wxCharts = require("../../../utils/lib/wxcharts.js")
var radarChart = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRated:true,
    showRating: false,
    commentItemList: [{
      authorName: "皇甫素素",
      content: "评论评论评论评论评论评论评论评论",
      createTime: "2021-8-10 0:36",
      likeCount: "23",
    }, {
      authorName: "黄鹏宇",
      content: "评论评论评论评论评论评论评论评论",
      createTime: "2021-8-10 0:36",
      likeCount: "23",
    }]
  },

  toggleRating: function () {

    // 如果正处于评分状态，则为提交评分
    if (this.data.showRating) {
      var x_data = ["题目完整度", "解答准确度", "解答完整度", "分类合理", "通俗易懂"]
      var y_data_1 = ["4", "6", "3", "9", "7"]
      var y_data_2 = ["6", "6", "6", "6", "6"]

      //绘制折线图
      this.OnWxChart(x_data, y_data_1, y_data_2, '本题库')
      wx.showToast({
        title: '评分成功',
      })
    } else {

    }

    this.setData({
      showRating: !this.data.showRating
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '计算机二级C语言',
    })
    //下面是图表一显示的数据，只需替换掉数据折现就会发生变化实现动态生成
    var x_data = ["题目完整度", "解答准确度", "解答完整度", "分类合理", "通俗易懂"]
    var y_data_1 = ["4", "6", "3", "9", "7"]
    var y_data_2 = ["6", "6", "6", "6", "6"]

    //绘制折线图
    this.OnWxChart(x_data, y_data_1, y_data_2, '本题库')
  },

  //折线图绘制方法
  OnWxChart: function (x_data, y_data, y_data_2, name) {
    var windowWidth = ''
    var windowHeight = ''
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth //以设计图750为主进行比例算换
      windowHeight = res.windowHeight //以设计图750为主进行比例算换
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
      width: windowWidth * 0.9, //图表展示内容宽度
      height: windowHeight * 0.26, //图表展示内容高度
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