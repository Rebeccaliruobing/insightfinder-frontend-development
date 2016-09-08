const baseUrl = window.API_BASE_URL || '/api/v1/';

const getEndpoint = (api) => `${baseUrl}${api}`;

export default getEndpoint;
