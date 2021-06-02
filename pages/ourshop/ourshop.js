// pages/homepage/homepage.js
import { push } from '../../utils/router/index.js';

Page({
  data: {
       ////////// 頂部輪播圖 //////////
    adsList: [{
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-1.jpg"
      },
      {
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-2.jpg"
      },
      {
        "imgUrl": "https://img01.yzcdn.cn/vant/apple-3.jpg"
      },
    ],
    adsIndicatorDots: true,
    adsAutoplay: false,
    adsInterval: 8000,
    adsDuration: 1000,
    //////////////////////////////////////
    /////////// 热门   //////////////////
    triggered: false,

    /////////// 求助頁 ///////////////////

    //////////////////////////////


  },
  onScrollRefresh: function () {
    console.log("刷新")
    wx.vibrateShort()
    let that = this;
    wx.showLoading({
      title: '刷新中',
    })
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            title: '刷新成功',
            duration: 500,
          })
          this.setData({
            triggered: false
          })
        },
      })
    }, 1000);
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
  jump2Detail: function () {
    push({
      name: 'document_detail',
      data: {
        id: '123',
        type: 1,
      },
    });
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '青空优选',
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