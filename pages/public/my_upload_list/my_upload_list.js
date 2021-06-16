// pages/public/doc_list/doc_list.js
import {
  push
} from '../../../utils/router/index.js';

import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import DocService from '../../../net/service/docService.js'

const noteList = []
const paperList = []
const strategyList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionSheet: false,
    actionSheetActions: [{
        value: 'modify',
        name: '修改'
      },
      {
        value: 'previewShop',
        name: '查看商品页面'
      },
      {
        value: 'preview',
        name: '查看文档'
      },
      {
        value: 'del',
        name: '暂停发布',
        color: '#ee0a24'
      },
    ],
    noteList: [],
    paperList: [],
    strategyList: [],
    height: "95vh",
    longtap: false
  },
  onCloseActionSheet: function () {
    this.setData({
      showActionSheet: false
    })
  },
  tapActionSheet: function (e) {
    if (e.detail.value == "modify") {
      this.jump2MyUploadModify()
      return;
    }
    if (e.detail.value == "preview") {
      this.jump2DocPreview()
      return;
    }

    if (e.detail.value == "del") {
      this.confirmUnPublished();
      return;
    }

    if (e.detail.value == "previewShop") {
      this.jump2Preview();
      return;
    }

  },
  jump2Preview: function () {
    push({
      name: "upload_preview"
    })
  },
  jump2DocPreview: function () {
    push({
      name: "preview_doc"
    })
  },
  // 停止发布 
  confirmUnPublished: function () {
    Dialog.confirm({
        title: '确认暂停发布？',
        message: '固体物理亲手笔记',
      })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },
  onTapCell: function () {
    this.setData({
      showActionSheet: true
    })
  },
  jump2MyUploadModify: function () {
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
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getListSuccess: function (e) {

    // docuType: "note",
    // title: "固体物理亲手笔记",
    // subTitle: "前五章",
    // college: "电子信息学院",
    // grade: "大二",
    // isHot: false,
    // price: "0",
    // downCount: "0",
    // authorName: "下载:0",
    // uploadStatus: "verify"
    let downCount = 0
    let noteList = []
    let paperList = []
    let strategyList = []
    e.forEach(element => {
      downCount = downCount + element.downCount
      if (element.typeName == "笔记") {
        noteList.push(element)
      }
      if (element.typeName == "试卷") {
        paperList.push(element)
      }
      if (element.typeName == "攻略") {
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
    // 分类

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    DocService.GetMyUploadDoc(this.getListSuccess, this.getListFail)

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
    wx.showToast({
      title: '刷新成功',
    })
    DocService.GetMyUploadDoc(this.getListSuccess, this.getListFail)

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