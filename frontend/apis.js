// const baseUrl = 'https://insightfinderui.appspot.com/';
const baseUrl = '/';

$.fn.api.settings.api = {
    'login': baseUrl + 'login-check',
    'liveAnalysis': baseUrl + 'liveanalysis',
    'userInstructions': `${baseUrl}static/userInstructions.json`,
    'dashboard uservalues': `${baseUrl}dashboard-uservalues`,
    'dashboard dailysummaryreport': `${baseUrl}dashboard-dailysummaryreport`
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
            body: formData,
            credentials: 'include'
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
    postDashboardUserValues (userName = 'guest', operation = 'display') {
        return new Promise(function (resolve, reject) {
            requestPost('dashboard uservalues', {userName, operation}, resolve, reject);
        });
    },
    postDashboardDailySummaryReport (userName = 'guest') {
        return new Promise(function (resolve, reject) {
            requestPost('dashboard dailysummaryreport', {userName}, resolve, reject);
        });
    }
};