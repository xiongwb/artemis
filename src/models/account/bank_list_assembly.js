/**
 * Created by cyt on 2017/5/9.
 */
import * as service from '../../services/account/bank_list_assembly';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';
import { message } from 'antd';
import tenant from '../../constant/common_config'
export default {
  namespace: 'bankList', // 唯一的
  state: {
    data: [],
    bank: [],
    Modal1: false,
    Modal2: false,
    value: '',
    bankcode: '',
    openbranch: '',
    interbankno: '',
    openbank: '',
    info: [],
    place: [],
    protocol:'',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    choice(state, action) {
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
    // 已绑定银行卡列表
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
            value: '',
            Modal1: false,
            Modal2: false,
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
    // 获取开户行列表
    *getBankList({ payload }, { call, put }) {
      console.log(payload);
      const { data } = yield call(service.getBankList, {});
      console.log(data, 222);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            bank: data,
            loading: false,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 根据卡号获取开户行
    *getBankCode({ payload }, { call, put }) {
      console.log(payload, 33333);
      const { data } = yield call(service.getBankCode, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            bankcode: data.map.bankcode,
            openbank: data.map.bankname,
          },

        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 取联行号
    *getInterBankNo({ payload }, { call, put }) {
      console.log(payload, 222);
      const { data } = yield call(service.getInterBankNo, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            place: data.list,
          },

        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 绑卡
    *bind({ payload }, { call, put, select }) {
      // 以下的属性向后台发送的表单
      const openbranch = yield select(({ bankList }) => bankList.openbranch);
      const interbankno = yield select(({ bankList }) => bankList.interbankno);
      const openbank = yield select(({ bankList }) => bankList.openbank);
      const bankcode = yield select(({ bankList }) => bankList.bankcode);
      const acctno = payload.acctno;
      const telno = payload.telno;
      const { data } = yield call(service.bind, { openbranch, interbankno, openbank, bankcode, acctno, telno,});
      console.log(data, 123456);
      if (data && data.retCode == 1) {
        message.success(data.retMsg);
        yield put({
          type: 'bindList',
          payload: {
            telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
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
    // 改绑
    *changeCard({ payload }, { call, put, select }) {
      // 以下的属性向后台发送的表单
      const oldacctno = yield select(({ bankList }) => bankList.value);
      const openbranch = yield select(({ bankList }) => bankList.openbranch);
      const interbankno = yield select(({ bankList }) => bankList.interbankno);
      const openbank = yield select(({ bankList }) => bankList.openbank);
      const bankcode = yield select(({ bankList }) => bankList.bankcode);
      const acctno = payload.acctno;
      const telno = payload.telno;
      const { data } = yield call(service.changeCard, { oldacctno, openbranch, interbankno, openbank, bankcode, acctno, telno, });
      console.log(data, 123456);
      if (data && data.retCode == 1) {
        message.success(data.retMsg);
        yield put({
          type: 'bindList',
          payload: {
            telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
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
    // 获取我的信息数据
    *getInfo({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.getInfo, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            info: data,
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
      }

    },
    // 设置主卡
    *setMain({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.setMain, payload);
      console.log(data, 222);
      if (data && data.retCode == 1) {
        yield put({
          type: 'bindList',
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
        yield put({
          type: 'hideLoad',
        });
      }
    },
    // 协议
    *protocolget({ payload }, { call, put }) {
      console.log(11111, 222);
      const { data } = yield call(service.protocolget, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            protocol: data,
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
        if (location.pathname === '/myaccount/banklist') {
          dispatch({
            type: 'bindList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
          dispatch({
            type: 'getBankList',
          });
          dispatch({
            type: 'getInfo',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
          dispatch({
            type: 'protocolget',
            payload: {
              proType: 4,
              tenantNo: tenant.tenantno,
              returnType: 3,
            },
          });
        }
      });
    },
  },


};

