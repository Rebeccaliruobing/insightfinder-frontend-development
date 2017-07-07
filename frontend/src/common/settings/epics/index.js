/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import addExternalServiceEpic from './addExternalServiceEpic';
import createProjectEpic from './createProjectEpic';
import loadExternalServiceListEpic from './loadExternalServiceListEpic';
import loadProjectSettingsEpic from './loadProjectSettingsEpic';
import pickProjectModelEpic from './pickProjectModelEpic';
import removeExternalServiceEpic from './removeExternalServiceEpic';
import removeProjectEpic from './removeProjectEpic';
import removeProjectModelEpic from './removeProjectModelEpic';
import saveProjectSettingsEpic from './saveProjectSettingsEpic';

const epics = [
  addExternalServiceEpic,
  createProjectEpic,
  loadExternalServiceListEpic,
  loadProjectSettingsEpic,
  pickProjectModelEpic,
  removeExternalServiceEpic,
  removeProjectEpic,
  removeProjectModelEpic,
  saveProjectSettingsEpic,
];

export default epics;
