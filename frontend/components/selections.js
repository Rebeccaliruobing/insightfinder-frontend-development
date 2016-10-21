import React from 'react';
import {Dropdown, Link} from '../artui/react/index';
import classNames from 'classnames';
import _ from "lodash";

class ProjectSelection extends React.Component {

  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {

    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
        <div className="menu"> 
          {
            projects.map((p) => {
              return <div className="item" key={p.projectName}
                          data-value={p.projectName}>{p.projectName}</div>
            })
          }
        </div>
      </Dropdown>
    );
  }
}

// include only and File Replay
class LogFileReplayProjectSelection extends React.Component {

  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {

    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item,index) => item.fileProjectType == 0);
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
        <div className="menu"> 
          {
            projects.map((p) => {
              return <div className="item" key={p.projectName}
                          data-value={p.projectName}>{p.projectName}</div>
            })
          }
        </div>
      </Dropdown>
    );
  }
}

// exclude GCP and File Replay
class InstanceProjectSelection extends React.Component {

  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {

    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item,index) => ((item.fileProjectType!=0)&&(item.projectType!="GAE")&&(item.projectType!="GCE")));
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
        <div className="menu"> 
          {
            projects.map((p) => {
              return <div className="item" key={p.projectName}
                          data-value={p.projectName}>{p.projectName}</div>
            })
          }
        </div>
      </Dropdown>
    );
  }
}

// exclude GCP and File Replay
class LiveProjectSelection extends React.Component {

  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {

    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item,index) => item.fileProjectType!=0);
    var projectNameList = [];
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
        <div className="menu"> 
          {
            projects.map((p,index) => {
              return <div className="item" key={p.projectName+index}
                          data-value={p.projectName}>{p.projectName}</div>
            })
          }
        </div>
      </Dropdown>
    );
  }
}

class ModelNameSelection extends React.Component {

  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };
  constructor(props){
    super(props);
  }
  splitModelString(model){
    let result = model.split(',').map(function (value,index) {
        return value.split('(')[0]
    });
    return _.uniq(result)
  }
  render(){
    let modelString = this.splitModelString((this.context.dashboardUservalues || {}).modelString || "");
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
          <div className="menu">
            {
              (modelString || []).map(function (value,index) {
                return (
                    <div className="item" key={index} data-value={value}>
                      {value}
                    </div>
                )
              })
            }
          </div>
      </Dropdown>
    );
  }
}

class OperationOptionsSelect extends React.Component {
  render(){
    let selectOption = ['update','revert','delete'];
      return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
          <div className="menu">
            {
              selectOption.map(function (value,index) {
                return (
                    <div className="item" key={index} data-value={value}>
                      {value}
                    </div>
                )
              })
            }
          </div>
      </Dropdown>
    );
  }
}

class TreemapOptionsSelect extends React.Component {
  render(){
    let selectOption = [0, 1, 5, 10];
      return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
          <div className="menu">
            {
              selectOption.map(function (value,index) {
                return (
                    <div className="item" key={index} data-value={value}>
                      {'<='+value+'%'}
                    </div>
                )
              })
            }
          </div>
      </Dropdown>
    );
  }
}

class LogModelType extends React.Component{
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
        <div className="menu">
          <div className="item" data-value="Holistic">Holistic</div>
          <div className="item" data-value="DBScan">Clustering (DBScan)</div>
        </div>
      </Dropdown>
    );
  }
};

class ModelType extends React.Component{
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
        <div className="menu">
          <div className="item" data-value="Holistic">Holistic</div>
          <div className="item" data-value="HolisticCP">Holistic + Filtering</div>
          <div className="item" data-value="Split">Split</div>
          <div className="item" data-value="Hybrid">Hybrid</div>
          <div className="item" data-value="DBScan">Clustering (DBScan)</div>
        </div>
      </Dropdown>
    );
  }
};

class ModelTypeSimple extends React.Component{
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
        <div className="menu">
          <div className="item" data-value="Holistic">Holistic</div>
          <div className="item" data-value="Split">Split</div>
        </div>
      </Dropdown>
    );
  }
};

class EventSummaryModelType extends React.Component{
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon"/>
        <div className="menu">
          <div className="item" data-value="Holistic">Holistic</div>
          <div className="item" data-value="Threshold">Threshold</div>
          <div className="item" data-value="DBScan">DBScan</div>
        </div>
      </Dropdown>
    );
  }
};

const  AnomalyThreshold = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item">0.99</div>
        <div className="item">0.97</div>
        <div className="item">0.95</div>
        <div className="item">0.9</div>
        <div className="item">0.5</div>
        <div className="item">0.25</div>
      </div>
    </Dropdown>
  );
};

const DurationThreshold =  (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item">4</div>
        <div className="item" selected>5</div>
        <div className="item">10</div>
        <div className="item">15</div>
        <div className="item">20</div>
        <div className="item">25</div>
        <div className="item">30</div>
      </div>
    </Dropdown>
  );
};

const WindowWithWeek = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item" selected>1</div>
        <div className="item">2</div>
        <div className="item">4</div>
        <div className="item">12</div>
        <div className="item">52</div>
        <div className="item">100</div>
        <div className="item">200</div>
      </div>
    </Dropdown>
  )
};

const DurationHour = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item">6</div>
        <div className="item">12</div>
        <div className="item">18</div>
        <div className="item" selected>24</div>
      </div>
    </Dropdown>
  )
};

const IncidentDurationMinute = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item">0</div>
        <div className="item">5</div>
        <div className="item">15</div>
        <div className="item" selected>30</div>
        <div className="item">60</div>
      </div>
    </Dropdown>
  )
};

const IncidentActionTaken = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item">scale-up</div>
        <div className="item">reboot</div>
        <div className="item">migration</div>
      </div>
    </Dropdown>
  )
};

const NumberOfDays = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item" selected>1</div>
        <div className="item">3</div>
        <div className="item">7</div>
        <div className="item">14</div>
        <div className="item">30</div>
        <div className="item">60</div>
        <div className="item">90</div>
      </div>
    </Dropdown>
  )
};

export {
  ProjectSelection,
  LiveProjectSelection,
  OperationOptionsSelect,
  ModelNameSelection,
  InstanceProjectSelection,
  LogFileReplayProjectSelection,
  ModelType,
  LogModelType,
  ModelTypeSimple,
  EventSummaryModelType,
  AnomalyThreshold,
  DurationThreshold,
  WindowWithWeek,
  DurationHour,
  IncidentDurationMinute,
  IncidentActionTaken,
  NumberOfDays,
  TreemapOptionsSelect
};
