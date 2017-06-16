import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';
import store from 'store';
import _ from 'lodash';
import { autobind } from 'core-decorators';
import './app.less';
import type { State } from './src/common/types';
import { hideAppLoader } from './src/common/app/actions';
import { Console } from './artui/react';
import { authRoutes } from './components/auth';
import { cloudRoute } from './components/cloud';
import { logRoute } from './components/log';
import { settingsRoute } from './components/settings';
import { useCaseRoute } from './components/usecase/index';
import { fileTabsRoute } from './components/filetabs/index';
import ProjectDetails from './components/cloud/monitoring/details';
import FileDetails from './components/cloud/monitoring/files';
import FileDetectionDetails from './components/cloud/monitoring/filedetection';
import IncidentDetails from './components/cloud/incident-analysis/details';
import IncidentLogDetails from './components/log/incident-log-analysis/log-details';
import ProjectDataDetails from './components/cloud/project-data/details';
import UseCaseDetails from './components/usecase/details';
import ExecutiveDashboard from './containers/executive-dashboard';
import Help from './components/help';
import AccountInfo from './components/account-info';
import apis from './apis';
import { SinglePage } from './src/web/app/components';

const userInstructionJson = require('./userInstructions.json');

class AppCore extends React.Component {
  static childContextTypes = {
    userInfo: React.PropTypes.object,
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    root: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    let dashboardUservalues = {};
    if (props.dashboardUservalues) {
      dashboardUservalues = this.convertUservalues(props.dashboardUservalues);
    }

    this.state = {
      userInfo: store.get('userInfo'),
      userName: store.get('userName'),
      token: store.get('token'),
      userInstructions: userInstructionJson,
      dashboardUservalues,
    };
  }

  getChildContext() {
    const {
      userInfo,
      userInstructions,
      dashboardUservalues,
    } = this.state;
    return {
      userInfo,
      userInstructions,
      dashboardUservalues,
      root: {
        loadData: this.loadData,
        loadUserValues: this.loadUserValues,
        loadBenchmark: this.loadBenchmark,
        loadIncident: this.loadIncident,
      },
    };
  }

  componentDidMount() {
    this.props.hideAppLoader();
  }

  @autobind
  loadData() {
    this.setState({
      dashboardUservalues: {},
    }, () => {
      // Load data only when user login
      if (!(store.get('userName') && store.get('token'))) {
        return;
      }
      this.loadUserValues();
    });
  }

  parseJson(data, defval = {}) {
    return data ? JSON.parse(data) : defval;
  }

  @autobind
  loadIncident() {
    let self = this;
    return new Promise((resolve, reject) => {
      apis.postDashboardIncident().then((result) => {
        const resp = result.data;
        resp.incidentAllInfo = JSON.parse(resp.incidentAllInfo);
        const { dashboardUservalues } = this.state;
        dashboardUservalues.incidentAllInfo = resp.incidentAllInfo;
        this.setState({ dashboardUservalues }, () => resolve(this));
      });
    });
  }

  @autobind
  loadBenchmark() {
    const self = this;
    return new Promise((resolve, reject) => {
      apis.postDashboardBenchmark().then((result) => {
        const resp = result.data;
        resp.publishedDataAllInfo = JSON.parse(resp.publishedDataAllInfo);
        if (resp.publishedDataAllInfo) {
          resp.publishedDataAllInfo = resp.publishedDataAllInfo.map((info) => {
            return Object.assign({}, info, {
              metaData: self.parseJson(info.metaData),
            });
          });
        }
        const { dashboardUservalues } = this.state;
        dashboardUservalues.publishedDataAllInfo = resp.publishedDataAllInfo;
        this.setState({ dashboardUservalues }, () => resolve(this));
      });
    });
  }

  @autobind
  convertUservalues(resp) {
    if (resp.uiDataParsed) {
      return resp;
    }

    const self = this;
    if (resp.dataAllInfo) resp.dataAllInfo = JSON.parse(resp.dataAllInfo);
    if (resp.extServiceAllInfo) resp.extServiceAllInfo = JSON.parse(resp.extServiceAllInfo);
    if (resp.incidentAllInfo) resp.incidentAllInfo = JSON.parse(resp.incidentAllInfo);
    if (resp.projectModelAllInfo) {
      resp.projectModelAllInfo = JSON.parse(resp.projectModelAllInfo);
    }
    if (resp.projectSettingsAllInfo) {
      resp.projectSettingsAllInfo = JSON.parse(resp.projectSettingsAllInfo);
    }
    if (resp.publishedDataAllInfo) {
      resp.publishedDataAllInfo = JSON.parse(resp.publishedDataAllInfo);
    }
    if (resp.projectSettingsAllInfo) {
      resp.projectSettingsAllInfo = resp.projectSettingsAllInfo.map((info) => {
        return Object.assign({}, info, {
          metricSettings: JSON.parse(info.metricSettings),
        });
      });
    }

    if (resp.publishedDataAllInfo) {
      resp.publishedDataAllInfo = resp.publishedDataAllInfo.map((info) => {
        return Object.assign({}, info, {
          metaData: self.parseJson(info.metaData),
        });
      });
    }
    resp.uiDataParsed = true;
    return resp;
  }

  @autobind
  loadUserValues() {
    return new Promise((resolve) => {
      apis.postJSONDashboardUserValues().then((result) => {
        const resp = this.convertUservalues(result.data);
        this.setState({
          dashboardUservalues: resp,
        }, () => resolve(this));
      });
    });
  }

  render() {
    const { userInstructions, dashboardUservalues } = this.state;

    const loading = !(_.keys(userInstructions).length > 0 &&
      _.keys(dashboardUservalues).length > 0);

    return (
      <SinglePage className="v1-page">{!loading && this.props.children}</SinglePage>
    );
  }
}

export const App = connect(
  (state: State) => ({
    dashboardUservalues: state.app.v1store.dashboardUservalues,
  }),
  { hideAppLoader },
)(AppCore);

// Live Monitoring project detail page
const liveMonitoringApp = function (props) {
  const { location, params } = props;
  return (
    <ProjectDetails location={location} params={params} />
  );
};

// Live Monitoring project detail page
const FilesMonitoringApp = function (props) {
  const { location, params } = props;
  return (
    <FileDetails location={location} params={params} />
  );
};


const FilesDetectionMonitoringApp = function (props) {
  const { location, params } = props;
  return (
    <FileDetectionDetails location={location} params={params} />
  );
};

// Incident Analysis Details
const incidentAnalysisApp = function (props) {
  const { location, params } = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')} />
      <IncidentDetails location={location} params={params} />
    </Console>
  );
};

// Incident Analysis Details Log
const incidentLogAnalysisApp = function (props) {
  const { location, params, children } = props;
  return (
    <Console>
      <IncidentLogDetails location={location} params={params} >
        {children}
      </IncidentLogDetails>
    </Console>
  );
};

// project Data Only Details
const projectDataOnlyApp = function (props) {
  const { location, params } = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')}  />
      <ProjectDataDetails location={location} params={params}  />
    </Console>
  );
};

// Use Case Details
const useCaseApp = function (props) {
  const { location, params } = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')}  />
      <UseCaseDetails location={location} params={params}  />
    </Console>
  );
};

// Executive Dashboard Details
const ExecutiveDashboardApp = function (props) {
  const { location, params } = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')}  />
      <ExecutiveDashboard location={location} params={params}  />
    </Console>
  );
};

const routes = (
  <Router history={browserHistory}>
    <Route component={App} path="/">
      <IndexRedirect to="/cloud" />
      {cloudRoute}
      {logRoute}
      {settingsRoute}
      {useCaseRoute}
      {fileTabsRoute}
      <Route component={AccountInfo} path="account-info" />
      <Route component={Help} path="help" />
    </Route>
    <Route component={liveMonitoringApp} path="/liveMonitoring" />
    <Route component={FilesMonitoringApp} path="/filesMonitoring" />
    <Route component={FilesDetectionMonitoringApp} path="/filesdetectionMonitoring" />
    <Route component={projectDataOnlyApp} path="/projectDataOnly" />
    <Route component={incidentAnalysisApp} path="/incidentAnalysis" />
    <Route component={incidentLogAnalysisApp} path="/incidentLogAnalysis" />
    <Route component={useCaseApp} path="/useCaseDetails" />
    <Route component={ExecutiveDashboardApp} path="/executiveDashboard" />
    <Redirect from="*" to="/" />
  </Router>
);

export {
  liveMonitoringApp,
  FilesMonitoringApp,
  FilesDetectionMonitoringApp,
  projectDataOnlyApp,
  incidentAnalysisApp,
  incidentLogAnalysisApp,
  useCaseApp,
  ExecutiveDashboardApp,
};

class AppRoute extends React.Component {
  componentDidMount() {
    this.props.hideAppLoader();
  }

  isAuthenticated() {
    return store.get('userName') && store.get('token');
  }

  render() {
    if (this.isAuthenticated()) {
      return routes;
    }
    return authRoutes;
  }
}

export default connect(
  () => ({}),
  { hideAppLoader },
)(AppRoute);
