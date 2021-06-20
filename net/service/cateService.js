import httpService from "../httpService";

import {
  GetAllCourseUrl,
  GetCourseListByCourseNameUrl
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

function GetCourseListByCourseName(handleSuccess, handleFailure,courseName) {
  httpService.get(
    GetCourseListByCourseNameUrl + "/" + courseName,
    "",
    res => {
      handleSuccess(res.data['data'])
    },
    er => {
      handleFailure(er.data['msg'])
    });
}

module.exports = {
  getAllCourse,GetCourseListByCourseName
}