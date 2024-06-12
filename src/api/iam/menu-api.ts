import {del, get, post, put} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";

const api = {
  menusAll:ApiBase.iam + '/v1/menus/all',
  menus:ApiBase.iam + '/v1/menus',
  menuDetails:ApiBase.iam + '/v1/menus/details',
  menuStatus:ApiBase.iam + '/v1/menus/status',
  menuElements:ApiBase.iam + '/v1/menus/elements',
}

export default api

export const getRoutesTree = (data) => post({url: api.menusAll, data})

export const fetchMenus = (params) => get({url: api.menus, params})

export const fetchMenu = (params) => get({url: `${api.menuDetails}`, params})

export const createMenu = (data) => post({url: api.menus, data})

export const deleteRoute = (params) => del({url: api.menus, params})

export const updateMenu = (data) => put({url: api.menus, data})

export const updateRouteStatus = (data) => put({url: api.menuStatus, data})

export const getRouteElements = (params) => get({url: api.menuElements, params})


