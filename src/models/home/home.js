/**
 * Created by zhangle on 2017/5/15.
 */
import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/home/home';
import { getLocalStorage, delegateLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'home', // 唯一的
  state: {
    data: [],
    date: [],
    log: [],
    retCode: 0,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    query(state, action) {
      return { ...state, ...action.payload, loading: true };
    },
    query1(state, action) {
      console.log(action, 111111);
      return { ...state, ...action.payload, loading: true };
    },
    query2(state, action) {
      console.log(action, 111111);
      return { ...state, ...action.payload, loading: true };
    },
    findPrd(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 查看金额
    *Myasset({ payload }, { call, put }) {
      const { data } = yield call(service.Myasset, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query',
          payload: {
            data,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    *Invint({ payload }, { call }) {
      console.log(payload, 1212121);
      const { data } = yield call(service.Invint, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        message.success('提交成功');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    *Prdinfolist({ payload }, { call, put }) {
      const { data } = yield call(service.Prdinfolist, payload);
      console.log(data.list[1].prdname, 33333333333333);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query1',
          payload: {
            date: data,
          },
        });
        if (getLocalStorage(Storage.DID_LOGIN) != null) {
          yield put({
            type: 'Myasset',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      } else if (data) {
        message.error(data.retMsg);
      } else { // status ！= 200
        message.error('请检查您的网络111111');
      }
    },
    // 退出登录
    *Signout({ payload }, { call }) {
      const { data } = yield call(service.Signout, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        message.success('退出成功');
        delegateLocalStorage(Storage.DID_LOGIN);
        history.go(0)
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 用户签到
    *Seal({ payload }, { call }) {
      const { data } = yield call(service.Seal, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        message.success('签到成功');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 判断是否登录
    *GetLoginStatus({ payload }, { call, put }) {
      console.log(1212121);
      const { data } = yield call(service.GetLoginStatus, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        browserHistory.push('/myaccount');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          dispatch({
            type: 'Prdinfolist',
            payload: {
              tenantNo: 1101001001,
            },
          });
        }
      });
    },
  },


};
