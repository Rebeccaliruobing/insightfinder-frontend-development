import React from 'react';
import {Dygraph} from '../../../artui/react/dataviz';
import moment from 'moment'
import shallowCompare from 'react-addons-shallow-compare';

export class SummaryChart extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
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

// @pureRender
export class DetailsChart extends React.Component {

  constructor(props) {
    super(props);
    this.handleAnnotationClick = this.handleAnnotationClick.bind(this);
  }
  
  shouldComponentUpdate(nextProps, extState) {
    return nextProps.data !== this.props.data ||
      nextProps.dateWindow !== this.props.dateWindow ||
      nextProps.selection !== this.props.selection ||
      nextProps.valueRange !== this.props.valueRange;
  }
  
  handleAnnotationClick(anno) {
    
    // TODO: [FIX] Popup sometimes doesn't show.
    // Destroy popup if exists.
    if (anno && anno.div) {
      var $p = $(anno.div);
      var title = moment(parseInt(anno.x)).format("YYYY-MM-DD HH:mm");
      // Popup will get the content from the DOM title attribute.
      $p.popup({
        on: 'click',
        title: title,
        content: anno.text
      });
      $p.popup('show');
    }
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
        onAnnotationClick={this.handleAnnotationClick}
        data={data.sdata}
        ylabel={data.unit}
        labels={data.sname}
        highlights={data.highlights}
        annotations={data.annotations}
        {...rest} />
    )
  }
}
