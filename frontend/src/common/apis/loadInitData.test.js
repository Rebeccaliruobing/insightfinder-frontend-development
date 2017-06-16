/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import loadInitData from './loadInitData';
import { PermissionError } from '../errors';

describe('apis.loadInitData with invalid parameters', () => {
  it('Expect PermissionError if invalid token', async () => {
    try {
      await loadInitData(global.userBad);
    } catch (e) {
      expect(e).toBeInstanceOf(PermissionError);
    }
  });
});

describe('apis.loadInitData with valid paremeters', () => {
  let rawData = null;
  let data = null;

  beforeAll(async (done) => {
    const resp = await loadInitData(global.userGuest);
    rawData = resp.rawData;
    data = resp.data;

    done();
  });

  it('Expect api response contains "projectString"', async () => {
    expect(Object.keys(rawData)).toEqual(expect.arrayContaining(['projectString']));
  });

  it('Expect api response contains only 1 key: ["projectString"] ', async () => {
    expect(Object.keys(rawData).length).toBe(1);
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
          projectId: expect.any(String),
          projectName: expect.any(String),
          projectType: expect.any(String),
          instanceType: expect.any(String),
          dataType: expect.any(String),
          isMetric: expect.any(Boolean),
          isLogFile: expect.any(Boolean),
          isLogStreaming: expect.any(Boolean),
        }));
    }
  });
});
