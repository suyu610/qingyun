// pages/document_detail/document_detail.js
import router from '../../utils/router/index.js';
import DocService from '../../net/service/docService.js'
import util from '../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doc: {},
    loadingStar: false,
    loadingBought: false,
    isStared: false,
    isBought: false,
    // 预览图
    previewList: [],
    docRelatedItemList: [],
    commentItemList: [],
    previewIndicatorDots: true,
    previewAutoplay: false,
    previewInterval: 8000,
    previewDuration: 1000,

  },

  jump2DocDetail: function (e) {
    router.push({
      name: 'document_detail',
      data: {
        id: e.currentTarget.dataset.id,
        type: 1,
      },
    });
  },
  jump2BuyConfirm: function () {
    if(this.data.isIos){
      wx.showToast({
        icon:'none',
        title: '不支持iOS购买',
      })
      return;
    }
    // 如果是已经购买，则跳转查看文档
    if (this.data.doc.bought) {
      router.push({
        name: "preview_doc",
        data: {
          id: this.data.doc.id,
        },
      })
      return;
    }
    router.push({
      name: "buy_confirm",
      data: {
        id: this.data.doc.id,
        price: this.data.doc.price,
        authorName: this.data.doc.authorName,
        introduce: this.data.doc.introduce,
        title: this.data.doc.title
      },
    })
  },


  jump2Profile: function () {
    router.push({
      name: 'profile',
      data: {
        ssNumber: this.data.doc.ssNumber,
      },
    });
  },

  jump2Chat: function () {
    router.push({
      name: 'chat',
      data: {
        id: '123',
        type: 1,
      },
    });
  },
  //预览图片
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    var previewImgArr = [];
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = that.data.previewList;
    for (var i in data) {
      previewImgArr.push(data[i].imgUrl);
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: previewImgArr // 需要预览的图片http链接列表
    })
  },

  // 跳转小程序
  jump2Qk: function () {
    wx.navigateToMiniProgram({
      appId: 'wx607821b428f6d5d1',
      path: '',
      envVersion: 'release', // 打开正式版
      success(res) {
        // 打开成功
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  onShow: function () {
    try {
      var res = wx.getSystemInfoSync()
      console.log(res.platform)
      if (res.platform == "ios") {
        this.setData({
          isIos:true
        })
      }
    } catch (e) {

      // Do something when catch error

    }
  },
  handleStarSuccess(e) {
    wx.showToast({
      title: e,
    })
    let doc = this.data.doc

    if (this.data.isStared) {
      doc.starCount--
    } else {
      doc.starCount++
    }
    this.setData({
      isStared: !this.data.isStared,
      doc,
      loadingStar: false
    })
  },

  //  点击收藏按钮
  onTapStar(e) {
    let id = e.currentTarget.dataset.id

    this.setData({
      loadingStar: true,
    })
    // 判断收藏状态
    // 如果是已收藏，则为取消
    if (this.data.isStared) {
      DocService.UnStar(this.handleStarSuccess, id)
    } else {
      DocService.Star(this.handleStarSuccess, id)
    }
  },
  handleGetDetailSuccess: function (e) {
    var str = e.price + "";
    if (str.indexOf(".") == -1) {
      // 整数
      e.price = e.price + ".00"
    }


    let previewList = []
    e.files.forEach(function (element) {
      if (/\.(gif|jpg|jpeg|png|GIF|JPEG|JPG|PNG)$/.test(element)) {
        previewList.push({
          'id': 0,
          'imgUrl': element + "/preview_image"
        })
      }
    })
    e.commentItemList.forEach(function (element) {
      element.createTime = util.timeFormatSeconds(element.createTime)
    })
    this.setData({
      doc: e,
      isStared: e.stared,
      isBought: e.bought,
      previewList,
      isStared: e.stared,
      docRelatedItemList: e.docRelatedItemList,
      commentItemList: e.commentItemList
    })
    console.log(app.globalData)
    if(app.globalData.ssNumber=="2019205913" || app.globalData.ssNumber=="2019205883"){
      e.bought=true;
      this.setData({
        isBought: true,
        doc:e,        
      })
    }
  },

  onLoad: function (options) {
    const data = router.extract(options);
    DocService.GetDocDetail(this.handleGetDetailSuccess, data.id)
    wx.setNavigationBarTitle({
      title: '资料详情',
    })
  },

})