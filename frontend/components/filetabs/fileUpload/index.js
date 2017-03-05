import React, {Component}    from 'react';
import { autobind } from 'core-decorators';
import {
    Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import store from 'store';


import apis from '../../../apis';
import WaringButton from '../../cloud/monitoring/waringButton';

const baseUrl = window.API_BASE_URL || '/api/v1/';

export default class FileUpload extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            submitLoading: false,
            visualizationData: 'visualizationData',
            loading: false
        };
    }

    handleSubmit(e) {
        let {loading,visualizationData,optionalFilterDataShow} = this.state;
        let filename = optionalFilterDataShow?visualizationData:undefined;
        let url = '/filesMonitoring?filename=' + filename;
        window.open(url, '_blank');
    }

    render() {
        let {userInstructions} = this.context;
        let {loading} = this.state;
        let labelStyle = {};
        return (
            <Console.Content className={loading?"ui form loading":""}>
                <div className="ui main tiny container">
                    <div className="ui clearing vertical segment">
                    </div>
                    <div className="ui vertical segment">
                        <div className="ui grid two columns form">
                            <div className="wide column">
                                <h3>Data visualization and upload</h3>

                                <div className="three fields fill">
                                    <div className="field">
                                        <WaringButton labelStyle={labelStyle} labelTitle="Choose file for visualization"
                                                      labelSpan="You can opt to upload and store your data in our system."/>

                                        <div className="ui button fileinput-button">
                                            Choose file for visualization
                                            <input type="file" name="file" ref={this.fileUploadRef}/>
                                        </div>
                                        {this.state.optionalFilterDataShow ?
                                            <span className="text-blue">{this.state.filename}</span> : null}
                                    </div>
                                </div>
                                <div className="ui field">
                                    <Button className={cx('orange', {'loading': this.state.submitLoading})}
                                            onClick={this.handleSubmit.bind(this)}>Submit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Console.Content>
        );
    }

    @autobind
    fileUploadRef(r) {
        $(ReactDOM.findDOMNode(r))
            .fileupload({
                dataType: 'json',
                url: `${baseUrl}cloudstorage/${store.get('userName')}/${this.state.visualizationData}`,
                sequentialUploads: true,
                multipart: false
            })
            .bind('fileuploadadd', (e, data) => {
            })
            .bind('fileuploadprogress', (e, data) => {
                this.setState({loading: true});
            })
            .bind('fileuploadfail', (e, data) => {
                this.setState({loading: false});
            })
            .bind('fileuploaddone', (e, data) => {
                var resp = data.response().jqXHR.responseJSON;
                resp.loading = false;
                resp.optionalFilterDataShow = true;
                this.setState(resp);
            });
    }
}