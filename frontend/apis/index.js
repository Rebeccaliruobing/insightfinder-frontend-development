import store from 'store';
import _ from 'lodash';
const baseUrl = window.API_BASE_URL || '/api/v1/';
import parseCloudRollout from '../data/parseCloudRollout';
import {retrieveLiveAnalysis} from './retrieve-liveanalysis';

//
// When we run frontend on localhost python web server and connect api with different host,
// Chrome will report cross-domain error, we need to install the chrome plugin to avoid it:
// https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
//

// We use two ways to call server side api: semantic ui api behavior & ajax.
// Semantic-ui api behavior provides ui button integration, and ajax is easy to use.
// http://semantic-ui.com/behaviors/api.html

$.fn.api.settings.successTest = function (response) {
    if (response && response.success && (response.success == true ||
        response.success.toLowerCase() === 'true')) {
        return response.success
    }
    return false;
};

$.fn.api.settings.api = {
    'login': `${baseUrl}login-check`,
    'signup': `${baseUrl}get-signup-code`,
    'signup2': `${baseUrl}signup`,
    'get username reminder': `${baseUrl}get-username-reminder`,
    'get temp password': `${baseUrl}get-temp-password`,
    'reset password': `${baseUrl}reset-password`,

    'dashboard uservalues': `${baseUrl}dashboard-uservalues`,
    'live analysis': `${baseUrl}liveAnalysis`,
    'cloud outlier detection': `${baseUrl}cloudOutlierDetection`,
    'cloud rollout check': `${baseUrl}cloudRolloutCheck`,
    'display project model': `${baseUrl}displayProjectModel`,

    'dashboard dailysummaryreport': `${baseUrl}dashboard-dailysummaryreport`,
    'insight report': `${baseUrl}insightReport`,
    'published detection': `${baseUrl}publishedDetection`,
    'post mortem': `${baseUrl}postMortem`,
    'log analysis': `${baseUrl}logAnalysis`,
    'add custom project': `${baseUrl}add-custom-project`,
    'add aws project': `${baseUrl}add-amazon-project`,
    'add google project': `${baseUrl}add-google-project`,
    'remove project': `${baseUrl}remove-project`,
    'project setting': `${baseUrl}emailAlertSetting`,
    'project data': `${baseUrl}projectData`,
    'external service': `${baseUrl}service-integration`,

    'upload detection': `${baseUrl}upload-detection`,
    'upload visualization': `${baseUrl}upload-visualization`,
    'upload update': `${baseUrl}upload-update`,
    'upload training': `${baseUrl}upload-training`,
    'upload display': `${baseUrl}upload-display`,

    'service integration': `${baseUrl}service-integration`
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
        console.log(arguments);
        console.log("Server Error", arguments);
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
 RolloutCheck,
 DisplayProjectModel,
 DisplayFileModel,

 文件分析:
 UploadVisualization,
 UploadTraining,
 UploadUpdate,
 UploadDetection,
 */
const apis = {

    postLogin(userName, password) {
        return new Promise(function (resolve, reject) {
            requestPost('login', { userName, password }, resolve, reject);
        });
    },

    postDashboardUserValues (operation = 'display',
                             other,
                             userName = store.get('userName'),
                             token = store.get('token')) {
        return new Promise((resolve, reject) => {
            requestPost('dashboard uservalues',
                { userName, token, operation, ...other },
                resolve,
                reject);
        });
    },

    postDashboardUserValuesMapArr (operation = 'display',
                                   projectName,
                                   selectedIndexArr,
                                   userName = store.get('userName'),
                                   token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['dashboard uservalues'],
                data: $.param({ userName, token, operation, projectName, selectedIndexArr }),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },

    postJSONDashboardUserValues (operation = 'display',
                                 other,
                                 userName = store.get('userName'),
                                 token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['dashboard uservalues'],
                data: $.param({ userName, token, operation, ...other }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },

    postDashboardDailySummaryReport (forceReload,
                                     userName = store.get('userName'),
                                     token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            let currentResp = store.get('dailyReportResponse');
            if (!forceReload && currentResp) {
                resolve(currentResp);
            } else {
                $.ajax({
                    type: 'POST',
                    url: $.fn.api.settings.api['dashboard dailysummaryreport'],
                    data: $.param({ userName, token }),
                    beforeSend: function (request) {
                        request.setRequestHeader("Accept", 'application/json');
                    }
                }).done(function (resp) {
                    store.set('dailyReportResponse', resp);
                    resolve(resp);
                }).fail(function (error) {
                    console.log(arguments);
                    console.log("Server Error", arguments);
                    reject(error);
                });
            }
        });
    },

    postDashboardDailySummaryReportNew (forceReload,
                                        userName = store.get('userName'),
                                        token = store.get('token')) {
        let self = this;
        return new Promise(function (resolve, reject) {
            let currentResp = store.get('dailyReportResponseNew');
            if (!forceReload && currentResp && !self.timeFromNow(currentResp['data']['createDate'])) {
                resolve(currentResp);
            } else {
                $.ajax({
                    type: 'POST',
                    url: $.fn.api.settings.api['dashboard dailysummaryreport'],
                    data: $.param({ userName, token }),
                    beforeSend: function (request) {
                        request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                        request.setRequestHeader("accept", 'application/json');
                    }
                }).done(function (resp) {
                    var reportData = { 'createDate': new Date() };
                    _.forEach(resp.data, function (value, key) {
                        key = key.split(':');
                        if (key.length == 3) {
                            reportData[key[0] + "@" + key[2]] = value;
                        }
                        else {
                            reportData[key[0]] = value;
                        }
                    });
                    resp['data'] = reportData;
                    store.set('dailyReportResponseNew', resp);
                    resolve(resp);
                }).fail(function (error) {
                    console.log(arguments);
                    console.log("Server Error", arguments);
                    reject(error);
                });
            }
        });
    },
    timeFromNow(ms){
        let now = new Date().getTime();
        ms = new Date(ms).getTime();
        let diffValue = now - ms;
        let result = '';
        var minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,

            _year = diffValue / year,
            _month = diffValue / month,
            _week = diffValue / (7 * day),
            _day = diffValue / day,
            _hour = diffValue / hour,
            _min = diffValue / minute;

        if (_year >= 1) {
            result = parseInt(_year) + "年前";
            return true;
        }
        else if (_month >= 1) {
            result = parseInt(_month) + "个月前";
            return true;
        }
        else if (_week >= 1) {
            result = parseInt(_week) + "周前";
            return true;
        }
        else if (_day >= 1) {
            result = parseInt(_day) + "天前";
            return true;
        }
        else if (_hour >= 1) {
            result = parseInt(_hour) + "个小时前";
            return _hour > 23
        }
        else if (_min >= 1) {
            result = parseInt(_min) + "分钟前";
            return false;
        }
        else {
            result = "刚刚";
            return false;
        }
    },
    postInsightReport(forceReload, userName = store.get('userName'), token = store.get('token')){
        let self = this;
        return new Promise(function (resolve, reject) {
            let currentResp = store.get('insightReportData');
            if (!forceReload && currentResp && !self.timeFromNow(currentResp['data']['createDate'])) {
                resolve(currentResp);
            }
            else {
                $.ajax({
                    type: 'POST',
                    url: $.fn.api.settings.api['insight report'],
                    data: $.param({ userName, token }),
                    beforeSend: function (request) {
                        request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                        request.setRequestHeader("accept", 'application/json');
                    }
                }).done(function (resp) {
                    var reportData = { 'createDate': new Date() };
                    _.forEach(resp.data, function (value, key) {
                        key = key.split(':');
                        if (key.length == 3) {
                            reportData[key[0] + "@" + key[2]] = value;
                        }
                        else {
                            reportData[key[0]] = value;
                        }
                    });
                    resp['data'] = reportData;
                    store.set('insightReportData', resp);
                    resolve(resp);
                }).fail(function (error) {
                    console.log(arguments);
                    console.log("Server Error", arguments);
                    reject(error);
                })
            }
        })
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
                data: $.param({ userName, token, pvalue, cvalue, modelType, projectName }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },
    retrieveLiveAnalysis: retrieveLiveAnalysis,

    /**
     *
     * @param modelKey
     * @param startTime
     * @param endTime
     * @param modelStart
     * @param modelEnd
     * @param userName
     * @param token
     * @param pvalue
     * @param cvalue
     * @param modelType
     * @param projectName
     * @returns {Promise}
     */
    postPostMortem(projectName, pvalue, cvalue, modelType, startTime, endTime, modelStartTime, modelEndTime, incidentKey, isReplay, isExistentIncident, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['post mortem'],
                data: $.param({
                    userName,
                    token,
                    pvalue,
                    cvalue,
                    modelType,
                    projectName,
                    startTime,
                    endTime,
                    modelStartTime,
                    modelEndTime,
                    incidentKey,
                    isReplay,
                    isExistentIncident
                }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },

    postLogAnalysis(projectName, pvalue, cvalue, modelType, startTime, endTime, modelStartTime, modelEndTime, isExistentIncident, operation, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['log analysis'],
                data: $.param({
                    userName,
                    token,
                    pvalue,
                    cvalue,
                    modelType,
                    projectName,
                    startTime,
                    endTime,
                    modelStartTime,
                    modelEndTime,
                    isExistentIncident,
                    operation
                }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
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
                data: $.param({ startTime, endTime, projectName, origin, userName, token }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },

    postCloudRolloutCheck(startTime, endTime,
                          projectName, origin = 'cloudrollout',
                          userName = store.get('userName'),
                          token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['cloud rollout check'],
                data: $.param({ startTime, endTime, projectName, origin, userName, token }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(parseCloudRollout(projectName, startTime, endTime, resp));
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
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
                data: $.param({ startTime, endTime, projectName, origin, userName, token }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },


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
    postUseCase(pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData, modelStartTime, modelEndTime, userName = store.get('userName'), token = store.get('token')) {
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
                    modelStartTime,
                    modelEndTime,
                    userName,
                    token
                }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
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
                data: $.param({ projectName, projectCloudType, samplingInterval, email, userName, token }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
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
    postAddAWSProject(projectName, zone, instanceType, access_key, secrete_key, hasAgentData, email = '', userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['add aws project'],
                data: $.param({
                    projectName,
                    zone,
                    instanceType,
                    'access-key': access_key,
                    'secrete-key': secrete_key,
                    hasAgentData,
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
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },
    /**
     *
     * @param projectName
     * @param projectId
     * @param filename
     * @param projectType
     * @param userName
     * @param token
     * @returns {Promise}
     */

    postAddGoogleProject(projectName, projectId, projectType, serviceAccount, filename, hasAgentData, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['add google project'],
                data: $.param({
                    projectName,
                    'project-id': projectId,
                    'project-type': projectType,
                    'filename': filename,
                    'service-account': serviceAccount,
                    hasAgentData,
                    userName,
                    token
                }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
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
                data: $.param({ projectName, userName, token }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },
    /**
     *
     * @param projectName
     * @param cvalue
     * @param pvalue
     * @param cvalueEmail
     * @param pvalueEmail
     * @param cvalueFilter
     * @param pvalueFilter
     * @param minAnomalyRatioFilter
     * @param sharedUsernames
     * @param projectHintMapFilename
     * @param userName
     * @param token
     * @returns {Promise}
     */
    postProjectSetting(projectName, cvalue, pvalue, cvalueEmail, pvalueEmail, cvalueFilter, pvalueFilter, minAnomalyRatioFilter, sharedUsernames, projectHintMapFilename, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['project setting'],
                data: $.param({
                    projectName,
                    cvalue,
                    pvalue,
                    'cvalue-email': cvalueEmail,
                    'pvalue-email': pvalueEmail,
                    'cvalue-filter': cvalueFilter,
                    'pvalue-filter': pvalueFilter,
                    minAnomalyRatioFilter,
                    sharedUsernames,
                    projectHintMapFilename,
                    userName,
                    token
                }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },

    /**
     *
     * @param projectName
     * @param startTime
     * @param endTime
     * @param groupId
     * @param instanceName
     * @param metricName
     * @param userName
     * @param token
     * @returns {Promise}
     */
    postProjectData(projectName, startTime, endTime, groupId, instanceName, metricName, userName = store.get('userName'), token = store.get('token')) {
        let paramData = metricName?{projectName, startTime, endTime, groupId, instanceName, metricName, userName, token}:
        {projectName, startTime, endTime, groupId, instanceName, userName, token};
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['project data'],
                data: $.param(paramData),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },
    postProjectDataSimple(projectName,metricName, instanceName, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['project data'],
                data: $.param({
                    projectName,
                    metricName,
                    instanceName,
                    userName,
                    token
                }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },

    registerExternalService(account, serviceKey, operation, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['external service'],
                data: $.param({
                    account, 
                    'service_key':serviceKey,
                    operation,
                    userName,
                    token
                }),
                beforeSend: function (request) {
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },

     /**
     *
     * @param cvalue
     * @param pvalue
     * @param modelType
     * @param modelName
     * @param filename
     * @param token
     * @param userName
     * @returns {Promise}
     */

    postUploadDetection(cvalue, pvalue, modelType, modelName, filename, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['upload detection'],
                data: $.param({ userName, token, filename, modelName, modelType, pvalue, cvalue }),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },
     /**
     *
     * @param filename
     * @param token
     * @param userName
     * @returns {Promise}
     */

    postUploadVisualization(filename, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['upload visualization'],
                data: $.param({ userName, token, filename }),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },
     /**
     *
     * @param operation
     * @param filenameFilter
     * @param modelName
     * @param filename
     * @param token
     * @param userName
     * @returns {Promise}
     */

    postUploadUpdate(operation, filenameFilter, modelName, filename, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['upload update'],
                data: $.param({ userName, token, filename,operation, filenameFilter, modelName }),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },
     /**
     *
     * @param filenameFilter
     * @param modelName
     * @param filename
     * @param token
     * @param userName
     * @returns {Promise}
     */

    postUploadTraining(filenameFilter, modelName, filename, userName = store.get('userName'), token = store.get('token')) {
        let param = filenameFilter?{ userName, token, filename, filenameFilter, modelName }:{ userName, token, filename, modelName };
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['upload training'],
                data: $.param(param),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },
     /**
     *
     * @param modelType
     * @param modelName
     * @param token
     * @param userName
     * @returns {Promise}
     */

    postUploadDisplay(modelType, modelName, userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['upload display'],
                data: $.param({ userName, token, modelName, modelType }),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    },

     /**
     *
     * @param service_id
     * @param operation
     * @param token
     * @param userName
     * @returns {Promise}
     */

    postServiceIntegration(service_id, operation = 'delete', userName = store.get('userName'), token = store.get('token')) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: $.fn.api.settings.api['service integration'],
                data: $.param({ userName, token, operation, service_id }),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    request.setRequestHeader("Accept", 'application/json');
                }
            }).done(function (resp) {
                resolve(resp);
            }).fail(function (error) {
                console.log(arguments);
                console.log("Server Error", arguments);
                reject(error);
            });
        });
    }
};


export default apis;
