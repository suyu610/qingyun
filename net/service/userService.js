import httpService from "../httpService";

import {
  parseInitData
} from "../../utils/dataParseUtil.js"

import {
  MatchNameAndNumberUrl,
  LoginByPwdUrl,
  LoginByTokenUrl,
  GetDataUrl,
  GetProfileBySsNumberUrl,
  ModifyProfileUrl,
  GetSelfProfileUrl
} from "../httpConstants";

const app = getApp()


function LoginByToken(handleSuccess, handleFail, params) {
  httpService.post(
    LoginByTokenUrl,
    params,
    res => {
      // 将获取的数据保存在globalData里
      handleSuccess(res.data['data'])
      console.log(res.data['data'])
      // 1. 刷新token
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

      parseInitData(initData)
      app.globalData.token = token
    },
    er => {
      handleFail(er.data['msg'])
    });
}

function LoginByPwd(handleSuccess, handleFailure, params) {
  httpService.post(
    LoginByPwdUrl,
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

      parseInitData(res.data['data'])
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

function modifyProfile(handleSuccess, handleFailure, params) {
  httpService.post(
    ModifyProfileUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function GetData(handleSuccess, handleFailure, params) {
  httpService.post(
    GetDataUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
      parseInitData(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}


function GetProfileBySsNumber(handleSuccess, handleFailure, ssNumber) {
  httpService.get(
    GetProfileBySsNumberUrl + "/" + ssNumber,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function GetSelfProfile(handleSuccess, handleFailure) {
  httpService.get(
    GetSelfProfileUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
      parseInitData(res.data['data'])

    },
    er => {
      handleFailure(er.data['msg'])
    });
}



module.exports = {
  matchNameAndNumber,
  LoginByPwd,
  GetData,
  LoginByToken,
  GetProfileBySsNumber,
  modifyProfile,
  GetSelfProfile
}