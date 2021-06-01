Page({
  data: {
    InputBottom: 0
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },

  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '黄鹏宇',
    })
  }
})