/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import chalk from 'chalk';
import loadInitData from './loadInitData';
import { PermissionError } from '../errors';

const {
  userBad,
  userGuest,
  userAdmin,
  metricProject,
  metricProjectAdmin,
  logProject,
  logProjectAdmin,
} = global;

describe('apis.loadInitData with invalid parameters', () => {
  it('Expect PermissionError if invalid token', async (done) => {
    try {
      await loadInitData(userBad);
      done();
    } catch (e) {
      expect(e).toBeInstanceOf(PermissionError);
    } finally {
      done();
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

  it(`Expect api response contains ${chalk.blue('basicProjectData')}`, () => {
    expect(Object.keys(rawData)).toEqual(expect.arrayContaining(['basicProjectData']));
  });

  it(`Expect api response contains only 1 key: ${chalk.blue('basicProjectData')}`, () => {
    expect(Object.keys(rawData).length).toBe(1);
  });

  it('Expect data is not null', () => {
    expect(data).not.toBeNull();
  });

  it('Expect parsed projects is array', () => {
    expect(data.projects).toBeInstanceOf(Array);
  });

  // Metric project
  it('Expect at lease one metric projects', () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    expect(projects.length).toBeGreaterThan(0);
  });

  it(`Expect contains metric project ${chalk.blue(metricProject)}`, () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    const project = R.find(p => p.projectName === metricProject, projects);
    expect(project).not.toBeUndefined();
  });

  it(`Expect project ${chalk.blue(metricProject)} has right AWS metric info`, () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    const project = R.find(p => p.projectName === metricProject, projects);
    expect(project).toEqual({
      projectId: metricProject,
      projectName: metricProject,
      projectType: 'EC2',
      cloudType: 'CloudWatch',
      dataType: 'Metric',
      isMetric: true,
      isLogFile: false,
      isLogStreaming: false,
    });
  });

  // Log streaming project
  it('Expect at lease one log streaming projects', () => {
    const projects = R.filter(p => p.isLogStreaming, data.projects);
    expect(projects.length).toBeGreaterThan(0);
  });

  it(`Expect contains log project ${chalk.blue(logProject)}`, () => {
    const projects = R.filter(p => p.isLogStreaming, data.projects);
    const project = R.find(p => p.projectName === logProject, projects);
    expect(project).not.toBeUndefined();
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

  // Metric project
  it('Expect at lease one metric projects', () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    expect(projects.length).toBeGreaterThan(0);
  });

  it(`Expect contains metric project ${chalk.blue(metricProjectAdmin)}`, () => {
    const projects = R.filter(p => p.isMetric, data.projects);
    const project = R.find(p => p.projectName === metricProjectAdmin, projects);
    expect(project).not.toBeUndefined();
  });

  // Log streaming project
  it('Expect at lease one log streaming projects', () => {
    const projects = R.filter(p => p.isLogStreaming, data.projects);
    expect(projects.length).toBeGreaterThan(0);
  });

  it(`Expect contains metric project ${chalk.blue(logProjectAdmin)}`, () => {
    const projects = R.filter(p => p.isLogStreaming, data.projects);
    const project = R.find(p => p.projectName === logProjectAdmin, projects);
    expect(project).not.toBeUndefined();
  });
});
