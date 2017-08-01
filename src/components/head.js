import React from 'react'
import styles from './head.css'
import { Menu,
  Row,
  Col,
  Popover,
  Form,
  Button,
  Span
} from 'antd';
import { Link } from 'react-router'
import { connect } from 'dva';
import bankLogo from '../assets/logo04.png'
import weixin from '../assets/003.png'
import { getLocalStorage } from '../utils/helper'
import Storage from '../utils/storage'
class Headerfrom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current: 'mail',
    }
  }

  handleClick(e) {
    this.setState({ current: e.key })
  }


  render() {
    const{home}=this.props;
    const content = (
      <div>
        <img src={weixin} />
      </div>
    );
    const onClick=()=>{
      console.log(11111)
      this.props.dispatch({
        type: 'home/Signout',
        payload: {
        },
      });
    };


    const dengl=()=>{
        if(getLocalStorage(Storage.DID_LOGIN) != null){
          return(
          <div>
            <text className={styles.text}>{getLocalStorage(Storage.DID_LOGIN).retMsg}</text>
            <span className={styles.text} onClick={()=>onClick()}>退出登录</span>
            <text className={styles.text}>帮助中心</text>
          </div>

          )
        }else {
          return(
            <div>
              <text className={styles.text}><Link to="/login">立即登录</Link></text>
              <text className={styles.textb}><Link to="/register">免费注册</Link></text>
              <text className={styles.text}>帮助中心</text>
            </div>
          )
        }
      }
    return (
      <div className={styles.head}>
        <div style={{height:40,backgroundColor:'gray'}}>
          <Row className={styles.sol1}>
            <Col span={4} >
              <text className={styles.h3}>客服电话：</text>
              <text className={styles.h3}>13109275678</text>
            </Col>
            <Col span={1}>
              <Popover content={content}>
                <text className={styles.h3}>微信</text>
              </Popover>
            </Col>
            <Col span={1} >
              <h3 className={styles.h3}></h3>
            </Col>
            <Col span={8}  offset={10} className={styles.sol2}>
              {dengl()}
            </Col>
          </Row>
        </div>
        <div className={styles.push}>
          <Row className={styles.sol3}>
            <Col span={11} className={styles.push1}>
              <img src={bankLogo} className={styles.logo}/>
            </Col>
            <Col span={13} className={styles.push2}>
              <Menu
                onClick={this.handleClick.bind(this)}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className={styles.Menu}
              >
                <Menu.Item key="mail"  className={styles.Menu2}><Link to="/">首页</Link></Menu.Item>
                <Menu.Item key="app" className={styles.Menu1}><Link to="/investment">我的投资</Link></Menu.Item>
                <Menu.Item key="alipa" className={styles.Menu1}><Link to="/loan" >我要借款</Link></Menu.Item>
                <Menu.Item key="alip" className={styles.Menu1}>
                  <Link to="/myaccount" >账户中心</Link></Menu.Item>
                <Menu.Item key="ali" className={styles.Menu1}><Link to="/secure">安全保障</Link></Menu.Item>
              </Menu>
            </Col>
          </Row>
        </div>

      </div>
    )
  }
}

const HForm = Form.create()(Headerfrom);
function Head({home,dispatch}) {


    return (
      <div>
        <HForm dispatch={dispatch}  home={home}/>
      </div>
    )
  }
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}
export default connect(mapStateToProps)(Head)
