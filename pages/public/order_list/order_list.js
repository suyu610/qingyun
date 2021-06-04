// pages/public/order_list/order_list.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

import {
  push
} from '../../../utils/router/index.js';

Page({
  data: {
    option1: [{
        text: '全部订单',
        value: 0
      },
      {
        text: '已完成',
        value: 1
      },
      {
        text: '正在配送',
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

  addComment:function(){
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

  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '我的知识库',
    })
  },
  jump2PreviewDoc:function(){
    push({name:"preview_doc"})
  },
  onShareAppMessage: function () {

  }
})