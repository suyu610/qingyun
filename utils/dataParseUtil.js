// 将initData转到app里
let app = getApp()

function parseInitData(data){
  // app.globalData.userInitDataBO = 123
  // console.log(data.userInitDataBO)
  if(data.userInitDataBO!=null){
    app.globalData.userInitDataBO = data.userInitDataBO
  }

  if(data.category!=null){
    app.globalData.category = data.category
    app.globalData.categoryList = {
      province_list: data.category.collegeMap,
      city_list : data.category.majorMap,
      county_list : data.category.gradeMap
    }
    wx.setStorageSync('categoryList', app.globalData.categoryList)

  }
  if(data.hotDoc!=null){
    app.globalData.hotDoc = data.hotDoc
  }
  if(data.msgList!=null){
    app.globalData.msgList = data.msgList

  }
  if(data.adList!=null){
    app.globalData.adList = data.adList

  }





}


module.exports = {
  parseInitData
}