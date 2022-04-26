import { AxiosResponse } from 'axios';
import { request } from '../../../api/request';
import {
  QueryListResponseData,
  PageQueryParams,
  ResponceDataType,
} from '../../../typings';
import { Menu } from '../menu/service';

export interface Role {
  id?: number;

  name: string;
}

export interface RoleSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  url?: string;
  level?: number;
  parentId?: number;
}

export function apiGetRoleList(params?: RoleSearchParams) {
  return request<QueryListResponseData<Role>>({
    method: 'GET',
    url: '/role',
    params,
  });
}

export function apiUpdateRole(data: Role) {
  return request({
    method: 'PUT',
    url: '/role',
    data,
  });
}

export function apiCreateRole(data: Role) {
  return request({
    method: 'POST',
    url: '/role',
    data,
  });
}

export function apiRemoveRole(id: number) {
  return request({
    method: 'DELETE',
    url: `/role/${id}`,
  });
}

export function apiGetMenuListByRoleId(id: number) {
  return request<{ list: Menu[]; ids: number[] }>({
    method: 'GET',
    url: `/role/menu/${id}`,
  });
}

export function apiUpdateMenuListByRoleId(roleId: number, menuIds: number[]) {
  return request({
    method: 'PUT',
    url: `/role/menu/${roleId}`,
    data: {
      menuIds,
    },
  });
}

interface AddRoleType {
  roleName: string;
  companyId: string;
}
interface RoleListType {
  userId: string;
  companyId: string;
}
interface SetRolePermissionType {
  roleId: string;
  permissionId: string;
}

// 自定义角色
export function apiAddRole(data: AddRoleType) {
  return request<ResponceDataType<{ total: number; page: string; data: [] }>>({
    method: 'POST',
    url: '/addRole',
    data,
  });
}
// 角色列表
export function apiRoleList(data: RoleListType) {
  return request<ResponceDataType<{ total: number; page: string; data: [] }>>({
    method: 'POST',
    url: '/roleList',
    data,
  });
}

// 角色分配权限
export function apiSetRolePermission(data: SetRolePermissionType) {
  return request<AxiosResponse<{ total: number; page: string; data: [] }>>({
    method: 'POST',
    url: '/setRolePermission',
    data,
  });
}
