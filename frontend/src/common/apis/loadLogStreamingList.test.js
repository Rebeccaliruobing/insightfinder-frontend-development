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

  it('Expect api response contains multiple incidents', () => {
    expect(rawData.length).toBeGreaterThan(0);
  });

  it(`Expect api response contains no duplicate ${chalk.blue('incidentKey')}`, () => {
    const items = R.uniq(R.map(i => i.incidentKey, rawData));
    expect(rawData.length - items.length).toBe(0);
  });

  it(`Expect api response contains no duplicate ${chalk.blue('incidentStartTime')} and ${chalk.blue('incidentEndTime')} pair`, () => {
    const items = R.uniq(R.map(i => `${i.incidentStartTime}_${i.incidentEndTime}`, rawData));
    expect(rawData.length - items.length).toBe(0);
  });

  it(`Expect no incidents without ${chalk.blue('{incidentStartTime, incidentEndTime, cluster, rareEventsSize}')} fields`, () => {
    const incidents = [];
    R.forEach((i) => {
      if (
        !R.has('incidentStartTime')(i) ||
        !R.has('incidentEndTime')(i) ||
        !R.has('cluster')(i) ||
        !R.has('rareEventsSize')(i)
      ) {
        incidents.push(i.incidentKey);
      }
    }, rawData);

    expect(incidents.length).toBe(0);
  });

  it(`Expect no parsed incidents without ${chalk.blue('{id, name}')} fields`, () => {
    const incidents = [];
    R.forEach((i) => {
      if (!R.has('id')(i) || !R.has('name')(i)) {
        incidents.push(i.incidentKey);
      }
    }, data);

    expect(incidents.length).toBe(0);
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
