import httpService from "../httpService";

import {
  CheckTokenValidateUrl,
  MatchNameAndNumberUrl,
  LoginBySSNumberAndPwdUrl,
  GetInitDataUrl

} from "../httpConstants";

const app = getApp()

function checkTokenValidate(handleSuccess) {
  httpService.get(
    CheckTokenValidateUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {

    });
}

function checkTokenAndGetInitData(handleSuccess, handleFail, params) {
  httpService.get(
    GetInitDataUrl,
    params,
    res => {
      // 将获取的数据保存在globalData里
      handleSuccess(res.data['data'])
      // 1. 刷新token
      console.log(res.data['data'])

      let token = res.data['data']['token']

      let initData = res.data['data']
      wx.setStorage({
        key: "initData",
        data: initData
      })

      wx.setStorage({
        key: "token",
        data: token
      })
      app.globalData.initData = initData
      app.globalData.token = token

    },
    er => {
      handleFail(er.data['msg'])
    });
}

function loginBySSNumberAndPwd(handleSuccess, handleFailure, params) {
  httpService.post(
    LoginBySSNumberAndPwdUrl,
    params,
    res => {
      handleSuccess(res.data['data'])

      let initData = res.data['data']
      let token = res.data['data']['token']
      wx.setStorage({
        key: "initData",
        data: initData
      })

      wx.setStorage({
        key: "token",
        data: token
      })
      app.globalData.initData = initData
      app.globalData.token = token
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function matchNameAndNumber(handleSuccess, handleFailure, params) {
  httpService.post(
    MatchNameAndNumberUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}


module.exports = {
  checkTokenValidate: checkTokenValidate,
  matchNameAndNumber: matchNameAndNumber,
  loginBySSNumberAndPwd: loginBySSNumberAndPwd,
  checkTokenAndGetInitData: checkTokenAndGetInitData
}