/**
 * Created by zgx on 2017/5/20.
 */

import React from 'react'
import { connect } from 'dva'

import {
  Tabs,
  Table,
  Progress,
  Button,
  Row,
  Modal,
  message,
  Spin,
  Form,
  Select
} from 'antd';

import styles from './financing_record.css'
import StringUtils from'../../utils/string_utils'
import Date from '../../utils/date'

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;

const confirm = Modal.confirm;

class FinancingRecordClass extends React.Component {


  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.columns = [
      {title: '项目名称',className:styles.title, dataIndex: 'prdinfo.prdname',width: 50,key: 'prdname', },
      {title: '融资金额',className:styles.title, dataIndex: 'finsum', width: 50,  key: 'finsum',},
      {title: '融资日期',className:styles.title,  dataIndex: 'findate', width: 50,key: 'findate',},
      {title: '到期日期',className:styles.title,  dataIndex: 'expdate', width: 80,key: 'expdate', },
      {
        title: '状态', className:styles.title,key: 'operate1', width:50, render: (record) =>
        (<div>
          <Button className={styles.button1} disabled={record.finstatus==='9'?true:false} >{record.finstatus==1?'正常':record.finstatus==2?'逾期':'结清'}</Button>
        </div>)
      },
      {title: '协议合同', className:styles.title,key:'paidfee', width:50, render: (record) =>
        (<div>
          <Button  type="primary"  onClick={() =>this.protocol(record)}>查看</Button>
        </div>)
      },
      {
        title: '操作', className:styles.title,key: 'operate2', width:50, render: (record) =>
        (<div>
          <Button type="primary" className={styles.button2} onClick={()=>this.openRepayment(record.prdinfo.prdname,record.prdcode)} disabled={record.finstatus==='9'?true:false}>还款</Button>
        </div>)
      },
    ];
    const panes = [
      { title: '融资记录',
        content:
         <Table
              key={1}
              className={styles.table}
              columns={this.columns}
              dataSource={this.props.financingRecord.data.finRcdVOList}
              pagination={{pageSize: 10, total: 10}}

            />,
        key: '1' },
    ];
    this.date = Date.getDateWithoutTime();
    this.state = {
      activeKey: panes[0].key,
      panes,
      visible:false,
      repayMoney:'',
      moneyStr:'',

      visiblePayFee:false,
      feeTypeNameList:'',
      feeTypeList:'',
      feeType:1,
      feeSum:'',


      finpayrcdid:'',
      date:this.date,

      visiblePayAll:false,
      showPayTot:'',
      paytot:'',

      visibleApply:false,
      prdname:'',
      prdcode:'',
      payDue:'',
      payInt:'',
    };
  }


  onChange = (activeKey) => {
      this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  replyAll(prdcode,prdname){
    //1.登录验证
    //2.绑卡验证
    //3.判断是否已申请提前结清
    this.props.dispatch({type: 'financingRecord/prePayStatus', payload: {prdcode: prdcode}});
    let prePayStatus = this.props.financingRecord.prePayStatus;
    if(prePayStatus.retCode == 1){
      let showPayTot = StringUtils.moneyFormatData2Money(prePayStatus.map.paytot)
      //总共还款金额
      this.setState({
        paytot:prePayStatus.map.paytot,
        showPayTot:showPayTot,
        visiblePayAll:true,
        finpayrcdid:prePayStatus.map.finpayrcdid,
      })
    }else if(prePayStatus.retCode == -1){//未申请
      //需要提交申请
      this.setState({
        prdname:prdname,
        prdcode:prdcode,
        visibleApply:true,
      })
    }else if(prePayStatus.retCode == 0){//申请还未审批
      message.error(prePayStatus.retMsg);
    }


  }
  handleOkPayApply=()=>{
      let payDueApply=document.getElementById('payDueApply').value;
      let payIntApply=document.getElementById('payIntApply').value;
      let prdCode=this.state.prdcode;
    if(payDueApply == null || payDueApply == ""){
      message.error("提前还款本金不能为空！");
    }else  if(payIntApply == null || payIntApply == ""){
      message.error("提前还款利息不能为空！");
    }else  if(prdCode == null || prdCode == ""){
      message.error("产品代码不能为空！");
    }else{
      this.props.dispatch({type:'financingRecord/finPrePayApp',
                             payload: {
                                  prdCode:prdCode,
                                  payDue:payDueApply,
                                  payInt:payIntApply
                             }
                            });
      this.setState({
        visibleApply: false,
      });
    }
  }

  handleCancelPayApply= () => {
    this.setState({
      visibleApply: false,
    });
  }
  handleOkPayAll = () => {
    let tradePsdPayAll=document.getElementById('tradePsdPayAll').value;
    if(tradePsdPayAll == null || tradePsdPayAll == ""){
      message.error("交易密码不能为空！");
    }else{
        this.props.dispatch({type:'financingRecord/validateTranPswd',
                             payload: {transPswd: tradePsdPayAll,busiType:'T04', money:this.state.paytot},
                             finpayrcdid:{finpayrcdid:this.state.finpayrcdid}});
        this.setState({
          visiblePayAll: false,
        });
    }

  }

  handleCancelPayAll = () => {
    this.setState({
      visiblePayAll: false,
    });
  }
  //支付费用
  payFee(rowData){
    let finpayrcdid= '';
    if(rowData!= null && rowData != "" ){
       finpayrcdid = rowData.finpayrcdid;
    }
    //找支付费用类型
    this.props.dispatch({type:'financingRecord/getFeeType', payload: {dictCode:'FinFeeType'}});
    const feeTypeNameList = this.props.financingRecord.feeTypeNameList;
    const feeTypeList = this.props.financingRecord.feeTypeList;
    let feeSum  = "";
    if(finpayrcdid !=null && finpayrcdid != ""){
      //查询费用
      this.props.dispatch({type:'financingRecord/getSumFee', payload:{finpayrcdid:finpayrcdid}});
      feeSum = this.props.financingRecord.feeSum;
      if(feeSum == undefined || feeSum == "" || feeSum == null){
        feeSum = "0.00";
      }
    }else{
        feeSum = "0.00";
    }

    //console.log(feeTypeList,"支付类型是");
    this.setState({
      feeTypeNameList:feeTypeNameList,
      feeTypeList:feeTypeList,
      feeSum:feeSum,
      visiblePayFee:true,
    })
  }

  handleOkPayFee = () => {
    let tradePsdPayFee=document.getElementById('tradePsdPayFee').value;
    let date = document.getElementById("payDate").value;
    let feeType = this.state.feeType;
    let feeSum = this.state.feeSum;
    if(feeSum == 0.00 || feeSum == "" || feeSum == null){
       message.error("费用不能为空！");
    }else if(tradePsdPayFee == null || tradePsdPayFee == ""){
      message.error("交易密码不能为空！");
    }else{
        this.props.dispatch({type:'financingRecord/validateTranPswdPayfee', payload: {transPswd: tradePsdPayFee,busiType:'T04', money:this.state.feeSum},dataParams:{feeType:this.state.feeType,fee:this.state.feeSum}});
        this.setState({
          visiblePayFee: false,
        });
    }

  }
  handleCancelPayFee = () => {
    this.setState({
      visiblePayFee: false,
    });
  }
  //还款计划方法
  repamentMoney(rowData){

    let planPayDue = rowData.planpaydue!=null?rowData.planpaydue:0;
    let planPayInt = rowData.planpayint!=null?rowData.planpayint:0;
    let money = planPayDue + planPayInt;
    let moneyStr = StringUtils.moneyFormatData2Money(money);
     this.setState({
          moneyStr:moneyStr,
          repayMoney:money,
          finpayrcdid:rowData.finpayrcdid,
          visible: true,
        });

  }

  protocol (record){
    console.log(1111111)
    this.props.dispatch({ type: 'financingRecord/contget',
      payload: {
        rcdID:record.invrcdid,
        type:2
      }
    });
  };
  handleOk = () => {
    let tradePsd=document.getElementById('tradePsd').value;
    if(tradePsd == null || tradePsd == ""){
      message.error("交易密码不能为空！");
    }else{
        this.props.dispatch({type:'financingRecord/validateTranPswd',
                             payload: {transPswd: tradePsd,busiType:'T04', money:this.state.repayMoney},
                             finpayrcdid:{finpayrcdid:this.state.finpayrcdid}});
        this.setState({
          visible: false,
        });
    }

  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  //还款计划的列表
  newcolumns(){
    let newcolumns = [];
    return(
         newcolumns = [
          {title: '期次',className:styles.title, dataIndex: 'payorder',width: 50,key: 'payorder', },
          {title: '应还日期',className:styles.title, dataIndex: 'planpaydate', width: 50,  key: 'planpaydate',},
          {title: '应还本金',className:styles.title,  dataIndex: 'planpaydue', width: 50,key: 'planpaydue',},
          {title: '应还利息',className:styles.title,  dataIndex: 'planpayint', width: 80,key: 'planpayint', },
          {title: '状态', className:styles.title,key: 'operate1', width:50, render: (record) =>
            (<div>
              <Button className={styles.button1} >{record.paystatusname}</Button>
            </div>)
          },
           {title: '协议合同', className:styles.title,key:'paidfee', width:50, render: (record) =>
             (<div>
               <Button  type="primary"  onClick={() =>this.protocol(record)}>查看</Button>
             </div>)
           },
          {title: '操作', className:styles.title,key: 'operate2', width:150, render: (record) =>
            (
            <div className={styles.divNew}>
              <Row type="flex" justify="space-around">
                <Button type="primary" className={styles.button2} onClick={()=>this.repamentMoney(record)} >还款</Button>

                <Button type="primary" className={styles.button2} onClick={()=>this.payFee(record)} >支付费用</Button>
              </Row>
            </div>
            )
          },
    ]
    )
  }


  //打开新的标签页，显示还款计划
  openRepayment (prdname,prdcode) {
    //通过产品code获取每一个产品的还款列表
    //alert(prdcode);
    this.props.dispatch({type: 'financingRecord/repaymentList', payload: {prdcode: prdcode}});
    //得到返回的数据
    const dataSource2 = this.props.financingRecord.repaymentList;
      console.log(this.props.financingRecord.repaymentList,777777777777)
    //console.log("返回的还款计划是dataSource2：",dataSource2);
    if(dataSource2.length>0){
        //alert(456)
        let list = dataSource2;
        let num = 0;
        for(let i in list){
          if(list[i].isallowpay=='1'){//可还款
            num = num + 1;
          }
        }
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: `${prdname}的还款计划`,
                    content:

                                <div>
                                  <Row type="flex"  justify="space-around" align="top">
                                    <div style={{width:650}}></div>
                                    <Button type="primary" className={styles.button2} onClick={()=>this.replyAll(prdcode,prdname)} >提前结清</Button>
                                    <Button type="primary" className={styles.button2} onClick={()=>this.payFee()} >支付费用</Button>
                                  </Row>
                                  <Table
                                    key={2}
                                    className={styles.table}
                                    columns={this.newcolumns()}
                                    dataSource={dataSource2}
                                    pagination={{pageSize: 10, total: 10}}
                                    />
                                </div>


                    ,
                    key: activeKey });
        this.setState({ panes, activeKey });
    }
  }

  //关闭tabs，忽略第一个
  remove = (targetKey) => {

    let activeKey = this.state.activeKey;
    let lastIndex;
    if(activeKey !=1){ //忽略第一个
       this.state.panes.forEach((pane, i) => {
       if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
  }
  //显示选项
  addOptions(){
    let options=[];
    let feeTypeNameList =  this.state.feeTypeNameList;
    if(feeTypeNameList.length>0){
      for(let i = 0;i<feeTypeNameList.length;i++){
        options.push(
          <Option key={i} value={i}>{feeTypeNameList[i]}</Option>
        )
      }

      return options;
    }
  }
  setFeeType(value,option){
    console.log(option,'value是');
    let feeTypeNameList =  this.state.feeTypeNameList;
    let valueName = '';
    for(let i = 0;i<feeTypeNameList.length;i++){
      if(value == i){
        valueName = feeTypeNameList[i];
        break;
      }
    }
    let dictkey = '';
    for(let i in this.state.feeTypeList){
      if(this.state.feeTypeList[i].dictvalue==valueName){
        dictkey = this.state.feeTypeList[i].dictkey
      }
    }
    this.setState({
      feeType:dictkey,
    })

  onChangeInput = (e) => {

    this.setState({
      feeSum: e.target.value,
    });
  };
  }
  render() {

  const {financingRecord} = this.props;
  const dataSource1 =financingRecord.data.finRcdVOList;
    // 融资协议，点击确定，调用这个方法，把visible传入到models里面
    const handleOk1=()=>{
      this.props.dispatch({ type: 'financingRecord/save',
        payload: {
          visible: false
        } });

    };
    // 融资协议，点击取消，调用这个方法，把visible传入到models里面
    const handleCancel1=()=>{
      this.props.dispatch({ type: 'financingRecord/save',
        payload: {
          visible: false
        } });
    };
  return (
    <div>
      {/*融资协议的窗口*/}
      <Modal
        onOk={handleOk1}
        onCancel={handleCancel1}
        title={financingRecord.protocol.protocoltitle} visible={financingRecord.visible}
      >
        {financingRecord.cont}
      </Modal>
      <Modal title="提前还款申请" visible={this.state.visiblePayAll}
          onOk={this.handleOkPayApply} onCancel={this.handleCancelPayApply}
          okText="申请" cancelText="取消"
        >
        <div>
           <Row type='flex' justify="space-around" align="middle" >
            <text >申请产品：</text>
            <input id="prdnameApply" size="small" value={this.state.prdname} ></input>
          </Row>
          <Row type='flex' justify="space-around" align="middle" >
            <text >提前还款本金：</text>
            <input id="payDueApply" size="small" value={this.state.payDue}  onChange={(e)=>this.setState({payDue: e.target.value})}></input>
          </Row>
           <Row type='flex' justify="space-around" align="middle" >
            <text >提前还款利息：</text>
            <input id="payIntApply" size="small" value={this.state.payInt}  onChange={(e)=>this.setState({payInt: e.target.value})}></input>
          </Row>
        </div>
      </Modal>
      <Modal title="提前结清" visible={this.state.visiblePayAll}
          onOk={this.handleOkPayAll} onCancel={this.handleCancelPayAll}
          okText="确定" cancelText="取消"
        >
        <div>
          <Row type='flex' justify="space-around" align="top" >
            <text >您的全部还款金额为{this.state.showPayTot}</text>
          </Row>
          <Row type='flex' justify="space-around" align="middle" >
            <input id="tradePsdPayAll" type="password" placeholder="请输入交易密码" ></input>
          </Row>
        </div>
      </Modal>
      <Modal title="确认支付佣金" visible={this.state.visiblePayFee}
          onOk={this.handleOkPayFee} onCancel={this.handleCancelPayFee}
          okText="确定" cancelText="取消"
        >
        <div>
          <Row type='flex' justify="space-around" align="top" >
            <text >支付日期：</text>
            <input id="payDate" size="small" value={this.state.date} ></input>
          </Row>
          <Row type='flex' justify="space-around" align="top" >
            <text >费用类型：</text>
            <Select
              defaultValue="平台佣金"
              style={{ width: 100 }}
              onSelect={(value,option)=>this.setFeeType(value,option)}
            >
              {this.addOptions()}
            </Select>
          </Row>
           <Row type='flex' justify="space-around" align="top" >
            <text >费   用：</text>
            <input id="feeSum" size="small" value={this.state.feeSum} onChange={(e)=>this.setState({feeSum: e.target.value})}></input>
          </Row>
          <Row type='flex' justify="space-around" align="middle" >
            <input id="tradePsdPayFee" type="password" placeholder="请输入交易密码" ></input>
          </Row>
        </div>

      </Modal>
      <Modal title="验证密码" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          okText="确定" cancelText="取消"
        >
        <div>
          <Row type='flex' justify="space-around" align="top" >
            <text >您本期还款金额为{this.state.moneyStr}</text>
          </Row>
          <Row type='flex' justify="space-around" align="middle" >
            <input id="tradePsd" type="password" placeholder="请输入交易密码" ></input>
          </Row>
        </div>

      </Modal>

      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
      </Tabs>
    </div>
  );
}
}




function FinancingRecord({financingRecord, dispatch}) {

  if (financingRecord.data.length === 0) {
    return (<div ></div>)
  }


  return (
      <div className={styles.root} >
          <FinancingRecordClass  dispatch={dispatch}  financingRecord={financingRecord}></FinancingRecordClass>
      </div>
  )
}

function mapStateToProps(state) {
  return {
    financingRecord: state.financingRecord,
  };
}


export default connect(mapStateToProps)(FinancingRecord)

