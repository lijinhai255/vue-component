import { RolesList } from '@/views/base/base-admin/Show/interfaceJson';
import { OrganSearchParamsOwer } from '../views/auth/organization/service';
// import { TreeAddForm } from '../views/auth/routeAuth/service';
import { request, Qrequest } from './request';
// import {  } from './qibinrequest';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const middle_login = (params: {
  password: string;
  username: string;
}) => {
  return request({
    url: '/login',
    data: params,
    method: 'post',
  });
};

export const logoutSend = () => {
  return request({
    url: '/auth/logout',
    method: 'POST',
  });
};

// 获取权限管理的tree信息
export const apiGetTreeList = <T>(params: { status: string }) => {
  return request<T>({
    url: '/system/menu/list',
    method: 'get',
    params,
  });
};
//
export const apiRoleAdd = <T>(data: {
  menuIds: number[];
  roleName: string;
  remark: string;
}) => {
  return request<T>({
    url: '/system/role/add',
    method: 'POST',
    data,
  });
};
// 角色详情
// /system/role/query
export const apiRoleQuery = (params: { id: string }) => {
  return request<{
    code: number;
    msg: string;
    data: {
      keys: string[];
      mainKeys: string[];
      role: { orgType: number };
    };
  }>({
    url: '/system/role/query',
    method: 'get',
    params,
  });
};
export const apiRoleDelete = (params: { roleId: number | undefined }) => {
  return request<{ code: number; msg: string }>({
    url: '/system/role/delete',
    method: 'GET',
    params,
  });
};
export const apiRoleCheck = <T>(params: number | string) => {
  return request<T>({
    url: `/system/role/${params}`,
    method: 'GET',
  });
};
export const apiRoleEdit = <T>(data: {
  roleId: number | undefined;
  roleName: string;
  menuIds: number[];
  remark: string;
}) => {
  return request<T>({
    url: `system/role/edit`,
    method: 'POST',
    data,
  });
};
// 新增权限管理的权限
export const apiAddTreeList = (params: {
  parentId: string | number | null;
  menuType: string | number;
  orderNum: string | number;
  perms?: string;
  path?: string;
  status?: string;
  remark?: string;
  title: string;
}) => {
  return request<{ code: number; msg: string }>({
    url: '/system/menu/add',
    data: params,
    method: 'post',
  });
};

// 修改权限管理的权限
export const apiEditTreeList = (params: {
  title: string;
  key: string | number;
  menuType: string | number;
  orderNum: string | number;
  perms?: string;
  path?: string;
  component?: string;
  status?: string;
  remark?: string;
  isFrame?: number | string;
}) => {
  return request<{ code: number | string; msg: string }>({
    url: `/system/menu/update`,
    data: params,
    method: 'post',
  });
};
// 3.删除权限
// 删除权限管理的节点
export const apiDeleteTreeList = (params: { key: number | string }) => {
  return request<{ code: number; msg: string }>({
    url: `/system/menu/${params.key}`,
    method: 'get',
  });
};

// 获取组织管理的列表数据
export const apiGeTorganizationList = <T>(params: OrganSearchParamsOwer) => {
  return request<T>({
    url: 'user/enterprise/admin/',
    params,
    method: 'get',
  });
};

// 获取当前表格中列表的详细信息
export const apiGeTorganizationListDeatil = <T>(id: number) => {
  return request<T>({
    url: `/user/enterprise/admin/${id}/`,
    method: 'get',
  });
};

// 修改当前企业的权限配置信息
export const apiEditorganizationListDeatil = <T>(
  id: number,
  data: { menus_ids: number[] },
) => {
  return request<T>({
    url: `/user/enterprise/admin/${id}/`,
    data,
    method: 'put',
  });
};
// 获取路由
export const apiMenuList = <T>() => {
  return request<T>({
    url: `/system/permission/getRouter`,
    method: 'GET',
  });
};
export const apiGetRoleTreeList = (params: { orgType: number }) => {
  return request<{
    code: number;
    data: {
      checkedList: string[];
      tree: {
        code: number;
        name: string;
        pcode: number;
        permissionCode: string;
        perms: string;
      }[];
    };
    msg: string;
  }>({
    url: '/system/permission/getOrgPermissions',
    method: 'get',
    params,
  });
};
// /system/permission/getAllPermissions
export const apiGetAllPermissions = (params: { orgType: number }) => {
  return request<{
    code: number;
    data: {
      checkedList: string[];
      tree: {
        code: number;
        name: string;
        pcode: number;
        permissionCode: string;
        perms: string;
      }[];
    };
    msg: string;
  }>({
    url: '/system/permission/getAllPermissions',
    method: 'get',
    params,
  });
};
export const apiresetPwd = <T>(params: { userId: string | number }) => {
  return request<T>({
    url: `system/user/resetPwd`,
    method: 'GET',
    params,
  });
};
interface QueryPage {
  page: number;
  size: number;
}
export const queryByPage = <T>(data: QueryPage) => {
  return Qrequest<T>({
    url: `/industry/queryByPage`,
    method: 'POST',
    data,
  });
};
export const classifyqueryByPage = <T>(data: QueryPage) => {
  return Qrequest<T>({
    url: `/classify/queryByPage`,
    method: 'POST',
    data,
  });
};
export const modulequeryByPage = <T>(data: QueryPage) => {
  return Qrequest<T>({
    url: `/module/queryByPage`,
    method: 'POST',
    data,
  });
};
interface TypeClassifyModuleTable {
  classifyId: number | string;
  industryId: number | string;
  moduleName: number | string;
  page: number;
  size: number;
}
export const classifyModuleTable = <T>(data: TypeClassifyModuleTable) => {
  return Qrequest<T>({
    url: `/classifyModuleTable/queryByPage`,
    method: 'POST',
    data,
  });
};
export const cpList = <T>(params: { id: number | string }) => {
  return Qrequest<T>({
    url: `/classifyModuleTable/cpList`,
    method: 'GET',
    params,
  });
};
interface TypeProcessModel {
  page: number;
  size: number;
  industryId: number | string;
  moduleName: number | string;
}
export const processModel = <T>(data: TypeProcessModel) => {
  return Qrequest<T>({
    url: `/processModel/queryDischargeTable`,
    method: 'POST',
    data,
  });
};
export const processModelqueryByPage = <T>(data: {
  industryId: string | number;
}) => {
  return Qrequest<T>({
    url: `/processModel/queryByPage`,
    method: 'POST',
    data,
  });
};
export const processModeladd = <T>(data: {
  industryId: string;
  modelName: string;
  ordernum: string;
  list: any[];
}) => {
  return Qrequest<T>({
    url: `/processModel/add`,
    method: 'POST',
    data,
  });
};
export const processModelcp = <T>(data: { id: string; parentId: string }) => {
  return Qrequest<T>({
    url: `/processModel/cp`,
    method: 'POST',
    data,
  });
};
export const processModeledit = <T>(data: {
  id: string;
  delflag: number;
  modelId: string;
}) => {
  return Qrequest<T>({
    url: `/processModel/edit`,
    method: 'POST',
    data,
  });
};
export const classifyModelProcesscp = <T>(data: {
  id: string;
  classifyId: string;
}) => {
  return Qrequest<T>({
    url: `/classifyModelProcess/cp`,
    method: 'POST',
    data,
  });
};
export const classifyModelProcessqueryByTree = <T>(data: {
  id: string;
  classifyId: string;
  industryId: string;
}) => {
  return Qrequest<T>({
    url: `/classifyModelProcess/queryByTree`,
    method: 'POST',
    data,
  });
};
// 新增模块-行业分类下拉
export const classifyqueryByPageindustryId = <T>(data: {
  industryId: string;
  page: string | number;
  size: string | number;
}) => {
  return Qrequest<T>({
    url: `/classify/queryByPage`,
    method: 'POST',
    data,
  });
};

// classifyModelProcess/queryByTree
// 新增模块-LCA使用模块下拉
export const classifyModelProcessqueryByTreeLca = <T>(data: {
  industryId: string | number;
  classifyId: string | number;
}) => {
  return Qrequest<T>({
    url: `classifyModelProcess/queryByTree`,
    method: 'POST',
    data,
  });
};
// 新增模块-LCA使用模块下拉
export const classifyModelProcessadd = <T>(data: {
  industryId: string | number;
  classifyId: string | number;
  hasModuleIds: any[];
  feignId: string | number | null;
  industringName: string;
  classifyName: string;
  moduleName: string;
}) => {
  return Qrequest<T>({
    url: `/classifyModelProcess/add`,
    method: 'POST',
    data,
  });
};
//  /classifyModuleTable/deleteById
export const classifyModelProcessdeleteById = <T>(data: {
  id: string | number;
  delflag: string | number;
}) => {
  return Qrequest<T>({
    url: `/classifyModuleTable/deleteById`,
    method: 'POST',
    data,
  });
};
// 编辑LCA数据
export const modelMaterialsqueryByPage = <T>(data: {
  industryId: string | number;
  classifyId: string | number;
  page: string | number;
  size: string | number;
  processId: string | number;
  moduleId: string | number;
  productivityType: string | number | null;
}) => {
  return Qrequest<T>({
    url: `/modelMaterials/queryByPage`,
    method: 'POST',
    data,
  });
};
// 编辑LCA数据
export const modelMaterialsqueryFactor = <T>(data: {
  name: string | number;
  institutionShort: string | number;
  year: string | number;
  area: string | number | null;
  type: string | number;
  page: string | number | null | undefined;
  size: string | number | null | undefined;
}) => {
  return Qrequest<T>({
    url: `/modelMaterials/queryFactor`,
    method: 'POST',
    data,
  });
};

export const modelMaterialsqueryFactorDic = <T>(data: {
  type: number | string;
}) => {
  return Qrequest<T>({
    url: `/modelMaterials/queryFactorDic`,
    method: 'POST',
    data,
  });
};
export const measureDicqueryByPage = <T>(data: { measureName: string }) => {
  return Qrequest<T>({
    url: `/measureDic/queryByPage`,
    method: 'POST',
    data,
  });
};

export const modelMaterialsadd = <T>(data: {
  distance: string | number | null;
  maMeasure: string | number | null;
  materialName: string | number | null;
  measurement: string | number | null;
  transportMachine: string | number | null;
  weight: string | number | null;
  cCarbonFactor: any;
  diMeasure: string | number | null;
  divisor: string | number | null;
}) => {
  return Qrequest<T>({
    url: `/modelMaterials/add`,
    method: 'POST',
    data,
  });
};

export const measureDicjudgeUnit = <T>(data: {
  measureName: string | number | null;
  unit: string | number | null;
  judge: string | number | null;
}) => {
  return Qrequest<T>({
    url: `/modelMaterials/judgeUnit`,
    method: 'POST',
    data,
  });
};
// LCA单条数据查询
export const modelMaterialsqueryById = <T>(params: {
  id: string | number | null;
}) => {
  return Qrequest<T>({
    url: `/modelMaterials/queryById`,
    method: 'GET',
    params,
  });
};
export const modelMaterialsdeleteById = <T>(params: {
  id: string | number | null;
}) => {
  return Qrequest<T>({
    url: `/modelMaterials/deleteById`,
    method: 'GET',
    params,
  });
};
export const cpModelMaterials = <T>(params: { id: string | number | null }) => {
  return Qrequest<T>({
    url: `/modelMaterials/cpModelMaterials`,
    method: 'GET',
    params,
  });
};
// 编辑
export const modelMaterialsEdit = <T>(data: {
  distance: string | number | null;
  maMeasure: string | number | null;
  materialName: string | number | null;
  measurement: string | number | null;
  transportMachine: string | number | null;
  weight: string | number | null;
  cCarbonFactor: any;
  diMeasure: string | number | null;
  id: string | number | null;
  divisor: string | number | null;
}) => {
  return Qrequest<T>({
    url: `/modelMaterials/edit`,
    method: 'POST',
    data,
  });
};
export const queryDischargeModelsById = <T>(params: {
  id: string | number | null;
}) => {
  return Qrequest<T>({
    url: `/processModel/queryDischargeModelsById`,
    method: 'GET',
    params,
  });
};

// 李娟==============基础
// 修改密码
export const modify_password = (params: {
  oldPassword?: string;
  newPassword: string;
}) => {
  return request({
    url: '/system/user/modify/password',
    data: params,
    method: 'post',
  });
};
// 找回密码
export const modify_reset = (params: {
  password: string | undefined;
  username: string | undefined;
  vfcode: string | undefined;
}) => {
  return request({
    url: '/auth/reset',
    data: params,
    method: 'post',
  });
};
export const modify_mobile = (params: {
  id: string | undefined;
  mobile: string | undefined;
}) => {
  return request({
    url: '/system/user/modify/mobile',
    data: params,
    method: 'post',
  });
};
// 找回密码
export const org_tree = (params: {
  likeOrgName?: string | undefined;
  orgType?: string | undefined;
}) => {
  return request({
    url: '/system/org/tree',
    data: params,
    method: 'GET',
  });
};
export function role_list(params: { orgType?: string | number | undefined }) {
  return request<{
    code: number;
    msg: string;
    data: RolesList['userList'];
  }>({ url: '/system/role/list', params, method: 'GET' });
}

export const user_detail = (params: { id: string }) => {
  return request({
    url: '/system/user/detail',
    params,
    method: 'GET',
  });
};
export const org_detail = (params: { id: string }) => {
  return request({
    url: '/system/org/detail',
    params,
    method: 'GET',
  });
};
export const audit_detail = (params: { id: string }) => {
  return request({
    url: '/system/enterprise/audit/detail',
    params,
    method: 'GET',
  });
};
export function user_create(data: {
  orgType?: string | number | undefined;
  orgId?: string | number | undefined;
  roleIds?: string | number | undefined;
  username?: string | number | undefined;
}) {
  return request<{
    code: number;
    msg: string;
    data: RolesList['userList'];
  }>({ url: '/system/user/create', data: data, method: 'POST' });
}
export function user_edit(data: {
  id?: string | number | undefined;
  roleIds?: string | number | undefined;
}) {
  return request<{
    code: number;
    msg: string;
    data: RolesList['userList'];
  }>({ url: '/system/user/edit', data: data, method: 'POST' });
}
export function org_create(data: {
  bankOrgId?: string[] | number[] | undefined;
  contactEmail?: string | number | undefined;
  contactName?: string | number | undefined;
  orgName?: string | number | undefined;
  orgType?: string | number | undefined;
}) {
  return request<{
    code: number;
    msg: string;
    data: RolesList['userList'];
  }>({ url: '/system/org/create', data: data, method: 'POST' });
}
