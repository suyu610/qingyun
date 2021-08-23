// pages/homepage/homepage.js
import {
  push
} from '../../utils/router/index.js';
const app = getApp()
Page({
  data: {
    showSelectDefaulQuizPopup: false,
    default_quiz: {},
    icon_list: [{
      icon: 'order',
      color: 'white',
      badge: 0,
      name: '做题模式',
      router: 'quiz_answer_questions'
    }, {
      icon: 'text',
      color: 'white',
      badge: 0,
      name: '考试模式'
    }, {
      icon: 'warn',
      color: 'white',
      badge: 0,
      name: '错题本',
      router: 'quiz_list_err'
    }, {
      icon: 'favor',
      color: 'white',
      badge: 0,
      name: '收藏本',
      router: 'quiz_list_star'
    }],
    gridCol: 4,
    skin: false,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    all_quiz_list: [],
    load: true,
    self_quiz_list: [],
  },


  onClickDefaultQuiz(event) {
    let
      default_id = event.currentTarget.dataset.name;
    let default_quiz;
    this.data.self_quiz_list.forEach(e => {
      if (e.id == default_id) {
        default_quiz = e;
        return
      }
    })

    wx.showToast({
      title: '修改成功',
      duration: 800,
    })
    this.setData({
      default_quiz,
      showSelectDefaulQuizPopup: false,
    });
  },


  onToggleSelectDefaulQuizPopup: function () {
    this.setData({
      showSelectDefaulQuizPopup: !this.data.showSelectDefaulQuizPopup
    })
  },

  jumpRoute(e) {
    let router = e.currentTarget.dataset.router
    push({
      name: router
    })

  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },

  // 滚动
  VerticalMain(e) {
    let that = this;
    let all_quiz_list = this.data.all_quiz_list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < all_quiz_list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + all_quiz_list[i].id);
        view.fields({
          size: true
        }, data => {
          all_quiz_list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          all_quiz_list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        all_quiz_list: all_quiz_list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < all_quiz_list.length; i++) {
      if (scrollTop > all_quiz_list[i].top && scrollTop < all_quiz_list[i].bottom) {
        that.setData({
          VerticalNavTop: (all_quiz_list[i].id - 1) * 50,
          TabCur: all_quiz_list[i].id
        })
        return false
      }
    }
  },
  onScrollRefresh: function () {
    console.log("刷新")
    wx.vibrateShort()
    let that = this;
    wx.showLoading({
      title: '刷新中',
    })
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            title: '刷新成功',
            duration: 500,
          })
          this.setData({
            triggered: false
          })
        },
      })
    }, 1000);
  },
  // 跳转小程序
  jump2Qk: function () {
    wx.navigateToMiniProgram({
      appId: 'wx607821b428f6d5d1',
      path: '',
      envVersion: 'release', // 打开正式版
      success(res) {
        // 打开成功
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  jump2Detail_unsub: function () {
    push({
      name: 'quiz_detail_unsub',
      data: {
        id: '123',
        type: 1,
      },
    });
  },
  jump2Detail_sub: function () {
    push({
      name: 'quiz_detail_sub',
      data: {
        id: '123',
        type: 1,
      },
    });
  },

  onLoad: function (options) {

    let icon_list = this.data.icon_list;
    let default_quiz;

    wx.setNavigationBarTitle({
      title: '',
    })

    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    // 传来的
    let all_quiz_list = [{
      name: '热门',
      id: 0,
      quizzes: [{
        id: 1,
        title: '信号与系统',
        type: '证',
        description: '选择题，填空题，改错题',
        tags: ['青云官方'],
        score: 4.8,
        author: '青云',
        add_num: 13
      }, {
        id: 2,
        title: '教师资格证',
        type: '证',
        description: '选择题，填空题，改错题',
        tags: ['是猪'],
        score: 3.0,
        author: '皇甫素素',
        add_num: 13
      }, {
        id: 3,
        title: 'CET6乱序版',
        type: '证',
        description: '选择题，填空题，改错题',
        tags: ['New'],
        score: 1.3,
        author: '刘鹏',
        add_num: 13
      }]
    }, {
      name: '考证',
      id: 1,
      quizzes: [{
        id: 4,
        title: '计算机二级C语言',
        type: '证',
        description: '选择题，填空题，改错题',
        tags: ['New'],
        score: 2.5,
        author: '黄璞',
        add_num: 27
      }, ]
    }, {
      name: '考研',
      id: 2
    }, {
      name: '公共课',
      id: 3
    }, {
      name: '理科',
      id: 4
    }, {
      name: '工科',
      id: 5,
      quizzes: [{
        id: 0,
        title: '固体物理',
        type: '证',
        description: '选择题，填空题，改错题',
        tags: ['青云官方'],
        score: 0.1,
        author: '黄鹏宇',
        add_num: 13
      }, ]
    }, {
      name: '文科',
      id: 6
    }, {
      name: '艺术类',
      id: 7
    }]

    // 传来的
    let self_quiz_list = [{
      id: 1,
      title: '计算机二级',
      is_default: false,
      done_num: 10,
      total_num: 100,
      star_num: 22,
      err_num: 12
    }, {
      id: 2,
      title: 'CET-6乱序版',
      is_default: false,
      done_num: 27,
      total_num: 1080,
      star_num: 22,
      err_num: 12
    }, {
      id: 3,
      title: '固体物理',
      is_default: true,
      done_num: 100,
      total_num: 341,
      star_num: 22,
      err_num: 12
    }, {
      id: 4,
      title: '教师资格证',
      is_default: false,
      done_num: 78,
      total_num: 90,
      star_num: 22,
      err_num: 12
    }]

    // 设置上次做题的题库
    self_quiz_list.forEach(quiz => {
      if (quiz.is_default) {
        default_quiz = quiz;
        return
      }
    })

    if (default_quiz != null) {
      icon_list[0].badge = default_quiz.total_num - default_quiz.done_num
      icon_list[2].badge = default_quiz.err_num
      icon_list[3].badge = default_quiz.star_num
    } else {
      console.log("无做题记录")
    }


    this.setData({
      all_quiz_list,
      default_quiz,
      icon_list,
      listCur: all_quiz_list[0],
      self_quiz_list,
    })
  },

  onReady: function () {
    wx.hideLoading()
  },

  onShow: function () {

  },

  onHide: function () {

  },

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