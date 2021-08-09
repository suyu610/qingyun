// pages/quiz/quiz_detail/quiz_detail.js

const wxCharts = require("../../../utils/lib/wxcharts.js")
var radarChart = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [{
        icon: 'order',
        color: '#27B1FF',
        badge: 0,
        name: '顺序做题'
      }, {
        icon: 'text',
        color: '#27B1FF',
        badge: 0,
        name: '模拟测试'
      }, {
        icon: 'warn',
        color: '#27B1FF',
        badge: 12,
        name: '错题本'
      }, {
        icon: 'favor',
        color: '#27B1FF',
        badge: 22,
        name: '收藏本'
      }, {
        icon: 'selection',
        color: '#27B1FF',
        badge: 0,
        name: '历史成绩'
      }, {
        icon: 'rank',
        color: '#27B1FF',
        badge: 0,
        name: '排行榜'
      },
      {
        icon: 'roundadd',
        color: '#27B1FF',
        badge: 0,
        name: '添加题目'
      }, {
        icon: 'delete',
        color: '#fed456',
        badge: 0,
        name: '移除题库'
      }
    ],
    gridCol: 4,
    skin: false,
    gridBorder: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '计算机二级 - C语言',
    })
    //下面是图表一显示的数据，只需替换掉数据折现就会发生变化实现动态生成
    var x_data = ["8-5", "8-6", "8-7", "8-8", "8-9"]
    var y_data_1 = ["45", "36", "58", "67", "87"]

    //绘制折线图
    this.OnWxChart(x_data, y_data_1, '历史得分')
  },

  //折线图绘制方法
  OnWxChart: function (x_data, y_data, name) {
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
      canvasId: 'lineCanvas', //输入wxml中canvas的id
      type: 'line', // 图表类型
      dataLabel: true, // 在表上显示数字
      dataPointShape: true,

      yAxis: {
        min: 0,
        gridColor: "#F5F5F5"
      },
      xAxis: {
        disableGrid: true
      },

      categories: x_data, // 模拟的x轴横坐标参数
      animation: true, // 是否开启动画
      series: [{
        name: name,
        data: y_data,
        color: "#27B1FF",
      }],
      width: windowWidth * 1.1 * 0.8, //图表展示内容宽度
      height: windowHeight * 0.6, //图表展示内容高度
      extra: {
        lineStyle: "curve",
        radar: {
          // 线的颜色
          gridColor: "transparent",
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