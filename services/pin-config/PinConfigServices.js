import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import TokenServices from '../token/TokenServices';

class PinConfigServices {
  constructor() {
    this.currentUser = '';
    this.hasValidElectronicCertificate = false;
  }
  getCurrentUser() {
    this.currentUser = TokenServices.getToken();
    console.log('esto es current', this.currentUser);
    return this.currentUser;
  }
  canActivate() {
    this.currentUser = this.getCurrentUser();
    if (this.currentUser == null) {
      return false;
    }
    this.hasValidElectronicCertificate = this.currentUser.hasValidElectronicCertificate;
    console.log('esto es certificate', this.hasValidElectronicCertificate);
    if (this.hasValidElectronicCertificate) {
      // this.router.navigate(['dashboard']);
      return true;
    } else {
      // this.navBarSrv.hide();
      // this.router.navigate(['login', 'pin-config']);
      return false;
    }
  }
}
export default new PinConfigServices();
