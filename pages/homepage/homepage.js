// pages/homepage/homepage.js
const helpList = []


import UserService from '../../net/service/userService.js'
import DocService from '../../net/service/docService.js'

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
        "imgUrl": "https://file.qdu.life/showdoc_16194609902142511621.png",
        // "author": "一键搜索青大空教室",
        "mainTitle": "青空教室",
        "subTitle": "点击进入",
        "url": ""
      },
      {
        "imgUrl": "https://cdns.qdu.life/qingyun/images/medal3.png",
        "subTitle": "本周最受欢迎",
        "mainTitle": "黄鹏宇~",
        // "author": "83份",
        // "buttonText": "他的作品",
        "url": ""
      }
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

  handleSearchSuccess: function (e) {
    this.setData({
      searchResultList: e
    })
    wx.hideLoading()
  },

  onTapSearchBtn: function (e) {
    if(e.detail==""){
      wx.showToast({
        icon:'none',
        title: '关键词不能为空',
      })
      return
    }
    wx.showLoading({
      title: '正在搜索中',
    })
    DocService.SearchDoc(this.handleSearchSuccess, e.detail)
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

    this.setData({
      documentList
    })

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

  jump2DocPreview: function (e) {
    let id = e.currentTarget.dataset.id
    push({
      name: 'preview_doc',
      data: {
        id
      }
    });
  },
  jump2Detail: function (e) {
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
    let boughtList = app.globalData.boughtDocList;

    app.globalData.hotDoc.forEach(element => {
      element.subTitle = element.introduce
      documentList.push(element)
    });


    this.setData({
      documentList,
      boughtList
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