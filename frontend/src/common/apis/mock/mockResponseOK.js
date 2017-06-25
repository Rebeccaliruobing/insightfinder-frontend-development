// Mock response object used to return 200 response object.
const mockResponseOK = {
  ok: true,
  status: 200,
  headers: {
    get: name => (name === 'Content-Type' ? 'application/json' : 'html'),
  },
  json: () => ({ success: true }),
};

export default mockResponseOK;
