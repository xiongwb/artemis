/**
 * Created by zhangle on 2017/5/22.
 */
import React from 'react'
import { connect } from 'dva'
import styles from './password.css'
import { Steps,Form,Icon,Input,Radio,Checkbox,Button,message,Spin } from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { browserHistory } from 'react-router'
import { hexMD5 } from '../../utils/md5';
import { Link } from 'react-router'

import regsiterImage from '../../assets/regsiter.png';

class PasswordFor extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value:1
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {setuppwd}=this.props;
    const onClick=()=>{
      this.props.form.validateFields((err,fieldsValue) => {
        if (err) {
          return
        }
        let pay=this.props.form.getFieldsValue();
        if(pay.pwd == pay.newPswd){
          pay.type=1;
          this.props.dispatch({
            type: 'setuppwd/UpdateTranPswd',
            payload:{
              newPswd:hexMD5(pay.newPswd),
              type:4,

            } ,
          });
        }else {
          message.error('交易密码不一样，亲！请看清哟');
        }
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
          label="交易密码"
          className={styles.input}
        >
          {getFieldDecorator('pwd', {

          })(
            <Input type='Password'/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认交易密码"
          className={styles.input}
        >
          {getFieldDecorator('newPswd', {
            rules: [{ required: true, }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='Password' placeholder="输入交易密码" />
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
            <text style={{color:'white',fontSize:13}}>完成</text>
          </Button>
        </div>
      </Form>
    );
  }
}

const PForm = Form.create()(PasswordFor);

function Setuppwd({setuppwd,dispatch}) {

    return (
      <div className={styles.root}>
        <div className={styles.progress}>
          <Steps current={2} style={{backgroundColor: '#eeeeee'}}>
            <Step title="注册" description="输入手机号注册"/>
            <Step title="个人信息" description="输入个人信息"/>
            <Step title="设置支付密码" description="确认支付密码"/>
            <Step title="完成" description="完成注册"/>
          </Steps>
        </div>
        <div className={styles.register}>
          <div className={styles.leftDiv}>
            <PForm setuppwd={setuppwd} dispatch={dispatch}/>
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
function mapStateToProps(state) {
  return {
    setuppwd:state.setuppwd
  };
}

export default connect(mapStateToProps)(Setuppwd)
