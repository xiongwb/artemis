/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Tabs,
  Table,
  Button,
  Modal,
  Spin,
} from 'antd';

import styles from './myRiskList.css';
import { browserHistory } from 'react-router';
function MyRiskList({ myRiskList, dispatch }) {
  if (myRiskList.data.length === 0) {
    return (<div />);
  }

  const toQuestionPage = () => {
    browserHistory.push('/myaccount/riskTextQuestion');
  };

  const openDetail = (riskrcdid) => {
    dispatch({
      type: 'myRiskList/getRiskDetail',
      payload: { riskrcdid },
    });
  };

  const closeModel = () => {
    dispatch({
      type: 'myRiskList/save',
      payload: { visible: false },
    });
  };

  const renderDetails = (list) => {
    const rows = [];
    console.log(list, 'listlistlist');
    if (list != null && list.length > 0) {
      for (const i in list) {
        rows.push(
          <div key={`detail${i}`} className={styles.questionDiv}>
            <div>
              <text>{`${list[i].sn}、${list[i].quename}`}</text>
            </div>
            <div>
              <text>选择：</text>
              <text>{`${list[i].answopt} ${list[i].answer}`}</text>
            </div>
            <div>
              <text>得分：</text>
              <text>{list[i].score}</text>
            </div>
          </div>,
        );
      }
    }
    return rows;
  };

  const dataSource1 = myRiskList.data.myRiskRcdVOList;

  const columns = [
    { title: '评估日期', className: styles.title, dataIndex: 'evadate', width: 50, key: 'evadate' },
    { title: '评分', className: styles.title, dataIndex: 'score', width: 50, key: 'score' },
    { title: '等级', className: styles.title, dataIndex: 'riskgrade', width: 50, key: 'riskgrade' },
    {
      title: '详情',
      className: styles.title,
      dataIndex: 'riskrcdid',
      key: 'riskrcdid',
      width: 50,
      render: (text, record, index) =>
      (<div>
        <Button type="primary" className={styles.button1} onClick={() => openDetail(text)}>详情</Button>
      </div>),
    },
  ];

  return (
    <Spin spinning={myRiskList.loading}>
      <div>
        <div className={styles.root} >
          <div className={styles.btnDiv}>
            <Button type="primary" className={styles.btn} onClick={toQuestionPage}>新建风险评估</Button>
          </div>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={dataSource1}
            pagination={{ pageSize: 10, total: 10 }}
          />
        </div>
        <Modal
          title="评估详情"
          visible={myRiskList.visible}
          onOk={closeModel}
          onCancel={closeModel}
          cancelText="关闭"
        >
          {renderDetails(myRiskList.riskrcddet)}
        </Modal>
      </div>
    </Spin>
  );
}

function mapStateToProps(state) {
  return {
    myRiskList: state.myRiskList,
  };
}


export default connect(mapStateToProps)(MyRiskList);

