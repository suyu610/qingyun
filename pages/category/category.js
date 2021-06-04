const app = getApp();
import {
  push
} from '../../utils/router/index.js';

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
  data: {
    hidden: true,
    areaList:areaList
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
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
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