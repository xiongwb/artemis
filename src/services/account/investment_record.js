/**
 * Created by cyt on 2017/5/17.
 */
import request from '../../utils/request';

//我的投资记录列表
export function invListBySta(params) {
  return request('/api/myInv/invListBySta', 'POST', params)
}
//转让申请
export function transApp(params) {
  return request('/api/myInv/transApp', 'POST', params)
}
//合同获取查看
export function contget(params) {
  return request('/api/finApply/cont_get', 'POST', params)
}
