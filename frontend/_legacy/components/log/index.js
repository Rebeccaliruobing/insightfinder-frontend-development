import React from 'react';
import { Console } from '../../artui/react/index';

import IncidentLogAnalysis from './incident-log-analysis';

export { IncidentLogAnalysis };

export const Log = props => (
  <Console.Wrapper className="log-page">
    {props.children}
  </Console.Wrapper>
);
