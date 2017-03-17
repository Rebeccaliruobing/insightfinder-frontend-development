/* @flow */
/**
 * Get the api endpoint url
 * @param api: The api to call.
 * @param version: The api version number, default 1.
 */
const getEndpoint = (
  api: string,
  version: number = 1,
) => `${window.BASE_URL || ''}/api/v${version}/${api}`;

export default getEndpoint;
