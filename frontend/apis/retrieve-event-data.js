/* eslint-disable no-console */
import store from 'store';
import $ from 'jquery';
import getEndpoint from './get-endpoint';

const retrieveEventData = (projectName, loadGroup, instanceGroup, endTime, numberOfDays) => {
  const userName = store.get('userName');
  const token = store.get('token');
  const params = {
    userName,
    token,
    projectName,
    instanceGroup,
    ...(loadGroup ? {
      numberOfDays,
      endTimestamp: endTime,
      operation: 'loadPeriod',
    } : {
      operation: 'loadOverall',
    }),
  };

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: getEndpoint('eventData'),
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

export default retrieveEventData;
