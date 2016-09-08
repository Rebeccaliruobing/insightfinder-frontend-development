import React, {PropTypes as T} from 'react';

const CPUUtilization = ({average, duration='24h' }) => {
  const averageText = average !== undefined ? average.toFixed(1).toString() : '-';
  return (
    <div className={(average < 50 ? 'yellow' : 'grey') + ' statistic'}>
      <div>
        <span className="title">CPU Utilization</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{`${averageText}%`}</div>
      <div className="label">Avg</div>
    </div>
  )
};

CPUUtilization.propTypes = {
  average: T.number,
  duration: T.string,
};

export default CPUUtilization;