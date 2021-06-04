// pages/public/money_list/money_list.js
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
    toView:"",

  },
  onChange(event) {
    let toView;
    if(event.detail.length>0){
      toView="need_know"
    }else{
      toView = "body"
    }
    this.setData({
      toView,
      activeNames: event.detail,
    });
  },

  // 点击提现按钮
  onSubmit: function () {

  },

  onTapWithdrawBtn: function () {
    this.setData({
      showCheckPwdPopup: true
    })
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
    var pageIndex = self.data.currentPage;
    wx.request({
      url: 'https://route.showapi.com/582-2',
      data: {
        showapi_appid: '19297',
        showapi_sign: 'cf606a68a01f45d196b0061a1046b5b3',
        page: pageIndex
      },
      fail: function () {
        console.log("???")
      }
    })
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
          height: res.windowHeight - 64 - 44 - 10 - 200 + "px"
        })
        console.log(res.windowHeight)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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