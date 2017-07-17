import React from 'react';
import _ from 'lodash';
import R from 'ramda';
import moment from 'moment';
import { autobind } from 'core-decorators';
import { InlineEditInput } from '../../ui/inlineedit';
import EventTable from './event-table';

type Props = {
  name: String,
  eventDataset: Array<Object>,
  keywords: Array<String>,
  episodes: Array<String>,
  className: String,
  onNameChanged: Function,
  nameEditable: Boolean,
  showFE: Boolean,
  highlightWord: ?String,
};

class EventGroup extends React.Component {
  props: Props;

  static defaultProps = {
    name: '',
    eventDataset: [],
    nameEditable: false,
    showFE: true,
    keywords: [],
    episodes: [],
    className: '',
    onNameChanged: () => {},
    highlightWord: null,
  };

  constructor(props) {
    super(props);

    this.timeFormat = 'YYYY-MM-DD HH:mm';
    this.state = {
      highlightWord: props.highlightWord,
    };

    this.normalizeDataset(props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.keywords !== this.props.keywords ||
      nextProps.eventDataset !== this.props.eventDataset
    ) {
      this.normalizeDataset(nextProps);
      this.setState({
        highlightWord: nextProps.highlightWord,
      });
    }
  }

  normalizeDataset(props) {
    const { eventDataset } = props;
    const sorter = R.sort((a, b) => a.timestamp - b.timestamp);
    const normalizer = R.map(
      e =>
        _.isString(e.datetime)
          ? e
          : {
              ...e,
              datetime: moment(e.datetime).format(this.timeFormat),
            },
    );
    this.normalizedEvents = sorter(normalizer(eventDataset));
  }

  @autobind
  handleKeywordClick(kw) {
    return () => {
      // Clear the highlight if click the same word.
      const { highlightWord } = this.state;
      this.setState({
        highlightWord: kw === highlightWord ? null : kw,
      });
    };
  }

  @autobind
  handleNameChanged(name) {
    this.props.onNameChanged(name);
  }

  render() {
    const { name, className, nameEditable, keywords, episodes, showFE, ...others } = this.props;
    const normalizedEvents = this.normalizedEvents;
    const props = _.omit(others, 'onNameChanged', 'eventDataset', 'highlightWord');
    const { highlightWord } = this.state;
    const count = normalizedEvents.length;
    const timeRange =
      count > 0 ? `${normalizedEvents[0].datetime} ~ ${normalizedEvents[count - 1].datetime}` : '';

    return (
      <div className={`log-event-group ${className}`} {...props}>
        {nameEditable &&
          <InlineEditInput className="title" value={name} onChange={this.handleNameChanged} />}
        {!nameEditable &&
          <div className="title" style={{ cursor: 'inherit' }}>
            {name}
          </div>}
        <div style={{ fontSize: 13 }}>
          <span className="label" style={{ paddingRight: '1em' }}>
            Time Range:{' '}
          </span>
          <span>
            {timeRange}
          </span>
          <span style={{ float: 'right' }}>
            {count}
          </span>
          <span className="label" style={{ float: 'right', marginRight: '1em' }}>
            Number of Events:{' '}
          </span>
        </div>
        {showFE &&
          Array.isArray(episodes) &&
          episodes.length > 0 &&
          <div>
            <span className="label" style={{ paddingRight: '1em' }}>
              Top frequent episodes:
            </span>
            <div style={{ display: 'inline-block' }}>
              {R.uniq(R.map(R.trim, episodes)).map(kw =>
                <span key={kw}>
                  {kw}
                </span>,
              )}
            </div>
          </div>}
        {showFE &&
          Array.isArray(keywords) &&
          keywords.length > 0 &&
          <div>
            <span className="label">Top keywords: </span>
            <div style={{ display: 'inline-block' }}>
              {R.uniq(R.map(R.trim, keywords)).map(kw =>
                <span
                  key={kw}
                  className={`keyword ${kw === highlightWord ? 'highlight' : ''}`}
                  onClick={this.handleKeywordClick(kw)}
                >
                  {kw}
                </span>,
              )}
            </div>
          </div>}
        <div className="spacer" />
        <EventTable
          className="flex-item"
          highlightWord={highlightWord}
          eventDataset={normalizedEvents}
        />
      </div>
    );
  }
}

export default EventGroup;
