import React, {PropTypes as T} from 'react';

const CPUUtilization = ({average, type='avg', duration='1d', width='two' }) => {
  let className = "ui statistic "+width+" wide column";
  if(width=='equal'){
    className = "ui statistic column";
  }
  let roundedAvg = Math.round(average*10)/10;
  let averageText = average !== undefined ? roundedAvg.toString() : '-';
  const valueStyle = _.isFinite(average) && average < 50 ? 'value error' : 'value';
  const typeLabel = type;
  return (
    <div className={className}>
      <div>
        <span className="title">CPU Utilization</span>
        <span className="meta">{duration}</span>
      </div>
      <div className={valueStyle}>{`${averageText}%`}</div>
      <div className="label">{type}</div>
    </div>
  )
};

CPUUtilization.propTypes = {
  average: T.number,
  duration: T.string,
};

export default CPUUtilization;
