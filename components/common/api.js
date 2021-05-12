const axios = require('axios');

export function executeGet(url, queryParams, successHandler, errorHandler) {
    axios.get(url, {params: queryParams, timeout: 1000})
      .then(successHandler)
      .catch(errorHandler);
};

export function executePost(url, data, successHandler, errorHandler) {
    axios.post(url, data, {timeout: 1000})
      .then(successHandler)
      .catch(errorHandler);
};

export function executeDelete(url, data, successHandler, errorHandler) {
    axios.delete(url, {data: data, timeout: 1000})
      .then(successHandler)
      .catch(errorHandler);
};