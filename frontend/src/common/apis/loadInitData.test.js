/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import chalk from 'chalk';
import loadInitData from './loadInitData';
import { PermissionError } from '../errors';

const { userBad, userGuest, userAdmin, metricProject, metricProjectAdmin } = global;

describe('apis.loadInitData with invalid parameters', () => {
  it('Expect PermissionError if invalid token', async () => {
    try {
      await loadInitData(userBad);
    } catch (e) {
      expect(e).toBeInstanceOf(PermissionError);
    }
  });
});

describe('apis.loadInitData with guest account', () => {
  let rawData = null;
  let data = null;

  beforeAll(async (done) => {
    const resp = await loadInitData(userGuest);
    rawData = resp.rawData;
    data = resp.data;

    done();
  });

  it('Expect api response contains "projectString"', async () => {
    expect(Object.keys(rawData)).toEqual(expect.arrayContaining(['projectString']));
  });

  it(`Expect api response contains only 1 key: ${chalk.blue('projectString')}`, async () => {
    expect(Object.keys(rawData).length).toBe(1);
  });

  it('Expect data is not null', async () => {
    expect(data).not.toBeNull();
  });

  it('Expect projects is array', async () => {
    expect(data.projects).toBeInstanceOf(Array);
  });

  it('Expect at lease one metric projects', async () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    expect(projects.length).toBeGreaterThan(0);
  });

  it(`Expect contains metric project ${chalk.blue(metricProject)}`, async () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    const project = R.find(p => p.projectName === metricProject, projects);
    expect(project).not.toBeUndefined();
  });

  it(`Expect project ${chalk.blue(metricProject)} has right AWS metric info`, async () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    const project = R.find(p => p.projectName === metricProject, projects);
    expect(project).toEqual({
      projectId: metricProject,
      projectName: metricProject,
      projectType: 'EC2',
      instanceType: 'CloudWatch',
      dataType: 'Metric',
      isMetric: true,
      isLogFile: false,
      isLogStreaming: false,
    });
  });
});

describe('apis.loadInitData with admin account', () => {
  let rawData = null;
  let data = null;

  beforeAll(async (done) => {
    const resp = await loadInitData(userAdmin);
    rawData = resp.rawData;
    data = resp.data;
    done();
  });

  it('Expect at lease one metric projects', async () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    expect(projects.length).toBeGreaterThan(0);
  });

  it(`Expect contains metric project ${chalk.blue(metricProjectAdmin)}`, async () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    const project = R.find(p => p.projectName === metricProjectAdmin, projects);
    expect(project).not.toBeUndefined();
  });
});
