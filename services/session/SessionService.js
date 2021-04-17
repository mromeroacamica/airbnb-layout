import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import TokenServices from '../token/TokenServices';

class SessionService {
  constructor() {
    this.tenant = '';
    this.role = '';
    this.currentUser;
  }
  setTenant(tenant) {
    this.tenant = tenant;
  }
  getCurrentUser() {
    this.currentUser = TokenServices.getToken();
    return this.currentUser;
  }
  getTenant() {
    return this.tenant;
  }
  async logIn(domain, password) {
    const data = {
      username: domain,
      password,
    };
    const url = config.baseUrl + '/api/auth/login/mobile';
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
