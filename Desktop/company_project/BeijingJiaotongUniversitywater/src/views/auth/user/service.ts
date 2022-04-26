import { request } from '../../../api/request';
import { QueryListResponseData } from '../../../typings';
import { Menu } from '../menu/service';

export interface User {
  userId?: number;
  loginDate?: string;
  phonenumber?: string | number;
  nickName?: string | null;
  postIds?: string | null;
  password?: string;

  avatar?: string | null;

  mobile?: string;

  roleId?: number;
  userName?: string;
  dept?: {
    deptName: number;
    leader: string;
  };
  status?: number;
}
export interface PageQueryNum {
  pageSize?: number;
  pageNum?: number;
}
export interface UserSearchParams extends PageQueryNum {
  userName?: string;
  nickName?: number;
  phonenumber?: string;
  status?: number;
}
export interface UserCheck {
  userId: number;
}
// 李娟
export function apiGetUserList(params?: UserSearchParams) {
  return request<QueryListResponseData<User>>({
    method: 'GET',
    url: '/system/user/list',
    params,
  });
}

export function apichangeStatus(params?: {
  userId: number | string | undefined;
  status: string | number | undefined;
}) {
  return request<QueryListResponseData<User>>({
    method: 'GET',
    url: '/system/user/changeStatus',
    params,
  });
}
// 李娟-新增用户，查询基础配置信息
export function getAddUserInfo() {
  return request<QueryListResponseData<User>>({
    method: 'GET',
    url: '/system/user/getAddUserInfo',
  });
}
// 李娟
export function apiGetRoleList(params?: PageQueryNum) {
  return request<QueryListResponseData<User>>({
    method: 'GET',
    url: '/system/role/list',
    params,
  });
}
export function apiUpdateUser(data: User) {
  return request({
    method: 'PUT',
    url: '/user',
    data,
  });
}

export function apiCreateUser(data?: User) {
  return request({
    method: 'POST',
    url: '/system/user/add',
    data,
  });
}
export function changeStatus(data?: User) {
  return request({
    method: 'POST',
    url: '/system/user/edit',
    data,
  });
}
export function apiEditeUser(userId?: number | undefined) {
  return request({
    method: 'GET',
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    url: `/system/user/${userId}/`,
  });
}

export function apiRemoveUser(id: number) {
  return request({
    method: 'DELETE',
    url: `/user/${id}`,
  });
}
export function updatePwd(data: { newPassword: string }) {
  return request({
    method: 'POST',
    url: `/system/user/updatePwd`,
    data,
  });
}
export function apiGetMenuList() {
  return request<{ list: Menu[]; ids: number[] }>({
    method: 'GET',
    url: '/user/menu',
  });
}
