import React from 'react';
import axios from 'axios';

class HttpServices {
  constructor() {}
  get(url, config = {}) {
    console.log('esto es el url', url);
    const res = axios
      .get(url, config)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
    return res;
  }
  put(url, body, config = {}) {
    const res = axios
      .get(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  }
  post(url, body, config = {}) {
    const res = axios
      .get(url, body, config)
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
