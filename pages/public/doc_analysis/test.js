// pages/test/test.js
const wxCharts = require("../../../utils/lib/wxcharts.js")
var lineChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textcolor1: '#014f8e',
    textcolor2: '#bfbfbf',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //下面是图表一显示的数据，只需替换掉数据折现就会发生变化实现动态生成
    var x_data = ["12-05", "12-06", "12-07", "12-08", "12-09", "12-10", "12-11", "12-12", "12-13", "12-14", "12-15", "12-16", "12-17", "12-18", "12-19"]
    var y_data_1 = ["0", "0", "0", "0", "1", "0", "1", "1", "2", "5", "5", "9", "7", "5", "9"]
    var y_data_2 = ["1", "2", "1", "0", "2", "0", "1", "6", "2", "9", "2", "8", "6", "5", "19"]

    //绘制折线图
    this.OnWxChart(x_data, y_data_1, y_data_2, '购买量', '收藏量')
  },

  
  //图表点击事件
  touchcanvas: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  //折线图绘制方法
  OnWxChart: function (x_data, y_data_1, y_data_2, name_1, name_2) {
    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); // 获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550 //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas', //输入wxml中canvas的id
      type: 'line', // 图表类型
      categories: x_data, // 模拟的x轴横坐标参数
      animation: true, // 是否开启动画
      series: [{
        name: name_1,
        data: y_data_1,
        format: function (val, name) {
          return val;
        }
      }, {
        name: name_2,
        data: y_data_2,
        format: function (val, name) {
          return val;
        }
      }],
      xAxis: { //是否隐藏x轴分割线
        disableGrid: true,
      },
      //y轴数据
      yAxis: {
        title: '', //标题
        format: function (val) { //返回数值
          return val.toFixed(0);
        },
        min: 0.00, //最小值
        gridColor: '#feedf7', // 图表里的横线
      },
      width: windowWidth * 1.1, //图表展示内容宽度
      height: windowHeight, //图表展示内容高度
      dataLabel: false, //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'curve' //曲线
      },
    });
  },
})