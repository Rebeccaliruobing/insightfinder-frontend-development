/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import { get } from 'lodash';
import loadProjectsInfo from './loadProjectsInfo';
import { PermissionError } from '../errors';

describe('apis.loadProjectsInfo', () => {
  it('Except exception if user has invalid token', async () => {
    try {
      await loadProjectsInfo(global.userBad);
    } catch (e) {
      expect(e).toBeInstanceOf(PermissionError);
    }
  });

  it('Except raw data contains projectString', async () => {
    const { rawData } = await loadProjectsInfo(global.userGuest);
    expect(get(rawData, 'projectString')).not.toBeNull();
  });
});
