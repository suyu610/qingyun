export const Host = 'https://api.book.uutrack.cn/v1/';
// export const Host = 'http://192.168.3.8:6110/v1/';
// export const Host = 'http://10.195.119.143:6110/v1/';

////////////
/// 上传 ///
///////////

export const UploadInfoUrl = 'doc/upload';
export const GetUploadFileSignUrl = 'doc/getUploadFileSign';

////////////
/// 用户 ///
///////////

export const MatchNameAndNumberUrl = 'user/matchNameAndNumber';
export const LoginByPwdUrl = 'user/loginByPwd';
export const GetDataUrl = 'user/getData';
export const LoginByTokenUrl = 'user/loginByToken';
export const GetProfileBySsNumberUrl = 'user/profile'
export const ModifyProfileUrl = 'user/profile'
export const GetSelfProfileUrl = 'user/profile/me'
export const AddCommentUrl = 'comment/new'

////////////
/// 文档 ///
///////////

export const GetDocDetailUrl = 'doc/detail'
export const GetUploadSignUrl = 'doc/getUploadFileSign'
export const GetDocStarUrl = 'doc/getStarDoc'
export const UnStarUrl = 'doc/unStar'
export const StarUrl = 'doc/star'
export const GetMyUploadDocUrl = 'doc/me'
export const TogglePublishedDocUrl = 'doc/togglePublised'
export const SearchDocUrl = 'search/key'


////////////
/// 分类 ///
///////////

export const GetAllCourseUrl = 'cate/getAllCourse'
export const GetCourseListByCourseNameUrl = 'cate/getDocListByCourseName'



////////////
/// 订单 ///
///////////

export const CheckHasBoughtUrl = 'order/hasBought'
export const GetAllOrdersUrl = 'order/allBought'
export const GetMoneyRecordUrl = 'order/moneyRecord'


////////////
/// 公告 ///
///////////

export const GetDialogUrl = 'dialog/new'


////////////
/// 题库 ///
///////////

export const GetAllQuizCateUrl = 'quiz/cate/all'
export const GetUserQuizCateUrl = 'quiz/user_quiz'
export const GetQuizByIdUrl = 'quiz/quiz'
export const AddQuizUrl = 'quiz/quiz/add'
export const RemoveQuizUrl = 'quiz/quiz/remove'
export const GetQuesListByQuizIdUrl = 'quiz/queslist'
export const StartAnswerUrl = 'quiz/core/startAnswer'