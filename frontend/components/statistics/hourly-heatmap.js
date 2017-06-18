import React, { PropTypes as T } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';
import { autobind } from 'core-decorators';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import D3Popup from '../ui/d3-popup';
import { calculateRGBByAnomalyScore } from '../utils';
import WindowResizeListener from '../ui/window-resize-listener';

const normalizeValue = (val, fractionDigits = 0) => {
  if (_.isFinite(val)) {
    if (val > 0) {
      if (val < 0.5 && fractionDigits === 2) {
        fractionDigits = 2;
      } else if (val < 5 && fractionDigits === 2) {
        fractionDigits = 1;
      } else if (fractionDigits === 2) {
        fractionDigits = 0;
      }
      return val.toFixed(fractionDigits).toString();
    }
    fractionDigits = 0;
    return val.toFixed(fractionDigits).toString();
  }
  return '-';
};

class HourlyHeatmap extends React.Component {
  static propTypes = {
    numberOfDays: T.number,
    style: T.object,
    rightEdge: T.bool,
    onNameClick: T.func,
  }

  static defaultProps = {
    numberOfDays: 0,
    style: {},
    rightEdge: false,
    onNameClick: () => { },
  }

  constructor(props) {
    super(props);

    this.$container = null;
    this.defaultCellSize = 24;
    this.hoursCount = 24;
    this.labelXHeight = 14;
    this.labelYWidth = 40;
    this.chartMargin = 10;
    this.popupDelay = 300;
    this.cellOutDebounced = _.debounce(this.handleCellMouseOut, this.popupDelay);
    this.popupOutDebounced = _.debounce(this.handlePopupMouseOut, this.popupDelay);

    this.state = {
      faux: null,
      hoverIndex: null,
      cellSize: this.defaultCellSize,
    };
  }

  componentDidMount() {
    this.displayData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.displayData(nextProps);
  }

  @autobind
  handleCellMouseOver(d, idx) {
    // Only triger the event if there is data in the cell.
    if (d.items.length > 0) {
      this.cellOutDebounced.cancel();
      this.popupOutDebounced.cancel();
      const { rightEdge } = this.props;
      const { cellSize } = this.state;

      // If the heatmap is in the right edge, left align the popup on right edge.
      const rightAlign = (!rightEdge ? true : (d.x < 4));
      const popupX = rightAlign ?
        (((d.x + 1) * cellSize) + this.labelYWidth) :
        (((this.hoursCount - d.x) * cellSize) + 12);

      this.setState({
        hoverIndex: idx,
        popupData: d,
        popupRightAlign: rightAlign,
        popupX,
        popupY: ((d.y) * cellSize) + (this.labelXHeight - 3),
      }, () => {
        this.displayData(this.props);
      });
    }
  }

  @autobind
  handleCellMouseOut() {
    const { hoverIndex } = this.state;
    if (hoverIndex !== null) {
      this.setState({
        hoverIndex: null,
        popupData: null,
      }, () => {
        this.displayData(this.props);
      });
    }
  }

  @autobind
  handlePopupMouseOver() {
    this.cellOutDebounced.cancel();
    this.popupOutDebounced.cancel();
  }

  @autobind
  handlePopupMouseOut() {
    const { hoverIndex } = this.state;
    if (hoverIndex !== null) {
      this.setState({
        hoverIndex: null,
        popupData: null,
      }, () => {
        this.displayData(this.props);
      });
    }
  }

  @autobind
  setHeatmap(dataset, props) {
    const width = this.$container.width();
    const height = this.$container.height();
    const { cellSize } = this.state;

    const { statSelector } = props;
    const { hoverIndex } = this.state;
    const { data, timeLabels, dayLabels } = dataset;

    const faux = ReactFauxDOM.createElement('svg');
    const svg = d3.select(faux)
      .attr({ width, height, viewBox: `0 0 ${width} ${height}` })
      .append('g');

    // Time labels
    svg.append('g')
      .selectAll('.timeLabel')
      .data(timeLabels)
      .enter()
      .append('text')
      .text(d => d)
      .attr('class', 'label-x')
      .attr('x', (d, i) => ((i + 0.5) * cellSize) + this.labelYWidth)
      .attr('text-anchor', 'middle')
      .attr('y', 10)
      ;

    // Day labels
    svg.append('g')
      .selectAll('.dayLabel')
      .data(dayLabels)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', 0)
      .attr('class', 'label-y')
      .attr('y', (d, i) => ((i + 0.75) * cellSize) + this.labelXHeight)
      ;

    // data
    svg.append('g')
      .selectAll('.hour')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', (d, idx) => (hoverIndex === idx ? 'active cell' : 'cell'))
      .attr('x', d => (d.x * cellSize) + this.labelYWidth + 0.5)
      .attr('y', d => (d.y * cellSize) + this.labelXHeight + 0.5)
      .attr('width', cellSize - 1)
      .attr('height', cellSize - 1)
      .attr('fill', (d) => {
        if (d.stats.eventTypes &&
          d.stats.eventTypes.toLowerCase().indexOf('instance down') >= 0) {
          return '#aaa';
        }
        return calculateRGBByAnomalyScore(statSelector(d));
      })
      .on('mouseover', this.handleCellMouseOver)
      .on('mouseout', this.cellOutDebounced)
      ;

    this.setState({ faux: faux.toReact() });
  }

  @autobind
  displayData(props) {
    const dataset = props.dataset;
    if (dataset && !_.isEmpty(dataset) && this.$container) {
      this.setHeatmap(dataset, props);
    }
  }

  @autobind
  handlePopupRowClick(item) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.setState({
        hoverIndex: null,
        popupData: null,
      }, () => {
        this.props.onNameClick(item.project, item.group, item.datetime);
      });
    };
  }

  @autobind
  handleWindowResize({ windowWidth }) {
    const { cellSize } = this.state;

    // Change the cell size in different windows.
    let size = 24;
    if (windowWidth >= 1100 && windowWidth < 1280) {
      size = 20;
    } else if (windowWidth < 1100 && windowWidth >= 1000) {
      size = 18;
    } else if (windowWidth < 1000) {
      size = 16;
    }

    if (size !== cellSize) {
      this.setState({ cellSize: size }, () => {
        this.displayData(this.props);
      });
    }
  }

  render() {
    const { faux, popupData, cellSize, popupX, popupY, popupRightAlign } = this.state;
    const { style, numberOfDays } = this.props;
    const width = (this.hoursCount * cellSize) + this.labelYWidth + this.chartMargin;
    const height = ((numberOfDays || 0) * cellSize) + this.labelXHeight;

    const showPopup = !!popupData;
    const elems = [];
    if (popupData && _.isArray(popupData.items)) {
      popupData.items.forEach((item, index) => {
        let { eventTypes } = item.stats;
        eventTypes = (eventTypes || '[]').slice(1, -1).split(',');

        elems.push((
          <tr key={`${popupData.x}-${popupData.y}-${index}`}>
            <td className="link">
              <OverlayTrigger placement="top" delayShow={300} overlay={<Tooltip>Click for details</Tooltip>}>
                <i onClick={this.handlePopupRowClick(item)} className="external icon" />
              </OverlayTrigger>
            </td>
            <td className="name">{item.project}</td>
            <td className="name">{item.group}</td>
            <td className="value">{normalizeValue(item.stats.totalAnomalyScore, 2)}</td>
            <td className="value">{normalizeValue(item.stats.avgEventDuration)}</td>
            <td className="name">{eventTypes.map((e, idx) => <div key={idx}>{e}</div>)}</td>
          </tr>
        ));
      });
    }

    return (
      <div className="hourly-heatmap d3-container" style={style}>
        <WindowResizeListener onResize={this.handleWindowResize} />
        <div
          style={{ width, height, margin: 'auto', position: 'relative' }}
          ref={(c) => { this.$container = $(c); }}
        >
          <D3Popup
            show={showPopup}
            style={popupRightAlign ? { top: popupY, left: popupX } : { top: popupY, right: popupX }}
            align={popupRightAlign ? 'right top' : 'left top'}
            onMouseOver={this.handlePopupMouseOver}
            onMouseOut={this.popupOutDebounced}
          >
            <div className="popup-content" style={{ maxHeight: 160, width: 466 }}>
              <table className="ui striped table">
                <thead>
                  <tr>
                    <th style={{ width: 20 }} />
                    <th style={{ width: 100 }}>Project</th>
                    <th style={{ width: 100 }}>Group</th>
                    <th style={{ width: 44 }}>Score</th>
                    <th style={{ width: 56 }}>Duration</th>
                    <th style={{ width: 140 }}>Event Types</th>
                  </tr>
                </thead>
                <tbody>
                  {elems}
                </tbody>
              </table>
            </div>
          </D3Popup>
          {faux}
        </div>
      </div>
    );
  }
}

export default HourlyHeatmap;
