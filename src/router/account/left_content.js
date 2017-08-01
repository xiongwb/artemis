/**
 * Created by cyt on 2017/5/8.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Icon,
  Button,
  Menu,
} from 'antd';
import { Link } from 'react-router';
import styles from './left_content.css';
const SubMenu = Menu.SubMenu;

function LeftContent() {
  return (
    <div>
      <Button className={styles.title} ><Icon type="home" />我的账户中心</Button>

      <Menu
        className={styles.line1}
        mode="inline"
        style={{ width: 240 }}
      >
        <SubMenu key="sub1" title={<span><Icon type="home" /><span>我的账户</span></span>}>
          <Menu.Item key="1"><Link to="/myaccount">账户总览</Link></Menu.Item>

        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="setting" /><span>账户设置</span></span>}>
          <Menu.Item key="5"><Link to="/myaccount/personalinfo">个人设置</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/myaccount/security">安全信息</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="pay-circle-o" /><span>资金管理</span></span>}>
          <Menu.Item key="9"><Link to="/myaccount/recharge">充值</Link></Menu.Item>
          <Menu.Item key="10"><Link to="/myaccount/withdrawals">提现</Link></Menu.Item>
          <Menu.Item key="11"><Link to="/myaccount/banklist">银行卡列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" title={<span><Icon type="setting" /><span>投资管理</span></span>}>
          <Menu.Item key="13"><Link to="/myaccount/investment_record">投资记录</Link></Menu.Item>
          <Menu.Item key="14"><Link to="/myaccount/financing_record">融资记录</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub6" title={<span><Icon type="setting" /><span>风险评估</span></span>}>
          <Menu.Item key="15"><Link to="/myaccount/myRiskList">评估记录</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default connect()(LeftContent);
