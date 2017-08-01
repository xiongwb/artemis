/**
 * Created by zhangle on 2017/5/7.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Tabs,
  Table,
  Spin,
  Form,
  Progress,
  Button,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './investment.css';
import wh from '../../assets/wh.png';
import five from '../../assets/005.png';
import Ho from './hottag';
import Count from './count';

const TabPane = Tabs.TabPane;

class InForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { investmen } = this.props;
    const dataSource = investmen.data.list;
    dataSource.map((data, number) => {
      data.key = number + 1;
    });
    const onChange = (page) => {
    this.props.dispatch({
        type: 'investmen/Prdinfolist',
        payload: {
          pageIndex: page,
          tenantNo: 1101001001,
          expFinRate: investmen.value,
          proType: investmen.value1,
          finTerm: investmen.value2,
        },
      });
    };
    const onCellClick = (record) => {
      this.props.dispatch({ type: 'bid/findPrd', payload: { record } });
      browserHistory.push('/bid');
    };
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
        render: (text, record, index) => {
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
        render: (text, record) => {
          if (record.prdsta == 1) {
            return (
              <Button type="primary" >可投</Button>);
          } else if (record.prdsta == 2) {
            return (
              <Button type="danger" ghost >满标</Button>);
          } else if (record.prdsta == 3) {
            return (
              <Button type="primary" disabled >结束</Button>);
          }else if (record.prdsta == 0) {

            return (
              <Button type="primary" disabled ><Count dispatch={this.props.dispatch} time={record.time} /></Button>);
          }
        } },

    ];
    const operations = (<div className={styles.ym}>
      <Row className={styles.login5}>
        <Col span={2} className={styles.yimage1}>
          <img src={wh} className={styles.yimage} />
        </Col>
        <Col span={22}>
          <text className={styles.ytext}>第一次使用？</text>
        </Col>
      </Row>
    </div>);
    const handleChange = (e) => {
      this.props.dispatch({
        type: 'investmen/choice',
        payload: { value: e },
      });
      this.props.dispatch({
        type: 'investmen/Prdinfolist',
        payload: {
          tenantNo: 1101001001,
          expFinRate: e,
          proType: investmen.value1,
          pageIndex: 1,
          finTerm: investmen.value2,
        },
      });
    };
    const handleChange1 = (e) => {
      this.props.dispatch({
        type: 'investmen/choice1',
        payload: { value1: e },
      });
      this.props.dispatch({
        type: 'investmen/Prdinfolist',
        payload: {
          tenantNo: 1101001001,
          expFinRate: investmen.value,
          proType: e,
          pageIndex: 1,
          finTerm: investmen.value2,
        },
      });
    };
    const handleChange2 = (e) => {
      this.props.dispatch({
        type: 'investmen/choice2',
        payload: { value2: e },
      });
      this.props.dispatch({
        type: 'investmen/Prdinfolist',
        payload: {
          tenantNo: 1101001001,
          expFinRate: investmen.value,
          proType: investmen.value1,
          pageIndex: 1,
          finTerm: e,
        },
      });
    };
    const kk = [
      { title: '预期收益率:', one: '全部', two: '6%以下', tre: '6%-7%', for: '7%-8%', foo: '8%以上' },
      { title: '项目类型:', one: '全部', two: '普通', tre: '代销', for: '转让' },
      { title: '项目投资期限:', one: '全部', two: '90-180天', tre: '180-360天', for: '360以上' }];
    const teb = (s) => {
      if (s.title === '预期收益率:') {
        console.log(11111);
        return (
          <div className={styles.login3}>
            <Row>
              <Col span={3} className={styles.biaoq}>{s.title}</Col>
              <Col span={21} >
                <Ho zl value={investmen.value} handleChange={() => handleChange(1)} keys={1}>{s.one}</Ho>
                <Ho value={investmen.value} handleChange={() => handleChange(2)} keys={2} >{s.two}</Ho>
                <Ho value={investmen.value} handleChange={() => handleChange(3)} keys={3}>{s.tre}</Ho>
                <Ho value={investmen.value} handleChange={() => handleChange(4)} keys={4}>{s.for}</Ho>
                <Ho value={investmen.value} handleChange={() => handleChange(5)} keys={5}>{s.foo}</Ho>
              </Col>
            </Row>
          </div>

        );
      } else if (s.title == '项目类型:') {
        return (
          <div className={styles.login3}>
            <Row>
              <Col span={3} className={styles.biaoq}>{s.title}</Col>
              <Col span={21} >
                <Ho zl value={investmen.value1} handleChange={() => handleChange1(1)} keys={1}>{s.one}</Ho>
                <Ho value={investmen.value1} handleChange={() => handleChange1(2)} keys={2} >{s.two}</Ho>
                <Ho value={investmen.value1} handleChange={() => handleChange1(3)}keys={3} >{s.tre}</Ho>
                <Ho value={investmen.value1} handleChange={() => handleChange1(4)}keys={4}>{s.for}</Ho>

              </Col>
            </Row>
          </div>
        );
      } else if (s.title == '项目投资期限:') {
        return (
          <div className={styles.login3}>
            <Row>
              <Col span={3} className={styles.biaoq}>{s.title}</Col>
              <Col span={21} >
                <Ho zl value={investmen.value2} handleChange={() => handleChange2(1)} keys={1}>{s.one}</Ho>
                <Ho value={investmen.value2} handleChange={() => handleChange2(2)} keys={2} >{s.two}</Ho>
                <Ho value={investmen.value2} handleChange={() => handleChange2(3)} keys={3} >{s.tre}</Ho>
                <Ho value={investmen.value2} handleChange={() => handleChange2(4)} keys={4}>{s.for}</Ho>

              </Col>
            </Row>
          </div>
        );
      }
    };
    return (
      <div>
        < div className={styles.login}>
          < div className={styles.login1}>
            <Tabs type="card" className={styles.login2} tabBarExtraContent={operations}>
              <TabPane tab="筛选条件" key="1" >
                {kk.map((s, i) => teb(s, i))}
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className={styles.bh1}>
          <Row className={styles.login5}>
            <Col span={1} className={styles.image}>
              <img src={five} className={styles.image1} />
            </Col>
            <Col span={23}>
              <text className={styles.ttext}>投资列表</text>
            </Col>
          </Row>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10, total: investmen.data.totalElements, onChange }}
          />
        </div>
      </div>
    );
  }
}
const Infrom = Form.create()(InForm);
function Investment({ investmen, dispatch }) {
  if (investmen.data.length == 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '10%' }} /></div>);
  } else {
    console.log(investmen.data, 111111111111111111111111);

    return (
      <div className={styles.root}>
        <div className={styles.jul} />
        <Infrom investmen={investmen} dispatch={dispatch} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    investmen: state.investmen,
  };
}

export default connect(mapStateToProps)(Investment);
