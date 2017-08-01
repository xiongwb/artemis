/**
 * Created by zhangle on 2017/5/15.
 */
import request from '../../utils/request';

export function Myasset(params) {
  return request('/api/myAsset/asset_total', 'POST', params)
}
export function Invint(params) {
  return request('/api/invInt/save', 'POST', params)
}
export function Prdinfolist(params) {
   return request('/api/invest/getPrdinfoList', 'POST', params)
}

export function Signout(params) {
  return request('/api/login/sign_out', 'POST', params)
}
export function GetLoginStatus(params) {
  return request('/api/login/getLoginStatus', 'POST', params)
}
export function Seal(params) {
  return request('/api/index/seal', 'POST', params)
}
