import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import { InlineEditInput } from '../../ui/inlineedit';
import EventTable from './event-table';

class EventGroup extends React.Component {
  static propTypes = {
    title: T.string.isRequired,
    eventDataset: T.array,
    keywords: T.array,
    episodes: T.array,
    className: T.string,
  }

  static defaultProps = {
    eventDataset: [],
    keywords: [],
    episodes: [],
    className: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eywords !== this.props.keywords ||
      nextProps.eventDataset !== this.props.eventDataset) {
      this.setState({
        highlightWord: null,
      });
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      highlightWord: null,
    };
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
  handleTitleChanged() {
  }

  render() {
    const { eventDataset, title, className, keywords, episodes, ...props } = this.props;
    const { highlightWord } = this.state;
    const count = eventDataset.length;
    const timeRange = count > 0 ?
      `${eventDataset[0][0]} ~ ${eventDataset[count - 1][0]}` : '';

    return (
      <div className={`log-event-group ${className}`} {...props}>
        <InlineEditInput
          className="title"
          value={title}
          onChange={this.handleTitleChanged}
        />
        <div style={{ fontSize: 13 }}>
          <span className="label" style={{ paddingRight: '1em' }}>Time Range: </span>
          <span>{timeRange}</span>
          <span style={{ float: 'right' }}>{count}</span>
          <span
            className="label"
            style={{ float: 'right', marginRight: '1em' }}
          >Number of Events: </span>
        </div>
        {Array.isArray(episodes) && episodes.length > 0 &&
          <div>
            <span className="label" style={{ paddingRight: '1em' }}>
              Top frequent episodes:
            </span>
            <div style={{ display: 'inline-block' }} >
              {
                episodes.map(kw => (
                  <span
                    key={kw}
                    className={`keyword ${kw === highlightWord ? 'highlight' : ''}`}
                    onClick={this.handleKeywordClick(kw)}
                  >{kw}</span>
                ))
              }
            </div>
          </div>
        }
        {Array.isArray(keywords) && keywords.length > 0 &&
          <div>
            <span className="label">Top keywords: </span>
            <div style={{ display: 'inline-block' }} >
              {
                keywords.map(kw => (
                  <span
                    key={kw}
                    className={`keyword ${kw === highlightWord ? 'highlight' : ''}`}
                    onClick={this.handleKeywordClick(kw)}
                  >{kw}</span>
                ))
              }
            </div>
          </div>
        }
        <div className="spacer" />
        <EventTable
          className="flex-item"
          highlightWord={highlightWord} eventDataset={eventDataset}
        />
      </div>
    );
  }
}

export default EventGroup;
