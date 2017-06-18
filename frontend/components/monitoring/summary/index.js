import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import { Console, Link, IndexLink } from '../../../artui/react';
import Details from './detail';

class Summary extends React.Component {

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
        onChange: (value, text, $selectedItem) => {
          this.setState({
            selectProjects: _.compact(value.split(','))
          });
        }
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
              <div className="active section">Summary</div>
          </Console.Breadcrumb>
          <div className="ui segment attached">
            <span>Please select project and view daily anomaly summary:
              <div className="ui inline labeled icon multiple dropdown">
                <i className="filter icon"/>
                <input type="hidden" name="projects"/>
                <span className="text"/>
                <div className="menu">
                  <div className="item" data-value="app1AWS">app1AWS</div>
                  <div className="item" data-value="app2AWS">app2AWS</div>
                  <div className="item" data-value="app3AWS">app3AWS</div>
                </div>
              </div>
            </span>
          </div>
          {this.state.selectProjects.map((p) => {
            return <Details key={p} name={p} />
          })}
        </div>
      </Console.Content>
    )
  }
}

export default Summary;