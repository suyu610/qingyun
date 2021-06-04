// pages/me/me.js
import { push } from '../../utils/router/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jump2MsgList:function(){
    push({name:"msg_list"})

  },
  jump2StarList:function(){
    push({name:"star_list"})

  },

  
  jump2OrderList:function(){
    push({name:"order_list"})
  },
  jump2SettingProfile:function(){
    push({name:"setting_profile"})
  },
  jump2Upload:function(){
    push({name:"upload"})
  },

  jump2MoneyList:function(){
    push({name:"money_list"})
  },
  /**
   * 生命周期函数
   */
  onLoad: function (options) {
    
  },

  
  onReady: function () {

  },

  onShow: function () {

  },

})