import httpService from "../httpService";

import {
  UploadInfoUrl,
  GetUploadFileSignUrl
} from "../httpConstants";

const app = getApp()

function uploadInfo(handleSuccess, handleFailure, params) {
  httpService.post(
    UploadInfoUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

// 向服务端请求一个上传的链接
function getUploadFileSign(handleSuccess, handleFailure, params) {
  httpService.post(
    GetUploadFileSignUrl,
    params,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}


module.exports = {
  uploadInfo: uploadInfo,
}