// pages/public/temp/temp.js
const word_audio = wx.createInnerAudioContext({});
const recorderManager = wx.getRecorderManager()
const app = getApp();
let richText = null; //富文本编辑器实例
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cValue: 'a',
    showKeyboard: true,
    answer: {},
    isSpeaking: false,
    placeholder: '开始编辑吧...',
  },

  // 编辑器初始化完成时触发，可以获取组件实例
  onEditorReady() {
    console.log('[onEditorReady callback]')
    richText = this.selectComponent('#richText'); //获取组件实例
  },
  hideKeyBoard: function () {
    this.setData({
      showKeyboard: false
    })
  },

  kbd_star: function (e) {
    console.log(e.detail)
  }, //保存，获取编辑器内容
  getEditorContent(res) {
    let {
      value
    } = res.detail;
    wx.showToast({
      title: '获取编辑器内容成功',
      icon: 'none',
    })
    console.log('[getEditorContent callback]=>', value)
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

  //插入图片
  insertImageEvent() {
    wx.chooseImage({
      count: 1,
      success: res => {
        let path = res.tempFilePaths[0];
        //调用子组件方法，图片应先上传再插入，不然预览时无法查看图片。
        richText.insertImageMethod(path).then(res => {
          console.log('[insert image success callback]=>', res)
        }).catch(res => {
          console.log('[insert image fail callback]=>', res)
        });
      }
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