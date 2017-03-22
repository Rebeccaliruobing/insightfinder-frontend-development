import React from 'react';
import cx from 'classnames';
import { autobind } from 'core-decorators';
import get from 'lodash/get';
import moment from 'moment';
import { Box, Tile, Heatmap } from '../../../src/lib/fui/react';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';

type Props = {
  projectName: string,
  model: Object,
  big: bool,
  picked: bool,
  pickProjectModel: Function,
  removeProjectModel: Function,
};

class ModelTile extends React.Component {
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

    const { model, projectName } = this.props;
    this.props.pickProjectModel(projectName, model.modelKey);
  }

  @autobind
  handleModelRemove(e) {
    e.preventDefault();
    e.stopPropagation();

    const { model, projectName } = this.props;
    const { startTimestamp } = model;
    const startTime = moment(startTimestamp).format('YYYY/M/D');
    if (window.confirm(`Are you sure to remove model ${startTime}`)) {
      this.props.removeProjectModel(projectName, model.modelKey);
    }
  }

  render() {
    const { model, big, picked } = this.props;
    const count = 32;
    const size = count * (big ? 5 : 4);
    const dataset = this.normalizeHeatmapDataset();
    const { startTimestamp, endTimestamp,
      userPickableFlag: pickable, sampleCount,
      metricNameList, maxValues, minValues } = model;
    let { fileUrl } = model;
    const startTime = moment(startTimestamp).format('YYYY/M/D');
    const endTime = moment(endTimestamp).format('YYYY/M/D');
    const metric = (metricNameList || '[]').slice(1, -1).split(',');
    const maxs = JSON.parse(maxValues || '[]');
    const mins = JSON.parse(minValues || '[]');

    fileUrl = 'https://insightfinder.com/wp-content/uploads/2016/01/iStock_000021981766_s-reduced.jpg?3f50eb';
    fileUrl += `&t=${moment().valueOf()}`;

    return (
      <Tile className={cx('model-tile', { big, picked })}>
        <Box isLink={!big}>
          <Heatmap dataset={dataset} countPerRow={count} style={{ width: size, height: size }} />
          <div className="meta">
            <div>{`${startTime}-${endTime}`}</div>
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
                  <th style={{ width: 230 }}>Metric</th>
                  <th style={{ width: 60 }}>Max</th>
                  <th>Min</th>
                </tr>
              </thead>
              <tbody style={{ width: '100%', height: 200, overflowY: 'auto', display: 'block' }}>
                {metric.map((val, idx) => (
                  <tr key={val}>
                    <td>{val}</td>
                    <td>{maxs[idx].toFixed(2)}</td>
                    <td>{mins[idx].toFixed(2)}</td>
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
