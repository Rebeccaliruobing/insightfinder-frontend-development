import React, {Component} from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react/index';
import {
  AnomalyThreshold,
  DurationThreshold,
} from '../../selections';

import DateTimePicker from "../../ui/datetimepicker/index";

export default  class FilterBar extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      anomalyThreshold: 0.99,
      durationThreshold: 5,
      startTime: moment().add(-1, 'w').toDate(),
      endTime: moment().toDate()
    };
  }

  componentDidMount() {

  }

  handleSelectItem(item) {
    return (e)=> {
      let [startTime, endTime] = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/g.exec(item.dataChunkName);

      let nameField = item.modelName ? 'Model Name' : 'Project Name';
      let nameFieldName = item.modelName ? 'modelName' : 'projectName';
      let nameFieldValue = item[nameFieldName];
      this.setState({
        nameField,
        nameFieldName,
        nameFieldValue,
        startTime: moment(startTime).toDate(),
        endTime: moment(endTime).toDate(),
        cvalue: parseInt(item.cvalue),
        pvalue: parseFloat(item.pvalue),
        activeItem: item
      })
    }
  }

  handleSubmit() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {
    const {startTime, endTime, description, cvalue, pvalue, nameField, nameFieldName, nameFieldValue} = this.state;
    const labelStyle = {};

    let publishedData = this.context.dashboardUservalues.publishedDataAllInfo;
    let system = this.props.location.query.system;
    return (
      <div className="ui form">
        <div className="ui grid">
          <div className="five wide column">

            <div className="field">
              <label style={labelStyle}>{nameField || 'Project Name'}</label>
              <input className="ui input" value={nameFieldValue} readonly/>
            </div>

            <div className="field">
              <label style={labelStyle}>Anomaly Threshold</label>
              <AnomalyThreshold value={pvalue} onChange={(v, t)=>this.setState({pvalue: t})}/>
            </div>
            <div className="field">
              <label style={labelStyle}>Duration Threshold</label>
              <DurationThreshold value={cvalue} onChange={(v, t)=>this.setState({cvalue: t})}/>
            </div>
          </div>
          <div className="five wide column">
            <div className="field">
              <label style={labelStyle}>Start Time</label>
              <div className="ui input">
                <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={startTime} readonly/>
              </div>
            </div>
            <div className="field">
              <label style={labelStyle}>End Time</label>
              <div className="ui input">
                <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={endTime} readonly/>
              </div>
            </div>
          </div>
          <div className="six wide column">

            <div className="field">
              <label style={labelStyle}>Incident Description</label>
                <textarea className="ui input" defaultValue={description} name="description" style={{height: '8em'}}
                          onChange={(e)=>this.setState({description: e.target.value})}></textarea>
            </div>
          </div>
        </div>
        <div className="ui grid">
          <div className="sixteen wide column">
            <div className="ui field">
              <table className="ui selectable celled table">
                <tbody>
                {publishedData.map((item, index)=> {
                  var pubMode = "public";
                  if (item.ownerOnly != null && item.ownerOnly) {
                    if (item.sharedUsernames === '[]') {
                      pubMode = "group";
                    } else {
                      pubMode = "private";
                    }
                  }

                  let sys = item.metaData.system.toLowerCase();

                  let shouldShow = true;
                  if (system && ['cassandra', 'hadoop'].indexOf(system.toLowerCase()) >= 0 && system.toLowerCase() != sys) {
                      shouldShow = false
                  } else if (system == 'Other' && ['cassandra', 'hadoop'].indexOf(sys) >= 0) {
                    shouldShow = false
                  }

                  return shouldShow && (
                      <tr key={index} onClick={this.handleSelectItem(item)}>
                        <td>System: {item.metaData.system}, incident name/bug ID: {item.metaData.name},
                          owner: {item.fromUser},
                          sharing mode: {pubMode}</td>
                      </tr>
                    )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="ui grid">
          <div className="sixteen wide column">
            <Button className={cx('orange', {'loading': this.props.loading})} onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </div>
        </div>
      </div>
    )
  }
}
