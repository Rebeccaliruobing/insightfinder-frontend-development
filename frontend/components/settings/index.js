import React from 'react';
import {Link} from 'react-router';
import {Console} from '../../artui/react';

class Settings extends React.Component {
  render() {
    return (
      <Console.Wrapper>
        <Console.Navbar>
          <div className="ui vertical menu inverted">
            <div className="item">
              <div className="header">Settings</div>
              <div className="menu">
                <div className="item">Threshold Settings</div>
              </div>
            </div>
            <div className="item">
              <div className="header">Integration</div>
              <div className="menu">
                <div className="item">PagerDuty Integration</div>
              </div>
            </div>
          </div>
        </Console.Navbar>
      </Console.Wrapper>
    )
  }
}

export default Settings;