/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import R from 'ramda';
import moment from 'moment';
import type { Deps } from '../../types';
import { loadLogIncidentList } from '../../apis';
import { appMessages } from '../../app/messages';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setLogInfo } from '../actions';

const logIncidentListEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_INCIDENT_LIST').concatMap((action) => {
    // Need to handle several cases
    //
    // - projectName is empty, which also means there is no project to select, show message.
    // - projectName is not in the list, show message.
    // - params are correct, calls API and handler errors.
    const pickNotNil = R.pickBy(a => !R.isNil(a));
    const monthFormat = 'YYYY-MM';

    const state = getState();
    const { projectName, params } = action.payload;
    const { credentials } = state.auth;
    const projects = R.filter(p => p.isLog, state.app.projects);
    const { month } = params;

    const incidentListParams = pickNotNil({ projectName, month });
    const monthlyDate = moment(month, monthFormat).startOf('month').valueOf();

    let apiAction$ = null;

    if (!projectName) {
      apiAction$ = Observable.of(setLogInfo({ currentError: appMessages.errorsNoLogProject }));
    } else if (!R.find(p => p.projectName === projectName, projects)) {
      apiAction$ = Observable.of(
        setLogInfo({ currentError: appMessages.errorsProjectNotFound }),
      );
    } else {
      apiAction$ = Observable.from(loadLogIncidentList(credentials, projectName, { monthlyDate }))
        .concatMap((d) => {
          return Observable.of(
            setLogInfo({
              incidentList: d.data.incidentList,
            }),
          );
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    }

    return Observable.concat(
      Observable.of(showAppLoader()),
      Observable.of(setLogInfo({ currentError: null, incidentListParams })),
      apiAction$,
      Observable.of(hideAppLoader()),
    );
  });

export default logIncidentListEpic;
