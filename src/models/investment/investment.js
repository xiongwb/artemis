
/**
 * Created by zhangle on 2017/5/15.
 */
import { message } from 'antd';
import * as service from '../../services/investment/investment';

export default {
  namespace: 'investmen', // 唯一的
  state: {
    data: [],
    retCode: 0,
    value: 1,
    value1: 1,
    value2: 1,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    query(state, action) {
      console.log(action, 12);
      return { ...state, ...action.payload, loading: true };
    },
    findPrd(state, action) {
      return { ...state, ...action.payload };
    },
    choice(state, action) {
      return { ...state, ...action.payload };
    },
    choice1(state, action) {
      return { ...state, ...action.payload };
    },
    choice2(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 热门推荐的项目列表
    *Prdinfolist({ payload }, { call, put }) {
      console.log(payload, 13423);
      const { data } = yield call(service.Prdinfolist, payload);
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


  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/investment') {
          dispatch({
            type: 'Prdinfolist',
            payload: {
              tenantNo: 1101001001,
              expFinRate: 1,
              proType: 1,
              pageIndex: 1,
              finTerm: 1,

            },
          });
        }
      });
    },
  },


};
