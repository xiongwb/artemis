/**
 * Created by cyt on 2017/5/9.
 */
import * as service from '../../services/account/personal_info';
import { message } from 'antd';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';
export default {
  namespace: 'personalInfo', // 唯一的
  state: {
    data: [],
    isShow: true,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload, isShow: false };
    },
    edit(state, action) {
      return { ...state, ...action.payload, isShow: true };
    },
    hideLoad(state) {
      return { ...state, loading: false };
    },
    showLoad(state) {
      return { ...state, loading: true };
    },
  },
  effects: {
    // 获取我的信息数据
    *getInfo({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.getInfo, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        for (const key in data) {
          if (data[key] == null || data[key] == 'undefined' || data[key] == 'null') {
            data[key] = '';
          }
        }
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
    // 修改我的基本信息数据
    *updInfo({ payload }, { call, put, select }) {
      yield put({
        type: 'showLoad',
      });
      const form = yield select(({ personalInfo }) => personalInfo.data);
      form.nickname=payload.nickname;
      form.wechat=payload.wechat;
      form.qq=payload.qq;
      form.email=payload.email;
      form.income=payload.income;
      form.invexp=payload.invexp;
      const { data } = yield call(service.updInfo, form);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        message.success(data.retMsg);
        yield put({
          type: 'getInfo',
          payload: {
            telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
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
        if (location.pathname === '/myaccount/personalinfo') {
          dispatch({
            type: 'getInfo',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },


};
