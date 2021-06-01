// pages/category/category.js

const documentList = [{ 
      docuType: "paper",
      title: "高数历年试卷",
      subTitle: "2017-2020年",
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
  
  const areaList = {

    /////////////// 分类 ////////////////
    province_list: {
      110000: '全部',
      120000: '公共课程',
      130000: '电子信息学院',

    },
    city_list: {
      110100: '全部',
      120100: '公共课程',
      130100: '电子信息专业',
      130200: '微电子专业',
    },
    county_list: {
      110100: '全部',
      110101: '大一',
      110102: '大二',
      110103: '大三',
      110104: '大四',

      120100: '全部',
      120101: '大一',
      120102: '大二',
      120103: '大三',
      120104: '大四',

      130100: '全部',
      130101: '大一',
      130102: '大二',
      130103: '大三',
      130104: '大四',

      130200: '全部',
      130201: '大一',
      130202: '大二',
      130203: '大三',
      130204: '大四',
      // ....
    },
  };
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: areaList,
    documentList: documentList,
    show: false
  },
  showPopup: function () {
    this.setData({
      show: true
    });

  },
  onClose() {
    this.setData({
      show: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分类',
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