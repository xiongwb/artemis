/**
 * Created by cyt on 2017/5/8.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Layout,
} from 'antd';

import styles from './myaccount.css';
import LeftContent from './left_content';
const { Content } = Layout;
import { browserHistory } from 'react-router';
class MyAccount extends React.Component {

  render() {

    return (
        <div>
          <Row type="flex">
            <Col span={6}>
              <div>
                <LeftContent/>
              </div>
            </Col>
            <Col span={17}>
              <div className={styles.rightDiv}>
                <Content style={{ minHeight: 450, backgroundColor:'#FFF',margin:'10px'}}>
                  {this.props.children}
                </Content>
              </div>
            </Col>
          </Row>
      </div>
    );
  }
}

export default connect()(MyAccount);
