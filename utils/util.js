const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


// 时间带T
var timeFormatSeconds = function(time) {
  var d = time ? new Date(time) : new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hours = d.getHours();
  var min = d.getMinutes();
  var seconds = d.getSeconds();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hours < 0) hours = '0' + hours;
  if (min < 10) min = '0' + min;
  if (seconds < 10) seconds = '0' + seconds;

  return (year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds);
}

// 时间带T 转年月日
var timeFormatSeconds_short = function(time) {
  var d = time ? new Date(time) : new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hours = d.getHours();
  var min = d.getMinutes();
  var seconds = d.getSeconds();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hours < 0) hours = '0' + hours;
  if (min < 10) min = '0' + min;
  if (seconds < 10) seconds = '0' + seconds;

  return (year + '/' + month + '/' + day );
}


// 根据数组每一项对象的id值来数组去重
export function removeDuplicateForObjArr(arr) {
  let obj = {}
  const newArr = arr.filter(ele => {
    if (obj[ele.id]) return false;
    obj[ele.id] = 'a';
    return true;
  });
  return newArr;
}

/**
 * 将秒转换为 分:秒
 * s int 秒数
*/
export function s_to_hs(s){
  //计算分钟
  //算法：将秒数除以60，然后下舍入，既得到分钟数
  var h;
  h  =   Math.floor(s/60);
  //计算秒
  //算法：取得秒%60的余数，既得到秒数
  s  =   s%60;
  //将变量转换为字符串
  h    +=    '';
  s    +=    '';
  //如果只有一位数，前面增加一个0
  h  =   (h.length==1)?'0'+h:h;
  s  =   (s.length==1)?'0'+s:s;
  return h+':'+s;
}


// 如果一个数字小于10就在前边加个0，1 => 01
export function addZero(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}

// 根据分数返回标签
export function getTagByScore(score) {
  let tag = '';
  if (score < 90) {
    tag = "马路杀手";
  } else if (score < 98) {
    tag = "新人上路"
  } else {
    tag = "驾考王者"
  }
  return tag;
}

module.exports = {
  formatTime,
  timeFormatSeconds,
  timeFormatSeconds_short
}
