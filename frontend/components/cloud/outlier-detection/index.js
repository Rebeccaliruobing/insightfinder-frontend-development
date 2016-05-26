import React, {Component} from 'react';

import {Link, IndexLink} from 'react-router';
import DateTimePicker from "../../ui/datetimepicker/index";
import RcSlider from '../../ui/rc-slider';
import HeatMap from '../../ui/graph/HeatMap';
import {Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react/index';
import {ProjectSelection, ModelType, AnomalyThreshold, WindowWithWeek} from '../../selections';
import {Dygraph} from '../../../artui/react/dataviz';


import mockData from '../../../mock/cloud/OutlierDetection.json';


class DisplayChart extends Component {

    handleHighlight(v) {
        return Math.max.apply(Math, v) > 850 ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
    }

    render() {
        return (
            <Dygraph
                data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                labels={['x', 'y']}
                style={{height: 150}}
                highlightCircleSize={2}
                highlightSeriesOpts={{
                  strokeWidth: 3,
                  strokeBorderWidth: 1,
                  highlightCircleSize: 5}}
                highlightCallback={this.handleHighlight}/>

        )
    }
}

class HeatMapCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            chart: <DisplayChart/>
        };
    }

    handleHighlight(v) {
        return Math.max.apply(Math, v) > 850 ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
    }

    showPopup() {
        this.setState({showPopup: true});
    }

    hidePopup() {
        this.setState({showPopup: false});
    }

    render() {
        let {showPopup} = this.state;
        let {duration, itemSize, dateIndex, data} = this.props;

        let groups = [
            'Summary',
            'Normalization Group 1', 'Normalization Group 2', 'Normalization Group 3',
            // 'Normalization Group 4', 'Normalization Group 5', 'Normalization Group 6'
        ];
        return (
            <div className="ui card">
                <div className="image">
                    <a target="_blank" onClick={this.showPopup.bind(this)}>
                        <HeatMap duration={duration} itemSize={itemSize} data={data}/>
                    </a>
                </div>
                <div className="content">
                    <div className="meta">
                        <span className="date">
                            {moment(mockData.data[dateIndex].startTime).format('YYYY-MM-DD HH:mm')}
                        </span>
                    </div>
                </div>
                {showPopup &&
                    <div className="ui dimmer modals page transition visible active"
                         style={{display: 'block !important', overflow: 'auto'}} key={Date.now()}>
                        <div className="ui standard test modal transition visible active scrolling"
                             style={{display: 'block !important', top: 188}}>
                            <div className="header">
                                Group 1
                            </div>
                            <div className="content">
                                <div style={{width: '100%'}}>

                                    <Dygraph
                                        data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                                        labels={['x', 'y']}
                                        style={{height: 150, width: '100%'}}
                                        highlightCircleSize={2}
                                        highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                                        highlightCallback={this.handleHighlight}/>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Dygraph
                                        data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                                        labels={['x', 'y']}
                                        style={{height: 150, width: '100%'}}
                                        highlightCircleSize={2}
                                        highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                                        highlightCallback={this.handleHighlight}/>
                                </div>
                                <div style={{width: '100%'}}>
                                    <Dygraph
                                        data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                                        labels={['x', 'y']}
                                        style={{height: 150, width: '100%'}}
                                        highlightCircleSize={2}
                                        highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                                        highlightCallback={this.handleHighlight}/>
                                </div>
                            </div>
                            <div className="actions">
                                <div className="ui black deny button" onClick={this.hidePopup.bind(this)}>
                                    Close
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default class OutlierDetection extends Component {
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
                <HeatMapCard duration={300} itemSize={6} dateIndex={dateIndex} data={dataArray}/>
                // <div className="ui card">
                //     <div className="image">
                //         <a href="#/cloud/monitoring" target="_blank">
                //             <HeatMap duration={300} itemSize={6} data={dataArray}/>
                //         </a>
                //     </div>
                //     <div className="content">
                //         <div className="meta">
                //             <span className="date">
                //                 {moment(mockData.data[dateIndex].startTime).format('YYYY-MM-DD HH:mm')}
                //             </span>
                //         </div>
                //     </div>
                // </div>
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

                        <div className="ui success message"
                             dangerouslySetInnerHTML={{__html: userInstructions.cloudoutlier}}></div>
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