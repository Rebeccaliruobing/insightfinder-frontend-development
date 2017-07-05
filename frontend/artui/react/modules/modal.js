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

    this._$el = null;
    this.close = this.close.bind(this);
    this.modal = null;
  }

  componentDidMount() {
    if (this._$el && !this.modal) {
      this.modal = this._$el
        .find('.ui.modal')
        .modal({
          closable: this.props['closable'],
          allowMultiple: false,
          inverted: this.props['dimmer'] === 'inverted',
          blurring: this.props['dimmer'] === 'blurring',
          transition: this.props['transition'],
          duration: 0,
          onHidden: () => {
            this.props.onClose();
          },
          onCancel: () => {
            this.props.onCancel();
          },
          onOK: () => {
            this.props.onOK();
          },
        })
        .modal('show');
    }
  }

  close() {
    if (this.modal) {
      this.modal.modal('hide');
      if (this.modal[0] && this.modal[0].remove) {
        this.modal[0].remove();
      }
    }
  }

  componentWillUnmount() {
    if (this.modal) {
      this.modal.modal('hide');
      if (this.modal[0] && this.modal[0].remove) {
        this.modal[0].remove();
      }
    }
  }

  componentDidUpdate() {
    if (this.modalel) {
      this.modal.modal('refresh');
    }
  }

  render() {
    let {
      type,
      size,
      className,
      transition,
      onClose,
      onCancel,
      onOK,
      closable,
      ...other
    } = this.props;
    let classes = classNames('ui modal', size, type, className);

    // 在Modal外添加一个div元素, 用于避免React Unmount时异常.
    return (
      <div ref={c => (this._$el = $(c))}>
        <div className={classes} {...other}>
          {closable && <i className="close icon" />}
          {this.props.children}
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  closable: React.PropTypes.bool,
  type: React.PropTypes.oneOf(['basic']),
  size: React.PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']),
  transition: React.PropTypes.string,
  dimmer: React.PropTypes.string,

  // 在onClose回调函数中, 需删除本react组件以删除创建的dom对象.
  onClose: React.PropTypes.func.isRequired,
  onOK: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

Modal.defaultProps = {
  closable: true,
  onOK: () => {},
  onCancel: () => {},
};

export default Modal;
