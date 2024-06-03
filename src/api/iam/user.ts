import {del, get, http, post, put} from '@/utils/http/axios';
import UserRequest from "@/api/iam/model/userModel";
import ApiBase from "@/api/api-base";

const api = {
  users: ApiBase.iam + '/v1/users',
  userDetails: ApiBase.iam + '/v1/users/details',
  userSelf: ApiBase.iam + '/v1/users/self',
  userSelfMenus: ApiBase.iam + '/v2/users/self/menus',
  userPermissionElements: ApiBase.iam + '/v1/users/self/elements',
}

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return http.request({
    url: api.userSelfMenus,
    method: 'GET',
  });
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params: any) {
  return http.request({
    url: '/menu/list',
    method: 'GET',
    params,
  });
}


export default api

export const fetchUsers = (params: any) => get({url: api.users, params})

export const fetchUser = (params: any) => get({url: api.userDetails, params})

export const deleteUser = (params: any) => del({url: api.users, params})

export const fetchUserInfo = (params: any) => get({url: api.userSelf, params})

export const fetchUserRoutes = (params: any) => get({url: api.userSelfMenus, params})

export const getUserPageElementPermissions = (params: any) => get({
  url: api.userPermissionElements,
  params
})

export const createUser = (data: UserRequest) => post({url: api.users, data})

export const updateUser = (data: UserRequest) => put({url: api.users, data})
