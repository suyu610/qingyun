import httpService from "../httpService";

import {
  GetDocDetailUrl,
  
} from "../httpConstants";

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