import React, {PropTypes as T} from 'react';

const AnomalyDegree = ({duration='24h' }) => {
  return (
    <div className='statistic' style={{width: 500}}>
      <div>
        <span className="title">Anomaly Degree</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">?</div>
      <div className="label">charts with annotation</div>
    </div>
  )
};

AnomalyDegree.propTypes = {
};

export default AnomalyDegree;
