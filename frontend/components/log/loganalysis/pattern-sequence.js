import React, { PropTypes as T } from 'react';
import R from 'ramda';
import { autobind } from 'core-decorators';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';
import EventGroup from './event-group';

class PatternSequence extends React.Component {
  static propTypes = {
    dataset: T.array.isRequired,
    eventDataset: T.array.isRequired,
  }

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
  componentDidMount() {
    this.autoselectGroup(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset !== this.props.dataset) {
      this.autoselectGroup(nextProps);
    }
  }

  @autobind
  autoselectGroup(props) {
    const { dataset, eventDataset } = props;
    if (Array.isArray(dataset) && dataset.length > 0) {
      const nids = dataset[0].pattern.split(',');
      if (nids.length > 0) {
        const nid = nids[0];
        const grp = R.find(a => a.nid.toString() === nid)(eventDataset);
        if (grp) {
          this.setState({
            selectedGroup: grp,
          });
        }
      }
    } else {
      this.setState({
        selectedGroup: null,
      });
    }
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
      datetime: d[0],
      rawData: d[1],
      timestamp: d[2],
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
                          const data = R.sort((a, b) => b[2] - a[2])(grp.data);
                          const eventText = data ? data[0][1] : '';
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
