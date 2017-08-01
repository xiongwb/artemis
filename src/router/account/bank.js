/**
 * Created by cyt on 2017/5/19.
 */

import React from 'react';
import {
  Row,
  Col,
} from 'antd';
import styles from './recharge_assembly.css';
import wbankCard from '../../assets/wbank_card.png';

const selected = styles.selected;
const unchecked = styles.unchecked;

class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: unchecked,
    };
  }
  onClick() {
    if (this.state.isSelected === unchecked) {
      this.setState({ isSelected: selected });
      this.props.onClick && this.props.onClick(true);
    } else {
      this.setState({ isSelected: unchecked });
      this.props.onClick && this.props.onClick(false);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.keys != nextProps.value) {
      this.setState({ isSelected: unchecked });
    }
  }

  render() {
    return (
      <div className={`${this.props.background} ${this.state.isSelected}`} onClick={() => this.onClick()}>
        <Row type="flex">
          <Col >
            <div className={styles.circle}>
              <img src={wbankCard} alt="banner" className={styles.logo} />
            </div>
          </Col>
          <Col span={13}>
            <div className={styles.div1}>
              <text style={{ fontSize: 12 }}>{this.props.openbank}</text>
              <br />
              <text style={{ fontSize: 11 }}>储蓄卡</text>
            </div>
          </Col>
        </Row>
        <div className={styles.div2} style={{ fontSize: 14 }}>
          {this.props.keys}
        </div>
      </div>
    );
  }
}

export default Bank;
