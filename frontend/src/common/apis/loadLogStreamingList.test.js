/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import moment from 'moment';
import chalk from 'chalk';
import loadLogStreamingList from './loadLogStreamingList';
import { PermissionError, BadRequestError } from '../errors';

const { userBad, userGuest, logProject, userAdmin, logProjectAdmin } = global;

const monthlyDate = moment().startOf('month').valueOf();
const projectName = logProject;
const apiParams = { projectName, monthlyDate };
const apiParamsAdmin = { projectName: logProjectAdmin, monthlyDate };

describe('apis.loadLogStreamingList with invalid parameters', () => {
  it('Expect PermissionError if invalid token', async (done) => {
    try {
      await loadLogStreamingList(userBad, apiParams);
    } catch (e) {
      expect(e).toBeInstanceOf(PermissionError);
    } finally {
      done();
    }
  });

  it(`Expect BadRequestError if missing ${chalk.blue('projectName')}`, async (done) => {
    try {
      await loadLogStreamingList(userGuest, { monthlyDate });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
    } finally {
      done();
    }
  });

  it(`Expect BadRequestError if missing ${chalk.blue('monthlyDate')}`, async (done) => {
    try {
      await loadLogStreamingList(userGuest, { projectName });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
    } finally {
      done();
    }
  });
});

describe('apis.loadLogStreamingList with guest account', () => {
  let rawData = null;
  let data = null;

  beforeAll(async (done) => {
    const resp = await loadLogStreamingList(userGuest, apiParams);
    rawData = resp.rawData;
    data = resp.data;
    done();
  });

  it('Expect api response is an array', () => {
    expect(rawData).toBeInstanceOf(Array);
  });

  it('Expect api response contains at least one incident', () => {
    expect(rawData.length).toBeGreaterThan(0);
  });

  it(`Expect api response contains no duplicate ${chalk.blue('incidentKey')}`, () => {
    const items = R.uniq(R.map(i => i.incidentKey, rawData));
    expect(rawData.length - items.length).toBe(0);
  });

  it('Expect parsed data contains no duplicate id', () => {
    const items = R.uniq(R.map(i => i.id, data));
    expect(data.length - items.length).toBe(0);
  });

  it(`Expect api response contains no duplicate ${chalk.blue('incidentStartTime')} and ${chalk.blue('incidentEndTime')} pair`, () => {
    const items = R.uniq(R.map(i => `${i.incidentStartTime}_${i.incidentEndTime}`, rawData));
    expect(rawData.length - items.length).toBe(0);
  });

  it(`Expect api response incidents contain only fields ${chalk.blue('{incidentKey, incidentStartTime, incidentEndTime, clusterCount, totalEventsCount, rareEventsCount}')} fields`, () => {
    const incidents = rawData;
    if (incidents.length > 0) {
      const incident = incidents[0];
      expect(Object.keys(incident)).toEqual(
        expect.arrayContaining([
          'incidentKey',
          'incidentStartTime',
          'incidentEndTime',
          'clusterCount',
          'totalEventsCount',
          'rareEventsCount',
        ]),
      );
      expect(Object.keys(incident).length).toBe(6);
    }
  });

  it(`Expect parsed data not contains incidents without ${chalk.blue('{id, name}')} fields`, () => {
    const ids = [];
    R.forEach((i) => {
      if (!R.has('id')(i) || !R.has('name')(i)) {
        ids.push(i.id);
      }
    }, data);

    expect(ids.length).toBe(0);
  });
});

describe('apis.loadLogStreamingList with admin account', () => {
  let rawData = null;
  let data = null;

  beforeAll(async (done) => {
    const resp = await loadLogStreamingList(userAdmin, apiParamsAdmin);
    rawData = resp.rawData;
    data = resp.data;
    done();
  });

  it('Expect api response contains array', () => {
    expect(rawData).toBeInstanceOf(Array);
  });
});
