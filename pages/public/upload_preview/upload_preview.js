// pages/document_detail/document_detail.js
import {
  push
} from '../../../utils/router/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 预览图
    previewList: [{
        "id": 0,
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-1.jpg"
      },
      {
        "id": 0,
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-2.jpg"
      },
      {
        "id": 0,
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-3.jpg"
      },
    ],
    previewIndicatorDots: true,
    previewAutoplay: false,
    previewInterval: 8000,
    previewDuration: 1000,

  },
  jump2BuyConfirm:function(){
    push({name:"buy_confirm"})
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

  jump2Chat: function () {
    push({
      name: 'chat',
      data: {
        id: '123',
        type: 1,
      },
    });
  },
  //预览图片
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    var previewImgArr = [];
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = that.data.previewList;
    for (var i in data) {
      previewImgArr.push(data[i].imgUrl);
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
  },

  // 跳转小程序
  jump2Qk: function () {
    wx.navigateToMiniProgram({
      appId: 'wx607821b428f6d5d1',
      path: '',
      envVersion: 'release', // 打开正式版
      success(res) {
        // 打开成功
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '资料详情',
    })
  },

  onReady: function () {

  },


  onShow: function () {

  },

  onHide: function () {

  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})