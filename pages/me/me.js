// pages/me/me.js
import { push } from '../../utils/router/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
  },
  jump2MsgList:function(){
    push({name:"msg_list"})

  },
  jump2StarList:function(){
    push({name:"star_list"})
  },

  jump2MyUploadList:function(){
    push({name:"my_upload_list"})
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
    let that = this;
    wx.request({
      url: 'http://localhost:6110/hello',
      success(res){
        that.setData({avatarUrl:res.data})
        
      }
    })
  },

  
  onReady: function () {

  },

  onShow: function () {

  },

})