import React from 'react';

const InstanceUptime = ({average, duration='24h' }) => {
  const averageText = average !== undefined ? average.toFixed(1).toString() : '-';
  return (
    <div className='grey statistic'>
      <div>
        <span className="title">Instance Uptime</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{`${averageText}%`}</div>
      <div className="label">Avg</div>
    </div>
  )
};

export default InstanceUptime;