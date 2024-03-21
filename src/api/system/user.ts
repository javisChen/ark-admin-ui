import { http } from '@/utils/http/axios';

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
