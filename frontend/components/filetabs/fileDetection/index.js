import React, { Component } from 'react';
import R from 'ramda';
import ReactDOM from 'react-dom';
import { autobind } from 'core-decorators';
import store from 'store';
import { Console, Button } from '../../../artui/react/index';
import {
  ModelNameSelection,
  FileModelType,
  DurationThreshold,
  AnomalyThresholdSensitivity,
} from '../../selections';
import apis from '../../../apis';
import WaringButton from '../../cloud/monitoring/waringButton';

const baseUrl = window.API_BASE_URL || '/api/v1/';

export default class FileDetection extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.sensitivityMap = {};
    this.sensitivityMap['0.99'] = 'Low';
    this.sensitivityMap['0.95'] = 'Medium Low';
    this.sensitivityMap['0.9'] = 'Medium';
    this.sensitivityMap['0.75'] = 'Medium High';
    this.sensitivityMap['0.5'] = 'High';

    this.state = {
      projectName: undefined,
      modelString: undefined,
      inputDurationThreshold: 3,
      projectType: undefined,
      modelType: 'Holistic',
      modelTypeText: 'Holistic',
      TestingData: 'TestingData',
      submitLoading: false,
      loading: false,
      anomalyThreshold: 0.9,
      durationThreshold: 3,
      pvalueText: this.sensitivityMap[0.9],
      minPts: 5,
      epsilon: 1.0,
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    let modelString = (this.context.dashboardUservalues || {}).modelString || '';
    projects = projects.filter((item, index) => !item.isStationary);
    this.setState({ modelString: (modelString.split(',') || [])[0].split('(')[0] }, () => {
      if (projects.length > 0) {
        this.handleProjectChange(projects[0].projectName, projects[0].projectName);
      }
    });
  }

  handleDurationThreshold(e) {
    this.setState({ inputDurationThreshold: e.target.value });
  }

  handleProjectChange(value, projectName) {
    const { projectString, sharedProjectString } = this.context.dashboardUservalues;
    let project;
    if (projectString.length > 0) {
      project = R.find(p => p.projectName === projectName, JSON.parse(projectString));
    }
    if (sharedProjectString.length > 0 && project === undefined) {
      project = R.find(
        p => p.projectName.indexOf(`${projectName}@`) === 0,
        JSON.parse(sharedProjectString),
      );
    }

    if (!project) return;

    const { dataType, cloudType } = project;
    const update = {
      projectName,
      modelType: 'Holistic',
      modelTypeText: 'Holistic',
      anomalyThreshold: 0.9,
      durationThreshold: 3,
      minPts: 5,
      epsilon: 1.0,
    };
    switch (dataType) {
      case 'AWS':
      case 'EC2':
      case 'RDS':
      case 'DynamoDB':
        update.projectType = `${dataType}/CloudWatch`;
        break;
      case 'GAE':
      case 'GCE':
        update.projectType = `${dataType}/CloudMonitoring`;
        break;
      case 'Log':
        update.projectType = 'Log';
        break;
      default:
        update.projectType = `${cloudType}/Agent`;
    }
    this.setState(update);
  }

  handleModleString(value) {
    this.setState({ modelString: value });
  }

  handleValueTextChange(val, text) {
    return (v, t) => {
      this.setState({
        data: Object.assign({}, this.state.data, _.fromPairs([[val, v], [text, t]])),
      });
    };
  }

  handleSubmit(e) {
    let {
      modelString,
      modelType,
      anomalyThreshold,
      inputDurationThreshold,
      TestingData,
      minPts,
      epsilon,
    } = this.state;
    let modelName = modelString;
    let filename = TestingData;
    let cvalue = inputDurationThreshold;
    let pvalue = anomalyThreshold;
    if (modelType == 'DBScan') {
      cvalue = minPts;
      pvalue = epsilon;
    }
    let url =
      '/filesdetectionMonitoring?filename=' +
      filename +
      '&pvalue=' +
      pvalue +
      '&cvalue=' +
      cvalue +
      '&modelType=' +
      modelType +
      '&modelName=' +
      modelName;
    window.open(url, '_blank');
  }

  render() {
    let { userInstructions } = this.context;
    let {
      inputDurationThreshold,
      loading,
      modelString,
      projectName,
      anomalyThreshold,
      pvalueText,
      durationThreshold,
      minPts,
      epsilon,
      projectType,
      modelType,
      modelTypeText,
    } = this.state;
    const labelStyle = {};
    return (
      <Console.Content className={loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container">
          <div className="ui clearing vertical segment" />
          <div className="ui vertical segment filterPanel">
            <div className="ui form">
              <h3>Anomaly detection and cause analysis</h3>

              <div className="four fields fill">
                <div className="field">
                  <WaringButton
                    labelStyle={labelStyle}
                    labelTitle="Model Name"
                    labelSpan="choose your model and model type. A model can have two model types: the Holistic model type uses a single model induced from all metrics, and the Split model type uses a group of models, each induced from one metric."
                  />
                  <ModelNameSelection
                    value={modelString}
                    onChange={this.handleModleString.bind(this)}
                  />
                </div>
                <div className="field">
                  <label>Model Type</label>
                  <FileModelType
                    value={modelType}
                    text={modelTypeText}
                    onChange={(value, text) =>
                      this.setState({ modelType: value, modelTypeText: text })}
                  />
                </div>
                {modelType == 'DBScan'
                  ? <div className="field">
                      <label style={labelStyle}>MinPts</label>
                      <input
                        type="text"
                        defaultValue={minPts}
                        onBlur={e => this.setState({ minPts: e.target.value })}
                      />
                    </div>
                  : <div className="field">
                      <WaringButton
                        labelStyle={labelStyle}
                        labelTitle="Anomaly Threshold"
                        labelSpan="choose a number in [0,1) to configure the sensitivity of your anomaly detection tool. Lower values detect a larger variety of anomalies."
                      />
                      <AnomalyThresholdSensitivity
                        value={anomalyThreshold}
                        text={pvalueText}
                        onChange={this.handleValueTextChange('anomalyThreshold', 'pvalueText')}
                      />
                    </div>}
                {modelType == 'DBScan'
                  ? <div className="field">
                      <label style={labelStyle}>Epsilon</label>
                      <input
                        type="text"
                        defaultValue={epsilon}
                        onBlur={e => this.setState({ epsilon: e.target.value })}
                      />
                    </div>
                  : <div className="field">
                      <WaringButton
                        labelStyle={labelStyle}
                        labelTitle="Duration Threshold"
                        labelSpan="number of continuous anomalies to trigger an alert."
                      />
                      <div className="ui input" style={{ paddingLeft: '10px' }}>
                        <DurationThreshold
                          style={{ width: '100%' }}
                          value={inputDurationThreshold}
                          onChange={(v, t) => this.setState({ inputDurationThreshold: t })}
                        />
                      </div>
                    </div>}
              </div>
              <div className="six fields fill">
                <div className="field">
                  <label>Testing Data</label>

                  <div className="ui button fileinput-button">
                    Testing Data
                    <input type="file" name="file" ref={this.fileUploadRef} />
                  </div>
                  {this.state.testDataShow
                    ? <span className="text-blue">
                        {this.state.filename}
                      </span>
                    : null}
                </div>
              </div>

              <div className="ui field">
                <Button
                  className={`orange ${this.state.submitLoading ? 'loading' : ''}`}
                  onClick={this.handleSubmit.bind(this)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }

  @autobind
  fileUploadRef(r) {
    $(ReactDOM.findDOMNode(r))
      .fileupload({
        dataType: 'json',
        url: `${baseUrl}cloudstorage/${store.get('userName')}/${this.state.TestingData}`,
        sequentialUploads: true,
        multipart: false,
      })
      .bind('fileuploadadd', (e, data) => {})
      .bind('fileuploadprogress', (e, data) => {
        this.setState({ loading: true });
      })
      .bind('fileuploadfail', (e, data) => {
        this.setState({ loading: false });
      })
      .bind('fileuploaddone', (e, data) => {
        var resp = data.response().jqXHR.responseJSON;
        resp.loading = false;
        resp.testDataShow = true;
        this.setState(resp);
      });
  }
}
