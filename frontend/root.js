import React from 'react';
import { connect } from 'react-redux';
import store from 'store';
import _ from 'lodash';
import { autobind } from 'core-decorators';
import './app.less';
import type { State } from './src/common/types';
import { hideAppLoader } from './src/common/app/actions';
import { Console } from './artui/react';
import ProjectDetails from './components/cloud/monitoring/details';
import FileDetails from './components/cloud/monitoring/files';
import FileDetectionDetails from './components/cloud/monitoring/filedetection';
import UseCaseDetails from './components/usecase/details';
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

    this.state = {
      userInfo: store.get('userInfo'),
      userName: store.get('userName'),
      token: store.get('token'),
      userInstructions: userInstructionJson,
      dashboardUservalues: {},
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
    this.loadData();
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
      this.loadUserValues().then(() => {
        this.props.hideAppLoader();
      });
    });
  }

  parseJson(data, defval = {}) {
    return data ? JSON.parse(data) : defval;
  }

  @autobind
  loadIncident() {
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
    return new Promise((resolve) => {
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
  () => ({}),
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

// Use Case Details
const useCaseApp = function (props) {
  const { location, params } = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')} />
      <UseCaseDetails location={location} params={params} />
    </Console>
  );
};

export {
  liveMonitoringApp,
  FilesMonitoringApp,
  FilesDetectionMonitoringApp,
  useCaseApp,
};
