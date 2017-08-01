/**
 * Created by cyt on 2017/5/15.
 */
import * as service from '../../services/account/overview';
import { message } from 'antd';
import { browserHistory } from 'react-router';
import { getLocalStorage, setLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
export default {
  namespace: 'overview', // 唯一的
  state: {
    data: [],
    nickname: '',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    hideLoad(state) {
      return { ...state, loading: false };
    },
    showLoad(state) {
      return { ...state, loading: true };
    },
  },
  effects: {
    // 获取负债总览数据
    *assetTotal({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.assetTotal, payload);
      console.log(data, 333333);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      } else {
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
      yield put({
        type: 'hideLoad',
      });
    },
    // 获取我的信息数据
    *getInfo({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.getInfo, payload);
      console.log(data, 333333);
      if (data && data.retCode == 1) {
        setLocalStorage(Storage.PERINFO, data);
        for (const key in data) {
          if (data[key] == null || data[key] == 'undefined' || data[key] == 'null') {
            data[key] = '';
          }
        }
        yield put({
          type: 'save',
          payload: {
            nickname: data.nickname,
            loading: false,
          },
        });
      } else {
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
      yield put({
        type: 'hideLoad',
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/myaccount') {
          if(getLocalStorage(Storage.DID_LOGIN) != null) {
            dispatch({
              type: 'assetTotal',
              payload: {
                telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
              },
            });
            dispatch({
              type: 'getInfo',
              payload: {
                telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
              },
            });
          }else{
            browserHistory.push('/login');
          }
        }
      });
    },
  },

};
