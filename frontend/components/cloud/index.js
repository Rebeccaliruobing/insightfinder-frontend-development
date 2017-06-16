import React from 'react';
import { Console } from '../../artui/react/index';

import HistoricalReport from './historical-report';
import { InsightReport } from './insight-report';
import IncidentAnalysis from './incident-analysis';
import OutlierDetection from './outlier-detection';
import RolloutCheck from './rollout-check';
import SummaryReport from './summary-report';
import BehaviorChangeDetection from './behavior-change-detection';
import AppForecast from '../../containers/app-forecast';

export { InsightReport };
export { HistoricalReport };
export { IncidentAnalysis };
export { BehaviorChangeDetection };
export { OutlierDetection };
export { RolloutCheck };
export { SummaryReport };
export { AppForecast };

export const Cloud = props => (
  <Console.Wrapper className="cloud-page">
    {props.children}
  </Console.Wrapper>
);
