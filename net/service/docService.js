import httpService from "../httpService";

import {
  GetDocDetailUrl,
  GetDocStarUrl,
  UnStarUrl,
  StarUrl

} from "../httpConstants";

function GetDocDetail(handleSuccess, params) {
  httpService.get(
    GetDocDetailUrl + "/" + params,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}



function GetStarDoc(handleSuccess) {
  httpService.get(
    GetDocStarUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}


function UnStar(handleSuccess, id) {
  httpService.get(
    UnStarUrl + "/" + id,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      wx.showToast({
        icon:'error',
        title: "未知错误",
      })
    });
}

function Star(handleSuccess, id) {
  httpService.get(
    StarUrl + "/" + id,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      wx.showToast({
        icon:'error',
        title: "未知错误",
      })
    });
}



module.exports = {
  GetDocDetail,
  GetStarDoc,
  UnStar,
  Star
}