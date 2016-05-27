import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {
    ProjectSelection,
    ModelType,
    AnomalyThreshold,
    WindowWithWeek,
    DurationThreshold,
    DurationHour
} from '../../selections';
import mockData from '../../../mock/cloud/OutlierDetection.json';
import DateTimePicker from "../../ui/datetimepicker/index";

export default  class FilterBar extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        let weeks = 1;
        this.state = {
            showAddPanel: false,
            projects: [],
            weeks: weeks,
            endTime: moment(new Date()).toDate(),
            startTime: moment(new Date()).add(-7 * weeks, 'days')
        };
    }

    handleAddMonitoring() {

    }

    handleEndTimeChange(endTime) {
        let startTime, params = this.state;
        startTime = moment(endTime).add(-7 * params.weeks, 'days').toDate();
        params = Object.assign({}, params, {startTime: startTime, endTime: endTime});
        this.setState({...params});

    }

    handleWeeksChange(v) {
        this.setState({...Object.assign({}, this.state, {weeks: v})}, ()=> {
            this.handleEndTimeChange(this.state.endTime);
        })
    }

    render() {
        const params = this.state;
        const {userInstructions, dashboardUservalues} = this.context;
        const labelStyle = {
            width: '100px'
        };

        return (
            <div className="ui form">


                <div className="inline fields">
                    <div className="four wide field">
                        <label style={labelStyle}>Projects</label>
                        <ProjectSelection onChange={(value, text) => {this.setState({addedName: text})}}/>
                    </div>
                    <div className="four wide field">
                        <label style={labelStyle}>Start Time</label>
                        <DateTimePicker dateTimeFormat='YYYY-MM-DD HH:mm'
                                        value={params.startTime} disabled/>

                    </div>
                    <div className="four wide field">
                        <label style={labelStyle}>End Time</label>
                        <DateTimePicker dateTimeFormat='YYYY-MM-DD HH:mm'
                                        value={params.endTime}
                                        onChange={this.handleEndTimeChange.bind(this)}/>

                    </div>
                    <div className="four wide field">
                        <label style={labelStyle}>Window (Week)</label>
                        <WindowWithWeek value={params.weeks} onChange={this.handleWeeksChange.bind(this)}/>
                    </div>
                    <Button className="orange"
                            onClick={this.handleAddMonitoring.bind(this)}>Add
                    </Button>
                </div>
                <Button className="orange">Add & Save</Button>

            </div>
        )
    }
}
