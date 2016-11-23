import React, {Component} from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react/index';
import {
  ModelType,
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
      pvalue: 0.99,
      cvalue: 5,
      minPts: 5,
      epsilon: 1.0,
      startTime: moment().add(-1, 'w').toDate(),
      endTime: moment().toDate(),
      systemNames: ['Cassandra','Hadoop','Apache','Tomcat','MySQL','HDFS','Spark','Lighttpd','Memcached'],
      modelType: "Holistic",
      modelTypeText: "Holistic",
      modelTypeTextMap: {}
    };
    this.state.modelTypeTextMap["Holistic"]= "Holistic";
    this.state.modelTypeTextMap["HolisticCP"]= "Holistic + Filtering";
    this.state.modelTypeTextMap["Split"]= "Split";
    this.state.modelTypeTextMap["Hybrid"]= "Hybrid";
    this.state.modelTypeTextMap["DBScan"]= "Clustering (DBScan)";
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleSelectItem(item) {
    return (e)=> {
      let [startTime, endTime] = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/g.exec(item.dataChunkName);
      startTime= moment(startTime).toDate();
      endTime= moment(endTime).toDate();

      let nameField = item.modelName ? 'Model Name' : 'Project Name';
      let nameFieldName = item.modelName ? 'modelName' : 'projectName';
      let nameFieldValue = item[nameFieldName];
      let modelType = item.modelType;
      let modelTypeText = this.state.modelTypeTextMap[modelType];
      if(modelType=='DBScan'){
        let minPts= parseInt(item.cvalue);
        let epsilon= parseFloat(item.pvalue);
        this.setState({
          nameField,
          nameFieldName,
          nameFieldValue,
          startTime,
          endTime,
          minPts,
          epsilon,
          activeItem: item,
          description: item.metaData.desc,
          modelType,
          modelTypeText
        }, ()=> {
          let {fromUser, dataChunkName, modelKey, projectName, modelName, modelType} = item;
          apis.postJSONDashboardUserValues('getpubdatasettings', {
            fromUser, dataChunkName, modelKey, projectName, modelName, modelType
          }).then((resp)=>{
            if (resp.success) {
              resp.data.metricSettings = JSON.parse(resp.data.metricSettings);
              this.setState(resp.data);
            }else {
              alert(resp.message);
            }
          });
        })
      } else {
        let cvalue= parseInt(item.cvalue);
        let pvalue= parseFloat(item.pvalue);
        this.setState({
          nameField,
          nameFieldName,
          nameFieldValue,
          startTime,
          endTime,
          pvalue,
          cvalue,
          activeItem: item,
          description: item.metaData.desc,
          modelType,
          modelTypeText
        }, ()=> {
          let {fromUser, dataChunkName, modelKey, projectName, modelName, modelType} = item;
          apis.postJSONDashboardUserValues('getpubdatasettings', {
            fromUser, dataChunkName, modelKey, projectName, modelName, modelType
          }).then((resp)=>{
            if (resp.success) {
              resp.data.metricSettings = JSON.parse(resp.data.metricSettings);
              this.setState(resp.data);
            }else {
              alert(resp.message);
            }
          });
        })
      }
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
        alert(resp.message);
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
        alert(resp.message);
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
        alert(resp.message);
        this.setState({loading: false});
      }
    });
  }

  handleRefresh() {
    this.setState({loading: true});
    this.context.root.loadBenchmark().then(()=> {
      this.setState({loading: false})
    })
  }

  handleSubmit() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

            // <div className="field">
            //   <label style={labelStyle}>Anomaly Threshold</label>
            //   <AnomalyThreshold value={pvalue} onChange={(v, t)=>this.setState({pvalue: t})}/>
            // </div>
            // <div className="field">
            //   <label style={labelStyle}>Duration Threshold</label>
            //   <DurationThreshold value={cvalue} onChange={(v, t)=>this.setState({cvalue: t})}/>
            // </div>

  render() {
    const {systemNames, startTime, endTime, description, cvalue, pvalue, minPts,epsilon, nameField, nameFieldValue, activeItem, metricSettings, modelType,modelTypeText} = this.state;
    const labelStyle = {};

    let publishedData = this.context.dashboardUservalues.publishedDataAllInfo;
    let system = this.props.location.query.system;
    return (
      <div className={cx('ui form', {loading: !!this.state.loading})}>
        <div className="ui grid">
          <div className="four wide column">

            <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
              <label style={labelStyle}>Model Type</label>
              <ModelType value={modelType} text={modelTypeText} onChange={(value, text)=> this.setState({modelType: value, modelTypeText: text})}/>
            </div>
            {modelType == 'DBScan'?
              <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
                <label style={labelStyle}>MinPts</label>
                <input type="text" defaultValue={minPts} onBlur={(e)=>this.setState({minPts:e.target.value})}/>
              </div>
              :
              <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
                <label style={labelStyle}>Anomaly Threshold</label>
                <AnomalyThreshold value={pvalue} onChange={(v, t)=>this.setState({pvalue: t})}/>
              </div>
            }
            {modelType == 'DBScan'?
              <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
                <label style={labelStyle}>Epsilon</label>
                <input type="text" defaultValue={epsilon} onBlur={(e)=>this.setState({epsilon:e.target.value})}/>
              </div>
              :
              <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
                <label style={labelStyle}>Duration Threshold (Sample Number)</label>
                <DurationThreshold value={cvalue} onChange={(v, t)=>this.setState({cvalue: t})}/>
              </div>
            }
          </div>
          <div className="six wide column">

            <div className="field">
              <label style={labelStyle}>Incident Description</label>
              <textarea className="ui input" value={description} name="description" style={{height: '12em'}}
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
                      pubMode = "private";
                    } else {
                      pubMode = "group";
                    }
                  }

                  let sys = item.metaData.system;
                  if(sys==undefined){
                    return;
                  }

                  let shouldShow = true;
                  if (system && systemNames.indexOf(system) >= 0 && system != sys) {
                    shouldShow = false
                  } else if (system == 'Others' && systemNames.indexOf(sys) >= 0) {
                    shouldShow = false
                  }

                  return shouldShow && (
                      <tr key={index} onClick={this.handleSelectItem(item)} className={cx({
                        'active': item == this.state.activeItem
                      })}>
                        <td>Incident name/bug ID: {item.metaData.name},
                          Owner: {item.fromUser},
                          Sharing mode: {pubMode}, 
                          System: {item.metaData.system} </td>
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
            <Button className="basic" onClick={this.handleRefresh}>Refresh</Button>
            {activeItem && <Button className="basic" onClick={this.handleRemoveRow.bind(this)}>Remove</Button>}
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
