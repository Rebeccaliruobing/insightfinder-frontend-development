import store from 'store';
import $ from 'jquery';
import getEndpoint from './get-endpoint';

const loadEvents = (projectName, instanceGroup, startTime, endTime, eventType) => {
  const userName = store.get('userName');
  const token = store.get('token');
  const params = {
    userName, token,
    projectName, instanceGroup,
    startTime, endTime,
    modelType: 'splitByEnv', // 'Holistic',
    eventType,
  };

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: getEndpoint('events'),
      data: $.param(params),
      beforeSend: (request) => {
        request.setRequestHeader('Accept', 'application/json');
      },
    }).done((resp) => {
      if (resp.success) {
        try {
          const data = resp.data;
          resolve(data);
        } catch (e) {
          console.log(e);
          reject(`Data Error: ${e.message}`);
        }
      } else {
        reject(resp.message);
      }
    }).fail((resp) => {
      console.log(resp);
      reject(`Server Error: ${resp.status}\n${resp.statusText}`);
    });
  });
};

export default loadEvents;
