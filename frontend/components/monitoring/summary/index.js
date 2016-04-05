import React from 'react';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';


class Summary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div>
        <div className="ui breadcrumb segment">
          <IndexLink to="/" className="section">Home</IndexLink>
          <i className="right angle icon divider"></i>
          <Link to="/monitoring" className="section">Cloud Monitoring</Link>
          <i className="right angle icon divider"></i>
          <div className="active section">Summary</div>
        </div>
      </div>
    )
  }
}

export default Summary;