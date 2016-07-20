import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';


import {Modal, Dropdown} from '../../../artui/react/index';


class CommentsModal extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: [
        // {user: 'Guest', commentsTime: new Date(), content: 'The CPU is high'},
        // {user: 'Guest', commentsTime: new Date(), content: 'The network issue is fixed'},
      ]
    };
    
    this.handleSubmit.bind(this);
  }

  handleSubmit() {
  }

  handleCancel() {
    this.props.onCancel && this.props.onCancel();
  }
  
  render() {
    let disabled = false;
    let {projectName} = this.context.location.query;
    let {comments} = this.state;

    return (
      <Modal {...this.props} size="tiny" closable={false}>
        <div className="header">Comments for {projectName}</div>
        <div className="content">
          <div className="ui comments">
            {comments.map((c, idx) => {
              return(
                <div key={idx} className="comment">
                  <div className="content">
                    <a className="author">{c.user}</a>
                    <div className="metadata">
                      <span className="date">{moment(c.commentsTime).utc().format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                    <div class="text">{c.content}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <form className="ui reply form">
            <div className="field">
              <textarea/>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny" onClick={this.handleCancel.bind(this)}>Cancel</div>
          <div className="ui button approve labeled">
            <div className={cx('ui button orange submit', {disabled:disabled})} 
                 onClick={this.handleSubmit.bind(this)}>
              Comments
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default CommentsModal;