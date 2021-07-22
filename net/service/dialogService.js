import httpService from "../httpService";

import {  
  GetDialogUrl
} from "../httpConstants";

function getDialog(handleSuccess){
  httpService.get(
    GetDialogUrl,
    "",
    res=>{
      handleSuccess(res.data['data'])
    })    
}

module.exports = {
  getDialog
}