import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const InstanceNumber = ({total, containerTotal, duration='1d', width='two' }) => {
  const className = "ui statistic "+width+" wide column";
  const instanceText = _.isFinite(total) ? total.toString() : '-';
  const containerText = _.isFinite(containerTotal) ? containerTotal.toString() : '0';
  const hasContainer = _.isFinite(containerTotal) && containerTotal > 0;

  const value = hasContainer ? `${containerText}/${instanceText}` : instanceText;
  const label = hasContainer ? 'Container / Instance' : 'Instance';

  return (
    <div className={className}>
      <div>
        <span className="title">{`Num of Instances`}</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  )
};

InstanceNumber.propTypes = {
  total: T.number,
  containerTotal: T.number,
  duration: T.string,
};

export default InstanceNumber;
