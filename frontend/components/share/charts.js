import React, { PropTypes as T } from 'react';
import moment from 'moment';
import R from 'ramda';
import $ from 'jquery';
import _ from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import { Dygraph } from '../../artui/react/dataviz';

export class DataChart extends React.Component {

  static propTypes = {
    enableTriangleHighlight: T.bool,
    enableAnnotations: T.bool,
    onDateWindowChange: T.func,
    onAnnotationClick: T.func,
    showLineChartWithAnnotation: T.bool,
    dateWindow: T.any,
    chartType: T.string,
    isLogCharts: T.bool,
  };

  static defaultProps = {
    enableTriangleHighlight: true,
    enableAnnotations: false,
    showLineChartWithAnnotation: false,
    onAnnotationClick: () => { },
    chartType: 'line',
    isLogCharts: false,
  };

  constructor(props) {
    super(props);

    this.dateWindow = [];
    this.state = {
      metricTags: props.metricTags,
    };
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
      const x = anno.x;
      const { onAnnotationClick, showLineChartWithAnnotation } = this.props;
      const dowAnnotations = this.setWeekdaysForBarChar(this.props.data);
      let { annotations } = this.props;
      annotations = annotations || dowAnnotations;

      // Get the annotion from data which has full infos.
      const annotation = R.find(a => a.x === x, annotations);
      if (annotation) {
        let text = annotation.text;
        const $p = $(anno.div);
        let title = moment(parseInt(anno.x, 10)).format('YYYY-MM-DD HH:mm');
        if (showLineChartWithAnnotation) {
          title = `<div class="header">${title}<i class="line chart icon"></i></div>`;
        } else {
          title = `<div class="header">${title}</div>`;
        }
        text = _.replace(text, /[,;]\n/g, '<br>');
        text = _.replace(text, /Root cause /g, '');
        text = _.replace(text, /, metric:/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;metric:');
        const content = `<div class="content">${text}</div>`;
        const $html = $(`<div class="dygraph popup-content">${title}${content}</div>`);

        if (showLineChartWithAnnotation) {
          const $lineChart = $html.find('.line.chart.icon');
          const click = () => {
            $p.popup('destroy');
            onAnnotationClick(annotation);
            $lineChart.off('click', click);
          };
          $lineChart.on('click', click);
        }

        $p.popup({
          on: 'click',
          html: $html,
        });
        $p.popup('show');
      }
    }
  }

  @autobind
  handleClick(e, x) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(x, { x: e.clientX, y: e.clientY });
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
    const { barColors } = this.props;
    const ctx = e.drawingContext;
    const points = e.points;
    const yBottom = e.dygraph.toDomYCoord(0);

    // Find the minimum separation between x-values.
    // This determines the bar width.
    let minSep = Infinity;
    for (let i = 1; i < points.length; i++) {
      const sep = points[i].canvasx - points[i - 1].canvasx;
      if (sep < minSep) minSep = sep;
    }
    const barWidth = Math.floor((2.0 / 3) * minSep);

    // Do the actual plotting.
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const centerX = p.canvasx;

      ctx.fillStyle = !barColors ? e.color : barColors[p.xval] || e.color;
      ctx.strokeStyle = !barColors ? e.color : barColors[p.xval] || e.color;

      ctx.fillRect(centerX, p.canvasy, barWidth, yBottom - p.canvasy);
      ctx.strokeRect(centerX, p.canvasy, barWidth, yBottom - p.canvasy);
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

      return annotations;
    }

    return data.annotations;
  }

  render() {
    let { data, enableAnnotations, enableTriangleHighlight, chartType,
      onDateWindowChange, dateWindow,latestDataTimestamp,
      eventEndTime, eventStartTime, annotations, onClick, isLogCharts, style,
    } = this.props;
    const dowAnnotations = this.setWeekdaysForBarChar(data);
    annotations = annotations || dowAnnotations;
    const listenDrawCallback = !!onDateWindowChange;
    return (
      <Dygraph
        style={{ width: '100%', height: '200px', ...style }}
        isLogCharts={isLogCharts}
        chartType={chartType}
        className={chartType}
        axisLabelWidth={55}
        highlightCircleSize={2} strokeWidth={2}
        labelsDivStyles={{ padding: '4px', margin: '15px' }}
        highlightSeriesOpts={{ strokeWidth: 2, strokeBorderWidth: 1, highlightCircleSize: 3 }}
        includeZero
        data={data.sdata}
        ylabel={data.unit}
        labels={data.sname}
        highlights={data.highlights}
        highlightStartTime={eventStartTime}
        highlightEndTime={eventEndTime}
        latestDataTimestamp={latestDataTimestamp}
        drawCallback={listenDrawCallback ? this.handleDrawCallback : null}
        {...dateWindow ? { dateWindow } : {}}
        annotations={enableAnnotations || chartType === 'bar' ? annotations : null}
        plotter={chartType === 'bar' ? this.barChartPlotter : null}
        onAnnotationClick={chartType === 'bar' ? null : this.handleAnnotationClick}
        enableTriangleHighlight={enableTriangleHighlight}
        onClick={onClick ? this.handleClick : null}
      />
    );
  }
}

export const DataSummaryChart = ({
  summary, onDateWindowChange, dateWindow, latestDataTimestamp,
  onAnnotationClick = (() => { }), showLineChartWithAnnotation,
}) => {
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
          onAnnotationClick={onAnnotationClick}
          showLineChartWithAnnotation={showLineChartWithAnnotation}
        />
      </div>
    </div>
  );
};

export class DataGroupCharts extends React.Component {

  static propTypes = {
    groups: T.any.isRequired,
    view: T.string.isRequired,
    columns: T.string,
    orderByMetric: T.bool,
    onDateWindowChange: T.func,
    chartType: T.string,
    dateWindow: T.any,
  };

  static defaultProps = {
    orderByMetric: true,
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

    const { groups, view, columns, orderByMetric,
      latestDataTimestamp, alertMissingData, chartType, periodMap, metricAvg, } = this.props;
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

    let orderedGroups = orderByMetric ?
      groups.sort(function (a, b) {
        let aHighlight = (a.highlights.length > 0);
        let bHighlight = (b.highlights.length > 0);
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
      }) : groups;

    return (
      <div className="sixteen wide column" style={{ paddingTop: 0 }}>
        <div className={groupsContainerClass}>
          { orderedGroups.map((group, index, groups) => {
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
            let periodTag = "";
            let period = (periodMap && periodMap[group.metrics]) || "";
            if(periodMap == undefined){
              periodTag = "";
            } else if(period != ""){
              periodTag = "(Cycle: "+period+")";
            } else {
              periodTag = "(No cycle detected)";
            }
            let avgTag = (metricAvg && metricAvg[group.metrics]) || "";
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
                  <div className="ui header">Metric {group.metrics} <span style={{color:'red'}}>{anomalyTag}</span><span style={{color:'orange'}}>{missingTag}</span><span>{periodTag}</span><span>{avgTag}</span></div>
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
