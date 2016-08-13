import React from 'react';
import store from 'store';
import ReactTimeout from 'react-timeout'
import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';
import LiveAnalysisCharts from '../liveanalysis/index'
import {ChartsRefreshInterval} from '../../storeKeys';


const IncidentDetails = class extends React.Component {

    static propTypes = {
        updateData: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            view: 'four',
            viewText: 4,
            loading: false,
            selectedGroup: ''
        }
    }

    componentDidMount() {
        (this.props.updateData || this.updateData.bind(this))(this);
    }

    updateData() {

        let {query} = this.props.location;
        let {projectName, pvalue, cvalue, modelType, startTime, endTime, modelStartTime, modelEndTime, groupId, isExistentIncident} = query;
        let refreshInterval = parseInt(store.get(ChartsRefreshInterval, 5));
        this.setState({loading: true}, ()=> {
            apis.postPostMortem(projectName, pvalue, cvalue, modelType, startTime, endTime, modelStartTime, modelEndTime, isExistentIncident)
                .then(resp => {
                    let update = {};
                    if (resp.success) {
                        update.data = resp.data;
                    } else {
                        alert(resp.message);
                    }
                    update.loading = false;
                    this.setState(update);
                    if (refreshInterval > 0) {
                        // this.timeout = this.props.setTimeout(this.updateData.bind(this), refreshInterval * 1000 * 60);
                    }
                })
                .catch(msg=> {
                    console.error(msg);
                });
        });

    }

    render() {
        let {query} = this.props.location;
        let {projectName, modelName, pvalue, cvalue, modelType} = query;
        let {data, groupId, loading} = this.state;
        if (projectName === '') {
            projectName = modelName;
        }
        let syscallResults = this.state.data ? this.state.data['syscallResults'] : {};
        let timeFunctionList = this.state.data ? this.state.data['timeFunctionList'] : {};
        let freqFunctionList = this.state.data ? this.state.data['freqFunctionList'] : {};
        let timeMockup = [{"rank": 1, "functionName": 'unixd_setup_child'},
            {"rank": 2, "functionName": 'set_signals'},
            {"rank": 3, "functionName": 'ap_is_recursion_limit_exceeded'},
            {"rank": 4, "functionName": 'SSL_X509_getCN'},
            {"rank": 5, "functionName": 'ap_log_perror'},
            {"rank": 6, "functionName": 'asis_handler'},
            {"rank": 7, "functionName": 'handle_map_file'},
            {"rank": 8, "functionName": 'regex_cleanup'},
            {"rank": 9, "functionName": 'unixd_set_group'},
            {"rank": 10, "functionName": 'set_group_privs'}];
        let freqMockup = [{"rank": 1, "functionName": 'unixd_set_user'},
            {"rank": 2,"functionName": "apr_socket_recv"},
            {"rank": 3, "functionName": "unixd_setup_child"},
            {"rank": 4, "functionName": "set_signals"},
            {"rank": 5, "functionName": "ap_is_recursion_limit_exceeded"},
            {"rank": 6, "functionName": "SSL_X509_getCN"},
            {"rank": 7, "functionName": "ap_log_perror"},
            {"rank": 8, "functionName": "asis_handler"},
            {"rank": 9, "functionName": "handle_map_file"},
            {"rank": 10, "functionName": "regex_cleanup"}];
        console.log(syscallResults,timeFunctionList,freqFunctionList);
        return (
            <Console>
                <Console.Topbar logo={require('../../../images/logo.png')}>
                    <div className="topbar-text">
                        <div className="title">
                            Please view anomaly detection result for <b>{projectName}</b><br/>
                            with model type <b>{modelType}</b>, anomaly threshold <b>{pvalue}</b>, duration threshold:
                            <b>{cvalue}</b>.
                        </div>
                        <div className="legend">
                            <div>Anomaly color map:</div>
                            <div className="colormap2">
                                <div style={{float:'left'}}>Normal</div>
                                <div style={{float:'right'}}>Abnormal</div>
                            </div>
                        </div>
                    </div>
                </Console.Topbar>
                <LiveAnalysisCharts {...query} enableComments={true} enablePublish={true} data={data}
                                               loading={loading}
                                               onRefresh={() => this.updateData()}
                                               debugData={syscallResults}
                                               timeMockup={timeMockup}
                                               freqMockup={freqMockup}/>
            </Console>
        );
    }
};

export default ReactTimeout(IncidentDetails);
