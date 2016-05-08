import React from 'react';
import classNames from 'classnames';
import {BaseComponent, PropTypes} from '../base';

class Table extends BaseComponent {
  static propTypes = {
    tag: React.PropTypes.string
  };

  static defaultProps = {
    tag: 'div'
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    let {tag, className,
      children, ...others} = this.props;
    return React.createElement(tag, {
      className: classNames('ui', className, 'table'),
      ...others
    }, children);
  }
}

export default Table;