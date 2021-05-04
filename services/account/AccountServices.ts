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
  async getAllGenders() {
    const url = config.baseUrl + '/api/genders/';
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };
    const res: any = await HttpService.get(url, {headers});
    return res;
  }
  async getAccount(id: string) {
    const url = config.baseUrl + '/api/accounts/' + id;

    const params = {
      fields:
        'firstName,lastName,birthdate,phone,gender,legajo,email,alternativeEmail,' +
        'cuilCuit,roles,orgUnit,managedOrgUnits,registrationDate,employeeSince,profilePictureFileName,hasValidElectronicCertificate',
    };

    const headers = {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };
    const res: any = await HttpService.get(url, {headers, params});
    return res;
  }
  async updatePassword(oldPassword: string, newPassword: string) {
    console.log(TokenServices.getToken());
    const url = config.baseUrl + '/api/change-password';
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };
    const body = {oldPassword, newPassword};
    const res = await HttpService.post(url, body, {headers});
    console.log(res);
    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  }
}
export default new AccountServices();
