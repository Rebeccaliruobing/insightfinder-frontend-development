import $ from 'jquery';
import React from 'react';
import store from 'store';
import _ from "lodash";
import {Modal, Dropdown} from '../../artui/react';
import {PieChart} from '../share/echarts-charts';

class SysCallModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabStates: {
                time: 'active',
                freq: ''
            }
        };
    }

    selectTab(e, tab) {
        var tabStates = this.state['tabStates'];
        tabStates = _.mapValues(tabStates, function (val) {
            return '';
        });
        tabStates[tab] = 'active';
        this.setState({tabStates: tabStates});
    }

    render() {
        let {dataArray, timeRanking, freqRanking, ...rest} = this.props;
        let pieChartCanvasStyle = {height: '200px', width: '230px'};
        let titleStyle = {'width': '27%', 'margin': '0 auto'};
        let optionCenterStyle = ['65%', '50%'];
        const { tabStates } = this.state;
        let timeFuncList = timeRanking.functionlist;
        let freqFuncList = freqRanking.functionlist;
        timeFuncList = (_.keysIn(timeFuncList)).length != 0 ? timeFuncList : [];
        freqFuncList = (_.keysIn(freqFuncList)).length != 0 ? freqFuncList : [];
        console.log(dataArray, timeRanking, freqRanking);
        return (
            <Modal {...rest} size="big" closable={true}>
                {
                    dataArray ?
                        <div className="content">
                            <div style={{'width': '100%','display': 'flex'}}>
                                {_.keysIn(dataArray).map(function (value, index) {
                                    console.log(value);
                                    let name = "";
                                    let dataValue = dataArray[value].toString();
                                    if (value == "impactFactor") {
                                        dataValue = ((dataArray[value] * 100).toFixed(1)).toString() + "%";
                                        name = "Fault Impact Scope";
                                    }
                                    else if (value == "totalNumThread") {
                                        name = "Number of All Threads";
                                    }
                                    else if (value == "numAffectedThread") {
                                        name = "Number of Affected Threads";
                                    }
                                    let radius = [60,78];
                                    return (
                                        <PieChart pieChartCanvasStyle={pieChartCanvasStyle} radius={radius} key={index}
                                                  optionCenterStyle={optionCenterStyle} colorChart="#3398DB"
                                                  titleStyle={titleStyle} data={name}
                                                  dataValue={dataValue}/>);
                                })}
                            </div>
                            {
                                (timeFuncList.length == 0 && freqFuncList.length == 0) ? null :

                                    <div>
                                        <div className="ui pointing secondary menu">
                                            <a className={tabStates['time'] + ' item'}
                                               onClick={(e) => this.selectTab(e, 'time')}>By Execution Time</a>
                                            <a className={tabStates['freq'] + ' item'}
                                               onClick={(e) => this.selectTab(e, 'freq')}>By Execution Frequency</a>
                                        </div>

                                        <div className={tabStates['time'] + ' ui tab '}>
                                            {tabStates['time'] === 'active' ?
                                                <div>
                                                    <table className="word-table ui celled table">
                                                        <thead>
                                                        <tr style={{'textAlign': 'center'}}>
                                                            <th>Rank</th>
                                                            <th>Function Name</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {(timeFuncList || []).map((value, index)=> {
                                                            return (
                                                                <tr key={`time-${index}-1`}
                                                                    style={{'textAlign': 'center'}}>
                                                                    <td>{value['rank']}</td>
                                                                    <td>{value['functionName']}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : null}
                                        </div>
                                        <div className={tabStates['freq'] + ' ui tab '}>
                                            {tabStates['freq'] === 'active' ?
                                                <div>
                                                    <table className="word-table ui celled table">
                                                        <thead>
                                                        <tr style={{'textAlign': 'center'}}>
                                                            <th>Rank</th>
                                                            <th>Function Name</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {(freqFuncList || []).map((value, index)=> {
                                                            return (
                                                                <tr key={`freq-${index}-1`}
                                                                    style={{'textAlign': 'center'}}>
                                                                    <td>{value['rank']}</td>
                                                                    <td>{value['functionName']}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                            }
                        </div> : <span>No Data</span>
                }
            </Modal>
        )
    }
}

export default SysCallModal;