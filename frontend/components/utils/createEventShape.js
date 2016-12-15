import React from 'react';
import { EventTypes } from './getEventType';

/*
 * Create an svg sharp based on the event type.
 */
const createEventShape = (type, index, color, size = 5, height = 26) => {

  const cx = (index * size * 2) + size;
  const cy = height / 2;

  if (type === EventTypes.Network) {
    return (
      <rect
        key={index} fill={`rgb(${color})`}
        x={cx - size} y={cy - (size * 0.6)} width={size * 1.9} height={size * 1.2}
      />
    );
  }

  if (type === EventTypes.Disk) {
    return (
      <rect
        key={index} fill={`rgb(${color})`}
        x={cx - (size * 0.6)} y={cy - size} width={size * 1.2} height={size * 2}
      />
    );
  }

  if (type === EventTypes.Workload) {
    return (
      <polygon
        key={index} fill={`rgb(${color})`}
        points={`${cx},${cy - 7} ${cx - 5},${cy + 4} ${cx + 5},${cy + 4}`}
      />
    );
  }
  if (type === EventTypes.NewInstance) {
    return (
      <circle
        key={index} fill={`rgb(${color})`}
        cx={cx} cy={cy} r={size * 0.95}
      />
    );
  }
  if (type === EventTypes.InstanceDown) {
    return (
      <polygon
        key={index} fill={`rgb(${color})`}
        points={`${cx - 5},${cy - 4} ${cx + 5},${cy - 4} ${cx},${cy + 7}`}
      />
    );
  }

  if (type === EventTypes.HighCPU) {
    return (
      <polygon
        key={index} fill={`rgb(${color})`}
        points={`${cx},${cy - 6} ${cx + 6},${cy} ${cx},${cy + 6} ${cx - 6},${cy}`}
      />
    );
  }
  return (
    <circle
      key={index} fill={`rgb(${color})`}
      cx={cx} cy={cy} r={size * 0.95}
    />
  );
};

export default createEventShape;
