import React from 'react';
import R from 'ramda';
import { autobind } from 'core-decorators';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';
import EventGroup from './event-group';

class PatternSequence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGroup: null,
    };
  }


  @autobind
  handleSelectGroup(group) {
    return () => {
      if (group) {
        this.setState({
          selectedGroup: group,
        });
      }
    };
  }

  renderSelectedGroup() {
    const { selectedGroup } = this.state;
    if (!selectedGroup) return null;

    const name = `Pattern ${selectedGroup.nid}`;
    const keywords = (selectedGroup.topKWords && selectedGroup.topKWords.length > 0) ?
      selectedGroup.topKWords.replace(/\(\d+\)/g, '').replace(/'/g, '').split(',') : [];
    const episodes = (selectedGroup.topKEpisodes && selectedGroup.topKEpisodes.length > 0) ?
      selectedGroup.topKEpisodes.replace(/\(\d+\)/g, '').replace(/'/g, '').split(',') : [];
    const events = R.map(d => ({
      timestamp: d[0],
      rawData: d[1],
    }), selectedGroup.data);

    return (
      <EventGroup
        className="flex-col-container"
        key={name} name={name}
        eventDataset={events} keywords={keywords} episodes={episodes}
        showFE={true}
      />
    );
  }

  render() {
    const { dataset, eventDataset } = this.props;
    return (
      <div className="flex-row-container">
        <div style={{ overflowY: 'auto', width: 400 }}>
          <table style={{ marginBottom: 10 }} className="pattern-sequence ui celled table">
            <thead>
              <tr>
                <th>Frequent Pattern Sequences</th>
                <th style={{ textAlign: 'center' }}>Count</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((val) => {
                const pattern = val.pattern;
                const nids = pattern.split(',');
                return (
                  <tr key={pattern}>
                    <td>
                      <div className="ui horizontal bulleted list">
                        {nids.map((nid, nididx) => {
                          const grp = R.find(a => a.nid.toString() === nid)(eventDataset);
                          const eventText = grp ? grp.data[0][1] : '';
                          return (
                            <OverlayTrigger
                              key={nididx}
                              placement="right" delayShow={300}
                              overlay={
                                <Tooltip className="pattern-sequence-tooltip">
                                  <div>Example log entry:</div>
                                  <div>{eventText}</div>
                                </Tooltip>
                              }
                            >
                              <span className="item" onClick={this.handleSelectGroup(grp)}>{`Pattern ${nid}`}</span>
                            </OverlayTrigger>
                          );
                        })}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>{val.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex-item flex-col-container">
          {this.renderSelectedGroup()}
        </div>
      </div>
    );
  }
}

export default PatternSequence;
