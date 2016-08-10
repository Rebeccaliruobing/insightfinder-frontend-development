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

export default class FileUpdateModel extends Component {
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
                            <h3>Modify an existing model</h3>

                            <div className="six fields fill">

                                <div className="field">
                                    <label>Training Data</label>

                                    <div className="ui button fileinput-button">
                                        Training Data
                                        <input type="file" name="file" ref={::this.fileUploadRef}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Optional Filter Data</label>

                                    <div className="ui button fileinput-button">
                                        Optional Filter Data
                                        <input type="file" name="file" ref={::this.fileUploadRef}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Model Name</label>
                                    <LiveProjectSelection value={projectName}
                                                          onChange={this.handleProjectChange.bind(this)}/>
                                </div>
                                <div className="field">
                                    <label>Operation Options</label>
                                    <ModelType value={modelType} text={modelTypeText}
                                               onChange={(value, text)=> this.setState({ modelType: value, modelTypeText: text })}/>
                                </div>
                            </div>

                            <div className="ui field">
                                <Button className={cx('orange', {'loading': this.state.submitLoading})}
                                        onClick={this.handleSubmit.bind(this)}>Submit</Button>
                            </div>
                        </div>
                        <Message dangerouslySetInnerHTML={{ __html: userInstructions.fileupdatemodel }}/>
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