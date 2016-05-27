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

import DateTimePicker from "../../ui/datetimepicker/index";

export default  class FilterBar extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            anomalyThreshold: null
        };
    }

    handleAddMonitoring() {

    }

    handleEndTimeChange(endTime) {
        let startTime, params = this.state.params;
        startTime = moment(endTime).add(-7 * params.weeks, 'days').toDate();
        params = Object.assign({}, params, {
            startTime: startTime,
            endTime: endTime
        });
        this.setState({params: params});

    }

    handleWeeksChange(v) {
        this.setState({
            params: Object.assign({}, this.state.params, {weeks: v})
        }, ()=> {
            this.handleEndTimeChange(this.state.params.endTime);
        })
    }

    handleClickIncident(incident) {
        return (e) => {
            let [startTime, endTime, incidentId, anomalyThreshold, ] = incident.split("_");
            console.log(moment(startTime).toDate());
            console.log(moment(endTime).toDate());
            this.setState({
                startTime: moment(startTime).toDate(),
                endTime: moment(endTime).toDate(),
                incidentId: incidentId,
                anomalyThreshold: anomalyThreshold,
                incident: incident
            })
        }

    }

    _incidentsRef(c) {

    }

    render() {
        const {startTime, endTime,} = this.state;
        const {params} = this.props;
        const {userInstructions, dashboardUservalues} = this.context;
        const labelStyle = {
            width: '130px'
        };

        const projectStrings = dashboardUservalues.projectString.split(",").map((item)=>item.split(":"));
        const incidentInfo = (dashboardUservalues.incidentAllInfo || []).find((item)=>item.projectName == this.state.addedName);
        const incidentList = (incidentInfo && incidentInfo.incidentList) || [];

        console.log(projectStrings);
        return (
            <div className="ui form">
                <div className="inline fields">
                    <div className="four wide field">
                        <label style={labelStyle}>Projects</label>
                        <ProjectSelection onChange={(value, text) => {this.setState({addedName: text})}}/>
                    </div>
                    <div className="four wide field">
                        <label style={labelStyle}>Model Type</label>
                        <ModelType/>
                    </div>
                    <div className="four wide field">
                        <label style={labelStyle}>Anomaly Threshold</label>
                        <AnomalyThreshold value={this.state.anomalyThreshold}
                                          onChange={(v)=>this.setState({anomalyThreshold: v})}/>
                    </div>
                    <div className="four wide field">
                        <label style={labelStyle}>Duration Threshold (Minute)</label>
                        <DurationThreshold value={this.state.durationThreshold}
                                           onChange={(v)=>this.setState({durationThreshold: v})}/>
                    </div>
                </div>
                <div className="inline fields">
                    <div className="four wide field">
                        <label style={labelStyle}>Duration (Hour)</label>
                        <DurationHour />
                    </div>
                    <div className="four wide field">
                        <label style={labelStyle}>Start Time</label>
                        <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm'
                                        value={startTime} disabled/>

                    </div>


                    <div className="four wide field">
                        <label style={labelStyle}>End Time</label>
                        <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm'
                                        value={endTime}
                                        onChange={this.handleEndTimeChange.bind(this)}/>

                    </div>
                    <div className="four wide field"></div>

                </div>

                <div className="ui field">
                    <Button className="orange"
                            onClick={this.handleAddMonitoring.bind(this)}>Add
                    </Button>
                    <Button className="orange">Add & Save</Button>
                </div>

                <div ref={this._incidentsRef} className="padding20" style={{border: '1px solid #e0e0e0'}}>
                    <div className="ui middle aligned divided list padding10"
                         style={{maxHeight: 200, overflow: 'auto'}}>
                        {incidentList.map((incident)=> {
                            let [startTime, endTime, incidentId, anomalyThreshold, ] = incident.split("_");

                            return (
                                <div className="item" key={incident} style={{
                                    'backgroundColor': (incident == this.state.incident) ? '#f1f1f1' : '#fff'
                                }}>
                                    <div className="content" onClick={this.handleClickIncident(incident)}>
                                        <a className="header padding5">
                                            Start Time: {moment(startTime).toString()},
                                            End Time: {moment(endTime).toString()}
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    }
}