import React from 'react'
import { connect } from 'dva'
import styles from './login.css'
import { Icon,Input,Checkbox,Button,message } from 'antd';
import { Link } from 'react-router'
import LoginBG from '../../assets/loginbg.png';
import { hexMD5 } from '../../utils/md5';
import { browserHistory } from 'react-router'
function Login({login,dispatch}) {


 const onClick=()=>{
   let account;
   let password;
   account=document.getElementById('account').value;
   password=document.getElementById('password').value;

   console.log(verifyPwd(password))
   if (verifyPhone(account) == false) {
      message.error('请输入正确的手机号');
      return
   }
   if(verifyPwd(password) == false) {
      message.error('密码必须大于六位，且包含字母与数字')
      return
   }

   dispatch({type:'login/login',payload:{tenantNo:1101001001,phoneNo:account,pswd:hexMD5(password)}})
 };

 const verifyPwd = (password) => {
    if (password == null || password.length <6) {
        return false;
    }
    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg1.test(password)) {
        return false;
    }
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(password)) {
        return true;
    } else {
        return false;
    }
 }

 const verifyPhone = (phone) => {
  var reg = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/)
  return reg.test(phone);
 }

  return (
    <div className={styles.root}>
      <img src={LoginBG} className={styles.image}/>
      <div className={styles.rightDiv}>
        <Input id="account"
          placeholder="Email/昵称/手机"
          prefix={
            <div className={styles.inputDiv}>
              <Icon type="user" style={{fontSize:18,marginLeft:11,marginTop:11}}  />
            </div>
            }
          size={'large'}
          className={styles.input}
        />
        <Input
          id="password"
          type="password"
          placeholder="密码"
          prefix={
            <div className={styles.inputDiv}>
              <Icon type="lock" style={{fontSize:18,marginLeft:11,marginTop:11}}  />
            </div>
          }
          size={'large'}
          className={styles.input}
          style={{marginTop:10}}
        />
        <div style={{marginTop:10}}>
          <Checkbox/>
          <text>下次自动登录？<Link style={{color:'#f04e1d'}} to='/forgotpwd'>忘记密码？</Link></text>
        </div>
        <div>
          <Button onClick={onClick}  style={{backgroundColor:'#f04e1d',width:120,height:40,marginTop:40}}>
            <text style={{color:'white',fontSize:14}}>登录</text>
          </Button>
          <Button style={{backgroundColor:'#ffffff',width:120,height:40,marginTop:40,marginLeft:60}}>
            <Link style={{color:'#999999',fontSize:14}} to="/register">免费注册</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps)(Login)
