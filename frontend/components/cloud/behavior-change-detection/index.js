import React, {Component} from 'react';
import store from 'store';
import {Link, IndexLink} from 'react-router';
import RcSlider from '../../ui/rc-slider';
import HeatMapCard from '../../ui/heat-map-card';
import {
    Modal, Console, ButtonGroup, Button, Popup, Dropdown, Accordion, Message
} from '../../../artui/react/index';
import {Dygraph} from '../../../artui/react/dataviz';

import apis from '../../../apis';

import moment from 'moment';
import OutlierDetection from '../outlier-detection';
import RolloutCheck from '../rollout-check';

export default class BehaviorChangeDetection extends Component {
    static contextTypes = {
        userInstructions: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        let weeks = 1;
        this.state = {
            view: 'chart',
            dateIndex: 0,
            timeIndex: 0,
            showAddPanel: true,
            params: {
                projects: [],
                weeks: weeks,
                endTime: moment(new Date()).toDate(),
                startTime: moment(new Date()).add(-7 * weeks, 'days')
            },
            data: {},
            tabStates: {
                metric: 'active',
                instance: ''
            },
        };
    }

    componentDidMount() {
    }

    selectTab(e, tab) {
        var tabStates = this.state['tabStates'];
        tabStates = _.mapValues(tabStates, function (val) {
            return '';
        });
        tabStates[tab] = 'active';
        this.setState({tabStates: tabStates});
    }

    handleData(data) {
        this.setState({data: data}, ()=> {
            this.setHeatMap(_.keys(this.state.data.modelData)[1]);
        })
    }

    handleToggleFilterPanel() {
        this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
            this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
        })
    }

    render() {
        const self = this;
        const {showAddPanel, tabStates} = this.state;
        const {userInstructions} = this.context;
        const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';

        return (
            <Console.Content>
                <div className="ui main tiny container" ref={c => this._el = c}>
                    <div className="ui clearing vertical segment">
                        <ButtonGroup className="right floated basic icon">
                            <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                                <Popup position="bottom right">
                                    <i className={panelIconStyle}/>
                                    <span className="ui mini popup">Expand & Close</span>
                                </Popup>
                            </Button>
                            <Button>
                                <i className="setting icon"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="ui vertical segment filterPanel"
                             ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
                            <i className="close link icon" style={{float:'right', marginTop: '-10px'}}
                               onClick={this.handleToggleFilterPanel.bind(this)}/>

                    <div>
                        <div className="ui pointing secondary menu">
                            <a className={tabStates['metric'] + ' item'}
                               onClick={(e) => this.selectTab(e, 'metric')}>By Metric</a>
                            <a className={tabStates['instance'] + ' item'}
                               onClick={(e) => this.selectTab(e, 'instance')}> By Instance</a>
                        </div>

                        <div className={tabStates['metric'] + ' ui tab '}>
                            {tabStates['metric'] === 'active' ?
                                <div>
                                    <OutlierDetection />
                                </div>
                                : null}
                        </div>
                        <div className={tabStates['instance'] + ' ui tab '}>
                            {tabStates['instance'] === 'active' ?
                                <div>
                                    <RolloutCheck />
                                </div>
                                : null}
                        </div>

                    </div>
                </div>
                </div>
            </Console.Content>
        );
    }
}