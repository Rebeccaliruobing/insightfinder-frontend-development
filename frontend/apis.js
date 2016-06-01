import store from 'store';

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
  
  'dashboard uservalues': `${baseUrl}dashboard-uservalues`,
  'live analysis': `${baseUrl}liveAnalysis`,
  'cloud outlier': `${baseUrl}cloudOutlierDetection`,
  'cloud rollout': `${baseUrl}cloudRolloutCheck`,

  'userInstructions': `${localBaseUrl}static/userInstructions.json`,
  'dashboard dailysummaryreport': `${localBaseUrl}dashboard-dailysummaryreport`
};

let request = function (method, action, data, resolve, reject) {
  var formData = new FormData();
  _.keys(data).forEach((k)=> formData.append(k, data[k]));
  let xhr;
  switch (method) {
    case 'GET':
      xhr = $.get($.fn.api.settings.api[action], data);
      break;
    case 'HEAD':
      xhr = $.get($.fn.api.settings.api[action], data);
      break;
    default:
      xhr = $.post($.fn.api.settings.api[action], data);
      break;
  }
  xhr.done(function (resp) {
    resolve(resp);
  }).fail(function (error) {
    reject(error);
  })
};

let requestGet = function (action, data, resolve, reject) {
  return request('GET', action, data, resolve, reject);
};
let requestPost = function (action, data, resolve, reject) {
  return request('POST', action, data, resolve, reject);
};


/**
 总体:
 Dashboard,
 DailySummaryReport,

 项目分析:
 PostMortem,
 PublishedDetection,
 LiveAnalysis,

 热图:
 CloudOutlierDetection,
 CloudRolloutCheck,
 DisplayProjectModel,
 DisplayFileModel,

 文件分析:
 UploadVisualization,
 UploadTraining,
 UploadUpdate,
 UploadDetection,
 */
export default {
  
  getUserInstructions (
    userName = store.get('userName'), 
    token = store.get('token'), 
    operation) {
    return new Promise(function (resolve, reject) {
      requestGet('userInstructions', {userName, token, operation}, resolve, reject);
    });
  },
  
  postLogin(userName, password) {
    return new Promise(function (resolve, reject) {
      requestPost('login', {userName, password}, resolve, reject);
    });
  },
  /**
   *
   * @param userName
   * @param token
   * @param operation
   * @returns {Promise}
   */
  postDashboardUserValues (userName:String = store.get('userName'), token = store.get('token'), operation:String = 'display') {
    return new Promise(function (resolve, reject) {
      requestPost('dashboard uservalues', {userName, token, operation}, resolve, reject);
    });
  },
  postDashboardDailySummaryReport (userName:String = store.get('userName')) {
    return new Promise(function (resolve, reject) {
      requestPost('dashboard dailysummaryreport', {userName}, resolve, reject);
    });
  },
  /**
   *
   * @param userName
   * @param token
   * @param pvalue
   * @param cvalue
   * @param modelType
   * @param projectName
   * @returns {Promise}
   */
  postLiveAnalysis(projectName, modelType, pvalue, cvalue, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['live analysis'],
        data: $.param({userName, token, pvalue, cvalue, modelType, projectName}),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        reject(error);
      });
    });
  },

  /**
   *
   * @param userName
   * @param token
   * @param startTime
   * @param endTime
   * @param projectName
   * @param origin
   * @returns {Promise}
   */
  postCloudOutlier(startTime, endTime, projectName, origin, userName = store.get('userName'), token = store.get('token'),) {
    return new Promise(function (resolve, reject) {
      requestPost('cloud outlier', {userName, token, startTime, endTime, projectName, origin}, resolve, reject);
    });
  },

  /**
   *
   * @param userName
   * @param token
   * @param startTime
   * @param endTime
   * @param projectName
   * @param origin
   * @returns {Promise}
   */
  postCloudRollout(userName = store.get('userName'), token = store.get('token'), startTime, endTime, projectName, origin) {
    return new Promise(function (resolve, reject) {
      requestPost('cloud rollout', {userName, token, startTime, endTime, projectName, origin}, resolve, reject);
    });
  },

};