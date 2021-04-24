import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import TokenServices from '../token/TokenServices';
import SessionService from '../session/SessionService';

class SignServices {
  constructor() {}
  async getCertificate() {
    const account = SessionService.getCurrentUser();
    const accountId = account.account.id;
    const url =
      config.baseUrl +
      `/api/custom/accounts/${accountId}/electronic-certificates/p12`;
    const headers = {
      Authorization: `Bearer ${TokenServices.getToken().token}`,
    };
    const res = await HttpService.get(url, {
      headers: headers,
      responseType: 'blob',
    });
    console.log(res);
    if (res.data instanceof Blob) {
      const file = new File([res], 'cert');
      return file;
    } else {
      return false;
    }
  }
  async getCertPem(password, certFile) {
    if (certFile == null) {
      certFile = await this.getCertificate();
    }
    const file = certFile;

    // Read it
    const waitRender = new Promise((res, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target.result);
      reader.readAsArrayBuffer(file);
    });
    const content = await waitRender;
    const pkcs12Der = this.arrayBufferToString(content);
    const pkcs12Asn1 = forge.asn1.fromDer(pkcs12Der);
    // const emptySig = forge.util.decode64($('#emptysighash').val());

    const pkcs12 = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, false, password);
    let cert;
    let privateKey;

    for (let sci = 0; sci < pkcs12.safeContents.length; ++sci) {
      const safeContents = pkcs12.safeContents[sci];
      for (let sbi = 0; sbi < safeContents.safeBags.length; ++sbi) {
        const safeBag = safeContents.safeBags[sbi];
        if (safeBag.type === forge.pki.oids.keyBag) {
          // Found plain private key
          privateKey = safeBag.key;
        } else if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
          // found encrypted private key
          privateKey = safeBag.key;
        } else if (safeBag.type === forge.pki.oids.certBag) {
          // this bag has a certificate...
          cert = safeBag.cert;
        }
      }
    }
    const pem = forge.pki.certificateToPem(cert);
    return {pem, privateKey};
  }
}
export default new SignServices();
