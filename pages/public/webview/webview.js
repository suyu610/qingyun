// pages/public/about/about.js

import router from '../../../utils/router/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"https://mp.weixin.qq.com/s?__biz=Mzg4NTQ3NjE5MQ==&mid=100000039&idx=1&sn=327a94ebc74fd7cebcbd6275e65f88a8&chksm=4fa91f1778de9601ec4b2ef693eca119955bd790bdeffd4e469a5e45bbdc404d64402dc50f57"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);
    let url = "https://mp.weixin.qq.com/s?__biz=Mzg4NTQ3NjE5MQ==&mid=100000039&idx=1&sn=327a94ebc74fd7cebcbd6275e65f88a8&chksm=4fa91f1778de9601ec4b2ef693eca119955bd790bdeffd4e469a5e45bbdc404d64402dc50f57";
    if (data != null) {
      url = data.url;
    }
    this.setData({
      url: url
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