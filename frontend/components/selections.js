import React from 'react';
import {Dropdown, Link} from '../artui/react';
import classNames from 'classnames';

class ProjectSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: ['app3GAE', 'VCL5', 'hadoopAWS']
    }
  }
  
  render() {
    
    let projects = this.state['projects'];
    let {value, ...others} = this.props;
    
    return (
      <Dropdown mode="select" value={value} {...others}>
        <div className="menu">
          {
            projects.map((p) => {
              return <div key={p} className="item">{p}</div>
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

export {ProjectSelection, ModelType,
  AnomalyThreshold, DurationThreshold
};
