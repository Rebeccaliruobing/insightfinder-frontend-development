import React, {PropTypes as T} from 'react';

import AnomalyScore from './anomaly-score';
import TotalAnomalies from './total-anomalies';
import TotalAnomalyDuration from './total-anomaly-duration';

const GroupAnomalies = ({data, dur}) => (
  <div>
   <div className='ui compact equal width grid'>
    <AnomalyScore previousValue={1000} currentValue={2500} predictedValue={1800}
                    duration={dur+'d'} width='equal' />
    <TotalAnomalies previousValue={1000} currentValue={2500} 
										predictedValue={1800} duration={dur+'d'} width='equal' />
    <TotalAnomalyDuration previousValue={1000} currentValue={2500} 
										predictedValue={1800} duration={dur+'d'} width='equal' />
   </div>
   <div className='ui compact grid'>
  </div>
);

GroupAnomalies.propTypes = {
    data: T.object,
};

export default GroupAnomalies;
