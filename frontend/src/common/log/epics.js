/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { get } from 'lodash';
import { push } from 'react-router-redux';
import R from 'ramda';
import type { Deps } from '../types';
import { loadLogStreaming } from '../apis';
import { showAppLoader, hideAppLoader } from '../app/actions';
import { buildMatchLocation } from '../utils';
import { apiEpicErrorHandle } from '../errors';
import { setLogStreaming } from './actions';

const streamingEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING')
    .concatMap((action) => {
      let { projectId, incidentId } = action.payload;
      const { match, params, forceReload } = action.payload;
      const state = getState();
      const { credentials } = state.auth;
      const projects = R.filter(p => p.hasLogData, state.app.projects);
      const { streamingInfos } = state.log;

      let reloadProject = forceReload;

      // Check whether the project id is a valid log project id.
      // If not, choose the first project.
      if (!projectId || !R.find(p => p.name === projectId, projects)) {
        projectId = (projects[0] || {}).name || null;
      }

      // Check whether info for this project exists, if not load the data.
      let streamingInfo = null;
      if (projectId && !reloadProject) {
        streamingInfo = get(streamingInfos, projectId, null);
        reloadProject = !streamingInfo;
      }

      if (reloadProject && projectId) {
        return Observable.concat(
          Observable.of(showAppLoader()),
          Observable
            .from(loadLogStreaming(
              credentials, 'list', {
                projectName: projectId,
                monthlyDate: moment().startOf('month').valueOf(),
              }))
            .switchMap((d) => {
              const incidentList = d.incidentList || [];
              if (!R.find(i => i.id === incidentId, incidentList)) {
                incidentId = null;
              }

              // Build the new url base on the selected project and instance
              const location = buildMatchLocation(match, { projectId, incidentId }, params);

              return Observable.concat(
                Observable.of(push(location)),
                Observable.of(setLogStreaming(projectId, d)),
              );
            })
            .catch((err) => {
              return apiEpicErrorHandle(err);
            }),
          Observable.of(hideAppLoader()),
        );
      }

      // If found project info, check whether incident still exists, if not
      // back to incident list.
      if (streamingInfo && incidentId &&
        !R.find(i => i.id === incidentId, streamingInfo.incidentList || [])) {
        incidentId = null;
      }
      const location = buildMatchLocation(match, { projectId, incidentId }, params);
      return Observable.of(push(location));
    });

const epics = [
  streamingEpic,
];

export default epics;
