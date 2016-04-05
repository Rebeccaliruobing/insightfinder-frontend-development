import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';
import {Console} from '../../../artui/react';

class LiveMonitoring extends React.Component {

  constructor(props) {
    super(props);

    this._el = null;
    this.state = {
      selectProjects: []
    };
  }

  componentDidMount() {
    if (this._el) {
      $(this._el).find('.ui.dropdown').dropdown({
      });
    }
  }

  componentWillUnmount() {
    if (this._el) {
      $(this._el).find('.ui.dropdown').dropdown('destroy');
    }
  }

  render() {

    return (
      <Console.Content>
        <div className="ui segments" ref={c => this._el = c}>
          <Console.Breadcrumb>
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/monitoring" className="section">Cloud Monitoring</Link>
              <i className="right angle icon divider"/>
              <div className="active section">Live Monitoring</div>
          </Console.Breadcrumb>
          <div className="ui message attached">
            <ul>
              <li><b>Model Name</b>: 
                choose your model and model type. A model can have two model types: the Holistic model type uses a single model induced from all metrics, and the Split model type uses a group of models, each induced from one metric. </li>
              <li><b>Anomaly Threshold</b>: 
                choose a number in [0,1) to configure the sensitivity of your anomaly detection tool. Lower values detect a larger variety of anomalies.
              </li>
              <li><b>Duration Threshold</b>: 
                number of continuous anomalies to trigger an alert.
              </li>
            </ul>
          </div>
          <div className="ui segment attached">
            <div className="ui small form equal width">
              <div className="fields">
                <div className="inline field">
                  <label>Project Name</label>
                  <select className="ui fluid dropdown">
                    <option value="app1AWS">app1AWS</option>
                    <option value="app2AWS">app2AWS</option>
                    <option value="appWestAWS">appWestAWS</option>
                    <option value="insightfinderGAE">insightfinderGAE</option>
                    <option value="app2AWStest">app2AWStest</option>
                  </select>
                </div>
                <div className="inline field">
                  <label>Model Type</label>
                  <select className="ui fluid dropdown">
                    <option value="cpu(holistic)">cpu(holistic)</option>
                    <option value="casandra(holistic)">casandra(holistic)</option>
                    <option value="casandra(split)">casandra(split)</option>
                    <option value="cpu-nofilter(holistic)">cpu-nofilter(holistic)</option>
                    <option value="cpu-nofilter(split)">cpu-nofilter(split)</option>
                    <option value="cpu-filter(holistic)">cpu-filter(holistic)</option>
                    <option value="cpu-filter(split)">cpu-filter(split)</option>
                  </select>
                </div>
                <div className="inline field">
                  <label>Anomaly Threshold</label>
                  <select className="ui fluid dropdown">
                    <option value="0.99">0.99</option>
                    <option value="0.97">0.97</option>
                    <option value="0.95">0.95</option>
                    <option value="0.9">0.9</option>
                    <option value="0.5">0.5</option>
                    <option value="0.25">0.25</option>
                  </select>
                </div>
                <div className="inline field">
                  <label>Duration Threshold</label>
                  <select className="ui fluid dropdown">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <button className="ui orange button orange" type="submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default LiveMonitoring;