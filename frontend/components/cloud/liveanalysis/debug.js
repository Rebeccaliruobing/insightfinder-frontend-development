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
    };
  }

  render() {
    let {dataArray, ...rest} = this.props;
    let pieChartCanvasStyle = {height: '200px', width: '200px'};
    console.log(dataArray);
    return (
      <Modal {...rest} size="big" closable={true}>
        <div className="content">
            <div style={{'width': '100%','display': 'flex'}}>
                {_.keysIn(dataArray).map(function (value,index) {
                    console.log(value);
                    let dataValue = dataArray[value];
                    if(value == "impactFactor"){
                        dataValue = ((dataArray[value] * 100).toFixed(1)).toString()+"%";
                    }
                    return (<PieChart pieChartCanvasStyle={pieChartCanvasStyle} radius={[50,75]} key={index} colorChart="#3398DB" data={value} dataValue={dataValue.toString()} />);
                })}
            </div>
        </div>
      </Modal>
    )
  }
}

export default SettingDebug;
