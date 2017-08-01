/**
 * Created by zhangle on 2017/5/17.
 */
/**
 * Created by zhangle on 2017/5/15.
 */
import request from '../../utils/request';

export function Prdinfolist(params) {
  return request('/api/invest/getAllPrdinfoList', 'POST', params)
}
