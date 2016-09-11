const baseUrl = window.API_BASE_URL || '/api/v1/';
const baseUrlV2 = window.API_BASE_URL || '/api/v2/';

const getEndpoint = (api) => `${baseUrl}${api}`;
const getEndpointV2 = (api) => `${baseUrlV2}${api}`;

export default getEndpoint;
