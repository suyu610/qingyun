// pages/homepage/homepage.js
import {
  push
} from '../../utils/router/index.js';

import QuizService from '../../net/service/quizService.js'

const app = getApp()
Page({
  data: {
    showSelectDefaulQuizPopup: false,
    default_quiz: {},
    icon_list: [{
      icon: 'order',
      color: 'white',
      badge: 0,
      name: '刷题模式',
      router: 'quiz_pre_questions'
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
    let that = this
    let
      default_id = event.currentTarget.dataset.name;
    let default_quiz;
    this.data.self_quiz_list.forEach(e => {
      if (e.id == default_id) {
        let icon_list = that.data.icon_list;
        default_quiz = e;
        icon_list[0].badge = default_quiz.totalNum - default_quiz.doneNum
        icon_list[2].badge = default_quiz.errNum
        icon_list[3].badge = default_quiz.starNum
        that.setData({
          icon_list,
          default_quiz
        })
        return
      }
    })

    wx.setStorageSync('default_quiz_id', default_id)

    wx.showToast({
      title: '修改成功',
      duration: 800,
    })

    this.setData({
      showSelectDefaulQuizPopup: false,
    });



  },


  onToggleSelectDefaulQuizPopup: function () {
    this.setData({
      showSelectDefaulQuizPopup: !this.data.showSelectDefaulQuizPopup
    })

    // 
  },

  jumpRoute(e) {
    let router = e.currentTarget.dataset.router
    console.log(e.currentTarget.dataset)
    push({
      name: router,
      data: {
        id: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title,
        doneNum:e.currentTarget.dataset.donenum,
        totalNum:e.currentTarget.dataset.totalnum
      }
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
  jump2Detail_unsub: function (e) {
    console.log(e)
    push({
      name: 'quiz_detail_unsub',
      data: {
        id: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title,
      },
    });
  },
  jump2Detail_sub: function (e) {
    console.log(e)
    push({
      name: 'quiz_detail_sub',
      data: {
        id: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title,

      },
    });
  },
  getAllQuizCateSuccess: function (e) {
    console.log(e)

    e.forEach(e => {
      // 把标签按分号切割
      if (e.quizzes.length != 0) {
        e.quizzes.forEach(q => {
          q.tags = q.tags.split(';')
          q.tags.pop()
        })
      }
    })

    this.setData({
      all_quiz_list: e,
      listCur: e[0],

    })
  },

  getAllQuizCateFail: function (e) {
    console.log(e)
  },


  getUserQuizCateSuccess: function (e) {
    console.log(e)
    let default_quiz;

    let default_quiz_id = app.get('default_quiz_id', 'null');

    let self_quiz_list = e

    console.log(default_quiz_id)
    // 设置上次做题的题库
    if (default_quiz_id != 'null') {
      self_quiz_list.forEach(quiz => {
        if (default_quiz_id == quiz.id) {
          default_quiz = quiz;
        }
      })

      let icon_list = this.data.icon_list;
      if (default_quiz != null) {
        icon_list[0].badge = default_quiz.totalNum - default_quiz.doneNum
        icon_list[2].badge = default_quiz.errNum
        icon_list[3].badge = default_quiz.starNum
      } else {
        console.log("无做题记录")
      }

      this.setData({
        icon_list
      })
    }

    this.setData({
      default_quiz,
      self_quiz_list,
    })

  },

  getUserQuizCateFail: function (e) {
    console.log(e)
  },
  
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '青云题库',
    })

    wx.showLoading({
      title: '加载中...',
      mask: true
    });
  },

  onReady: function () {
    wx.hideLoading()
  },

  onShow: function () {
    QuizService.getAllQuizCate(this.getAllQuizCateSuccess, this.getAllQuizCateFail)
    QuizService.getUserQuizCate(this.getUserQuizCateSuccess, this.getUserQuizCateFail)

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