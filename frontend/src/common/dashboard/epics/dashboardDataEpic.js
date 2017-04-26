/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../../types';

const dashboardDataEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_DASHBOARD_DATA')
    .concatMap((action) => {
      return Observable.empty();
    });

export default dashboardDataEpic;
