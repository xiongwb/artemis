/**
 * Created by cyt on 2017/5/16.
 */
import * as service from '../../services/account/myRiskList';

import { message } from 'antd';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import COMMONCONFIG from '../../constant/common_config';
import { browserHistory } from 'react-router';

export default {
  namespace: 'myRiskList', // 唯一的
  state: {
    data: [],
    loading: false,
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
    *finList({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.riskList, payload);
      if (data && data.retCode == 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
    *getRisktemp({ payload }, { call, put }) {
      const params = {
        tenantno: COMMONCONFIG.tenantno,
        risktemptype: getLocalStorage(Storage.PERINFO).custype,
      };
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.riskTemp, params);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            risktempid: data.risktempid,
            remarks: data.remarks,
          },
        });
        yield put({
          type: 'getQuestions',
          payload: {
            risktempid: data.risktempid,
          },
        });
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
    *getQuestions({ payload }, { call, put, select }) {
      const { data } = yield call(service.riskTempDet, payload);
      if (data && data.retCode == 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            questionData: data,
          },
        });
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
    *getRiskDetail({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.riskDet, payload);
      if (data && data.retCode == 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            riskrcddet: data.riskrcddet,
            visible: true,
          },
        });
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
    *newRiskRcd({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.newRiskRcd, payload);
      if (data && data.retCode == 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            answer: null,
          },
        });
        message.success('提交成功');
        browserHistory.push('/myaccount/myRiskList');
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/myaccount/myRiskList') {
          const telno = getLocalStorage(Storage.DID_LOGIN).retMsg;
          dispatch({
            type: 'finList',
            payload: {
              telno,
              pageNum: 0,
            },
          });
        } else if (location.pathname === '/myaccount/riskTextQuestion') {
          dispatch({
            type: 'getRisktemp',
          });
        }
      });
    },
  },

};

