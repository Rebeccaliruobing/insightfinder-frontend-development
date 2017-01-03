import React, { PropTypes as T } from 'react';

const Top5Grid = ({ projectStats }) => {
  const cellStyle = {
    borderRight: '1px solid #666666',
  };
  const metaStyle = {
    color: '#767676',
    fontSize: 13,
    fontWeight: 400,
  };

  return (
    <div className="ui equal width divided padded grid">
      <div className="row" style={{ padding: 0 }}>
        <div className="column" style={cellStyle}>
          <h4>Project/Group Name</h4>
        </div>
        <div className="ui center aligned three wide column" style={cellStyle}>
          <h4>Anomaly Scores</h4>
          <div className="ui center aligned equal width divided grid">
            <div className="row">
              <div className="column">
                <h5 style={metaStyle}>Previous</h5>
              </div>
              <div className="column">
                <h5 style={metaStyle}>Current</h5>
              </div>
              <div className="column">
                <h5 style={metaStyle}>Predicted</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="center aligned column" style={cellStyle}>
          <h4>Anomaly Events</h4>
          <div className="ui center aligned equal width divided grid">
            <div className="row">
              <div className="column">
                <h5 style={metaStyle}>Previous</h5>
              </div>
              <div className="column">
                <h5 style={metaStyle}>Current</h5>
              </div>
              <div className="column">
                <h5 style={metaStyle}>Predicted</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="center aligned column" style={cellStyle}>
          <h4>Anomaly Durations</h4>
          <div className="ui center aligned equal width divided grid">
            <div className="row">
              <div className="column">
                <h5 style={metaStyle}>Previous</h5>
              </div>
              <div className="column">
                <h5 style={metaStyle}>Current</h5>
              </div>
              <div className="column">
                <h5 style={metaStyle}>Predicted</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="center aligned column">
          <h4>Anomaly Severities</h4>
          <div className="ui center aligned equal width divided grid">
            <div className="row">
              <div className="column">
                <i className="remove circle icon" style={{ color: 'red' }} />
              </div>
              <div className="column">
                <i className="minus circle icon" style={{ color: 'orange' }} />
              </div>
              <div className="column">
                <i className="check circle icon" style={{ color: 'green' }} />
              </div>
              <div className="column">
                <i className="selected radio icon" style={{ color: 'grey' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Top5Grid.defaultProps = {
  projectStats: [],
};

Top5Grid.propTypes = {
  projectStats: T.Array,
};

export default Top5Grid;
