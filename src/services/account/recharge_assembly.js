/**
 * Created by cyt on 2017/5/17.
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
//充值
export function recharge(params) {
  return request('/api/invest/recharge', 'POST', params)
}
//充值记录
export function supList(params) {
  return request('/api/mySup/supList', 'POST', params)
}
//资产负债总览
export function assetTotal(params) {
  return request('/api/myAsset/asset_total', 'POST', params)
}
// 计算费用
export function getFee(params) {
  return request('/api/invest/getFee', 'POST', params);
}
