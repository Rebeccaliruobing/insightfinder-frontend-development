import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import _ from 'lodash';
import { State } from '../src/common/types';
import { Dropdown } from '../artui/react/index';

class ProjectSelectionCore extends React.Component {
  render() {
    const { projects, ...rest } = this.props;
    return (
      <Dropdown mode="select" {...rest}>
        <i className="dropdown icon" />
        <div className="menu">
          {
            projects.map((p) => {
              return (
                <div className="item" key={p.projectName} data-value={p.projectName}>{p.projectName}</div>
              );
            })
          }
        </div>
      </Dropdown>
    );
  }
}
const ProjectSelection = connect(
  (state: State) => ({
    projects: state.app.projects,
  }), {},
)(ProjectSelectionCore);

// include only and File Replay
class LogFileReplayProjectSelectionCore extends React.Component {
  render() {
    const { projects, ...rest } = this.props;
    return (
      <Dropdown mode="select" {...rest}>
        <i className="dropdown icon" />
        <div className="menu">
          {
            projects.map((p) => {
              return (
                <div className="item" key={p.projectName} data-value={p.projectName}>{p.projectName}</div>
              );
            })
          }
        </div>
      </Dropdown>
    );
  }
}
const LogFileReplayProjectSelection = connect(
  (state: State) => ({
    projects: R.filter(p => p.isLogFile, state.app.projects),
  }), {},
)(LogFileReplayProjectSelectionCore);

class InstanceProjectSelectionCore extends React.Component {
  render() {
    const { projects, ...rest } = this.props;
    return (
      <Dropdown mode="select" {...rest}>
        <i className="dropdown icon" />
        <div className="menu">
          {
            projects.map((p) => {
              return (
                <div className="item" key={p.projectName} data-value={p.projectName}>{p.projectName}</div>
              );
            })
          }
        </div>
      </Dropdown>
    );
  }
}
const InstanceProjectSelection = connect(
  (state: State) => ({
    projects: R.filter(p => p.isMetric, state.app.projects),
  }), {},
)(InstanceProjectSelectionCore);

// exclude GCP and File Replay
class LiveProjectSelectionCore extends React.Component {
  render() {
    const { projects, ...rest } = this.props;
    return (
      <Dropdown mode="select" {...rest}>
        <i className="dropdown icon" />
        <div className="menu">
          {
            projects.map((p, index) => {
              return (
                <div className="item" key={p.projectName + index} data-value={p.projectName}>{p.projectName}</div>
              );
            })
          }
        </div>
      </Dropdown>
    );
  }
}
const LiveProjectSelection = connect(
  (state: State) => ({
    projects: R.filter(p => p.isMetric, state.app.projects),
  }), {},
)(LiveProjectSelectionCore);


class ModelNameSelection extends React.Component {

  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };
  constructor(props) {
    super(props);
  }
  splitModelString(model) {
    let result = model.split(',').map(function (value, index) {
      return value.split('(')[0]
    });
    return _.uniq(result)
  }
  render() {
    let modelString = this.splitModelString((this.context.dashboardUservalues || {}).modelString || "");
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          {
            (modelString || []).map(function (value, index) {
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
  render() {
    let selectOption = ['update', 'revert', 'delete'];
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          {
            selectOption.map(function (value, index) {
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

class TreeMapCPUThresholdSelect extends React.Component {
  render() {
    let selectOption = [0, 1, 5, 10];
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          {
            selectOption.map(function (value, index) {
              return (
                <div className="item" key={index} data-value={value}>
                  {'<=' + value + '%'}
                </div>
              )
            })
          }
        </div>
      </Dropdown>
    );
  }
}

class TreeMapAvailabilityThresholdSelect extends React.Component {
  render() {
    let selectOption = [90, 80, 50, 25];
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          {
            selectOption.map(function (value, index) {
              return (
                <div className="item" key={index} data-value={value}>
                  {'<=' + value + '%'}
                </div>
              )
            })
          }
        </div>
      </Dropdown>
    );
  }
}

class LogModelType extends React.Component {
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          <div className="item" data-value="holisticLog">Holistic</div>
          <div className="item" data-value="DBScan">Clustering (DBScan)</div>
        </div>
      </Dropdown>
    );
  }
};

// <div className="item" data-value="HolisticCP">Holistic + Filtering</div>
class ModelType extends React.Component {
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          <div className="item" data-value="Holistic">Holistic</div>
          <div className="item" data-value="Split">Split</div>
          <div className="item" data-value="Hybrid">Hybrid</div>
          <div className="item" data-value="DBScan">Clustering (DBScan)</div>
        </div>
      </Dropdown>
    );
  }
};

// <div className="item" data-value="HolisticCP">Holistic + Filtering</div>
class BenchmarkModelType extends React.Component {
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          <div className="item" data-value="Holistic">IF Anomaly Detection</div>
          <div className="item" data-value="DBScan">Clustering (DBScan)</div>
        </div>
      </Dropdown>
    );
  }
};

class FileModelType extends React.Component {
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          <div className="item" data-value="Holistic">Holistic</div>
          <div className="item" data-value="SplitByGroup">SplitByGroup</div>
          <div className="item" data-value="SplitByService">SplitByService</div>
          <div className="item" data-value="Split">Split</div>
          <div className="item" data-value="Hybrid">Hybrid</div>
          <div className="item" data-value="DBScan">Clustering (DBScan)</div>
        </div>
      </Dropdown>
    );
  }
};

class ModelTypeSimple extends React.Component {
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          <div className="item" data-value="Holistic">Holistic</div>
          <div className="item" data-value="SplitByGroup">SplitByGroup</div>
          <div className="item" data-value="SplitByService">SplitByService</div>
          <div className="item" data-value="Split">Split</div>
        </div>
      </Dropdown>
    );
  }
};

class EventSummaryModelType extends React.Component {
  componentDidMount() {
    if (!this.props.value) this.props.onChange && this.props.onChange('Holistic');
  }
  render() {
    return (
      <Dropdown mode="select" {...this.props}>
        <i className="dropdown icon" />
        <div className="menu">
          <div className="item" data-value="Holistic">Holistic</div>
          <div className="item" data-value="Threshold">Threshold</div>
          <div className="item" data-value="DBScan">DBScan</div>
        </div>
      </Dropdown>
    );
  }
};

const RareEventSensitivity = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon" />
      <div className="menu">
        <div className="item" data-value="1">Low</div>
        <div className="item" data-value="2">Medium Low</div>
        <div className="item" data-value="3">Medium</div>
        <div className="item" data-value="4">Medium High</div>
        <div className="item" data-value="5">High</div>
      </div>
    </Dropdown>
  );
};

const AnomalyThresholdSensitivity = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon" />
      <div className="menu">
        <div className="item" data-value="0.99">Low</div>
        <div className="item" data-value="0.95">Medium Low</div>
        <div className="item" data-value="0.9">Medium</div>
        <div className="item" data-value="0.75">Medium High</div>
        <div className="item" data-value="0.5">High</div>
      </div>
    </Dropdown>
  );
};

const AnomalyThreshold = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon" />
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

const DurationThreshold = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon" />
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
      <i className="dropdown icon" />
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
      <i className="dropdown icon" />
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
      <i className="dropdown icon" />
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
      <i className="dropdown icon" />
      <div className="menu">
        <div className="item">ignore</div>
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
      <i className="dropdown icon" />
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

const TreeMapSchemeSelect = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon" />
      <div className="menu">
        <div className="item" data-value='anomaly'>Anomaly</div>
        <div className="item" data-value='cpu'>CPU Utilization</div>
        <div className="item" data-value='availability'>Availability</div>
      </div>
    </Dropdown>
  )
};

const PredictionWindowHour = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon" />
      <div className="menu">
        <div className="item">4</div>
        <div className="item">12</div>
        <div className="item">24</div>
        <div className="item">48</div>
      </div>
    </Dropdown>
  )
};

const ForecastIntervalHour = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon" />
      <div className="menu">
        <div className="item">3</div>
        <div className="item">6</div>
        <div className="item">12</div>
        <div className="item">24</div>
      </div>
    </Dropdown>
  )
};

const EnvironmentSelect = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon" />
      <div className="menu">
        <div className="item">prod</div>
        <div className="item">staging</div>
        <div className="item">dev</div>
      </div>
    </Dropdown>
  )
};

const GroupingCriteriaSelection = props => (
  <Dropdown mode="select" {...props}>
    <i className="dropdown icon" />
    <div className="menu">
      <div className="item">Service Name</div>
      <div className="item">Security Group</div>
      <div className="item">Environment</div>
      <div className="item">Business Unit</div>
      <div className="item">Location</div>
    </div>
  </Dropdown>
);

const GroupingMatchOpSelection = props => (
  <Dropdown mode="select" {...props}>
    <i className="dropdown icon" />
    <div className="menu">
      <div className="item" data-value="contains">contains</div>
      <div className="item" data-value="startwith">start with</div>
      <div className="item" data-value="equal">=</div>
      <div className="item" data-value="ge">&gt;=</div>
      <div className="item" data-value="gt">&gt;</div>
      <div className="item" data-value="le">&lt;=</div>
      <div className="item" data-value="lt">&lt;</div>
      <div className="item" data-value="regex">regex</div>
    </div>
  </Dropdown>
);

const GroupingSeperateModelSelection = props => (
  <Dropdown mode="select" {...props}>
    <i className="dropdown icon" />
    <div className="menu">
      <div className="item">yes</div>
      <div className="item">no</div>
    </div>
  </Dropdown>
);

export {
  ProjectSelection,
  LiveProjectSelection,
  OperationOptionsSelect,
  ModelNameSelection,
  InstanceProjectSelection,
  LogFileReplayProjectSelection,
  ModelType,
  BenchmarkModelType,
  FileModelType,
  LogModelType,
  ModelTypeSimple,
  EventSummaryModelType,
  AnomalyThreshold,
  AnomalyThresholdSensitivity,
  RareEventSensitivity,
  DurationThreshold,
  WindowWithWeek,
  DurationHour,
  IncidentDurationMinute,
  IncidentActionTaken,
  NumberOfDays,
  TreeMapCPUThresholdSelect,
  TreeMapAvailabilityThresholdSelect,
  TreeMapSchemeSelect,
  ForecastIntervalHour,
  PredictionWindowHour,
  EnvironmentSelect,
  GroupingCriteriaSelection,
  GroupingMatchOpSelection,
  GroupingSeperateModelSelection,
};
