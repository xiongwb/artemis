/**
 * Created by zhangle on 2017/5/19.
 */

import request from '../../utils/request';
//产品详情
export function GetPrdinfo(params) {
  return request('/api/invest/getPrdinfo', 'POST', params)
}
//投资
export function DoInvest(params) {
  return request('/api/invest/doInvest', 'POST', params)
}
//获取基本信息
export function GetInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params)
}
//验证交易密码
export function ValidateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params)
}
//投资验证
export function ValidateInv(params) {
  return request('/api/invest/validateInv', 'POST', params)
}
