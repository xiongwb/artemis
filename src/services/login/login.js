/**
 * Created by cyt on 2017/5/12.
 */
import request from '../../utils/request';

export function login(params) {
  return request('/api/login/sign_in', 'POST', params)
}
