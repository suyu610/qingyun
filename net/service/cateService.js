import httpService from "../httpService";

import {
  GetAllCourseUrl,
} from "../httpConstants";

const app = getApp()

function getAllCourse(handleSuccess, handleFailure) {
  httpService.get(
    GetAllCourseUrl,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

module.exports = {
  getAllCourse: getAllCourse,
}