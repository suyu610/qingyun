import httpService from "../httpService";

import {
  TogglePublishedDocUrl,
  GetMyUploadDocUrl,
  GetDocDetailUrl,
  GetDocStarUrl,
  SearchDocUrl,
  UnStarUrl,
  StarUrl,

} from "../httpConstants";

function GetDocDetail(handleSuccess, params) {
  httpService.get(
    GetDocDetailUrl + "/" + params,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      console.log(er)
      wx.showToast({
        icon:"none",
        title: "有问题，请稍后重试",
      })
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


function TogglePublishedDoc(handleSuccess,docId) {
  httpService.get(
    TogglePublishedDocUrl + "/" + docId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      wx.showToast({
        title: (er.data['msg']),
      })
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

function GetMyUploadDoc(handleSuccess) {
  httpService.get(
    GetMyUploadDocUrl,
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


function SearchDoc(handleSuccess,keyword) {
  httpService.get(
    SearchDocUrl+"/"+keyword,
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
  TogglePublishedDoc,
  GetMyUploadDoc,
  GetDocDetail,
  GetStarDoc,
  SearchDoc,
  UnStar,
  Star,
  
}