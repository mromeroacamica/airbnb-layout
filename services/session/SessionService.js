import config from '../../config/env/environment';
import HttpService from '../http/HttpService';

class SessionService {
  constructor() {
    this.tenant = '';
    this.role = '';
  }
  setTenant(tenant) {
    this.tenant = tenant;
  }
  getTenant() {
    return this.tenant;
  }
  async logIn(domain, password) {
    const data = {
      username: domain,
      password,
    };
    const url = config.baseUrl + '/api/auth/login';
    const res = await HttpService.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/vnd.api+json',
        'x-tenant': this.getTenant(),
      },
    });
    return res;
  }
}
export default new SessionService();
