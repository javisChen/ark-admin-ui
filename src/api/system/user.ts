import {http} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";

const api = {
  users: ApiBase.iam + '/v1/users/pages',
  user: ApiBase.iam + '/v1/users/details',
  createUser: ApiBase.iam + '/v1/users/create',
  updateUser: ApiBase.iam + '/v1/users/update',
  userInfo: ApiBase.iam + '/v1/users/self',
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
export function getMenuList(params?) {
  return http.request({
    url: '/menu/list',
    method: 'GET',
    params,
  });
}
