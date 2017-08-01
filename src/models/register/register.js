/**
 * Created by zhangle on 2017/5/16.
 */
import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/register/register';
import { setLocalStorage } from '../../utils/helper';
import { hexMD5 } from '../../utils/md5';
import Storage from '../../utils/storage';
export default {
  namespace: 'register', // 唯一的
  state: {
    data: [],
    retCode: 0,
    phoneno: [],
    date: [],
    setup: [],
    protocol:'',
    visible:false,
    cont:''

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    query(state, action) {
      return { ...state, ...action.payload, loading: true };
    },
    query1(state, action) {
      return { ...state, ...action.payload, loading: true };
    },
    query2(state, action) {
      console.log(action, 12);
      return { ...state, ...action.payload, loading: true };
    },
    hideLoad(state) {
      return { ...state, loading: false };
    },
    showLoad(state) {
      return { ...state, loading: true };
    },
  },

  effects: {
    // 注册
    *Reg({ payload }, { call, put, select }) {
      payload.token = yield select(({ register }) => register.data.token);
      const { data } = yield call(service.Reg, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        message.success('注册成功');
        yield put({
          type: 'query2',
          payload: {
            data,
            setup: payload,
          },
        });
        yield put({
          type: 'register/login',
          payload: {
            tenantNo: 1101001001,
            phoneNo: payload.loginNo,
            pswd: payload.pswd,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 发送验证码
    *Get({ payload }, { call, put }) {
      const { data } = yield call(service.Get, payload);
      if (data && data.retCode === 1) {
        message.success('发送成功');
        yield put({
          type: 'query1',
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

  // 验证密码
    *ValidateVarCode({ payload }, { call, put, select }) {
      payload.token = yield select(({ register }) => register.data.token);
      const { data } = yield call(service.ValidateVarCode, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query2',
          payload: {
            data,
            phoneno: payload,
          },
        });
        browserHistory.push('/password');
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    *login({ payload }, { call }) {
      const { data } = yield call(service.login, payload);
      if (data && data.retCode === 1) {
        setLocalStorage(Storage.DID_LOGIN, data);
        browserHistory.push('/setuppwd');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },

    //合同获取查看
    *Finapply({ payload }, { call, put }) {
      console.log(payload,1111111);
      const { data } = yield call(service.Finapply, payload);
      console.log(data);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            protocoltitle:data.protocoltitle,
            cont:data.protocolcontent,
            visible:true
          },
        });
        message.error(data.retMsg);
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
};
