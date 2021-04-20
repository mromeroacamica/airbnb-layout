import config from '../../config/env/environment';
import HttpService from '../http/HttpService';
import SessionService from '../session/SessionService';
// import {Utils} from '../../Shared/Utils';

class ProcedureServices {
  constructor() {}
  public async getTotalProceduresCount() {
    const currentUser = SessionService.getCurrentUser();
    const roleId = currentUser.account.currentRole.id;
    const url =
      config.baseUrl + `/api/documents-total?filter[roleId]=${roleId}`;
    const headers = {
      Authorization: `Bearer ${currentUser.token}`,
    };
    const res = await HttpService.get(url, {headers: headers});
    if (res.status == 200) {
      return res.data.total;
    }
    return res;
  }
  public async getProcedures(
    filters = '',
    limit = 10,
    currentPage = 0,
    sort = '',
  ) {
    const response: any = [];

    let url = config.baseUrl + `/api/documents?include=documentType`;
    url += `&page[offset]=${currentPage}`;
    if (limit != 0) {
      url += `&page[limit]=${limit}`;
    }
    url += !!filters
      ? `${filters}${!!sort ? `&${sort}` : '&sort=-creationDate'}`
      : !!sort
      ? `&${sort}`
      : '&sort=-creationDate';
    const currentUser = SessionService.getCurrentUser();
    const headers = {
      Authorization: `Bearer ${currentUser.token}`,
    };
    const res = await HttpService.get(url, {headers: headers});
    console.log(res);
    let body;
    // PROCESANDO LA RESPUESTA - ARMADO LOS REPORTES
    if (res != null && res.status == 200) {
      body = res.body;
      console.log(res);
      return res.data.data;
      for (const procedureItem of body.data) {
        // const objectFound2: any = Utils.searchObjInArray(
        //   res.body.included,
        //   'id',
        //   procedureItem.relationships.documentType.data.id,
        // ).obj;
        // const newProcedureItem = Utils.copyToObj(
        //   new ProcedureItem(),
        //   ProcedureItem.keys(),
        //   procedureItem.attributes,
        // );
        // newProcedureItem.processDefinitionIdentificator =
        //   objectFound2.relationships.processDefinition.data.id;
        // newProcedureItem.accountFullName =
        //   procedureItem.attributes.ownerFullName;
        // newProcedureItem.cuil = procedureItem.attributes.ownerCuil;
        // newProcedureItem.name = objectFound2.attributes.name;
        // newProcedureItem.processTime = procedureItem.attributes.assignmentDate;
        // newProcedureItem.startTime = procedureItem.attributes.creationDate;
        // newProcedureItem.id = procedureItem.id;
        // newProcedureItem.period = procedureItem.attributes.visibleInView;
        // newProcedureItem.documentId = procedureItem.id;
        // newProcedureItem.type = newProcedureItem.processDefinitionName;
        // response.push(newProcedureItem);
        // continue;
      }
    } else {
      return {
        data: response,
        total: response.length,
        error: res.status,
      };
    }

    return {
      data: response,
      total: response.length,
    };
  }
}
export default new ProcedureServices();
