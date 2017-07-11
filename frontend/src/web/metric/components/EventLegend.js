/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { EventTypes, createEventShape } from '../../../../components/utils';

const EventLegend = () =>
  <div className="list-legend">
    <div className="block">
      <svg width={16} height={20}>
        {createEventShape(EventTypes.HighCPU)}
      </svg>
      <span className="title">CPU Surge</span>
    </div>
    <div className="block" style={{ width: 140 }}>
      <svg width={16} height={20}>
        {createEventShape(EventTypes.Network)}
      </svg>
      <span className="title">Network Congestion</span>
    </div>
    <div className="block" style={{ width: 120 }}>
      <svg width={16} height={20}>
        {createEventShape(EventTypes.Disk)}
      </svg>
      <span className="title">Disk Contention</span>
    </div>
    <div className="block" style={{ width: 140 }}>
      <svg width={16} height={20}>
        {createEventShape(EventTypes.Workload)}
      </svg>
      <span className="title">Workload Increase</span>
    </div>
    <div className="block">
      <svg width={16} height={20}>
        {createEventShape(EventTypes.NewInstance, 0, '0,255,0')}
      </svg>
      <span className="title">New Instance</span>
    </div>
    <div className="block">
      <svg width={16} height={20}>
        {createEventShape(EventTypes.InstanceDown)}
      </svg>
      <span className="title">Instance Down</span>
    </div>
    <div className="block" style={{ width: 80 }}>
      <svg width={16} height={20}>
        {createEventShape(EventTypes.Others)}
      </svg>
      <span className="title">Others</span>
    </div>
  </div>;

export default EventLegend;
