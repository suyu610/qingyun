// pages/quiz/quiz_detail/quiz_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [{
        icon: 'order',
        color: '#27B1FF',
        badge: 120,
        name: '顺序答题'
      }, {
        icon: 'text',
        color: '#27B1FF',
        badge: 0,
        name: '模拟测试'
      }, {
        icon: 'warn',
        color: '#27B1FF',
        badge: 12,
        name: '错题本'
      }, {
        icon: 'favor',
        color: '#27B1FF',
        badge: 22,
        name: '收藏本'
      }, {
        icon: 'selection',
        color: '#27B1FF',
        badge: 0,
        name: '历史成绩'
      }, {
        icon: 'rank',
        color: '#27B1FF',
        badge: 0,
        name: '排行榜'
      },
      {
        icon: 'add',
        color: '#27B1FF',
        badge: 0,
        name: '添加题目'
      },{
        icon: 'comment',
        color: '#27B1FF',
        badge: 0,
        name: '评分评论'
      }
    ],
  gridCol: 4,
  skin: false,
  gridBorder: false,
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '计算机二级 - C语言',
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