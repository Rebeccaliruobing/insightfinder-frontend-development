import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const InstanceNumber = ({total, containerTotal, duration='24h' }) => {
  const instanceText = _.isFinite(total) ? total.toString() : '-';
  const containerText = _.isFinite(containerTotal) ? containerTotal.toString() : '-';

  return (
    <div className='grey statistic'>
      <div>
        <span className="title">{`Num of Instances`}</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{`${containerText}/${instanceText}`}</div>
      <div className="label">Container / Instance</div>
    </div>
  )
};

InstanceNumber.propTypes = {
  total: T.number,
  containerTotal: T.number,
  duration: T.string,
};

export default InstanceNumber;
