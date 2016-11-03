import React, {PropTypes as T} from "react";
import moment from "moment";
import _ from "lodash";
import shallowCompare from "react-addons-shallow-compare";
import {autobind} from "core-decorators";
import {Dygraph} from "../../artui/react/dataviz";

export class DataChart extends React.Component {

  static propTypes = {
    enableTriangleHighlight: T.bool,
    enableAnnotations: T.bool,
    onDateWindowChange: T.func,
    dateWindow: T.any,
    chartType: T.string,
  };

  static defaultProps = {
    enableTriangleHighlight: true,
    enableAnnotations: false,
    chartType: 'line',
  };

  constructor(props) {
    super(props);

    this.dateWindow = [];
    this.state = {
      metricTags: props.metricTags
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      metricTags: nextProps.metricTags
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    let update = shallowCompare(this, nextProps, nextState);
    return update;
  }

  @autobind
  handleAnnotationClick(anno) {
    if (anno && anno.div) {
      var $p = $(anno.div);
      var title = moment(parseInt(anno.x)).format("YYYY-MM-DD HH:mm");
      $p.popup({
        on: 'click',
        title: title,
        content: anno.text
      });
      $p.popup('show');
    }
  }

  @autobind
  handleDrawCallback(g) {
    const { onDateWindowChange } = this.props;
    if (onDateWindowChange) {

      const dw = g.xAxisRange();
      if (!_.isEqual(dw, this.dateWindow)) {
        onDateWindowChange(g.xAxisRange());
        this.dateWindow = dw;
      }
    }
  }

  @autobind
  barChartPlotter(e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);

    ctx.fillStyle = e.color;

    // Find the minimum separation between x-values.
    // This determines the bar width.
    var min_sep = Infinity;
    for (var i = 1; i < points.length; i++) {
      var sep = points[i].canvasx - points[i - 1].canvasx;
      if (sep < min_sep) min_sep = sep;
    }
    var bar_width = Math.floor(2.0 / 3 * min_sep);

    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      var center_x = p.canvasx;

      ctx.fillRect(center_x, p.canvasy, bar_width, y_bottom - p.canvasy);
      ctx.strokeRect(center_x, p.canvasy, bar_width, y_bottom - p.canvasy);
    }
  }

  @autobind
  setWeekdaysForBarChar() {
    const {data, chartType} = this.props;

    const days = [
      ['Su', 'Sunday'], ['Mo', 'Monday'],
      ['Tu', 'Tuesday'], ['We', 'Wednesday'],
      ['Th', 'Thursday'], ['Fr', 'Friday'],
      ['Sa', 'Saturday']
    ];

    if (chartType === 'bar' && data.sdata && data.sname) {
      const yname = data.sname[1];
      const annotations = [];
      // Skip the last one to make annotation looks better.
      for(let i = 0; i < data.sdata.length - 1; ++i) {
        const value = data.sdata[i];
        const x = moment(value[0]);
        const wd = x.weekday();
        annotations.push({
          series: yname,
          x: x.valueOf(),
          shortText: days[wd][0],
          text: days[wd][1],
        });
      }

      return annotations
    }

    return data.annotations;
  }

  render() {
    const { data, enableAnnotations, enableTriangleHighlight, chartType,
      onDateWindowChange, dateWindow,latestDataTimestamp } = this.props;
    const annotations = this.setWeekdaysForBarChar(data);
    const listenDrawCallback = !!onDateWindowChange;
    return (
      <Dygraph
        style={{ width: '100%', height: '200px' }}
        chartType={chartType}
        className={chartType}
        axisLabelWidth={55}
        highlightCircleSize={2} strokeWidth={2}
        labelsDivStyles={{ padding: '4px', margin: '15px' }}
        highlightSeriesOpts={{ strokeWidth: 2, strokeBorderWidth: 1, highlightCircleSize: 3 }}
        includeZero={true}
        data={data.sdata}
        ylabel={data.unit}
        labels={data.sname}
        highlights={data.highlights}
        latestDataTimestamp={latestDataTimestamp}
        drawCallback={listenDrawCallback ? this.handleDrawCallback : null}
        dateWindow={dateWindow}
        annotations={enableAnnotations || chartType === 'bar' ? annotations : null}
        plotter={chartType == 'bar' ? this.barChartPlotter : null}
        onAnnotationClick={chartType === 'bar' ? null : this.handleAnnotationClick}
        enableTriangleHighlight={enableTriangleHighlight}
      />
    )
  }
}

export const DataSummaryChart = ({ summary, onDateWindowChange, dateWindow, latestDataTimestamp }) => {
  return (
    <div key="summary_chart" className="sixteen wide column" style={{ paddingTop: 0 }}>
      <div className="detail-charts" style={{ position: 'relative' }}>
        <h4 className="ui header">{summary.title}</h4>
        <DataChart
          enableTriangleHighlight={false}
          enableAnnotations={true} data={summary}
          onDateWindowChange={onDateWindowChange}
          dateWindow={dateWindow}
          latestDataTimestamp={latestDataTimestamp}
        />
      </div>
    </div>
  )
};

export class DataGroupCharts extends React.Component {

  static propTypes = {
    groups: T.any.isRequired,
    view: T.string.isRequired,
    columns: T.string,
    onDateWindowChange: T.func,
    chartType: T.string,
    dateWindow: T.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: void 0,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {

    const { groups, view, columns, latestDataTimestamp, alertMissingData, chartType } = this.props;
    let metricTags = this.props.metricTags;
    const { selectedIndex } = this.state;
    const colSize = ['one', 'two', 'three', 'four', 'five', 'six'].indexOf(columns) + 1;
    const isListView = view === 'list';
    const syncDateWindow = isListView;
    const groupsContainerClass = isListView ? '' : ' ui ' + columns + ' cards';
    const groupsChartClass = isListView ? "detail-charts" : 'ui card';

    const selected = selectedIndex !== undefined;
    const selectedGroup = selected ? groups[selectedIndex] : null;
    const selectedRowId = selected ? Math.floor(selectedIndex / colSize) : void 0;
    return (
      <div className="sixteen wide column" style={{ paddingTop: 0 }}>
        <div className={groupsContainerClass}>

          {groups.sort(function (a, b) {
                                let aHighlight = (a.highlights.length>0);
                                let bHighlight = (b.highlights.length>0);
                                if (aHighlight && !bHighlight) {
                                    return -1;
                                } else if (!aHighlight && bHighlight) {
                                    return 1;
                                } else {
                                  let aMetrics = a.metrics;
                                  let bMetrics = b.metrics;
                                  if (aMetrics < bMetrics) {
                                      return -1;
                                  } else if (aMetrics > bMetrics) {
                                      return 1;
                                  } else {
                                      return 0;
                                  }
                                }
                            }).map((group, index, groups) => {

            const rowId = Math.floor(index / colSize);
            const lastCol = !((index + 1) % colSize);
            const length = groups.length;
            const lastItem = index == length - 1;
            const isSelectedItem = index === selectedIndex;
            let values = [];
            let elems = [];
            let anomalyTag = "";
            if(metricTags && metricTags[group.metrics]){
              anomalyTag = metricTags[group.metrics];
            }
            let missingTag = "";
            if((alertMissingData==undefined || alertMissingData==true) && group.sdata.length>0){
              _.each(group.sdata[0],function(mdata,mindex){
                values.push(0);
              });
              _.each(group.sdata,function(data,index){
                _.each(data,function(mdata,mindex){
                  if(mindex>0 && !isNaN(mdata)){
                    values[mindex] = values[mindex]+1;
                  }
                }); 
              });
              _.each(group.sdata[0],function(mdata,mindex){
                if(mindex>0 && (values[mindex] / group.sdata.length) < 0.95){
                  missingTag = " (missing data)";
                  return false;
                }
              });
            }
            const idx = index;
            elems.push(
              <div key={group.id} className={groupsChartClass} style={{ position: 'relative' }}
                   onClick={() => {
                     if (selectedIndex === idx) {
                       this.setState({ selectedIndex: undefined });
                     } else {
                       this.setState({ selectedIndex: idx })
                     }
                   }}
              >
                <div className="content">
                  <div className="ui header">Metric {group.metrics} <span style={{color:'red'}}>{anomalyTag}</span><span style={{color:'orange'}}>{missingTag}</span></div>
                  <DataChart
                    chartType={chartType}
                    enableTriangleHighlight={true}
                    data={group}
                    latestDataTimestamp={latestDataTimestamp}
                    onDateWindowChange={ syncDateWindow ? this.props.onDateWindowChange : null}
                    dateWindow={ syncDateWindow ? this.props.dateWindow : null}
                  />
                </div>
                {!isListView && isSelectedItem &&
                <div style={{
                  position: 'absolute', width: 20, height: 20, background: '#333',
                  transform: 'rotate(45deg)',
                  left: '50%',
                  bottom: '-25px',
                  marginLeft: -3
                }}/>
                }
              </div>
            );

            if (!isListView &&
              selectedGroup &&
              rowId == selectedRowId && (lastCol || lastItem)) {

              elems.push(
                <div key={'detail_' + rowId} style={{
                  width: '100%', background: 'rgb(51, 51, 51)', padding: '30px 13px',
                  position: 'relative'
                }
                }>
                  <div style={{ width: '100%', backgroundColor: '#fff', padding: 10 }}>
                    <h4 className="ui header">Metric {selectedGroup.metrics}</h4>
                    <DataChart
                      chartType={chartType}
                      enableTriangleHighlight={true}
                      latestDataTimestamp={latestDataTimestamp}
                      enableAnnotations={true} data={selectedGroup}
                    />
                    <i onClick={()=>this.setState({ selectedIndex: undefined })} className="close icon"
                       style={{ position: 'absolute', right: 10, top: 10, color: '#fff', cursor: 'pointer' }}/>
                  </div>
                </div>
              )
            }

            return elems;
          })}
        </div>
      </div>
    )
  }
}
