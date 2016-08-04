import React, {PropTypes as T} from 'react';
import {Dygraph} from '../../artui/react/dataviz';
import moment from 'moment'
import _ from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';
import {autobind} from 'core-decorators';

export class DataChart extends React.Component {

  static propTypes = {
    enableAnnotations: T.bool,
    onDateWindowChange: T.func,
    dateWindow: T.any,
  };

  static defaultProps = {
    enableAnnotations: false
  };

  constructor(props) {
    super(props);

    this.dateWindow = [];
  }

  shouldComponentUpdate(nextProps, nextState) {
    let update = shallowCompare(this, nextProps, nextState);

    // Check dateWindow with deep compare, otherwise it will cause loop.
    if (update && nextProps.dateWindow) {
      update = !_.isEqual(nextProps.dateWindow, this.props.dateWindow);
    }

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

  render() {
    const { data, enableAnnotations, onDateWindowChange, dateWindow } = this.props;
    const listenDrawCallback = !!onDateWindowChange;

    return (
      <Dygraph
        style={{ width: '100%', height: '200px' }}
        axisLabelWidth={35}
        highlightCircleSize={2} strokeWidth={2}
        labelsDivStyles={{ padding: '4px', margin: '15px' }}
        highlightSeriesOpts={{ strokeWidth: 2, strokeBorderWidth: 1, highlightCircleSize: 3 }}
        data={data.sdata}
        ylabel={data.unit}
        labels={data.sname}
        highlights={data.highlights}
        drawCallback={listenDrawCallback ? this.handleDrawCallback : null}
        dateWindow={dateWindow}
        annotations={enableAnnotations ? data.annotations : null}
        onAnnotationClick={this.handleAnnotationClick}
      />
    )
  }
}

export const DataSummaryChart = ({ summary, onDateWindowChange, dateWindow }) => {
  return (
    <div key="summary_chart" className="sixteen wide column" style={{ paddingTop: 0 }}>
      <div className="detail-charts" style={{ position: 'relative' }}>
        <h4 className="ui header">{summary.title}</h4>
        <DataChart
          enableAnnotations={true} data={summary}
          onDateWindowChange={onDateWindowChange}
          dateWindow={dateWindow}
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

    //const { groups, view, columns, period} = this.props;
    const { groups, view, columns, period} = this.props;
    const { selectedIndex } = this.state;
    const colSize = ['one', 'two', 'three', 'four', 'five', 'six'].indexOf(columns) + 1;
    const isListView = view === 'list';
    const syncDateWindow = isListView;
    const groupsContainerClass = isListView ? '' : ' ui ' + columns + ' cards';
    const groupsChartClass = isListView ? "detail-charts" : 'ui card';

    const selected = selectedIndex !== undefined;
    const selectedGroup = selected ? groups[selectedIndex] : null;
    const selectedRowId = selected ? Math.floor(selectedIndex / colSize) : void 0;
    const periodData = period || {};
    return (
      <div className="sixteen wide column" style={{ paddingTop: 0 }}>
        <div className={groupsContainerClass}>

          {groups.map((group, index, groups) => {

            const rowId = Math.floor(index / colSize);
            const lastCol = !((index + 1) % colSize);
            const length = groups.length;
            const lastItem = index == length - 1;
            const isSelectedItem = index === selectedIndex;

            let elems = [];
            const idx = index;
            const periodKeys = _.keysIn(periodData);
            const periodList = _.compact(periodKeys.map(function (value,index) {
                if(value == group.metrics)
                  return value+': '+ periodData[value];
            }));
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
                  <h4 className="ui header">Metric {periodData[group.metrics]?<span title={periodList}>{group.metrics+' (period list: '+periodData[group.metrics]+')'}</span>:group.metrics}</h4>
                  <DataChart
                    data={group}
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
