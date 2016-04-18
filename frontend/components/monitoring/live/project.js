/*
 * Project
 **/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import {Wireframes} from '../../../artui/prototype';
import {Popup} from '../../../artui/react';
import Details from './details';

const Project = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="active content">
        <div className="ui five cards">
          <a className="card" onClick={()=> this.setState({showDetails:true})}>
            <div className="content">
              <Popup>
                <i className="right floated table icon"/>
                <div key="popup" className="ui popup">
                  <table className="ui tiny table">
                    <thead>
                    <tr>
                      <th>Instance</th>
                      <th>Min</th>
                      <th>Max</th>
                      <th>Avg</th>
                      <th>Std</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>i-8c48fa0c</td>
                      <td>0.00</td>
                      <td>0.434</td>
                      <td>0.0392</td>
                      <td>0.0418</td>
                    </tr>
                    <tr>
                      <td>i-8c48fa0c</td>
                      <td>0.00</td>
                      <td>0.434</td>
                      <td>0.0392</td>
                      <td>0.0418</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </Popup>
              <div className="header">Summary</div>
            </div>
            <img className="ui image" src={Wireframes.image} />
          </a>
          <a className="card" onClick={()=> this.setState({showDetails:false})}>
            <div className="content">Group 1</div>
            <img className="ui image" src={Wireframes.image} />
          </a>
          <a className="card">
            <div className="content">Group 2</div>
            <img className="ui image" src={Wireframes.image} />
          </a>
          <a className="card">
            <div className="content">Group 3</div>
            <img className="ui image" src={Wireframes.image} />
          </a>
          <a className="card">
            <div className="content">Group 4</div>
            <img className="ui image" src={Wireframes.image} />
          </a>
        </div>
        { this.state['showDetails'] && <Details/> }
      </div>
    )
  }
};

Project.propTypes = {
};

Project.defaultProps = {
};

export default Project;