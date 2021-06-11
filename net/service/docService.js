import httpService from "../httpService";

import {
  GetDocDetailUrl,
  
} from "../httpConstants";

// 向服务端请求一个上传的链接
function GetDocDetail(handleSuccess, params) {
  httpService.get(
    GetDocDetailUrl+"/"+params,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}


module.exports = {
  GetDocDetail: GetDocDetail,
}