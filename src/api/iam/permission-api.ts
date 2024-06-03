import {get} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";

const api = {
  permissionsElement: ApiBase.iam + '/permission/elements',
}

export default api

export const getPageElementPermission = (params) => get({url: api.permissionsElement, params})

