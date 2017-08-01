import React from 'react'
import { connect } from 'dva'
import styles from './finish_register.css'
import { Steps,Icon} from 'antd';
const Step = Steps.Step;
import { Link,browserHistory } from 'react-router'

import regsiterImage from '../../assets/regsiter.png';

function FinishRegister() {

  //3s后跳转到首页
  const timeInterval = setInterval(()=>{
    browserHistory.push('/');
    clearInterval(timeInterval);
  },3000);

  return (
    <div className={styles.root}>
      <div className={styles.progress}>
        <Steps current={3} style={{backgroundColor:'#eeeeee'}}>
          <Step title="注册" description="输入手机号注册"/>
          <Step title="个人信息" description="输入个人信息"/>
          <Step title="设置支付密码" description="确认支付密码"/>
          <Step title="完成" description="完成注册"/>
        </Steps>
      </div>
      <div className={styles.register}>
        <div className={styles.leftDiv}>
          <Icon type="check-circle" style={{ fontSize: 150,color:'#f04e1d' }}/>
          <div style={{marginTop:20}}>
            <text style={{fontSize:25,color:'#f04e1d',marginLeft:20}}>注册成功</text>
          </div>
          <div style={{marginTop:20}}>
            <text style={{marginLeft:-20}}>3秒后未自动跳转，请点击<Link to="/" style={{color:'#f04e1d'}}>进入首页</Link></text>
          </div>
        </div>
        <div className={styles.rightDiv}>
          <div style={{paddingLeft:150}}>
            <text>已有账号？<a style={{color:'#f04e1d'}}>直接登录</a></text>
          </div>
          <img src={regsiterImage} style={{width:458,height:313}}/>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
  };
}

export default connect()(FinishRegister)
