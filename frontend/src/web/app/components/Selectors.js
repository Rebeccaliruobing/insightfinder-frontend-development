/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { Select } from '../../../lib/fui/react';

type Props = {
};

const RareEventSensitivityOptions = [
  { label: 'Low', value: '1' },
  { label: 'Medium Low', value: '2' },
  { label: 'Medium', value: '3' },
  { label: 'Medium High', value: '4' },
  { label: 'High', value: '5' },
];
export const RareEventSensitivity = ({ ...rest }: Props) => (
  <Select options={RareEventSensitivityOptions} {...rest} />
);

const AnomalyThresholdSensitivityOptions = [
  { label: 'Low', value: '0.99' },
  { label: 'Medium Low', value: '0.95' },
  { label: 'Medium', value: '0.9' },
  { label: 'Medium High', value: '0.75' },
  { label: 'High', value: '0.5' },
];
export const AnomalyThresholdSensitivity = ({ ...rest }: Props) => (
  <Select options={AnomalyThresholdSensitivityOptions} {...rest} />
);

const PredictionWindowHourOptions = [
  { label: '4', value: '4' },
  { label: '12', value: '12' },
  { label: '24', value: '24' },
  { label: '48', value: '48' },
];
export const PredictionWindowHour = ({ ...rest }: Props) => (
  <Select options={PredictionWindowHourOptions} {...rest} />
);

const DurationThresholdOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '30', value: '30' },
];
export const DurationThreshold = ({ ...rest }: Props) => (
  <Select options={DurationThresholdOptions} {...rest} />
);

export default {
  AnomalyThresholdSensitivity,
  RareEventSensitivity,
  PredictionWindowHour,
  DurationThreshold,
};
