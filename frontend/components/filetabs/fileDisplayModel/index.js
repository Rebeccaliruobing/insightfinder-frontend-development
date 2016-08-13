import React, {Component}    from 'react';
import {
    Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import {
    LiveProjectSelection,
    ModelNameSelection,
    ModelType,
    DurationThreshold,
    AnomalyThreshold
} from '../../selections';
import store from 'store';
const baseUrl = window.API_BASE_URL || '/api/v1/';

export default class FileDisplayModel extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            projectName: undefined,
            projectType: undefined,
            modelString: undefined,
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
        let modelString = (this.context.dashboardUservalues || {}).modelString || [];
        projects = projects.filter((item, index) => !(item.isStationary));
        this.setState({'modelString': (modelString.split(',') || [])[0]}, ()=> {
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
            default:
                update.projectType = `${cloudType}/Agent`;
        }
        this.setState(update);
    }
    handleModleString(value){
        this.setState({modelString: value});
    }

    handleSubmit(e){
        console.log('submit');
    }
    render() {
        let { modelString, modelType, modelTypeText } = this.state;
        const labelStyle = {};
        return (
            <Console.Content>
                <div className="ui main tiny container">
                    <div className="ui clearing vertical segment">
                    </div>
                    <div className="ui vertical segment filterPanel">
                        <div className="ui form">
                            <h3>Display an existing model</h3>

                            <div className="six fields fill">
                                <div className="field">
                                    <label>Model Name</label>
                                    <ModelNameSelection value={modelString}
                                                        onChange={this.handleModleString.bind(this)}/>
                                </div>
                                <div className="field">
                                    <label>Model Type</label>
                                    <ModelType value={modelType} text={modelTypeText}
                                               onChange={(value, text)=> this.setState({ modelType: value, modelTypeText: text })}/>
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

}