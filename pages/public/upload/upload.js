// pages/public/upload/upload.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedNeedKnow: false,
    //   url: 'http://iph.href.lu/60x60?text=default',
    //   name: 'pdf',
    //   isImage: false,
    //   deletable: true,

    fileList: [],
    chooseTag: true,
    modalName: null,
    selected_tag_list: [],
    selectedCount: 0,
    showCategoryPopup: false,
    showUploadProgressPopup: false,
    uploadProgressValue: 0,
    gradientColor: {
      '0%': '#ffe9a7',
      '100%': '#27b1ff',
    },
    upload_step_title: "上传图片",
    upload_step_detail: "1 / 5",
    categoryList: app.globalData.categoryList,
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
  onTapShowCategoryPopup: function () {
    this.setData({
      showCategoryPopup: true
    })
  },

  onCloseUploadProgressPopup:function(){
    this.setData({
      showUploadProgressPopup: false
    })
  },
  submitUpload: function () {
    this.setData({
      showUploadProgressPopup: true
    })

    setInterval(() => {

      if(this.data.uploadProgressValue == 20){
        this.setData({upload_step_detail:"2 / 5"})
      }
      if(this.data.uploadProgressValue == 30){
        this.setData({upload_step_detail:"3 / 5"})
      }
      if(this.data.uploadProgressValue == 40){
        this.setData({upload_step_detail:"4 / 5"})
      }
      if(this.data.uploadProgressValue == 50){
        this.setData({upload_step_detail:"5 / 5"})
      }
      if(this.data.uploadProgressValue == 60){
        this.setData({upload_step_title:"上传资料中",upload_step_detail:""})
      }
      if(this.data.uploadProgressValue == 100){
        this.setData({upload_step_title:"上传完成"})
      }
      this.setData({
        uploadProgressValue : this.data.uploadProgressValue + 10
      })
    }, 1000);
  },
  onCloseCategoryPopup: function () {
    this.setData({
      showCategoryPopup: false
    })
  },
  deleteFile: function (e) {
    const {
      fileList = []
    } = this.data;
    //从start的位置开始向后删除delCount个元素
    fileList.splice(e.detail.index, 1);
    this.setData({
      fileList
    })

  },
  // 选择文件
  afterRead: function (event) {
    // file是个数组
    const {
      file
    } = event.detail;

    const {
      fileList = []
    } = this.data;

    file.forEach(element => {
      if (element.type == "image") {
        element.isImage = true
      }

      fileList.push(element)
    });



    this.setData({
      fileList
    });
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  showChooseTagModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  jump2DocPreview: function () {
    push({
      name: "upload_preview"
    })
  },
  hideChooseTagModal(e) {
    this.setData({
      modalName: null
    })
  },
  onChangeNeedKown: function (event) {
    this.setData({
      checkedNeedKnow: event.detail,
    });

  },
  confirmChooseTag: function () {
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