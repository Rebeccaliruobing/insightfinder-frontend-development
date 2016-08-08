import React, {Component}    from 'react';
import {
    Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import store from 'store';


const baseUrl = window.API_BASE_URL || '/api/v1/';

export default class FileNewModel extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            submitLoading: false,
            loading: false
        };
    }

    handleSharingChange(e) {
        console.log(111);
    }
    handleSubmit(e){
        console.log('submit');
    }
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
                                <h3>Create a new model</h3>

                                <div className="three fields fill">
                                    <div className="field">
                                        <label>Training Data</label>

                                        <div className="ui button fileinput-button">
                                            Training Data
                                            <input type="file" name="file" ref={::this.fileUploadRef}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Optional Filter Data</label>

                                        <div className="ui button fileinput-button">
                                            Optional Filter Data
                                            <input type="file" name="file" ref={::this.fileUploadRef}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Model Name:</label>

                                        <div className="ui input">
                                            <input type="text"
                                                   value=""
                                                   onChange={this.handleSharingChange.bind(this)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui field">
                                    <Button className={cx('orange', {'loading': this.state.submitLoading})}
                                            onClick={this.handleSubmit.bind(this)}>Submit</Button>
                                </div>
                            </div>
                        </div>
                        <Message dangerouslySetInnerHTML={{ __html: userInstructions.fileNewModel }}/>
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