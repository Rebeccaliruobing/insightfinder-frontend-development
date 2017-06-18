const urlJoin = (...parts) => {
  let url = parts.join('/');

  // Normalize the url
  if (url.startsWith('file://')) {
    // make sure protocol is followed by two slashes
    url = url.replace(/(\/{0,3})\/*/g, '$1');
  } else {
    // Protocol is followed by two slashes
    url = url.replace(/:\//g, '://');

    // remove consecutive slashes
    url = url.replace(/([^:\s%3A])\/+/g, '$1/');
  }
  // remove trailing slash before parameters or hash
  url = url.replace(/\/(\?|&|#[^!])/g, '$1');

  return url;
};

export default urlJoin;
