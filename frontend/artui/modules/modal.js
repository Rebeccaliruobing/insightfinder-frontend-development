/*
 * 根据Semantic-UI modal实现的React Modal组件.
 * http://semantic-ui.com/modules/modal.html
 *
 * - 当前使用semantic-ui带的js,以后可考虑只使用css部分, 将js用react实现.
 * - 由于semantic会将modal当Dom对象移到body下的dummer, 因而需要在unmount时
 *   删除移动的Dom元素. 当React Component Unmount时, 删除移动过的Dom对象
 *   导致异常. 为避免该异常, 需在modal外添加一个div元素.
 * - 当modal关闭时, 需要在onClose事件处理中删除该组件.
 */

import React from 'react';
import $ from 'jquery';
import classNames from 'classnames';

let Modal = class Modal extends React.Component {

  constructor(props) {
    super(props);

    this._modal = null;
  }

  componentDidMount() {

    if (this._modal) {
      $(this._modal)
        .modal({
          closable: this.props['closable'],
          allowMultiple: false,
          onHidden: () => { this.props.onClose && this.props.onClose(); },
          onDeny: () => {
            alert('fsdfd');
            this.props.onDeny && this.props.onDeny(); },
          onApprove: () => { this.props.onApprove && this.props.onApprove(); }
        })
        .modal('show');
    }
  }

  componentWillUnmount() {
    if (this._modal) {
      $(this._modal).remove();
    }
  }

  componentDidUpdate() {
    if (this._modal) {
      $(this._modal).modal('refresh');
    }
  }

  render() {

    let {type, size, className, onClose, onDeny, onApprove, closable, ...other} = this.props;
    let classes = classNames('ui modal', size, type, className);

    // 在Modal外添加一个div元素, 用于避免React Unmount时异常.
    return(
      <div>
        <div className={classes} {...other} ref={c => this._modal = c}>
          {
            closable &&
            <i className="close icon"></i>
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
  size: React.PropTypes.oneOf(['fullscreen', 'small', 'large']),
  onClose: React.PropTypes.func.isRequired,
  onApprove: React.PropTypes.func,
  onDeny: React.PropTypes.func
};

Modal.defaultProps = {
  closable: true
};


Modal.Header = function(props) {
  let {className, ...others} = props;
  var classes = classNames('header', className);
  return (
    <div className={classes} {...others}>{props.children}</div>
  )
};

Modal.Content = function(props){
  let {className, ...others} = props;
  var classes = classNames('content', className);
  return (
    <div className={classes} {...others}>{props.children}</div>
    )
};

Modal.ImageContent = function(props) {
  let {className, ...others} = props;
  var classes = classNames('image content', className);
  return (
    <div className={classes} {...others}>{props.children}</div>
  )
};

Modal.Actions = function(props){
  let {className, ...others} = props;
  var classes = classNames('actions', className);
  return (
    <div className={classes} {...others}>{props.children}</div>
  )
};

Modal.ActionButton = function(props) {
  let {className, approve, deny, ...others} = props;
  var classes = classNames('ui button',
    className,
    {approve:approve}, {deny:deny});

  return (
    <div className={classes} {...others}>{props.children}</div>
  )
};

export default Modal;
