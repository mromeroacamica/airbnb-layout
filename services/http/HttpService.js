import React from 'react';
import axios from 'axios';

class HttpServices {
  constructor() {}
  async get(url, config = {}) {
    const res = await axios.get(url, config);
    return res;
  }
  async put(url, body, config = {}) {
    const res = await axios.get(url, body, config);
    return res;
  }
  async post(url, body, config = {}) {
    const res = await axios.get(url, body, config);
    return res;
  }
}

export default new HttpServices();
