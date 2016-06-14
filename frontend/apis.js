import store from 'store';

const baseUrl = window.API_BASE_URL || '/api/v1/';
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
  'cloud outlier detection': `${baseUrl}cloudOutlierDetection`,
  'cloud rollout check': `${baseUrl}cloudRolloutCheck`,
  'display project model': `${baseUrl}displayProjectModel`,

  'userInstructions': `${localBaseUrl}static/userInstructions.json`,
  'dashboard dailysummaryreport': `${baseUrl}dashboard-dailysummaryreport`,
  'published detection': `${baseUrl}publishedDetection`,
  'post mortem': `${baseUrl}postMortem`,
  'add custom project': `${baseUrl}add-custom-project`,
  'add aws project': `${baseUrl}add-amazon-project`,
  'remove project': `${baseUrl}remove-project`,
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

  getUserInstructions (userName = store.get('userName'),
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
  postDashboardDailySummaryReport (userName:String = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['dashboard dailysummaryreport'],
        data: $.param({userName, token}),
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
   * @param modelKey
   * @param startTime
   * @param endTime
   * @param userName
   * @param token
   * @param pvalue
   * @param cvalue
   * @param modelType
   * @param projectName
   * @returns {Promise}
   */
  postPostMortem(projectName, pvalue, cvalue, modelType, modelKey, startTime, endTime, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['post mortem'],
        data: $.param({userName, token, pvalue, cvalue, modelType, projectName, modelKey, startTime, endTime}),
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
  postCloudOutlierDetection(startTime, endTime, projectName, origin = 'cloudoutlier', userName = store.get('userName'), token = store.get('token'),) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['cloud outlier detection'],
        data: $.param({startTime, endTime, projectName, origin, userName, token}),
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
  postCloudRolloutCheck(startTime, endTime, projectName, origin = 'cloudrollout', userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['cloud rollout check'],
        data: $.param({startTime, endTime, projectName, origin, userName, token}),
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
   * @param startTime
   * @param endTime
   * @param projectName
   * @param origin
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postDisplayProjectModel(startTime, endTime, projectName, origin = 'clouddisplay', userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['display project model'],
        data: $.param({startTime, endTime, projectName, origin, userName, token}),
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


  // String userName = req.getParameter("userName");
  // String token = req.getParameter("token");
  // String p_value = req.getParameter("pvalue");
  // String c_value = req.getParameter("cvalue");
  // String modelKey = req.getParameter("modelKey");
  // String modelName = req.getParameter("modelName");
  // String projectName = req.getParameter("projectName");
  // String modelType = req.getParameter("modelType");
  // String fromUser = req.getParameter("fromUser");
  // String dataChunkName = req.getParameter("dataChunkName");
  // String metaData = req.getParameter("metaData");
  /**
   *
   * @param pvalue
   * @param cvalue
   * @param modelKey
   * @param modelName
   * @param projectName
   * @param modelType
   * @param fromUser
   * @param dataChunkName
   * @param metaData
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postUseCase(pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['published detection'],
        data: $.param({
          pvalue,
          cvalue,
          modelKey,
          modelName,
          projectName,
          modelType,
          fromUser,
          dataChunkName,
          metaData,
          userName,
          token
        }),
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
   * @param projectName
   * @param projectCloudType
   * @param samplingInterval
   * @param email
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postAddCustomProject(projectName, projectCloudType, samplingInterval, email = '', userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['add custom project'],
        data: $.param({projectName, projectCloudType, samplingInterval, email, userName, token}),
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
   * @param projectName
   * @param email
   * @param zone
   * @param access_key
   * @param secrete_key
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postAddAWSProject(projectName, zone, access_key, secrete_key, email = '', userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['add aws project'],
        data: $.param({
          projectName,
          zone,
          'access-key': access_key,
          'secrete-key': secrete_key,
          email,
          userName,
          token
        }),
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
   * @param projectName
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postRemoveProject(projectName, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['remove project'],
        data: $.param({projectName, userName, token}),
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


};
