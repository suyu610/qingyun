// 将initData转到app里
let app = getApp()

function parseInitData(data){
  // app.globalData.userInitDataBO = 123
  // console.log(data.userInitDataBO)
  if(data.userInitDataBO!=null){
    app.globalData.userInitDataBO = data.userInitDataBO
    app.globalData.ssNumber = data.userInitDataBO.ssNumber
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

  if(data.userInitDataBO!=null && data.userInitDataBO.boughtDocList!=null){
    app.globalData.boughtDocList = data.userInitDataBO.boughtDocList
  }
}


module.exports = {
  parseInitData
}