import React from 'react';
import {Link} from 'react-router';
import {Console} from '../../artui/react';

class Analysis extends React.Component {

  render() {
    return (
      <Console.Wrapper>
        <Console.Navbar>
          <div className="ui vertical menu inverted">
            <div className="item">
              <div className="header">Models</div>
              <div className="menu">
                <div className="item">Create Model</div>
                <div className="item">Update Model</div>
              </div>
            </div>
            <div className="item">
              <div className="header">Analysis</div>
              <div className="menu">
                <div className="item">Detect Anomalies</div>
                <div className="item">Visualize Data</div>
              </div>
            </div>
          </div>
        </Console.Navbar>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}

export default Analysis;