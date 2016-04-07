/*
 * 根据Semantic-UI modal实现的React Modal组件.
 * http://semantic-ui.com/modules/modal.html
 *
 * - 使用Semantic UI的modal.js来实现的react组件.
 * - 由于semantic会将modal当Dom对象移到body下的dummer, 因而需要在unmount时
 *   删除移动的Dom元素. 当React Component Unmount时, 删除移动过的Dom对象
 *   导致异常. 为避免该异常, 需在modal外添加一个div元素.
 * - 当modal关闭时, 会触发onClose事件, 在该事件中可以删除该组件.
 */

import React from 'react';
import $ from 'jquery';
import classNames from 'classnames';

const Modal = class Modal extends React.Component {

  constructor(props) {
    super(props);

    this._el = null;
  }

  componentDidMount() {

    if (this._el) {
      $(this._el)
        .modal({
          closable: this.props['closable'],
          allowMultiple: false,
          onHidden: () => { this.props.onClose && this.props.onClose(); },
          onDeny: () => { this.props.onDeny && this.props.onDeny(); },
          onApprove: () => { this.props.onApprove && this.props.onApprove(); }
        })
        .modal('show');
    }
  }

  componentWillUnmount() {
    if (this._el) {
      $(this._el).remove();
    }
  }

  componentDidUpdate() {
    if (this._el) {
      $(this._el).modal('refresh');
    }
  }

  render() {

    let {type, size, className, onClose, onDeny, onApprove, closable, ...other} = this.props;
    let classes = classNames('ui modal', size, type, className);

    // 在Modal外添加一个div元素, 用于避免React Unmount时异常.
    return(
      <div>
        <div className={classes} {...other} ref={c => this._el = c}>
          {
            closable &&
            <i className="close icon"/>
          }
          {this.props.children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  closable: React.PropTypes.bool,
  type: React.PropTypes.oneOf(['basic']),
  size: React.PropTypes.oneOf(['mini', 'tiny', 'small', '', 'large', 'big', 'huge', 'massive']),
  onClose: React.PropTypes.func.isRequired,
  onApprove: React.PropTypes.func,
  onDeny: React.PropTypes.func
};

Modal.defaultProps = {
  closable: true,
  size: ''
};

export default Modal;