// pages/public/order_list/order_list.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import OrderService from '../../../net/service/orderService.js'
import UserService from '../../../net/service/userService.js'

import util from '../../../utils/util.js'
import {
  push
} from '../../../utils/router/index.js';

Page({
  data: {
    comment: "",
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

  addCommentSuccess: function (e) {
    console.log(e)
    if (e) {
      wx.showToast({
        title: '评论成功',
      })
      this.setData({
        comment: ""
      })
      wx.hideLoading()

    }else{
      wx.hideLoading()
      wx.showToast({
        title: '未知错误',
      })
    }
  },
  addCommentFail: function (e) {
    wx.hideLoading()
    wx.showToast({
      title: '未知错误',
    })
  },
  // 调用腾讯云函数
  contentFilter: function (id, title) {
    console.log(id)
    console.log(this.data.comment)
    wx.cloud.callFunction({
      name: 'contentFilter',
      data: {
        content: this.data.comment //传入文本内容
      }
    }).then(ckres => {
      console.log(ckres)
      //审核通过
      if (ckres.result.errCode == 0) {
        let params = {
          docId: id,
          content: this.data.comment
        }
        console.log("?")
        UserService.AddComment(this.addCommentSuccess, this.addCommentFail, params)

      } else if (ckres.result.errCode == 44004) {
        wx.hideLoading()

        wx.showModal({
          title: '留言失败',
          content: '内容为空',
          showCancel: false
        })
      } else {
        wx.hideLoading()

        wx.showModal({
          title: '留言失败',
          content: '检测到敏感词,请注意言论',
          showCancel: false
        })
      }
    })
  },
  addComment: function (e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    Dialog.confirm({
        closeOnClickOverlay: true,
        title: title,
      })
      .then((e) => {
        wx.showLoading({
          title: '内容检查中',
        })
        this.contentFilter(id, title)
      })
      .catch(() => {
        // on cancel
      });
  },
  getOrdersSuccess: function (e) {
    let orderList = []
    e.forEach(element => {
      element.boughtDate = util.timeFormatSeconds(element.boughtDate)
      element.orderId = element.orderId.substring(10)
      orderList.push(element)
    });
    this.setData({
      orderList
    })
  },
  onShow: function () {
    OrderService.GetAllOrders(this.getOrdersSuccess, this.getOrdersFail)
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的知识库',
    })
  },
  jump2PreviewDoc: function (e) {
    let id = e.currentTarget.dataset.id
    push({
      name: "preview_doc",
      data: {
        id
      }
    })
  },
  onShareAppMessage: function () {

  }
})