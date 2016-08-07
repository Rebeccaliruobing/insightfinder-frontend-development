/**
 * TODO: Create decorator which can apply to api to cache server response.
 *       Q: For startTime/endTime, it includes milliseconds which makes it impossible
 *          to make them as the key parts. Can we use the hours as the key parts?
 * @param fn
 * @param keys - parameters name list
 */
const cacheable = (fn, keys) => {};

export default cacheable;
