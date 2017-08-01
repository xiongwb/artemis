/**
 * Created by zhangle on 2017/5/22.
 */
/**
 * Created by zhangle on 2017/5/22.
 */
/**
 * Created by zhangle on 2017/5/7.
 */

import React from 'react'
import { connect } from 'dva'
import styles from './mygiftbag.css'
import red from '../../assets/coupon_red.png'
import blue from '../../assets/coupon_blue.png'
import grey from '../../assets/coupon_grey.png'
import {
  Row,
  Col,
  Button,
  Form,
  Spin,
} from 'antd';

class LoanForm extends React.Component {
  state = { visible: false }

  render() {
    const kajuan=()=>{
      return(
        <div>
          <Row gutter={26}>
            <Col span={8}>
              <img src={blue}/>
            </Col>
            <Col span={8}>
              <img src={red}></img>
            </Col>
            <Col span={8}>
              <img src={grey}/>
            </Col>
          </Row>
          <Row gutter={26}>
            <Col span={8}>
              <img src={blue}/>
            </Col>
            <Col span={8}>
              <img src={red}></img>
            </Col>
            <Col span={8}>
              <img src={grey}/>
            </Col>
          </Row>
          <Row gutter={26}>
            <Col span={8}>
              <img src={blue}/>
            </Col>
            <Col span={8}>
              <img src={red}></img>
            </Col>
            <Col span={8}>
              <img src={grey}/>
            </Col>
          </Row>
        </div>
      )
    }
    return (
      <div className={styles.root}>
        <div className={styles.title}>

        </div>
        <div className={styles.title}>
          {kajuan()}
        </div>
      </div>
    )
  }}

const LForm = Form.create()(LoanForm);
function MygiftbagHistory() {


  return (
    <div className={styles.root}>
      <LForm  />
    </div>
  )
}
function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(MygiftbagHistory)
