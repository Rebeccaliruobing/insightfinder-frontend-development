/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/*  @flow */
/* eslint-disable no-console */

import { get } from 'lodash';
import R from 'ramda';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const getProjectList = (credentials: Credentials) => {
  return fetchGet(getEndpoint('loadProjectsInfo'), {
    ...credentials,
  }).then(d => {
    const { userName } = credentials;
    // The basicProjectData contains the name => props map, convert to array.
    let projects = [];
    const basicProjectData = get(d.data, 'basicProjectData', {});
    R.forEachObjIndexed(val => {
      projects.push(val);
    }, basicProjectData);

    // Order the projects by name
    projects = R.sort((a, b) => a.projectName.localeCompare(b.projectName), projects);

    // Set flags based on the project info
    projects = R.map(p => {
      const { projectName, projectType, dataType, cloudType } = p;
      // Streaming log analysis project
      const isLogStreaming = dataType.toLowerCase() === 'log';

      // Get the owner based on the project name with format project@owner
      const owner = p.owner || projectName.split('@')[1] || userName;

      // Historical log analysis project
      const isLogFile = dataType.toLowerCase() === 'log' && cloudType.toLowerCase() === 'logfile';

      const isLog = dataType.toLowerCase() === 'log';
      const isMetric = dataType.toLowerCase() === 'metric';
      const isStationary =
        cloudType.toLowerCase() === 'metricfile' || cloudType.toLowerCase() === 'logfile';

      return {
        projectId: projectName,
        projectName,
        projectType: projectType.toLowerCase() === 'custom' ? 'Agent' : projectType,
        dataType,
        cloudType,
        owner,
        isLog,
        isMetric,
        isStationary,
        isLogFile,
        isLogStreaming,
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

export default getProjectList;
