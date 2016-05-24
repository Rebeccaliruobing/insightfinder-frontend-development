const reduce = require('lodash/reduce');

function GetExternals(settings) {
  if (settings && settings['js']) {
    return reduce(settings['js'], (result, val, key) => {
      result[key] = val[0];
      return result;
    }, {});
  } else {
    return {}
  }
}

function GetCdnManifest(settings) {
  var ret = {};
  
  if (settings && settings['js']) {
    ret['js'] = reduce(settings['js'], (result, val, key) => {
      result[key] = val[1];
      return result;
    }, {});
  }
  
  if (settings && settings['css']) {
    ret['css'] = settings['css'];
  }
  
  return ret;
}

module.exports = {
  GetExternals, GetCdnManifest
};