/* @flow */
import qs from 'qs';

/**
 * Use fetch to send POST method.
 * The content type of the sending data is application/x-www-from-urlencode.
 * The response json format is:
 * {
 *   success: true|false
 *   data: object,  // Data object if success is true.
 *   error: string // Error messages if success is false.
 * }
 *
 * @param {string} url The url of the api
 * @param {object} data The data to post.
 */
const fetchPost = (
  url: string,
  data: Object,
) =>
  fetch('http://192.168.0.4/api/test', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: qs.stringify(data),
  })
    .catch(res => { console.log(res); return res; });
    // .then(res => res.json())
    // .then((json) => { console.log(json); return json; }

export default fetchPost;
