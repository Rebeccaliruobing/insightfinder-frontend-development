import React from 'react';
import cx from 'classnames';
import $ from 'jquery';
import { autobind } from 'core-decorators';
import store from 'store';
import moment from 'moment';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';

import { Box, Tile, Heatmap } from '../../../../lib/fui/react';
import getEndpoint from '../../../../common/apis/getEndpoint';
import { buildUrl } from '../../../../common/utils';

type Props = {
  className: string,
  projectName: string,
  credentials: Object,
  instanceGroup: string,
  model: Object,
  big: boolean,
  onModelSelect: Function,
  onModelPick: Function,
  onModelRemove: Function,
};

class ModelTile extends React.PureComponent {
  props: Props;

  @autobind handleModelSelect(e) {
    e.preventDefault();
    e.stopPropagation();

    const { model } = this.props;
    this.props.onModelSelect(model.modelKey);
  }

  @autobind handleModelRemove(e) {
    e.preventDefault();
    e.stopPropagation();

    const { model } = this.props;
    const { startTimestamp } = model;
    const startTime = moment(startTimestamp).format('MM/DD HH:mm');
    if (window.confirm(`Are you sure to remove model ${startTime}`)) {
      this.props.onModelRemove(model.modelKey);
    }
  }

  @autobind handleModelPick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { model } = this.props;
    this.props.onModelPick(model.modelKey);
  }

  render() {
    const { credentials, model, big, projectName, instanceGroup, className } = this.props;
    const count = 32;
    const size = count * (big ? 6 : 5);
    const { startTimestamp, endTimestamp, picked, sampleCount, modelKey, metrics, heatmap } = model;
    const startTime = moment(startTimestamp).format('MM/DD HH:mm');
    const endTime = moment(endTimestamp).format('MM/DD HH:mm');
    let pickable = model.pickable;

    let fileUrl = null;
    if (!big) {
      const modelKeyObj = { startTimestamp, endTimestamp, modelKey };
      const { userName, token } = credentials;
      const params = {
        projectName,
        instanceGroup,
        userName,
        token,
        modelKeyObj: JSON.stringify(modelKeyObj),
        operation: 'download',
      };
      fileUrl = buildUrl(getEndpoint('modelPicking'), {}, params);
    } else {
      pickable = false;
    }

    return (
      <Tile className={cx('model-tile', { big, picked }, className)}>
        <Box isLink={!big} onClick={this.handleModelSelect}>
          <Heatmap dataset={heatmap} countPerRow={count} style={{ width: size, height: size }} />
          <div className="meta">
            <div>{`${startTime} - ${endTime}`}</div>
            <div>{`Metric: ${metrics.length}`}</div>
            <div>{`Samples: ${sampleCount}`}</div>
            {pickable && <i className="remove icon" onClick={this.handleModelRemove} />}
            {pickable &&
              <OverlayTrigger placement="top" delayShow={300} overlay={<Tooltip>Download</Tooltip>}>
                <a className="download" href={fileUrl} target="_blank" rel="noopener noreferrer">
                  <i className="download icon" />
                </a>
              </OverlayTrigger>}
            {pickable &&
              <OverlayTrigger placement="top" delayShow={300} overlay={<Tooltip>Pick</Tooltip>}>
                <i className="check icon" onClick={this.handleModelPick} />
              </OverlayTrigger>}
          </div>
        </Box>
      </Tile>
    );
  }
}

export default ModelTile;
