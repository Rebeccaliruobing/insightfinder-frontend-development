import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const InstanceUptime = ({average, duration='1d' }) => {
  const averageText = _.isFinite(average) ? (average * 100).toFixed(1).toString() : '-';
  return (
    <div className='ui statistic two wide column'>
      <div>
        <span className="title">Instance Uptime</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{`${averageText}%`}</div>
      <div className="label">Avg</div>
    </div>
  )
};

InstanceUptime.propTypes = {
  average: T.number,
  duration: T.string,
};

export default InstanceUptime;