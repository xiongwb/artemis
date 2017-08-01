/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react'
import { connect } from 'dva'
import plus from '../../assets/plus.png'
import {
  Form,
  Tabs,
  Table,
  Progress,
  Button,
  Spin
} from 'antd';

import styles from './riskTextQuestion.css'

import { browserHistory } from 'react-router'
import { message } from 'antd';
import COMMONCONFIG from '../../constant/common_config'
import { getLocalStorage } from '../../utils/helper'
import Storage from '../../utils/storage'

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;



function RiskTextQuestion({myRiskList, dispatch}) {

  const renderQuestions = ()=>{
    if(myRiskList.questionData==null){
      return <div></div>
    }else{
      let questions = myRiskList.questionData.riskTempDetVOList;
      let rows = [];
      let index = 1;//题目序号
      for(let i in questions){
        rows.push(
          <div key={'question'+i} className={styles.questionDiv}>
            <div className={styles.questionNameDiv}>
              <text className={styles.questionName}>{index+'、'+questions[i].riskquestionname}</text>
            </div>
            <div className={styles.answersDiv}>
              {renderAnswer(questions[i])}
            </div>
          </div>
        )
        index++;
      }
      rows.push(
        <div className={styles.btnDiv}>
          <Button type="primary" className={styles.submitBtn} onClick={submit}>提交</Button>
        </div>
      )
      return rows;
    }
  }

  const renderAnswer = (question)=>{
    let answerList = [];
    let answers = question.list;
    let obj = myRiskList.answer;
    for(let i in answers){
      if(obj!=null&&obj['type'+question.riskquestionno]==answers[i].riskanswertype){
        answerList.push(
          <div key={'answer'+i}>
            <a className={styles.selectedAnswer} onClick={()=>setAnswer(question,answers[i])}>{answers[i].riskanswertype+' '+answers[i].riskanswername}</a>
          </div>
        )
      }else{
        answerList.push(
          <div key={'answer'+i}>
            <a className={styles.unselectAnswer} onClick={()=>setAnswer(question,answers[i])}>{answers[i].riskanswertype+' '+answers[i].riskanswername}</a>
          </div>
        )
      }
    }
    return answerList
  }

  const setAnswer = (question,answer)=>{
    let obj = myRiskList.answer!=null?myRiskList.answer:{};
    obj['type'+question.riskquestionno] = answer.riskanswertype
    obj['score'+question.riskquestionno] = answer.riskanswerscore
    obj['name'+question.riskquestionno] = answer.riskanswername
    dispatch({
      type:'myRiskList/save',
      payload:{answer:obj}
    })
  }

  const submit = () =>{
    let questions = myRiskList.questionData.riskTempDetVOList;
    let count = 0;
    let flag = true;
    let newRiskEvaDetVOList = [];
    for(let i=0;i<questions.length;i++){
      let obj = myRiskList.answer!=null?myRiskList.answer:{};
      let keyType = 'type'+questions[i].riskquestionno;
      let option = obj[keyType];
      let keyScore = 'score'+questions[i].riskquestionno
      let score = parseInt(obj[keyScore]);
      let keyName = 'name'+questions[i].riskquestionno
      let answer = obj[keyName];
      if(option==null){
        flag = false;
        message.warning('请回答第'+(i+1)+'题');
        break;
      }else{
        count = count + score;
        newRiskEvaDetVOList.push({
          sn:questions[i].sn,
          quename:questions[i].riskquestionname,
          answopt:option,
          answer:answer,
          score:score
        })
      }
    }
    if(flag){
      let month = new Date().getMonth()+1;
      if(month.toString.length ==1){
          month= '0' + month;
      }
      let date=  new Date().getFullYear() + '-'+month+'-'+new Date().getDate();
      let telno = getLocalStorage(Storage.DID_LOGIN).retMsg;
      let params = {
        tenantno:COMMONCONFIG.tenantno,
        telno:telno,
        evadate:date,
        risktempid:myRiskList.risktempId,
        score:count,
        newRiskEvaDetVOListStr:JSON.stringify(newRiskEvaDetVOList)
      }
      console.log(params,'paramsparams')
      dispatch({
        type:'myRiskList/newRiskRcd',
        payload:params
      })
    }
  }

  return (
    <Spin spinning={myRiskList.loading}>
    <div className={styles.root} >
      <div className={styles.msgDiv}>
        <text className={styles.msg}>{myRiskList.remarks}</text>
      </div>
      <div className={styles.questionsDiv}>
        {renderQuestions()}
      </div>
      <div className={styles.alertDiv}>
        <text>如果不评估，您的风险承受能力将默认为安益型</text>
      </div>
    </div>
    </Spin>
  )
}

function mapStateToProps(state) {
  return {
    myRiskList: state.myRiskList,
  };
}


export default connect(mapStateToProps)(RiskTextQuestion)

