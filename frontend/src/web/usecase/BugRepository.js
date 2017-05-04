import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import qs from 'qs';
import { NavLink } from 'react-router-dom';
import R from 'ramda';
import { get } from 'lodash';
import { autobind } from 'core-decorators';
import { State } from '../../common/types';
import { Container, Select, Tile, Box, Table, Column, AutoSizer } from '../../lib/fui/react';
import { buildMatchLocation } from '../../common/utils';
import { appMenusMessages } from '../../common/app/messages';
import { loadBugRepository } from '../../common/usecase/actions';
import './usecase.scss';

type Props = {
  intl: Object,
  match: Object,
  location: Object,
  opensourceSystemNames: Array<string>,
  opensourceSystems: Object,
  customSystems: Object,
  loadBugRepository: Function,
  push: Function,
};

class BugRepositoryCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'opensource',
    };

    this.tileColors = ['#339999', '#1976d2', '#1ac986', '#2196f3', '#505077'];

    // TODO: How to localize the value
    this.anomalyThresholdTextMap = {
      0.99: 'Low',
      0.95: 'Medium Low',
      0.9: 'Medium',
      0.75: 'Medium High',
      0.5: 'High',
    };
  }

  componentDidMount() {
    this.props.loadBugRepository();
  }

  @autobind
  handleSelectTab(tab) {
    return () => {
      this.setState({
        currentTab: tab,
      });
    };
  }

  @autobind
  getSystemTileCour(system) {
    const { opensourceSystemNames } = this.props;
    const idx = R.findIndex(s => s === system, opensourceSystemNames);

    if (idx >= 0) {
      return this.tileColors[idx % 5];
    }

    return this.tileColors[4];
  }

  @autobind
  handleSystemTileClick(system) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Change the url address with the select system.
      const { push, match } = this.props;
      const location = buildMatchLocation(match, { system });
      push(location);
    };
  }

  @autobind
  handleSystemChange(newVal) {
    // Change the url address with the select system.
    const { push, match } = this.props;
    const location = buildMatchLocation(match, {
      system: get(newVal, 'value', null),
    });
    push(location);
  }

  @autobind
  handleSystemItemClick(item) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (item) {
        const {
          pvalue, cvalue, modelKey, modelName, modelType, projectName, fromUser,
          dataChunkName, metaData, modelStartTime, modelEndTime, latestDataTimestamp } = item;
        const bugId = metaData.name;
        window.open(`/useCaseDetails?${qs.stringify({
          pvalue, cvalue, modelKey, modelName,
          projectName, modelType, fromUser,
          dataChunkName, modelStartTime, modelEndTime, latestDataTimestamp, bugId,
        })}`, '_blank');
      }
    };
  }

  @autobind
  renderSystemTiles() {
    const { opensourceSystems, customSystems } = this.props;
    const { currentTab } = this.state;

    return (
      <Container fullHeight className="flex-col">
        <div className="ui pointing secondary menu" style={{ margin: 0 }}>
          <a
            className={`${currentTab === 'opensource' ? 'active' : ''} item`}
            onClick={this.handleSelectTab('opensource')}
          >Open Source Systems</a>
          <a
            className={`${currentTab === 'custom' ? 'active' : ''} item`}
            onClick={this.handleSelectTab('custom')}
          >Custom Systems</a>
        </div>
        <Container
          fullHeight className="overflow-y-auto"
          style={{ display: currentTab === 'opensource' ? 'block' : 'none' }}
        >
          <Tile isParent isFluid>
            {
              R.map(([name, items]) => (
                <Tile key={name} className="system" onClick={this.handleSystemTileClick(name)}>
                  <Box isLink style={{ backgroundColor: this.getSystemTileCour(name) }}>
                    <span>{name}</span>
                    <span className="ui orange label count">{items.length}</span>
                  </Box>
                </Tile>
              ), opensourceSystems)
            }
          </Tile>
        </Container>
        <Container
          fullHeight className="overflow-y-auto"
          style={{ display: currentTab === 'custom' ? 'block' : 'none' }}
        >
          <Tile isParent isFluid>
            {
              R.map(([name, items]) => (
                <Tile key={name} className="system" onClick={this.handleSystemTileClick(name)}>
                  <Box style={{ backgroundColor: this.getSystemTileCour(name) }}>
                    <span>{name}</span>
                    <span className="ui orange label count">{items.length}</span>
                  </Box>
                </Tile>
              ), customSystems)
            }
          </Tile>
        </Container>
      </Container>
    );
  }

  @autobind
  renderSelectedSystem(systemItems) {
    if (systemItems.length === 0) {
      return (
        <Container fullHeight>
          <div className="ui warning message" style={{ marginTop: 10 }}>
            No items available yet, Please check back later
            </div>
        </Container>
      );
    }

    // Get the selected item or choose the first item.
    const { selectedItemId } = this.state;
    let selectedItem = systemItems[0];
    if (selectedItemId) {
      selectedItem = R.find(i => i.dataChunkName === selectedItemId, systemItems)
        || systemItems[0];
    }

    const isHolistic = selectedItem.modelType === 'Holistic';

    return (
      <Container fullHeight className="flex-row bug-list">
        <Box className="item">
          <div className="content flex-col">
            <div>
              <div
                onClick={this.handleSystemItemClick(selectedItem)}
                className="ui orange button" style={{ float: 'right', width: 80 }}
              >Details</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div className="label">Incident name/Bug Id:</div>
              <div className="value">{selectedItem.metaData.name || ''}</div>
            </div>
            <div >
              <div className="label">Model Type:</div>
              <div className="value">{isHolistic ? 'IF Anomaly Detection' : 'Clustering (DBScan)'}</div>
            </div>
            {isHolistic &&
              <div >
                <div className="label">Anomaly Threshold</div>
                <div className="value">{this.anomalyThresholdTextMap[selectedItem.pvalue] || ''}</div>
              </div>
            }
            {!isHolistic &&
              <div >
                <div className="label">MinPts</div>
                <div className="value">{selectedItem.pvalue || ''}</div>
              </div>
            }
            {isHolistic &&
              <div >
                <div className="label">Duration Threshold (Sample Number):</div>
                <div className="value">{selectedItem.cvalue || ''}</div>
              </div>
            }
            {!isHolistic &&
              <div >
                <div className="label">Epsilon:</div>
                <div className="value">{selectedItem.cvalue || ''}</div>
              </div>
            }
            <div >
              <div className="label">Owner:</div>
              <div className="value">{selectedItem.fromUser || ''}</div>
            </div>
            <div >
              <div className="label">Sharing mode:</div>
              <div className="value">{selectedItem.ownerOnly ? 'private' : 'public'}</div>
            </div>
            <div >
              <div className="label">System:</div>
              <div className="value">{selectedItem.metaData.system || ''}</div>
            </div>
            <div >
              <div className="label">Incident Description:</div>
            </div>
            <div className="desc">
              <textarea readOnly value={selectedItem.metaData.desc || ''} />
            </div>
          </div>
        </Box>
        <Box className="list">
          <AutoSizer>
            {({ width, height }) => (
              <Table
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={32}
                rowCount={systemItems.length}
                onRowClick={({ rowData }) => {
                  this.setState({
                    selectedItemId: rowData.id,
                  });
                }}
                rowClassName={({ index }) => {
                  // Ignore header row.
                  if (index >= 0) {
                    const item = systemItems[index];
                    if (!selectedItemId && index === 0) {
                      return 'active';
                    }
                    if (item.dataChunkName === selectedItemId) {
                      return 'active';
                    }
                  }
                  return '';
                }}
                rowGetter={({ index }) => {
                  const item = systemItems[index];
                  return {
                    id: item.dataChunkName,
                    name: item.metaData.name,
                    owner: item.fromUser,
                    sharingModel: item.ownerOnly ? 'private' : 'public',
                    system: item.metaData.system,
                  };
                }}
              >
                <Column width={240} flexGrow={1} label="Incident name/Bug Id" dataKey="name" />
                <Column width={80} label="Owner" dataKey="owner" />
                <Column width={120} label="Sharing model" dataKey="sharingModel" />
                <Column width={120} label="System" dataKey="system" />
              </Table>
            )}
          </AutoSizer>
        </Box>
      </Container>
    );
  }

  render() {
    const { intl, match, opensourceSystems, customSystems } = this.props;
    const { system: selectedSystemName } = match.params;
    const rootUrl = buildMatchLocation(match, { system: undefined });
    // Merge the systems and sort by the count of items.
    const systems = R.sort((a, b) => b[1].length - a[1].length,
      R.concat(opensourceSystems, customSystems));

    let selectedSystemItems = [];
    if (selectedSystemName) {
      // [name, items] pair
      const finder = R.find(([name]) => name === selectedSystemName);
      selectedSystemItems = (finder(opensourceSystems) || finder(customSystems) || [])[1] || [];
    }

    return (
      <Container fullHeight withGutter className="flex-col bug-repository">
        <Container toolbar>
          <div className="section">
            {!selectedSystemName &&
              <span className="label">{intl.formatMessage(appMenusMessages.bugRepository)}</span>
            }
            {selectedSystemName &&
              <NavLink className="label" to={rootUrl}>
                {intl.formatMessage(appMenusMessages.bugRepository)}
              </NavLink>
            }
            {selectedSystemName && <span className="divider">/</span>}
            {selectedSystemName &&
              <Select
                name="system" inline style={{ width: 160 }}
                options={R.map(([name, items]) => (
                  { label: `${name} (${items.length})`, value: name }
                ), systems)}
                value={selectedSystemName || null} onChange={this.handleSystemChange}
              />
            }
          </div>
        </Container>
        {!selectedSystemName && this.renderSystemTiles()}
        {selectedSystemName && this.renderSelectedSystem(selectedSystemItems)}
      </Container>
    );
  }
}

const BugRepository = injectIntl(BugRepositoryCore);
export default connect(
  (state: State) => {
    const { bugRepository, opensourceSystemNames } = state.usecase;
    const sorter = R.sort((a, b) => b[1].length - a[1].length);
    const opensourceSystems = sorter(R.toPairs(bugRepository.openSource));
    const customSystems = sorter(R.toPairs(bugRepository.custom));
    return {
      opensourceSystemNames,
      opensourceSystems,
      customSystems,
    };
  },
  { push, loadBugRepository },
)(BugRepository);
