import Bluebird from './configureBluebird';

const Promise = require('babel-runtime/core-js/promise').default;

describe('common.configureBluebird', () => {
  it('babel-runtime promise should be replaced', () => {
    expect(Promise).toBe(Bluebird);
  });
});
