import httpService from "../httpService";

import {
  GetAllQuizCateUrl,
  GetUserQuizCateUrl,
  GetQuizByIdUrl,
  AddQuizUrl,
  RemoveQuizUrl
} from "../httpConstants";

const app = getApp()

function getAllQuizCate(handleSuccess, handleFailure) {
  httpService.get(
    GetAllQuizCateUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function getUserQuizCate(handleSuccess, handleFailure) {
  httpService.get(
    GetUserQuizCateUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function GetQuizById(handleSuccess, handleFailure, params) {
  httpService.get(
    GetQuizByIdUrl + '/' + params,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function RemoveQuiz(handleSuccess, handleFailure, params) {
  httpService.get(
    RemoveQuizUrl + '/' + params,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function AddQuiz(handleSuccess, handleFailure, params) {
  httpService.get(
    AddQuizUrl + '/' + params,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}



module.exports = {
  getAllQuizCate,
  getUserQuizCate,
  GetQuizById,
  AddQuiz,
  RemoveQuiz
}