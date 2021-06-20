// pages/public/money_list/money_list.js
import {
  push
} from '../../../utils/router/index.js';

import util from '../../../utils/util.js'

import OrderService from '../../../net/service/orderService.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    checkPwdRight: false,
    showCheckPwdPopup: false,
    checkPwdLoading: false,
    pwd: "",
    loadMoreData: '加载中..',
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    allPages: '', // 总页数
    currentPage: 1, // 当前页数  默认是1
    activeNames: [],
    toView: "",
    orderReqVOList:[],
    orderSoldResVOList:[],
    withDrawVOList:[],
    remainMoney:0

  },

  jump2NeedKnow: function () {
    push({
      name: "need_know",
      data: {
        type: 'withdraw',
      },
    })
  },


  // 点击提现按钮
  onSubmit: function () {

  },

  onTapWithdrawBtn: function () {
    wx.showToast({
      icon:"none",
      title: '提现功能正在开发中',
    })
    // this.setData({
    //   showCheckPwdPopup: true
    // })
  },

  hideCheckPwdPopup: function () {
    this.setData({
      showCheckPwdPopup: false
    })
  },
  // 检查密码是否正确
  checkPwd: function () {
    this.setData({
      checkPwdLoading: true
    })

    setTimeout(() => {
      console.log(this.data.pwd)
      if (this.data.pwd == "123") {
        wx.showToast({
          title: '验证通过',
        })
        this.setData({
          showCheckPwdPopup: false,
          checkPwdRight: true,
          checkPwdLoading: false
        })
      } else {

        wx.showToast({
          icon: 'none',
          title: '密码错误,还可尝试2次',
        })

        this.setData({
          pwd: "",
          checkPwdLoading: false
        })
      }
    }, 2000);


  },

  loadMore: function () {
    var self = this;
    // 当前页是最后一页
    if (self.data.currentPage == self.data.allPages) {
      self.setData({
        loadMoreData: '已经到顶'
      })
      return;
    }
    setTimeout(function () {
      console.log('上拉加载更多');
      var tempCurrentPage = self.data.currentPage;
      tempCurrentPage = tempCurrentPage + 1;
      self.setData({
        currentPage: tempCurrentPage,
        hideBottom: false
      })
      self.getData()
    }, 500);
  },

  getData: function () {
    var self = this;

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString()
    })

    wx.setNavigationBarTitle({
      title: '我的钱包',
    })
    let that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          height: res.windowHeight - 64 - 44 - 50 + "px"
        })
        console.log(res.windowHeight)
      }
    })
  },

  shouldCheckPwd: function () {
    this.checkPwd()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getMoneyRecordSuccess:function(e){
    e.orderReqVOList.forEach(element => {
      element.boughtDate = util.timeFormatSeconds(element.boughtDate)
      console.log(e)
    })

    e.orderSoldResVOList.forEach(element => {
      element.createTime = util.timeFormatSeconds(element.createTime)
    })

    this.setData({
      orderReqVOList:e.orderReqVOList,
      orderSoldResVOList:e.orderSoldResVOList,
      withDrawVOList:e.withDrawVOList,
      remainMoney:e.remainMoney
    })
    console.log(e)
  },
  getMoneyRecordFail:function(e){
    if(e==null){
      e = "系统错误，请稍后再试"
    }

    wx.showToast({
      title: e,
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    OrderService.GetMoneyRecord(this.getMoneyRecordSuccess, this.getMoneyRecordFail)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})