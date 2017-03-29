import R from 'ramda';

/**
 * Bind the credentials parameter to the api funciton.
 * @param {func} getState: Function to get redux state.
 * @param {func} api: Function of the api.
 */
const bindCredentials = getState => api =>
  R.partial(api, [getState().auth.credentials]);

export default bindCredentials;
