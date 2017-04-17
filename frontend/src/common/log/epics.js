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
import { buildMatchUrl } from '../utils';
import { apiEpicErrorHandle } from '../errors';
import { setLogStreaming } from './actions';;

const streamingEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING')
    .concatMap((action) => {
      let { projectId, instanceId, forceReload: reload } = action.payload;
      const { match } = action.payload;
      const state = getState();
      const { credentials } = state.auth;
      const projects = R.filter(p => p.hasLogData, state.app.projects);
      const { streamingInfos } = state.log;

      // Check whether the project id is a valid log project id.
      // If not, choose the first project.
      if (!projectId || !R.find(p => p.name === projectId, projects)) {
        projectId = (projects[0] || {}).name || null;
      }

      // Check whether info for this project exists, if not load the data.
      let streamingInfo = null;
      if (projectId && !reload) {
        streamingInfo = get(streamingInfos, projectId, null);
        reload = !streamingInfo;
      }

      // Build the new url base on the selected project and instance
      const url = buildMatchUrl(match, { projectId, instanceId });

      if (reload && projectId) {
        return Observable.concat(
          Observable.of(showAppLoader()),
          Observable
            .from(loadLogStreaming(
              credentials, 'list', {
                projectName: projectId,
                monthlyDate: moment().startOf('month').valueOf(),
              }))
            .switchMap((d) => {
              return Observable.concat(
                Observable.of(push(url)),
                Observable.of(setLogStreaming(projectId, d)),
              );
            })
            .catch((err) => {
              return apiEpicErrorHandle(err);
            }),
          Observable.of(hideAppLoader()),
        );
      }

      return Observable.of(push(url));
    });

const epics = [
  streamingEpic,
];

export default epics;
