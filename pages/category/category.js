const app = getApp();
import {
  push
} from '../../utils/router/index.js';


Page({
  data: {
    hidden: true,
    areaList: {
      province_list: {},
      city_list: {},
      county_list: {},
    }
  },
  jump2DocList: function () {
    push({
      name: 'doc_list',
      data: {
        id: '123',
        type: 1,
      },
    });
  },
  showPopup: function () {
    this.setData({
      show: true
    });
  },

  confirmCategory() {
    // 发送请求
    //
    wx.showLoading({
      title: '处理中',
    })
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {

          this.onClose();

        },
      })
    }, 1000);
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '课程分类',
    })
    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    this.setData({
      categoryList:app.globalData.categoryList
    })

    this.setData({
      list: list,
      listCur: list[0]
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
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    console.log("测试")

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
      if(this.data.listCur != that.data.list[num]){
        console.log("改变")
        wx.vibrateShort();
      }
      this.setData({
        listCur: that.data.list[num]
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
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  }
});