/**
 * Created by cyt on 2017/5/10.
 */


import React from 'react';
import { connect } from 'dva';
import {
  Button,
  Row,
  Col,
  Spin,
  Input,
  Table,
  message,
} from 'antd';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';
import styles from './recharge_assembly.css';
import StringUtils from '../../utils/string_utils';
import Bank from './bank';
import tenant from '../../constant/common_config';
import { hexMD5 } from '../../utils/md5';
function RechargeAssembly({ recharge, dispatch }) {
  if (recharge.data.length === 0 || recharge.list.length === 0 || recharge.availablesum === '') {
    return (<div className={styles.spin}><Spin style={{ marginTop: '9%' }} /></div>);
  }
  const key = recharge.data.bindList;

  // 金额为NULL是初始化为0
  const Initialization = (e) => {
    if (e) {
      return StringUtils.moneyFormatData2Money(e);
    } else {
      return '0.0';
    }
  };
  // value控制的银行卡的选择限制（不能多选）
  const onClick = (e, acctno) => {
    console.log(e, acctno);
    if (e) {
      dispatch({
        type: 'recharge/choice',
        payload: { value: acctno },
      });
    } else {
      dispatch({
        type: 'recharge/choice',
        payload: { value: '' },
      });
    }
  };
  // 遍历银行卡
  const bank = (s) => {
    return (
      <Col span={6}>
        <Bank
          background={styles.userinfo} dispatch={dispatch} keys={s.acctno}
          openbank={s.openbank} value={recharge.value} onClick={e => onClick(e, s.acctno)}
        />
      </Col>
    );
  };
  const onChange = (page) => {
    dispatch({
      type: 'recharge/supList',
      payload: {
        telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
        pageNum: page,
      },
    });
  };
  const dataSource = recharge.list.supplementVOList;
  const columns = [
    { title: '银行卡号', className: styles.title, dataIndex: 'acctno', width: 50, backgroundColor: '#f04e1d', key: 'acctno' },
    { title: '充值金额', className: styles.title, dataIndex: 'supsum', width: 50, key: 'supsum' },
    { title: '充值手续费', className: styles.title, dataIndex: 'supfee', width: 50, key: 'supfee' },
    { title: '充值日期', className: styles.title, dataIndex: 'supdate', width: 50, key: 'supdate' },
  ];
  // 充值
  const submit = () => {
    if (recharge.value) {
      dispatch({
        type: 'recharge/validateTranPswd1',
        payload: { transPswd: hexMD5(recharge.transPswd), money: recharge.money, busiType: 'R01' },
      });
    } else {
      message.error('请选择银行卡');
    }
  };
  const money = (e) => {
    const reg = new RegExp(/^\+?[1-9][0-9]*$/);
    if (!reg.test(e.target.value)) {
      message.error('请输入大于0的数字');
      dispatch({
        type: 'recharge/save',
        payload: { money: '' },
      });
    } else {
      dispatch({
        type: 'recharge/getFee',
        payload: { money: e.target.value, type: 2, tenantNo: tenant.tenantno },
      });
    }
  };
  const transPswd = (e) => {
    dispatch({
      type: 'recharge/save',
      payload: { transPswd: e.target.value },
    });
  };
  return (
    <div style={{ minHeight: 200 }}>
      <Spin spinning={recharge.loading}>
        <div className={styles.rectangle} >
          <text className={styles.marginleft} >账户余额：</text>
          <text className={styles.text} >￥{Initialization(recharge.availablesum)} </text>
        </div>
        <div >
          <text className={styles.marginleft}>选择充值方式:</text>
        </div>
        <div className={styles.margin}>
          <Row type="flex" gutter={8} >
            {key.map((s, i) => bank(s, i))}
          </Row>
          <div className={styles.margintop}>
            &emsp;&emsp;充值金额：<Input value={recharge.money}   onChange={money} style={{ width: 100 }} /> 元
            &emsp;&emsp;手续费:{recharge.feeSum}
            <br /><br />
            输入交易密码：<Input type="password" value={recharge.transPswd} onChange={transPswd} style={{ width: 100 }} />
          </div>
          <Button className={styles.button} onClick={() => submit()}>确认</Button>

        </div>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10, total: recharge.data.totalElements, onChange }}
        />
      </Spin>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    recharge: state.recharge,
  };
}


export default connect(mapStateToProps)(RechargeAssembly);
