import {http} from '@/utils/http/axios';

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
  UserInfo: ApiBase.iam + '/v1/user/info',
  UserMenu: ApiBase.iam + '/v1/user/routes'
}

export interface BasicResponseModel<T = any> {
  code: string;
  msg: string;
  data: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: '/admin_info',
    //url: userApi.UserInfo,
    method: 'get',
  });
}

interface LoginResponse {
  accessToken: string,
  expires: number
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request<BasicResponseModel<LoginResponse>>(
    {
      // url: '/login',
      url: userApi.Login,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: userApi.Logout,
    method: 'POST',
    params,
  });
}
