import 'blueimp-file-upload/css/jquery.fileupload.css';



require('script-loader!blueimp-file-upload/js/vendor/jquery.ui.widget');
require('script-loader!blueimp-file-upload');

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {Modal} from '../../../artui/react';


class GoogleProjectModal extends React.Component {
  constructor(props) {
    super(props);
    this._dropdown = null;
  }

  componentDidMount() {
    if (this._dropdown) {
      $(this._dropdown).dropdown();
    }
  }

  render() {
    return (
      <Modal {...this.props} size="small" closable={false}>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Project Name</label>
              <input type="text" name="name"/>
            </div>
            <div className="field">
              <label>Project ID</label>
              <input type="text" name="project_id"/>
            </div>
            <div className="field">
              <label>Project Type</label>
              <div className="ui selection dropdown" ref={c => this._dropdown = c}>
                <input name="type" type="hidden" value="0,1"/>
                <i className="dropdown icon"/>
                <span className="default text"/>
                <div className="menu">
                  <div className="item">GAE</div>
                  <div className="item">GCE</div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>Service Account Email</label>
              <input type="text" name="email"/>
            </div>
            <div className="field">
              <label>.p12 key file</label>
              <input type="file" name="p12" ref={this.fileUploadRef}/>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny">Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange">
              <i className="save icon"/>Register
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  fileUploadRef(r) {

    $(ReactDOM.findDOMNode(r))
      .fileupload({
        url: '/upload',
        sequentialUploads: true,
      })
      .bind('fileuploadadd', function (e, data) {
      })
      .bind('fileuploadprogress', function (e, data) {
        var progress = parseInt(data.loaded / data.total *
          100, 10);
      })
      .bind('fileuploadfail', function (e, data) {
        var resp = data.response().jqXHR.responseJSON;
      })
      .bind('fileuploaddone', function (e, data) {
        var resp = data.response().jqXHR.responseJSON;
      });

  }
}

export default GoogleProjectModal;