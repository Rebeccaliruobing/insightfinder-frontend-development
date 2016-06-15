import React from 'react';
import {Dygraph} from '../../../artui/react/dataviz';


const DetailGraph = (props) => {
  return (
    <Dygraph
      style={{width: '100%', height: '200px'}}
      axisLabelWidth={35}
      highlightCircleSize={2} strokeWidth={2}
      labelsDivStyles={{padding: '4px', margin:'15px'}}
      highlightSeriesOpts={{strokeWidth: 2, strokeBorderWidth: 1, highlightCircleSize: 3}}
      {...props}
    />
  )
};

export class GroupDetail extends React.Component {

  shouldComponentUpdate(nextProps, extState) {
    return nextProps.group !== this.props.group ||
      nextProps.dateWindow !== this.props.dateWindow ||
      nextProps.selection !== this.props.selection ||
      nextProps.valueRange !== this.props.valueRange;
  }

  render() {
    let {group, id, ...rest} = this.props;
    if (group) {
      return (
        <div id={id} className="detail-charts">
          <h4 className="ui header">{`Metric Group${group.id}`}</h4>
          <DetailGraph data={group.sdata}
                       ylabel={group.unit}
                       labels={group.sname}
                       highlights={group.highlights} {...rest}/>
        </div>
      )
    } else {
      return null;
    }
  }
}

export class SummaryDetail extends React.Component {

  static defaultProps = {
    onAnnotationSelect: () => {}
  };

  shouldComponentUpdate(nextProps, extState) {
    return nextProps.summary !== this.props.summary ||
      nextProps.dateWindow !== this.props.dateWindow ||
      nextProps.selection !== this.props.selection ||
      nextProps.valueRange !== this.props.valueRange;
  }

  render() {
    let {summary, onAnnotationSelect, id, ...rest} = this.props;

    if (summary) {
      return (
        <div id={id} className="detail-charts">
          <h4 className="ui header">Analysis Summary</h4>
          <DetailGraph data={summary.series}
                       ylabel="Anomaly Degree"
                       labels={['X', 'Y1']}
                       highlights={summary.highlights}
                       annotations={summary.annotations}
                       onAnnotationClick={(a) => onAnnotationSelect(a)} {...rest} />
        </div>
      )
    } else {
      return null;
    }
  }
}
