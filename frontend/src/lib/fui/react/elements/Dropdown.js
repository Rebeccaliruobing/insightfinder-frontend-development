import React from 'react';
import R from 'ramda';
import cx from 'classnames';
import { autobind } from 'core-decorators';
import Icon from './Icon';

type Props = {
  className: string,
  value: any,
  options: Array<Object>,
}

class Dropdown extends React.Component {
  props: Props

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.defaultArrowRenderer = (onMouseDown, isOpen) => {
      return isOpen ?
        (<Icon name="angle up" fitted onMouseDown={onMouseDown} />) :
        (<Icon name="angle down" fitted onMouseDown={onMouseDown} />);
    };
  }

  @autobind
  handleMouseDownOnArrow(event) {
    // Ignore if it is not the primary button.
    if (event.type === 'mousedown' && event.button !== 0) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  @autobind
  renderOuter() {
    return (
      <div className="menu-outer">aaaa</div>
    );
  }

  render() {
    const { className, options, value } = this.props;
    const { isOpen } = this.state;
    const arrowRenderer = this.defaultArrowRenderer;
    const classes = cx('fui dropdown', className);
    const found = R.find(o => o.value === value, options) || {};

    return (
      <div className={classes}>
        <span className="value-wrapper">{found.label || ''}</span>
        <span className="arrow-zone" onMouseDown={this.handleMouseDownOnArrow}>
          {arrowRenderer(this.handleMouseDownOnArrow, isOpen)}
        </span>
        {isOpen && this.renderOuter()}
      </div>);
  }
}

export default Dropdown;
