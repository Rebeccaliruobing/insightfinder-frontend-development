import React, {Component}    from 'react';
import { autobind } from 'core-decorators';
import {
    Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import {
    LiveProjectSelection,
    ModelNameSelection,
    ModelType,
    OperationOptionsSelect,
    DurationThreshold,
    AnomalyThreshold
} from '../../selections';
import store from 'store';
import apis from '../../../apis';
import WaringButton from '../../cloud/monitoring/waringButton';

const baseUrl = window.API_BASE_URL || '/api/v1/';

//   只提示成功或失败，并不显示其他信息

export default class FileUpdateModel extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            projectName: undefined,
            modelString: undefined,
            projectType: undefined,
            modelType: 'Holistic',
            modelTypeText: 'Holistic',
            anomalyThreshold: 0.99,
            durationThreshold: 5,
            minPts: 5,
            epsilon: 1.0,
            submitLoading: false,
            loading: false,
            trainingData: 'updateTraining',
            optionalFilterData: 'updateFilter'
        }
    }

    componentDidMount() {
        let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
        let modelString = (this.context.dashboardUservalues || {}).modelString || [];
        projects = projects.filter((item, index) => !(item.isStationary));
        this.setState({'modelString': ((modelString.split(',') || [])[0]).split('(')[0]}, ()=> {
            if (projects.length > 0) {
                this.handleProjectChange(projects[0].projectName, projects[0].projectName);
            }
        });
    }

    handleProjectChange(value, projectName) {
        let { projectString, sharedProjectString } = this.context.dashboardUservalues;
        let project = undefined;
        if (projectString.length > 0) {
            project = projectString.split(',').map((s)=>s.split(":")).find((parts) => parts[0] == projectName);
        }
        if (sharedProjectString.length > 0 && project == undefined) {
            project = sharedProjectString.split(',').map((s)=>s.split(":")).find((parts) => (parts[0] + "@" + parts[3]) == projectName);
        }

        // 前三部分是名称，数据类型dataType和云类型cloudType
        let [name, dataType, cloudType] = project;
        let update = {
            projectName,
            modelType: 'Holistic',
            modelTypeText: 'Holistic',
            anomalyThreshold: 0.99,
            durationThreshold: 5,
            minPts: 5,
            epsilon: 1.0
        };
        switch (dataType) {
            case 'AWS':
            case 'EC2':
            case 'RDS':
            case 'DynamoDB':
                update.projectType = `${dataType}/CloudWatch`;
            case 'GAE':
            case 'GCE':
                update.projectType = `${dataType}/CloudMonitoring`;
                break;
            case 'Log':
                update.projectType = `Log`;
                break;
            default:
                update.projectType = `${cloudType}/Agent`;
        }
        this.setState(update);
    }
    handleModleString(value){
        this.setState({modelString: value});
    }
    handleOperationOptions(value){
        this.setState({modelType: value});
    }
    handleSubmit(e){
        let {modelString,trainingData,optionalFilterData,trainingDataShow,optionalFilterDataShow,modelType} = this.state;
        let filename = trainingDataShow?trainingData:undefined;
        let filenameFilter = optionalFilterDataShow?optionalFilterData:undefined;
        let modelName = modelString;
        let operation = modelType;
        this.setState({'submitLoading': true},()=>{
            apis.postUploadUpdate(operation, filenameFilter, modelName,filename).then((resp)=>{
                if(resp.success){
                    window.location.reload();
                }
                else{
                    alert(resp.message);
                }
                this.setState({'submitLoading': false});
            }).catch((resp)=>{
                console.log(resp);
                alert(resp.statusText);
                this.setState({'submitLoading': false});
            });
        });
    }
    render() {
        let {userInstructions} = this.context;
        let { loading, modelString, projectName, anomalyThreshold, durationThreshold, minPts, epsilon, projectType, modelType, modelTypeText } = this.state;
        const labelStyle = {};
        return (
            <Console.Content className={loading?"ui form loading":""}>
                <div className="ui main tiny container">
                    <div className="ui clearing vertical segment">
                    </div>
                    <div className="ui vertical segment filterPanel">
                        <div className="ui form">
                            <h3>Modify an existing model</h3>

                            <div className="six fields fill">

                                <div className="field">
                                    <label>Training Data</label>

                                    <div className="ui button fileinput-button">
                                        Training Data
                                        <input type="file" name="file" ref={this.fileUploadTrainingData}/>
                                    </div>
                                    {this.state.trainingDataShow?<span className="text-blue">{this.state.filename}</span>: null}
                                </div>
                                <div className="field">
                                    <WaringButton labelStyle={labelStyle} labelTitle="Optional Filter Data" labelSpan="anomaly result can be used to advise training process by excluding these known anomalous datapoints. Find detailed information and sample data here."/>

                                    <div className="ui button fileinput-button">
                                        Optional Filter Data
                                        <input type="file" name="file" ref={this.fileUploadOptionalFilterData}/>
                                    </div>
                                    {this.state.optionalFilterDataShow?<span className="text-blue">{this.state.filename}</span>:null}
                                </div>
                                <div className="field">
                                    <WaringButton labelStyle={labelStyle} labelTitle="Model Name" labelSpan="choose your model and model type. A model can have two model types: the Holistic model type uses a single model induced from all metrics, and the Split model type uses a group of models, each induced from one metric."/>
                                    <ModelNameSelection value={modelString}
                                                        onChange={this.handleModleString.bind(this)}/>
                                </div>
                                <div className="field">
                                    <WaringButton labelStyle={labelStyle} labelTitle="Operation Options" labelSpan="1. Update: update existing models with new training data 2.Revert: undo the previous model update 3.Delete: remove the model from your tool"/>
                                    <OperationOptionsSelect value={'update'}
                                               onChange={this.handleOperationOptions.bind(this)}/>
                                </div>
                            </div>

                            <div className="ui field">
                                <Button className={cx('orange', {'loading': this.state.submitLoading})}
                                        onClick={this.handleSubmit.bind(this)}>Submit</Button>
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
                multipart: false
            })
            .bind('fileuploadadd', (e, data) => {
            })
            .bind('fileuploadprogress', (e, data) => {
                this.setState({loading: true});
            })
            .bind('fileuploadfail', (e, data) => {
                this.setState({loading: false});
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
                multipart: false
            })
            .bind('fileuploadadd', (e, data) => {
            })
            .bind('fileuploadprogress', (e, data) => {
                this.setState({loading: true});
            })
            .bind('fileuploadfail', (e, data) => {
                this.setState({loading: false});
            })
            .bind('fileuploaddone', (e, data) => {
                var resp = data.response().jqXHR.responseJSON;
                resp.loading = false;
                resp.optionalFilterDataShow = true;
                this.setState(resp);
            });
    }
}