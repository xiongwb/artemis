/**
 * Created by cyt on 2017/5/12.
 */
import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/login/login';
import { setLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'login', // 唯一的
  state: {
    data: [],
    retCode: 0,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *login({ payload }, { call }) {
      console.log(payload);
      if (payload.phoneNo === '' || payload.pswd === '') {
        message.error('账号或密码不能为空');
        return;
      }
      const { data } = yield call(service.login, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        setLocalStorage(Storage.DID_LOGIN, data);
        browserHistory.push('/');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },
};
