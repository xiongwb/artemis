/**
 * Created by zhangle on 2017/5/7.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Cascader,
} from 'antd';
import styles from './loan.css';
import date from '../../utils/date';
import { browserHistory } from 'react-router';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import arr from '../../assets/arrow01.png';
import one from '../../assets/one.png';
import two from '../../assets/two.png';
import three from '../../assets/three.png';
import four from '../../assets/four.png';
import collect from '../../assets/collect.png';
import lo from '../../assets/2414_01.png';
import cityData from '../account/region';

const Option = Select.Option;
const FormItem = Form.Item;
class LoanForm extends React.Component {
  state = { visible: false }


  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  onmodel() {
    this.props.form.validateFields((err) => {
      if (err) {
        return;
      }
      const pay = this.props.form.getFieldsValue();
      pay.tenantno = '1101001001';
      pay.applydate = date.getDate();
      console.log(pay, 123);
      this.props.dispatch({
        type: 'loan/Finapply',
        payload: pay,
      });
      this.handleCancel();
    });
  }

  render() {
    const { loan } = this.props;
    // 点击我的投资意向按钮，调用该方法，打开弹出框
    const showModal = () => {
      if (getLocalStorage(Storage.DID_LOGIN) == null) {
        console.log(12222222);
        browserHistory.push('/login');
      } else {
        this.setState({
          visible: true,
        });
      }
    };
    const model = () => {
      if (getLocalStorage(Storage.DID_LOGIN) != null) {
        return(
          <Modal
            title={
              <div>
                <Row >
                  <Col span={1} >
                    <img src={collect} className={styles.modelimage} />
                  </Col>
                  <Col span={23}>
                    <text className={styles.modeltext1} >个人房产信息</text>
                  </Col>
                </Row>
              </div>
            } visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
            style={{ width: 300 }}
          >
            <Form >
              <FormItem
                {...formItemLayout}
                label="申请人姓名"
              >
                {getFieldDecorator('financier', {
                  initialValue: getLocalStorage(Storage.DID_LOGIN).cusname,
                })(
                  <Input disabled className={styles.model} />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="手机号码"
              >
                {getFieldDecorator('telno', {
                  initialValue: getLocalStorage(Storage.DID_LOGIN).retMsg,
                })(
                  <Input disabled className={styles.model} />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="选择区域"
              >
                {getFieldDecorator('areacode', {
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                })(

                  <Cascader size="large" style={{ width: 200, borderColor: '#cccccc' }} options={cityData} />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="详细地址"
              >
                {getFieldDecorator('address', {
                  initialValue: '',
                })(
                  <Input className={styles.model} placeholder="" />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="主营业务"
              >
                {getFieldDecorator('business', {
                  initialValue: '',
                })(
                  <Input placeholder="" className={styles.model} />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="融资用途"
              >
                {getFieldDecorator('finpurpose', {
                  rules: [{ required: true }],
                })(
                  <Input type="textarea" rows={3} placeholder="100字以内" className={styles.model} />,
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="期望融资金额"
              >
                {getFieldDecorator('expfinsum', {
                  initialValue: '',
                })(
                  <Input placeholder="" className={styles.model} />,
                )}
                <text className={styles.modeltext}> 万元</text>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="期望融资利率"
              >
                {getFieldDecorator('input-number', {
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                  <Input className={styles.model} placeholder="请输入期望年化收益率" />,
                )}
                <text className={styles.modeltext}> %以上</text>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="投资期限"
              >
                {getFieldDecorator('finterm', {
                  rules: [{ required: true }],
                })(
                  <Select placeholder="请选择" style={{ width: 200 }}>
                    <Option value="1">3个月</Option>
                    <Option value="2">6个月</Option>
                    <Option value="3">9个月</Option>
                    <Option value="4">1年以上</Option>
                  </Select>,
                )}

              </FormItem>
              <FormItem
                {...formItemLayout}
                label="贷款产品"
              >
                {getFieldDecorator('loanprod', {
                  rules: [{ required: true }],
                })(
                  <Select placeholder="请选择" style={{ width: 200 }}>
                    <Option value="1">个人住房贷款</Option>
                    <Option value="2">汽车抵押</Option>
                    <Option value="3">信用贷款</Option>
                  </Select>,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="其他融资说明"
              >
                {getFieldDecorator('notes', {
                  initialValue: '',
                })(
                  <Input type="textarea" rows={4} placeholder="300字以内" className={styles.model} />,
                )}
              </FormItem>
            </Form>
            <div className={styles.buton}>
              <Button type="primary" className={styles.modelbutton1} onClick={this.onmodel.bind(this)}>确认</Button>
            </div>
          </Modal>
        )
      }
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <div className={styles.root}>
        <div className={styles.login}>
          <text className={styles.text}>
          如何发起融资?
        </text>
        </div>
        <div className={styles.login1}>
          <Row>
            <Col span={3}>
              <Col>
                <img src={one} className={styles.image} />
              </Col>
              <Col className={styles.text1}>
                <text >注册如何成为 </text>
              </Col>
              <Col className={styles.text2}>
                <text >e融九洲投资平台用户 </text>
              </Col>
            </Col>
            <Col span={4} className={styles.image1}>
              <img src={arr} className={styles.image2} />

            </Col>
            <Col span={3}>
              <Col>
                <img src={two} className={styles.image} />
              </Col>
              <Col className={styles.text1}>
                <text >选择融资方式</text>
              </Col>
            </Col>
            <Col span={4} className={styles.image1}>
              <img src={arr} className={styles.image2} />

            </Col>
            <Col span={3}>
              <Col>
                <img src={three} className={styles.image} />
              </Col>
              <Col className={styles.text1}>
                <text >签署融资人协议</text>
              </Col>

            </Col>
            <Col span={4} className={styles.image1}>
              <img src={arr} className={styles.image2} />
            </Col>
            <Col span={3}>
              <Col>
                <img src={four} className={styles.image} />
              </Col>
              <Col className={styles.text1}>
                <text >委托银行代为发布 </text>
              </Col>
            </Col>
          </Row>
        </div>
        <div className={styles.login2} >
          <img src={lo} style={{ height: 100, width: 100 }} />
        </div>
        <div className={styles.login2} >
          <text className={styles.xtext} >{loan.data.model.title}</text>
        </div>
        <div className={styles.login2} >
          <text className={styles.xtext1}>{loan.data.model.content}</text>
        </div>
        <div className={styles.login2} >
          <Button className={styles.button} type="danger" ghost onClick={showModal}>立即申请</Button>
        </div>
        <div className={styles.zxb} />
        {model()}
      </div>
    );
  }
}

const LForm = Form.create()(LoanForm);
function Loan({ loan, dispatch }) {
  if (loan.data.length === 0) {
    return <span />;
  } else {
    console.log(loan.data.model, 123);
    return (
      <div className={styles.root}>
        <LForm dispatch={dispatch} loan={loan} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loan: state.loan,
  };
}

export default connect(mapStateToProps)(Loan);
