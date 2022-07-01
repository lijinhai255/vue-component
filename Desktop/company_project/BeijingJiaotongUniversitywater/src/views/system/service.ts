import { request } from '@/api/request';
// 表格的每一列信息

export function apiVfcode(params: { mobile: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'get',
    url: '/auth/mobile/vfcode',
    params,
  });
}
interface RegerterType {
  password?: string;
  username?: string;
  vfcode?: string;
}
export function apiRegister(data: RegerterType) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      accessToken: string;
      expiresIn: string;
      hasPassword: number;
      hasPassword_name: string;
      orgName: string;
      orgStatus: string;
      orgType: string;
      orgType_name: string;
    };
    total: number;
  }>({
    method: 'post',
    url: '/auth/ent/register',
    data,
  });
}
// 登录接口
interface LoginType {
  password?: string;
  username?: string;
  vfcode?: string;
}
const loginResult = {
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InN0cmluZyIsInNlc3Npb25faWQiOiI2MjkzNTcyZS1iOTM1LTRlYWItYmExZS1jMzgwYmZhZmY5ZmIiLCJleHAiOjE2NTEyMTM1MTN9.yLR4k-fESQYFCzxGEfKuvhUNuoxrF-0LTPd7akTwrBI',
  user: {
    id: 2,
    username: 'string',
    nick_name: 'string',
    is_first_login: true,
  },
};
export type LoginResultType = typeof loginResult;
export function apiLogin(data: LoginType) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: LoginResultType;
  }>({
    method: 'post',
    url: `/organization/api-token-auth/`,
    data,
  });
}
// 修改密码
interface AccountPwdType {
  confirm_password: string;
  new_password: string;
  old_password: string | number | undefined;
}
export function apiAccountPwd(data: AccountPwdType) {
  return request<{
    code: number;
    msg: string;
    data: any;
    status: string;
  }>({
    method: 'post',
    url: '/organization/account/modify_password/',
    data,
  });
}
// 获取账号详情信息
export const apiAccountDetail = (params: any) => {
  return request({
    url: `/organization/account/my_account/`,
    params,
    method: 'GET',
  });
};
