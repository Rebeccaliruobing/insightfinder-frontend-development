import React, {PropTypes as T} from 'react';

const CPUUtilization = ({average, duration='48h' }) => {
  const averageText = average !== undefined ? average.toFixed(1).toString() : '-';
  const valueStyle = _.isFinite(average) && average < 50 ? 'value error' : 'value';
  return (
    <div className="ui statistic two wide column">
      <div>
        <span className="title">CPU Utilization</span>
        <span className="meta">{duration}</span>
      </div>
      <div className={valueStyle}>{`${averageText}%`}</div>
      <div className="label">Avg</div>
    </div>
  )
};

CPUUtilization.propTypes = {
  average: T.number,
  duration: T.string,
};

export default CPUUtilization;
