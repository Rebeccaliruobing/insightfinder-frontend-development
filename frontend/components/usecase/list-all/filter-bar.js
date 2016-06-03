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
    dashboardUservalues: React.PropTypes.object
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
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    if (projects.length > 0) this.handleProjectChange(projects[0].projectName, projects[0].projectName);
  }

  handleSelectItem(item) {
    return (item)=> {
      this.setState({
        startTime: moment(item.startTime).toDate(),
        endTime: moment(item.startTime).toDate(),
        anomalyThreshold: parseFloat(item.anomalyThreshold)
      })
    }
  }

  handleSubmit() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {
    const {startTime, endTime, anomalyThreshold, durationThreshold, description} = this.state;
    const labelStyle = {};


    const list = [{
      "startTime": "2016-06-01T14:19:00.991Z",
      "endTime": "2016-06-01T20:49:00.778Z",
      "modelKey": "af5c431b2c76bb6237a61e6b77fe727c1f958ab8",
      "anomalyThreshold": "0.99"
    }, {
      "startTime": "2016-05-30T12:54:00.603Z",
      "endTime": "2016-05-30T19:39:00.439Z",
      "modelKey": "bd4eb66eb1580bba25aaa81f9b5791b93cf1d1aa",
      "anomalyThreshold": "0.95"
    }, {
      "startTime": "2016-05-30T10:44:00.120Z",
      "endTime": "2016-05-30T16:19:00.308Z",
      "modelKey": "572d04ee42c98258409dd8114c50c33618118b18",
      "anomalyThreshold": "0.80"
    }, {
      "startTime": "2016-05-28T15:19:00.651Z",
      "endTime": "2016-05-30T06:54:00.304Z",
      "modelKey": "99d4ddeb99ce9c890e55bc6c7418de1d03841d48",
      "anomalyThreshold": "0.70"
    }, {
      "startTime": "2016-05-27T14:19:00.536Z",
      "endTime": "2016-05-28T04:04:00.896Z",
      "modelKey": "99d4ddeb99ce9c890e55bc6c7418de1d03841d48",
      "anomalyThreshold": "0.60"
    }];

    return (
      <div className="ui form">
        <div className="ui grid">
          <div className="five wide column">
            <div className="field">
              <label style={labelStyle}>Anomaly Threshold</label>
              <AnomalyThreshold value={anomalyThreshold} onChange={(v, t)=>this.setState({anomalyThreshold: t})}/>
            </div>
            <div className="field">
              <label style={labelStyle}>Duration Threshold</label>
              <DurationThreshold value={durationThreshold} onChange={(v, t)=>this.setState({durationThreshold: t})}/>
            </div>
          </div>
          <div className="five wide column">
            <div className="field">
              <label style={labelStyle}>Start Time</label>
              <div className="ui input">
                <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={startTime} disabled/>
              </div>
            </div>
            <div className="field">
              <label style={labelStyle}>End Time</label>
              <div className="ui input">
                <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={endTime} disabled/>
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
                {list.map((item, index)=>
                  <tr key={index} onClick={this.handleSelectItem(item)}>
                    <td>{item.startTime} / {item.endTime}</td>
                  </tr>
                )}
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
