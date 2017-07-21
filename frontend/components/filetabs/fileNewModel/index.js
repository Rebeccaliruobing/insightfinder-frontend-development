import 'blueimp-file-upload/css/jquery.fileupload.css';
import React, { Component } from 'react';
import R from 'ramda';
import ReactDOM from 'react-dom';
import store from 'store';
import { autobind } from 'core-decorators';
import { Console, Button } from '../../../artui/react/index';
import apis from '../../../apis';
import WaringButton from '../../cloud/monitoring/waringButton';

require('expose-loader?jQuery!jquery');
require('script-loader!blueimp-file-upload/js/vendor/jquery.ui.widget');
require('script-loader!blueimp-file-upload');

const baseUrl = window.API_BASE_URL || '/api/v1/';

//   只提示成功或失败，并不显示其他信息

export default class FileNewModel extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      submitLoading: false,
      loading: false,
      inputModelName: undefined,
      modelString: undefined,
      trainingData: 'trainingData',
      optionalFilterData: 'filterData',
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    let modelString = (this.context.dashboardUservalues || {}).modelString || '';
    projects = projects.filter((item, index) => !item.isStationary);
    this.setState({ modelString: (modelString.split(',') || [])[0] }, () => {
      if (projects.length > 0) {
        this.handleProjectChange(projects[0].projectName, projects[0].projectName);
      }
    });
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
      anomalyThreshold: 0.99,
      durationThreshold: 5,
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

  handleSharingChange(e) {
    this.setState({ inputModelName: e.target.value });
  }

  handleModleString(e) {
    this.setState({ modelString: e.target.value });
  }

  handleSubmit(e) {
    let {
      inputModelName,
      trainingData,
      optionalFilterData,
      trainingDataShow,
      optionalFilterDataShow,
    } = this.state;
    let filename = trainingDataShow ? trainingData : undefined;
    let filenameFilter = optionalFilterDataShow ? optionalFilterData : undefined;
    let modelName = inputModelName;
    this.setState({ submitLoading: true }, () => {
      apis
        .postUploadTraining(filenameFilter, modelName, filename)
        .then(resp => {
          if (resp.success) {
            window.location.reload();
          } else {
            alert(resp.message);
          }
          this.setState({ submitLoading: false });
        })
        .catch(resp => {
          console.log(resp);
          alert(resp.statusText);
          this.setState({ submitLoading: false });
        });
    });
  }

  render() {
    let { userInstructions } = this.context;
    let { modelString, loading } = this.state;
    let labelStyle = {};
    return (
      <Console.Content className={loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container ">
          <div className="ui clearing vertical segment" />
          <div className="ui vertical segment">
            <div className="ui grid two columns form">
              <div className="wide column">
                <h3>Create a new model</h3>

                <div className="three fields fill">
                  <div className="field">
                    <WaringButton
                      labelStyle={labelStyle}
                      labelTitle="Training Data"
                      labelSpan="input file should be in Comma Separated Value (CSV) format. Find detailed information on sample data here."
                    />

                    <div className="ui button fileinput-button">
                      Training Data
                      <input type="file" name="file" ref={this.fileUploadTrainingData} />
                    </div>
                    {this.state.trainingDataShow
                      ? <span className="text-blue">
                          {this.state.filename}
                        </span>
                      : null}
                  </div>
                  <div className="field">
                    <WaringButton
                      labelStyle={labelStyle}
                      labelTitle="Optional Filter Data"
                      labelSpan="anomaly result can be used to advise training process by excluding these known anomalous datapoints. Find detailed information on sample data here."
                    />

                    <div className="ui button fileinput-button">
                      Optional Filter Data
                      <input type="file" name="file" ref={this.fileUploadOptionalFilterData} />
                    </div>
                    {this.state.optionalFilterDataShow
                      ? <span className="text-blue">
                          {this.state.filename}
                        </span>
                      : null}
                  </div>
                  <div className="field">
                    <WaringButton
                      labelStyle={labelStyle}
                      labelTitle="Model Name"
                      labelSpan="choose your model and model type. A model can have two model types: the Holistic model type uses a single model induced from all metrics, and the Split model type uses a group of models, each induced from one metric."
                    />

                    <div className="ui input">
                      <input type="text" onChange={e => this.handleSharingChange(e)} />
                    </div>
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
        </div>
      </Console.Content>
    );
  }

  @autobind
  fileUploadTrainingData(r) {
    $(ReactDOM.findDOMNode(r))
      .fileupload({
        dataType: 'json',
        url: `${baseUrl}cloudstorage/${store.get('userName')}/${this.state.trainingData}`,
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
        resp.trainingDataShow = true;
        this.setState(resp);
      });
  }

  @autobind
  fileUploadOptionalFilterData(r) {
    $(ReactDOM.findDOMNode(r))
      .fileupload({
        dataType: 'json',
        url: `${baseUrl}cloudstorage/${store.get('userName')}/${this.state.optionalFilterData}`,
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
        resp.optionalFilterDataShow = true;
        this.setState(resp);
      });
  }
}
