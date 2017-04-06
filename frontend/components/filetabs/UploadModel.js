import React from 'react';
import $ from 'jquery';
import { autobind } from 'core-decorators';
import store from 'store';
import { Console } from '../../artui/react';
import getEndpoint from '../../apis/get-endpoint';

class UploadModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDisabled: true,
      submitLoading: false,
      filename: '',
    };
  }

  componentDidMount() {
    if (this.$uploader && this.$submit) {
      this.$uploader.fileupload({
        dataType: 'json',
        url: `${getEndpoint('upload-model')}?userName=${store.get('userName')}&token=${store.get('token')}`,
        sequentialUploads: true,
        multipart: false,
        add: (e, data) => {
          this.$submit.click(() => {
            if (data.files[0].name) {
              data.submit();
            } else {
              window.alert('Please select the model file');
            }
          });
          this.setState({
            filename: data.files[0].name,
            submitDisabled: false,
          });
        },
      });
    }
  }

  render() {
    const { loading, filename, submitDisabled } = this.state;
    return (
      <Console.Content className={loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container ">
          <div className="ui vertical segment">
            <div className="ui grid columns form">
              <div className="wide column">
                <h3>Upload a model</h3>
                <div className="one fields fill">
                  <div className="field">
                    <div className="ui button fileinput-button">
                      Select Model File...
                      <input type="file" name="file" ref={(c) => { this.$uploader = $(c); }} />
                    </div>
                    <span className="text-blue">{filename}</span>
                  </div>
                </div>
                <div className="ui field">
                  <div
                    className={`ui ${submitDisabled ? 'disabled' : ''} orange button`}
                    ref={(c) => { this.$submit = $(c); }}
                  >Submit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default UploadModel;
