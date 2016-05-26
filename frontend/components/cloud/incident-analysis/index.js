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


class FilterBar extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {};
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

            //    2016-05-24T17:10:20.895Z_2016-05-24T23:39:00.136Z_a3291001893c3d27047dbc2cbf114b64e2d33256_0.99_3
            let [startTime, endTime, incidentId, anomalyThreshold, ] = incident.split("_");
            this.setState({
                startTime: moment(startTime).toDate(),
                endTime: moment(endTime).toDate(),
            })
        }

    }

    _incidentsRef(c) {

    }

    render() {
        const {startTime, endTime, } = this.state;
        const {params} = this.props;
        const {userInstructions, dashboardUservalues} = this.context;
        const labelStyle = {
            width: '130px'
        };

        const incidentInfo = (dashboardUservalues.incidentAllInfo || []).find((item)=>item.projectName == this.state.addedName);
        const incidentList = (incidentInfo && incidentInfo.incidentList) || [];

        console.log(dashboardUservalues);
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
                        <AnomalyThreshold/>
                    </div>
                    <div className="four wide field">
                        <label style={labelStyle}>Duration Threshold (Minute)</label>
                        <DurationThreshold/>
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

                <div ref={this._incidentsRef}>
                    <div className="ui middle aligned divided list">
                        {incidentList.map((incident)=> {
                            let [startTime, endTime, incidentId, anomalyThreshold, ] = incident.split("_");

                            return (
                                <div className="item" key={incident}>
                                    <div className="content" onClick={this.handleClickIncident(incident)}>
                                        <a className="header">
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

export default class IncidentDetection extends Component {

    static contextTypes = {
        userInstructions: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        let weeks = 1;
        this.state = {
            view: 'chart',
            dateIndex: 0,
            timeIndex: 0,
            params: {
                showAddPanel: false,
                projects: [],
                weeks: weeks,
                endTime: moment(new Date()).toDate(),
                startTime: moment(new Date()).add(-7 * weeks, 'days')
            }
        };
    }

    componentDidMount() {

    }

    handleToggleFilterPanel() {
        this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
            this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
        })
    }

    render() {
        const {view, showAddPanel, params} = this.state;
        const {userInstructions} = this.context;
        return (
            <Console.Content>
                <div className="ui main tiny container" ref={c => this._el = c}>
                    <div className="ui clearing vertical segment">
                        <div className="ui breadcrumb">
                            <IndexLink to="/" className="section">Home</IndexLink>
                            <i className="right angle icon divider"/>
                            <Link to="/cloud/monitoring" className="section">Cloud Monitoring</Link>
                            <i className="right angle icon divider"/>
                            <div className="active section">Incident Analysis</div>
                        </div>
                        <ButtonGroup className="right floated basic icon">
                            <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                                <i className="ellipsis horizontal icon"/>
                            </Button>
                            <Button>
                                <i className="setting icon"/>
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="right floated basic icon">
                            <Button active={view == 'chart'} onClick={()=>this.setState({view:'chart'})}>
                                <i className="line chart icon"/>
                            </Button>
                            <Button active={view == 'table'} onClick={()=>this.setState({view:'table'})}>
                                <i className="table icon"/>
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div className="ui vertical segment filterPanel" style={{display: 'none'}}
                         ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>

                        <i className="close link icon" style={{float:'right'}}
                           onClick={this.handleToggleFilterPanel.bind(this)}/>
                        <FilterBar {...this.props}/>

                        <div className="ui success message"
                             dangerouslySetInnerHTML={{__html: userInstructions.cloudincident}}></div>
                    </div>

                    <div className="ui vertical segment">
                        <div className="ui info message">

                        </div>
                    </div>
                </div>
            </Console.Content>
        );
    }
}