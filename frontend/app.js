import './app.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, useRouterHistory, IndexRoute, IndexRedirect} from 'react-router';
import { createHashHistory } from 'history'
import { Console, Link } from './artui/react';

import {cloudRoute} from './components/cloud';
import {Settings} from './components/settings';
import apis from './apis';


const EmptyContent = function(props) {
  return (
    <Console.Content style={{height: 1000}}>Hello Insightfinder!</Console.Content>
  )
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        userInstructions: {},
        dashboardUservalues: {},
        dashboardDailySummaryReport: {}
    }
  }

  componentDidMount() {
      apis.getUserInstructions().then((resp)=>{
          this.setState({userInstructions: resp});
      });
      apis.postDashboardUserValues().then((resp)=>{
          this.setState({dashboardUservalues: resp});
      });
      apis.postDashboardDailySummaryReport().then((resp)=>{
          this.setState({dashboardDailySummaryReport: resp});
      });
  }

  static childContextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    dashboardDailySummaryReport: React.PropTypes.object
  };

  getChildContext() {
      let {
          userInstructions,
          dashboardUservalues,
          dashboardDailySummaryReport
      } = this.state;
      return {
          userInstructions,
          dashboardUservalues,
          dashboardDailySummaryReport
      }
  }

  render() {
      return (
        <Console>
          <Console.Topbar logo={require('./images/logo.png')}>
            <Link to="/cloud" className="item">Cloud Monitoring</Link>
            <Link to="/settings" className="item">Project Settings</Link>
            <Link to="/file" className="item">File Analysis</Link>
            <div className="right menu">
              <div className="ui right simple dropdown item">
                <i className="user icon circular teal inverted" />
                Guest
                <i className="dropdown icon"/>
                <div className="menu">
                  <div className="item">
                    <i className="icon power"/>Logout
                  </div>
                </div>
              </div>
            </div>
          </Console.Topbar>
          {this.props.children}
        </Console>
      );
  }
}

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

$('body').prepend($('<div id="app"></div>'));
ReactDOM.render((
  <Router history={appHistory}>
    <Route component={App} path="/">
      <IndexRedirect to="/cloud" />
      {cloudRoute}
      <Route component={Settings} path="settings" >
        <IndexRoute component={EmptyContent} />
      </Route>
    </Route>
  </Router>
), document.querySelector('#app'));
