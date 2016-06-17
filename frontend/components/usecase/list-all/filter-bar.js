import React, {Component} from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react/index';
import {
  AnomalyThreshold,
  DurationThreshold,
} from '../../selections';

import apis from '../../../apis';

import DateTimePicker from "../../ui/datetimepicker/index";

export default  class FilterBar extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    router: React.PropTypes.object,
    root: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      anomalyThreshold: 0.99,
      durationThreshold: 5,
      startTime: moment().add(-1, 'w').toDate(),
      endTime: moment().toDate()
    };
    this.handleRefresh = this.handleRefresh.bind(this);
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
        activeItem: item,
        description: item.metaData.desc
      }, ()=> {
        let {fromUser, dataChunkName, modelKey, projectName, modelName, modelType} = item;
        apis.postJSONDashboardUserValues('getpubdatasettings', {
          fromUser, dataChunkName, modelKey, projectName, modelName, modelType
        }).then((resp)=>{
          if (resp.success) {
            resp.data.metricSettings = JSON.parse(resp.data.metricSettings);
            this.setState(resp.data);
          }else {
            console.error(resp.message);
          }
        });
      })
    }
  }
  handleMetricSetting(index, name) {
    return (e) =>{
      let metricSettings = this.state.metricSettings;
      metricSettings[index][name] = e.target.value;
      this.setState({metricSettings});
    }
  }

  handleSaveMetricSetting() {
    let {fromUser, dataChunkName, modelName, modelType} = this.state.activeItem;
    this.setState({loading: true});
    apis.postJSONDashboardUserValues('setpubdatasettings', {
      fromUser, dataChunkName, modelName, modelType, metricSettings: JSON.stringify(this.state.metricSettings)
    }).then((resp)=>{
      if (resp.success) {
      }else {
        console.error(resp.message);
      }
      this.setState({loading: false});
    });
  }

  handleToggleRow() {

    let {fromUser, dataChunkName, modelKey, projectName, modelName, modelType} = this.state.activeItem;
    this.setState({loading: true});
    apis.postJSONDashboardUserValues('togglepublisheddata', {
      fromUser, dataChunkName, modelName, modelType, modelKey, projectName,
    }).then((resp)=>{
      if (resp.success) {
        this.setState({
          loading: false,
          activeItem: undefined,
          metricSettings: undefined
        }, this.handleRefresh);
      }else {
        console.error(resp.message);
        this.setState({loading: false});
      }

    });
  }

  handleRemoveRow() {
    let {fromUser, dataChunkName, modelKey, projectName, modelName, modelType} = this.state.activeItem;
    this.setState({loading: true});
    apis.postJSONDashboardUserValues('deletepublisheddata', {
      fromUser, dataChunkName, modelName, modelType, modelKey, projectName,
    }).then((resp)=>{
      if (resp.success) {
        this.setState({
          loading: false,
          activeItem: undefined,
          metricSettings: undefined
        }, this.handleRefresh);
      }else {
        console.error(resp.message);
        this.setState({loading: false});
      }
    });
  }

  handleRefresh() {
    this.setState({loading: true});
    this.context.root.loadUserValues().then(()=> {
      this.setState({loading: false})
    })
  }

  handleSubmit() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {
    const {startTime, endTime, description, cvalue, pvalue, nameField, nameFieldValue, activeItem, metricSettings} = this.state;
    const labelStyle = {};

    let publishedData = this.context.dashboardUservalues.publishedDataAllInfo;
    let system = this.props.location.query.system;
    return (
      <div className={cx('ui form', {loading: !!this.state.loading})}>
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
              <textarea className="ui input" value={description} name="description" style={{height: '8em'}}
                        readonly></textarea>
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
                      <tr key={index} onClick={this.handleSelectItem(item)} className={cx({
                        'active': item == this.state.activeItem
                      })}>
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
            <Button className="basic" onClick={this.handleRefresh}>refresh</Button>
            {activeItem && <Button className="basic" onClick={this.handleRemoveRow.bind(this)}>remove</Button>}
          </div>



          {metricSettings && (

            <div className={cx('ui form', {'loading': !!this.state.uservaluesLoading})} style={{padding: '1rem'}}>
              <h3>Metric Settings (Optional)</h3>
              <table className="ui celled table">
                <thead>
                <tr>
                  <th>Metric</th>
                  <th>Normalization Group</th>
                  <th>Alert Threshold</th>
                  <th>No Alert Threshold</th>
                </tr>
                </thead>
                <tbody>
                {metricSettings.map((setting, index)=>{
                  return (
                    <tr key={`${index}`}>
                      <td>{setting.smetric}</td>
                      <td><input value={setting.groupId} onChange={this.handleMetricSetting(index, 'groupId')}/></td>
                      <td><input value={setting.thresholdAlert} onChange={this.handleMetricSetting(index, 'thresholdAlert')}/></td>
                      <td><input value={setting.thresholdNoAlert} onChange={this.handleMetricSetting(index, 'thresholdNoAlert')}/></td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
              <Button className="blue" onClick={this.handleSaveMetricSetting.bind(this)}>Submit</Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
