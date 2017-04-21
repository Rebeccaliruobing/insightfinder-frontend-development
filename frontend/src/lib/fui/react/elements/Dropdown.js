import React from 'react';
import cx from 'classnames';
import { autobind } from 'core-decorators';
import Icon from './Icon';

type Props = {
  className: string,
}

class Dropdown extends React.Component {
  props: Props

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
  renderArrow() {
    const onMouseDown = this.handleMouseDownOnArrow;
    const { isOpen } = this.state;

    const arrowRenderer = ({ onMouseDown, isOpen }: any) => {
      return isOpen ?
        (<Icon name="angle up" fitted onMouseDown={onMouseDown} />) :
        (<Icon name="angle down" fitted onMouseDown={onMouseDown} />);
    };

    return (
      <span className="arrow-zone" onMouseDown={onMouseDown}>
        {arrowRenderer({ onMouseDown, isOpen })}
      </span>
    );
  }

  render() {
    const { className } = this.props;
    const classes = cx('fui dropdown', className);
    return (
      <div className={classes}>
        {this.renderArrow()}
      </div>);
  }
}

export default Dropdown;
