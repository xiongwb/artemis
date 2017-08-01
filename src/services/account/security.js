/**
 * Created by cyt on 2017/5/16.
 */
import request from '../../utils/request';

//修改密码
export function updatePswd(params) {
  return request('/api/register/updatePswd', 'POST', params)
}
//修改交易密码
export function updateTranPswd(params) {
  return request('/api/register/updateTranPswd', 'POST', params)
}
// 客户委托协议(免密)签署/撤销
export function signFreeAgreement(params) {
  return request('/api/invest/signFreeAgreement', 'POST', params)
}
//我的基本信息
export function getInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params);
}
//修改我的基本信息
export function updInfo(params) {
  return request('/api/myInfo/updInfo', 'POST', params);
}
// 发送短信验证
export function get(params) {
  return request('/api/varCode/get', 'POST', params);
}
// 验证手机验证码是否正确
export function validateVarCode(params) {
  return request('/api/varCode/validateVarCode ', 'POST', params);
}
//验证交易密码
export function validateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params)
}
