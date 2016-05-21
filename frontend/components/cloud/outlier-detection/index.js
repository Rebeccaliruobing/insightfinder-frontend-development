import React, { Component } from 'react';

import {Link, IndexLink} from 'react-router';
import DateTimePicker from "../../ui/datetimepicker";
import RcSlider from '../../ui/rc-slider';
import HeatMap from '../../ui/graph/HeatMap';
import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {ProjectSelection, ModelType, AnomalyThreshold, WindowWithWeek} from '../../selections';

import mockData from '../../../mock/cloud/OutlierDetection.json';

export default class OutlierDetection extends Component {

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
                value: lineArray[timeIndex]
            });
        });

        this.setState({
            heatMap: (
                <div className="ui card">
                    <div className="image">
                        <HeatMap duration={120} itemSize={6} data={dataArray}/>
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
                            <div className="active section">Outlier Detection</div>
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
                                <li><span className="bold">Project Name:</span>nickname of your cloud project.
                                </li>
                                <li>
                                    <span className="bold">Start time/end time/window:</span>
                                    models falling into user specified window are loaded.
                                </li>
                                <li>Review heat maps modeling the behavior of each instance.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="ui vertical segment">
                        <div className="ui info message">
                            Each heat map models the behavior of one instance. Red areas represent frequent behaviors
                            (i.e. normal states) and the size of the red areas indicates the ranges of different metric
                            values.
                        </div>
                        <div className="padding40">
                            <RcSlider max={6} value={this.state.dateIndex}
                                      marks={_.zipObject(_.range(0, 6), _.range(0, 6).map((index)=> moment(mockData.data[index].startTime).format('YYYY-MM-DD HH:mm')))}
                                      onChange={this.handleDateIndexChange.bind(this)}/>
                        </div>
                        <div className="ui four cards">
                            {this.state.heatMap}
                        </div>
                    </div>
                </div>
            </Console.Content>
        );
    }
}