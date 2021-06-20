// pages/public/doc_list/doc_list.js
import router from '../../../utils/router/index.js';

import CateService from '../../../net/service/cateService.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteList: [],
    paperList: [],
    strategyList: [],
    courseName: "",
    totalCount: 0,
    height: "95vh"
  },
  jump2Detail: function (e) {
    let id = e.currentTarget.dataset.id
    router.push({
      name: "document_detail",
      data:{id:id}
    })
  },

  handleGetSuccess:function(e){
    let downCount = 0
    let noteList = []
    let paperList = []
    let strategyList = []
    e.forEach(element => {
      downCount = downCount + element.downCount
      if (element.docuType == "note") {
        noteList.push(element)
      }
      if (element.docuType == "paper") {
        paperList.push(element)
      }
      if (element.docuType == "strategy") {
        strategyList.push(element)
      }
    });

    this.setData({
      noteList,
      paperList,
      strategyList,
      downCount,
      triggered: false
    })
  },

  handleGetFail:function(e){
    wx.showToast({
      title: e,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);
    let courseName = data.courseName

    this.setData({
      courseName
    })

    CateService.GetCourseListByCourseName(this.handleGetSuccess, this.handleGetFail, courseName)

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
  onShow: function () {},

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