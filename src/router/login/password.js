import React from 'react'
import { connect } from 'dva'
import styles from './password.css'
import { Steps,Form,Icon,Input,Radio,Checkbox,Button,Spin } from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { hexMD5 } from '../../utils/md5';
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

import regsiterImage from '../../assets/regsiter.png';

class PasswordForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value:1
    }
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {register}=this.props;
   const onClick=()=>{
      this.props.form.validateFields((err,fieldsValue) => {
        if (err) {
          return
        }
        let pay = this.props.form.getFieldsValue();
        pay.pswd = hexMD5(pay.pwd);
        pay.tenantNo='1101001001';
        pay.checkCode=register.data.map.checkCode;
        pay.loginNo=register.phoneno.phoneNo;
        console.log(pay,77777777)
        this.props.dispatch({
          type: 'register/Reg',
          payload:pay,
        });

      })
    }
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="账号类型"
          className={styles.input}
        >
          {getFieldDecorator('cusType', {
            rules: [{ required: true,  }],
          })(
            <RadioGroup onChange={this.onChange} value={this.state.value}>
              <Radio value={1}>个人会员</Radio>
              <Radio value={2}>企业会员</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="昵称"
          className={styles.input}
        >
          {getFieldDecorator('nickName', {

          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          className={styles.input}
        >
          {getFieldDecorator('pwd', {
            rules: [{ required: true, }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='Password' placeholder="输入密码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
          className={styles.input}
        >
          {getFieldDecorator('cusName', {
            rules: [{ required: true,  }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="证件号码"
          className={styles.input}
        >
          {getFieldDecorator('certNo', {
            rules: [{ required: true,  }],
          })(
            <Input />
          )}
        </FormItem>
        <Checkbox
          className={styles.check}
          checked={true}
        />
        <text>
          同意<Link href="" style={{color:'#f04e1d'}}>注册协议</Link>和<Link href="" style={{color:'#f04e1d'}}>隐私条款</Link>
        </text>
        <div>
          <Button style={{backgroundColor:'#f04e1d',width:150,height:35,marginLeft:100,marginTop:30}}
                  onClick={()=>onClick()}>
            <text style={{color:'white',fontSize:13}}>注册</text>
          </Button>
        </div>
      </Form>
    );
  }
}

const PForm = Form.create()(PasswordForm);

function Password({register,dispatch}) {
  if (register.data.map.length == 0) {
    return (<div className={styles.spin}><Spin  style={{marginTop:'10%'}}/></div>)
  } else {
    console.log(register.phoneno,8888888888)
    return (
      <div className={styles.root}>
        <div className={styles.progress}>
          <Steps current={1} style={{backgroundColor: '#eeeeee'}}>
            <Step title="注册" description="输入手机号注册"/>
            <Step title="个人信息" description="输入个人信息"/>
            <Step title="设置支付密码" description="确认支付密码"/>
            <Step title="完成" description="完成注册"/>
          </Steps>
        </div>
        <div className={styles.register}>
          <div className={styles.leftDiv}>
            <PForm register={register} dispatch={dispatch}/>
          </div>
          <div className={styles.rightDiv}>
            <div style={{paddingLeft: 150}}>
              <text>已有账号？<a style={{color: '#f04e1d'}}>直接登录</a></text>
            </div>
            <img src={regsiterImage} style={{width: 458, height: 313}}/>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    register:state.register
  };
}

export default connect(mapStateToProps)(Password)
