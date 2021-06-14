// pages/public/self_profile/self_profile.js
import router from '../../../utils/router/index.js';
import UserService from '../../../net/service/userService.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    profile:{},

  },
  backTo: function () {
    wx.navigateBack({
      delta: 0,
    })
  },
  jump2DocDetail(e){
    router.push({
      name: 'document_detail',
      data: {
        id: e.currentTarget.dataset.id,
        type: 1,
      },
    });
  },
  handleGetProfileBySsNumberSuccess:function(e){
    e.grade =  e.ssNumber.slice(0,4)
    let docList = []

    e.docList.forEach(function (element) {
      if (/\.(gif|jpg|jpeg|png|GIF|JPEG|JPG|PNG)$/.test(element.previewImageUrl)) {
        docList.push({
          'id': element.id,
          'previewImageUrl': element.previewImageUrl + "/preview_image",
          'title':element.title,
          'docuType':element.ducuType
        })
      }
    })


    this.setData({profile:e,docList})
    console.log(e)
  },

  handleGetProfileBySsNumberFail:function(e){
    console.log(e)
    wx.showToast({
      title: '系统错误',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);
    UserService.GetProfileBySsNumber(this.handleGetProfileBySsNumberSuccess,this.handleGetProfileBySsNumberFail, 2019205913)
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