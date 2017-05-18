import React from 'react';
import { Select } from '../../../lib/fui/react';

const RareEventSensitivity = ({ style, ...rest }) => {
  const options = [
    { label: 'Low', value: '1' },
    { label: 'Medium Low', value: '2' },
    { label: 'Medium', value: '3' },
    { label: 'Medium High', value: '4' },
    { label: 'High', value: '5' },
  ];

  return (
    <Select options={options} {...rest} style={{ width: 100, ...style }} />
  );
};

const AnomalyThresholdSensitivity = ({ style, ...rest }) => {
  const options = [
    { label: 'Low', value: '0.99' },
    { label: 'Medium Low', value: '0.95' },
    { label: 'Medium', value: '0.9' },
    { label: 'Medium High', value: '0.75' },
    { label: 'High', value: '0.5' },
  ];

  return (
    <Select options={options} {...rest} style={{ width: 100, ...style }} />
  );
};

export default {
  AnomalyThresholdSensitivity,
  RareEventSensitivity,
};
