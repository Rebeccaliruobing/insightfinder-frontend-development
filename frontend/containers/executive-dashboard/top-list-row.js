import React, { PropTypes as T } from 'react';
import _ from 'lodash';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';

const normalizeValue = (val, fractionDigits = 0, needTotal = true) => {
  const className = needTotal ? 'total' : '';
  if (_.isFinite(val)) {
    if (val > 0) {
      if (val < 0.5 && fractionDigits === 2) {
        fractionDigits = 2;
      } else if (val < 5 && fractionDigits === 2) {
        fractionDigits = 1;
      } else if (fractionDigits === 2) {
        fractionDigits = 0;
      }
      return (<span className={className}><b>{val.toFixed(fractionDigits).toString()}</b></span>);
    }
    fractionDigits = 0;
    return (<span className={className}>{val.toFixed(fractionDigits).toString()}</span>);
  }
  return <span className={className}>-</span>;
};

const getArrowStyles = (left, right, reverseColor = false, reverseDirection = false) => {
  const up = {
    transform: 'rotate(-25deg)',
    color: 'red',
  };
  const down = {
    transform: 'rotate(25deg)',
    color: 'green',
  };
  const flat = {
    color: 'green',
  };
  if (reverseColor) {
    up.color = 'green';
    down.color = 'red';
  }

  if (left !== undefined && right !== undefined) {
    if (left > right) {
      return !reverseDirection ? down : up;
    } else if (left < right) {
      return !reverseDirection ? up : down;
    } else if (left === right) {
      return flat;
      // return { visibility: 'hidden' };
    }
  }
  return { visibility: 'hidden' };
};


const ListRow = ({
  name, data, onRowClick, onNameClick,
  type, isProject = false, expanded = true }) => {
  const { stats, color } = data;
  const projectStyle = isProject ? { fontWeight: 'bold' } : {};
  return (
    <tr
      style={{
        borderLeft: `2px solid rgb(${color})`,
      }}
      className={isProject ? 'project' : 'group'}
      onClick={onRowClick}
    >
      <td className="name">
        {isProject && expanded && <i className="angle down icon" />}
        {isProject && !expanded && <i className="angle right icon" />}
        {!isProject &&
          <OverlayTrigger placement="right" delayShow={300} overlay={<Tooltip>Click for details</Tooltip>}>
            <i onClick={onNameClick} className="link external icon" />
          </OverlayTrigger>
        }
        {!isProject && <i className="icon" />}
        <OverlayTrigger placement="top" delayShow={300} overlay={<Tooltip>{name}</Tooltip>}>
          <span className="name" style={projectStyle}>{name}</span>
        </OverlayTrigger>
      </td>

      {type === 'anomaly' &&
        <td className="number">{normalizeValue(_.get(stats, 'previous.avgDailyAnomalyScore'), 2)}</td>
      }
      {type === 'anomaly' && <td className="number current">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'previous.avgDailyAnomalyScore'),
              _.get(stats, 'current.avgDailyAnomalyScore'),
            )}
          />
          {normalizeValue(_.get(stats, 'current.avgDailyAnomalyScore'), 2, false)}
        </div>
      </td>}
      {type === 'anomaly' && <td className="number predicted">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'current.avgDailyAnomalyScore'),
              _.get(stats, 'predicted.avgDailyAnomalyScore'),
            )}
          />
          {normalizeValue(_.get(stats, 'predicted.avgDailyAnomalyScore'), 2)}
        </div>
      </td>}

      {type === 'anomaly' &&
        <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyDuration'))}</td>
      }
      {type === 'anomaly' && <td className="number current">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'previous.totalAnomalyDuration'),
              _.get(stats, 'current.totalAnomalyDuration'),
            )}
          />
          {normalizeValue(_.get(stats, 'current.totalAnomalyDuration'), false)}
        </div>
      </td>}
      {type == 'anomaly' && <td className="number predicted">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'current.totalAnomalyDuration'),
              _.get(stats, 'predicted.totalAnomalyDuration'),
            )}
          />
          {normalizeValue(_.get(stats, 'predicted.totalAnomalyDuration'))}
        </div>
      </td>}

      {type === 'anomaly' &&
        <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyEventCount'))}
        </td>}
      {type === 'anomaly' && <td className="number current">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'previous.totalAnomalyEventCount'),
              _.get(stats, 'current.totalAnomalyEventCount'),
            )}
          />
          {normalizeValue(_.get(stats, 'current.totalAnomalyEventCount'), false)}
        </div>
      </td>}
      {type === 'anomaly' && <td className="number predicted">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'current.totalAnomalyEventCount'),
              _.get(stats, 'predicted.totalAnomalyEventCount'),
            )}
          />
          {normalizeValue(_.get(stats, 'predicted.totalAnomalyEventCount'))}
        </div>
      </td>}

      {type === 'resource' &&
        <td className="number">{normalizeValue(_.get(stats, 'previous.AvgCPUUtilization'), 1)}</td>
      }
      {type === 'resource' && <td className="number current">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'previous.AvgCPUUtilization'),
              _.get(stats, 'current.AvgCPUUtilization'),
              true,
            )}
          />
          {normalizeValue(_.get(stats, 'current.AvgCPUUtilization'), 1, false)}
        </div>
      </td>}
      {type === 'resource' && <td className="number predicted">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'current.AvgCPUUtilization'),
              _.get(stats, 'predicted.AvgCPUUtilization'),
              true,
            )}
          />
          {normalizeValue(_.get(stats, 'predicted.AvgCPUUtilization'), 1)}
        </div>
      </td>}

      {type === 'resource' &&
        <td className="number">{normalizeValue(_.get(stats, 'previous.AvgInstanceUptime') * 100, 1)}</td>
      }
      {type === 'resource' && <td className="number current">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'previous.AvgInstanceUptime'),
              _.get(stats, 'current.AvgInstanceUptime'),
              true,
            )}
          />
          {normalizeValue(_.get(stats, 'current.AvgInstanceUptime') * 100, 1, false)}
        </div>
      </td>}
      {type === 'resource' && <td className="number predicted">
        <div>
          <i
            className="long arrow right icon"
            style={getArrowStyles(
              _.get(stats, 'current.AvgInstanceUptime'),
              _.get(stats, 'predicted.AvgInstanceUptime'),
              true,
            )}
          />
          {normalizeValue(_.get(stats, 'predicted.AvgInstanceUptime') * 100, 1)}
        </div>
      </td>}
    </tr>
  );
};

ListRow.propTypes = {
  name: T.string,
  type: T.string,
  data: T.object,
  expanded: T.bool,
  isProject: T.bool,
  onRowClick: T.func,
  onNameClick: T.func,
};

export default ListRow;
