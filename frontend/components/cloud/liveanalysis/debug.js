import $ from 'jquery';
import React from 'react';
import store from 'store';
import _ from "lodash";
import {Modal, Dropdown} from '../../../artui/react';
import {PieChart} from '../insight-report';

class SettingDebug extends React.Component {

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
        this.setState({ tabStates: tabStates });
    }

    render() {
        let {dataArray, timeMockup, freqMockup, ...rest} = this.props;
        let pieChartCanvasStyle = {height: '200px', width: '230px'};
        let titleStyle = {'width': '27%','margin': '0 auto'};
        let optionCenterStyle = ['65%', '50%'];
        const { tabStates } = this.state;
        //console.log(dataArray,timeMockup, freqMockup);
        return (
            <Modal {...rest} size="big" closable={true}>
                {
                    dataArray ?
                    <div className="content">
                        <div style={{'width': '100%','display': 'flex'}}>
                            {_.keysIn(dataArray).map(function (value, index) {
                                console.log(value);

                                let dataValue = dataArray[value];
                                if (value == "impactFactor") {
                                    dataValue = ((dataArray[value] * 100).toFixed(1)).toString() + "%";
                                    value = "Fault Impact Scope";
                                }
                                else if(value == "totalNumThread"){
                                    value = "Number of All Threads";
                                }
                                else if(value == "numAffectedThread"){
                                    value = "Number of Affected Threads";
                                }
                                return (<PieChart pieChartCanvasStyle={pieChartCanvasStyle} radius={[55,80]} key={index}
                                                  optionCenterStyle={optionCenterStyle} colorChart="#3398DB" titleStyle={titleStyle} data={value} dataValue={dataValue.toString()}/>);
                            })}
                        </div>
                        <div>
                            <div className="ui pointing secondary menu">
                                <a className={tabStates['time'] + ' item'}
                                   onClick={(e) => this.selectTab(e, 'time')}>By Time</a>
                                <a className={tabStates['freq'] + ' item'}
                                   onClick={(e) => this.selectTab(e, 'freq')}>By Freq</a>
                            </div>

                            <div className={tabStates['time'] + ' ui tab '}>
                                {tabStates['time'] === 'active' ?
                                    <div>
                                         <table className="word-table ui celled table">
                                            <thead>
                                            <tr style={{'textAlign': 'center'}}>
                                                <th>rank</th>
                                                <th>functionName</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {(timeMockup || []).map((value, index)=> {
                                                return (
                                                    <tr key={`time-${index}-1`} style={{'textAlign': 'center'}}>
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
                                                <th>rank</th>
                                                <th>functionName</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {(freqMockup || []).map((value, index)=> {
                                                return (
                                                    <tr key={`freq-${index}-1`} style={{'textAlign': 'center'}}>
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
                    </div> : <span>No Data</span>
                }

            </Modal>
        )
    }
}

export default SettingDebug;
//Number of Affected Threads 对应 numAffectedThread in json
//Fault Impact Scope 对应 impactFactor in json