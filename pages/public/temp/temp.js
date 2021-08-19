// pages/public/temp/temp.js
const word_audio = wx.createInnerAudioContext({});
const recorderManager = wx.getRecorderManager()

import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cValue: 'a',
    showKeyboard: true,
    answer: {},
    isSpeaking: false
  },

  hideKeyBoard: function () {
    this.setData({
      showKeyboard: false
    })
  },

  kbd_star: function (e) {
    console.log(e.detail)
  },

  kbd_showAnswer: function () {
    let that = this;
    console.log("showAnswer")
    wx.request({
      url: "https://cdns.qdu.life/e/" + that.data.cValue.toLowerCase() + ".json",
      success(e) {
        // 存在
        if (e.statusCode == 200) {
          that.setData({
            answer: e.data
          })
        }
        console.log(e)
      }
    })
  },




  play_recorder: function () {

    word_audio.src = this.data.audioRecordUrl;
    word_audio.play()
  },

  kbd_voice: function () {
    word_audio.src = "http://ali.bczcdn.com/r/" + this.data.cValue.toLowerCase() + ".mp3"
    word_audio.play()

    word_audio.onCanplay(_ => {})

    word_audio.onError(_ => {
      Toast.fail('暂无该单词发音');
    })
  },


  focusInput: function (e) {
    console.log(e)
    this.setData({
      showKeyboard: true
    })
  },


  inputValugeChanged: function (e) {
    this.setData({
      cValue: e.detail.join("")
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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