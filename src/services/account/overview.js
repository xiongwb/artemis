/**
 * Created by cyt on 2017/5/12.
 */
import request from '../../utils/request';

//资产负债总览
export function assetTotal(params) {
  return request('/api/myAsset/asset_total', 'POST', params)
}

//我的基本信息
export  function getInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params);
}
