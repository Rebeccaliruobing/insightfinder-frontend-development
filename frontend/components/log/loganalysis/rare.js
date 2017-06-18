import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import R from 'ramda';
import moment from 'moment';
import EventGroup from './event-group';
import { DataChart } from '../../share/charts';

class EventRare extends React.Component {
  static propTypes = {
    eventDataset: T.array,
    startTime: T.object.isRequired,
    endTime: T.object.isRequired,
    frequency: T.number.isRequired,
  }

  static defaultProps = {
    eventDataset: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedBucket: null,
    };

    this.barData = { sdata: [], sname: ['Datetime', 'Events Count'] };
    this.buckets = {};
    this.buildEventBuckets(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eventDataset !== this.props.eventDataset) {
      this.buildEventBuckets(nextProps);
    }
  }

  @autobind
  buildEventBuckets(props) {
    const { eventDataset, frequency } = props;
    const startTimeVal = moment(props.startTime).valueOf();
    const endTimeVal = moment(props.endTime).valueOf();

    const size = Math.ceil((endTimeVal - startTimeVal) / frequency);
    const sdata = _.range(size).map(
      i => [
        new Date(startTimeVal + (i * frequency)),
        0,
      ],
    );

    const buckets = {};
    eventDataset.forEach((e) => {
      const etimeVal = moment(e.timestamp).valueOf();
      const idx = Math.floor((etimeVal - startTimeVal) / frequency);
      if (idx >= 0) {
        const time = sdata[idx][0].valueOf().toString();
        sdata[idx][1] += 1;

        if (!buckets[time]) {
          buckets[time] = {
            name: '',
            events: [],
            nEvents: 0,
            keywords: [],
            episodes: [],
          };
        }

        const bucket = buckets[time];
        bucket.events.push({
          datetime: e.timestamp,
          timestamp: etimeVal,
          rawData: e.rawData,
        });
        bucket.keywords = bucket.keywords.concat(e.keywords);
        bucket.episodes = bucket.episodes.concat(e.episodes);
        bucket.nEvents = bucket.events.length;
      }
    });

    // merge the keywords and episodes
    this.barData.sdata = sdata;
    this.buckets = buckets;
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
          showFE={false}
        />
      );
    }
    return null;
  }

  @autobind
  handleBucketPointClick(startTs) {
    const bucket = this.buckets[startTs];
    if (bucket) {
      this.setState({
        selectedBucket: bucket,
      });
    }
  }

  render() {
    const { eventDataset } = this.props;
    const { selectedBucket } = this.state;
    const eventCount = eventDataset.length;
    const barData = this.barData;

    return (
      <div className="flex-item flex-col-container" style={{ paddingBottom: 6 }}>
        <h4 className="ui header">{`Total Rare Events: ${eventCount}`}</h4>
        <DataChart
          chartType="bar"
          data={barData}
          annotations={[]}
          onClick={this.handleBucketPointClick}
        />
        {this.renderBucket(selectedBucket)}
      </div>
    );
  }
}

export default EventRare;
