/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import { get } from 'lodash';
import R from 'ramda';
import type { Deps } from '../../types';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { loadBugRepository } from '../../apis';
import { setBugRepository } from '../actions';

const bugRepositoryEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_BUG_REPOSITORY')
    .concatMap((action) => {
      const state = getState();
      const { credentials } = state.auth;
      const { opensourceSystemNames } = state.usecase;

      return Observable.concat(
        Observable.of(showAppLoader()),
        Observable
          .from(loadBugRepository(credentials, {}))
          .concatMap((infos) => {
            const bugRepository = {
              openSource: {},
              custom: {},
            };

            // Create a empty list for open source systems.
            R.forEach((system) => {
              bugRepository.openSource[system] = [];
            }, opensourceSystemNames);

            // Group the bug repository by opensource/custom type and system.
            R.forEach((info) => {
              const system = get(info, ['metaData', 'system'], 'Unknown');
              const finder = R.find(n => n === system);
              if (finder(opensourceSystemNames)) {
                bugRepository.openSource[system] = [
                  ...(bugRepository.openSource[system] || []),
                  info,
                ];
              } else if (system === 'Unknown') {
                bugRepository.custom.Others = [
                  ...(bugRepository.custom.Others || []),
                  info,
                ];
              } else {
                bugRepository.custom[system] = [
                  ...(bugRepository.custom[system] || []),
                  info,
                ];
              }
            }, infos);
            return Observable.of(setBugRepository(bugRepository));
          })
          .catch((err) => {
            return apiEpicErrorHandle(err);
          }),
        Observable.of(hideAppLoader()),
      );
    });

export default bugRepositoryEpic;
