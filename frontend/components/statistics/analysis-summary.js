import React, {PropTypes as T} from 'react';
import _ from 'lodash';
import {Dygraph} from '../../artui/react/dataviz';

const AnalysisSummary = ({data, duration='24h' }) => {
  console.log(data);
  return (
    <div className='statistic' style={{width: 500}}>
      <div>
        <span className="title">Analysis Summary</span>
        <span className="meta">{duration}</span>
      </div>
      <div className="chart">
        {!_.isEmpty(data) &&
        <Dygraph
          style={{ width: '100%', height: '80px' }}
          axisLabelWidth={45}
          labelsDivStyles={{ padding: '4px', margin: '15px' }}
          data={data.sdata}
          labels={data.sname}
          annotations={data.annotations}
        />
        }
      </div>
    </div>
  )
};

AnalysisSummary.propTypes = {
  data: T.object,
  duration: T.string,
};

export default AnalysisSummary;
