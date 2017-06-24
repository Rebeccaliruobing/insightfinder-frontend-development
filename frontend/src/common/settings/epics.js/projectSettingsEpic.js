/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import R from 'ramda';
import { get } from 'lodash';
import moment from 'moment';
import type { Deps } from '../../types';
import { loadProjectSettings } from '../../apis';
import { appMessages } from '../../app/messages';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setProjectSettings } from '../actions';

const projectSettingsEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_PROJECT_SETTINGS').concatMap((action) => {
    console.log(action);
    // Need to handle several cases
    //
    // - projectName is empty, which also means there is no project to select, show message.
    // - projectName is not in the list, show message.
    const { projectName, month } = action.payload;
    return Observable.concat(
      Observable.of(showAppLoader),
      Observable.of(
        setProjectSettings({
          projectSettingsParams: action.payload,
        }),
      ),
      Observable.of(hideAppLoader()),
    );
  });

export default projectSettingsEpic;
