/**
 * Created by cyt on 2017/5/16.
 */
import * as service from '../../services/account/financing_record';
import { message } from 'antd';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';
import { browserHistory } from 'react-router';
export default {
  namespace: 'financingRecord', // 唯一的
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
    *finList({ payload }, { call, put }) {
      const { data } = yield call(service.finList, payload);
      if (data && data.retCode == 1) {
        // console.log("接收到的data是",data);
        yield put({
          type: 'save',
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
    *repaymentList({ payload }, { call, put }) {
      // 通过产品code获取产品信息
      const { data } = yield call(service.repaymentList, payload);
      // console.log("返回的还款列表是",data);
      if (data.retCode == 0 && data.list == null) {
        message.error(data.retMsg);
      } else if (data.retCode == 1 && (data.list == null || data.list.length == 0)) {
        message.error('暂无数据');
      } else if (data.list.length > 0 && data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            repaymentList: data.list,
          },
        });
      }
    },
    *validateTranPswd({ payload, finpayrcdid }, { call, put }) {
      // 通过产品code获取产品信息
      const { data } = yield call(service.validateTranPswd, payload);
      // console.log("返回的验密结果是",data);

      if (data.retCode == 1) {
        // 验密成功，进行还款
        yield put({
          type: 'repayment',
          payload: { businessSeqNo: data.map.businessSeqNo, finpayrcdid: finpayrcdid.finpayrcdid },
        });
      } else {
        message.error('交易密码不正确！');
      }
    },
    *repayment({ payload }, { call, put }) {
      const { data } = yield call(service.finPay, payload);
      // console.log("返回的还款结果是",data);

      if (data.retCode == 1) {
        message.success('还款成功！');
      } else {
        message.error(data.retMsg);
      }
    },
    *finPrePayApp({ payload }, { call, put }) {
      const { data } = yield call(service.finPrePayApp, payload);
      // console.log("返回的还款结果是",data);

      if (data.retCode == 1) {
        message.success('已提交申请！');
      } else {
        message.error(data.retMsg);
      }
    },
    *getFeeType({ payload }, { call, put }) {
      // 通过dict类型查找
      const { data } = yield call(service.getFeeType, payload);
     // console.log("返回的类型结果是",data);

      if (data.retCode == 1) {
        // console.log("通过dict找到的data是",data);
        // 获得了支付类型
        const feeTypeNameList = [];
        let dictkey = '';
        for (const i in data.list) {
          feeTypeNameList.push(data.list[i].dictvalue);
          if (data.list[i].dictvalue == '平台佣金') {
            dictkey = data.list[i].dictkey;
          }
        }
        yield put({
          type: 'save',
          payload: {
            feeTypeNameList,
            feeTypeList: data.list,
            feeType: dictkey,
          },
        });
      } else {
        message.error('没有返回类型！');
      }
    },
    *getSumFee({ payload }, { call, put }) {
  // 进行查询佣金
      const { data } = yield call(service.getSumFee, payload);
      console.log('查询的佣金是', data);
      if (data.retCode == 1) {
        yield put({
          type: 'save',
          payload: {
            feeSum: data.feeSum,
          },
        });
      } else {
          // message.error(data.retMsg);
      }
    },
    *validateTranPswdPayfee({ payload, dataParams }, { call, put }) {
      // 通过产品code获取产品信息
      const { data } = yield call(service.validateTranPswd, payload);
      // console.log("返回的验密结果是",data);

      if (data.retCode == 1) {
        // 验密成功，进行还款
        yield put({
          type: 'payFee',
          payload: { businessSeqNo: data.map.businessSeqNo, feeType: dataParams.feeType, fee: dataParams.fee },
        });
      } else {
        message.error('交易密码不正确！');
      }
    },
    *payFee({ payload }, { call, put }) {
      const { data } = yield call(service.finFee, payload);
      // console.log("返回的还款结果是",data);

      if (data.retCode == 1) {
        message.success('支付成功！');
      } else {
        message.error(data.retMsg);
      }
    },
    *prePayStatus({ payload }, { call, put }) {
      const { data } = yield call(service.getPrePayStatus, payload);
      console.log('返回的状态是', data);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            prePayStatus: data,
          },
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
        if (location.pathname === '/myaccount/financing_record') {
          dispatch({
            type: 'finList',
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

