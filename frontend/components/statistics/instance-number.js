import React, {PropTypes as T} from 'react';

const InstanceNumber = ({total, anomaly, duration='24h' }) => {
  const percent = (total && anomaly) ? (anomaly / total * 100).toFixed(1).toString() : '-';
  const anomalyText = anomaly !== undefined ? anomaly.toString() : '-';
  const totalText = total !== undefined ? total.toString() : '-';
  return (
    <div className='grey statistic'>
      <div>
        <span className="title">{`Instances (${percent}%)`}</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="value">{`${anomalyText}/${totalText}`}</div>
      <div className="label">Anomaly / Total</div>
    </div>
  )
};

InstanceNumber.propTypes = {
  total: T.number,
  anomaly: T.number,
  duration: T.string,
};

export default InstanceNumber;
