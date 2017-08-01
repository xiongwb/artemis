/**
 * Created by cyt on 2017/5/10.
 */

import React from 'react';
import { connect } from 'dva';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';

import {
  Button,
  Row,
  Col,
  Table,
  Input,
  Spin,
} from 'antd';
import styles from './withdrawals_assembly.css';
import wbank_card from '../../assets/wbank_card.png';
import tenant from '../../constant/common_config';
import { hexMD5 } from '../../utils/md5';
function WithdrawalsAssembly({ withdrawals, dispatch }) {
  console.log(withdrawals.money, 123456);
  if (withdrawals.data.length == 0 || withdrawals.list.length == 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '9%' }} /></div>);
  }

  const onChange = (page) => {
    dispatch({
      type: 'withdrawals/drawList',
      payload: {
        telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
        pageNum: page,
      },
    });
  };
  const dataSource = withdrawals.list.drawVOList;
  const columns = [
    { title: '银行卡号', className: styles.title, dataIndex: 'acctno', width: 50, backgroundColor: '#f04e1d', key: 'acctno' },
    { title: '提现金额', className: styles.title, dataIndex: 'drawsum', width: 50, key: 'drawsum' },
    { title: '提现手续费', className: styles.title, dataIndex: 'drawfee', width: 50, key: 'drawfee' },
    { title: '提现日期', className: styles.title, dataIndex: 'drawdate', width: 50, key: 'drawdate' },
  ];
  // 提现
  const submit = () => {
    console.log(withdrawals.transPswd, 123456);
    dispatch({
      type: 'withdrawals/validateTranPswd1',
      payload: { transPswd: hexMD5(withdrawals.transPswd), money: withdrawals.money, busiType: 'R01' },
    });
  };
  const money = (e) => {
    console.log(1111, 222);
    const reg = new RegExp(/^\+?[1-9][0-9]*$/);
    if (!reg.test(e.target.value)) {
      message.error('请输入大于0的数字');
      dispatch({
        type: 'withdrawals/save',
        payload: { money: '' },
      });
    } else {
      dispatch({
        type: 'withdrawals/getFee',
        payload: { money: e.target.value, type: 1, tenantNo: tenant.tenantno },
      });
    }
  };
  const transPswd = (e) => {
    console.log(e.target.value, 123456);
    dispatch({
      type: 'withdrawals/save',
      payload: { transPswd: e.target.value },
    });
  };
  return (
    <div style={{ minHeight: 200 }}>
      <Spin spinning={withdrawals.loading}>
        <Row type="flex" >
          <Col >
            <div className={styles.bank}>
              默认银行卡：
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.userinfo} >
              <Row type="flex">
                <Col >
                  <div className={styles.circle}>
                    <img src={wbank_card} className={styles.logo} />
                  </div>
                </Col>
                <Col span={13}>
                  <div className={styles.div1}>
                    <text style={{ fontSize: 12 }}>{withdrawals.data.openbank}</text>
                    <br />
                    <text>储蓄卡</text>
                  </div>
                </Col>
              </Row>
              <div className={styles.div2}>
                {withdrawals.data.acctno}
              </div>
            </div>
          </Col>
        </Row>
        <div className={styles.margin}>
          &emsp;&emsp;提现金额：<Input value={withdrawals.money} onChange={money} style={{ width: 100 }} /> 元
          &emsp;&emsp;手续费:{withdrawals.feeSum}
          <br /><br />
          输入交易密码：<Input type="password" value={withdrawals.transPswd} onChange={transPswd} style={{ width: 100 }} />
        </div>
        <Button className={styles.button} onClick={() => submit()}>提现</Button>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10, total: withdrawals.data.totalElements, onChange }}
        />
      </Spin>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    withdrawals: state.withdrawals,
  };
}

export default connect(mapStateToProps)(WithdrawalsAssembly);
