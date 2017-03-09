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
};

class ModelTile extends React.Component {
  props: Props;

  static defaultProps = {
    big: false,
    pickProjectModel: () => { },
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
  handleTilePicked() {
    const { model, projectName } = this.props;
    this.props.pickProjectModel(projectName, model.modelKey);
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
        <Box
          isLink={!big}
          {...pickable ? { onClick: this.handleTilePicked } : {}}
        >
          <Heatmap dataset={dataset} countPerRow={count} style={{ width: size, height: size }} />
          <div className="meta">
            <div>{`${startTime}-${endTime}`}</div>
            {pickable && <i className="check circle outline icon" onClick={this.handleTilePicked} />}
          </div>
        </Box>
      </Tile>
    );
  }
}

export default ModelTile;
