import {del, get, post, put} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";


const api = {
  apis: ApiBase.iam + '/v1/apis/all',
  apiDetails: ApiBase.iam + '/v1/apis/details',
  api: ApiBase.iam + '/v1/apis',
  apiEnable: ApiBase.iam + '/v1/apis/status',
  apiSync: ApiBase.iam + '/v1/apis/sync',
}

export default api

export const getApis = (params) => get({url: api.apis, params})

export const addApi = (data) => post({url: api.api, data})

export const enableApi = (data) => put({url: api.apiEnable, data})

export const getApi = (params) => get({url: api.apiDetails, params})

export const deleteApi = (id) => del({url: `${api.api}/${id}`})

export const updateApi = (data) => put({url: api.api, data})

export const syncApi = (data) => post({url: api.apiSync, data})



