import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import TokenServices from '../token/TokenServices';

class PinConfigServices {
  constructor() {
    this.currentUser = '';
    this.hasValidElectronicCertificate = false;
  }
  getCurrentUser() {
    return (this.currentUser = TokenServices.getToken());
  }
  canActivate() {
    this.currentUser = this.getCurrentUser();
    if (this.currentUser == null) {
      return false;
    }
    this.hasValidElectronicCertificate =
      currentUser.hasValidElectronicCertificate;
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
