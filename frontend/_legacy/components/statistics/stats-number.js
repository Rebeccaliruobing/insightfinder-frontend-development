import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const StatsNumber = ({title, number, prevNumber, label='Total', duration='1d', width='two' }) => {
  let className = "ui statistic "+width+" wide column";
  if(width=='equal'){
    className = "ui statistic column";
  }
  const valueStyle = _.isFinite(number) && number>0 ? 'value error' : 'value';
  let numberString = number!=undefined ? number.toString() : "-";
  return (
    <div className={className}>
      <div>
        <span className="title">{title}</span>
        <span className="meta">{duration}</span>
      </div>
      <div className={valueStyle}>
      {prevNumber!=undefined && prevNumber>number &&
        <span style={{fontWeight:'bold', color:'green'}}>&darr;&nbsp;</span>}
      {prevNumber!=undefined && prevNumber<number &&
        <span style={{fontWeight:'bold', color:'red'}}>&uarr;&nbsp;</span>}
      {numberString}</div>
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
