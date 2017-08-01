/**
 * Created by cyt on 2017/5/9.
 */


import React from 'react';
import { connect } from 'dva';

import {

  Tabs,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './bank_list_assembly.css';
import cityData from './region';
import BankListAssembly from './bank_list_assembly';

const TabPane = Tabs.TabPane;

function BankList() {
  const onTabClick = (e) => {
    console.log(e, 123);
    if (e == 2) {
      browserHistory.push('/myaccount/recharge');
    }
    if (e == 3) {
      browserHistory.push('/myaccount/withdrawals');
    }
  };
  console.log(cityData, 123);
  return (
    <div>
      <div className={styles.root} >
        <Tabs type="card" onTabClick={onTabClick}>
          <TabPane tab="银行卡列表" key="1"><BankListAssembly /></TabPane>
          <TabPane tab="充值" key="2" />
          <TabPane tab="提现" key="3" />
        </Tabs>
      </div>
    </div>
  );
}


export default connect()(BankList);
