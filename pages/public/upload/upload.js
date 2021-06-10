// pages/public/upload/upload.js
let app = getApp()
import UploadService from '../../../net/service/uploadService.js'
import UserService from '../../../net/service/userService.js'

let uploadTimer
import {
  push
} from '../../../utils/router/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedNeedKnow: true,
    courseTitleHasFocus: false,
    totalFileSize: 0,
    fileList: [
      // {
      //   url: 'http://iph.href.lu/60x60?text=default',
      //   name: 'pdf',
      //   isImage: false,
      //   deletable: true,
      //}

    ],
    chooseTag: true,
    modalName: null,
    selectedCount: 0,
    showCategoryPopup: false,
    showUploadProgressPopup: false,
    uploadProgressValue: 0,
    gradientColor: {
      '0%': '#ffe9a7',
      '100%': '#27b1ff',
    },
    net_type: "",
    isUploading: false,
    upload_step_title: "上传图片",
    upload_step_detail: "1 / 5",
    categoryList: {},
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
    }],
    upload_category: [],
    showDocTypeSheet: false,
    docType: "笔记",
    docTypeIndex: 0,
    docTypeActions: [{
        name: '笔记',
      },
      {
        name: '试卷',
        subname: '此类请注意版权问题,',
      },
      {
        name: '攻略',
      },
      {
        name: '其他',
      },
    ],

    uploadTimer: uploadTimer,

    /////////// 要上传的数据 ////////////////
    // 分类的id
    upload_categoryId: 100101,
    upload_tagId_list: [],
    upload_doc_previewCount: 4,
    upload_doc_title: "课程的标题课程的标题课程的标题课程的标题",
    upload_course_title: "高等数学",
    upload_doc_type: 1,
    upload_doc_price: 12,
    upload_doc_introduce: "课程介绍,巴拉巴拉巴拉吧",
  },

  onCloseDocType: function () {
    this.setData({
      showDocTypeSheet: false
    })
  },
  onSelectDocType: function (e) {
    this.setData({
      showDocTypeSheet: false,
      docType: e.detail.name,
      // 找选中该的文档类型的索引值
      upload_doc_type: ["笔记", "试卷", "攻略", "其他"].findIndex(i => i == e.detail.name)
    })
  },
  onTapShowDocTypeSheet: function () {
    this.setData({
      showDocTypeSheet: true
    })
  },
  onTapShowCategoryPopup: function () {
    this.setData({
      showCategoryPopup: true
    })
  },
  autoFillCourseTitle: function (e) {

    this.setData({
      upload_course_title: e.currentTarget.dataset.value
    })
    console.log(e.currentTarget.dataset.value)
  },
  courseTitleFocus: function () {
    this.setData({
      courseTitleHasFocus: true
    })
  },
  courseTitleBlur: function () {
    console.log(this.data.courseTitleHasFocus)

    this.setData({
      courseTitleHasFocus: false
    })
  },
  onCloseUploadProgressPopup: function () {
    this.setData({
      showUploadProgressPopup: false
    })
  },

  handleUploadInfoSuccess: function (e) {
    console.log(e)

  },
  handleUploadInfoFail: function (e) {
    console.log(e)

  },

  openSubmitUpload: function () {
    if (this.data.checkedNeedKnow == false) {
      wx.showToast({
        icon: 'none',
        title: '须同意用户须知',
      })
      return;
    }

    let that = this
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        console.log(networkType)
        that.setData({
          net_type: networkType
        })

      }
    })
    this.setData({
      showUploadProgressPopup: true
    })
  },
  
  // 上传完毕后，回到上一页
  handleGetInitDataSuccess:function(e){
    app.globalData.hotDoc = e;
    wx.showToast({
      title: '感谢耐心等待',
    })

    setTimeout(() => {
      wx.navigateBack({
        delta: 0,
      })
    }, 1000);     
  },
  ///////////////// 开始上传
  onUploadConfirmButton: function () {
    if (this.data.isUploading) {
      // 停止
      clearInterval(uploadTimer);

      this.setData({
        upload_step_detail: "1 / 5",
        uploadProgressValue: 0,
        isUploading: false,
      })
    } else {
      this.setData({
        isUploading: true,
      })
      let params = {
        upload_categoryId: this.data.upload_categoryId,
        upload_tagId_list: this.data.upload_tagId_list,
        upload_doc_previewCount: this.data.upload_doc_previewCount,
        upload_doc_title: this.data.upload_doc_title,
        upload_course_title: this.data.upload_course_title,
        upload_doc_type: this.data.upload_doc_type,
        upload_doc_price: this.data.upload_doc_price,
        upload_doc_introduce: this.data.upload_doc_introduce
      }
      UploadService.uploadInfo(this.handleUploadInfoSuccess, this.handleUploadInfoFail, params);
      uploadTimer = setInterval(() => {
        if (this.data.uploadProgressValue == 20) {
          this.setData({
            upload_step_detail: "2 / 5"
          })
        }
        if (this.data.uploadProgressValue == 30) {
          this.setData({
            upload_step_detail: "3 / 5"
          })
        }
        if (this.data.uploadProgressValue == 40) {
          this.setData({
            upload_step_detail: "4 / 5"
          })
        }
        if (this.data.uploadProgressValue == 50) {
          this.setData({
            upload_step_detail: "5 / 5"
          })
        }
        if (this.data.uploadProgressValue == 60) {
          this.setData({
            upload_step_title: "上传资料中",
            upload_step_detail: ""
          })
        }
        if (this.data.uploadProgressValue == 100) {

          this.setData({
            upload_step_title: "上传完成",
            showUploadProgressPopup:false
          })
          let params={
            fields:"hotDoc"
          }
          UserService.GetData(this.handleGetInitDataSuccess, this.handleGetInitDataFail,params)
      
        }
        this.setData({
          uploadProgressValue: this.data.uploadProgressValue + 10
        })
      }, 500);
    }
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
      fileList = [],
    } = this.data;

    let totalFileSize = this.data.totalFileSize

    file.forEach(element => {
      if (element.type == "image") {
        element.isImage = true
      }
      fileList.push(element)
      totalFileSize = totalFileSize + element.size
    });

    ;
    this.setData({
      totalFileSize,
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

  jump2NeedKnow: function () {
    push({
      name: "need_know",
      data: {
        type: 'upload',
      },
    })
  },
  hideChooseTagModal(e) {
    this.setData({
      modalName: null
    })
  },
  onChangeNeedKown: function () {
    console.log("按了多选框")
    this.setData({
      checkedNeedKnow: !this.data.checkedNeedKnow,
    });

  },
  confirmChooseTag: function () {
    // 这个放id
    let upload_tagId_list = []
    // 这个放name
    let upload_tagName_list = []

    let items = this.data.checkbox;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].checked) {
        upload_tagName_list.push(items[i].name)
        upload_tagId_list.push(items[i].value)
      }
    }

    if (upload_tagId_list.length > 3) {
      wx.showToast({
        icon: 'none',
        title: '标签不能超过3个',
      })
    } else {
      this.hideChooseTagModal();
      this.setData({
        upload_tagName_list,
        upload_tagId_list,
      })
    }
  },

  // 标签
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

  onChangePreviewCount: function (e) {
    console.log(e.detail)
    this.setData({
      upload_doc_previewCount: e.detail
    })
  },

  confirmCategory(e) {
    this.setData({
      upload_category: e.detail.values,
      showCategoryPopup: false,
      upload_categoryId: e.detail.values[2].code
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '上传资料',
    })

    let categoryList = {}
    categoryList.province_list = app.globalData.initData.category.collegeMap
    categoryList.city_list = app.globalData.initData.category.majorMap
    categoryList.county_list = app.globalData.initData.category.gradeMap
    this.setData({
      categoryList
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