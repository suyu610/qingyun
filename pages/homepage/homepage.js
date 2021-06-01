// pages/homepage/homepage.js
const documentList = [{
    docuType: "paper",
    title: "高数历年试卷",
    subTitle: "2017-2020年",
    isHot: true,
    college: "电子信息学院",
    grade: "大二",
    price: "15.00",
    downCount: "4",
    authorName: "黄鹏宇"
  },
  {
    docuType: "note",
    title: "固体物理亲手笔记",
    subTitle: "前五章",
    college: "电子信息学院",
    grade: "大二",
    price: "12.00",
    downCount: "91",
    authorName: "皇甫素素"
  },
  {
    docuType: "note",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  },
  {
    docuType: "paper",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  },
  {
    docuType: "note",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  },
  {
    docuType: "paper",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  },
  {
    docuType: "note",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  },
  {
    docuType: "paper",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  },
  {
    docuType: "note",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  },
  {
    docuType: "paper",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  },
  {
    docuType: "paper",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "臭猪"
  }
]
import {
  push
} from '../../utils/router/index.js';

Page({
  data: {
    documentList: documentList,

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

  jump2Detail: function () {
    push({
      name: 'document_detail',
      data: {
        id: '123',
        type: 1,
      },
    });
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '青云知识库',
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '青云知识库',
          imageUrl:"https://cdns.qdu.life/qingyun/images/share_1.png",
          path: '/pages/empty/empty',


        })
      }, 0)
    })
    return {
      title: '青云知识库',
      promise
    }
  }
})