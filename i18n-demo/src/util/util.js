import i18n from '../lang/i18n';
// 获取问候语句 
export function getGreetText() {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();
  // 设置默认文字
  let text = '';
  // 判断当前时间段
  if (hours >= 0 && hours <= 10) {
    text =  i18n.t('global.greet.morning');
  } else if (hours > 10 && hours <= 13) {
    text =  i18n.t('global.greet.noon');
  } else if (hours > 13 && hours <= 18) {
    text =  i18n.t('global.greet.afternoon');
  } else if (hours > 18 && hours <= 24) {
    text =  i18n.t('global.greet.night');
  }
  // 返回当前时间段对应的状态
  return text;
}