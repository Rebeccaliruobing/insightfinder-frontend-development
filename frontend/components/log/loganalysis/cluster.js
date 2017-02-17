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
    this.barFullWidth = 200;
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
  handleSelectCluster(cluster) {
    return () => {
      this.setState({
        selectedCluster: cluster,
      });
    };
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
        <div className="flex-col-container log-event-group-listbar" style={{ paddingTop: 10 }}>
          <div className="header">
            <span className="name">{`${clusterCount} Clusters`}</span>
            <span className="stats">Total events</span>
            <span className="bar"><span className="title">{eventCount}</span></span>
          </div>
          <div className="flex-item" style={{ overflowY: 'auto' }}>
            {
              this.dataSorter(eventDataset).map((cluster) => {
                const nevents = cluster.nEvents;
                const width = Math.max(Math.floor((nevents / eventCount) * this.barFullWidth), 1);
                const active = selectedCluster ? cluster.nid === selectedCluster.nid : false;

                return (
                  <div
                    className={`listbar-item ${active ? 'active' : ''}`} key={cluster.nid}
                    onClick={this.handleSelectCluster(cluster)}
                  >
                    <div className="name">{this.getPatternName(cluster.nid)}</div>
                    <div className="bar" style={{ width }} />
                    <span className="title">{`${nevents}`}</span>
                  </div>
                );
              })
            }
          </div>
        </div>
        {this.renderCluster(selectedCluster)}
      </div>
    );
  }
}

export default EventCluster;