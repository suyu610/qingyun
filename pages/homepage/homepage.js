// pages/homepage/homepage.js
const helpList = []


import UserService from '../../net/service/userService.js'

import {
  push
} from '../../utils/router/index.js';
let app = getApp()
Page({
  data: {
    documentList: [],
    helpList: helpList,
    ////////// 頂部輪播圖 //////////
    adsList: [{
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "subTitle": "本周上传资料最多",
        "mainTitle": "黄鹏宇",
        "author": "83份",
        "buttonText": "他的作品",
        "url": ""
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

    /////////// 求助頁 ///////////////////

    //////////// 搜索框 //////////////////
    showSearch: false
  },

  onSearchTap: function () {
    this.setData({
      showSearch: true
    })
  },

  onTapCancelSearch: function () {
    this.setData({
      showSearch: false
    })
  },


  handleGetInitDataSuccess: function (e) {

    let documentList = [];
    e.hotDoc.forEach(element => {
      element.subTitle = element.introduce
      documentList.push(element)
    });

    this.setData({documentList})

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
  },

  // 下拉刷新
  onScrollRefresh: function () {
    UserService.GetData(this.handleGetInitDataSuccess, this.handleGetInitDataFail, {
      fields: "hotDoc"
    })

 


    wx.vibrateShort()
    wx.showLoading({
      title: '刷新中',
    })

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

  jump2OrderList: function () {
    push({
      name: 'order_list',
    });
  },

  jump2DocPreview: function () {
    push({
      name: 'preview_doc',
    });
  },
  jump2Detail: function (e) {
    console.log(e)
    push({
      name: 'document_detail',
      data: {
        id: e.currentTarget.dataset.id,
        type: 1,
      },
    });
  },

  onShow: function () {
    let documentList = []

    app.globalData.hotDoc.forEach(element => {
      element.subTitle = element.introduce
      documentList.push(element)
    });
    this.setData({
      documentList
    })
  },

  onLoad: function (options) {
    if (app.globalData.msgList != null) {
      wx.setTabBarBadge({
        index: 3,
        text: app.globalData.initData.msgList.length,
      })
    }
    wx.setNavigationBarTitle({
      title: '青云知识库',
    })




  },
})