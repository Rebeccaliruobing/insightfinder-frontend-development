/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/*  @flow */
/* eslint-disable no-console */

// TODO: Change dashboard-uservalues => loadProjectsInfo => loadInitData

import { get } from 'lodash';
import R from 'ramda';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';
import fetchPost from './fetchPost';

const loadInitData = (
  credentials: Credentials,
) => {
  return fetchPost(
    getEndpoint('dashboard-uservalues'),
    {
      ...credentials,
      operation: 'display',
    },
  // return fetchGet(
  //   getEndpoint('loadProjectsInfo'), {
  //     ...credentials,
  //   },
  ).then((d) => {
    // The string is split by ',' for projects, and split by ':' for each parts.
    // The format is: projectName:projectType:instanceType:dataType.
    const sinfo = get(d.data, 'projectString', '');
    const infos = sinfo.split(',').filter(s => s.length !== 0);

    let projects = R.map((si) => {
      const parts = si.split(':');
      const projectName = parts.length >= 1 ? parts[0] : '';
      const projectType = parts.length >= 2 ? parts[1] : '';
      const instanceType = parts.length >= 3 ? parts[2] : '';
      const dataType = parts.length >= 4 ? parts[3] : '';

      // Use the name as the Id, which might be changed in the further.
      return {
        projectId: projectName,
        projectName, projectType, instanceType, dataType,
      };
    }, infos);

    // Ignore project without name and order by name.
    projects = R.filter((p) => {
      if (p.projectName.length === 0) {
        console.warn('Get project without name, ignore it.');
      }
      return (p.projectName.length !== 0);
    }, projects);

    projects = R.sort(
      (a, b) => a.projectName.localeCompare(b.projectName),
      projects,
    );

    // Set flags based on the project info
    projects = R.map((p) => {
      const { dataType, instanceType } = p;
      // Streaming log analysis project
      const isLogStreaming = dataType.toLowerCase() === 'log' && instanceType.toLowerCase() !== 'logfile';

      // Historical log analysis project
      const isLogFile = dataType.toLowerCase() === 'log' && instanceType.toLowerCase() === 'logfile';

      // Metric project with replay and streaming.
      const isMetric = dataType.toLowerCase() === 'metric';
      return {
        ...p,
        isLogFile, isLogStreaming, isMetric,
      };
    }, projects);

    return {
      rawData: d.data,
      data: {
        projects,
      },
    };
  });
};

export default loadInitData;
