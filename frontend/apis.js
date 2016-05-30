const baseUrl = 'https://insightfinderui.appspot.com/api/v1/';
const localBaseUrl = '/';

// rest访问其他地址会导致跨域错误, 可安装chrome 插件
// https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

// TODO: [FIX] 返回的数据格式中success为字符串, 应为boolean类型.
$.fn.api.settings.successTest = function (response) {
  if (response && response.success && (response.success == true || response.success.toLowerCase() === 'true')) {
    return response.success
  }
  return false;
};

$.fn.api.settings.api = {
  'login': `${baseUrl}login-check`,
  'dashboard uservalues': `${localBaseUrl}dashboard-uservalues`,
  'liveAnalysis': `${baseUrl}liveanalysis`,
  'userInstructions': `${localBaseUrl}static/userInstructions.json`,
  'dashboard dailysummaryreport': `${localBaseUrl}dashboard-dailysummaryreport`
};

let request = function (method, action, data, resolve, reject) {
  var formData = new FormData();
  _.keys(data).forEach((k)=> formData.append(k, data[k]));

  (['GET', 'HEAD'].indexOf(method) >= 0
      ? fetch(`${$.fn.api.settings.api[action]}?${$.param(data)}`)
      : fetch($.fn.api.settings.api[action], {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: method,
      body: formData
      // credentials: 'include'
    })
  ).then(function (response) {
    return response.json()
  }).then(function (resp) {
    resolve(resp);
  }).catch(function (ex) {
    reject(ex);
  });
};

let requestGet = function (action, data, resolve, reject) {
  return request('GET', action, data, resolve, reject);
};
let requestPost = function (action, data, resolve, reject) {
  return request('POST', action, data, resolve, reject);
};

export default {

  getUserInstructions () {
    return new Promise(function (resolve, reject) {
      requestGet('userInstructions', {}, resolve, reject);
    });
  },
  postLogin(userName, password) {
    return new Promise(function (resolve, reject) {
      requestGet('login', {userName, password}, resolve, reject);
    });
  },
  postDashboardUserValues (userName:String = store.get('userName'), operation:String = 'display') {
    return new Promise(function (resolve, reject) {
      requestPost('dashboard uservalues', {userName, operation}, resolve, reject);
    });
  },
  postDashboardDailySummaryReport (userName:String = store.get('userName')) {
    return new Promise(function (resolve, reject) {
      requestPost('dashboard dailysummaryreport', {userName}, resolve, reject);
    });
  }
};