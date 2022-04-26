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
export function apiLogin(data: LoginType) {
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
    url: '/auth/login',
    data,
  });
}
