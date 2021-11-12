/**
 *
 * 判断promise.allSetteld处理结果是否存在失败
 * 
 * @export
 * @param {array} result
 * @param {object} result[i]
 * @param {string} result[i].status status = [rejected,fulfilled]
 * 
 */
export function isExistReject(result) {
  return result.some(item => item.status === 'rejected');
}