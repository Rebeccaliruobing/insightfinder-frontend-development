/*  @flow */
import R from 'ramda';
import { get } from 'lodash';
import moment from 'moment';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const loadLogFile = (
  credentials: Credentials,
  operation: String,
  params: Object,
) => fetchPost(
  getEndpoint('dashboard-incident'), {
    ...credentials,
    operation: 'display',
  },
).then((d) => {
  const { projectName } = params;
  const incidentAllInfo = JSON.parse(d.data.incidentAllInfo);
  const project = R.find(i => i.projectName === projectName, incidentAllInfo) || {};
  const timeFormat = 'YYYY/MM/DD hh:mm';

  let incidentList = get(project, 'incidentList', []);
  // Create id based on props of incident
  incidentList = R.map((i) => {
    const startTime = moment(i.incidentStartTime);
    const endTime = moment(i.incidentEndTime);
    return {
      ...i,
      id: i.incidentKey,
      name: `${startTime.format(timeFormat)}-${endTime.format(timeFormat)}`,
    };
  }, incidentList);

  return {
    incidentList,
  };
});

export default loadLogFile;
