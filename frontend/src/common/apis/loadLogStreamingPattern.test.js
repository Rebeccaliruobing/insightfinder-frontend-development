/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import moment from 'moment';
import chalk from 'chalk';
import loadLogStreamingPattern from './loadLogStreamingPattern';
import { PermissionError, BadRequestError } from '../errors';

const { userBad, userGuest, logProject, userAdmin, logProjectAdmin } = global;

const monthlyDate = moment().startOf('month').valueOf();

describe('apis.loadLogStreamingPattern with invalid parameters', () => {
  it('Expect PermissionError if invalid token', async (done) => {
    try {
      await loadLogStreamingPattern(userBad, logProject, monthlyDate);
    } catch (e) {
      expect(e).toBeInstanceOf(PermissionError);
    } finally {
      done();
    }
  });

  it(`Expect BadRequestError if missing ${chalk.blue('projectName')}`, async (done) => {
    try {
      await loadLogStreamingPattern(userBad, null, monthlyDate);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
    } finally {
      done();
    }
  });

  it(`Expect BadRequestError if missing ${chalk.blue('monthlyDate')}`, async (done) => {
    try {
      await loadLogStreamingPattern(userBad, logProject, null);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
    } finally {
      done();
    }
  });
});

describe('apis.loadLogStreamingPattern with guest account', () => {
  let rawData = null;
  let data = null;

  beforeAll(async (done) => {
    const resp = await loadLogStreamingPattern(userGuest, logProject, monthlyDate);
    rawData = resp.rawData;
    data = resp.data;
    done();
  });

  it('Expect api response is Object', () => {
    expect(rawData).toBeInstanceOf(Object);
  });
});

describe('apis.loadLogStreamingPattern with admin account', () => {
  let rawData = null;
  let data = null;

  beforeAll(async (done) => {
    const resp = await loadLogStreamingPattern(userAdmin, logProjectAdmin, monthlyDate);
    rawData = resp.rawData;
    data = resp.data;
    done();
  });

  it('Expect api response is Object', () => {
    expect(rawData).toBeInstanceOf(Object);
  });
});
