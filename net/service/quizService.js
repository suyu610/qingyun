import httpService from "../httpService";

import {
  GetAllQuizCateUrl,
  GetUserQuizCateUrl,
  GetQuizByIdUrl,
  AddQuizUrl,
  RemoveQuizUrl,
  GetQuesListByQuizIdUrl,
  StartAnswerUrl,
  SubmitQuesRecorderUrl,
  ToggleStarQuesUrl,
  InsertOrUpdateNoteUrl
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

function GetQuesListByQuizId(handleSuccess, handleFailure, params) {
  httpService.get(
    GetQuesListByQuizIdUrl + '/' + params,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function StartAnswer(handleSuccess, handleFailure, data) {
  httpService.post(
    StartAnswerUrl,
    data,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

function SubmitQuesRecorder(handleSuccess, handleFailure, data) {
  httpService.post(
    SubmitQuesRecorderUrl,
    data,
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

// 对题目进行收藏或取消
function ToggleStarQues(handleSuccess, handleFailure, quizId, quesId) {
  httpService.get(
    ToggleStarQuesUrl + "/" + quizId + "/" + quesId,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

// 新增或修改笔记
function InsertOrUpdateNote(handleSuccess, handleFailure,data) {
  httpService.post(
    InsertOrUpdateNoteUrl,
    data,
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
  RemoveQuiz,
  GetQuesListByQuizId,
  StartAnswer,
  SubmitQuesRecorder,
  ToggleStarQues,
  InsertOrUpdateNote
}