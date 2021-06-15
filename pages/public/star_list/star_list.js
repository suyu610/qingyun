// pages/public/order_list/order_list.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

import
router from '../../../utils/router/index.js';
import DocService from '../../../net/service/docService.js'

Page({
  data: {
    option1: [{
        text: '全部收藏',
        value: 0
      },
      {
        text: '笔记',
        value: 1
      },
      {
        text: '试卷',
        value: 2
      }, {
        text: '攻略',
        value: 2
      },
    ],
    option2: [{
        text: '默认排序',
        value: 'a'
      },
      {
        text: '从新到旧',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      },
    ],
    value1: 0,
    value2: 'a',
    docList: [],
  },

  handleUnStarSuccess:function(e){
    DocService.GetStarDoc(this.handleGetSuccess)
    wx.showToast({
      title: e,
    })
  },

  unStar(e){


    let id = e.currentTarget.dataset.id
    DocService.UnStar(this.handleUnStarSuccess,id)
    console.log()
  },
  addComment: function () {
    Dialog.confirm({
        title: '高等数学历年试卷',
      })
      .then(() => {
        wx.showToast({
          title: '评论成功',
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  jump2DocDetail(e) {
    router.push({
      name: 'document_detail',
      data: {
        id: e.currentTarget.dataset.id,
        type: 1,
      },
    });
  },
  deleteStar: function () {
    Dialog.confirm({
        title: '确定删除吗?',
        message: '高等数学'
      })
      .then(() => {
        wx.showToast({
          title: '删除成功',
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  handleGetSuccess: function (e) {
    this.setData({
      docList:e
    })
    console.log(e)
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '收藏清单',
    })
  },
  onShareAppMessage: function () {

  },

  onShow: function () {
    DocService.GetStarDoc(this.handleGetSuccess)
  }
})