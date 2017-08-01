/**
 * Created by cyt on 2017/5/19.
 */

import React from 'react';


class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m:'',
      h:'',
      d:'',
      t:'',
      l:this.props.time,
    };
  }


  render() {
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
    if(this.state.l=0){
      history.go(0);
      this.state.l - 1
    }
    setTimeout(daojshi1,1000);
    return (
        <text>{this.state.h}:{this.state.d}:{this.state.t}</text>
    );
  }
}

export default Count;

