import {del, get, post, put} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";

const api = {
  userGroups: ApiBase.iam + '/v1/userGroups',
  userGroupsDetails: ApiBase.iam + '/v1/userGroups/details',
  userGroupsAll: ApiBase.iam + '/v1/userGroups/all',
  userGroupsTree: ApiBase.iam + '/v1/userGroups/tree',
}
export default api

export const fetchUserGroups = (params) => get({url: api.userGroups, params})

export const fetchUserGroup = (params) => get({url: api.userGroupsDetails, params})

export const fetchAllUserGroups = (data) => get({url: api.userGroupsAll, data})

export const deleteUserGroup = (params) => del({url: api.userGroups, params})

export const getUserGroupsTree = (data) => post({url: api.userGroupsTree, data})

export const addUserGroup = (data) => post({url: api.userGroups, data})

export const updateUserGroup = (data) => put({url: api.userGroups, data})
