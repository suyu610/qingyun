// pages/quiz/quiz_detail/quiz_detail.js

const wxCharts = require("../../../utils/lib/wxcharts.js")
var radarChart = null

import {
  push
} from '../../../utils/router/index.js';

// 引入插件安装器
import plugin from '../../../components/calendar/plugins/index'

// 引入所需插件
import todo from '../../../components/calendar/plugins/todo'

// 按需安装插件，支持链式调用
plugin.use(todo)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTransition: false,

    calendarConfig: {
      takeoverTap: true,
      hideHeader: true, // 隐藏日历头部操作栏
      theme: 'default', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题色在参考 /theme 文件夹
      inverse: true, // 单选模式下是否支持取消选中,
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      chooseAreaMode: false, // 开启日期范围选择模式，该模式下只可选择时间段
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      preventSwipe: true, // 是否禁用日历滑动切换月份
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      autoChoosedWhenJump: false, // 设置默认日期及跳转到指定日期后是否需要自动选中
    },

    days_record_list: [{
      year: 2021,
      month: 8,
      date: 21,
      num: 17
    }, {
      year: 2021,
      month: 8,
      date: 20,
      num: 32
    }, {
      year: 2021,
      month: 8,
      date: 19,
      num: 21
    }, {
      year: 2021,
      month: 8,
      date: 18,
      num: 0
    }, {
      year: 2021,
      month: 8,
      date: 17,
      num: 0
    }, {
      year: 2021,
      month: 8,
      date: 10,
      num: 2
    }, {
      year: 2021,
      month: 8,
      date: 9,
      num: 0
    }, {
      year: 2021,
      month: 8,
      date: 8,
      num: 1
    }, {
      year: 2021,
      month: 8,
      date: 7,
      num: 32
    }, {
      year: 2021,
      month: 8,
      date: 6,
      num: 12
    }],
    cur_select_date: {},
    info_pics_index: 0,
    icon_list: [{
        icon: 'order',
        color: '#27B1FF',
        badge: 0,
        name: '做题',
        router: 'quiz_answer_questions'
      }, {
        icon: 'text',
        color: '#27B1FF',
        badge: 0,
        name: '测试'
      }, {
        icon: 'warn',
        color: '#27B1FF',
        badge: 12,
        name: '错题本',
        router:"quiz_list_err"
      }, {
        icon: 'favor',
        color: '#27B1FF',
        badge: 22,
        name: '收藏本',
        router:"quiz_list_star"

      }, {
        icon: 'list',
        color: '#27B1FF',
        badge: 0,
        name: '知识章节',
        router: 'quiz_ques_list'
      },
      {
        icon: 'add',
        color: '#27B1FF',
        badge: 0,
        name: '添砖加瓦'
      }, {
        icon: 'delete',
        color: '#fed456',
        badge: 0,
        name: '移除题库'
      }, {
        icon: 'crown',
        color: '#fed456',
        badge: 0,
        name: '题库信息',
        router: 'quiz_detail_unsub'
      }
    ],
  },

  jumpHeadTools(e) {
    push({
      name: e.currentTarget.dataset.router
    })
  },

  toggleTransition() {
    this.setData({
      isTransition: !this.data.isTransition
    })
  },

  takeoverTapDate: function (e) {

    // 判断是否要切换顶部图
    // 当日期相同 即取消的时候，要切换
    // 当之前无日期，且此时有日期了，要切换

    // e.detail => { year: 2019, month: 12, date: 3, ...}
    const calendar = this.selectComponent('#calendar').calendar
    let prev_date = this.data.cur_select_date;
    let cur_select_date;
    // 与当前判断一下，如果相同，则置空
    if (prev_date != null &&
      e.detail.year == prev_date.year &&
      e.detail.month == prev_date.month &&
      e.detail.date == prev_date.date) {
      console.log("取消点击")
      cur_select_date = {}
    } else {
      cur_select_date = e.detail;
    }


    calendar.cancelSelectedDates()
    calendar.setSelectedDates([cur_select_date])

    this.setData({
      cur_select_date
    })

  },
  initCalendar: function () {
    // 获取日历组件上的 calendar 对象
    const calendar = this.selectComponent('#calendar').calendar
    let dates = [];

    this.data.days_record_list.forEach(e => {
      if (e.num != 0) {
        dates.push({
          year: e.year,
          month: e.month,
          date: e.date,
          todoText: '✪',
          color: '#27B0FF'
        })
      } else {
        dates.push({
          year: e.year,
          month: e.month,
          date: e.date,
          todoText: '☹',
          color: 'grey'
        })
      }
    })

    calendar.setTodos({
      // 待办点标记设置
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: '#27B1FF', // 待办点标记颜色
      showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      dates: dates,
    })
  },

  infoPicsIndexChanged: function (e) {
    let index = e.detail.index
    this.setData({
      info_pics_index: index
    })

    if (index == 1) {
      //下面是图表一显示的数据，只需替换掉数据折现就会发生变化实现动态生成
      var x_data = ["8-5", "8-6", "8-7", "8-8", "8-9"]
      var y_data_1 = ["45", "36", "58", "67", "87"]

      //绘制折线图
      this.OnWxChart(x_data, y_data_1, '历史得分')
    }
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
      dataLabel: false, // 在表上显示数字
      dataPointShape: true,

      yAxis: {
        gridColor: "#F5F5F5"
      },
      xAxis: {
        disableGrid: true
      },

      categories: x_data, // 模拟的x轴横坐标参数
      animation: false, // 是否开启动画
      series: [{
        name: name,
        data: y_data,
        color: "#27B1FF",
      }],
      width: windowWidth * 1.1 * 0.8, //图表展示内容宽度
      height: windowHeight * 0.9, //图表展示内容高度
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
  onReady: function () {
    this.initCalendar();
  }
})