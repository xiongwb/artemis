/**
 * Created by zhangle on 2017/6/12.
 */
import React from 'react'
import { connect } from 'dva'
import styles from './forgotpwd.css'
import { Steps,Form,Icon,Input,Button ,Row,Col,message} from 'antd';
const FormItem = Form.Item;
import { browserHistory,Link } from 'react-router'

import regsiterImage from '../../assets/pic.png';

class ForgotpwdForm extends React.Component {
  state = {
    value: 1,
    m:'',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };



  // 点击发送验证码，触发这个方法，
  onchange() {
    const pay = this.props.form.getFieldsValue();
    console.log(pay.phoneNo, 11111111);
    if (pay.phoneNo != null) {
      this.props.dispatch({
        type: 'forgotpwd/Get',
        payload: {
          tenantNo: 1101001001,
          phoneNo: pay.phoneNo,
          flag: 4,
        },
      });
      this.daojishi(60);
    } else {
      message.error('请输入手机号');
    }
  }
//倒计时验证码，默认为60秒

  daojishi(m) {
    if (m > 0) {
      setTimeout(() => {
        m = m - 1
        this.setState({
          m: m ,
        })
        this.daojishi(m);
      }, 1000)
    }
  }
  render() {
    const {forgotpwd}=this.props;
    const onClick = () => {
      this.props.form.validateFields((err) => {
        if (err) {
          message.error('请输入您的信息');
        }
        const pay = this.props.form.getFieldsValue();
        console.log(pay, 22222222);
        if (pay.newpswd === pay.pwd) {
          this.props.dispatch({
            type: 'forgotpwd/ValidateVarCode',
            payload: pay,
          });
        } else {
          message.error(' 亲！两次密码不一致，请重新输入');
        }
      });
    };
    let t
    let d
    if (this.state.m ==0){
      t='发送验证码';
      d=false;
    }else {
      d=true
      t= this.state.m + '秒后重发验证码';

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
          label="手机号码"
          className={styles.input}

        >
          {getFieldDecorator('phoneNo', {
            rules: [{ required: true,  }],
          })(
            <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />}  placeholder="输入手机号码" />
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="验证码"
          className={styles.input}

        >
          <Row gutter={10}>
            <Col span={14}>
              {getFieldDecorator('varCode', {
                rules: [{ required: true, }],
              })(
                <Input placeholder="输入验证码"  />
              )}
            </Col>
            <Col span={10}>
              <Button  type="primary" disabled={d} onClick={this.onchange.bind(this)}>
                {t}
              </Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
          className={styles.input}

        >
          {getFieldDecorator('pwd', {
            rules: [{ required: true,  }],
          })(
            <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type='Password'  placeholder="请输入新密码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          className={styles.input}

        >
          {getFieldDecorator('newpswd', {
            rules: [{ required: true,  }],
          })(
            <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type='Password'  placeholder="请确认新密码" />
          )}
        </FormItem>

        <div>
          <Button style={{backgroundColor:'#f04e1d',width:150,height:35,marginLeft:100,marginTop:30}}
                  onClick={onClick}>
            <text style={{color:'white',fontSize:13}}> 确认</text>
          </Button>
        </div>
      </Form>
    );
  }
}

const RForm = Form.create()(ForgotpwdForm);

function Forgotpwd({forgotpwd,dispatch}) {
  return (
    <div className={styles.root}>
      <div className={styles.root1} />
      <div className={styles.div}>
        <text className={styles.text}>忘记密码</text>
      </div>
      <div className={styles.register}>

        <Row>
          <Col span={12}>
            <div className={styles.leftDiv}>
              <RForm forgotpwd={forgotpwd} dispatch={dispatch}/>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.rightDiv}>
              <img src={regsiterImage} style={{width:241,height:174}}/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    forgotpwd:state.forgotpwd
  };
}

export default connect(mapStateToProps)(Forgotpwd)
