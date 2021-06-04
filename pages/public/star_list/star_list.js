// pages/public/order_list/order_list.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

import {
  push
} from '../../../utils/router/index.js';

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
  jump2DocDetail: function () {
    push({
      name: "document_detail"
    })
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
      });  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '收藏清单',
    })
  },
  onShareAppMessage: function () {

  }
})