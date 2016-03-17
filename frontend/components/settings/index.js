import React from 'react';

class Settings extends React.Component {
  render() {
    return (
        <div className="ui grid">
          <div className="three wide column">
            <div className="ui large fluid vertical menu">
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
          </div>
          <div className="thirteen wide column">
          </div>
        </div>
    )
  }
}

export default Settings;