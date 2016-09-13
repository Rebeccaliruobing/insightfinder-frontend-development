import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const BoxedBarchart = ({props}) => {
  return (
    <div className='ui statistic two wide column'>
      <div>
        <span className="title">{`Num of Metrics`}</span>
      </div>
      <BarChart title={props.title} pieChartStyle={pieChartLeft}
                data={props.data}
                option={{title: {y: 'top'}}}
                colorChart="#C13100"
                useData={true}/>
      <div className="label"></div>
    </div>
  )
};

export default MetricNumber;
