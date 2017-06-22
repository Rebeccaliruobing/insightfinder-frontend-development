import React from 'react';
import cx from 'classnames';
import $ from 'jquery';
import { autobind } from 'core-decorators';
import get from 'lodash/get';
import store from 'store';
import moment from 'moment';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';
import { Box, Tile, Heatmap } from '../../../src/lib/fui/react';
import getEndpoint from '../../../apis/get-endpoint';

type Props = {
  projectName: string,
  instanceGroup: string,
  model: Object,
  big: bool,
  picked: bool,
  pickProjectModel: Function,
  removeProjectModel: Function,
  selectProjectModel: Function,
};

class ModelTile extends React.PureComponent {
  props: Props;

  static defaultProps = {
    big: false,
    pickProjectModel: () => { },
    removeProjectModel: () => { },
    picked: false,
  }

  constructor(props) {
    super(props);

    this.model = null;
    this.normalizedDataset = null;
  }

  @autobind
  normalizeHeatmapDataset() {
    const { model } = this.props;
    if (model !== this.model) {
      this.model = model;
      const dataset = get(model, 'mapData[0].NASValues', []);
      // The value is like: 0,638.66
      this.normalizedDataset = dataset.map(d => parseFloat(d.split(',')[1]));
    }

    return this.normalizedDataset;
  }

  @autobind
  handleModelPicked(e) {
    e.preventDefault();
    e.stopPropagation();

    const { model, projectName, instanceGroup } = this.props;
    this.props.pickProjectModel(projectName, instanceGroup, model.modelKey);
  }

  @autobind
  handleModelSelected(e) {
    e.preventDefault();
    e.stopPropagation();

    const { model, projectName, instanceGroup } = this.props;
    this.props.selectProjectModel(projectName, instanceGroup, model.modelKey);
  }

  @autobind
  handleModelRemove(e) {
    e.preventDefault();
    e.stopPropagation();

    const { model, projectName, instanceGroup } = this.props;
    const { startTimestamp } = model;
    const startTime = moment(startTimestamp).format('MM/DD HH:mm');
    if (window.confirm(`Are you sure to remove model ${startTime}`)) {
      this.props.removeProjectModel(projectName, instanceGroup, model.modelKey);
    }
  }

  render() {
    const { model, big, picked, projectName, instanceGroup } = this.props;
    const count = 32;
    const size = count * (big ? 6 : 5);
    const dataset = this.normalizeHeatmapDataset();
    const { startTimestamp, endTimestamp,
      pickableFlag: pickable, sampleCount,
      metricNameList, maxValues, minValues, modelKey } = model;
    let { fileUrl } = model;
    const startTime = moment(startTimestamp).format('MM/DD HH:mm');
    const endTime = moment(endTimestamp).format('MM/DD HH:mm');
    const metric = (metricNameList || '[]').slice(1, -1).split(',');
    const maxs = JSON.parse(maxValues || '[]');
    const mins = JSON.parse(minValues || '[]');

    const modelKeyObj = {
      startTimestamp, endTimestamp, modelKey,
    };
    const userName = store.get('userName');
    const token = store.get('token');
    const param = $.param({
      projectName, instanceGroup,
      userName, token,
      modelKeyObj: JSON.stringify(modelKeyObj),
      operation: 'download',
    });

    fileUrl = `${getEndpoint('modelPicking')}?${param}`;

    return (
      <Tile className={cx('model-tile', { big, picked })}>
        <Box isLink={!big} onClick={this.handleModelSelected}>
          <Heatmap dataset={dataset} countPerRow={count} style={{ width: size, height: size }} />
          <div className="meta">
            <div>{`${startTime} - ${endTime}`}</div>
            <div>{`Metric: ${metric.length}`}</div>
            <div>{`Samples: ${sampleCount}`}</div>
            {pickable && <i className="remove icon" onClick={this.handleModelRemove} />}
            {pickable &&
              <OverlayTrigger
                placement="top" delayShow={300}
                overlay={<Tooltip>Download</Tooltip>}
              >
                <a className="download" href={fileUrl} target="_blank" rel="noopener noreferrer">
                  <i className="download icon" />
                </a>
              </OverlayTrigger>
            }
            {pickable &&
              <OverlayTrigger
                placement="top" delayShow={300}
                overlay={<Tooltip>Pick</Tooltip>}
              >
                <i className="check icon" onClick={this.handleModelPicked} />
              </OverlayTrigger>
            }
          </div>
          {big &&
            <table className="ui compact table">
              <thead>
                <tr style={{ display: 'inline-table', width: '100%' }}>
                  <th>Metric</th>
                  <th style={{ width: 60 }}>Max</th>
                  <th style={{ width: 60 }}>Min</th>
                </tr>
              </thead>
              <tbody style={{ width: '100%', height: 200, overflowY: 'auto', display: 'block' }}>
                {metric.map((val, idx) => (
                  <tr key={val}>
                    <td className="name">{val}</td>
                    <td style={{ width: 60 }}>{maxs[idx].toFixed(2)}</td>
                    <td style={{ width: 60 }}>{mins[idx].toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </Box>
      </Tile>
    );
  }
}

export default ModelTile;
