// pages/homepage/homepage.js
import {
  push
} from '../../utils/router/index.js';
const app = getApp()
Page({
  data: {
    iconList: [{
      icon: 'order',
      color: 'white',
      badge: 120,
      name: '顺序答题'
    }, {
      icon: 'text',
      color: 'white',
      badge: 0,
      name: '模拟测试'
    }, {
      icon: 'warn',
      color: 'white',
      badge: 12,
      name: '错题本'
    }, {
      icon: 'favor',
      color: 'white',
      badge: 22,
      name: '收藏本'
    }],
    gridCol: 4,
    skin: false,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    ////////// 頂部輪播圖 //////////
    adsList: [{
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-1.jpg"
      },
      {
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-2.jpg"
      },
      {
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-3.jpg"
      },
    ],
    adsIndicatorDots: true,
    adsAutoplay: false,
    adsInterval: 8000,
    adsDuration: 1000,
    //////////////////////////////////////
    /////////// 热门   //////////////////
    triggered: false,

    /////////// 卡片 ///////////////////

    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],


  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  jump2Answer(e) {
    wx.navigateTo({
      url: 'answerQuestions/answerQuestions',
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
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
  jump2Detail: function () {
    push({
      name: 'quiz_detail_unsub',
      data: {
        id: '123',
        type: 1,
      },
    });
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '',
    })


    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    for (let i = 0; i < 7; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }

    list[0].name = "热门"

    this.setData({
      list: list,
      listCur: list[0]
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