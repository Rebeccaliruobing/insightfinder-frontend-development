import React from 'react';
import {Dygraph} from '../../../artui/react/dataviz';
import pureRender from 'pure-render-decorator';


@pureRender
export
class SummaryChart extends React.Component {

  shouldComponentUpdate(nextProps, extState) {
    return nextProps.data !== this.props.data ||
      nextProps.dateWindow !== this.props.dateWindow ||
      nextProps.selection !== this.props.selection ||
      nextProps.valueRange !== this.props.valueRange;
  }

  render() {
    let {data, ...rest} = this.props;
    return (
      <Dygraph
        style={{width: '100%', height: '140px'}}
        axisLabelWidth={35}
        highlightCircleSize={2} strokeWidth={2}
        labelsDivStyles={{padding: '4px', margin:'15px'}}
        highlightSeriesOpts={{strokeWidth: 2, strokeBorderWidth: 1, highlightCircleSize: 3}}
        data={data.sdata}
        ylabel={data.unit}
        labels={data.sname}
        highlights={data.highlights}
        {...rest} />
    )
  }
}

@pureRender
export class DetailsChart extends React.Component {

  shouldComponentUpdate(nextProps, extState) {
    return nextProps.data !== this.props.data ||
      nextProps.dateWindow !== this.props.dateWindow ||
      nextProps.selection !== this.props.selection ||
      nextProps.valueRange !== this.props.valueRange;
  }

  render() {
    let {data, ...rest} = this.props;
    return (
      <Dygraph
        style={{width: '100%', height: '200px'}}
        axisLabelWidth={35}
        highlightCircleSize={2} strokeWidth={2}
        labelsDivStyles={{padding: '4px', margin:'15px'}}
        highlightSeriesOpts={{strokeWidth: 2, strokeBorderWidth: 1, highlightCircleSize: 3}}
        data={data.sdata}
        ylabel={data.unit}
        labels={data.sname}
        highlights={data.highlights}
        annotations={data.annotations}
        {...rest} />
    )
  }
}
