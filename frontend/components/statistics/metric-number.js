import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const MetricNumber = ({total, duration='1d', width='two' }) => {
  let className = "ui statistic "+width+" wide column";
  if(width=='equal'){
    className = "ui statistic column";
  }
  const totalText = _.isFinite(total) ? total.toString() : '-';
  return (
    <div className={className}>
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
  duration: T.string,
  width: T.string,
};

export default MetricNumber;
