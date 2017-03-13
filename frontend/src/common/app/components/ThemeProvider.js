/* @flow */
import React, { PropTypes as T } from 'react';

class ThemeProvider extends React.Component {

  static propTypes = {
    children: T.node.isRequired,
    theme: T.object.isRequired,
  };

  static childContextTypes = {
    theme: T.object,
  }

  getChildContext() {
    const { theme } = this.props;
    return {
      theme,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default ThemeProvider;
