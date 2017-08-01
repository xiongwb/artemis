/**
 * Created by cyt on 2017/5/9.
 */
/**
 * Created by cyt on 2017/5/9.
 */


import React from 'react';
import { connect } from 'dva';
import loginpw from '../../assets/loginpw.png';
import mp from '../../assets/mp.png';
import paymentpw from '../../assets/paymentpw.png';
import realname from '../../assets/realname.png';
import { getLocalStorage, } from '../../utils/helper';
import { hexMD5 } from '../../utils/md5';
import Storage from '../../utils/storage';
import tenant from '../../constant/common_config';
import {
  Button,
  Row,
  Col,
  Input,
  Modal,
  Form,
  message,
  Switch,
  Spin
} from 'antd';
const FormItem = Form.Item;
import styles from './security.css';

class Money extends React.Component {
  constructor(props) {
    super(props);
  }
  submit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.props.security.data.autoinvflag=1;
      this.props.security.data.autoinvsummin=hexMD5(this.props.form.getFieldsValue().autoinvsummin);
      this.props.security.data.autoinvsummax=hexMD5(this.props.form.getFieldsValue().autoinvsummax);
      this.props.dispatch({
        type: 'security/updInfo',
        payload: this.props.security.data,
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;


    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="自动投标最小金额"
          >
            {getFieldDecorator('autoinvsummin', {
              rules: [{
                required: true, message: '请输入金额',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="自动投标最大金额"
          >
            {getFieldDecorator('autoinvsummax', {
              rules: [{
                required: true, message: '请输入金额',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
        </Form>
        <Button className={styles.button} onClick={this.submit.bind(this)}>确定</Button>
      </div>
    );
  }
}
class UpdatePswdForm extends React.Component {
  constructor(props) {
    super(props);
  }
  submit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(this.props.form.getFieldsValue());

      this.props.dispatch({
        type: 'security/updatePswd',
        payload: this.props.form.getFieldsValue(),
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;


    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="原密码"
          >
            {getFieldDecorator('oldPswd', {
              rules: [{
                required: true, message: '请输入原密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('newPswd', {
              rules: [{
                required: true, message: '请输入新密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
        </Form>
        <Button className={styles.button} onClick={this.submit.bind(this)}>确定</Button>
      </div>
    );
  }
}


class UpdateTranPswdForm extends React.Component {
  constructor(props) {
    super(props);
  }
  submit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(this.props.form.getFieldsValue());
      const pay = this.props.form.getFieldsValue();
      if(pay.newPswd===pay.Pswd) {
        pay.type = 2;
        this.props.dispatch({
          type: 'security/updateTranPswd',
          payload:{phoneNo:getLocalStorage(Storage.DID_LOGIN).retMsg,oldPswd:hexMD5(pay.oldPswd),newPswd:hexMD5(pay.newPswd),type:2},
        });
      }else{
        message.error('交易密码不一样，亲！请看清哟');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="原交易密码"
          >
            {getFieldDecorator('oldPswd', {
              rules: [{
                required: true, message: '请输入原交易密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('newPswd', {
              rules: [{
                required: true, message: '请输入新密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('Pswd', {
              rules: [{
                required: true, message: '请输入新密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
        </Form>
        <Button className={styles.button} onClick={this.submit.bind(this)}>确定</Button>
      </div>
    );
  }
}
class ResetTranPswdForm extends React.Component {
  constructor(props) {
    super(props);
  }
  submit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(this.props.form.getFieldsValue());
      const pay = this.props.form.getFieldsValue();
      if(pay.newPswd===pay.Pswd) {
        pay.type = 2;
        this.props.dispatch({
          type: 'security/validateVarCode',
          payload: pay,
        });
      }else{
        message.error('交易密码不一样，亲！请看清哟');
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { security }=this.props;
    const onchange = () => {
      this.props.dispatch({
        type: 'security/get',
        payload: {
          tenantNo: tenant.tenantno,
          phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
          flag: 5,
        },
      });
      daojishi(60);
    };
// 倒计时验证码，默认为60秒
    const daojishi = (m) => {
      if (m > 0) {
        setTimeout(() => {
          m -= 1;
          this.props.dispatch({
            type: 'security/save',
            payload: { m: m },
          });
          daojishi(m);
        }, 1000);
      }
    };
    let t;
    let d;

    if (security.m === 0) {
      t = '发送验证码';
      d = false;
    } else {
      d = true;
      t = security.m + '秒后重发验证码';
    }

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('newPswd', {
              rules: [{
                required: true, message: '请输入新密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('Pswd', {
              rules: [{
                required: true, message: '请确认密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="验证码"
          >
            {getFieldDecorator('varCode', {
              rules: [{
                required: true, message: '请输入验证码',
              }],
            })(
              <Input style={{ width: 250 }}  />,
            )}
            <Button disabled={d} onClick={onchange} className={styles.verification}>{t}</Button>
          </FormItem>
        </Form>
        <Button className={styles.button} onClick={this.submit.bind(this)}>确定</Button>
      </div>
    );
  }
}
class SetupTranPswdForm extends React.Component {
  constructor(props) {
    super(props);
  }
  submit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(this.props.form.getFieldsValue());
      const pay = this.props.form.getFieldsValue();
      if(pay.newPswd===pay.Pswd) {
        pay.type = 2;
        this.props.dispatch({
          type: 'security/validateVarCode',
          payload: pay,
        });
      }else{
        message.error('交易密码不一样，亲！请看清哟');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { security }=this.props;
    const onchange = () => {
      this.props.dispatch({
        type: 'security/get',
        payload: {
          tenantNo: tenant.tenantno,
          phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
          flag: 5,
        },
      });
      daojishi(60);
    };
    // 倒计时验证码，默认为60秒
    const daojishi = (m) => {
      if (m > 0) {
        setTimeout(() => {
          m -= 1;
          this.props.dispatch({
            type: 'security/save',
            payload: { m: m },
          });
          daojishi(m);
        }, 1000);
      }
    };
    let t;
    let d;

    if (security.m === 0) {
      t = '发送验证码';
      d = false;
    } else {
      d = true;
      t = security.m + '秒后重发验证码';
    }

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="交易密码"
          >
            {getFieldDecorator('newPswd', {
              rules: [{
                required: true, message: '请输入交易密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认交易密码"
          >
            {getFieldDecorator('Pswd', {
              rules: [{
                required: true, message: '请输入交易密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="验证码"
          >
            {getFieldDecorator('varCode', {
              rules: [{
                required: true, message: '请输入验证码',
              }],
            })(
              <Input style={{ width: 250 }}  />,
            )}
            <Button disabled={d} onClick={onchange} className={styles.verification}>{t}</Button>
          </FormItem>
        </Form>
        <Button className={styles.button} onClick={this.submit.bind(this)}>确定</Button>
      </div>
    );
  }
}
class signFreeAgreementForm extends React.Component {
  constructor(props) {
    super(props);
  }
  submit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const pay = this.props.form.getFieldsValue();
      if(this.props.security.checked1){
        pay.busiType = 'B05';
      }else{
        pay.busiType = 'B04';
      }
      console.log( 123);
        pay.money = 0;
        pay.telno=getLocalStorage(Storage.DID_LOGIN).retMsg
        this.props.dispatch({
          type: 'security/validateTranPswd',
          payload:pay,
        });

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="交易密码"
          >
            {getFieldDecorator('transPswd', {
              rules: [{
                required: true, message: '请输入密码',
              }],
            })(
              <Input type="password" style={{ width: 250 }} />,
            )}
          </FormItem>
        </Form>
        <Button className={styles.button} onClick={this.submit.bind(this)}>确定</Button>
      </div>
    );
  }
}
const SignFreeAgreement=Form.create()(signFreeAgreementForm)
const MoneyForm = Form.create()(Money);
const UpdatePwdForm = Form.create()(UpdatePswdForm);
const UpdateTranPwdForm = Form.create()(UpdateTranPswdForm);
const ResetTranPwdForm = Form.create()(ResetTranPswdForm);
const SetupTranPwdForm = Form.create()(SetupTranPswdForm);
function Security({ security, dispatch }) {
  if (security.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '15%' }} /></div>);
  }
  console.log(security);
  const img = [realname, loginpw, mp, paymentpw, paymentpw, paymentpw, paymentpw];
  const title = ['实名认证', '登陆密码', '绑定手机', '交易密码', '重置交易密码', '设置交易密码','开启免密支付',];
  const set = ['认证中', '', '已绑定','','','','免密说明','免密说明'];
  const operation = ['', '修改', '', '修改', '重置', '设置','免密',];

// 根据判断调用修改登录密码已经交易密码的弹出窗
  const onClick = (i) => {
    if (i === 1) {
      dispatch({ type: 'security/save', payload: { modal1: true } });
    }
    if (i === 3) {
      dispatch({ type: 'security/save', payload: { modal2: true } });
    }
    if (i === 4) {
      dispatch({ type: 'security/save', payload: { modal4: true } });
    }
    if (i === 5) {
      if(security.data.settranpswdflag==0) {
        dispatch({type: 'security/save', payload: {modal5: true}});
      }else{
        message.error('您已经设置支付密码,请选择修改或重置支付密码');
      }
    }
  };
  // 关闭修改登陆密码modal
  const handleCancel1 = () => {
    dispatch({ type: 'security/save', payload: { modal1: false } });
  };
  // 关闭修改修改交易密码modal
  const handleCancel2 = () => {
    dispatch({ type: 'security/save', payload: { modal2: false } });
  };
  // 关闭修改重置交易密码modal
  const handleCancel4 = () => {
    dispatch({ type: 'security/save', payload: { modal4: false } });
  };
  // 关闭修改设置交易密码modal
  const handleCancel5 = () => {
    dispatch({ type: 'security/save', payload: { modal5: false } });
  };
  // 关闭免密modal
  const handleCancel8 = () => {
    dispatch({ type: 'security/save', payload: { modal8: false } });
  };
  // 关闭自动投资modal
  const handleCancel9 = () => {
    dispatch({ type: 'security/save', payload: { modal9: false } });
  };

  // 打开免密说明
  const on_Click1 = () => {
    dispatch({ type: 'security/save', payload: { modal6: true } });
  };
  // 打开自动投资说明
  const on_Click2 = () => {
    dispatch({ type: 'security/save', payload: { modal7: true } });
  };
  // 确认，关闭免密modal
  const handleOk6 = (e) => {
    dispatch({ type: 'security/save', payload: { modal6: false } });
  };
  // 取消，免密modal
  const handleCancel6 = (e) => {
    dispatch({ type: 'security/save', payload: { modal6: false } });
  };
  // 确认，自动投资modal
  const handleOk7 = (e) => {
    dispatch({ type: 'security/save', payload: { modal7: false } });
  };
  // 取消，关闭自动投资modal
  const handleCancel7 = (e) => {
    dispatch({ type: 'security/save', payload: { modal7: false } });
  };
  const onChange1 = (e) => {
    dispatch({ type: 'security/save', payload: { modal8: true } });
  };
  const onChange2= (e) => {
    console.log(e, 333333);
    if(e) {
      dispatch({
        type: 'security/save',
        payload: {modal9: e}

      });
    }else{
     security.data.autoinvflag=0;
     security.data.autoinvsummin=0;
     security.data.autoinvsummax=0;
      dispatch({
        type: 'security/updInfo',
        payload:security.data,
      });
    }
  }
  const content = (s, i) => {
    return (
      <Row >
        <div>
          <Row type="flex">
            <Col span={2}>
              <img src={img[i]} className={styles.img} />
            </Col>
            <Col >
              <div className={styles.img} style={{ width: 80, fontSize: 13, marginTop: 23 }} >{title[i]}</div>
            </Col>
            <Col span={14}>
              {
                operation[i] == '免密'?
                  <a className={styles.a} ><div className={styles.img} onClick={on_Click1} style={{ width: '25%', marginTop: 25 }}>《<text style={{ color:'blue' }}>{set[i]}</text>》</div></a>:
                  <div className={styles.img} style={{ width: '100%', marginTop: 25, }}>{set[i]}</div>
              }
            </Col>
            <Col style={{ marginLeft: '16%' }}>
              {operation[i] == '' ? <div /> :operation[i] == '免密' ?
                <Switch checked={security.checked1} onChange={onChange1} className={styles.switch}  checkedChildren={'开'} unCheckedChildren={'关'} />:
                <Button className={styles.operation} onClick={() => onClick(i)}>{operation[i]}</Button>
              }
            </Col>
          </Row>
        </div>
        <div className={styles.line} />
      </Row>
    );
  };
  return (

    <div className={styles.root}>
      <Spin spinning={security.loading}>
      {title.map((s, i) => content(s, i))}
        <Row >
          <div>
            <Row type="flex">
              <Col span={2}>
                <img src={paymentpw} className={styles.img} />
              </Col>
              <Col >
                <div className={styles.img} style={{ width: 80, fontSize: 13, marginTop: 23 }} >开启自动投资</div>
              </Col>
              <Col span={14}>
                  <a className={styles.a} ><div className={styles.img} onClick={on_Click2} style={{ width: '25%', marginTop: 25 }}>《<text style={{ color:'blue' }}>开启自动投资说明</text>》</div></a>:
              </Col>
              <Col style={{ marginLeft: '16%' }}>
                  <Switch disabled={security.disabled} checked={security.checked2} onChange={onChange2} className={styles.switch}  checkedChildren={'开'} unCheckedChildren={'关'} />
              </Col>
            </Row>
          </div>
          <div className={styles.line} />
        </Row>
      </Spin>
      <Modal
        title="修改登录密码"
        footer={null}
        visible={security.modal1}
        onCancel={handleCancel1}
      >
        <UpdatePwdForm security={security} dispatch={dispatch} />
      </Modal>
      <Modal
        title="修改交易密码"
        footer={null}
        visible={security.modal2}
        onCancel={handleCancel2}

      >
        <UpdateTranPwdForm security={security} dispatch={dispatch} />
      </Modal>

      <Modal
        title="重置交易密码"
        footer={null}
        visible={security.modal4}
        onCancel={handleCancel4}

      >
        <ResetTranPwdForm security={security} dispatch={dispatch} />
      </Modal>
      <Modal
        title="设置交易密码"
        footer={null}
        visible={security.modal5}
        onCancel={handleCancel5}

      >
        <SetupTranPwdForm security={security} dispatch={dispatch} />
      </Modal>
      <Modal
        title="免密说明"
        visible={security.modal6}
        onOk={handleOk6}
        onCancel={handleCancel6}
      >
        开启免密支付后，除了充值，提现和设置开启关闭免密支付功能（本功能）外，其他交易不需要资金交易密码。
      </Modal>
      <Modal
        title="自动投资说明"
        visible={security.modal7}
        onOk={handleOk7}
        onCancel={handleCancel7}
      >
        开启自动投资后，系统将根据您设置的最小投资金额和最大投资金额按照一定规则进行投资适合您的项目。
      </Modal>
      <Modal
        title="验证密码"
        visible={security.modal8}
        onCancel={handleCancel8}
        footer={null}
      >
        <SignFreeAgreement security={security} dispatch={dispatch} />
      </Modal>
      <Modal
        title="输入自动投标"
        visible={security.modal9}
        onCancel={handleCancel9}
        footer={null}
      >
        <MoneyForm security={security} dispatch={dispatch} />
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    security: state.security,
  };
}


export default connect(mapStateToProps)(Security);
