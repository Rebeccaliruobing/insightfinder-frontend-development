import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {ProjectSelection, ModelType, AnomalyThreshold, WindowWithWeek} from '../../selections';

import DateTimePicker from "../../ui/datetimepicker";

export default class DisplayModel extends Component {
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
                            <div className="active section">Display Model</div>
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

                        <div className="ui success message" dangerouslySetInnerHTML={{__html: userInstructions.clouddisplay}}></div>
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