// pages/public/order_list/order_list.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import OrderService from '../../../net/service/orderService.js'
import util from '../../../utils/util.js'
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
  getOrdersSuccess: function (e) {
    let orderList = []
    e.forEach(element => {
      element.boughtDate = util.timeFormatSeconds(element.boughtDate)
      element.orderId = element.orderId.substring(10)
      orderList.push(element)
      console.log()
    });
    this.setData({orderList})
    console.log(e)
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
      data:{id}
    })
  },
  onShareAppMessage: function () {

  }
})