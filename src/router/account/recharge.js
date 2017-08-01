/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {

  Tabs,
} from 'antd';

import styles from './bank_list_assembly.css';
import RechargeAssembly from './recharge_assembly';
import { browserHistory } from 'react-router';
const TabPane = Tabs.TabPane;


function Recharge({}) {
  const onTabClick = (e) => {
    console.log(e, 123);
    if (e == 2) {
      browserHistory.push('/myaccount/withdrawals');
    }
    if (e == 3) {
      browserHistory.push('/myaccount/banklist');
    }
  };
  return (
    <div>

      <div className={styles.root} >
        <Tabs type="card" onTabClick={onTabClick}>
          <TabPane tab="充值" key="1"><RechargeAssembly /></TabPane>
          <TabPane tab="提现" key="2" />
          <TabPane tab="银行卡列表" key="3" />
        </Tabs>
      </div>

    </div>
  );
}


export default connect()(Recharge);
