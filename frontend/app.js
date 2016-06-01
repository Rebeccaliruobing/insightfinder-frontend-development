import './app.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, 
  useRouterHistory, IndexRoute, IndexRedirect} from 'react-router';
import {createHashHistory} from 'history'
import store from 'store';

import {Console, Link} from './artui/react';

import Login from './components/auth/login'
import {cloudRoute} from './components/cloud';
import {settingsRoute} from './components/settings';
import ProjectDetails from './components/cloud/monitoring/details';
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

// Live Monitoring project detail page
const liveMonitoringApp = function(props) {
  let {location, params} = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')} />
      <ProjectDetails location={location} params={params} />
    </Console>
  );
};

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});
const routes = (
  <Router history={appHistory}>
    <Route component={App} path="/">
      <IndexRedirect to="/cloud"/>
      {cloudRoute}
      {settingsRoute}
    </Route>
    <Route component={liveMonitoringApp} path="/liveMonitoring"/>
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
    dashboardDailySummaryReport: React.PropTypes.object
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
      dashboardDailySummaryReport
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    // Load data only when user login
    if (!(store.get('userName') && store.get('token'))) {
      return;
    }

    apis.getUserInstructions().then((resp)=> {
      this.setState({userInstructions: resp});
    });
    
    apis.postDashboardUserValues(store.get('userName')).then((resp)=> {
      
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
      
      this.setState({dashboardUservalues: resp});
    });
    
    // apis.postDashboardDailySummaryReport(store.get('userName')).then((resp)=> {
    //   this.setState({dashboardDailySummaryReport: resp});
    // });
  }


  handleLoginSuccess(userinfo) {
    store.set('userInfo', userinfo);
    this.setState({userInfo: userinfo}, this.loadData.bind(this));
  }

  render() {
    if (store.get('userName') && store.get('token')) {
      return routes;
    } else {
      return (
        <div className="auth ui middle center aligned container">
          <div>
            <Login onSuccess={this.handleLoginSuccess.bind(this)}/>
          </div>
        </div>
      );
    }
  }
}

$('body').prepend($('<div id="app"></div>'));
ReactDOM.render(<AppRoute/>, document.querySelector('#app'));
