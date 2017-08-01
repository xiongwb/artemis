import styles from './teber.css'
import React from 'react'
import asse from '../../assets/assets.png'
import zheng from '../../assets/zheng.jpg'
import wei from '../../assets/wei.jpg'
import lo from '../../assets/logo03.jpg'
import { connect } from 'dva'
import { Link } from 'react-router'
import {
  Table,
  Row,
  Col,
  Button,
  Icon,
  Progress,
  Spin,


} from 'antd'


class Teber extends React.Component {


  render() {
    return (
        <div >
          <div className={styles.root}>
            <Row className={styles.text}>
              <Col span={2} className={styles.text1}></Col>
              <Col span={3} className={styles.text1}>投资项目</Col>
              <Col span={4} className={styles.text1}>总金额(万元)</Col>
              <Col span={3} className={styles.text1}>起投金额(元)</Col>
              <Col span={3} className={styles.text1}>预期收益</Col>
              <Col span={3} className={styles.text1}>期限</Col>
              <Col span={3} className={styles.text1}>进度</Col>
              <Col span={3} className={styles.text1}>状态</Col>
            </Row>
          </div>
          <div >
            <Row className={styles.login}>
              <Col span={2} className={styles.login1}>
                <img src={lo} className={styles.image}/>
              </Col>
              <Col span={3} className={styles.login1}>
                <Row>
                  <Col span={16}>
                  <text className={styles.text3}>BJ20170001</text>
                  </Col >
                  <Col span={4}>
                  <img src={zheng} className={styles.image1}/>
                  </Col>
                  <Col span={4}>
                  <img src={wei} className={styles.image1}/>
                  </Col>
                </Row>
              </Col>
              <Col span={4} className={styles.login1}>
                <text className={styles.text3}>￥800</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>￥8000</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>8.0%</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>120天</text>
              </Col>
              <Col span={3} className={styles.login2}>
                <Progress type="circle" percent={30} width={40} />
              </Col>
              <Col span={3} className={styles.login3}>
                <Button type="primary" >投标中</Button>
              </Col>
            </Row>
          </div>
          <div >
            <Row className={styles.login}>
              <Col span={2} className={styles.login1}>
                <img src={lo} className={styles.image}/>
              </Col>
              <Col span={3} className={styles.login1}>
                <Row>
                  <Col span={16}>
                    <text className={styles.text3}>BJ20170001</text>
                  </Col >
                  <Col span={4}>
                    <img src={zheng} className={styles.image1}/>
                  </Col>
                  <Col span={4}>
                    <img src={wei} className={styles.image1}/>
                  </Col>
                </Row>
              </Col>
              <Col span={4} className={styles.login1}>
                <text className={styles.text3}>￥800</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>￥8000</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>8.0%</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>120天</text>
              </Col>
              <Col span={3} className={styles.login2}>
                <Progress type="circle" percent={30} width={40} />
              </Col>
              <Col span={3} className={styles.login3}>
                <Button type="danger" ghost><Link to="/bid"> 未投标</Link></Button>
              </Col>
            </Row>
          </div>
          <div >
            <Row className={styles.login}>
              <Col span={2} className={styles.login1}>
                <img src={lo} className={styles.image}/>
              </Col>
              <Col span={3} className={styles.login1}>
                <Row>
                  <Col span={16}>
                    <text className={styles.text3}>BJ20170001</text>
                  </Col >
                  <Col span={4}>
                    <img src={zheng} className={styles.image1}/>
                  </Col>
                  <Col span={4}>
                    <img src={wei} className={styles.image1}/>
                  </Col>
                </Row>
              </Col>
              <Col span={4} className={styles.login1}>
                <text className={styles.text3}>￥800</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>￥8000</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>8.0%</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>120天</text>
              </Col>
              <Col span={3} className={styles.login2}>
                <Progress type="circle" percent={30} width={40} />
              </Col>
              <Col span={3} className={styles.login3}>
                <Button type="primary" disabled >已完成</Button>
              </Col>
            </Row>
          </div>
          <div >
            <Row className={styles.login}>
              <Col span={2} className={styles.login1}>
                <img src={lo} className={styles.image}/>
              </Col>
              <Col span={3} className={styles.login1}>
                <Row>
                  <Col span={16}>
                    <text className={styles.text3}>BJ20170001</text>
                  </Col >
                  <Col span={4}>
                    <img src={zheng} className={styles.image1}/>
                  </Col>
                  <Col span={4}>
                    <img src={wei} className={styles.image1}/>
                  </Col>
                </Row>
              </Col>
              <Col span={4} className={styles.login1}>
                <text className={styles.text3}>￥800</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>￥8000</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>8.0%</text>
              </Col>
              <Col span={3} className={styles.login1}>
                <text className={styles.text3}>120天</text>
              </Col>
              <Col span={3} className={styles.login2}>
                <Progress type="circle" percent={100} width={40} />
              </Col>
              <Col span={3} className={styles.login3}>
                <Button type="primary" >投标中</Button>
              </Col>
            </Row>
          </div>
        </div>

    );
  }
}

export default Teber

