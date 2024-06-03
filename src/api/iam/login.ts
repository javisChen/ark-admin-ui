import {http} from '@/utils/http/axios'

import ApiBase from "@/api/api-base";


const userApi = {
  Login: ApiBase.auth + '/v1/login/account',
  MobileLogin: ApiBase.auth + '/v1/login/mobile',
  Logout: ApiBase.auth + '/v1/logout',
  ForgePassword: ApiBase.auth + '/v1/auth/forge-password',
  Register: ApiBase.auth + '/v1/auth/register',
  twoStepCode: ApiBase.auth + '/v1/auth/2step-code',
  SendSms: ApiBase.auth + '/v1/code/sms',
  SendSmsErr: ApiBase.auth + '/v1/account/sms_err',
  UserInfo: ApiBase.auth + '/v1/user/info',
  UserMenu: ApiBase.auth + '/v1/user/routes'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return http.request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function mobileLogin(parameter) {
  return http.request({
    url: userApi.MobileLogin,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return http.request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return http.request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav() {
  return http.request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout() {
  return http.request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter) {
  return http.request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
