/**
 * Created by Tinklin on 2017/5/9.
 */
import React from 'react'
import { connect } from 'dva'
import styles from './secure.css'
import { Row,Col } from 'antd';
import { Link } from 'react-router'

import Secure1 from '../../assets/secure01.png';
import Secure2 from '../../assets/secure02.png';
import Secure3 from '../../assets/secure03.png';

function Secure() {

  return (
    <div>
      <div className={styles.background} />
      <div className={styles.root}>
        <div className={styles.whiteDiv}>
          <h1>真实透明</h1>
          <Row style={{marginTop:50}}>
            <Col span={8}>
              <h3>资金流转信息透明</h3>
              <p>投资后，资金的所有流转使用信息都可查，项目将真实的信息透明化，投资人也将拥有最完整的知情权</p>
              <h3>融资人信息公开透明</h3>
              <p>所有尽职调查信息都会被公开，投资人在投资前就能对项目有100%的掌握</p>
            </Col>
            <Col span={8} offset={8}>
              <img src={Secure1} style={{width:318,height:231}} />
            </Col>
          </Row>
          <h1>专业的技术保障</h1>
          <Row style={{marginTop:50}}>
            <Col span={8}>
              <img src={Secure2} style={{width:336,height:329}} />
            </Col>
            <Col span={8} offset={8}>
              <h3>"金融级"交易平台系统</h3>
              <p>自主研发系统，确保平台运营、维护高效便捷。平台系统银行级别七层安全防护，确保出接人个人信息及资金安全</p>
              <h3>系统加密保护技术</h3>
              <p>平台采用领先的SSL系统加密及保护技术，服务器24小时监控，实时备份，保护用户在账户中存储的个人信息，账户信息以及出借记录安全</p>
              <h3>用户隐私保护</h3>
              <p>严格遵守国家相关法律法规，对用户的个人信息进行保护。未经用户的同意，不会向任何第三方公司、组织或个人披露个人信息、账户信息以及交易信息。借款人严重逾期的情况除外。</p>
            </Col>
          </Row>
          <h1>合法、合规更长远</h1>
          <Row style={{marginTop:50}}>
            <Col span={8}>
              <h3>关于借款双发关系的合法性</h3>
              <p>《合同法》允许自然人之间发生借贷关系，并允许出借方到期可以收回本金和符合法律规定的收益</p>
              <h3>关于居间撮合服务的合法性</h3>
              <p>根据《合同法》第二十三章第四百二十四条的相关规定，冠盈财富作为合法设立的网络借贷服务平台，通过债权转让模式，提供撮合服务，并收取相应报酬，有着明确的法律依据。</p>
              <h3>关于和信贷电子合同的法律效力</h3>
              <p>依据《合同法》第十一条法律规定可知，电子合同是我国法律明确认可的一种书面合同形式，效力等同于传统的纸质合同。</p>
            </Col>
            <Col span={8} offset={8}>
              <img src={Secure3} style={{width:313,height:317}} />
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.background} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
  };
}

export default connect()(Secure)
