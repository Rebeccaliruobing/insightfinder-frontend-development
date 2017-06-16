/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import { get } from 'lodash';
import loadProjectsInfo from './loadProjectsInfo';
import { PermissionError } from '../errors';

describe('apis.loadProjectsInfo with invalid parameters', () => {
  it('Expect PermissionError if invalid token', async () => {
    try {
      await loadProjectsInfo(global.userBad);
    } catch (e) {
      expect(e).toBeInstanceOf(PermissionError);
    }
  });
});

describe('apis.loadProjectsInfo with valid paremeters', () => {
  let rawData = null;
  let data = null;

  beforeAll(async (done) => {
    const resp = await loadProjectsInfo(global.userGuest);
    rawData = resp.rawData;
    data = resp.data;

    done();
  });

  it('Expect raw data contains "projectString"', async () => {
    expect(get(rawData, 'projectString')).not.toBeNull();
  });

  it('Expect raw data not contains useless "projectSettingsAllInfo"', async () => {
    expect(get(rawData, 'projectSettingsAllInfo')).toBeFalsy();
  });

  it('Expect data is not null', async () => {
    expect(data).not.toBeNull();
  });

  it('Expect projects is array', async () => {
    expect(data.projects).toBeInstanceOf(Array);
  });

  it('Expect project has needed values', async () => {
    const { projects } = data;
    if (projects.length > 0) {
      const project = projects[0];
      expect(project)
        .toEqual(expect.objectContaining({
          projectName: expect.any(String),
          projectType: expect.any(String),
          instanceType: expect.any(String),
          dataType: expect.any(String),
          isLogFile: expect.any(Boolean),
          isLogStreaming: expect.any(Boolean),
        }));
    }
  });
});
