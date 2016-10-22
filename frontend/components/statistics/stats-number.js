import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const StatsNumber = ({title, number, duration='1d', width='two' }) => {
  const className = "ui statistic "+width+" wide column";
  return (
    <div className={className}>
      <div>
        <span className="title">{title}</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{number}</div>
      <div className="label">Total</div>
    </div>
  )
};

StatsNumber.propTypes = {
  title: T.string,
  number: T.number,
  duration: T.string,
  width: T.string,
};

export default StatsNumber;
