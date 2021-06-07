// app.js
const router = require('utils/router/index.js');
const categoryList = {

  /////////////// 分类 ////////////////
  province_list: {
    110000: '全部',
    120000: '公共课程',
    130000: '电子信息学院',
    140000: '电子信息学院',
    150000: '电子信息学院',
    160000: '电子信息学院',
    170000: '电子信息学院',
    180000: '电子信息学院',
    190000: '电子信息学院',
    200000: '电子信息学院',
    210000: '电子信息学院',
    220000: '电子信息学院',
    230000: '电子信息学院',
    240000: '电子信息学院',
    250000: '电子信息学院',
    260000: '电子信息学院',
    270000: '电子信息学院',
    280000: '电子信息学院',
  },
  city_list: {
    110100: '全部',
    120100: '公共课程',
    130100: '电子信息专业',
    130200: '微电子专业',
  },
  county_list: {
    110100: '全部',
    110101: '大一',
    110102: '大二',
    110103: '大三',
    110104: '大四',

    120100: '全部',
    120101: '大一',
    120102: '大二',
    120103: '大三',
    120104: '大四',

    130100: '全部',
    130101: '大一',
    130102: '大二',
    130103: '大三',
    130104: '大四',

    130200: '全部',
    130201: '大一',
    130202: '大二',
    130203: '大三',
    130204: '大四',
    // ....
  },
};
! function () {
  var PageTmp = Page;

  Page = function (pageConfig) {
    // 设置全局默认分享
    pageConfig = Object.assign({
      onShareAppMessage: function () {
        return {
          title: '青云知识库',
          imageUrl: "https://cdns.qdu.life/qingyun/images/share_1.png",
          path: '/pages/empty/empty',
        };
      }
    }, pageConfig);

    pageConfig = Object.assign({
      onShareTimeline: function (res) {
        return {
          title: '青云知识库',
          query: 'id=12345678'
        }
      }
    }, pageConfig);

    PageTmp(pageConfig);
  };
}();
App({
  onLaunch() {
    let that = this
    wx.cloud.init({
      traceUser: true,
    });

    // 获取openid
    wx.cloud.callFunction({
      name: 'getOpenId',
      success(res) {
        that.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
      }
    });

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })


    let token = wx.getStorageSync('token')

    this.globalData.token = token
  },


  globalData: {
    openid: "",
    token: "",
    ssNumber: "",
    version:"0.1.3",
    categoryList:categoryList
  }
})