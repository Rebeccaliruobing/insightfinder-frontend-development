/**
 * Get the api endpoint url
 * @param api: The API to call.
 * @param version: API version number, default 1.
 */
const getEndpoint = (api, version = 1) => `${window.BASE_URL || ''}/api/v${version}/${api}`;

export default getEndpoint;
