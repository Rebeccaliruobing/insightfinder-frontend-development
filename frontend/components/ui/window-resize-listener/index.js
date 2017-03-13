import React, { PropTypes as T } from 'react';
import debounce from 'lodash/debounce';

class WindowResizeListener extends React.Component {

  static DEBOUNCE_TIME = 300;
  static listeners = []
  static debouncedResize = null;
  static handleOnResize = () => {
    const windowWidth = window.innerWidth ||
      document.documentElement.clientWidth || document.body.clientHeight;
    const windowHeight = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;

    WindowResizeListener.listeners.forEach((listener) => {
      listener({ windowWidth, windowHeight });
    });
  }

  static propTypes = {
    onResize: T.func.isRequired,
  }

  componentDidMount() {
    if (WindowResizeListener.listeners.length === 0) {
      WindowResizeListener.debouncedResize = debounce(
        WindowResizeListener.handleOnResize,
        WindowResizeListener.DEBOUNCE_TIME,
      );
      window.addEventListener('resize',
        WindowResizeListener.debouncedResize, false);
    }
    WindowResizeListener.listeners.push(this.props.onResize);
    WindowResizeListener.debouncedResize();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.onResize !== this.props.onResize;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onResize !== this.props.onResize) {
      const idx = WindowResizeListener.listeners.indexOf(this.props.onResize);
      WindowResizeListener.listeners.splice(idx, 1, nextProps.onResize);
    }
  }

  componentWillUnmount() {
    const idx = WindowResizeListener.listeners.indexOf(this.props.onResize);
    WindowResizeListener.listeners.splice(idx, 1);
    if (WindowResizeListener.listeners.length === 0) {
      window.removeEventListener('resize', WindowResizeListener.handleOnResize);
    }
  }

  render() {
    return null;
  }
}

export default WindowResizeListener;
