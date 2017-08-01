/**
 * Created by cyt on 2017/5/16.
 */
import * as service from '../../services/account/security';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';
import { message } from 'antd';

export default {
  namespace: 'security', // 唯一的
  state: {
    data: [],
    checked1:false,
    disabled:true,
    m: 0,
    varCode: '',
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
    // 获取我的信息数据
    *getInfo({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.getInfo, payload);
      console.log(data, 333333);
      if (data && data.retCode == 1) {
        let checked1;
        let checked2;
        let disabled;
        if(data.nopswdflag==1){
          checked1=true;
          disabled=false
        }else{
          disabled=true;
          checked1=false
        }
        if(data.autoinvflag==1){
          checked2=true
        }else{
          checked2=false
        }

          yield put({
            type: 'save',
            payload: {
              checked1:checked1,
              checked2:checked2,
              data,
              modal8: false,
              modal9: false,
              disabled:disabled
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
    *updInfo({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.updInfo, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
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

    // 修改密码
    *updatePswd({ payload }, { call, put }) {
      payload.phoneNo = getLocalStorage(Storage.DID_LOGIN).retMsg;
      console.log(payload);
      const { data } = yield call(service.updatePswd, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        message.success(data.retMsg);
        yield put({
          type: 'save',
          payload: {
            modal1: false,
          },

        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 修改交易密码
    *updateTranPswd({ payload }, { call, put }) {
      console.log(payload);
      const { data } = yield call(service.updateTranPswd, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        message.success(data.retMsg);
        yield put({
          type: 'save',
          payload: {
            modal2: false,
            modal4: false,
            modal5: false,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 客户委托协议(免密)签署/撤销
    *signFreeAgreement({ payload }, { call, put }) {
      console.log(payload);
      const { data } = yield call(service.signFreeAgreement, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        yield put({
          type: 'getInfo',
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
    },
    // 发送短信验证
    *get({ payload }, { call }) {
      console.log(payload, 222);
      const { data } = yield call(service.get, payload);
      console.log(data, 222);
      if (data && data.retCode) {
        message.success(data.retMsg);
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 验证手机验证码是否正确
    *validateVarCode({ payload }, { call, put }) {
      console.log(11111, 222);
      const { data } = yield call(service.validateVarCode, {phoneNo:getLocalStorage(Storage.DID_LOGIN).retMsg,varCode:payload.varCode});
      console.log(data, 222);
      if (data && data.retCode === 1) {
        yield put({
          type: 'updateTranPswd',
          payload: {
            checkCode: data.map.checkCode,
            type: 3,
            newPswd:payload.newPswd,
            token: data.token,
            telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 密码验证
    *validateTranPswd({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      console.log(payload, 123456);
      const { data } = yield call(service.validateTranPswd, payload);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        yield put({
          type: 'signFreeAgreement',
          payload: {
            busiTradeType:payload.busiType,
            telno:payload.telno,
            businessSeqNo:data.businessSeqNo,
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
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/myaccount/security') {
          dispatch({
            type: 'getInfo',
            payload:{
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            }
          })
        }
      })
    }
  },

};
