/*
 * React component of dygraphs
 * http://dygraphs.com/options.html
 * https://github.com/motiz88/react-dygraphs
 **/

import React from 'react';
import classNames from 'classnames';

import {BaseComponent, PropTypes} from '../base';
import DygraphBase from '../../core/elements/dygraph';
import {DygraphPropTypes, DygraphDefaultProps, spreadDygraphProps} from './dygraph_options';


class InteractionModelProxy {
  
  constructor() {
    // 缺省Proxy的目标, 可以通过setter进行修改
    this.target = DygraphBase.Interaction.defaultModel;
    
    const proxyMethods = ['mousedown', 'touchstart', 'touchmove', 'touchend', 'dblclick'];
    
    for (const method of proxyMethods) {
      const thisProxy = this;
      this[method] = function (...args) {
        const calledContext = this;
        return thisProxy.target[method].call(calledContext, ...args);
      };
    }
    
    // Getter & Setter
    /* 
    ['willDestroyContextMyself'].forEach(prop => {
      Object.defineProperty(this, prop, {
        configurable: false,
        enumerable: true,
        get: () => this.target[prop],
        set: value => this.target[prop] = value
      });
    });
    */
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
      const {known: initAttrs} = spreadDygraphProps(this.props, true);
      this._interactionProxy.target =
        initAttrs.interactionModel || DygraphBase.Interaction.defaultModel;
      
      initAttrs.interactionModel = this._interactionProxy;
      this._dygraph = new DygraphBase(this._el, this.props.data, initAttrs);
    }
  }
  
  componentWillUpdate(nextProps) {
    if (this._dygraph) {
      const {known: updateAttrs} = spreadDygraphProps(nextProps, false);
      this._interactionProxy.target =
        updateAttrs.interactionModel || DygraphBase.Interaction.defaultModel;
      updateAttrs.interactionModel = this._interactionProxy;
      this._dygraph.updateOptions(updateAttrs);
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