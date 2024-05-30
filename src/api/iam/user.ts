import {del, get, http, post, put} from '@/utils/http/axios';
import UserRequest from "@/api/iam/model/userModel";

const Base: any = {
  serviceName: '/iam'
}

const api = {
  users: Base.serviceName + '/v1/users/pages',
  user: Base.serviceName + '/v1/users/details',
  createUser: Base.serviceName + '/v1/users/create',
  updateUser: Base.serviceName + '/v1/users/update',
  userInfo: Base.serviceName + '/v1/users/self',
  userSelfMenus: Base.serviceName + '/v2/users/self/menus',
  userPermissionElements: Base.serviceName + '/v1/users/self/elements',
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
export function getMenuList(params?) {
  return http.request({
    url: '/menu/list',
    method: 'GET',
    params,
  });
}


export default api

export const getUsers = (params) => get({url: api.users, params})

export const getUser = (params) => get({url: api.user, params})

export const deleteUser = (params) => del({url: api.user, params})

export const getUserInfo = (params) => get({url: api.userInfo, params})

export const getUserRoutes = (params) => get({url: api.userSelfMenus, params})

export const getUserPageElementPermissions = (params) => get({
  url: api.userPermissionElements,
  params
})

export const createUser = (data : UserRequest) => post({url: api.createUser, data})

export const updateUser = (data : UserRequest) => put({url: api.updateUser, data})
