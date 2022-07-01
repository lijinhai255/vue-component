import { AxiosResponse } from 'axios';
import { request } from '../../../api/request';
import {
  QueryListResponseData,
  PageQueryParams,
  ResponceDataType,
} from '../../../typings';
import { Menu } from '../menu/service';

export type TreeItemType = {
  cache?: boolean;
  component_path?: string;
  create_time?: string;
  creator?: null | string | number;
  creator_dept_id?: number;
  creator_name?: null;
  creator_organization_id?: number;
  creator_post_id?: number;
  description?: string;
  hidden?: string | boolean;
  icon?: string;
  id?: number;
  permissionId?: number;
  ident?: string;
  isFrame?: string;
  is_link?: string | boolean;
  is_need_id?: boolean;
  kind?: number;
  name?: string;
  orderNum: number;
  parentId?: null | number;
  status?: string | number;
  title?: string;
  tree_path?: string;
  update_time?: string;
  visible?: string | boolean;
  web_path?: string;
  children: TreeItemType[];
  key?: number | string | undefined;
  permissionName: string;
  menuId: number;
  menuType: string;
  value: number;
  auth?: number;
  base?: number;
  path?: string;
  perms?: null | string;
  query?: null | string;
  remark?: string;
  type?: string;
  updateBy?: string;
  updateTime?: string | null;
  component?: string;
};
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

export function apiGetRoleList(params?: PageQueryParams) {
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
// interface RoleListType {
//   userId: string;
//   companyId: string;
// }
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
export function apiRoleList(data: { pageNum: number; pageSize: number }) {
  return request<ResponceDataType<{ total: number; page: string; data: [] }>>({
    method: 'POST',
    url: '/system/role/list',
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

// 权限层级树列表
export function apiGetMenus() {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: TreeItemType[];
  }>({
    method: 'get',
    url: '/system/menus/',
  });
}
// 新增角色
interface AccountAddType {
  name?: string | number | undefined;
  description: string;
  menus: [];
}
export function apiRoleAdd(data: AccountAddType) {
  return request<{
    code: number;
    msg: string;
    data: any;
    status: string;
  }>({
    method: 'post',
    url: '/organization/role/',
    data,
  });
}
// 编辑角色
export function apiRoleEdit(data: AccountAddType & { id?: number | string }) {
  return request<{
    code: number;
    msg: string;
    data: any;
    status: string;
  }>({
    method: 'put',
    url: `/organization/role/${data.id}/`,
    data,
  });
}
// 获取角色详情
export const apiRoleDetail = (params: { id: string }) => {
  return request<{
    code: number;
    msg: string;
    data: {
      menus: [];
    };
  }>({
    url: `/organization/role/${params.id}/`,
    params,
    method: 'GET',
  });
};
