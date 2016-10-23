import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const StatsNumber = ({title, number, label='Total', duration='1d', width='two' }) => {
  const className = "ui statistic "+width+" wide column";
  let numberString = number ? number.toString() : "-";
  return (
    <div className={className}>
      <div>
        <span className="title">{title}</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value error">{numberString}</div>
      <div className="label">{label}</div>
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
