/*
 * Tab提供了对SemanticUI tab的简单封装.
 * http://semantic-ui.com/modules/tab.html
 **/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';

const Tab = class extends React.Component {

  constructor(props) {
    super(props);
    this._$el = null;
  }

  componentDidMount() {
    if (this._$el) {
      this._$el.find('.tabular.menu .item').tab();
    }
  }

  componentDidUpdate() {
    if (this._$el) {
      this._$el.find('.tabular.menu .item').tab('refresh');
    }
  }

  componentWillUnmount() {
    if (this._$el) {
      this._$el.find('.tabular.menu .item').tab('destroy');
    }
  }

  render() {
    let {tag,
      children, ...others} = this.props;
    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      ...others
    }, children);
  }
};

Tab.propTypes = {
  tag: React.PropTypes.string
};

Tab.defaultProps = {
  tag: 'div'
};

export default Tab;