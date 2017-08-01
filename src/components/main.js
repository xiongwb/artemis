import React from 'react'
import Head from './head'
import Foot from './foot'
import styles from './main.css'

class Main extends React.Component {

  render() {
    return (
      <div>
        <div className={styles.header} style={{width:document.body.clientWidth,minWidth:1200}}>
          <Head />
        </div>
        <div className={styles.content} style={{width:document.body.clientWidth,minHeight:400,minWidth:1200}}>
          {this.props.children}
        </div>
        <div style={{width:document.body.clientWidth,minWidth:1200}}>
          <Foot/>
        </div>
      </div>
    );
  }
}

export default Main
