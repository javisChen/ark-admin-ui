import {get, post, put} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";

const api = {
    applications: ApiBase.iam + '/v1/applications',
}

export default api

export const fetchApplications = (params) => get({url: api.applications, params})

export const createApplication = (data) => post({url: api.applications, data})

export const updateApplication = (data) => put({url: api.applications, data})



