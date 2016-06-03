import React from 'react';
import classNames from 'classnames';

 /*
 * Popup
**/

const Popup = class extends React.Component {

  constructor(props) {
    super(props);
    
    this._$el = null;
  }

  componentDidMount() {
    if (this._$el) {
      let content = this._$el.children()[0];
      $(content).popup({
        inline: true,
        hoverable: true,
        position: this.props.position || 'right center'
      })
    }
  }

  componentWillUnmount() {
    if (this._$el) {
      let content = this._$el.children()[0];
      if(content) {
        $(content).popup('destroy');
      }
    }
  }

  render() {
    let {tag, children, ...others} = this.props;
    
    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      ...others
    }, children);
  }
};

Popup.propTypes = {
  tag: React.PropTypes.string,
  position: React.PropTypes.string
};

Popup.defaultProps = {
  tag: 'div',
  position: 'right center'
};

export default Popup;