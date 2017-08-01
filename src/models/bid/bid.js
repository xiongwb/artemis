/**
 * Created by zhangle on 2017/5/19.
 */
import { message } from 'antd';
import * as service from '../../services/bid/bid';

export default {
  namespace: 'bid', // 唯一的
  state: {
    data: [],
    date: [],
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
    findPrd(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 项目详情
    *GetPrdinfo({ paylode }, { call, put, select }) {
      const prdcode = yield select(({ bid }) => bid.record.prdcode);
      const { data } = yield call(service.GetPrdinfo, { prdcode });
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
    // 投资
    *DoInvest({ payload }, { call, put, select }) {
      console.log(payload,1111111111)
      const { data } = yield call(service.DoInvest, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query1',
          payload: {
            data,
          },
        });
        message.error(data.retMsg);
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 我的基本信息
    *GetInfo({ payload }, { call,put }) {
      const { data } = yield call(service.GetInfo, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query',
          payload: {
            date:data,
          },
        });

      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 验证交易密码。
    *ValidateTranPswd({ payload }, { call,put }) {
      console.log(payload,3333333)
      const { data } = yield call(service.ValidateTranPswd, payload);
      console.log(data,44444444)
      if (data && data.retCode === 1) {
        yield put({
          type: 'DoInvest',
          payload: {
            phoneNo: payload.telNo,
            prdInfoID:payload.prdInfoID ,
            channel: 2,
            money: payload.money,
            businessSeqNo:data.businessSeqNo,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 投资验证。
    *ValidateInv({ payload }, { call,put }) {
      console.log(payload,3333333)
      const { data } = yield call(service.ValidateInv, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'ValidateTranPswd',
          payload: {
            transPswd:payload.transPswd,
            busiType:'T01',
            money: payload.money,
            telno:payload.phoneNo,
            prdInfoID: payload.prdInfoID
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
        if (location.pathname === '/bid') {
          dispatch({
            type: 'GetPrdinfo',

          });
        }
      });
    },
  },


};
