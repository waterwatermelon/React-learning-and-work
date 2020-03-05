// 设置html初始字体大小
export function initHtmlFontSize() {
    let deviceWidth = document.documentElement.clientWidth;
    // console.log('deviceWidth:' + deviceWidth);
    document.documentElement.style.fontSize = deviceWidth / 19.2 * window.devicePixelRatio + 'px';
    console.log('html.fontSize:' + document.documentElement.style.fontSize);
}
// 去掉长度单位中的px，并转换成纯数字
function pxToNumber(px) {
    const n = Number(px.replace("px", ""));
    return n;
}
// 统计文本行数 
// textCtn 必须是内联块级元素 或者 块状元素
// 内联元素的clientHeight为0,内联块状元素才有宽度、高度值
export function countDomTextRow(textCtn) {
    const style = window.getComputedStyle(textCtn);
    const lineHeight = Math.floor(pxToNumber(style.lineHeight));
    const row = textCtn.clientHeight / lineHeight;
    return row;
}

/**
 * 计算百分比
 * @param {number} part 
 * @param {number} sum 
 * @returns {string} xx.xx%
 */
export function calcPercent(part, sum) {

    if (isNaN(part) || isNaN(sum)) {
        throw new Error('参数必须是数值');
    }
    if (part === 0) {
        return '0.00%';
    } else {
        const q = part / sum * 100;
        return q.toFixed(2) + '%';
    }
}
function padding2(n) {
    return n < 10 ? '0' + n : n;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '-' + padding2(month) + '-' + padding2(day);
}
function formatTime(date) {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds(); 
    return padding2(hour) + ':' + padding2(minutes) + ':' + padding2(seconds);
}
/**
 *
 * 获取本周 开始时间与结束时间
 * @export
 * @return { startTime,endTime } 'YYYY-MM-DD HH:mm:ss'格式的时间字符串
 */
export function getStartAndEndTimeOfCurrentWeek() {
    const today = new Date();
    // 星期天getDay()为 0
    today.setDate(today.getDay()?(today.getDate() - today.getDay() + 1):(today.getDate() - 6));
    const monday = formatDate(today);
    today.setDate(today.getDate() + 6)
    const sunday = formatDate(today);
    const startTime = monday + ' 00:00:00';
    const endTime = sunday + ' 23:59:59';
    // console.log('startTime :', startTime);
    // console.log('endTime :', endTime);
    return {
        startTime,
        endTime
    }
}
export function getDateTime() {
    const today = new Date();  
    const DateTime = formatDate(today) +' '+ formatTime(today); 
    return DateTime;
}