import React, {Component} from 'react';
import moment from 'moment';
import {autobind} from 'core-decorators';
import {Link, IndexLink} from 'react-router';
import {Button} from '../../../artui/react';
import {ProjectSelection, WindowWithWeek} from '../../selections';
import DateTimePicker from "../../ui/datetimepicker/index";
import WaringButton from '../monitoring/waringButton';

export default  class FilterBar extends Component {
    static contextTypes = {
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
        if (projects.length > 0) this.handleProjectChange(projects[0].projectName, projects[0].projectName);
    }
    @autobind
    handleProjectChange(value, projectName) {
        let { projectString, sharedProjectString } = this.context.dashboardUservalues;
        let project = undefined;
        if (projectString.length > 0) {
            project = projectString.split(',')
                .map((s)=>s.split(":"))
                .find((parts) => parts[0] == projectName);
        }
        if (sharedProjectString.length > 0 && project == undefined) {
            project = sharedProjectString.split(',')
                .map((s)=>s.split(":"))
                .find((parts) => (parts[0] + "@" + parts[3]) == projectName);
        }
        // 前三部分是名称，数据类型dataType和云类型cloudType
        let [name, dataType, cloudType] = project;
        let update = { projectName };
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

    @autobind
    handleEndTimeChange(endTime) {
        let { weeks } = this.state;
        this.setState({
            startTime: moment(endTime).add(-weeks, 'w').toDate(),
            endTime,
        })
    }

    @autobind
    handleSubmit() {
        this.props.onSubmit && this.props.onSubmit(this.state);
    }

    render() {
        const { projectName, startTime, endTime, projectType } = this.state;
        const labelStyle = {};

        return (
            <div className="ui form">
                <div className="five fields fill">
                    <div className="field">
                        <WaringButton labelStyle={labelStyle} labelTitle="Project Name" labelSpan="nickname of your cloud project."/>
                        <ProjectSelection value={projectName} onChange={this.handleProjectChange}/>
                    </div>
                    <div className="field">
                        <WaringButton labelStyle={labelStyle} labelTitle="Project Type" labelSpan="cloud type associated with this project."/>
                        <div style={{ paddingTop: '0.5em', paddingLeft: '1em' }}>{projectType}</div>
                    </div>
                    <div className="field">
                        <label style={labelStyle}>Window (Week)</label>
                        <WindowWithWeek value={this.state.weeks}
                                        onChange={(value, text)=>
                                            this.setState({ weeks: text }, ()=>this.handleEndTimeChange(endTime))}/>
                    </div>
                    <div className="field">
                        <WaringButton labelStyle={labelStyle} labelTitle="Start Time" labelSpan="models falling into user specified window are loaded."/>
                        <div className="ui input">
                            <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={startTime}
                                            readOnly={true}/>
                        </div>
                    </div>
                    <div className="field">
                        <WaringButton labelStyle={labelStyle} labelTitle="End Time" labelSpan="models falling into user specified window are loaded."/>
                        <div className="ui input">
                            <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={endTime}
                                            onChange={this.handleEndTimeChange}/>
                        </div>
                    </div>
                </div>
                <div className="ui field">
                    <Button className={cx('orange', { 'loading': this.props.loading })}
                            onClick={this.handleSubmit}>Submit</Button>
                </div>
            </div>
        )
    }
}
