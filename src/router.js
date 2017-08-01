import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'dva/router';
import App from './router/app';
import Home from './router/home/home';
import Register from './router/login/register';
import Investment from './router/investment/investment';
import Loan from './router/loan/loan';
import Bid from './router/bid/bid';
import MyAccount from './router/account/myaccount';
import Password from './router/login/password';
import FinishRegister from './router/login/finish_register';
import Login from './router/login/login';
import Secure from './router/secure/secure';
import Overview from './router/account/overview';
import PersonalInfo from './router/account/personal_info';
import Security from './router/account/security';
import BankList from './router/account/bank_list';
import Withdrawals from './router/account/withdrawals';
import Recharge from './router/account/recharge';
import FinancingRecord from './router/account/financing_record';
import InvestmentRecord from './router/account/investment_record';
import MyRiskList from './router/account/myRiskList';
import RiskTextQuestion from './router/account/riskTextQuestion';
import Forgotpwd from './router/login/forgotpwd';
import Setuppwd from './router/login/setuppwd';
import Mygiftbag from './router/mygiftbag/mygiftbag';
import MygiftbagHistory from './router/mygiftbag/mygiftbag_history';
import NotFoundPage from './router/eror';

// const registerModel = (app, model) => {
//   if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
//     app.model(model)
//   }
// }

// const RouterConfig = function ({ history, app }) {
//   const routes = [
//     {
//       path: '/',
//       component: App,
//       getIndexRoute (nextState, cb) {
//         require.ensure([], require => {
//           registerModel(app, require('./models/home/home'))
//           cb(null, { component: require('./router/home/home') })
//         }, 'home')
//       },
//       childRoutes: [

//         {
//           path: '/register',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               registerModel(app, require('./models/register/register'))
//               cb(null, require('./router/login/register'))
//             }, 'register')
//           },
//         },

//         {
//           path: '/password',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               registerModel(app, require('./models/register/register'))
//               cb(null, require('./router/login/password'))
//             }, 'password')
//           },
//         },

//         {
//           path: '/finishregister',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               cb(null, require('./router/login/finish_register'))
//             }, 'finishregister')
//           },
//         },

//         {
//           path: '/login',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               registerModel(app, require('./models/login/login'))
//               cb(null, require('./router/login/login'))
//             }, 'login')
//           },
//         },

//         {
//           path: '/investment',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               registerModel(app, require('./models/investment/investment'))
//               cb(null, require('./router/investment/investment'))
//             }, 'investment')
//           },
//         },

//         {
//           path: '/loan',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               registerModel(app, require('./models/loan/loan'))
//               cb(null, require('./router/loan/loan'))
//             }, 'loan')
//           },
//         },

//         {
//           path: '/secure',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               cb(null, require('./router/secure/secure'))
//             }, 'secure')
//           },
//         },


 /*       {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./router/eror'))
            }, 'error')
          },
        },*/

//         {
//           path: '/bid',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               registerModel(app, require('./models/bid/bid'))
//               cb(null, require('./router/bid/bid'))
//             }, 'bid')
//           },
//         },


//         {
//           path: '/confirm',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               cb(null, require('./router/bid/confirm_bid'))
//             }, 'confirm')
//           },
//         },

//         {
//           path: '*',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               cb(null, require('./router/eror'))
//             }, 'error')
//           },
//         },
//         {
//           path: '/myaccount',
//           component: MyAccount,
//           onEnter: (_, replaceState) => replaceState(null, "/myaccount/overview"),
//           childRoutes:[
//             {
//               path: '/myaccount/overview',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   registerModel(app, require('./models/account/overview'))
//                   cb(null, require('./router/account/overview'))
//                 }, 'myaccount-overview')
//               },
//             },
//             {
//               path: '/myaccount/personalinfo',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   registerModel(app, require('./models/account/personal_info'))
//                   cb(null, require('./router/account/personal_info'))
//                 }, 'myaccount-personalinfo')
//               },
//             },

//             {
//               path: '/myaccount/security',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   registerModel(app, require('./models/account/security'))
//                   cb(null, require('./router/account/security'))
//                 }, 'myaccount-security')
//               },
//             },


//             {
//               path: '/myaccount/banklist',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   cb(null, require('./router/account/bank_list'))
//                 }, 'myaccount-banklist')
//               },
//             },

//             {
//               path: '/myaccount/recharge',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   cb(null, require('./router/account/recharge'))
//                 }, 'myaccount-recharge')
//               },
//             },

//             {
//               path: '/myaccount/withdrawals',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   cb(null, require('./router/account/withdrawals'))
//                 }, 'myaccount-withdrawals')
//               },
//             },

//             {
//               path: '/myaccount/financing_record',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   registerModel(app, require('./models/account/financing_record'))
//                   cb(null, require('./router/account/financing_record'))
//                 }, 'myaccount-financing_record')
//               },
//             },

//             {
//               path: '/myaccount/investment_record',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   registerModel(app, require('./models/account/investment_record'))
//                   cb(null, require('./router/account/investment_record'))
//                 }, 'myaccount-investment_record')
//               },
//             },

//             {
//               path: '/myaccount/myRiskList',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   registerModel(app, require('./models/account/myRiskList'))
//                   cb(null, require('./router/account/myRiskList'))
//                 }, 'myaccount-myRiskList')
//               },
//             },

//             {
//               path: '/myaccount/riskTextQuestion',
//               getComponent (nextState, cb) {
//                 require.ensure([], require => {
//                   cb(null, require('./router/account/riskTextQuestion'))
//                 }, 'myaccount-riskTextQuestion')
//               },
//             },

//           ],

//         },

//       ],
//     },
//   ]

//   return <Router history={history} routes={routes} />
// }

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/password" component={Password} />
        <Route path="/finishregister" component={FinishRegister} />
        <Route path="/login" component={Login} />
        <Route path="/investment" component={Investment} />
        <Route path="/loan" component={Loan} />
        <Route path="/secure" component={Secure} />
        <Route path="/forgotpwd" component={Forgotpwd} />
        <Route path="/bid" component={Bid} />
        <Route path="/mygiftbag" component={Mygiftbag} />
        <Route path="/mygiftbag/history" component={MygiftbagHistory}/>
        <Route path="/setuppwd" component={Setuppwd} />
        <Route path="/myaccount" component={MyAccount}>
          <IndexRoute component={Overview} />
          <Route path="/myaccount/personalinfo" component={PersonalInfo} />
          <Route path="/myaccount/security" component={Security} />
          <Route path="/myaccount/banklist" component={BankList} />
          <Route path="/myaccount/recharge" component={Recharge} />
          <Route path="/myaccount/withdrawals" component={Withdrawals} />
          <Route path="/myaccount/financing_record" component={FinancingRecord} />
          <Route path="/myaccount/investment_record" component={InvestmentRecord} />
          <Route path="/myaccount/myRiskList" component={MyRiskList} />
          <Route path="/myaccount/riskTextQuestion" component={RiskTextQuestion} />
        </Route>
        <Route path="/404" component={NotFoundPage} />
        {/* 如果都不匹配，重定向到 404 */}
        <Redirect from="*" to="/404" />
      </Route>
    </Router>
  );
}
export default RouterConfig;

