// pages/public/doc_list/doc_list.js
import {
  push
} from '../../../utils/router/index.js';

const noteList = [{
    docuType: "note",
    title: "固体物理亲手笔记",
    subTitle: "前五章",
    college: "电子信息学院",
    grade: "大二",
    isHot: true,
    price: "10.00",
    downCount: "91",
    authorName: "下载:5"
  },
  {
    docuType: "note",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "下载:5"
  },
  {
    docuType: "note",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    isHot: true,

    authorName: "下载:6"
  }, {
    docuType: "note",
    title: "临床医学医学英语笔记+高口笔记-打印版",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "下载:1500"
  }
]
const paperList = [{
    docuType: "paper",
    title: "高数历年试卷",
    subTitle: "2017-2020年",
    isHot: true,
    college: "电子信息学院",
    grade: "大二",
    price: "15.00",
    downCount: "4",
    authorName: "下载:1500"
  },
  {
    docuType: "paper",
    title: "固体物理试卷",
    isHot: true,

    subTitle: "前五章",
    college: "电子信息学院",
    grade: "大二",
    price: "12.00",
    downCount: "91",
    authorName: "下载:150"
  },
  {
    docuType: "paper",
    isHot: true,

    title: "临床医学试卷",
    subTitle: "3000词",
    college: "医学部",
    grade: "所有",
    price: "225.00",
    downCount: "0",
    authorName: "下载:15"
  }
]
const strategyList = [{
    docuType: "strategy",
    title: "高数应试攻略",
    subTitle: "",
    isHot: true,
    college: "电子信息学院",
    grade: "大二",
    price: "15.00",
    downCount: "4",
    authorName: "下载:777"
  },
  {
    docuType: "strategy",
    title: "固体物理应试攻略",
    subTitle: "前五章",
    college: "电子信息学院",
    grade: "大二",
    price: "12.00",
    isHot: true,
    downCount: "91",
    authorName: "下载:999"
  },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteList: noteList,
    paperList: paperList,
    strategyList: strategyList,
    height: "95vh"
  },
  jump2MyUploadDetail: function () {
    push({
      name: "my_upload_modify"
    })
  },

  jump2Upload: function () {
    push({
      name: "upload"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的上传',
    })
    let that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          height: res.windowHeight - 64 - 44 - 10 + "px"
        })
        console.log(res.windowHeight)
      }
    })
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