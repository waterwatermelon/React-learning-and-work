
// 域名校验
export const domainCheck = (str) => {
  let re1 = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
  //let re1 = new RegExp("[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?");
  return re1.test(str);
}

// 名称非法校验
export const nameValidCheck = (str) => {
  let re = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  return re.test(str);
}

// 数字校验
export const numberCheck = (str) => {
  let re = /^(0|\+?[1-9][0-9]*)$/;
  return re.test(str);
}

 

export function isNullOrUndefined(val) {
  let flag = val === null || val === undefined ? true : false;
  return flag;
}

//获取时间
export function getTime() {
  var date = new Date();

  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }

  var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  return time;
}

// 把秒转化为时分秒的格式
export function getSecondTimeStr(value) {
  var min = Math.floor(value % 3600);
  let h = Math.floor(value / 3600)
  let m = Math.floor(min / 60)
  let s = value % 60
  let val = '';

  if (h !== 0) {
    val = h + "时";
  }

  if (m !== 0) {
    val = val + m + "分"
  }

  if (s !== 0) {
    val = val + s + "秒"
  }

  return val;
}

// 获取token
export function getUserToken() {
  let userstr = localStorage.getItem("user");
  let user = JSON.parse(userstr);
  // console.log('user localStorage is ', user);
  let token = user !== null ? user.token : null;
  if (token === undefined || token === null || token === '') {
    token = ''
  }
  return token;
}

// 判断开始时间和当前时间是否在15分钟以内
export function isIn15Minute(start) {
  let flag = false;
  let date = start + ":00";
  date = date.replace(/-/g, '/');
  let startstamp = new Date(date).getTime();

  let currenttime = (new Date()).valueOf();
  if (startstamp - currenttime <= 15 * 60 * 1000) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

export function getWeek(i, shift) {
  var now = new Date();
  console.log("now.getDay() is ", now.getDay())
  var minus = now.getDay() ? now.getDay() - 1 : 6;
  console.log('minus', minus);
  var firstDay = new Date(now - (minus) * 86400000);
  console.log('firstDay', firstDay);
  
  firstDay.setDate(firstDay.getDate() + i + parseInt(shift, 10) * 7);
  console.log('firstDay2', firstDay);
  let mon = Number(firstDay.getMonth()) + 1;
  console.log('mon', mon);
  return firstDay.getFullYear() + "-" + mon + "-" + firstDay.getDate();
}

export function getWeekMonday(shift) {
  var now = new Date();
  console.log("now.getDay() is ", now.getDay())
  var minus = now.getDay() ? now.getDay() - 1 : 6;
  var firstDay = new Date(now - (minus) * 86400000);
  firstDay.setDate(firstDay.getDate() + shift * 7);
  let mon = Number(firstDay.getMonth()) + 1;
  let monday = now.getFullYear() + "-" + mon + "-" + firstDay.getDate() + " 00:00:00";
  //let startstamp = new Date(monday).getTime();  
  return monday;
}

export function canOrder(begin, end) {
  let flag = true;
  let currenttime = (new Date()).valueOf();

  let date = begin + ":00";
  let startstamp = new Date(date).getTime();

  let date2 = end + ":00";
  let endstamp = new Date(date2).getTime();

  //console.log(startstamp)
  //console.log(endstamp)

  if (currenttime < startstamp) {
    flag = true;
  } else if (currenttime > endstamp) {
    flag = false;
  } else if ( currenttime > startstamp && currenttime < endstamp) {
    flag = false;
  }

  return flag;
}
