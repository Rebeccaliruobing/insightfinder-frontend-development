/*
 * React component of dygraphs
 *
 * http://dygraphs.com/options.html
 * https://github.com/motiz88/react-dygraphs
 * 
 * * Remove interaction support which causes zoom failed.
 **/

import React from 'react';
import classNames from 'classnames';

import {BaseComponent, PropTypes} from '../../base';
import DygraphBase from '../../../core/elements/dygraph';
import {DygraphPropTypes, DygraphDefaultProps, spreadDygraphProps} from './options';

class InteractionModelProxy {

  constructor() {
    // Default target, can be changed.
    this.target = DygraphBase.Interaction.defaultModel;

    const proxyMethods = ['mousedown', 'touchstart', 'touchmove', 'touchend', 'dblclick'];
    for (const method of proxyMethods) {
      const thisProxy = this;
      this[method] = function (...args) {
        const calledContext = this;
        return thisProxy.target[method].call(calledContext, ...args);
      };
    }
  }
}

class Dygraph extends BaseComponent {

  static propTypes = Object.assign({
    tag: PropTypes.string.isRequired,
  }, DygraphPropTypes);

  static defaultProps = Object.assign({
    tag: 'div',
    labelsDivStyles: {
      'backgroundColor': 'transparent',
      'float': 'right',
      'textAlign': 'right'
    },
    isZoomedIgnoreProgrammaticZoom: true
  }, DygraphDefaultProps);

  constructor(props) {
    super(props);

    // this._interactionProxy = new InteractionModelProxy();
    this._el = null;
    this._dygraph = null;
  }

  _highlight_period(canvas, area, g, x_start, x_end, val) {
    // val between 0-green to 1-yellow to 10-red (logarithmic)
    var canvas_left_x = g.toDomXCoord(x_start);
    var canvas_right_x = g.toDomXCoord(x_end);
    var canvas_width = Math.max(canvas_right_x - canvas_left_x, 5);

    var rcolor, gcolor;
    if (val <= 1) {
      if (val < 0) val = 0;
      rcolor = Math.floor(255 * val);
      gcolor = 255;
    } else {
      if (val > 10) val = 10;
      rcolor = 255;
      //gcolor = Math.floor(255 - 16 ^ Math.log10(10*val));
      gcolor = Math.floor(255 - (val - 1) / 9 * 255);
    }
    canvas.fillStyle = "rgba(" + rcolor.toString() + "," + gcolor.toString() + ",0,1.0)";
    canvas.fillRect(canvas_left_x, area.y, canvas_width, 12);
  }
  
  componentDidMount() {

    if (this._el) {
      const {known: initAttrs, rest} = spreadDygraphProps(this.props, true);
      let {annotations, highlights} = rest;

      // this._interactionProxy.target =
      //   initAttrs.interactionModel || DygraphBase.Interaction.defaultModel;
      // initAttrs.interactionModel = this._interactionProxy;

      initAttrs.underlayCallback = (canvas, area, g)=> {
        // If has highlights, set
        if (highlights) {
          highlights.forEach(o =>{
            this._highlight_period(canvas, area, g, o.start, o.end, o.val);
          });
        }
        this.props.underlayCallback && this.props.underlayCallback(canvas, area, g);
      };

      this._dygraph = new DygraphBase(this._el, this.props.data, initAttrs);

      if (annotations) {
        this._dygraph.ready(() => {
          this._dygraph.setAnnotations(annotations);
        });
      }
    }
  }

  componentWillUpdate(nextProps) {

    if (this._dygraph) {
      const {known: updateAttrs, rest} = spreadDygraphProps(nextProps, false);
      let {annotations} = rest;

      // this._interactionProxy.target =
      //   updateAttrs.interactionModel || DygraphBase.Interaction.defaultModel;
      // updateAttrs.interactionModel = this._interactionProxy;

      this._dygraph.updateOptions(updateAttrs);
      if (annotations) {
        this._dygraph.setAnnotations(annotations);
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
    let {known, rest} = spreadDygraphProps(this.props, false);
    let {tag, className, style, ...others} =  rest;

    let classes = classNames('ui', className, 'graph');
    style = Object.assign(style || {}, {});

    return React.createElement(tag, {
      ref: c => this._el = c,
      className: classes,
      style,
      ...others
    });
  }
}

export default Dygraph;