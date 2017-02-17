import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import R from 'ramda';
import moment from 'moment';
import EventGroup from './event-group';

class EventRare extends React.Component {
  static propTypes = {
    eventDataset: T.array,
    startTime: T.object.isRequired,
    endTime: T.object.isRequired,
  }

  static defaultProps = {
    eventDataset: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedBucket: null,
    };

    this.barFullWidth = 200;
    this.buckets = [];
    this.buildEventBuckets(props);
  }

  componentDidMount() {
    this.autoselectBucket(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eventDataset !== this.props.eventDataset) {
      this.buildEventBuckets(nextProps);
      this.autoselectBucket(nextProps);
    }
  }

  @autobind
  buildEventBuckets(props) {
    const { eventDataset } = props;
    const startTime = moment(props.startTime).startOf('day');
    const endTime = moment(props.endTime).endOf('day');
    const sortByTs = R.sortWith([R.descend(R.prop('timestamp'))]);
    const diffDays = endTime.diff(startTime, 'days');
    // Split the events based on the time and range
    const groupByMonth = R.groupBy((e) => {
      const etime = moment(e.timestamp);
      if (diffDays <= 7) {
        return etime.format('YYYY M-D');
      } else if (diffDays <= 365) {
        return etime.format('YYYY MMM');
      }
      // Bucket over year's event by years
      if (endTime.diff(etime, 'days') <= 365) {
        return etime.format('YYYY MMM');
      }
      return etime.format('YYYY');
    });
    const buckets = [];
    R.forEachObjIndexed((events, key) => {
      buckets.push({
        name: key,
        keywords: R.reduce((a, b) => a.concat(b.keywords), [], events),
        episodes: R.reduce((a, b) => a.concat(b.episodes), [], events),
        nEvents: events.length,
        events,
      });
    }, groupByMonth(sortByTs(eventDataset)));
    this.buckets = buckets;
  }

  @autobind
  autoselectBucket() {
    const buckets = this.buckets;
    if (buckets.length > 0) {
      this.setState({
        selectedBucket: buckets[0],
      });
    } else {
      this.setState({
        selectedBucket: null,
      });
    }
  }

  @autobind
  handleSelectBucket(bucket) {
    return () => {
      this.setState({
        selectedBucket: bucket,
      });
    };
  }

  @autobind
  renderBucket(bucket) {
    if (bucket) {
      const { events, name, keywords, episodes } = bucket;

      return (
        <EventGroup
          key={name}
          className="flex-item flex-col-container" name={name}
          eventDataset={events} keywords={keywords} episodes={episodes}
        />
      );
    }
    return null;
  }

  render() {
    const { eventDataset } = this.props;
    const { selectedBucket } = this.state;
    const eventCount = eventDataset.length;
    const buckets = this.buckets;

    return (
      <div className="flex-item flex-row-container" style={{ paddingBottom: 6 }}>
        <div className="flex-col-container log-event-group-listbar" style={{ paddingTop: 10 }}>
          <div className="header">
            <span className="name">Date</span>
            <span className="stats">Total Events</span>
            <span className="bar"><span className="title">{eventCount}</span></span>
          </div>
          <div className="flex-item" style={{ overflowY: 'auto' }}>
            {
              buckets.map((bucket) => {
                const nevents = bucket.nEvents;
                const wide = (nevents / eventCount) * 100 > 80;
                const width = Math.max(Math.floor((nevents / eventCount) * this.barFullWidth), 1);
                const active = selectedBucket ? bucket.name === selectedBucket.name : false;

                return (
                  <div
                    className={`listbar-item ${active ? 'active' : ''}`} key={bucket.name}
                    onClick={this.handleSelectBucket(bucket)}
                  >
                    <div className="name">{bucket.name}</div>
                    <div className="bar" style={{ width }} />
                    <span className={`${wide ? 'wide' : ''} title`}>{`${nevents}`}</span>
                  </div>
                );
              })
            }
          </div>
        </div>
        {this.renderBucket(selectedBucket)}
      </div>
    );
  }
}

export default EventRare;
