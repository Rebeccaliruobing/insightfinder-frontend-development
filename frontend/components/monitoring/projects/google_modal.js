import 'blueimp-file-upload/css/jquery.fileupload.css';


require('script-loader!blueimp-file-upload/js/vendor/jquery.ui.widget');
require('script-loader!blueimp-file-upload');

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import {Modal} from '../../../artui/react';
import store from 'store';
import apis from '../../../apis';
const baseUrl = window.API_BASE_URL || '/api/v1/';

class GoogleProjectModal extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };
  
  constructor(props) {
    super(props);
    this._dropdown = null;
    this.state = {
      loading: false,
      hasAgentData:false
    };
  }

  componentDidMount() {
    this.loadProjects()
  }

  loadProjects() {
    //  TODO: load projects
  }

  handleSubmit() {
    let {projectName, projectId, projectType, serviceAccount, filename, hasAgentData} = this.state;
    apis.postAddGoogleProject(projectName, projectId, projectType, serviceAccount, filename, hasAgentData).then((resp)=> {
      if (resp.success) {
        this.context.root.loadData();
      } else {
        alert(resp.message);
      }
    }).catch((e)=> {
      console.error(e);
    });
  }

  render() {
    return (
      <Modal {...this.props} size="small" closable={false}>
        <div className="content">
          <form className={cx('ui form', {loading: this.state.loading})}>
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
              <label>Service Account *</label>
              <input type="text" name="serviceAccount" onChange={(e)=>this.setState({serviceAccount: e.target.value})}/>
            </div>
            <div className="field">
              <label>.p12 key file *</label>
              <div className="ui button fileinput-button">
                Upload .p12 key file
                <input type="file" name="file" ref={::this.fileUploadRef}/>
              </div>
              {this.state.filename && <span className="text-blue">{this.state.filename}</span>}
            </div>
            <div className="inline field" style={{fontSize: 13}}>
              <div className="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden" 
                       onChange={(e) => this.setState({hasAgentData: e.target.checked})} />
                <label>Enable agent monitoring</label>
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
        <div>* Fields encrypted for extra security protection.</div>
      </Modal>
    )
  }

  fileUploadRef(r) {

    $(ReactDOM.findDOMNode(r))
      .fileupload({
        dataType: 'json',
        url: `${baseUrl}cloudstorage/${store.get('userName')}/${this.state.projectName}.p12`,
        sequentialUploads: true,
        multipart: false,
      })
      .bind('fileuploadadd', function (e, data) {
      })
      .bind('fileuploadprogress', (e, data) => {
        var progress = parseInt(data.loaded / data.total *
          100, 10);
        this.setState({loading: true});
      })
      .bind('fileuploadfail', (e, data) =>{
        var resp = data.response().jqXHR.responseJSON;
        this.setState({loading: false});
      })
      .bind('fileuploaddone', (e, data) => {
        var resp = data.response().jqXHR.responseJSON;
        resp.loading = false;
        this.setState(resp);
      });

  }
}

export default GoogleProjectModal;