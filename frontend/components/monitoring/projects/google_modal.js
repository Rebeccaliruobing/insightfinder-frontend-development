import 'blueimp-file-upload/css/jquery.fileupload.css';


require('script-loader!blueimp-file-upload/js/vendor/jquery.ui.widget');
require('script-loader!blueimp-file-upload');

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {Modal} from '../../../artui/react';
import store from 'store';


class GoogleProjectModal extends React.Component {
  constructor(props) {
    super(props);
    this._dropdown = null;
  }

  componentDidMount() {
    this.loadProjects()
  }

  loadProjects() {
    //  TODO: load projects
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <Modal {...this.props} size="small" closable={false}>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Project Name</label>
              <input type="text" name="name" onChange={(e)=>this.setState({projectName: e.target.value})}/>
            </div>
            <div className="field">
              <label>Project ID</label>
              <input type="text" name="project_id" onChange={(e)=>this.setState({projectId: e.target.value})}/>
            </div>

            <div className="field">
              <label>Project Type</label>
              <select className="ui dropdown" onChange={(e)=>this.setState({projectType: e.target.value})}>
                <option className="item">Project Type</option>
                <option className="item" value="GAE">GAE</option>
                <option className="item" value="GCE">GCE</option>
              </select>
            </div>
            <div className="field">
              <label>Service Account Email</label>
              <input type="text" name="service-account" onChange={(e)=>this.setState({serviceAccount: e.target.value})}/>
            </div>
            <div className="field">
              <label>.p12 key file</label>
              <div className="ui button fileinput-button">
                Upload .p12 key file
                <input type="file" name="file" ref={this.fileUploadRef}/>
              </div>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny">Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange" onClick={this.handleSubmit.bind(this)}>
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
        formData: {
          userName: store.get('userName'),
          token: store.get('token')
        },
        dataType: 'json',
        url: 'https://insightfinderui.appspot.com/api/v1/cloudstorage',
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
        ;
      });

  }
}

export default GoogleProjectModal;