/**
 * Created by cyt on 2017/5/9.
 */
/**
 * Created by cyt on 2017/5/8.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Button,
  Row,
  Col,
  Input,
  Select,
  Form,
  Spin,
} from 'antd';

import styles from './personal_info.css';
const Option = Select.Option;


const FormItem = Form.Item;

// 编辑个人信息页面表单
class PersonalInfoForm extends React.Component {
  constructor(props) {
    super(props);
  }
  submit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'personalInfo/updInfo',
        payload: this.props.form.getFieldsValue(),
      });
    });
  }

  render() {
    const type = ['个人', '企业'];
    const keys = ['nickname', 'loginno', 'certno', 'custype', 'cusname', 'wechat', 'qq', 'email', 'income','autoinvsummin','autoinvsummax','invexp'];
    const key = ['昵称', '手机号', '证件号码', '用户类型', '真实姓名', '微信号', 'QQ号', '邮箱', '月收入', '最小投标金额','最大投标金额','互联网投资经验'];
    const { personalInfo } = this.props;

    const data = personalInfo.data;
    const value = [data.nickname, data.loginno, data.certno, type[data.custype], data.cusname, data.wechat, data.qq, data.email, data.income,data.autoinvsummin,data.autoinvsummax, data.invexp];
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    // 根据key数组遍历表单
    const name_value_edit = (s, i) => {
      if (s === '互联网投资经验') {
        return (
          <FormItem
            {...formItemLayout}
            label={s}
          >
            {getFieldDecorator(keys[i], {
              initialValue: value[i],
              rules: [{
                required: true, message: `请输入${s}`,
              }],
            })(
              <Select style={{ width: 190 }}>
                <Option value="0">一年以下</Option>
                <Option value="1">1-3年</Option>
                <Option value="2">3年以上</Option>
              </Select>,
            )}
          </FormItem>
        );
      } else if ( i >0 && i<5) {
        return (
          <FormItem
            {...formItemLayout}
            label={s}
          >
            {getFieldDecorator(keys[i], {
            })(
              <text >{value[i]}</text>,
            )}
          </FormItem>
        );
      }else if ( i==0||i==9||i==10 ) {
        return (
          <FormItem
            {...formItemLayout}
            label={s}
          >
            {getFieldDecorator(keys[i], {
              initialValue: value[i],
              rules: [{
                required: true, message: `请输入${s}`,
              }],
            })(
              <Input style={{ width: 190 }} />,
            )}
          </FormItem>
        );
      } else {
        return (
          <FormItem
            {...formItemLayout}
            label={s}
          >
            {getFieldDecorator(keys[i], {
              initialValue: value[i],
            })(
              <Input style={{ width: 190 }} />,
            )}
          </FormItem>
        );
      }
    };

    return (
      <div style={{ marginTop: 20 }}>
        <Form>
          {key.map((s, i) => name_value_edit(s, i))}
        </Form>
        <div className={styles.submit}>
          <Button onClick={() => this.submit()} style={{ width: 100, height: 30, fontSize: 15 }}>保存</Button>
        </div>

      </div>
    );
  }
}


// 个人信息展示页面
class ValueForm extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick_edit() {
    this.props.dispatch({ type: 'personalInfo/edit', payload: { isShow: true } });
  }
  render() {
    const type1 = ['个人', '企业'];
    const type2 = ['一年以下', '1-3年', '3年以上'];
    const keys = ['nickname', 'loginno', 'certno', 'custype', 'cusname', 'wechat', 'qq', 'email', 'income','autoinvsummin','autoinvsummax','invexp'];
    const key = ['昵称', '手机号', '证件号码', '用户类型', '真实姓名', '微信号', 'QQ号', '邮箱', '月收入','最小投标金额','最大投标金额','互联网投资经验'];
    const { personalInfo } = this.props;
    const data = personalInfo.data;
    const value = [data.nickname, data.loginno, data.certno, type1[data.custype], data.cusname, data.wechat, data.qq, data.email, data.income,data.autoinvsummin,data.autoinvsummax,type2[data.invexp]];
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    // 根据key数组遍历展现个人信息
    const name_value = (s, i) => {
      return (
        <FormItem
          {...formItemLayout}
          label={s}
        >
          {getFieldDecorator(keys[i])(
            <text >{value[i]}</text>,
          )}
        </FormItem>
      );
    };
    return (
      <div style={{ marginTop: 20 }}>
        <Form>
          {key.map((s, i) => name_value(s, i))}
        </Form>
        <div className={styles.submit}>
          <Button onClick={() => this.onClick_edit()} style={{ width: 100, height: 30, fontSize: 15 }}>编辑资料</Button>
        </div>
      </div>
    );
  }
}


const ValuesForm = Form.create()(ValueForm);
const PersonalInfosForm = Form.create()(PersonalInfoForm);
function PersonalInfo({ personalInfo, dispatch }) {
  if (personalInfo.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '15%' }} /></div>);
  }
  console.log(personalInfo, 123);
  return (
    <div >
      <Spin spinning={personalInfo.loading}>
        <div className={styles.root}>
          <Row >
            <Col style={{ marginLeft: '5%' }}>
              <div className={styles.personal}>
               个人资料
              </div>
              <Row >
                {personalInfo.isShow ? <PersonalInfosForm personalInfo={personalInfo} dispatch={dispatch} /> : <ValuesForm personalInfo={personalInfo} dispatch={dispatch} />
                }
              </Row>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    personalInfo: state.personalInfo,
  };
}

export default connect(mapStateToProps)(PersonalInfo);
