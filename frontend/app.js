import './app.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import store from 'store';

import {Console, Link} from './artui/react';

import {authRoutes} from  './components/auth';
import {cloudRoute} from './components/cloud';
import {settingsRoute} from './components/settings';
import {useCaseRoute} from './components/usecase/index';
import ProjectDetails from './components/cloud/monitoring/details';
import IncidentDetails from './components/cloud/incident-analysis/details';
import ProjectDataDetails from './components/cloud/project-data/details';
import UseCaseDetails from './components/usecase/details';
import Help from './components/help';
import AccountInfo from './components/account-info';

import apis from './apis';
const userInstructionJson = require('./userInstructions.json');

class App extends React.Component {
  static contextTypes = {
    userInfo: React.PropTypes.object,
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    dashboardDailySummaryReport: React.PropTypes.object
  };

  render() {
    let {
      userInfo,
      userInstructions,
      dashboardUservalues,
      dashboardDailySummaryReport
    } = this.context;

    let loading = !(_.keys(userInstructions).length > 0 && _.keys(dashboardUservalues).length > 0);
    //<Link to="/file" className="item">File Analysis</Link>

    return (
      <Console className={cx({'ui form loading': loading})}>
        <Console.Topbar logo={require('./images/logo.png')}>
          <Link to="/cloud" className="item">Dashboard</Link>
          <Link to="/settings" className="item">Settings</Link>
          <Link to="/usecase" className="item">Benchmarks</Link>
          <Link to="/help" className="item">Help</Link>
          <div className="right menu">
              <Link to="/account-info" className="item" title='Account Info'>
                <i className="user icon circular teal inverted"/>
                {userInfo.userName}
              </Link>
          </div>
        </Console.Topbar>
        {!loading && this.props.children}
      </Console>
    );
  }
}

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

// project Data Only Details
const projectDataOnlyApp = function (props) {
  let {location, params} = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')}/>
      <ProjectDataDetails location={location} params={params}/>
    </Console>
  );
};

// Use Case Details
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
      <Route component={Help} path="help"/>
      <Route component={AccountInfo} path="account-info"/>
    </Route>
    <Route component={liveMonitoringApp} path="/liveMonitoring"/>
    <Route component={projectDataOnlyApp} path="/projectDataOnly"/>
    <Route component={incidentAnalysisApp} path="/incidentAnalysis"/>
    <Route component={useCaseApp} path="/useCaseDetails"/>
    <Redirect from="*" to="/"/>
  </Router>
);

// TODO: Move loading data into App component, AppRoute is only used for authenticated check.
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
      userInstructions: userInstructionJson,
      dashboardUservalues: {},
      dashboardDailySummaryReport: {}
    }, ()=> {

      // Load data only when user login
      if (!(store.get('userName') && store.get('token'))) {
        return;
      }

      this.loadUserValues();
    });
  }

  parseJson(data, defval={}) {
    return !!data? JSON.parse(data) : defval;
  }
  
  loadUserValues() {
    var self = this;
    return new Promise((resolve, reject) => {
      apis.postJSONDashboardUserValues().then((result)=> {
        let resp = result.data;
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
            metaData: self.parseJson(info.metaData)
          });
        });
        this.setState({dashboardUservalues: resp}, ()=>resolve(this));
      });
    });
  }

  isAuthenticated() {
    // TODO: We need to check whether token is expired?
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