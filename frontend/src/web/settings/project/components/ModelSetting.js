/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import moment from 'moment';
import R from 'ramda';
import { get } from 'lodash';
import { autobind } from 'core-decorators';

import { Container, Tile, Table, Column, AutoSizer } from '../../../../lib/fui/react';
import ModelTile from './ModelSettingTile';
import { settingsMessages } from '../../../../common/settings/messages';

type Props = {
  intl: Object,
  credentials: Object,
  projectSettingsParams: Object,
  projectName: String,
  instanceGroup: String,
  data: Object,
  pickProjectModel: Function,
  removeProjectModel: Function,
};

class ModelSetting extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.stateKey = 'models';
    this.propsPath = ['data', this.stateKey];
    this.state = {
      selectedModelKey: '',
    };
  }

  @autobind handleModelSelect(key) {
    this.setState({
      selectedModelKey: key,
    });
  }

  @autobind handleModelPick(modelKey) {
    // projectSettingsParams is used for reload
    const { projectName, instanceGroup, pickProjectModel, projectSettingsParams } = this.props;
    pickProjectModel(projectName, instanceGroup, modelKey, projectSettingsParams);
  }

  @autobind handleModelRemove(modelKey) {
    // projectSettingsParams is used for reload
    const { projectName, instanceGroup, removeProjectModel, projectSettingsParams } = this.props;
    removeProjectModel(projectName, instanceGroup, modelKey, projectSettingsParams);
  }

  render() {
    const { intl, credentials, projectName, instanceGroup } = this.props;
    const models = get(this.props.data, this.stateKey, []);
    const isEmpty = models.length === 0;
    const hasError = isEmpty;

    // Get the select model to show on the left side, if no selection, get the first picked model
    // or the first model.
    let { selectedModelKey } = this.state;
    let selectedModel = null;
    let selectionIsPicked = false;
    if (!isEmpty) {
      selectedModel = R.find(m => m.modelKey === selectedModelKey, models);
      if (!selectedModel) {
        selectedModel = R.find(m => m.picked, models) || models[0];
      }
      selectedModelKey = selectedModel.modelKey;
      selectionIsPicked = selectedModel.picked;
    }

    return (
      <Container fullHeight className="overflow-y-auto flex-row model-settings">
        {hasError &&
          <Container fullHeight style={{ width: '100%', fontSize: 12 }}>
            <div
              className="ui error message"
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(settingsMessages.errorNoProjectModel, { projectName }),
              }}
            />
          </Container>}
        {!hasError &&
          <Container className="flex-col" style={{ width: 420, padding: '0 1em' }}>
            <div style={{ paddingBottom: '1em', fontSize: 12 }}>
              <h4 style={{ paddingBottom: 0 }}>Model Details:</h4>
              {selectionIsPicked &&
                <div>
                  {`You picked model ${moment(selectedModel.startTimestamp).format('MM/DD HH:mm')}-
              ${moment(selectedModel.endTimestamp).format('MM/DD HH:mm')}
              to be used ${selectedModel.pickedExpiry ? `till ${moment(selectedModel.pickedExpiry).format('MM/DD HH:mm')}` : 'for the next 24 hours'}.`}
                </div>}
              <ModelTile
                style={{ marginTop: '0.5em' }}
                big
                key={`selected_${selectedModelKey}`}
                model={selectedModel}
              />
            </div>
            <Container className="flex-grow">
              <AutoSizer>
                {({ width, height }) => (
                  <Table
                    className="with-border"
                    width={width}
                    height={height}
                    headerHeight={28}
                    rowHeight={50}
                    rowCount={selectedModel.metrics.length}
                    rowGetter={({ index }) => selectedModel.metrics[index]}
                  >
                    <Column
                      width={260}
                      className="no-wrap"
                      flexGrow={1}
                      label="Metric"
                      dataKey="name"
                    />
                    <Column width={80} label="Max" dataKey="max" />
                    <Column width={80} label="Min" dataKey="min" />
                  </Table>
                )}
              </AutoSizer>
            </Container>
          </Container>}
        {!hasError &&
          <Container className="flex-grow flex-col">
            <div style={{ fontSize: 12 }}>
              <i className="icon circle info" />
              <span>
                Each heat map models the behavior of one instance. Red areas represent frequent behaviors
                (i.e. normal states) and the size of the red areas indicates the ranges of different metric
                values.
              </span>
            </div>
            <Container fullHeight className="flex-grow overflow-y-auto">
              <Tile isParent isFluid style={{ padding: 0 }}>
                {models.map(m => (
                  <ModelTile
                    key={m.modelKey}
                    model={m}
                    credentials={credentials}
                    projectName={projectName}
                    instanceGroup={instanceGroup}
                    onModelSelect={this.handleModelSelect}
                    onModelRemove={this.handleModelRemove}
                    onModelPick={this.handleModelPick}
                  />
                ))}
              </Tile>
            </Container>
          </Container>}
      </Container>
    );
  }
}

export default ModelSetting;
