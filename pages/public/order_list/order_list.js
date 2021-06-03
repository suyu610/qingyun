// pages/public/order_list/order_list.js

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
  jump2PreviewDoc:function(){
    push({name:"preview_doc"})
  },
  onShareAppMessage: function () {

  }
})