import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router'

// 1. Initialize
const app = dva({
  history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/login/login'));
app.model(require('./models/account/personal_info'));
app.model(require('./models/account/investment_record'));
app.model(require('./models/account/financing_record'));
app.model(require('./models/account/recharge_assembly'));
app.model(require('./models/account/withdrawals_assembly'));
app.model(require('./models/account/security'));
app.model(require('./models/account/overview'));
app.model(require('./models/account/bank_list_assembly'));
app.model(require('./models/account/leftContent'));
app.model(require('./models/home/home'));
app.model(require('./models/loan/loan'));
app.model(require('./models/account/myRiskList'));
app.model(require('./models/investment/investment'));
app.model(require('./models/bid/bid'));
app.model(require('./models/register/register'));
app.model(require('./models/register/setuppwd'));
app.model(require('./models/login/forgotpwd'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
