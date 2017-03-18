/* @flow */
import React, { Element } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import Measure from 'react-measure';

type Props = {
  children: Element<any>,
  viewport: Object,
  style: Object,
  className: string,
  responsive: bool,
  noGutter: bool,
  fullHeight: bool,
  screenCenter: bool,
  exactCenter: bool,
};

class Container extends React.Component {
  props: Props;
  state = {
    dimensions: { width: 0, height: 0 },
  }

  @autobind
  handleMeasure(dimensions) {
    this.setState({ dimensions });
  }

  render() {
    const { className, screenCenter, exactCenter, responsive, viewport,
      noGutter, fullHeight, children, style, ...rest } = this.props;
    const { dimensions } = this.state;

    if (screenCenter) {
      const classes = cx(
        'fui screen-center', {
          'full-height': fullHeight,
        },
        'container',
        className,
      );
      const topStyle = { ...style };
      if (!exactCenter) {
        // Take half of the space as the top.
        const top = Math.max((viewport.height - dimensions.height), 0) / 3;
        topStyle.top = top;
      }

      return (
        <div className={classes}>
          <Measure onMeasure={this.handleMeasure}>
            <div style={topStyle} {...rest}>{children}</div>
          </Measure>
        </div>
      );
    }

    const classes = cx(
      'fui', {
        responsive,
        'no-gutter': noGutter,
        'full-height': fullHeight,
      }, 'container',
      className,
    );
    return (
      <div className={classes} style={style} {...rest}>{children}</div>
    );
  }
}

export default connect(
  state => ({
    viewport: state.app.viewport,
  }), {},
)(Container);
