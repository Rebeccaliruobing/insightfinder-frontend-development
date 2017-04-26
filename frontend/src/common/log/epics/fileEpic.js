/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { get } from 'lodash';
import { push } from 'react-router-redux';
import R from 'ramda';
import type { Deps } from '../../types';
import { loadLogFile, loadLogFileIncident } from '../../apis';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { buildMatchLocation } from '../../utils';
import { apiEpicErrorHandle } from '../../errors';
import { setLogFile } from '../actions';

const fileEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_FILE')
    .concatMap((action) => {
      let { projectId, incidentId } = action.payload;
      const { match, params, forceReload } = action.payload;
      const state = getState();
      const { credentials } = state.auth;
      const projects = R.filter(p => p.isLogFile, state.app.projects);
      const { fileInfos } = state.log;

      let reloadProject = forceReload;

      // Check whether the project id is a valid log project id.
      // If not, choose the first project.
      if (!projectId || !R.find(p => p.name === projectId, projects)) {
        projectId = (projects[0] || {}).name || null;
      }

      // Check whether info for this project exists, if not load the data.
      let fileInfo = null;
      if (projectId && !reloadProject) {
        fileInfo = get(fileInfos, projectId, null);
        reloadProject = !fileInfo;
      }

      if (reloadProject && projectId) {
        return Observable.concat(
          Observable.of(showAppLoader()),
          Observable
            .from(loadLogFile(
              credentials, 'list', {
                projectName: projectId,
                monthlyDate: moment().startOf('month').valueOf(),
              }))
            .concatMap((projectData) => {
              const incidentList = projectData.incidentList || [];
              const incident = R.find(i => i.id === incidentId, incidentList);
              incidentId = incident ? incidentId : null;
              const location = buildMatchLocation(match, { projectId, incidentId }, params);

              if (!incident) {
                return Observable.concat(
                  Observable.of(push(location)),
                  Observable.of(setLogFile(projectId, projectData)),
                );
              }

              // Load the incident data
              return Observable
                .from(loadLogFileIncident(
                  credentials, 'detection', {
                    projectName: projectId,
                    incident: { ...incident, ...params },
                  },
                ))
                .concatMap((incidentData) => {
                  return Observable.concat(
                    Observable.of(push(location)),
                    Observable.of(
                      setLogFile(projectId, projectData, incidentId, incidentData)),
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
      if (fileInfo && incidentId) {
        incident = R.find(i => i.id === incidentId, fileInfo.incidentList || []);
      }
      incidentId = incident ? incidentId : null;
      const location = buildMatchLocation(match, { projectId, incidentId }, params);

      if (!incident) {
        return Observable.concat(
          Observable.of(push(location)),
        );
      }

      return Observable.concat(
        Observable.of(showAppLoader()),
        Observable
          .from(loadLogFileIncident(
            credentials, 'detection', {
              projectName: projectId,
              incident: { ...incident, ...params },
            },
          ))
          .concatMap((incidentData) => {
            return Observable.concat(
              Observable.of(push(location)),
              Observable.of(
                setLogFile(projectId, fileInfo, incidentId, incidentData)),
            );
          })
          .catch((err) => {
            return apiEpicErrorHandle(err);
          }),
        Observable.of(hideAppLoader()),
      );
    });

export default fileEpic;
