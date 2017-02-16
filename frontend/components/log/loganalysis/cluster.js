import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import R from 'ramda';
import EventGroup from './event-group';
import { InlineEditInput } from '../../ui/inlineedit';

class EventCluster extends React.Component {
  static propTypes = {
    eventDataset: T.array,
    eventCount: T.number.isRequired,
    clusterCount: T.number.isRequired,
  }

  static defaultProps = {
    eventDataset: [],
    eventCount: null,
    clusterCount: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCluster: null,
      patternNames: {},
    };

    this.dataSorter = R.sortWith([
      R.descend(R.prop('nEvents')),
      R.ascend(R.prop('nid')),
    ]);
  }

  componentDidMount() {
    this.autoselectCluster(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eventDataset !== this.props.eventDataset) {
      this.autoselectCluster(nextProps);
    }
  }

  @autobind
  autoselectCluster(props) {
    const { eventDataset } = props;
    if (Array.isArray(eventDataset) && eventDataset.length > 0) {
      this.setState({
        selectedCluster: this.dataSorter(eventDataset)[0],
      });
    }
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

  @autobind
  handleSelectCluster() {
  }

  @autobind
  renderCluster(cluster) {
    if (cluster) {
      const data = cluster.data;
      const title = this.getPatternName(cluster.nid);

      // Convert the string format into an array.
      // TODO: Remove the convertor when api result is json object.
      const keywords = (cluster.topKWords && cluster.topKWords.length > 0) ?
        cluster.topKWords.replace(/\(\d+\)/g, '').replace(/'/g, '').split(',') : [];
      const episodes = (cluster.topKEpisodes && cluster.topKEpisodes.length > 0) ?
        cluster.topKEpisodes.replace(/\(\d+\)/g, '').replace(/'/g, '').split(',') : [];

      return (
        <EventGroup
          className="flex-item flex-col-container" title={title}
          eventDataset={data} keywords={keywords} episodes={episodes}
        />
      );
    }
    return null;
  }

  render() {
    const { eventDataset, eventCount, clusterCount } = this.props;
    const { selectedCluster } = this.state;

    return (
      <div className="flex-item flex-row-container" style={{ paddingBottom: 10 }}>
        <div className="flex-col-container">
          <h4
            style={{
              width: '100%',
              lineHeight: 24,
              borderBottom: '1px solid red',
              margin: 'auto',
            }}
          >Pattern List</h4>
          <div className="flex-item" style={{ overflowY: 'auto' }}>
            <div style={{ height: 1000 }} />
          </div>
        </div>
        {this.renderCluster(selectedCluster)}
      </div>
    );
  }
}

export default EventCluster;
