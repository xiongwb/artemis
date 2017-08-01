import React from 'react'
import styles from './foot.css'
import asse from '../assets/assets.png'
import logo from '../assets/logo06.png'
import tree from '../assets/003.png'
import two from '../assets/002.png'
import one from '../assets/001.png'

import {
  Carousel,
  Row,
  Col,
  Icon,
  Button,
  Table
} from 'antd';
class Foot extends React.Component {

  render() {
    return (
        <div className={styles.login2}>
          <div className={styles.login3}>
            <Row>
              <Col span={2}></Col>
              <Col span={2} className={styles.login41}>
                <Col >
                  <img src={one} className={styles.image1}/>
                </Col>
                <Col className={styles.rocol}>
                  <text>平台介绍</text>
                </Col>
                <Col >
                  <text>平台简介</text>
                </Col>
                <Col>
                  <text>名词解释</text>
                </Col>
                <Col>
                  <text>安全保障</text>
                </Col>
              </Col>
              <Col span={2} className={styles.login41}>
                <Col >
                  <img src={two} className={styles.image1}/>
                </Col>
                <Col className={styles.rocol}>
                  <text>操作指引</text>
                </Col>
                <Col>
                  <text>注册登录</text>
                </Col>
                <Col>
                  <text>融资指引</text>
                </Col>
                <Col>
                  <text>投资指引</text>
                </Col>
              </Col>
              <Col span={4} className={styles.login41}>
                <Col className={styles.text}>
                  <text>平台服务热线</text>
                </Col>
                <Col>
                  <text>97654</text>
                </Col>
                <Col>
                  <text>平台服务邮箱</text>
                </Col>
                <Col>
                  <text>seddeft@ve.com</text>
                </Col>
              </Col>
              <Col span={6} className={styles.login41}>
                <Col className={styles.text}>
                  <text>微信二维码</text>
                </Col>
                <Col>
                  <img src={tree} className={styles.image2}/>
                </Col>
              </Col>
              <Col span={8} className={styles.login4}>
                <Col >
                  <img  src={logo} className={styles.image3}/>
                </Col>
                <Col className={styles.text}>
                  <text>晋ICP备1232311号11</text>
                </Col>
                <Col className={styles.text}>
                  <text>客服专线：</text>
                  <text style={{fontSize:18}}>152316526152</text>
                </Col>
                <Col>
                  <text>人工服务时间：8：00-12：00</text>
                </Col>
                <Col>
                  <text>客服邮箱：sededa@se.com</text>
                </Col>
              </Col>
            </Row>
          </div>
        </div>

    )
  }
}

export default Foot
