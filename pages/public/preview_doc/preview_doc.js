// pages/public/preview_doc/preview_doc.js
import router from '../../../utils/router/index.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);
    let docId = 137;
    if (data != null) {
      docId = data.id;
    }
    this.setData({
      url: "https://book.qdu.life/doc_detail.html?id=" + docId + "&token=" + app.globalData.token
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})