import React, {Component}    from 'react';
import {
    Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import {
    LiveProjectSelection,
    ModelType,
    DurationThreshold,
    AnomalyThreshold
} from '../../selections';
import store from 'store';
const baseUrl = window.API_BASE_URL || '/api/v1/';

export default class FileDetection extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            projectName: undefined,
            projectType: undefined,
            modelType: 'Holistic',
            modelTypeText: 'Holistic',
            anomalyThreshold: 0.99,
            durationThreshold: 5,
            minPts: 5,
            epsilon: 1.0
        }
    }

    componentDidMount() {
        let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
        projects = projects.filter((item, index) => !(item.isStationary));
        if (projects.length > 0) {
            this.handleProjectChange(projects[0].projectName, projects[0].projectName);
        }
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
            default:
                update.projectType = `${cloudType}/Agent`;
        }
        this.setState(update);
    }

    handleSubmit(e){
        console.log('submit');
    }
    render() {
        let {userInstructions} = this.context;
        let { projectName, anomalyThreshold, durationThreshold, minPts, epsilon, projectType, modelType, modelTypeText } = this.state;
        const labelStyle = {};
        return (
            <Console.Content>
                <div className="ui main tiny container">
                    <div className="ui clearing vertical segment">
                    </div>
                    <div className="ui vertical segment filterPanel">
                        <div className="ui form">
                            <h3>Anomaly detection and cause analysis</h3>

                            <div className="four fields fill">
                                <div className="field">
                                    <label>Model Name</label>
                                    <LiveProjectSelection value={projectName}
                                                          onChange={this.handleProjectChange.bind(this)}/>
                                </div>
                                <div className="field">
                                    <label>Model Type</label>
                                    <ModelType value={modelType} text={modelTypeText}
                                               onChange={(value, text)=> this.setState({ modelType: value, modelTypeText: text })}/>
                                </div>
                                {modelType == 'DBScan' ?
                                    <div className="field">
                                        <label style={labelStyle}>MinPts</label>
                                        <input type="text" defaultValue={minPts}
                                               onBlur={(e)=>this.setState({ minPts: e.target.value })}/>
                                    </div>
                                    :
                                    <div className="field">
                                        <label style={labelStyle}>Anomaly Threshold</label>
                                        <AnomalyThreshold value={anomalyThreshold}
                                                          onChange={(v, t)=>this.setState({ anomalyThreshold: v })}/>
                                    </div>
                                }
                                {modelType == 'DBScan' ?
                                    <div className="field">
                                        <label style={labelStyle}>Epsilon</label>
                                        <input type="text" defaultValue={epsilon}
                                               onBlur={(e)=>this.setState({ epsilon: e.target.value })}/>
                                    </div>
                                    :
                                    <div className="field">
                                        <label style={labelStyle}>Duration Threshold</label>
                                        <DurationThreshold value={durationThreshold}
                                                           onChange={(v, t)=>this.setState({ durationThreshold: t })}/>
                                    </div>
                                }
                            </div>
                            <div className="six fields fill">
                                <div className="field">
                                    <label>Testing Data</label>

                                    <div className="ui button fileinput-button">
                                        Testing Data
                                        <input type="file" name="file" ref={::this.fileUploadRef}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Mapping Data</label>

                                    <div className="ui button fileinput-button">
                                        Mapping Data
                                        <input type="file" name="file" ref={::this.fileUploadRef}/>
                                    </div>
                                </div>
                            </div>

                            <div className="ui field">
                                <Button className={cx('orange', {'loading': this.state.submitLoading})}
                                        onClick={this.handleSubmit.bind(this)}>Submit</Button>
                            </div>
                        </div>
                        <Message dangerouslySetInnerHTML={{ __html: userInstructions.filedetection }}/>
                    </div>
                </div>

            </Console.Content>
        );
    }

    fileUploadRef(r) {
        $(ReactDOM.findDOMNode(r))
            .fileupload({
                dataType: 'json',
                url: `${baseUrl}cloudstorage/${store.get('userName')}/`,
                sequentialUploads: true,
                multipart: false
            })
            .bind('fileuploadadd', (e, data) => {
                this.setState({settingLoading: true, projectName: data.files[0]['name']});
            })
            .bind('fileuploadprogress', (e, data) => {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                this.setState({settingLoading: true});
            })
            .bind('fileuploadfail', (e, data) => {
                var resp = data.response().jqXHR.responseJSON;
                this.setState({settingLoading: false});
            })
            .bind('fileuploaddone', (e, data) => {
                var resp = data.response().jqXHR.responseJSON;
                this.setState({
                    projectHintMapFilename: data['data']['name'],
                    data: Object.assign({}, this.state.data, {projectHintMapFilename: resp.filename}),
                    settingLoading: false
                });
            });
    }
}