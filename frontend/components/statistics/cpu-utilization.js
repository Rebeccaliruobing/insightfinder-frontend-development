import React, {PropTypes as T} from 'react';
import cx from 'classnames';

const CPUUtilization = ({average = 0, duration='24H' }) => {
  const value = average.toFixed(1) + '%';
  return (
    <div className={(average < 50 ? 'red' : '') + ' statistic'}>
      <div className="value">{value}</div>
    </div>
  )
};

CPUUtilization.propTypes = {
  average: T.number.isRequired,
};

export default CPUUtilization;