import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import {LiveProjectSelection} from '../../selections';
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
        };
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
                update.projectType = `${dataType}/Log`;
                break;
            default:
                update.projectType = `${cloudType}/Agent`;
        }
        this.setState(update, ()=>this.props.onChange && this.props.onChange(this.state));
    }

    handleSubmit() {
        this.props.onSubmit && this.props.onSubmit(this.state);
    }

    render() {
        const { projectName } = this.state;
        const labelStyle = {};

        return (
            <div className="ui form">
                <div className="four fields fill">
                    <div className="field">
                        <WaringButton labelStyle={labelStyle} labelTitle="Project Name" labelSpan="nickname of your cloud project."/>
                        <LiveProjectSelection value={projectName}
                                              onChange={this.handleProjectChange.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}
