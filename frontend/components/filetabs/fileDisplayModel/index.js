import React, {Component}    from 'react';
import moment from 'moment';
import cx from 'classnames';
import {
    Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import {
    LiveProjectSelection,
    ModelNameSelection,
    ModelType,
    ModelTypeSimple,
    DurationThreshold,
    AnomalyThreshold
} from '../../selections';
import store from 'store';
import apis from '../../../apis';
import HeatMapCard from '../../ui/heat-map-card';
import WaringButton from '../../cloud/monitoring/waringButton';

const baseUrl = window.API_BASE_URL || '/api/v1/';

export default class FileDisplayModel extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        let weeks = 1;
        this.state = {
            heatMaps: [],
            projectName: undefined,
            projectType: undefined,
            modelString: undefined,
            modelType: 'Holistic',
            modelTypeText: 'Holistic',
            anomalyThreshold: 0.99,
            durationThreshold: 5,
            minPts: 5,
            submitLoading: false,
            loading: false,
            params: {
                projects: [],
                weeks: weeks,
                endTime: moment(new Date()).toDate(),
                startTime: moment(new Date()).add(-7 * weeks, 'days')
            },
            epsilon: 1.0
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

    handleModleString(value) {
        this.setState({modelString: value});
    }

    handleSubmit(e) {
        let {modelString, modelType} = this.state;
        this.setState({'submitLoading': true}, ()=> {
            apis.postUploadDisplay(modelType, modelString).then((resp)=> {
                if (resp.success) {
                    let dateIndex = 0;
                    let maps = JSON.parse(resp.data.modelData).map((data, index)=> {
                        let dataArray = [];
                        data.NASValues.forEach((line, index) => {
                            var lineArray = line.split(",");
                            var colIndex = lineArray[0];
                            dataArray.push({
                                colIndex: colIndex % 32,
                                rowIndex: parseInt(index / 32),
                                value: lineArray[1]
                            });
                        });

                        let title, groupId, params = {
                            projectName: this.state.projectName
                        };
                        if (data.instanceName) {
                            title = data.instanceName;
                            params.instanceName = data.instanceName;
                        } else {
                            params.groupId = groupId = data.groupId;
                        }

                        return {
                            key: `${dateIndex}-${index}`,
                            duration: 120,
                            itemSize: 4,
                            title,
                            data: dataArray,
                            link: `/projectDataOnly?${$.param(params)}`
                        }
                    });
                    this.setState({'submitLoading': false, 'heatMaps': maps});
                }
                else {
                    alert(resp.message);
                    this.setState({'submitLoading': false});
                }
            }).catch((resp)=> {
                console.log(resp);
                alert(resp.statusText);
                this.setState({'submitLoading': false});
            });
        });
    }

    render() {
        let { modelString, modelType, modelTypeText, heatMaps } = this.state;
        const labelStyle = {};
        console.log(heatMaps);
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
                                    <WaringButton labelStyle={labelStyle} labelTitle="Model Name"
                                                  labelSpan="choose your model and model type. A model can have two model types: the Holistic model type uses a single model induced from all metrics, and the Split model type uses a group of models, each induced from one metric."/>
                                    <ModelNameSelection value={modelString}
                                                        onChange={this.handleModleString.bind(this)}/>
                                </div>
                                <div className="field">
                                    <label>Model Type</label>
                                    <ModelTypeSimple value={modelType} text={modelTypeText}
                                               onChange={(value, text)=> this.setState({ modelType: value, modelTypeText: text })}/>
                                </div>
                            </div>

                            <div className="ui field">
                                <Button className={cx('orange', {'loading': this.state.submitLoading})}
                                        onClick={this.handleSubmit.bind(this)}>Submit</Button>
                            </div>
                        </div>
                    </div>
                        <div className="ui four cards">
                            {this.state.heatMaps.map((heatObj)=><HeatMapCard {...heatObj}/>)}
                        </div>
                </div>

            </Console.Content>
        );
    }

}