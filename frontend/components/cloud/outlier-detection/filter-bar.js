import React, {Component} from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {
    InstanceProjectSelection,
    ModelType,
    WindowWithWeek,
} from '../../selections';

import DateTimePicker from "../../ui/datetimepicker/index";

export default  class FilterBar extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            projectName: undefined,
            projectType: undefined,
            weeks: '1',
            startTime: moment().add(-1, 'w').toDate(),
            endTime: moment().toDate()
        };
    }

    componentDidMount() {
        let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
        projects = projects.filter((item, index) => (!(item.isStationary) && (item.projectType != "GAE") && (item.projectType != "GCE")));
        if (projects.length > 0) this.handleProjectChange(projects[0].projectName, projects[0].projectName);
    }

    componentDidUpdate() {
        $('.custom.button')
            .popup({
                popup: $('.custom.popup'),
                on: 'click'
            });
    }

    handleProjectChange(value, projectName) {
        let {projectString, sharedProjectString} = this.context.dashboardUservalues;
        let project = undefined;
        if (projectString.length > 0) {
            project = projectString.split(',').map((s)=>s.split(":")).find((parts) => parts[0] == projectName);
        }
        if (sharedProjectString.length > 0 && project == undefined) {
            project = sharedProjectString.split(',').map((s)=>s.split(":")).find((parts) => (parts[0] + "@" + parts[3]) == projectName);
        }
        // 前三部分是名称，数据类型dataType和云类型cloudType
        let [name, dataType, cloudType] = project;
        let update = {projectName};
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

    handleEndTimeChange(endTime) {
        let {weeks} = this.state;
        this.setState({
            startTime: moment(endTime).add(-weeks, 'w').toDate(),
            endTime
        })
    }

    handleSubmit() {
        this.props.onSubmit && this.props.onSubmit(this.state);
    }

    render() {
        const {projectName, startTime, endTime, projectType} = this.state;
        const labelStyle = {};

        return (
            <div className="ui form">
                <div className="five fields fill">
                    <div className="field">
                        <label style={labelStyle}>
                            Project Name&nbsp;

                            <i className="custom button warning circle icon" style={{'cursor': 'pointer','color': '#88bbee'}}></i>
                            <div className="ui custom popup center right transition hidden">nickname of your cloud project.
                            </div>
                        </label>
                        <InstanceProjectSelection value={projectName} onChange={this.handleProjectChange.bind(this)}/>
                    </div>
                    <div className="field">
                        <label style={labelStyle}>Project Type</label>

                        <div style={{paddingTop:'0.5em', paddingLeft:'1em'}}>{projectType}</div>
                    </div>
                    <div className="field">
                        <label style={labelStyle}>Window (Week)</label>
                        <WindowWithWeek value={1}
                                        onChange={(value, text)=> this.setState({weeks: text}, ()=>this.handleEndTimeChange(endTime))}/>
                    </div>
                    <div className="field">
                        <label style={labelStyle}>
                            Start Time&nbsp;

                            <i className="custom button warning circle icon" style={{'cursor': 'pointer','color': '#88bbee'}}></i>
                            <div className="ui custom popup center right transition hidden">models falling into user specified window are loaded.
                            </div>
                        </label>

                        <div className="ui input">
                            <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={startTime}
                                            disabled/>
                        </div>
                    </div>
                    <div className="field">
                        <label style={labelStyle}>
                            End Time&nbsp;

                            <i className="custom button warning circle icon" style={{'cursor': 'pointer','color': '#88bbee'}}></i>
                            <div className="ui custom popup center right transition hidden">models falling into user specified window are loaded.
                            </div>
                        </label>

                        <div className="ui input">
                            <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={endTime}
                                            onChange={this.handleEndTimeChange.bind(this)}/>
                        </div>
                    </div>
                </div>

                <div className="ui field">
                    <Button className={cx('orange', {'loading': this.props.loading})}
                            onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </div>
            </div>
        )
    }
}
