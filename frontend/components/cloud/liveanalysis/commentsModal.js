import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import store from 'store';

import {Modal, Dropdown} from '../../../artui/react/index';
import withRouter from '../../../containers/withRouter';


class CommentsModal extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: [
        // {user: 'Guest', commentsTime: new Date(), content: 'The CPU is high'},
        {user: store.get('userName'), commentsTime: new Date(), content: 'This result is interesting.'},
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
    let { projectName } = this.props.location.query;
    let { comments } = this.state;

    return (
      <Modal {...this.props} size="tiny" closable={false}>
        <div className="header">Comments for {projectName}</div>
        <div className="content">
          <div className="ui comments">
            {comments.map((c, idx) => {
              return(
                <div key={idx} className="comment">
                  <div className="content">
                    <div class="text">{c.content}</div>
                    <div style={{textAlign: 'right'}}>
                      <a className="author">{c.user}</a>
                      <div className="metadata">
                        <span className="date">{moment(c.commentsTime).utc().format('YYYY-MM-DD HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <form className="ui reply form">
            <div className="field">
              <textarea rows="4"/>
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

export default withRouter(CommentsModal);
