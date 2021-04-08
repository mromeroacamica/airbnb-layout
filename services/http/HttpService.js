import React from 'react';
import axios from 'axios';

class HttpServices {
  constructor() {}
  get(url, config = {}) {
    const res = axios
      .get(url, config)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
    return res;
  }
  put(url, body, config = {}) {
    const res = axios
      .put(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  }
  post(url, body, config = {}) {
    const res = axios
      .post(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
    return res;
  }
}

export default new HttpServices();
