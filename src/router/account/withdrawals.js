/**
 * Created by cyt on 2017/5/9.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Tabs,
} from 'antd';

import styles from './bank_list_assembly.css';
import { browserHistory } from 'react-router';
import WithdrawalsAssembly from './withdrawals_assembly';


const TabPane = Tabs.TabPane;


function Withdrawals() {
  const onTabClick = (e) => {
    if (e == 2) {
      browserHistory.push('/myaccount/banklist');
    }
    if (e == 3) {
      browserHistory.push('/myaccount/recharge');
    }
  };
  return (
    <div>

      <div className={styles.root} >
        <Tabs type="card" onTabClick={onTabClick}>
          <TabPane tab="提现" key="1"><WithdrawalsAssembly /></TabPane>
          <TabPane tab="银行卡列表" key="2" />
          <TabPane tab="充值" key="3" />

        </Tabs>
      </div>

    </div>
  );
}


export default connect()(Withdrawals);

