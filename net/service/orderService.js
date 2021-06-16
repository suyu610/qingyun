import httpService from "../httpService";

import {
  CheckHasBoughtUrl,
  GetAllOrdersUrl
} from "../httpConstants";

const app = getApp()

function CheckHasBought(handleSuccess, handleFailure,docId) {
  httpService.get(
    CheckHasBoughtUrl + "/" + docId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}
function GetAllOrders(handleSuccess, handleFailure) {
  httpService.get(
    GetAllOrdersUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

module.exports = {
  CheckHasBought,
  GetAllOrders,
}