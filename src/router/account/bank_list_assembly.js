/**
 * Created by cyt on 2017/5/10.
 */


import React from 'react';
import { connect } from 'dva';
import plus from '../../assets/plus.png';
import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  Cascader,
  Input,
  Select,
  message,
  Spin,
  Radio
} from 'antd';
import Bank from './bank';
import styles from './bank_list_assembly.css';
import cityDataForBindCard from './region';
const FormItem = Form.Item;
const Option = Select.Option;
class BankForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      checked:false
    };
  };
  // 银行协议
  visible() {
      this.setState({
        visible:!this.state.visible,
        checked:true
    })
  };
// 输入卡号后食物焦点时获取开户行名称
  onBlur() {
    console.log(this.props.form.getFieldValue('cityCode'), 99999);
    this.props.dispatch({
      type: 'bankList/getBankCode',
      payload: { acctno: this.props.form.getFieldValue('acctno') },
    });
  }

  option1(s, i) {
    return (
      <Option value={`${s.bankcode}`}>{s.bankname}</Option>
    );
  }
  option2(s, i) {
    return (
      <Option value={`${s.interbankno}`}>{s.branchname}</Option>
    );
  }
  // 选择区域调用联行号接口
  onChange(e, i) {
    this.props.dispatch({
      type: 'bankList/getInterBankNo',
      payload: { cityCode: e[2], bankcode: this.props.bankList.bankcode },
    });
  }
  // 选择开户行时把开户行和开户行代码保存到dva状态上
  openBank(key, value) {
    console.log(value, key);
    this.props.dispatch({
      type: 'bankList/save',
      payload: { bankcode: key, openbank: value.props.children },
    });
  }
  // 选择开户网点时把开户网点和开户网点代码保存到dva状态上
  openBranch(key, value) {
    this.props.dispatch({
      type: 'bankList/save',
      payload: { interbankno: key, openbranch: value.props.children },
    });
  }
    // 点击确认验证交易密码,acctno和telno传到dva上密码验证成功后当作数据之一传到后台
  submit() {
    if(this.state.checked){
      this.props.form.validateFields((err) => {
        if (err) {
          return;
        }
        this.props.dispatch({
          type: 'bankList/bind',
          payload: { acctno: this.props.form.getFieldValue('acctno'), telno: this.props.form.getFieldValue('telno') },
        });
      });
    }else{
      message.error('请同意银行卡协议')
    }
  }
  onFocus() {
    this.props.form.resetFields(['openbank']);
  }
  handleOk() {
    this.setState({ visible: false });
  }
  handleCancel(){
    this.setState({ visible: false });
  }
  checked(){
    this.setState({ checked: !this.state.checked });
}
  render() {
    const { getFieldDecorator } = this.props.form;
    const { bankList } =this.props;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>

          <FormItem
            {...formItemLayout}
            label="客户名称"
          >
            {getFieldDecorator('dictKey', {

            })(
              <text >{bankList.info.cusname}</text>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="证件号码"
          >
            {getFieldDecorator('dictValue12', {

            })(
              <text >{bankList.info.certno}</text>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号"
          >
            {getFieldDecorator('telno', {
              initialValue: bankList.info.loginno,
              rules: [{
                required: true, message: '请输入手机号',
              }],
            })(
              <Input style={{ width: 250 }} />,
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="卡号"
          >
            {getFieldDecorator('acctno', {
              rules: [{
                required: true, message: '请输入卡号',
              }],
            })(
              <Input style={{ width: 250 }} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开户行"
          >
            {getFieldDecorator('openbank', {
              initialValue: bankList.bankcode,
              rules: [{
                required: true, message: '请输入开户行',
              }],
            })(
              <Select style={{ width: 250 }} showSearch onSelect={this.openBank.bind(this)}>
                {this.props.bankList.bank.list.map((s, i) => this.option1(s, i))}
              </Select>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="区域"
          >
            {getFieldDecorator('cityCode', {
              rules: [{
                required: true, message: '请输入区域',
              }],
            })(
              <Cascader onChange={this.onChange.bind(this)} size="large" style={{ width: 250 }} options={cityDataForBindCard} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开户网点"
          >
            {getFieldDecorator('openbranch', {
              rules: [{
                required: true, message: '请输入开户网点',
              }],
            })(
              <Select style={{ width: 250 }} showSearch onSelect={this.openBranch.bind(this)}>
                {bankList.place.map((s, i) => this.option2(s, i))}
              </Select>,
            )}
          </FormItem>
        </Form>
        <div className={styles.radio}><Radio checked={this.state.checked} onChange={this.checked.bind(this)}>同意《<text className={styles.protocol} onClick={this.visible.bind(this)}>{bankList.protocol.protocoltitle}</text>》</Radio></div>
        <Button className={styles.button2} onClick={() => this.submit()} >确定</Button>
        <Modal
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          title={bankList.protocol.protocoltitle} visible={this.state.visible}
        >
          {bankList.protocol.protocolcontent}
        </Modal>
      </div>
    );
  }
}

const BankListForm = Form.create()(BankForm);

class newBankForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      checked:false
    };
  };
  // 银行协议
  visible() {
    this.setState({
      visible:!this.state.visible,
      checked:true
    })
  };
// 输入卡号后食物焦点时获取开户行名称
  onBlur() {
    console.log(this.props.form.getFieldValue('cityCode'), 99999);
    this.props.dispatch({
      type: 'bankList/getBankCode',
      payload: { acctno: this.props.form.getFieldValue('acctno') },
    });
  }

  option1(s, i) {
    return (
      <Option value={`${s.bankcode}`}>{s.bankname}</Option>
    );
  }
  option2(s, i) {
    return (
      <Option value={`${s.interbankno}`}>{s.branchname}</Option>
    );
  }
  // 选择区域调用联行号接口
  onChange(e, i) {
    this.props.dispatch({
      type: 'bankList/getInterBankNo',
      payload: { cityCode: e[2], bankcode: this.props.bankList.bankcode },
    });
  }
  // 选择开户行时把开户行和开户行代码保存到dva状态上
  openBank(key, value) {
    console.log(value, key);
    this.props.dispatch({
      type: 'bankList/save',
      payload: { bankcode: key, openbank: value.props.children },
    });
  }
  // 选择开户网点时把开户网点和开户网点代码保存到dva状态上
  openBranch(key, value) {
    this.props.dispatch({
      type: 'bankList/save',
      payload: { interbankno: key, openbranch: value.props.children },
    });
  }
  // 点击确认验证交易密码,acctno和telno传到dva上密码验证成功后当作数据之一传到后台
  submit() {
    if(this.state.checked){
      this.props.form.validateFields((err) => {
        if (err) {
          return;
        }
        this.props.dispatch({
          type: 'bankList/changeCard',
          payload: { acctno: this.props.form.getFieldValue('acctno'), telno: this.props.form.getFieldValue('telno') },
        });
      });
    }else {
      message.error('请同意银行卡协议')
    }
  }
  onFocus() {
    this.props.form.resetFields(['openbank']);
  }
  handleOk() {
    this.setState({ visible: false });
  }
  handleCancel(){
    this.setState({ visible: false });
  }
  checked(){
    this.setState({ checked: !this.state.checked, });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { bankList } =this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>

          <FormItem
            {...formItemLayout}
            label="客户名称"
          >
            {getFieldDecorator('dictKey', {

            })(
              <text >{bankList.info.cusname}</text>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="证件号码"
          >
            {getFieldDecorator('dictValue12', {

            })(
              <text >{bankList.info.certno}</text>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号"
          >
            {getFieldDecorator('telno', {
              initialValue: bankList.info.loginno,
              rules: [{
                required: true, message: '请输入卡号',
              }],
            })(
              <Input style={{ width: 250 }} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新卡号"
          >
            {getFieldDecorator('acctno', {
              rules: [{
                required: true, message: '请输入卡号',
              }],
            })(
              <Input style={{ width: 250 }} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新开户行"
          >
            {getFieldDecorator('openbank', {
              initialValue: bankList.bankcode,
              rules: [{
                required: true, message: '请输入开户行',
              }],
            })(
              <Select style={{ width: 250 }} showSearch onSelect={this.openBank.bind(this)}>
                {this.props.bankList.bank.list.map((s, i) => this.option1(s, i))}
              </Select>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="区域"
          >
            {getFieldDecorator('cityCode', {
              rules: [{
                required: true, message: '请输入区域',
              }],
            })(
              <Cascader onChange={this.onChange.bind(this)} size="large" style={{ width: 250 }}options={cityDataForBindCard} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新开户网点"
          >
            {getFieldDecorator('openbranch', {
              rules: [{
                required: true, message: '请输入开户网点',
              }],
            })(
              <Select style={{ width: 250 }} showSearch onSelect={this.openBranch.bind(this)}>
                {bankList.place.map((s, i) => this.option2(s, i))}
              </Select>,
            )}
          </FormItem>
        </Form>
        <div className={styles.radio}><Radio checked={this.state.checked} onChange={this.checked.bind(this)}>同意《<text className={styles.protocol} onClick={this.visible.bind(this)}>{bankList.protocol.protocoltitle}</text>》</Radio></div>
        <Button className={styles.button2} onClick={() => this.submit()} >确定</Button>
        <Modal
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          title={bankList.protocol.protocoltitle} visible={this.state.visible}
        >
          {bankList.protocol.protocolcontent}
        </Modal>
      </div>
    );
  }
}

const NewBank = Form.create()(newBankForm);


function BankListAssembly({ bankList, dispatch }) {
  if (bankList.data.length === 0||bankList.protocol === '' ) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '9%' }} /></div>);
  }

  const key = bankList.data.bindList;
  // 改绑操作时充值openbranch,interbankno,openbank,bankcode,防止与绑卡冲突
  const change = () => {
    if (bankList.value) {
      dispatch({ type: 'bankList/save',
        payload: {
          Modal2: true,
          openbranch: '',
          interbankno: '',
          openbank: '',
          bankcode: '',
          place: [],
        } });
    } else {
      message.error('请选择银行卡');
    }
  };
  // 绑卡操作时充值openbranch,interbankno,openbank,bankcode,防止与改绑定冲突
  const binding = () => {
    dispatch({ type: 'bankList/save',
      payload: {
        Modal1: true,
        openbranch: '',
        interbankno: '',
        openbank: '',
        bankcode: '',
        place: [],
      } });
  };
  const onClick = (e, acctno) => {
    if (e) {
      dispatch({
        type: 'bankList/choice',
        payload: { value: acctno },
      });
    } else {
      dispatch({
        type: 'bankList/choice',
        payload: { value: '' },
      });
    }
  };
  const setting = () => {
    if (bankList.value) {
      dispatch({ type: 'bankList/setMain', payload: { acctno: bankList.value } });
    } else {
      message.error('请选择银行卡');
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'bankList/save', payload: { Modal1: false, Modal2: false } });
  };
  const bank = (s, i) => {
    if (s.mainflag == 1) {
      return (
        <Col span={6}>
          <Bank
            background={styles.userinfo2} dispatch={dispatch} keys={s.acctno} openbank={s.openbank}
            value={bankList.value} onClick={e => onClick(e, s.acctno)}
          />
        </Col>
      );
    } else {
      return (
        <Col span={6}>
          <Bank
            background={styles.userinfo3} dispatch={dispatch} keys={s.acctno} openbank={s.openbank}
            value={bankList.value} onClick={e => onClick(e, s.acctno)}
          />
        </Col>
      );
    }
  };
  return (
    <div style={{ minHeight: 200 }} >
      <Spin spinning={bankList.loading}>
        <Row type="flex" >
          <Col span={19}>
            <div className={styles.text} >
              <text >我的银行卡：</text>
            </div>
          </Col>

          <Col >
            <Button type="primary" onClick={change} className={styles.button1}>改绑</Button>
            <Button type="primary" onClick={setting} className={styles.button1}>设置主卡</Button>
          </Col>
        </Row>
        <Row type="flex" gutter={2}>
          {key.map((s, i) => bank(s, i))}
          <Col span={6}>
            <div className={styles.userinfo1} onClick={binding}>
              <Row >
                <Col >
                  <center> <img src={plus} className={styles.img} /></center>
                </Col>
                <Col >
                  <div style={{ marginLeft: 10, marginRight: 10 }}><center>您的提现银行卡尚未添加请先设置银行卡号</center></div>
                  <div className={styles.line} />
                </Col>
                <Col >
                  <center style={{ marginTop: 5 }} >添加银行卡</center>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Modal
          title="添加银行卡" visible={bankList.Modal1}
          onCancel={handleCancel}
          footer={null}
        >
          <BankListForm dispatch={dispatch} bankList={bankList} />
        </Modal>
        <Modal
          title="改绑银行卡" visible={bankList.Modal2}
          onCancel={handleCancel}
          footer={null}
        >
          <NewBank dispatch={dispatch} bankList={bankList} />
        </Modal>
      </Spin>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    bankList: state.bankList,
  };
}

export default connect(mapStateToProps)(BankListAssembly);
