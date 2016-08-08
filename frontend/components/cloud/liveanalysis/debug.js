import $ from 'jquery';
import React from 'react';
import store from 'store';
import _ from "lodash";
import {Modal, Dropdown} from '../../../artui/react';
import {PieChart} from '../insight-report';

class SettingDebug extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {dataArray, ...rest} = this.props;
        let pieChartCanvasStyle = {height: '200px', width: '230px'};
        let titleStyle = {'width': '27%','margin': '0 auto'};
        let optionCenterStyle = ['65%', '50%'];
        console.log(dataArray);
        return (
            <Modal {...rest} size="big" closable={true}>
                {
                    dataArray ? <div className="content">
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
                    </div> : <span>No Data</span>
                }

            </Modal>
        )
    }
}

export default SettingDebug;
//Number of Affected Threads 对应 numAffectedThread in json
//Fault Impact Scope 对应 impactFactor in json