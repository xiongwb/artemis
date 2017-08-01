/**
 * Created by cyt on 2017/5/8.
 */

import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'react-router';
import StringUtils from '../../utils/string_utils';
import {
  Button,
  Row,
  Col,
  Spin,
} from 'antd';

import styles from './overview.css';

function Overview({ overview, dispatch }) {
  if (overview.data.length === 0 || overview.nickname == '') {
    return (<div className={styles.spin}><Spin style={{ marginTop: '15%' }} /></div>);
  }
  // 金额为NULL是初始化为0
  const Initialization = (e) => {
    if (e) {
      return StringUtils.moneyFormatData2Money(e);
    } else {
      return '0.0';
    }
  };
// 初始化年月日
  const date = (e) => {
    if (e) {
      return e;
    } else {
      return '--年--月--日';
    }
  };
  const recharge = () => {
    browserHistory.push('/myaccount/recharge');
  };
  const withdrawals = () => {
    browserHistory.push('/myaccount/withdrawals');
  };
  return (
    <div>
      <Spin spinning={overview.loading}>
        <div className={styles.root}>
          <Row type="flex" >
            <Col >
              <div className={styles.userinfo}>
                <div className={styles.circle} />
              </div>

            </Col>
            <Col span={8}>
              <div >
                <div className={styles.text1}>
                  <text style={{ color: '#f04e1d', fontSize: 19 }}>{overview.nickname}</text>
                </div>
                <div className={styles.text2}>
                  <text style={{ color: '#101010' }}>资额总资产:</text>
                  <text style={{ color: '#f04e1d', fontSize: 16 }}>￥{Initialization(overview.data.acctnoEntity.totasset)}</text>
                </div>
              </div>
            </Col>
            <Col>
              <div className={styles.line} />
            </Col>
            <Col span={10}>
              <div className={styles.button} style={{ marginTop: 80 }}>
                <Button onClick={recharge} style={{ color: '#fffaf8', backgroundColor: '#fdb82d' }}>充值</Button>
                <Button onClick={withdrawals} style={{ color: '#fffaf8', marginLeft: 12, backgroundColor: '#2fabdf' }}>提现</Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.root}>
          <Row type="flex">
            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.investedsum)}</text><br />
                  <text >已投金额</text>
                </div>
              </div>
            </Col>

            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.toearnsum)}</text><br />
                  <text >待收益总额</text>
                </div>
              </div>
            </Col>

            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.availablesum)}</text><br />
                  <text >可用余额</text>
                </div>
              </div>
            </Col>

            <Col span={6} order={4}>
              <div className={styles.money2} style={{ border: 0 }}>
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.candrawsum)}</text><br />
                  <text >可提金额</text>
                </div>
              </div>
            </Col>
          </Row>
          <div className={styles.line2} />
          <Row type="flex">
            <Col span={6} order={4}>

              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.cannotdrawsum)}</text><br />
                  <text >在途金额</text>
                </div>
              </div>
            </Col>
            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.toearnsum)}</text><br />
                  <text >已收益金额</text>
                </div>
              </div>
            </Col>
            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.accuinvsum)}</text><br />
                  <text >累计投资金额</text>
                </div>
              </div>
            </Col>
            <Col span={6} order={4}>
              <div className={styles.money2} style={{ border: 0 }}>
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.accuearnsum)}</text><br />
                  <text >累计收益金额</text>
                </div>
              </div>
            </Col>
          </Row>

        </div>

        <div className={styles.root}>
          <Row type="flex">
            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.borrowedsum)}</text><br />
                  <text >已融资金额</text>
                </div>
              </div>
            </Col>

            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size} >￥{Initialization(overview.data.acctnoEntity.arrivalsum)}</text><br />
                  <text >待收款金额</text>
                </div>
              </div>
            </Col>

            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.payfee)}</text><br />
                  <text >已付利息及手续费</text>
                </div>
              </div>
            </Col>

            <Col span={6} order={4}>
              <div className={styles.money2} style={{ border: 0 }}>
                <div className={styles.padding} style={{ marginTop: 27 }}>
                  <text className={styles.date} >{date(overview.data.acctnoEntity.nextpaydate)}</text><br />
                  <text >下次还款日</text>
                </div>
              </div>
            </Col>
          </Row>
          <div className={styles.line2} />
          <Row type="flex">
            <Col span={6} order={4}>

              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.nextpaydue)}</text><br />
                  <text >下次待还本金</text>
                </div>
              </div>
            </Col>
            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.nextpayint)}</text><br />
                  <text >下次待还本息</text>
                </div>
              </div>
            </Col>
            <Col span={6} order={4}>
              <div className={styles.money2} >
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.accuborsum)}</text><br />
                  <text >累计融资金额</text>
                </div>
              </div>
            </Col>
            <Col span={6} order={4}>
              <div className={styles.money2} style={{ border: 0 }}>
                <div className={styles.padding} >
                  <text className={styles.size}>￥{Initialization(overview.data.acctnoEntity.accupayfee)}</text><br />
                  <text >累计支付利息及手续费</text>
                </div>
              </div>
            </Col>
          </Row>

        </div>
      </Spin>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    overview: state.overview,
  };
}


export default connect(mapStateToProps)(Overview);
