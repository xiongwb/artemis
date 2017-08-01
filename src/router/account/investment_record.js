/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Tabs,
  Table,
  Button,
  Spin,
  Modal,
} from 'antd';

import styles from './investment_record.css';

import Date from '../../utils/date';


const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;


function InvestmentrRecord({ investment, dispatch }) {
  console.log(investment, 321);
  if (investment.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '20%' }} /></div>);
  }
  const dataSource1 = investment.data.invRcdVOList;
  const dataSource2 = investment.data.invRcdVOList;
  const on_Click = (record) => {
    confirm({
      title: '转让申请',
      content: '是否执行转让操作',
      onOk() {
        dispatch({ type: 'investmentRecord/transApp',
          payload: {
            invrcdid: record.invrcdid,
            tenantno: record.tenantno,
            telno: record.telno,
            cusname: record.cusname,
            appdate: Date.getDate(),
            tranprdcode: record.prdcode,
          } });
      },
      onCancel() {
      },
    });
  };
 const protocol=(record)=>{
   dispatch({ type: 'investmentRecord/contget',
     payload: {
       rcdID:record.invrcdid,
       type:1
     } });
 };
  const handleOk=()=>{
    dispatch({ type: 'investmentRecord/save',
      payload: {
        visible: false
      } });

  };
  const handleCancel=()=>{
    dispatch({ type: 'investmentRecord/save',
      payload: {
        visible: false
      } });
  };
  const columns1 = [
    { title: '项目名称', className: styles.title, dataIndex: 'prdname', width: 50, key: 'prdname' },
    { title: '投资金额', className: styles.title, dataIndex: 'invsum', width: 50, key: 'invsum' },
    { title: '预期收益率', className: styles.title, dataIndex: 'expprofit', width: 50, key: 'expprofit' },
    { title: '购买日期', className: styles.title, dataIndex: 'invdate', width: 80, key: 'invdate' },
    {
      title: '协议合同',
      className: styles.title,
      key: 'operate1',
      width: 50,
      render: record =>
        (<div>
          <Button onClick={() => protocol(record)} className={styles.button1}>查看</Button>
        </div>),
    },

    {
      title: '是否转让',
      className: styles.title,
      key: 'operate2',
      width: 50,
      render: record =>
      (<div>
        <Button onClick={() => protocol(record)} disabled={!!(record.transferflag > 0 || record.cantransflag == 0)} className={styles.button1}>{record.cantransflag == 0 ? '不可转让' : record.transferflag == 0 ? '未转让' : record.transferflag == 1 ? '已转让' : '转让中'}</Button>
      </div>),
    },
  ];
  const columns2 = [
    { title: '项目名称', className: styles.title, dataIndex: 'prdname', width: 50, key: 'prdname', onCellClick: record => onCellClick(record) },
    { title: '投资金额', className: styles.title, dataIndex: 'invsum', width: 50, key: 'invsum', onCellClick: record => onCellClick(record) },
    { title: '已收金额', className: styles.title, dataIndex: 'earnedsum', width: 50, key: 'earnedsum', onCellClick: record => onCellClick(record) },
    { title: '购买日期', className: styles.title, dataIndex: 'invdate', width: 80, key: 'invdate', onCellClick: record => onCellClick(record) },

  ];
  /*  const nothing=()=> {
   return (
   <div style={{minHeight:400}}>
   <div  className={styles.circle}>
   <Icon type="exclamation-circle" style={{fontSize:115,color:'#cccccc', marginTop:110}}/>
   </div>
   <div  className={styles.nothing} >
   暂无转让记录
   </div>
   </div>
   )
   }*/
  const onTabClick = (e) => {
    console.log(e, 222);
    if (e == 1) {
      dispatch({ type: 'investmentRecord/invListBySta', payload: { telno: 15202207322, prdstatus: 1 } });
    }
    if (e == 2) {
      dispatch({ type: 'investmentRecord/invListBySta', payload: { telno: 15202207322, prdstatus: 2 } });
    }
  };
  return (
    <div>
      <Spin spinning={investment.loading}>
        <div className={styles.root} >
          <Tabs onTabClick={onTabClick}>
            <TabPane tab="投资中" key="1">
              <Table
                className={styles.table}
                columns={columns1}
                dataSource={dataSource1}

              /></TabPane>
            <TabPane tab="已结清" key="2">
              <Table
                className={styles.table}
                columns={columns2}
                dataSource={dataSource2}
              /></TabPane>

          </Tabs>
        </div>
      </Spin>
      <Modal
       onOk={handleOk}
        onCancel={handleCancel}
        title={investment.protocol.protocoltitle} visible={investment.visible}
      >
        {investment.cont}
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    investment: state.investmentRecord,
  };
}


export default connect(mapStateToProps)(InvestmentrRecord);

