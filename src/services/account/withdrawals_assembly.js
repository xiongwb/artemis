/**
 * Created by cyt on 2017/5/20.
 */
import request from '../../utils/request';
//银行可列表
export function bindList(params) {
  console.log(params);
  return request('/api/bindCard/bindList', 'POST', params)
}
//验证交易密码
export function validateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params)
}
//提现
export function withdrawals(params) {
  console.log(params);
  return request('/api/invest/withdrawals', 'POST', params)
}

//提现记录
export function drawList(params) {
  return request('/api/myDraw/drawList', 'POST', params)
}
//绑卡
export function bind(params) {
  return request('/api/bindCard/bind', 'POST', params)
}
// 计算费用
export function getFee(params) {
  return request('/api/invest/getFee', 'POST', params);
}
