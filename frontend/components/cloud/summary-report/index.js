import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {ProjectSelection, ModelType, AnomalyThreshold, WindowWithWeek} from '../../selections';

import DateTimePicker from "../../ui/datetimepicker";

export default class SummaryReport extends Component {

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
        this.setHeatMap(0, 0);
    }

    setHeatMap(dateIndex = 0, timeIndex = 0) {
        let dataArray = [];
        mockData.data[dateIndex].mapData.NASValues.forEach((line, index) => {
            var lineArray = line.split(",");
            var colIndex = lineArray.splice(0, 1);
            dataArray.push({
                colIndex: colIndex % 32,
                rowIndex: parseInt(index / 32),
                value: lineArray[lineArray.length - 2]
            });
        });

        this.setState({
            heatMap: (
                <div className="ui card">
                    <div className="image">
                        <a href="#/cloud/monitoring" target="_blank">
                            <HeatMap duration={300} itemSize={6} data={dataArray}/>
                        </a>
                    </div>
                    <div className="content">
                        <div className="meta">
                            <span className="date">
                                {moment(mockData.data[dateIndex].startTime).format('YYYY-MM-DD HH:mm')}
                            </span>
                        </div>
                    </div>
                </div>
            )
        });
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

    handleDateIndexChange(value) {
        this.setState({
            dateIndex: parseInt(value),
        }, ()=> {
            this.setHeatMap(this.state.dateIndex, this.state.timeIndex);
        })
    }

    handleToggleFilterPanel() {
        this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
            this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
        })
    }

    render() {
        const {view, showAddPanel, params} = this.state;

        return (
            <Console.Content>
                <div className="ui main tiny container" ref={c => this._el = c}>
                    <div className="ui clearing vertical segment">
                        <div className="ui breadcrumb">
                            <IndexLink to="/" className="section">Home</IndexLink>
                            <i className="right angle icon divider"/>
                            <Link to="/cloud/monitoring" className="section">Cloud Monitoring</Link>
                            <i className="right angle icon divider"/>
                            <div className="active section">Summary Report</div>
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
                        <label>Projects</label>
                        <ProjectSelection onChange={(value, text) => {this.setState({addedName: text})}}/>
                        <label>Start Time</label>
                        <div className="ui input">
                            <DateTimePicker dateTimeFormat='YYYY-MM-DD HH:mm'
                                            value={params.startTime} disabled/>
                        </div>
                        <label>End Time</label>
                        <div className="ui input">
                            <DateTimePicker dateTimeFormat='YYYY-MM-DD HH:mm'
                                            value={params.endTime}
                                            onChange={this.handleEndTimeChange.bind(this)}/>
                        </div>
                        <label>Window (Week)</label>
                        <WindowWithWeek value={params.weeks} onChange={this.handleWeeksChange.bind(this)}/>
                        <Button className="orange"
                                onClick={this.handleAddMonitoring.bind(this)}>Add
                        </Button>
                        <Button className="orange">Add & Save</Button>
                        <i className="close link icon" style={{float:'right'}}
                           onClick={this.handleToggleFilterPanel.bind(this)}/>

                        <div className="ui success message">
                            <ol>
                                <li>Anomaly detection results will be returned immediately if a model is already
                                    available for the specified incident duration. The incident duration should be
                                    within the model duration and the length of the incident should be no more than half
                                    of the model duration. Otherwise, a new model will be created to cover the specified
                                    incident duration. All the available models are shown in the right side list.
                                </li>
                                <li>
                                    <span className="bold">Model Type: </span>
                                    choose between the Holistic model type that uses a single model induced from all metrics, and the Split model type that uses a group of models, each induced from one metric.
                                </li>
                                <li>
                                    <span className="bold">Anomaly Threshold: </span>
                                    choose a number in [0,1) to configure the sensitivity of your anomaly detection tool. Lower values detect a larger variety of anomalies.
                                </li>
                                <li>
                                    <span className="bold">Duration Threshold:</span>
                                    number of minutes of continuous anomalies to trigger an alert.
                                </li>
                                <li>
                                    <span className="bold">Start time/end time/duration: </span>
                                    user specified analysis period.
                                </li>
                                <li>
                                    Previously analyzed incidents: click to populate period for rerun of a previously analyzed incident.
                                </li>
                                <li>
                                    Available model duration includes a list of models for the current project.
                                </li>
                            </ol>
                        </div>
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