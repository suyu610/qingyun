// components/input_comment/index.js
import {
  push
} from "../../utils/router/index.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: String,
    starCount:Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    showShare: false,
    options: [
      [{
          name: '微信',
          icon: 'wechat'
        },
        {
          name: '微博',
          icon: 'weibo'
        },
        {
          name: 'QQ',
          icon: 'qq'
        },
      ],
      [{
          name: '复制链接',
          icon: 'link'
        },
        {
          name: '分享海报',
          icon: 'poster'
        },
        {
          name: '二维码',
          icon: 'qrcode'
        },
      ],
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapshareBtn: function () {
      this.setData({
        showShare: true
      })
    },
    onShareClose() {
      this.setData({
        showShare: false
      });
    },
    jump2BuyConfirm: function () {
      if (this.properties.mode == "preview") {
        wx.navigateBack({
          delta: 0,
        })
      } else {
        push({
          name: "buy_confirm"
        })
      }
    },


    onShareSelect(event) {

      this.onShareClose();
    },


  }
})