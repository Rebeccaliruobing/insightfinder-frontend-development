import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const BoxedBarchart = ({props, duration='1d' }) => {
  return (
    <div className='ui statistic two wide column'>
      <div>
        <span className="title">{`Num of Metrics`}</span>
        <span className="meta">{duration}</span>
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
