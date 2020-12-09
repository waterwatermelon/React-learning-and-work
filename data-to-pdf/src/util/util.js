/**
 *
 * 格式价格金额
 * @param {number} money
 * @param {string} symbol 分隔符
 * @param {string} currency 货币符号
 * @returns {string}
 */
export const priceFormatter = (money, symbol = ",", currency = "¥") => {
  var amount =
    parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
  if (isNaN(amount)) {
    return "";
  }

  var l = amount.split(".")[0].split("").reverse();
  var r = amount.split(".")[1];
  var t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i];
    if ((i + 1) % 3 === 0 && i + 1 !== l.length) {
      t += symbol;
    }
  }
  return currency + " " + t.split("").reverse().join("") + "." + r;
};
/**
 *
 * 阿拉伯数字转汉字大写
 * @param {number} n 数字，最多2位小数
 * @returns {string} 大写的字符串
 */
export function moneyToChinese(n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return "数据非法"; //判断数据是否大于0
  }

  var unit = "千百拾亿千百拾万千百拾元角分",
    str = "";
  n += "00";

  var indexpoint = n.indexOf("."); // 如果是小数，截取小数点前面的位数

  if (indexpoint >= 0) {
    n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2); // 若为小数，截取需要使用的unit单位
  }

  unit = unit.substr(unit.length - n.length); // 若为整数，截取需要使用的unit单位
  for (var i = 0; i < n.length; i++) {
    str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i); //遍历转化为大写的数字
  }

  return str
    .replace(/零(千|百|拾|角)/g, "零")
    .replace(/(零)+/g, "零")
    .replace(/零(万|亿|元)/g, "$1")
    .replace(/(亿)万|壹(拾)/g, "$1$2")
    .replace(/^元零?|零分/g, "")
    .replace(/元$/g, "元整"); // 替换掉数字里面的零字符，得到结果
}
