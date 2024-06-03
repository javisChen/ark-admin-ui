import {del, get, post, put} from '@/utils/http/axios';
import ApiBase from "@/api/api-base";

const api = {
  routesAll:ApiBase.iam + '/v1/menus/all',
  routes:ApiBase.iam + '/v1/menus',
  routeCreate:ApiBase.iam + '/v1/menus',
  routeUpdate:ApiBase.iam + '/v1/menus',
  route:ApiBase.iam + '/v1/menus/details',
  routeDelete:ApiBase.iam + '/v1/menus',
  routeStatus:ApiBase.iam + '/v1/menus/status',
  routeElements:ApiBase.iam + '/v1/menus/elements',
}

export default api

export const getRoutesTree = (data) => post({url: api.routesAll, data})

export const getRoutes = (params) => get({url: api.routes, params})

export const getRoute = (params) => get({url: `${api.route}`, params})

export const addRoute = (data) => post({url: api.routeCreate, data})

export const deleteRoute = (params) => del({url: api.routeDelete, params})

export const updateRoute = (data) => put({url: api.routeUpdate, data})

export const updateRouteStatus = (data) => put({url: api.routeStatus, data})

export const getRouteElements = (params) => get({url: api.routeElements, params})


