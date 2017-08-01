/**
 * Created by zhangle on 2017/5/22.
 */
import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/register/setuppwd';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'setuppwd', // 唯一的
  state: {
    data: [],

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

  },

  effects: {
// 设置交易密码
    *UpdateTranPswd({ payload }, { call }) {
      const { data } = yield call(service.UpdateTranPswd, payload);
      if (data && data.retCode === 1) {
        browserHistory.push('/finishregister');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },


};
