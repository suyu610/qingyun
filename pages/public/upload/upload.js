// pages/public/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedNeedKnow: false,
    fileList: [{
      url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      name: '图片1',
    }, {
      url: 'http://iph.href.lu/60x60?text=default',
      name: 'pdf',
      isImage: false,
      deletable: true,
    }, ],
    chooseTag: true,
    modalName: null,
    selected_tag_list: [],
    selectedCount: 0,
    checkbox: [{
      value: 0,
      name: '自制',
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '试卷',
      checked: false,
      hot: false,
    }, {
      value: 2,
      name: '笔记',
      checked: false,
      hot: true,
    }, {
      value: 3,
      name: '考试攻略',
      checked: false,
      hot: false,
    }, {
      value: 4,
      name: '押题',
      checked: false,
      hot: false,
    }, {
      value: 5,
      name: '考研',
      checked: false,
      hot: false,
    }]
  },
  showChooseTagModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideChooseTagModal(e) {
    this.setData({
      modalName: null
    })
  },
  onChangeNeedKown:function(event){
    this.setData({
      checkedNeedKnow: event.detail,
    });

  },
  confirmChooseTag:function() {
    let selected_tag_list = []
    let items = this.data.checkbox;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].checked) {
        selected_tag_list.push(items[i].name)
      }
    }

    if (selected_tag_list.length > 3) {
      wx.showToast({
        icon: 'none',
        title: '标签不能超过3个',
      })
    } else {
      this.hideChooseTagModal();
      this.setData({
        selected_tag_list,
      })
    }

  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    let selectedCount = this.data.selectedCount;

    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        if (!items[i].checked) {
          selectedCount++;
        } else {
          selectedCount--;
        }
        if (selectedCount > 3) {
          wx.showToast({
            icon: 'none',
            title: '标签不能超过3个',
          })
          return
        }
        items[i].checked = !items[i].checked;

      }
    }
    console.log(selectedCount)

    this.setData({
      selectedCount,
      checkbox: items
    })
  },
  noop: function () {

  },
  onTapChooseTag: function () {
    this.setData({
      modalName: "chooseTag"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '上传资料',
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