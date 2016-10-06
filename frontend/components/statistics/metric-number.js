import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const MetricNumber = ({total, duration='1d' }) => {
  const totalText = _.isFinite(total) ? total.toString() : '-';
  return (
    <div className='ui statistic two wide column'>
      <div>
        <span className="title">{`Num of Metrics`}</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{totalText}</div>
      <div className="label">Total</div>
    </div>
  )
};

MetricNumber.propTypes = {
  total: T.number,
  anomaly: T.number,
  duration: T.string,
};

export default MetricNumber;
