/*  @flow */
import moment from 'moment';
import momenttz from 'moment-timezone';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const login = ({ userName, password, params }) => {
  const { timezone } = params;

  let timezoneOffset;
  if (timezone) {
    timezoneOffset = momenttz.tz.zone(timezone).offset(moment.utc());
  }

  return fetchPost(getEndpoint('login-check'), {
    userName,
    password,
    timezoneOffset,
    timezone,
  }).then(d => ({
    credentials: {
      userName: d.data.userName,
      token: d.token,
    },
    userInfo: d.data,
  }));
};

export default login;
