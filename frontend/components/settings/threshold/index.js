import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';
import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react/index';
import store from 'store';

import apis from '../../../apis';

import {
    ProjectSelection,
    DurationThreshold,
    AnomalyThreshold,
} from '../../selections';

const baseUrl = window.API_BASE_URL || '/api/v1/';

export default class ThresholdSettings extends React.Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object,
        root: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        let weeks = 1;
        this.state = {
            view: 'chart',
            loading: false,
            indexLoading: false,
            dateIndex: 0,
            timeIndex: 0,
            params: {
                showAddPanel: false,
                projects: [],
                weeks: weeks,
                endTime: moment(new Date()).toDate(),
                startTime: moment(new Date()).add(-7 * weeks, 'days')
            },
            data: {},
            tempSharedUsernames: '',
            metricSettings: [],
            logAnalysisList: []
        };
    }

    componentDidMount() {
        let {dashboardUservalues} = this.context;
        let {projectModelAllInfo, projectString} = dashboardUservalues;
        let projectNames = projectModelAllInfo.map((info)=>info.projectName);

        let {
            projectName, cvalue, pvalue, emailcvalue, emailpvalue, filtercvalue, filterpvalue, minAnomalyRatioFilter, sharedUsernames
            }=this.state.data;
        projectName = projectName || projectNames[0];

        if (projectNames.length > 0) {
            this.handleProjectChange(projectNames[0]);
        }
    }

    handleToggleFilterPanel() {
        this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
            this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
        })
    }

    handleFilterChange(data) {
        this.$filterPanel.slideUp();
        console.log(JSON.stringify(data));
    }

    handleProjectChange(projectName) {
        let {dashboardUservalues} = this.context;
        let {projectModelAllInfo, projectSettingsAllInfo, projectString} = dashboardUservalues;
        let project = projectModelAllInfo.find((info)=>info.projectName == projectName);
        let projectSetting = projectSettingsAllInfo.find((info)=>info.projectName == projectName);
        let metricSettings = (projectSetting && projectSetting.metricSettings) || [];
        let {cvalue, pvalue, emailcvalue, emailpvalue, filtercvalue, filterpvalue, minAnomalyRatioFilter, sharedUsernames} = project;

        let projectStr = projectString.split(',').map((s)=>s.split(":")).find(v => v[0] == projectName);
        // // 前三部分是名称，数据类型dataType和云类型cloudType
        let dataType = projectStr ? projectStr[1] : null;
        let cloudType = projectStr ? projectStr[2] : '';
        let projectType;
        let self = this;
        console.log(project, projectSetting);
        switch (dataType) {
            case 'AWS':
            case 'EC2':
            case 'RDS':
            case 'DynamoDB':
                projectType = `${dataType}/CloudWatch`;
                break;
            case 'GAE':
            case 'GCE':
                projectType = `${dataType}/CloudMonitoring`;
                break;
            default:
                projectType = `${cloudType}/Agent`;
        }

        let data = Object.assign({}, this.state.data, {
            projectName,
            projectType,
            cvalue,
            pvalue,
            emailcvalue,
            emailpvalue,
            filtercvalue,
            filterpvalue,
            minAnomalyRatioFilter,
            sharedUsernames
        });
        this.setState({
            metricSettings: metricSettings,
            data: data,
            tempSharedUsernames: (data.sharedUsernames || '').replace('[', '').replace(']', ''),
            loading: projectSetting['fileProjectType'] == 0
        }, ()=> {
            projectSetting['fileProjectType'] == 0 ? self.getLogAnalysisList(projectName, project) : null
        });
    }

    getLogAnalysisList(projectName, project) {
        let self = this;
        apis.postLogAnalysis(projectName, '', '', '', '', '', '', '', true, "readonly").then((resp)=> {
            self.setState({
                logAnalysisList: resp.data['episodeMapArr'],
                loading: false
            });
        });
    }

    handleValueChange(name) {
        return (v) => {
            this.setState({
                data: Object.assign({}, this.state.data, _.fromPairs([[name, v]]))
            })
        }
    }

    handleSharingChange(e) {
        let v = e.target.value;
        this.setState({
            tempSharedUsernames: v,
            data: Object.assign({}, this.state.data, {sharedUsernames: JSON.stringify(v.split(","))})
        });
    }

    handleMetricSetting(index, name) {
        return (e) => {
            let metricSettings = this.state.metricSettings;
            metricSettings[index][name] = e.target.value;
            this.setState({metricSettings});
        }
    }

    getIndexNumber(index, e) {
        let {logAnalysisList} = this.state;
        console.log(index);
        if (!e.target.checked) {
            $('#checkAll').prop('checked', false);
        }
        else {
            $('input[name="indexCheck"]:checked').size() == logAnalysisList.length ? $('#checkAll').prop('checked', true) : "";
        }
    }

    setCheckboxAll(e) {
        console.log(e.target.checked);
        if (e.target.checked) {
            $('input[name="indexCheck"]').prop("checked", true);
        }
        else {
            $('input[name="indexCheck"]').prop("checked", false);
        }
    }

    render() {        
        let labelStyle = {};
        let {data, tempSharedUsernames, loading, metricSettings,logAnalysisList,indexLoading} = this.state;
        let {dashboardUservalues} = this.context;
        let {projectModelAllInfo, projectSettingsAllInfo, projectString} = dashboardUservalues;
        let project = projectModelAllInfo.find((info)=>info.projectName == data.projectName);
        let projectSetting = projectSettingsAllInfo.find((info)=>info.projectName == data.projectName);
        let isLogProject = (projectSetting != undefined && projectSetting['fileProjectType'] == 0);
        let self = this;
        return (
            <Console.Content className={loading?"ui form loading":""}>
                <div className="ui main tiny container" ref={c => this._el = c}>
                    <div className="ui clearing vertical segment">
                    </div>
                    <div className="ui vertical segment">
                        <div className={cx('ui grid two columns form', {'loading': !!this.state.settingLoading})}>

                            <div className="wide column">
                                <h3>Real-time Report Alerts</h3>

                                <div className="field">
                                    <label style={labelStyle}>Project Name</label>
                                    <ProjectSelection key={data.projectName} value={data.projectName}
                                                      onChange={this.handleProjectChange.bind(this)}/>
                                </div>
                                <div className="field">
                                    <label style={labelStyle}>Anomaly Threshold</label>
                                    <AnomalyThreshold key={data.projectName} value={data.pvalue}
                                                      onChange={this.handleValueChange('pvalue')}/>
                                </div>
                                <div className="field">
                                    <label style={labelStyle}>Duration Threshold</label>
                                    <DurationThreshold key={data.projectName} value={data.cvalue}
                                                       onChange={this.handleValueChange('cvalue')}/>
                                </div>
                            </div>
                            <div className="wide column">
                                <h3>Email Alerts</h3>

                                <div className="field">
                                    <label style={labelStyle}>Project Type</label>

                                    <div className="ui input">
                                        <input type="text" readOnly={true} value={data.projectType}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label style={labelStyle}>Anomaly Threshold</label>
                                    <AnomalyThreshold key={data.projectName} value={data.emailpvalue}
                                                      onChange={this.handleValueChange('emailpvalue')}/>
                                </div>
                                <div className="field">
                                    <label style={labelStyle}>Duration Threshold</label>
                                    <DurationThreshold key={data.projectName} value={data.emailcvalue}
                                                       onChange={this.handleValueChange('emailcvalue')}/>
                                </div>
                            </div>
                            <div className="wide column">
                                <h3>Sharing group: <span style={{fontSize: '0.8em', color: '#666'}}>(comma separated user names)</span>
                                </h3>

                                <div className="field">
                                    <div className="ui input">
                                        <input key={data.projectName} type="text"
                                               value={tempSharedUsernames}
                                               onChange={this.handleSharingChange.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="wide column">
                                <h3>Hint mapping file:</h3>

                                <div className="field">
                                    <div className="ui button fileinput-button">
                                        Upload Hint mapping file
                                        <input type="file" name="file" ref={::this.fileUploadRef}/>
                                    </div>
                                    {this.state.projectHintMapFilename &&
                                    <span className="text-blue"
                                          id="productName">{this.state.projectHintMapFilename}</span>}
                                </div>
                            </div>
                            <div className="wide column">
                                <Button className="blue"
                                        onClick={this.handleSaveProjectSetting.bind(this)}>Submit</Button>
                            </div>
                        </div>
                        <br /><hr />
                        <div className={cx('ui form', {'loading': !!this.state.uservaluesLoading})}>
                          {!isLogProject && <div class="ui">
                            <h3>Metric Settings (Optional)</h3>
                            <table className="ui celled table">
                                <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Normalization Group</th>
                                    <th>Alert Threshold</th>
                                    <th>No Alert Threshold</th>
                                </tr>
                                </thead>
                                <tbody>
                                {metricSettings.map((setting, index)=> {
                                    return (
                                        <tr key={`${data.projectName}-${index}`}>
                                            <td>{setting.smetric}</td>
                                            <td><input value={setting.groupId}
                                                       onChange={this.handleMetricSetting(index, 'groupId')}/></td>
                                            <td><input value={setting.thresholdAlert}
                                                       onChange={this.handleMetricSetting(index, 'thresholdAlert')}/>
                                            </td>
                                            <td><input value={setting.thresholdNoAlert}
                                                       onChange={this.handleMetricSetting(index, 'thresholdNoAlert')}/>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <Button className="blue" onClick={this.handleSaveMetricSetting.bind(this)}>Submit</Button>
                          </div>}
                          {isLogProject && <div class="ui">
                            <h3>Episode and Word Selection</h3>
                            <Button className={indexLoading?"loading blue":"blue"} onClick={this.handleSaveMapArrSetting.bind(this)}>Submit</Button>
                            <table className="ui celled table">
                                <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Pattern</th>
                                    <th>Count</th>
                                    <th><input type="checkbox" id="checkAll" defaultChecked="false"
                                               onChange={(e)=>self.setCheckboxAll(e)}/></th>
                                </tr>
                                </thead>
                                <tbody>
                                {logAnalysisList.map((value, index)=> {
                                    return (
                                        <tr key={`${data.projectName}-${index}-1`}>
                                            <td>{value['index']}</td>
                                            <td>{value['pattern']}</td>
                                            <td>{value['count']}</td>
                                            <td><input type="checkbox" data-id={value['index']} name="indexCheck"
                                                       value={value['selected']}
                                                       onChange={(e)=>self.getIndexNumber(value['index'],e)}/></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                          </div>}
                        </div>
                    </div>
                </div>
            </Console.Content>
        );
    }


    fileUploadRef(r) {
        $(ReactDOM.findDOMNode(r))
            .fileupload({
                dataType: 'json',
                url: `${baseUrl}cloudstorage/${store.get('userName')}/${this.state.data.projectName}/wordMap.csv`,
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

    handleSaveProjectSetting() {
        let {projectName, cvalue, pvalue, emailcvalue, emailpvalue, filtercvalue, filterpvalue, minAnomalyRatioFilter, sharedUsernames, projectHintMapFilename,} = this.state.data;
        let {tempSharedUsernames,data} = this.state;
        this.setState({settingLoading: true}, ()=> {
            apis.postProjectSetting(projectName, cvalue, pvalue, emailcvalue, emailpvalue, filtercvalue, filterpvalue, minAnomalyRatioFilter, tempSharedUsernames, projectHintMapFilename).then((resp)=> {
                console.log(resp);
                this.setState({settingLoading: false}, this.context.root.loadData)
            });
        });
    }

    handleSaveMapArrSetting() {
        let selectedIndexArr = [];
        $('input[name="indexCheck"]:checked').each(function () {
            selectedIndexArr.push($(this).data('id'));
        });
        console.log(selectedIndexArr);
        this.setState({indexLoading: true}, ()=> {
            apis.postDashboardUserValuesMapArr('updatefrequencyvector', {
                projectName: this.state.data.projectName,
                selectedIndexArr: selectedIndexArr
            }).then((resp)=> {
                this.setState({indexLoading: false});
            });
        });

    }

    handleSaveMetricSetting() {
        this.setState({uservaluesLoading: true}, ()=> {
            apis.postDashboardUserValues('updateprojsettings', {
                projectName: this.state.data.projectName,
                projectSettings: JSON.stringify(this.state.metricSettings)
            }).then((resp)=> {
                this.setState({uservaluesLoading: false}, this.context.root.loadData)
            });
        });
    }
}