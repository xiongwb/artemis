/**
 * Created by cyt on 2017/5/17.
 */

import * as service from '../../services/account/recharge_assembly';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';
import { message } from 'antd';

export default {
  namespace: 'recharge', // 唯一的
  state: {
    data: [],
    list: [],
    availablesum: '',
    transPswd: '',
    money: '',
    feeSum: '',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    hideLoad(state, action) {
      return { ...state, loading: false, transPswd: '', money: '' };
    },
    showLoad(state, action) {
      return { ...state, loading: true };
    },
    choice(state, action) {
      console.log(action, 123456);
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 银行卡列表
    *bindList({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      console.log(payload, 123456);
      const { data } = yield call(service.bindList, payload);
      console.log(data, 123456);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            data,
            loading: false,
          },

        });
        yield put({
          type: 'hideLoad',
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
      yield put({
        type: 'hideLoad',
      });
    },
    // 密码验证1
    *validateTranPswd1({ payload }, { call, put, select }) {
      console.log(123456);
      yield put({
        type: 'showLoad',
      });
      if (payload.transPswd === '' || payload.money === '') {
        message.error('金额或密码不能为空');
        return;
      }
      payload.telno = getLocalStorage(Storage.DID_LOGIN).retMsg;
      console.log(payload, 123456);
      const { data } = yield call(service.validateTranPswd, payload);
      console.log(data, 123456);
      const feeSum = yield select(({ recharge }) => recharge.feeSum);
      if (data && data.retCode === 1) {
        if (feeSum) {
          payload.busiType = 'T99';
          yield put({
            type: 'validateTranPswd2',
            payload: {
              payload,
              data,
            },
          });
        } else {
          yield put({
            type: 'recharge',
            payload: {
              data,
              money: payload.money,
              businessSeqNo: '',
            },
          });
        }
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
      yield put({
        type: 'hideLoad',
      });
    },
    // 密码验证2
    *validateTranPswd2({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.validateTranPswd, payload.payload);
      if (data && data.retCode === 1) {
        console.log(payload, 9999911119);
        yield put({
          type: 'recharge',
          payload: {
            data: payload.data,
            money: payload.payload.money,
            businessSeqNo: data.businessSeqNo,
          },

        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
      yield put({
        type: 'hideLoad',
      });
    },
  // 充值
    *recharge({ payload }, { call,put, select }) {
      yield put({
        type: 'showLoad',
      });
      const cardNo = yield select(({ recharge }) => recharge.value);
      const phoneNo = getLocalStorage(Storage.DID_LOGIN).retMsg;
      const { data } = yield call(service.recharge, { cardNo: cardNo,
        money: payload.money,
        phoneNo: phoneNo,
        businessSeqNo1: payload.data.businessSeqNo,
        businessSeqNo2: payload.businessSeqNo,
      });
      if (data && data.retCode === 1) {
        message.success(data.retMsg);
        yield put({
          type: 'assetTotal',
          payload: {
            telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
      yield put({
        type: 'hideLoad',
      });
    },
    // 充值记录
    *supList({ payload }, { call, put, select }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.supList, payload);
      if (data && data.retCode == 1) {
        // 手续费为NULL初始化0
        data.supplementVOList.map((s, i) => {
          if (s.supfee == null) {
            s.supfee = 0;
          }
        },
        );
        yield put({
          type: 'save',
          payload: {
            list: data,
            loading: false,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
      yield put({
        type: 'hideLoad',
      });
    },
    // 获取负债总览数据
    *assetTotal({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.assetTotal, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            availablesum: data.acctnoEntity.availablesum,
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
        yield put({
          type: 'hideLoad',
        });
      }
    },
    // 计算费用
    *getFee({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          money: payload.money,
        },
      });
      console.log(payload, 123456);
      const { data } = yield call(service.getFee, payload);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            feeSum: data.feeSum,
          },

        });
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
        if (location.pathname === '/myaccount/recharge') {
          dispatch({
            type: 'bindList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
          dispatch({
            type: 'supList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
              pageNum: 0,
            },
          });
          dispatch({
            type: 'assetTotal',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },

};
