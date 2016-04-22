import React from 'react';
import {Dropdown, Link} from '../artui/react';

class ProjectSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: ['app2AWS', 'appWestAWS', 'AppGAE', '中文', '中', '我真的很长很长很长很长']
    }
  }
  
  render() {
    let projects = this.state['projects'];
    
    return (
      <Dropdown {...this.props}>
        <span className="text" />
        <i className="dropdown icon"/>
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

export {ProjectSelection};

export const ModelType = (props) => {
  return (
    <Dropdown className="selection" {...props}>
      <i className="dropdown icon"/>
      <div className="menu">
        <div className="item">Holistic</div>
        <div className="item">Split</div>
      </div>
    </Dropdown>
  );
};

export default {
  AnomalyThreshold: function() {
    return [
      (
        <label key="label">Anomaly Threshold</label>
      ), (
        <select key="values" className="ui dropdown">
          <option value="0.99">0.99</option>
          <option value="0.97">0.97</option>
          <option value="0.95">0.95</option>
          <option value="0.9">0.9</option>
          <option value="0.5">0.5</option>
          <option value="0.25">0.25</option>
        </select>
      )
    ];
  },

  DurationThreshold: function() {
    return [
      (
        <label key="label">Duration Threshold</label>
      ), (
        <select key="values" className="ui dropdown">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      )
    ];
  }
};