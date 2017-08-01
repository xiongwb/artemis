/**
 * Created by cyt on 2017/5/16.
 */
import * as service from '../../services/account/investment_record';
import { message } from 'antd';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';
export default {
  namespace: 'investmentRecord', // 唯一的
  state: {
    data: [],
    protocol:'',
    visible:false,
    cont:''
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
    // 我的投资记录
    *invListBySta({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.invListBySta, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            data,
          },

        });
        yield put({
          type: 'hideLoad',
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
    // 转让申请
    *transApp({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      console.log(payload);
      const { data } = yield call(service.transApp, payload);
      if (data && data.retCode == 1) {
        yield put({
          type: 'hideLoad',
        });
        message.error(data.retMsg);
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
    //合同获取查看
    *contget({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      console.log(payload);
      const { data } = yield call(service.contget , payload);
      console.log(data);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            cont:data.map.cont,
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
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/myaccount/investment_record') {
          dispatch({
            type: 'invListBySta',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
              prdstatus: 1,
            },
          });
        }
      });
    },
  },

};

