import React from 'react'
import { connect } from 'dva'
import styles from './register.css'
import { Steps,Form,Icon,Input,Radio,Checkbox,Button ,Row,Col,Modal} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { browserHistory,Link } from 'react-router'

import regsiterImage from '../../assets/regsiter.png';

class RegisterForm extends React.Component {
  state = {
    value: 1,
    m:'',
    checked: false,
    disabled: true,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };


onClick(){
  this.props.form.validateFields((err,fieldsValue) => {
    if (err) {
      return
    }
    let pay = this.props.form.getFieldsValue();
    console.log(pay, 22222222);
    this.props.dispatch({
      type: 'register/ValidateVarCode',
      payload:{
        phoneNo:pay.phoneNo,
        varCode:pay.varCode,
      },
    });

  })
}
onchange(){

  let pay = this.props.form.getFieldsValue();

  console.log(pay, 3333333);
  this.props.dispatch({
    type: 'register/Get',
    payload: {
      tenantNo:1101001001,
      phoneNo:pay.phoneNo,
      flag:3,

    },
  });
  this.daojishi(60)
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
  const {register}=this.props;
    const onChange1 = () => {
      if (this.state.checked === false) {
        this.setState({
          checked: true,
          disabled: false,
        });
      } else if (this.state.checked === true) {
        this.setState({
          checked: false,
          disabled: true,
        });
      }
    };
  console.log(this.state.m,17777777777)
    let t
    let d
    if (this.state.m ==0){
      t='发送验证码';
      d=false;
    }else {
      d=true
      t= this.state.m + '秒后重发验证码';

    }
    // 注册协议，点击确定，调用这个方法，把visible传入到models里面
    const handleOk1=()=>{
      this.props.dispatch({ type: 'register/save',
        payload: {
          visible: false
        } });

    };
    // 注册协议，点击取消，调用这个方法，把visible传入到models里面
    const handleCancel1=()=>{
      this.props.dispatch({ type: 'register/save',
        payload: {
          visible: false
        } });
    };
    const onzhuc =()=>{
      console.log(11111)
      this.props.dispatch({ type: 'register/Finapply',
        payload: {
          tenantNo: 1101001001,
          proType: 3,
          returnType: 3,
        } });
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
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('varCode', {
                rules: [{ required: true, }],
              })(
                <Input placeholder="输入验证码"  />
              )}
            </Col>
            <Col span={12}>
              <Button  type="primary" disabled={d} onClick={this.onchange.bind(this)}>
                {t}
              </Button>
            </Col>
          </Row>
        </FormItem>
        <Checkbox
          className={styles.check}
          checked={this.state.checked} onChange={onChange1}
        />
          <text>
            同意<Link onClick={onzhuc} style={{color:'#f04e1d'}}>注册协议</Link>和<Link href="" style={{color:'#f04e1d'}}>隐私条款</Link>
          </text>
        <div>
          <Button style={{width:150,height:35,marginLeft:100,marginTop:30}} type="primary" disabled={this.state.disabled}
                  onClick={this.onClick.bind(this)}>
            <text style={{fontSize:13}}>下一步</text>
          </Button>
        </div>
        {/*融资协议的窗口*/}
        <Modal
          onOk={handleOk1}
          onCancel={handleCancel1}
          title={register.protocoltitle} visible={register.visible}
        >
          {register.cont}
        </Modal>
      </Form>
    );
  }
}

const RForm = Form.create()(RegisterForm);

function Register({register,dispatch}) {
  return (
    <div className={styles.root}>
      <div className={styles.progress}>
        <Steps current={0} style={{backgroundColor:'#eeeeee'}}>
          <Step title="注册" description="输入手机号注册"/>
          <Step title="个人信息" description="输入个人信息"/>
          <Step title="设置支付密码" description="确认支付密码"/>
          <Step title="完成" description="完成注册"/>
        </Steps>
      </div>
      <div className={styles.register}>
        <div className={styles.leftDiv}>
          <RForm register={register} dispatch={dispatch}/>
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
    register:state.register
  };
}

export default connect(mapStateToProps)(Register)
