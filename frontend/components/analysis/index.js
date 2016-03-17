import React from 'react';

class Analysis extends React.Component {
  
  render() {
    return (
        <div className="ui grid">
          <div className="three wide column">
            <div className="ui large fluid vertical menu">
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
          </div>
          <div className="thirteen wide column">
          </div>
        </div>
    )
  }
}

export default Analysis;