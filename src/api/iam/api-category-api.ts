import {del, get, post, put} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";


const api = {
  apiCategories: ApiBase.iam + '/v1/api/categories',
  apiCategoryCreate: ApiBase.iam + '/v1/api/categories',
  apiCategoryUpdate: ApiBase.iam + '/v1/api/categories',
  apiCategoryDelete: ApiBase.iam + '/v1/api/categories',
}

export default api

export const getApiCategories = (params) => get({url: api.apiCategories, params})

export const addApiCategory = (data) => post({url: api.apiCategoryCreate, data})

export const deleteApiCategory = (params) => del({url: `${api.apiCategoryDelete}`, params})

export const updateApiCategory = (data) => put({url: api.apiCategoryUpdate, data})


