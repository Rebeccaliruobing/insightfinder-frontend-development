import React, {Component}    from 'react';
import {
    Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
export default class FileDetection extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object
    };
    render() {
        let {userInstructions} = this.context;
        return (
            <Console.Content>
                <div className="ui main tiny container">
                    <div className="ui clearing vertical segment">
                    </div>
                    <div className="ui vertical segment">
                        <div className="ui grid two columns form">
                            <div className="wide column">
                                <h3>Anomaly detection and cause analysis</h3>
                                <div className="field">
                                        <label>Model Name</label>
                                        <div className="">

                                        </div>
                                    </div>
                            </div>
                        </div>
                        <Message dangerouslySetInnerHTML={{ __html: userInstructions.filedetection }}/>
                    </div>
                </div>

            </Console.Content>
        );
    }

    fileUploadRef(r) {
        $(ReactDOM.findDOMNode(r))
            .fileupload({
                dataType: 'json',
                url: `${baseUrl}cloudstorage/${store.get('userName')}/`,
                sequentialUploads: true,
                multipart: false
            })
            .bind('fileuploadadd', (e, data) => {
                this.setState({settingLoading: true, projectName: data.files[0]['name']});
            })
            .bind('fileuploadprogress', (e, data) => {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                this.setState({settingLoading: true});
            })
            .bind('fileuploadfail', (e, data) => {
                var resp = data.response().jqXHR.responseJSON;
                this.setState({settingLoading: false});
            })
            .bind('fileuploaddone', (e, data) => {
                var resp = data.response().jqXHR.responseJSON;
                this.setState({
                    projectHintMapFilename: data['data']['name'],
                    data: Object.assign({}, this.state.data, {projectHintMapFilename: resp.filename}),
                    settingLoading: false
                });
            });
    }
}