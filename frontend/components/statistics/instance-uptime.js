import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const InstanceUptime = ({average, type='avg', duration='1d', width='two' }) => {
  let className = "ui statistic "+width+" wide column";
  if(width=='equal'){
    className = "ui statistic column";
  }
  let roundedAvg = Math.round(average*1000)/10;
  let averageText = _.isFinite(average) ? roundedAvg.toString() : '-';
  return (
    <div className={className}>
      <div>
        <span className="title">Availability</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{`${averageText}%`}</div>
      <div className="label">{type}</div>
    </div>
  )
};

InstanceUptime.propTypes = {
  average: T.number,
  type: T.string,
  duration: T.string,
};

export default InstanceUptime;