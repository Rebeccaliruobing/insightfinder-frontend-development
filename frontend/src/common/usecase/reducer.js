/* @flow */
/* eslint-disable no-console */
import type { UseCaseState, Action } from '../types';

const initialState: UseCaseState = {
  opensourceSystemNames: [
    'Cassandra', 'Hadoop', 'Apache', 'Tomcat',
    'MySQL', 'HDFS', 'Spark', 'Lighttpd',
    'Memcached',
  ],
  bugRepository: {
    openSource: {},
    custom: {},
  },
};

const reducer = (state: UseCaseState = initialState, action: Action): UseCaseState => {
  if (action.type === 'SET_BUG_REPOSITORY') {
    const { bugRepository } = action.payload;
    return {
      ...state,
      bugRepository,
    };
  }

  return { ...initialState, ...state };
};

export default reducer;
