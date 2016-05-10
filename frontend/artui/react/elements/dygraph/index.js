/*
 * React component of dygraphs
 * 
 * http://dygraphs.com/options.html
 * https://github.com/motiz88/react-dygraphs
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
    tag: PropTypes.string.isRequired
  }, DygraphPropTypes);

  static defaultProps = Object.assign({
    tag: 'div'
  }, DygraphDefaultProps);

  constructor(props) {
    super(props);

    this._interactionProxy = new InteractionModelProxy();
    this._el = null;
    this._dygraph = null;
  }

  componentDidMount() {
    
    if (this._el) {
      const {known: initAttrs, rest} = spreadDygraphProps(this.props, true);
      let {annotations} = rest;
      
      this._interactionProxy.target =
        initAttrs.interactionModel || DygraphBase.Interaction.defaultModel;
      initAttrs.interactionModel = this._interactionProxy;
      
      this._dygraph = new DygraphBase(this._el, this.props.data, initAttrs);
      
      if (annotations) {
        this._dygraph.ready(() => {
          console.log(this._dygraph);
          this._dygraph.setAnnotations(annotations);
        });
      }
    }
  }

  componentWillUpdate(nextProps) {
    
    if (this._dygraph) {
      const {known: updateAttrs, rest} = spreadDygraphProps(nextProps, false);
      let {annotations} = rest;
      
      this._interactionProxy.target =
        updateAttrs.interactionModel || DygraphBase.Interaction.defaultModel;
      updateAttrs.interactionModel = this._interactionProxy;
      
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
    let {tag, annotations, className, style, ...others} =  rest;
    
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