import React from 'react'
import { connect } from 'dva'

import eror from '../assets/404_02.png'
import back from '../assets/back.png'
import { browserHistory } from 'react-router'
function Eror() {


  const  onClick=()=>{
    browserHistory.push('/');
  };
    // this.browserRedirect();
    return (
      <div >
        <div onClick={onClick} style={{marginLeft:'32%',marginTop:'4%',position:'relative',backgroundImage:`url(${eror})`,height:475,width:541}}>
          <img src={back} style={{ position:'absolute',left:120,top:293}}/>
        </div>
      </div>
    )
}


export default connect()(Eror)
