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
    avatar: {},
    showMajorPopup: false,
    majorList: {},
    back_majorList: {},
    upload_major: [{
      name: "电子信息学院"
    }, {
      name: "微电子工程"
    }],
    upload_majorId: 1100,
    upload_major_name:"",
    upload_college_name:"",
    upload_tel: 13073706946,
    upload_address: "中心校区 博学楼",
    upload_introduce: "好好好",
    upload_scholar_introduce: "大一 1/235"

  },

  confirmMajor(e) {
    console.log(e)
    this.setData({
      upload_major: e.detail.values,
      showMajorPopup: false,
      upload_college_name:e.detail.values[0].name,
      upload_major_name:e.detail.values[1].name
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
      icon:'none',
      title: e,
    })
  },

  saveOk: function () {
    let params = {
      avatarUrl:this.data.avatarUrl,
      upload_major_name:this.data.upload_major_name,
      upload_college_name:this.data.upload_college_name,
      upload_tel:this.data.upload_tel,
      upload_address:this.data.upload_address,
      upload_introduce:this.data.upload_introduce,
      upload_scholar_introduce:this.data.upload_scholar_introduce
    }
    UserService.modifyProfile(this.handleModifyProfileSuccess, this.handleModifyProfileFail, params)
  },
  jump2Profile: function () {
    push({
      name: 'profile',
      data: {
        id: '123',
        type: 1,
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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