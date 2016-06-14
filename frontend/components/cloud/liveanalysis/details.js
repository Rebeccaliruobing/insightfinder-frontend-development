import React from 'react';
import {Dygraph} from '../../../artui/react/dataviz';

export class GroupDetail extends React.Component {

  shouldComponentUpdate(nextProps, extState) {
    return nextProps.group !== this.props.group;
  }

  render() {
    let {group, id} = this.props;
    if (group) {
      console.log(group);
      return (
        <div id={id} className="detail-charts">
          <h4 className="ui header">{`Metric Group${group.id}`}</h4>
          <Dygraph data={group.sdata}
                   ylabel={group.unit}
                   labels={group.sname}
                   axisLabelWidth={35}
                   style={{width: '100%', height: '200px'}}
                   highlightCircleSize={2} strokeWidth={3}
                   labelsDivStyles={{padding: '4px', margin:'15px'}}
                   highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                   highlights={group.highlights}
          />
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
    return nextProps.summary !== this.props.summary;
  }

  render() {
    let {summary, onAnnotationSelect, id} = this.props;

    if (summary) {
      return (
        <div id={id} className="detail-charts">
          <h4 className="ui header">Analysis Summary</h4>
          <Dygraph data={summary.series}
                   ylabel="Anomaly Degree"
                   labels={['X', 'Y1']}
                   animatedZooms={true}
                   axisLabelWidth={35}
                   style={{width: '100%', height: '200px'}}
                   highlightCircleSize={2} strokeWidth={3}
                   labelsDivStyles={{padding: '4px', margin:'15px'}}
                   highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                   annotations={summary.annotations}
                   onAnnotationClick={(a) => onAnnotationSelect(a)}
                   highlights={summary.highlights}/>
        </div>
      )
    } else {
      return null;
    }
  }
}
