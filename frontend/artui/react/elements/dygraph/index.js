/*
 * React component of dygraphs
 *
 * http://dygraphs.com/options.html
 *
 * * Remove interaction support which causes zoom failed.
 **/

import React, {Component, PropTypes as T} from 'react';
import classNames from 'classnames';
import {autobind} from 'core-decorators';
import {DygraphDefaultProps, spreadDygraphProps} from './options';

const DygraphBase = require('exports?Dygraph!dygraphs/dygraph-combined-dev');

class Dygraph extends Component {

  static propTypes = {
    underlayCallback: T.func,
  };

  static defaultProps = Object.assign({
    labelsDivStyles: {
      'backgroundColor': 'transparent',
      'float': 'right',
      'textAlign': 'right'
    },
    isZoomedIgnoreProgrammaticZoom: true
  }, DygraphDefaultProps);

  constructor(props) {
    super(props);

    this._el = null;
    this._dygraph = null;

    this.predicatedRangeFillStyle = 'rgba(205, 234, 214,1.0)';
    this.highlightBarHeight = 12;
  }

  @autobind
  drawHighlightRange(canvas, area, g, x_start, x_end) {
    const left = g.toDomXCoord(x_start);
    const right = g.toDomXCoord(x_end);
    canvas.fillStyle = '#88bbee';
    canvas.fillRect(left, area.y, right - left , 12);
  }

  _highlight_period(canvas, area, g, x_start, x_end, val, latestDataTimestamp = undefined, enableTriangleHighlight=false, isMissingValue = false) {
      // val between 0-green to 1-yellow to 10-red (logarithmic)
      var canvas_left_x = g.toDomXCoord(x_start);
      var canvas_right_x = g.toDomXCoord(x_end);
      var canvas_height = 12;
      let area_y = area.y;
      var canvas_width = Math.max(canvas_right_x - canvas_left_x, 5);
      var rcolor, gcolor, bcolor = 0;
      let gcolorMax = 205;
      let sign = 0;
      if(val < 0){
          val = -val;
          sign = -1;
      } else if (val > 0){
          sign = 1;
      }
      if (val <= 1) {
          if (val < 0) val = 0;
          rcolor = Math.floor(255 * val);
          gcolor = gcolorMax;
      } else {
          if (val > 10) val = 10;
          rcolor = 255;
          gcolor = Math.floor(gcolorMax - (val - 1) / 9 * gcolorMax);
      }
      canvas.fillStyle = "rgba(" + rcolor.toString() + "," + gcolor.toString() + "," + bcolor.toString() + ",1.0)";
      if(!enableTriangleHighlight || isMissingValue || sign==0){
          canvas.fillRect(canvas_left_x, area.y, canvas_width, 12);
      }else if(sign<0){
          canvas.beginPath();
          canvas.moveTo(canvas_left_x,area.y);
          canvas.lineTo(canvas_left_x+canvas_width/2,area.y+12);
          canvas.lineTo(canvas_left_x+canvas_width,area.y);
          canvas.fill();
      } else if (sign>0){
          canvas.beginPath();
          canvas.moveTo(canvas_left_x,area.y+12);
          canvas.lineTo(canvas_left_x+canvas_width/2,area.y);
          canvas.lineTo(canvas_left_x+canvas_width,area.y+12);
          canvas.fill();
      }
  }

  @autobind
  handleUnderlayCallback(canvas, area, g) {

    const {highlights, enableTriangleHighlight, latestDataTimestamp,
       highlightStartTime, highlightEndTime
    } = this.props;

    // Draw predicated range if latestDataTimestamp is specified.
    if (latestDataTimestamp) {
      const x = g.toDomXCoord(latestDataTimestamp);
      const y = area.y;
      const w = area.w;
      const h = area.h;
      canvas.fillStyle = this.predicatedRangeFillStyle;
      canvas.fillRect(x, y, w, h);
    }

    // If has highlights, draw the highlight bar.
    if (highlights) {
      highlights.forEach(o => {
        this._highlight_period(canvas, area, g, o.start, o.end, o.val, this.props['latestDataTimestamp'],enableTriangleHighlight, o.isMissingValue);
      });
    }

    // If has highlight start/end, draw the highlight bar.
    if (highlightEndTime && highlightStartTime) {
      this.drawHighlightRange(canvas, area, g, highlightStartTime, highlightEndTime);
    }

    if (this.props.underlayCallback) {
      this.props.underlayCallback(canvas, area, g);
    }
  }

  componentDidMount() {
    if (this._el) {
      const { known: initAttrs, rest } = spreadDygraphProps(this.props, true);
      let { annotations, highlights, selection } = rest;

      initAttrs.underlayCallback = this.handleUnderlayCallback;
      this._dygraph = new DygraphBase(this._el, this.props.data, initAttrs);

      if (annotations) {
        this._dygraph.ready(() => {
          this._dygraph.setAnnotations(annotations);
        });
      }

      if (selection) {
        this._dygraph.ready(() => {
          let idx = this._dygraph.findClosestRow(this._dygraph.toDomXCoord(selection.x));
          if (idx !== null) {
            this._dygraph.setSelection(idx, selection.seriesName);
          }
        });
      } else {
        this._dygraph.ready(() => {
          this._dygraph.clearSelection();
        });
      }
    }
  }

  componentWillUpdate(nextProps) {

    if (this._dygraph) {
      const { known: updateAttrs, rest } = spreadDygraphProps(nextProps, false);
      let { annotations, selection, highlights } = rest;

      this._dygraph.updateOptions(updateAttrs);
      if (annotations) {
        this._dygraph.setAnnotations(annotations);
      }

      if (selection) {
        let idx = this._dygraph.findClosestRow(this._dygraph.toDomXCoord(selection.x));
        if (idx) {
          // this._dygraph.setSelection(idx, selection.seriesName);
        }
      } else {
        this._dygraph.clearSelection();
      }
    }
  }

  componentWillUnmount() {
    if (this._dygraph) {
      this._dygraph.destroy();
      this._dygraph = null;
    }
  }

  render() {
    const {className, style} = this.props;
    const classes = classNames('ui', className, 'graph');

    return (
      <div ref={c=> this._el = c} className={classes} style={style} />
    );
  }
}

export default Dygraph;