/*  @flow */
import moment from 'moment';
import momenttz from 'moment-timezone';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const login = ({ userName, password, params }) => {
  let { timezone } = params;

  let timezoneOffset = 0;
  if (timezone && timezone !== 'default') {
    timezoneOffset = -momenttz.tz.zone(timezone).offset(moment.utc());
  } else {
    timezone = '';
  }

  return fetchPost(getEndpoint('login-check'), {
    userName,
    password,
    timezoneOffset,
    timezoneString: timezone,
  }).then(d => ({
    credentials: {
      userName: d.data.userName,
      token: d.token,
    },
    userInfo: d.data,
  }));
};

export default login;
