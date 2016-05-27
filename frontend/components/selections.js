import React from 'react';
import {Dropdown, Link} from '../artui/react';
import classNames from 'classnames';

class ProjectSelection extends React.Component {

    static contextTypes = {
        dashboardUservalues: React.PropTypes.object
    };

  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  render() {


    let {value, ...others} = this.props;

    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];

    return (
      <Dropdown mode="select" value={value} {...others}>
        <div className="menu">
          {
            projects.map((p) => {
              return <div key={p.projectName} className="item">{p.projectName}</div>
            })
          }
        </div>
      </Dropdown>
    );
  }
}

ProjectSelection.defaultProps = {
  multiple: false
};

const ModelType = (props) => {
  return (
    <Dropdown mode="select" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item">Holistic</div>
        <div className="item">Split</div>
        <div className="item">Hybird</div>
      </div>
    </Dropdown>
  );
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
        <div className="item">5</div>
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
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">4</div>
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
        <div className="item">24</div>
      </div>
    </Dropdown>
  )
};

export {
  ProjectSelection,
  ModelType,
  AnomalyThreshold,
  DurationThreshold,
  WindowWithWeek,
  DurationHour
};
