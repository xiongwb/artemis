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
  Icon
} from 'antd';
import { browserHistory } from 'react-router'
class LoanForm extends React.Component {
  state = { visible: false }

  render() {
const kajuan=()=>{
  return(
    <div className={styles.wdiv}>
      <div  className={styles.wdiv2}>
        <Icon type="exclamation-circle-o"  style={{fontSize:100,}}/>
      </div>
      <div className={styles.wdiv3}>
        <text className={styles.text}>您还没有可用的卡卷!</text>
      </div>
    </div>
  )
}
const onclick=()=>{
  browserHistory.push('/mygiftbag/history')
}
    return (
      <div className={styles.root}>
          <div className={styles.title}>
            <text className={styles.title1}>
              如要查看已过期或已使用卡卷，请点击-<span className={styles.title2} onClick={()=>onclick()}>历史记录</span>
            </text>
          </div>
        <div className={styles.title}>
          {kajuan()}
        </div>
      </div>
    )
  }}

const LForm = Form.create()(LoanForm);
function Mygiftbag() {


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

export default connect(mapStateToProps)(Mygiftbag)
