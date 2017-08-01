/**
 * Created by cyt on 2017/5/17.
 */

import * as service from '../../services/account/withdrawals_assembly';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';
import { message } from 'antd';

export default {
  namespace: 'withdrawals', // 唯一的
  state: {
    data: [],
    list: [],
    availablesum: '',
    transPswd: '',
    money: '',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    hideLoad(state) {
      return { ...state, loading: false, transPswd: '', money: '' };
    },
    showLoad(state) {
      return { ...state, loading: true };
    },

  },
  effects: {
    // 银行卡列表
    *bindList({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.bindList, payload);

      if (data && data.retCode == 1) {
        // 取主卡
        let card;
        console.log(data, 123456, 3333);
        if (data.bindList.length > 0) {
          data.bindList.map((s, i) => {
            if (s.mainflag == 1) {
              card = s;
            }
          },
          );
        } else {
          card = { openbank: '请绑定卡' };
        }
        yield put({
          type: 'save',
          payload: {
            data: card,
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
      if (payload.transPswd === '' || payload.money === '') {
        message.error('金额或密码不能为空');
        return;
      }
      yield put({
        type: 'showLoad',
      });
      payload.telno = getLocalStorage(Storage.DID_LOGIN).retMsg;
      console.log(payload, 123456);
      const { data } = yield call(service.validateTranPswd, payload);
      console.log(data, 123456);
      const feeSum = yield select(({ withdrawals }) => withdrawals.feeSum);
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
            type: 'withdrawals',
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
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        yield put({
          type: 'withdrawals',
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
    // 提现
    *withdrawals({ payload }, { call,put, select }) {
      yield put({
        type: 'showLoad',
      });
      const cardNo = yield select(({ withdrawals }) => withdrawals.data.acctno);
      const phoneNo = getLocalStorage(Storage.DID_LOGIN).retMsg;
      const { data } = yield call(service.withdrawals, { cardNo: cardNo,
        money: payload.money,
        phoneNo: phoneNo,
        businessSeqNo1: payload.data.businessSeqNo,
        businessSeqNo2: payload.businessSeqNo,
      });
      console.log(data, 7878787878);
      if (data && data.retCode === 1) {
        message.success(data.retMsg);

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
    // 提现记录
    *drawList({ payload }, { call, put, select }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.drawList, payload);
      if (data && data.retCode == 1) {
        // 手续费为NULL初始化0
        data.drawVOList.map((s, i) => {
          if (s.drawfee == null) {
            s.drawfee = 0;
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
        if (location.pathname === '/myaccount/withdrawals') {
          dispatch({
            type: 'bindList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
          dispatch({
            type: 'drawList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
              pageNum: 0,
            },
          });
        }
      });
    },
  },

};

