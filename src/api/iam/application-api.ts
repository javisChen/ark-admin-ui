import {del, get, post, put} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";

const api = {
  applications: ApiBase.iam + '/v1/applications',
  applicationCreate: ApiBase.iam + '/v1/applications',
  applicationUpdate: ApiBase.iam + '/v1/applications',
  applicationDelete: ApiBase.iam + '/v1/applications',
}

export default api

export const getApplications = (params) => get({url: api.applications, params})

export const addApplication = (data) => post({url: api.applicationCreate, data})

export const deleteApplication = (id) => del({url: `${api.applicationDelete}/${id}`})

export const updateApplication = (data) => put({url: api.applicationUpdate, data})



