import httpService from "../httpService";

import {
  UploadInfoUrl,
  UploadFilesUrl
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

module.exports = {
  uploadInfo: uploadInfo,
}