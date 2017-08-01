/**
 * Created by zhangle on 2017/5/8.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Button,
  Table,
  Progress,
  Input,
  Spin,
  Tabs,
  Form,
  Modal,
} from 'antd';
import { browserHistory } from 'react-router';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import styles from './bid.css';
import xm from '../../assets/xmsm.png';
import { hexMD5 } from '../../utils/md5';
const TabPane = Tabs.TabPane;
class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ttt:'',
      yy:'',
      m:'',
      h:'',
      d:'',
      t:'',
      l:props.bid.data.prdinfo.time,
      visible: false,
    };
  }



  render() {
    const {bid}=this.props;
    // 金额为NULL是初始化为0
    const Initialization = (e) => {
      if (e) {
        return e;
      } else {
        return '0.0';
      }
    };

// 倒计时1
  const daojshi1=()=>{
      if(this.state.l >0) {
          let m = this.state.l - 1;
          let hours = Math.floor(m / 3600);
          let minutes = Math.floor((m - hours * 3600) / 60);
          let seconds = (m - hours * 3600 - minutes * 60);
          this.setState({
            h: hours ,
            d:minutes,
            t:seconds,
            l:m,
          });
      }
    };
    setTimeout(daojshi1,1000);
    // 当没有登录时,点击立即登录,调用这个方法，跳转到登录页面.
    const onlogin =()=>{
      browserHistory.push('/login');
    };
    const phone = (e) => {
     this.props.dispatch({
        type: 'bid/query1',
        payload: {
          money: e.target.value,
        },
      });
      console.log(e.target.value,111111111)
    };
    const transPswd = (e) => {
      this.props.dispatch({
        type: 'bid/query1',
        payload: {
          transPswd: e.target.value,
        },
      });
      console.log(e.target.value,111111111)
    };
    const showModal = () => {
      this.setState({
        visible: true,
      });
    }
    const handleOk = (e) => {
      this.props.dispatch({
        type: 'bid/ValidateInv',
        payload: {
          transPswd:bid.transPswd,
          busiType:'T01',
          money: bid.money,
          phoneNo:getLocalStorage(Storage.DID_LOGIN).retMsg,
          prdInfoID: bid.data.prdinfo.prdinfoid,
        },
      });
      this.setState({
        visible: false,
      });
    }
    const handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
    // 点击立即投资调用这个方法
    const ontouzi = () => {
      this.props.dispatch({ type: 'bid/GetInfo',
        payload: {
        telno:getLocalStorage(Storage.DID_LOGIN).retMsg,
      } });
      if(bid.date.length != 0 ) {
        console.log(bid.date,111111)

        if (bid.date.nopswdflag == 1) {
          console.log(111111)
          this.props.dispatch({
            type: 'bid/DoInvest',
            payload: {
              phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
              prdInfoID: bid.data.prdinfo.prdinfoid,
              channel: 2,
              money: bid.money,
            }
          });
        } else {
          console.log(2222222)
          showModal()
        }
      }
    };
    const daoji = () => {
      if(bid.data.prdinfo.prdsta ==0){
        return(
          <div>
            <Row>
              <Col span={8}>
                <div >
                  <text className={styles.qingg}>抢购倒计时:</text>
                </div>
              </Col>
              <Col span={2}>
                <div className={styles.daojishi}>
                  <text className={styles.text7}>{this.state.h}</text>
                </div>
              </Col>
              <Col span={1}>
                <div >
                  <text >:</text>
                </div>
              </Col>
              <Col span={2}>
                <div className={styles.daojishi}>
                  <text className={styles.text7}>{this.state.d}</text>
                </div>
              </Col>
              <Col span={1}>
                <div >
                  <text >:</text>
                </div>
              </Col>
              <Col span={2}>
                <div className={styles.daojishi}>
                  <text className={styles.text7}>{this.state.t}</text>
                </div>
              </Col>
            </Row>
          </div>
        )
      }else {
        return(
          <div></div>
        )
      }
    }
    //进入该页面 调用这个方法，判断是否登录，登录后 判断投资状态。
    const button =()=> {
      if (getLocalStorage(Storage.DID_LOGIN) == null) {
        return(
          <div className={styles.login10}>
            <Button className={styles.button} type="primary" onClick={onlogin}>请登录</Button>
          </div>
        )

      } else {
        if(bid.data.prdinfo.prdsta ==0){
          return(
            <div className={styles.login10}>
              <Button className={styles.button} type="primary" >预热中</Button>
            </div>
          )
        }else if(bid.data.prdinfo.prdsta ==1){
          return(
            <div className={styles.login10}>
              <Button className={styles.button} type="primary" onClick={ontouzi} >立即投资</Button>
            </div>
          )
        }else if(bid.data.prdinfo.prdsta ==2){
          return(
            <div className={styles.login10}>
              <Button className={styles.button} type="danger" ghost disabled >已满标</Button>
            </div>
          )
        } else if(bid.data.prdinfo.prdsta ==3){
          return(
            <div className={styles.login10}>
              <Button className={styles.button} type="primary" disabled >已结束</Button>
            </div>
          )
        }
      }
    };
   //  //倒计时方法。
   // const daojishi= ()=> {
   //    let EndTime = new Date(bid.data.prdinfo.buyenddate);
   //    let NowTime = new Date();
   //    if( EndTime > NowTime) {
   //      let t = EndTime.getTime() - NowTime.getTime();
   //      let d;
   //      let h;
   //      let m;
   //      let s;
   //      if(t>=0){
   //        d=Math.floor(t/1000/60/60/24);
   //        h=Math.floor(t/1000/60/60%24);
   //        m=Math.floor(t/1000/60%60);
   //        s=Math.floor(t/1000%60);
   //
   //      }
   //      this.setState({
   //        ttt:"项目结束时间还有"+ d + "天" + h + "小时" + m + "分钟" + s + "秒"
   //      })
   //    }else {
   //      this.setState({
   //        ttt: "项目抢购时间已结束"
   //      })
   //    }

    // };
   // 每隔1秒钟，调用倒计时方法一次，重新加载状态。
   //  setTimeout(daojishi,1000);
    return(
    <div className={styles.login}>
      <Modal
        visible={this.state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        title={
          <div className={styles.modeltitle}>
            <text>交易密码</text>
          </div>}
      >
        <div className={styles.model}>
         <Input className={styles.input} type='Password' value={bid.transPswd} onChange={transPswd}/>
        </div>
      </Modal>
      <div className={styles.login1}>
        <Row >
          <Col span={8} offset={7} className={styles.text}>
            <text >{bid.data.prdinfo.prdname}</text>
            <text >【{bid.data.prdinfo.prdcode}】</text>
          </Col >
        </Row>
      </div>
      <div className={styles.login2}>
        <Row>
          <Col span={18}>
            <div className={styles.login3}>
              <Row>
                <Col span={8}>
                  <Row>
                    <Col>
                      <text className={styles.text1}>{bid.data.prdinfo.yearprofitrate}%</text>
                    </Col>
                    <Col>
                      <text className={styles.stext}>年化收益</text>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col>
                      <text className={styles.text1}>{bid.data.prdinfo.prddays}</text>
                      <text className={styles.stext}>天</text>
                    </Col>
                    <Col>
                      <text className={styles.stext}>投资期限</text>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col>
                      <text>¥</text>
                      <text className={styles.text1}>{Initialization(bid.data.prdinfo.prdquota)}万元</text>
                    </Col>
                    <Col>
                      <text className={styles.stext}>预期投资规模</text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={styles.login4}>
              <Col span={6}>
                <div className={styles.login5}>
                  <Col>
                    <text className={styles.text6}>{bid.data.prdinfo.issuedate}</text>
                  </Col>
                  <Col>
                    <text className={styles.text61}>项目起息日</text>
                  </Col>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.login5}>
                  <Col>
                    <text className={styles.text6}>{bid.data.prdinfo.buyenddate}</text>
                  </Col>
                  <Col>
                    <text className={styles.text61}>项目到期日</text>
                  </Col>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.login5}>
                  <Col>
                    <text className={styles.text6}>项目到期日付息</text>
                  </Col>
                  <Col>
                    <text className={styles.text61}>收益支付方式</text>
                  </Col>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.login6}>
                  <Col>
                    <text className={styles.text6}>项目到期后1-3个工作日</text>
                  </Col>
                  <Col>
                    <text className={styles.text61}>本息到账日</text>
                  </Col>
                </div>
              </Col>
            </div>
            <div className={styles.login7}>
              <Row gutter={16}>
                <Col span={14}>
                  <Row>
                    <Col span={6} >
                      <text className={styles.text6}>融资进度：</text>
                    </Col>
                    <Col span={18} >
                      <Progress percent={bid.data.prdinfo.percentage} />
                    </Col>
                  </Row>
                </Col>
                <Col span={10} >
                  {daoji()}
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.login8}>
              <div className={styles.div9}>
                <text className={styles.text9}>最低投资：</text>
                <text className={styles.icon9}>{Initialization(bid.data.prdinfo.buyminamt)}元</text>
              </div>
              <div className={styles.div9}>
                <text className={styles.text9}>剩余金额：</text>
                <text className={styles.icon9}>{Initialization(bid.data.prdinfo.remainquota)}万元</text>
              </div>
              <div className={styles.div9}>
                <text className={styles.text9}>投资金额：</text>
                <Input className={styles.input} value={bid.money} onChange={phone}/>
                <text className={styles.icon9}>元</text>
              </div>
            </div>
            <div>
              {button()}
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.xdiv}>
        <Row className={styles.img1}>
          <Col span={3} offset={21} className={styles.img2}>
            <img src={xm} className={styles.img} />
          </Col>
        </Row>
      </div>
    </div>

    )
  }
}
const HForm = Form.create()(HomeForm);
function Bid({ bid,dispatch }) {

  if (bid.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '10%' }} /></div>);
  } else {
    const prd = () => {
      if (bid.data.invrcdList === 0) {
        return (
          <div>
            <text> 亲！没有内容哦！</text>
          </div>
        );
      } else {
        const dataSource = bid.data.invrcdList;
        dataSource.map((data, number) => {
          data.key = number + 1;
        });

        const columns = [
          { title: '序号', className: styles.title, dataIndex: 'key', width: 50, key: 'key' },
          { title: '手机号码', className: styles.title, dataIndex: 'telno', width: 100, key: 'telno' },
          { title: '金额（元）', className: styles.title, dataIndex: 'invsum', width: 100, key: 'invsum' },
          { title: '时间', className: styles.title, dataIndex: 'invdate', width: 100, key: 'invdate' },

        ];

        return (
          <div>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={{ pageSize: 10, total: bid.date.totalElements }}
              scroll={{ y: 500 }}
            />
          </div>
        );
      }
    };

    const prdlist = () => {
      if (bid.data.prdinstructionList == 0) {
        return (
          <div>
            <text> 亲！没有内容哦！</text>
          </div>
        );
      } else {
        const title = bid.data.prdinstructionList;
        const put = (s, i) => {
          return (
            <div>
              <div className={styles.mboder}>
                <text className={styles.mtext}>{bid.data.prdinstructionList[i].firleltitle}</text>
              </div>
              <div className={styles.mdiv2}>
                <text className={styles.mtext1}>{bid.data.prdinstructionList[i].illustratecont}</text>
              </div>
            </div>
          );
        };
        return (
          <div>
            {title.map((s, i) => put(s, i))}
          </div>
        );
      }
    };
    return (
      <div className={styles.root}>
        <div className={styles.root1} />
        <HForm bid={bid} dispatch={dispatch}/>
        <div className={styles.div9}>
          <div className={styles.mlogin}>
            < div className={styles.mlogin1}>
              <Tabs type="card" className={styles.mlogin2} >
                <TabPane tab="产品规则" key="1" >
                  <div style={{ marginTop: 20 }}>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>产品性质:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.prdtypename}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>产品额度:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.prdquota}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>剩余额度:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.remainquota}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>起投金额:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.buyminamt}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>风险级别:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.prorisklel}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>认购开始时间:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.buystartdate}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>认购结束时间:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.buyenddate}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>起息日期:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.issuedate}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>项目状态:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.prostatus}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>能否转让:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.transflag}</text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }} >
                      <Col span={4} >
                        <text className={styles.cpxz}>能否提前还款:</text>
                      </Col>
                      <Col span={20}>
                        <text className={styles.cpxz1}>{bid.data.prdinfo.prepayflag}</text>
                      </Col>
                    </Row>
                  </div>
                </TabPane>
                <TabPane tab="产品介绍" key="2" >
                  <div className={styles.mdiv1}>
                    {prdlist()}
                  </div>
                </TabPane>
                <TabPane tab="投资记录" key="3" >
                  <div >
                    {prd()}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <div className={styles.mdiv11} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bid: state.bid,
  };
}

export default connect(mapStateToProps)(Bid);
