/* eslint-disable no-console */
import store from 'store';
import $ from 'jquery';
import getEndpoint from './get-endpoint';

export function getProjectModels(projectName, instanceGroup) {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: getEndpoint('modelPicking', 1),
      data: $.param({ userName, token, projectName, instanceGroup, operation: 'list' }),
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
}

export function pickProjectModel(projectName, instanceGroup, modelKeyObj) {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: getEndpoint('modelPicking', 1),
      data: $.param({ userName, token, projectName, instanceGroup, modelKeyObj, operation: 'save' }),
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
}

export function removeProjectModel(projectName, instanceGroup, modelKeyObj) {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: getEndpoint('modelPicking', 1),
      data: $.param({ userName, token, projectName, instanceGroup, modelKeyObj, operation: 'delete' }),
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
}
