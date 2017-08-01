import React from 'react';
import { connect } from 'dva';
import {
  Carousel,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Select,
  Input,
  Spin,
  Progress,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './home.css';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import StringUtils from '../../utils/string_utils';
import rech from '../../assets/recharge.png';
import ass from '../../assets/assigment.png';
import wit from '../../assets/withdrawals.png';
import asse from '../../assets/assets.png';
import sixe from '../../assets/006.png';
import five from '../../assets/005.png';
import foo from '../../assets/004.png';
import laba from '../../assets/laba.png';
import collect from '../../assets/collect.png';
import lunbo from '../../assets/lunbo.png';
import bk from '../../assets/bk.png';
import hk from '../../assets/hk.png';
import qd from '../../assets/jfqd.png';
import lb from '../../assets/wdlb.png';
import Count from './count';

const Option = Select.Option;
const FormItem = Form.Item;

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'horizontal',
      visible: false,
    };
  }




  render() {
    const { home } = this.props;
    // 弹出框信息填写完，点击确定，执行该方法
  const  onmodel = () => {
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        const pay = this.props.form.getFieldsValue();
        pay.tenantno = '1101001001';
        console.log(pay, 123);
        this.props.dispatch({
          type: 'home/Invint',
          payload: pay,
        });

        handleCancel();
      });
    }
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
    }
// 关闭弹出框
 const handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    let moraay;
    let moraay1;
    let moraay2;
    if (home.data.length == 0) {
      moraay = 0;
      moraay1 = 0;
      moraay2 = 0;
    } else {
      moraay = home.data.acctnoEntity.accuinvsum;
      moraay1 = home.data.acctnoEntity.toearnsum;
      moraay2 = home.data.acctnoEntity.accuearnsum;
    }
    const onsesl = () => {
      if (home.data.length == 0) {
        console.log(12222222);
        browserHistory.push('/login');
      } else {
        console.log(11111111);
        this.props.dispatch({
          type: 'home/Seal',
          payload: {},
        });
      }
    };
    const model = () => {
      if (getLocalStorage(Storage.DID_LOGIN) != null) {
        return(
          <div>
            <Modal
              title={
                <div>
                  <Row >
                    <Col span={1} >
                      <img src={collect} className={styles.modelimage} />
                    </Col>
                    <Col span={23}>
                      <text className={styles.modeltext1} >投资意向征集</text>
                    </Col>
                  </Row>
                </div>
              } visible={this.state.visible}
              onCancel={handleCancel}
              footer={null}
              style={{ width: 300 }}
            >
              <div className={styles.modeldiv}>
                <Form >
                  <FormItem
                    {...formItemLayout}
                    label="客户姓名"
                  >
                    {getFieldDecorator('cusname', {
                      initialValue: getLocalStorage(Storage.DID_LOGIN).cusname,
                    })(
                      <Input className={styles.model} disabled/>,
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="投资金额"
                  >
                    {getFieldDecorator('toinvsum', {
                      rules: [{ required: true }],
                    })(
                      <Input placeholder="请输入金额" className={styles.model} />,
                    )}
                    <text className={styles.modeltext}> 元</text>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="期望年化收益率"
                  >
                    {getFieldDecorator('expprdfit', {
                      rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                      <Input placeholder="请输入期望年化收益率" className={styles.model} />,
                    )}
                    <text className={styles.modeltext}> %以上</text>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="投资期限"
                  >
                    {getFieldDecorator('invterm', {
                      rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                      <Select placeholder="请选择" style={{ width: 200 }}>
                        <Option value="1">3个月</Option>
                        <Option value="2">6个月</Option>
                        <Option value="3">9个月</Option>
                        <Option value="4">一年以上</Option>
                      </Select>,
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="手机号码"
                  >
                    {getFieldDecorator('telno', {
                      initialValue: getLocalStorage(Storage.DID_LOGIN).retMsg,
                    })(
                      <Input className={styles.model} disabled />,
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="邮箱"
                  >
                    {getFieldDecorator('email', {
                      rules: [{ required: true }],
                    })(
                      <Input className={styles.model} placeholder="请输入邮箱" />,
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="其他投资需求"
                  >
                    {getFieldDecorator('notes', {
                      rules: [{ required: true }],
                    })(
                      <Input className={styles.model} />,
                    )}
                  </FormItem>
                </Form>
                <div className={styles.buton}>
                  <Button type="primary" className={styles.modelbutton1} onClick={onmodel}>确认</Button>

                </div>
              </div>
            </Modal>
          </div>
        )
      }else  {
        return
      }

    }
    const onsesl1 = () => {
      if (home.data.length == 0) {
        browserHistory.push('/login');
      } else {
        browserHistory.push('/mygiftbag');
      }
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    // 金额为NULL是初始化为0
    const Initialization = (e) => {
      if (e) {
        return StringUtils.moneyFormatData2Money(e);
      } else {
        return '0.0';
      }
    };

    const onCellClick = (record) => {
      this.props.dispatch({ type: 'bid/findPrd', payload: { record } });
      browserHistory.push('/bid');
    };
    const dataSource = home.date.list;


    dataSource.map((data, number) => {
      data.key = number + 1;
      console.log(data.key, 1111111111);
    });

    const columns = [
      { title: '序号', className: styles.title, dataIndex: 'key', width: 50, key: 'key' },
      { title: '产品名称', className: styles.title, dataIndex: 'prdname', width: 100, key: 'prdname', onCellClick },
      { title: '产品代码', className: styles.title, dataIndex: 'prdcode', width: 100, key: 'prdcode', onCellClick },
      { title: '总金额(万元)', className: styles.title, dataIndex: 'prdquota', width: 100, key: 'prdquota', onCellClick },
      { title: '起投金额(元)', className: styles.title, dataIndex: 'buyminamt', width: 100, key: 'buyminamt', onCellClick },
      { title: '预期收益',
        className: styles.title,
        key: 'yearprofitrate',
        width: 100,
        onCellClick,
        render: (text, record, index) => {
          return (
            <div>
              <text>{record.yearprofitrate}%</text>
            </div>
          );
        } },
      { title: '项目期限',
        className: styles.title,
        key: 'prddays',
        width: 100,
        onCellClick,
        render: (text, record, index) => {
          return (
            <div>
              <text>{record.prddays}天</text>
            </div>
          );
        } },
      { title: '进度',
        className: styles.title,
        key: 'percentage',
        width: 100,
        onCellClick,
        render: (text, record) => {
          return (
            <div>
              <Progress type="circle" percent={record.percentage} width={40} />
            </div>
          );
        } },

      { title: '状态',
        className: styles.title,
        key: 'prdsta',
        width: 100,
        onCellClick,
        render: (text, record, index) => {
          if (record.prdsta == 1) {
            return (
              <Button type="primary" >可投</Button>);
          } else if (record.prdsta == 2) {
            return (
              <Button type="danger" ghost >满标</Button>);
          } else if (record.prdsta == 3) {
            return (
              <Button type="primary" disabled >结束</Button>);
          } else if (record.prdsta == 0) {
            return (
              <Button type="primary" disabled ><Count dispatch={this.props.dispatch} time={record.time}   /></Button>);
          }
        } },

    ];
    const recharge = () => {
      if (home.data.length == 0) {
        browserHistory.push('/login');
      } else {
        browserHistory.push('/myaccount/recharge');
      }
    };
    const withdrawals = () => {
      if (home.data.length == 0) {
        browserHistory.push('/login');
      } else {
        browserHistory.push('/myaccount/withdrawals');
      }
    };
    const banklist = () => {
      if (home.data.length == 0) {
        browserHistory.push('/login');
      } else {
        browserHistory.push('/myaccount/banklist');
      }
    };
    const overview = () => {
      if (home.data.length == 0) {
        browserHistory.push('/login');
      } else {
        browserHistory.push('/myaccount');
      }
    };
    const investment_record = () => {
      if (home.data.length == 0) {
        browserHistory.push('/login');
      } else {
        browserHistory.push('/myaccount/investment_record');
      }
    };
    const financing_record = () => {
      if (home.data.length == 0) {
        browserHistory.push('/login');
      } else {
        browserHistory.push('/myaccount/financing_record');
      }
    };
    return (
      <div className={styles.root}>
        <Carousel autoplay>
          <div >
            <img src={lunbo} className={styles.image} />
          </div>

        </Carousel>
        <div className={styles.boder}>
          <Row>
            <Col span={1}className={styles.laba1}>
              <img src={laba} className={styles.laba} />
            </Col>
            <Col span={5} className={styles.laba1}>
              <text className={styles.text1}>BJ20170001项目到期兑付...</text>
              <text className={styles.text1}>2017-04-17</text>
            </Col>
            <Col span={2}className={styles.new}>
              <Button size="small" type="danger" ghost className={styles.labutton} >New !</Button>
            </Col>
            <Col span={8} className={styles.laba2}>
              <text className={styles.text1}>BJ20160001项目到期兑付...</text>
              <text className={styles.text1}>2017-04-17</text>
            </Col>
            <Col span={8} className={styles.laba3}>
              <text style={{ color: 'red' }} className={styles.text1}>更多公告...</text>
            </Col>
          </Row>
        </div>
        <div className={styles.boder1}>
          <Row >
            <Col className={styles.login} span={5}>
              <img src={sixe} className={styles.sixe} />
            </Col>
            <Col className={styles.login} span={5}>
              <Row>
                <Col className={styles.textone}>
                  <text style={{ fontSize: 18, color: 'red' }}>¥ {Initialization(moraay)}</text>
                </Col>
                <Col className={styles.texttwo}>
                  <text>累计投资总金额</text>
                </Col>
              </Row>
            </Col>
            <Col className={styles.login} span={5}>
              <Row>
                <Col className={styles.textone}>
                  <text style={{ fontSize: 18, color: 'red' }}>¥ {Initialization(moraay1)}</text>
                </Col>
                <Col className={styles.texttwo}>
                  <text >投资待收总金额</text>
                </Col>
              </Row>
            </Col>
            <Col className={styles.login} span={5}>
              <Row>
                <Col className={styles.textone}>
                  <text style={{ fontSize: 18, color: 'red' }}>¥ {Initialization(moraay2)}</text>
                </Col>
                <Col className={styles.texttwo}>
                  <text>为投资者赚取收益</text>
                </Col>
              </Row>
            </Col>
            <Col className={styles.login1} span={4} >
              <Button type="danger" ghost className={styles.but} onClick={showModal}>我的投资意向</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.boder3}>
          <Row className={styles.login3}>
            <Col span={3} onClick={recharge}>
              <Col>
                <img src={rech} className={styles.image1} />
              </Col>
              <Col>
                <text className={styles.text3}>充值</text>
              </Col>
              <Col>
                <text className={styles.text4}>为账户充值方便快捷</text>
              </Col>
            </Col>
            <Col span={3} onClick={withdrawals}>
              <Col>
                <img src={wit} className={styles.image1} />
              </Col>
              <Col>
                <text className={styles.text3}>提现</text>
              </Col>
              <Col>
                <text className={styles.text4}>快速提现，0手续费</text>
              </Col>
            </Col>
            <Col span={3} onClick={investment_record}>
              <Col>
                <img src={ass} className={styles.image1} />
              </Col>
              <Col>
                <text className={styles.text3}>转让</text>
              </Col>
              <Col>
                <text className={styles.text4}>朋友之间互相转让</text>
              </Col>
            </Col>
            <Col span={3} onClick={overview}>
              <Col>
                <img src={asse} className={styles.image1} />
              </Col>
              <Col>
                <text className={styles.text3}>我的资产</text>
              </Col>
              <Col>
                <text className={styles.text4}>我的资产一目了然</text>
              </Col>
            </Col>
            <Col span={3} onClick={banklist}>
              <Col>
                <img src={bk} className={styles.image1} />
              </Col>
              <Col>
                <text className={styles.text3}>绑卡</text>
              </Col>
              <Col>
                <text className={styles.text4}>一键绑卡，方便快捷</text>
              </Col>
            </Col>
            <Col span={3} onClick={financing_record}>
              <Col>
                <img src={hk} className={styles.image1} />
              </Col>
              <Col>
                <text className={styles.text3}>还款</text>
              </Col>
              <Col>
                <text className={styles.text4}>欠债还钱，天经地义 </text>
              </Col>
            </Col>
            <Col span={3} onClick={() => onsesl()}>
              <Col>
                <img src={qd} className={styles.image1} />
              </Col>
              <Col>
                <text className={styles.text3}>积分签到</text>
              </Col>
              <Col>
                <text className={styles.text4}>签到有惊喜</text>
              </Col>
            </Col>
            <Col span={3} onClick={() => onsesl1()}>
              <Col>
                <img src={lb} className={styles.image1} />
              </Col>
              <Col>
                <text className={styles.text3}>我的礼包</text>
              </Col>
              <Col>
                <text className={styles.text4}>里面有惊喜呦！</text>
              </Col>
            </Col>
          </Row>
        </div>
        <div className={styles.boder4} >
          <Row className={styles.login4}>
            <Col span={1}>
              <img src={five} className={styles.text5} />
            </Col>
            <Col span={7}>
              <text className={styles.icon4}>投资列表</text>
            </Col>
            <Col span={2} offset={14} >
              <text className={styles.icon5}>查看更多投资列表</text>
            </Col>
          </Row>
        </div>
        <div className={styles.boder5}>
          <div className={styles.t1}>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={{ total: home.date.totalElements }}
            />
          </div>
        </div>
        <div className={styles.login12}>
          <div className={styles.nav}>
            <div className={styles.item12} />
            <div className={styles.li}>
              <div className={styles.a}>
                <span className={styles.span12}>合作伙伴</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login121}>
          <img src={foo} className={styles.image12} />
        </div>
        {model()}
      </div>
    );
  }
}
const HForm = Form.create()(HomeForm);
function Home({ home, dispatch }) {
  if (home.date.length == 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '10%' }} /></div>);
  } else {
    console.log(home.data, 12367556765333333);
    return (
      <div className={styles.root}>
        <HForm dispatch={dispatch} home={home} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}
export default connect(mapStateToProps)(Home);
