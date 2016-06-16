import './app.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router, Route, browserHistory,
  IndexRoute, IndexRedirect, Redirect
} from 'react-router';
import store from 'store';

import {Console, Link} from './artui/react';

import {cloudRoute} from './components/cloud/index';
import {settingsRoute} from './components/settings/index';
import {useCaseRoute} from './components/usecase/index';
import ProjectDetails from './components/cloud/monitoring/details';
import IncidentDetails from './components/cloud/incident-analysis/details';
import UseCaseDetails from './components/usecase/details';
import {Login, Signup, SignupSecond, ForgotPassword, ForgotUsername} from './components/auth';

import apis from './apis';

class App extends React.Component {
  static contextTypes = {
    userInfo: React.PropTypes.object,
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    dashboardDailySummaryReport: React.PropTypes.object
  };

  handleLogoff() {
    store.remove('userInfo');
    store.remove('userName');
    store.remove('token');
    // store.clear();
    window.location.reload();
  }

  render() {
    let {
      userInfo,
      userInstructions,
      dashboardUservalues,
      dashboardDailySummaryReport
    } = this.context;

    let loading = !(_.keys(userInstructions).length > 0 && _.keys(dashboardUservalues).length > 0);

    return (
      <Console className={cx({'ui form loading': loading})}>
        <Console.Topbar logo={require('./images/logo.png')}>
          <Link to="/cloud" className="item">Cloud Monitoring</Link>
          <Link to="/settings" className="item">Project Settings</Link>
          <Link to="/usecase" className="item">Use Cases</Link>
          <Link to="/file" className="item">File Analysis</Link>
          <div className="right menu">
            <div className="ui right simple dropdown item">
              <i className="user icon circular teal inverted"/>
              {userInfo.userName}
              <i className="dropdown icon"/>
              <div className="menu">
                <div className="item" onClick={this.handleLogoff.bind(this)}>
                  <i className="icon power"/>Logout
                </div>
              </div>
            </div>
          </div>
        </Console.Topbar>
        {!loading && this.props.children}
      </Console>
    );
  }
}

const AuthApp = function(props) {
  return (
    <div className="auth ui middle center aligned container">
      <div>
        {props.children}
      </div>
    </div>
  )
};

// Live Monitoring project detail page
const liveMonitoringApp = function (props) {
  let {location, params} = props;
  return (
    <ProjectDetails location={location} params={params}/>
  );
};

// Incident Analysis Details
const incidentAnalysisApp = function (props) {
  let {location, params} = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')}/>
      <IncidentDetails location={location} params={params}/>
    </Console>
  );
};

// Incident Analysis Details
const useCaseApp = function (props) {
  let {location, params} = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')}/>
      <UseCaseDetails location={location} params={params}/>
    </Console>
  );
};

const routes = (
  <Router history={browserHistory}>
    <Route component={App} path="/">
      <IndexRedirect to="/cloud"/>
      {cloudRoute}
      {settingsRoute}
      {useCaseRoute}
    </Route>
    <Route component={Login} path="/login"/>
    <Route component={Signup} path="/signup"/>
    <Route component={SignupSecond} path="/signup2"/>
    <Route component={ForgotPassword} path="/forgotPassword"/>
    <Route component={ForgotUsername} path="/forgotUsername"/>
    <Route component={liveMonitoringApp} path="/liveMonitoring"/>
    <Route component={incidentAnalysisApp} path="/incidentAnalysis"/>
    <Route component={useCaseApp} path="/useCaseDetails"/>
  </Router>
);

const authRoutes = (
  <Router history={browserHistory}>
    <Route component={AuthApp} path="/">
      <IndexRedirect to="/login"/>
      <Route component={Login} path="/login"/>
      <Route component={Signup} path="/signup"/>
      <Route component={SignupSecond} path="/signup2"/>
      <Route component={ForgotPassword} path="/forgotPassword"/>
      <Route component={ForgotUsername} path="/forgotUsername"/>
      <Redirect from="*" to="/login" />
    </Route>
  </Router>
);

class AppRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: store.get('userInfo'),
      userName: store.get('userName'),
      token: store.get('token'),
      userInstructions: {},
      dashboardUservalues: {},
      dashboardDailySummaryReport: {}
    }
  }

  static childContextTypes = {
    userInfo: React.PropTypes.object,
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    dashboardDailySummaryReport: React.PropTypes.object,
    root: React.PropTypes.object
  };

  getChildContext() {
    let {
      userInfo,
      userInstructions,
      dashboardUservalues,
      dashboardDailySummaryReport
    } = this.state;
    return {
      userInfo,
      userInstructions,
      dashboardUservalues,
      dashboardDailySummaryReport,
      root: {
        loadData: this.loadData.bind(this),
        loadUserValues: this.loadUserValues.bind(this)
      }
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      userInstructions: {},
      dashboardUservalues: {},
      dashboardDailySummaryReport: {}
    }, ()=> {

      // Load data only when user login
      if (!(store.get('userName') && store.get('token'))) {
        return;
      }

      apis.getUserInstructions().then((resp)=> {
        this.setState({userInstructions: resp});
      });
      this.loadUserValues();
    });
  }

  loadUserValues() {
    return new Promise((resolve, reject) => {
      apis.postDashboardUserValues().then((resp)=> {

        resp.dataAllInfo = JSON.parse(resp.dataAllInfo);
        resp.extServiceAllInfo = JSON.parse(resp.extServiceAllInfo);
        resp.incidentAllInfo = JSON.parse(resp.incidentAllInfo);
        resp.projectModelAllInfo = JSON.parse(resp.projectModelAllInfo);
        resp.projectSettingsAllInfo = JSON.parse(resp.projectSettingsAllInfo);
        resp.publishedDataAllInfo = JSON.parse(resp.publishedDataAllInfo);

        resp.projectSettingsAllInfo = resp.projectSettingsAllInfo.map((info)=> {
          return Object.assign({}, info, {
            metricSettings: JSON.parse(info.metricSettings)
          });
        });

        resp.publishedDataAllInfo = resp.publishedDataAllInfo.map((info)=> {
          return Object.assign({}, info, {
            metaData: JSON.parse(info.metaData)
          });
        });
        this.setState({dashboardUservalues: resp}, ()=>resolve(this));
      });
    });
  }


  handleLoginSuccess(userinfo) {
    store.set('userInfo', userinfo);
    this.setState({userInfo: userinfo}, this.loadData.bind(this));
  }
  
  isAuthenticated() {
    return store.get('userName') && store.get('token');
  }

  render() {
    if (this.isAuthenticated()) {
      return routes;
    } else {
      return authRoutes;
    }
  }
}

$('body').prepend($('<div id="app"></div>'));
ReactDOM.render(<AppRoute/>, document.querySelector('#app'));
