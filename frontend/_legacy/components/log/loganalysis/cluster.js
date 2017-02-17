import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import { autobind } from 'core-decorators';
import { InlineEditInput } from '../../ui/inlineedit';

class EventTableGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedWords: '',
      eventsInRangeFreqVector: [],
      selectedPattern: '',
      selectedPatternChartData: {},
      derivedAnomalyByMetric: {},
      patternNames: {},
    };
  }

  parseTopWords(wordsStr) {
    const ret = [];
    const words = wordsStr ? wordsStr.split(',') : [];
    _.forEach(words, (wstr) => {
      const match = wstr.match(/'(.*)'.*\((\d*)\)*/);
      // The second and third match contains the words and count.
      if (match && match.length >= 3) {
        ret.push([match[1], match[2]]);
      }
    });

    return ret;
  }

  @autobind
  handleHighlight(word) {
    return () => {
      const current = this.state.selectedWords;
      this.setState({
        selectedWords: word === current ? '' : word,
      });
    };
  }

  @autobind
  highlightKWord(rawData) {
    const word = this.state.selectedWords;
    if (word) {
      const regex = new RegExp(`\\b(${word})\\b`, 'mgi');
      return rawData.replace(regex, '<span class="highlight">$1</span>');
    }

    return rawData;
  }

  @autobind
  handleGroupNameChanged(nid) {
    const self = this;
    return (newValue) => {
      const patternNames = {
        ...this.state.patternNames,
      };
      patternNames[nid] = newValue;
      self.setState({
        patternNames,
      });
    };
  }

  @autobind
  getPatternName(nid) {
    const { patternNames } = this.state;
    return patternNames[nid] || `Pattern ${nid}`;
  }

  render() {
    const eventTableData = this.props.eventTableData;
    const group = this.props.selectedGroup;
    const data = group.data;
    const title = this.getPatternName(group.nid);
    const rows = [];

    for (let i = 1; i < data.length; ++i) {
      const timestamp = data[i][0];
      const rawData = data[i][1];
      rows.push((<tr key={i}>
        <td>{timestamp}</td>
        <td dangerouslySetInnerHTML={{ __html: this.highlightKWord(rawData) }} />
      </tr>));
    }

    return (
      <div className="flex-item flex-row-container">
        <div
          className="flex-col-container"
          style={{ border: '1px solid rgba(34, 36, 38, 0.15)', marginBottom: 10 }}
        >
          <h4
            style={{ background: '#F9FAFB', width: '100%', height: 40, padding: 10, margin: 0 }}
          >Pattern List</h4>
          <div className="flex-item" style={{ overflowY: 'auto' }}>
            <table className="ui selectable celled table" style={{ border: 0 }}>
              <tbody>
                {eventTableData && eventTableData.sort((a, b) => {
                  const aid = a.nEvents;
                  const bid = b.nEvents;
                  if (aid > bid) {
                    return -1;
                  } else if (aid < bid) {
                    return 1;
                  }
                  const aaid = a.nid;
                  const bbid = b.nid;
                  if (aaid > bbid) {
                    return 1;
                  } else if (aaid < bbid) {
                    return -1;
                  }
                  return 0;
                }).map((grp, iGrp) => {
                  let topKEpisodes = '';
                  let topKWords = '';
                  const patternString = this.getPatternName(grp.nid);
                  const nEventString = `Number of events: ${grp.nEvents}`;
                  if (grp) {
                    topKEpisodes = grp.topKEpisodes.length > 0
                      ? `Top frequent episodes: ${grp.topKEpisodes.replace(/\(\d+\)/g, '')}` : '';
                    topKWords = grp.topKWords.length > 0
                      ? `Top keywords: ${grp.topKWords.replace(/\(\d+\)/g, '')}` : '';
                  }
                  return (<tr
                    key={iGrp}
                    onClick={() => this.props.handleSelectedGroup(grp.nid)}
                    className={cx({ active: grp.nid === group.nid })}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <InlineEditInput
                        normalStyle={{ fontWeight: 'bold' }}
                        value={patternString}
                        onChange={this.handleGroupNameChanged(grp.nid)}
                      />
                      {nEventString}<br />
                      {topKWords}<br />
                      {topKEpisodes}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-item flex-col-container" style={{ padding: 10 }}>
          <h4 className="ui header">{title}</h4>
          <div className="flex-item" style={{ overflowY: 'auto', paddingLeft: 10 }}>
            <table className="event-right-table">
              <thead>
                <tr>
                  <td>Time</td>
                  <td>Event</td>
                </tr>
              </thead>
              <tbody>
                <tr key="0">
                  <td>{data[0][0]}</td>
                  <td dangerouslySetInnerHTML={{ __html: this.highlightKWord(data[0][1]) }} />
                </tr>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EventTableGroup;
