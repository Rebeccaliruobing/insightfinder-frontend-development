import React, {PropTypes as T} from 'react';

const AnomalyDegree = ({duration='24h' }) => {
  return (
    <div className='statistic' style={{width: 200}}>
      <div>
        <span className="title">Anomaly Degree</span>
        <span className="meta">{duration}</span>
      </div>
    </div>
  )
};

AnomalyDegree.propTypes = {
};

export default AnomalyDegree;
