import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import {Console} from '../../../artui/react/index';
import OutlierDetection from '../outlier-detection';
import RolloutCheck from '../rollout-check';

export default class BehaviorChangeDetection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabStates: {
                metric: 'active',
                instance: ''
            },
        };
    }

    selectTab(e, tab) {
        var tabStates = this.state['tabStates'];
        tabStates = _.mapValues(tabStates, function (val) {
            return '';
        });
        tabStates[tab] = 'active';
        this.setState({ tabStates: tabStates });
    }

    render() {
        const { tabStates } = this.state;
        return (
            <Console.Content>
                <div className="ui main tiny container" ref={c => this._el = c}>
                    <div className="ui vertical segment">
                        <div>
                            <div className="ui pointing secondary menu">
                                <a className={tabStates['metric'] + ' item'}
                                   onClick={(e) => this.selectTab(e, 'metric')}>By Metric</a>
                                <a className={tabStates['instance'] + ' item'}
                                   onClick={(e) => this.selectTab(e, 'instance')}>By Instance</a>
                            </div>

                            <div className={tabStates['metric'] + ' ui tab '}>
                                {tabStates['metric'] === 'active' ?
                                    <div>
                                        <RolloutCheck />
                                    </div>
                                    : null}
                            </div>
                            <div className={tabStates['instance'] + ' ui tab '}>
                                {tabStates['instance'] === 'active' ?
                                    <div>
                                        <OutlierDetection />
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