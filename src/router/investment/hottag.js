/**
 * Created by zhangle on 2017/5/7.
 */
import {
  Tag ,
  Row,
  Col,
} from 'antd';
import styles from './hottag.css'
const { CheckableTag } = Tag;

class HotTag extends React.Component {
  constructor(props){
    super(props);
    this.state={
      checked:this.props.zl
    }
  }

  handleChange() {
    if (this.state.checked== true ) {
    } else {
      this.setState({checked: true})
    }
    this.props.handleChange && this.props.handleChange()
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.keys!=nextProps.value){
      this.setState({checked:false})
    }
  }
    render (){
    console.log(this.state.checked)
      return (
          <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange.bind(this)}  className={styles.biaoq2}  >{this.props.children}</CheckableTag>
      )
    }

  }

export default HotTag
