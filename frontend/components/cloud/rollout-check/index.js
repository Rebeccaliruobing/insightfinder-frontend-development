import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link, IndexLink} from 'react-router';
import HeatMapCard from '../../ui/heat-map-card';
import moment from 'moment';
import {autobind} from 'core-decorators';
import {Console, ButtonGroup, Button, Dropdown, Message} from '../../../artui/react/index';

import apis from '../../../apis';
import FilterBar from './filter-bar';

export default class RolloutCheck extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        let weeks = 1;
        this.state = {
            showAddPanel: true,
            activeTab: 'holistic', // split
            tabStates: {
                holistic: 'active',
                split: ''
            },
            data: null,

            // When data return, display holistic group which always has key of 0.
            selectedGroupId: 0,
        };
    }

    @autobind
    handleData(data) {
        //     this.setHeatMap(_.keys(this.state.data.modelData)[1]);
        if (data && data.modelData) {
            this.setState({ data, });
        }
    }

    setHeatMap(groupId = 1) {
        let modelData = this.state.data && this.state.data.modelData;
        if (!modelData) return;
        let holisticGroup, splitGroup;
        let handleGroup = (group, groupId)=> {
            return group.map((data, index)=> {
                data.startTime = moment(data.startTime).format('MM-DD HH:mm');
                data.endTime = moment(data.endTime).format('MM-DD HH:mm');
                let dataArray = [];
                let title, startTime = data.startTime, endTime = data.endTime;
                data.NASValues.forEach((line, index) => {
                    var lineArray = line.split(",");
                    var colIndex = lineArray[0];
                    dataArray.push({
                        colIndex: colIndex % 32,
                        rowIndex: parseInt(index / 32),
                        value: lineArray[1]
                    });
                });

                let params = {
                    projectName: this.state.data.projectName,
                    startTime: data.startTime,
                    endTime: data.endTime
                };


                let metricNames = "";
                if (data.metricNameList && data.metricNameList != undefined) {
                    metricNames = `(${new Array(...new Set(data.metricNameList.map((m)=>m.split("[")[0]))).join(",")})`
                }
                if (!groupId) {
                    title = <span>Holistic {metricNames}<br/>{startTime} - {endTime} </span>
                } else {
                    title = <span>Group {groupId} {metricNames}<br/>{startTime} - {endTime}</span>
                }

                if (data.instanceName) {
                    title = data.instanceName;
                    params.instanceName = data.instanceName;
                } else {
                    params.groupId = data.groupId;
                }

                return {
                    key: `${groupId}-${index}`,
                    duration: 120,
                    itemSize: 4,
                    title: title,
                    data: dataArray,
                    link: `/projectDataOnly?${$.param(params)}`
                };
            })
        };
        if (modelData[0]) {
            holisticGroup = handleGroup(modelData[0], 0)
        }
        if (modelData[groupId]) {
            splitGroup = handleGroup(modelData[groupId], groupId)
        }

        this.setState({ holisticGroup, splitGroup, groupId: groupId });
    }

    @autobind
    handleToggleFilterPanel() {
        this.setState({ showAddPanel: !this.state.showAddPanel }, ()=> {
            this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
        })
    }

    @autobind
    handleFilterChange(data) {
        let startTime = moment(data.startTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        let endTime = moment(data.endTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        this.setState({ loading: true }, () => {
            apis.postCloudRolloutCheck(startTime, endTime, data.projectName, 'cloudrollout')
                .then(data => {
                    this.handleData(data);
                    this.setState({ loading: false });
                })
                .catch(()=> {
                    this.setState({ loading: false });
                });
        });
    }

    selectTab(e, tab) {
        if (this.state.activeTab !== tab) {
            if (tab === 'holistic') {
                this.setState({
                    activeTab: tab,
                    selectedGroupId: 0
                });
            } else if(tab === 'split') {
                const {data} = this.state;
                let selectedGroupId = null;
                if (data && data.modelData) {
                    const splitGroups = _.omit(data.modelData, 0);
                    const sgKeys = _.keys(splitGroups);
                    if(sgKeys.length > 0) {
                        selectedGroupId = sgKeys[0];
                    }
                }
                this.setState({
                    activeTab: tab,
                    selectedGroupId,
                });
            }
        }
    }

    getMetricName(metricNameList) {
        let metricNames = "";
        if (metricNameList && metricNameList != undefined) {
            metricNames = `(${new Array(...new Set(metricNameList.map((m)=>m.split("[")[0]))).join(",")})`
        }
        return metricNames;
    }

    renderContent() {
        const { activeTab, data, selectedGroupId } = this.state;
        const selectedGroup = data.modelData[selectedGroupId];
        const splitGroups = _.omit(data.modelData, 0);
        let selectedGroupList = [];
        let selectedGroupListTwo = [];
        return (
            <div className="ui main tiny container">
                <div className="ui pointing secondary menu">
                    <a className={activeTab === 'holistic' ? 'active item' : ' item'}
                       onClick={(e) => this.selectTab(e, 'holistic')}>Holistic</a>
                    <a className={activeTab === 'split' ? 'active item' : ' item'}
                       onClick={(e) => this.selectTab(e, 'split')}>Split</a>
                </div>
                <div className={ activeTab === 'holistic' ? 'active ui tab' : 'ui tab'}>
                    { activeTab === 'holistic' && selectedGroup && (
                        <div className="ui four cards">
                            {
                                selectedGroup.data.map(function (data,index) {
                                    if(selectedGroupList.indexOf(data['link']) == -1){
                                        selectedGroupList.push(data['link']);
                                        return <HeatMapCard key={`${selectedGroupId}-${index}`} {...data} />
                                    }
                                })
                            }
                        </div>
                    )}
                </div>
                <div className={ activeTab === 'split' ? 'active ui tab' : 'ui tab'}>
                    { activeTab === 'split' && selectedGroup && (
                        <div style={{ padding: '10px 0' }}>
                            <Dropdown mode="select"
                                      style={{ 'minWidth': '300px' }}
                                      value={selectedGroupId}
                                      text={`Group ${selectedGroupId} ${selectedGroup ? selectedGroup.metricNames : ''}`}
                                      onChange={v => this.setState({ selectedGroupId: v })}>
                                <i className="dropdown icon"/>
                                <div className="menu">
                                    { _.map(splitGroups, g => (
                                        <div className="item" key={g.groupId} data-value={g.groupId}>
                                            {`Group ${g.groupId} ${g.metricNames}`}
                                        </div>
                                    ))}
                                </div>
                            </Dropdown>
                        </div>
                    )}
                    { activeTab === 'split' && selectedGroup && (
                        <div className="ui four cards">
                            {
                                selectedGroup.data.map(function (data, index) {
                                    if(selectedGroupListTwo.indexOf(data['link']) == -1){
                                        selectedGroupListTwo.push(data['link']);
                                        return <HeatMapCard key={`${selectedGroupId}-${index}`} {...data} />
                                    }
                                })
                            }
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        const { loading, showAddPanel, data } = this.state;
        const { userInstructions } = this.context;
        const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
        return (
            <Console.Content>
                <div className="ui main tiny container">
                    <ButtonGroup className="right floated basic icon"
                                 style={{ position: 'absolute', top: 10, right: 0 }}>
                        <Button onClick={this.handleToggleFilterPanel}>
                            <i className={panelIconStyle}/>
                        </Button>
                    </ButtonGroup>
                    <div className="ui vertical segment filterPanel"
                         ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
                        <i className="close link icon" style={{ float: 'right', marginTop: '-10px' }}
                           onClick={this.handleToggleFilterPanel}/>
                        <FilterBar loading={loading} {...this.props}
                                   onSubmit={this.handleFilterChange}/>

                    </div>
                    {data &&
                    <div className="ui vertical segment">
                        <div className="ui info message">
                            Each heat map models the behavior of one instance. Red areas represent frequent behaviors
                            (i.e. normal states) and the size of the red areas indicates the ranges of different metric
                            values.
                        </div>
                    </div>
                    }
                    {data && this.renderContent()}
                </div>
            </Console.Content>
        );
    }
}