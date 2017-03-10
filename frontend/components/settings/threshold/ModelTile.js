import React from 'react';
import cx from 'classnames';
import { autobind } from 'core-decorators';
import get from 'lodash/get';
import moment from 'moment';
import { Box, Tile, Heatmap } from '../../../src/lib/fui/react';

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
    const size = count * (big ? 6 : 4);
    const dataset = this.normalizeHeatmapDataset();
    const { startTimestamp, endTimestamp, userPickableFlag: pickable } = model;
    const startTime = moment(startTimestamp).format('YYYY/M/D');
    const endTime = moment(endTimestamp).format('YYYY/M/D');

    return (
      <Tile className={cx('model-tile', { big, picked })}>
        <Box isLink={!big}>
          <Heatmap dataset={dataset} countPerRow={count} style={{ width: size, height: size }} />
          <div className="meta">
            <div>{`${startTime}-${endTime}`}</div>
            {pickable && <i className="remove icon" onClick={this.handleModelRemove} />}
            {pickable && <i className="check circle outline icon" onClick={this.handleModelPicked} />}
          </div>
        </Box>
      </Tile>
    );
  }
}

export default ModelTile;
