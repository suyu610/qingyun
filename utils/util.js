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
  timeFormatSeconds
}
