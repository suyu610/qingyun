const app = getApp();
import {
  push
} from '../../utils/router/index.js';

import cateService from '../../net/service/cateService.js'


Page({
  data: {
    hidden: true,
    showCategoryPopup: false,
    categoryList: {
      province_list: {},
      city_list: {},
      county_list: {},
    },
    courseList: [],
    back_categoryList: {}
  },
  jump2DocList: function (e) {
    let courseName = e.currentTarget.dataset.coursename.value[0]
    push({
      name: 'doc_list',
      data: {
        courseName,
        type: 1,
      },
    });
  },
  showCategoryPopup: function () {
    this.setData({
      showCategoryPopup: true
    });
  },

  onCategorySearchChange(e) {
    if (e.detail == "") {
      this.setData({
        categoryList: this.data.back_categoryList
      })
      return
    }

    let searchCategoryList = {}
    let new_province_list = {};
    let new_city_list = this.data.back_categoryList.city_list;
    let new_county_list = this.data.back_categoryList.county_list;

    for (const [province_key, province_value] of Object.entries(this.data.back_categoryList.province_list)) {
      if (province_value.indexOf(e.detail) != -1) {
        new_province_list[province_key] = province_value
      }
    }

    searchCategoryList['province_list'] = new_province_list
    searchCategoryList['city_list'] = new_city_list
    searchCategoryList['county_list'] = new_county_list


    this.setData({
      categoryList: searchCategoryList
    })

  },
  onCloseCategoryPopup() {
    this.setData({
      showCategoryPopup: false
    });
  },
  confirmCategory() {
    // 发送请求


    wx.showLoading({
      title: '处理中',
    })
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {
          this.setData({
            showCategoryPopup: false
          })

          this.onClose();

        },
      })
    }, 1000);
  },
  handleGetAllCourse: function (e) {
    let list = [];
    for (const [key, value] of Object.entries(e)) {
      if (value.length != 0) {
        list.push({
          "key": key,
          "value": value
        })
      }
    }
    this.setData({
      courseList: e,
      list: list,
      listCur: list[0].key
    })
  },

  handleGetAllCourseFail: function (e) {
    wx.showToast({
      title: e,
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '课程分类',
    })
    this.setData({
      categoryList: app.globalData.categoryList,
      back_categoryList: app.globalData.categoryList
    })
  },

  onShow() {
    if (this.data.categoryList == null || this.data.categoryList.province_list == null) {
      app.globalData.categoryList = wx.getStorageSync('categoryList')
    }
    if (this.data.courseList.length == 0) {
      cateService.getAllCourse(this.handleGetAllCourse, this.handleGetAllCourseFail);
    }
    this.setData({
      categoryList: app.globalData.categoryList,
      back_categoryList: app.globalData.categoryList
    })
  },


  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id].key,
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      if (num > that.data.list.length - 1) {
        return;
      }
      if (this.data.listCur != that.data.list[num]) {
        wx.vibrateShort();
      }
      this.setData({
        listCur: that.data.list[num].key
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i].key,
          movableY: i * 20
        })
        return false
      }
    }
  }
});