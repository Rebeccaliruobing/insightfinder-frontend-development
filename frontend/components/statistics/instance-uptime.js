import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const InstanceUptime = ({average, type='avg', duration='1d', width='two' }) => {
  const className = "ui statistic "+width+" wide column";
  const averageText = _.isFinite(average) ? (average * 100).toFixed(1).toString() : '-';
  return (
    <div className={className}>
      <div>
        <span className="title">Instance Uptime</span>
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