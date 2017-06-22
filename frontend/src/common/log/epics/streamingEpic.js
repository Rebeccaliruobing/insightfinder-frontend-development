/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { get } from 'lodash';
import { push } from 'react-router-redux';
import R from 'ramda';
import type { Deps } from '../../types';
import loadLogStreaming from '../../apis/loadLogStreaming';
import loadLogStreamingIncident from '../../apis/loadLogStreamingIncident1';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { buildMatchLocation } from '../../utils';
import { apiEpicErrorHandle } from '../../errors';
import { setLogStreaming1 } from '../actions';

const streamingEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING')
    .concatMap((action) => {
      let { projectId, month, incidentId } = action.payload;
      const { match, params, forceReload } = action.payload;
      const state = getState();
      const { credentials } = state.auth;
      const projects = R.filter(p => p.isLogStreaming, state.app.projects);
      const { streamingInfos } = state.log;

      let reloadProject = forceReload;

      console.log('match', match);

      // Check whether the project id is a valid log project id.
      // If not, choose the first project.
      if (!projectId || !R.find(p => p.projectId === projectId, projects)) {
        projectId = (projects[0] || {}).projectId || null;
      }

      // Check whether info for this project exists, if not load the data.
      let streamingInfo = null;
      if (projectId && !reloadProject) {
        streamingInfo = get(streamingInfos, projectId, null);
        reloadProject = !streamingInfo;
      }

      // If month is empty, use current month
      if (!month) {
        month = moment().format('YYYY-MM');
      }
      const monthlyDate = moment(month, 'YYYY-MM').startOf('month').valueOf();

      if (reloadProject && projectId) {
        return Observable.concat(
          Observable.of(showAppLoader()),
          Observable
            .from(loadLogStreaming(
              credentials, {
                projectName: projectId,
                monthlyDate,
              }))
            .concatMap((projectData) => {
              const incidentList = projectData.incidentList || [];
              const incident = R.find(i => i.id === incidentId, incidentList);
              incidentId = incident ? incidentId : null;
              const location = buildMatchLocation(match, {
                projectId, month, incidentId,
              }, params);

              if (!incident) {
                return Observable.concat(
                  Observable.of(push(location)),
                  Observable.of(setLogStreaming1(projectId, projectData)),
                );
              }

              // Load the incident data
              return Observable
                .from(loadLogStreamingIncident(
                  credentials, {
                    projectName: projectId,
                    incident: { ...incident, ...params },
                  },
                ))
                .concatMap((incidentData) => {
                  return Observable.concat(
                    Observable.of(push(location)),
                    Observable.of(
                      setLogStreaming1(projectId, projectData, incidentId, incidentData)),
                  );
                });
            })
            .catch((err) => {
              return apiEpicErrorHandle(err);
            }),
          Observable.of(hideAppLoader()),
        );
      }

      // If found project info, check whether incident still exists, if not
      // back to incident list.
      let incident = null;
      if (streamingInfo && incidentId) {
        incident = R.find(i => i.id === incidentId, streamingInfo.incidentList || []);
      }
      incidentId = incident ? incidentId : null;
      const location = buildMatchLocation(match, { projectId, month, incidentId }, params);

      if (!incident) {
        return Observable.concat(
          Observable.of(push(location)),
        );
      }

      return Observable.concat(
        Observable.of(showAppLoader()),
        Observable
          .from(loadLogStreamingIncident(
            credentials, {
              projectName: projectId,
              incident: { ...incident, ...params },
            },
          ))
          .concatMap((incidentData) => {
            return Observable.concat(
              Observable.of(push(location)),
              Observable.of(
                setLogStreaming1(projectId, streamingInfo, incidentId, incidentData)),
            );
          })
          .catch((err) => {
            return apiEpicErrorHandle(err);
          }),
        Observable.of(hideAppLoader()),
      );
    });

export default streamingEpic;
