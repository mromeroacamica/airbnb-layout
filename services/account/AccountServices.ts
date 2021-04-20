import config from '../../config/env/environment';
import TokenServices from '../token/TokenServices';
import HttpService from '../http/HttpService';
import SessionService from '../session/SessionService';

class AccountServices {
  constructor() {}
  public getAccountPhotoURL(
    accountId: string,
    size: 256 | 128 | 64 | 32 = 64,
  ): string {
    return (
      config.baseUrl +
      `/api/custom/accounts/${accountId}/profile-pictures?size=${size}` +
      `&token=${TokenServices.getToken().token}&t=${new Date().getTime()}`
    );
  }
  public async forgotPassword(userName: string) {
    const url = config.baseUrl + '/api/auth/forgot-password/';
    const headers = {
      'x-tenant': SessionService.getTenant(),
    };
    const body = {username: userName};
    const res = await HttpService.post(url, body, {headers: headers});
    return res;
  }
  public async updatePIN(accountId: string, password: string, pin: string) {
    const url =
      config.baseUrl +
      `/api/custom/accounts/${accountId}/electronic-certificates`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };

    const body = {password, pin};
    const res = await HttpService.post(url, body, {headers: headers});
    return res.status == 200;
  }
}
export default new AccountServices();
