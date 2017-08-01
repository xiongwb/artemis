/**
 * Created by cyt on 2017/5/14.
 */
import request from '../../utils/request';

//我的基本信息
export  function getInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params);
}
//修改我的基本信息
export  function updInfo(params) {
  return request('/api/myInfo/updInfo', 'POST', params);
}
