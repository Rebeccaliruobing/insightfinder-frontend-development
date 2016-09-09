import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const InstanceNumber = ({total, containerTotal}) => {
  const instanceText = _.isFinite(total) ? total.toString() : '-';
  const containerText = _.isFinite(containerTotal) ? containerTotal.toString() : '0';

  return (
    <div className='ui statistic two wide column'>
      <div>
        <span className="title">{`Num of Instances`}</span>
      </div>
      <div className="value">{`${containerText}/${instanceText}`}</div>
      <div className="label">Container / Instance</div>
    </div>
  )
};

InstanceNumber.propTypes = {
  total: T.number,
  containerTotal: T.number,
};

export default InstanceNumber;
