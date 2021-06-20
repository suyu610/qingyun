// pages/public/setting/setting.js
import {
  push
} from '../../../utils/router/index.js';
const app = getApp()
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';

import UserService from '../../../net/service/userService.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_mode: true,
    avatar: {},
    showMajorPopup: false,
    majorList: {},
    back_majorList: {},
    upload_major: [{
      name: "电子信息学院"
    }, {
      name: "微电子工程"
    }],
    upload_majorId: 1101,
    upload_major_name: "",
    upload_college_name: "",
    upload_tel: "",
    upload_address: "",
    upload_introduce: "",
    upload_scholar_introduce: ""

  },

  confirmMajor(e) {
    console.log(e)
    this.setData({
      upload_major: e.detail.values,
      showMajorPopup: false,
      upload_college_name: e.detail.values[0].name,
      upload_major_name: e.detail.values[1].name
    })
  },
  // 搜索分类
  onMajorSearchChange(e) {
    if (e.detail == "") {
      this.setData({
        majorList: this.data.back_majorList
      })
      return
    }
    let searchMajorList = {}
    let new_province_list = {};
    let new_city_list = this.data.back_majorList.city_list;
    let new_county_list = this.data.back_majorList.county_list;

    for (const [province_key, province_value] of Object.entries(this.data.back_majorList.province_list)) {
      if (province_value.indexOf(e.detail) != -1) {
        new_province_list[province_key] = province_value
      }
    }

    searchMajorList['province_list'] = new_province_list
    searchMajorList['city_list'] = new_city_list
    searchMajorList['county_list'] = new_county_list


    this.setData({
      majorList: searchMajorList
    })

  },
  onTapShowMajorPopup: function () {
    this.setData({
      showMajorPopup: true
    })
  },
  onCloseMajorPopup: function () {
    this.setData({
      showMajorPopup: false
    })
  },


  // 选择文件
  afterRead: function (event) {
    this.setData({
      avatar: event.detail.file
    })
  },

  handleModifyProfileSuccess(e) {
    Notify({
      type: 'success',
      message: e
    });
  },
  handleModifyProfileFail(e) {
    console.log(e)
    wx.showToast({
      icon: 'none',
      title: e,
    })
  },

  saveOk: function () {
    wx.showLoading({
      title: '正在内容检测',
    })

    // 用腾讯云的内容检测
    wx.cloud.callFunction({
      name: 'contentFilter',
      data: {
        content: this.data.upload_introduce + this.data.upload_scholar_introduce //传入文本内容
      }
    }).then(ckres => {
      wx.hideLoading()
      //审核通过
      if (ckres.result.errCode == 0) {
        let params = {
          avatarUrl: this.data.avatarUrl,
          upload_major_name: this.data.upload_major_name,
          upload_college_name: this.data.upload_college_name,
          upload_tel: this.data.upload_tel,
          upload_address: this.data.upload_address,
          upload_introduce: this.data.upload_introduce,
          upload_scholar_introduce: this.data.upload_scholar_introduce
        }
        
        UserService.modifyProfile(this.handleModifyProfileSuccess, this.handleModifyProfileFail, params)
      } else if (ckres.result.errCode == 44004) {
        wx.hideLoading()

        wx.showModal({
          title: '修改失败',
          content: '内容为空',
          showCancel: false
        })
      } else {
        wx.hideLoading()

        wx.showModal({
          title: '修改失败',
          content: '检测到敏感词,请注意言论',
          showCancel: false
        })
      }
    })

  },
  jump2Profile: function () {
    push({
      name: 'profile',
      data: {
        ssNumber: this.data.ssNumber,
        upload_introduce: this.data.upload_introduce,
        upload_scholar_introduce: this.data.upload_introduce
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人资料',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleGetSuccess: function (e) {
    this.setData({
      upload_address: e.address,
      upload_tel: e.contact,
      avatar: {
        url: e.avatarUrl
      },
      upload_introduce: e.introduce,
      upload_scholar_introduce: e.scholarIntroduce,
      name: e.name,
      ssNumber: e.ssNumber,
      upload_major: [{
        name: e.collegeName,
      }, {
        name: e.majorName,
      }],
    })
  },

  handleGetFail: function (e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
    // 发一次获取个人资料的请求
    UserService.GetSelfProfile(this.handleGetSuccess, this.handleGetFail)
    let majorList;
    if (app.globalData.categoryList == null) {
      majorList = wx.getStorageSync('categoryList')
    } else {
      majorList = app.globalData.categoryList
    }
    let back_majorList = majorList

    this.setData({
      majorList,
      back_majorList
    })
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