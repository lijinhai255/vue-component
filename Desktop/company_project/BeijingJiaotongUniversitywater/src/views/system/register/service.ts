/**
 * @file 注册接口
 */
/* eslint-disable */
import { request } from '../../../api/request';
import { apiSystemOrgDetailJSON } from './interfaceJson';
/* eslint-enable */

export interface CreateUserData {
  account: string;
  password: string;
  mobile: string;
  code: string;
}

export interface CreateUserResponse {
  id: number;
}

export function apiCreateUser(data: CreateUserData) {
  return request<CreateUserResponse>({
    method: 'POST',
    url: '/user/register',
    data,
  });
}

export function apiAddress() {
  return request<{
    code: number;
    data: {
      addressCode: number;
      addressLevel: number;
      addressName: string;
      pcode: number;
    }[];
  }>({
    method: 'get',
    url: '/system/lib/address/tree',
  });
}
//地址库查询
export function apiAddressCode(params: { addressCode: string }) {
  return request<{
    code: number;
    data: {
      name: string;
      addressLevel: number;
      addressName: string;
      pcode: number;
    }[];
  }>({
    method: 'get',
    url: '/system/lib/address/code',
    params,
  });
}
//注册企业-新增
export interface EnterpriseCreate {
  businessLicense?: string;
  contactEmail?: string;
  contactMobile?: string;
  contactName?: string;
  creditCode?: string;
  id?: string;
  legalRepresentative?: string;
  orgName?: string;
  produceAddress?: string;
  produceAreaCode?: string;
  regAddress?: string;
  regAreaCode?: string;
}
export function apiEnterpriseCreate(data: EnterpriseCreate) {
  return request<{
    code: number;
    data: {
      addressCode: number;
      addressLevel: number;
      addressName: string;
      pcode: number;
    }[];
    msg: string;
  }>({
    method: 'post',
    url: '/system/enterprise/reg/create',
    data,
  });
}
// 获取组织详情
interface SystemOrgDetailType {
  id: string;
}
export function apiSystemOrgDetail(params: SystemOrgDetailType) {
  return request<{
    code: number;
    data: apiSystemOrgDetailJSON;
    msg: string;
  }>({
    method: 'GET',
    url: '/system/org/detail',
    params,
  });
}
//注册企业-编辑
export function apiEnterpriseRegEdit(data: EnterpriseCreate) {
  return request<{
    code: number;
    data: {
      createTime?: string;
      addressLevel: number;
      addressName: string;
      pcode: number;
      auditContent?: string;
      businessLicense?: any;
      contactEmail?: string;
      contactMobile?: string;
      contactName?: string;
      creditCode?: string;
      regCodes?: string[];
      regAreaCode?: string;
      orgName?: string;
      legalRepresentative?: string;
      regAddress?: string;
      produceCodes?: string[];
      produceAddress?: string;
    };
    msg: string;
  }>({
    method: 'POST',
    url: '/system/enterprise/reg/edit',
    data,
  });
}
// 企业变更审核
interface EnterpriseAudiType {
  auditContent: string;
  auditPass: string;
  id: string;
}
export function apiEnterpriseAudit(data: EnterpriseAudiType) {
  return request<{
    code: number;
    data: {};
    msg: string;
  }>({
    method: 'POST',
    url: '/system/enterprise/audit',
    data,
  });
}
export function apiorgAudit(data: EnterpriseAudiType) {
  return request<{
    code: number;
    data: {};
    msg: string;
  }>({
    method: 'POST',
    url: '/system/org/audit',
    data,
  });
}
export function apiEnterpriseEdit(data: EnterpriseCreate) {
  return request<{
    code: number;
    data: {};
    msg: string;
  }>({
    method: 'POST',
    url: '/system/enterprise/info/edit',
    data,
  });
}
// /reduction/area/param
export function apiAreaParam(params: { addressCode: string }) {
  return request<{
    code: number;
    data: {
      addressCode: string;
      addressId: string;
      createTime: string;
      id: string;
      locationFactor: string;
      updateTime: string;
      yearHours: string;
    };
    msg: string;
  }>({
    method: 'get',
    url: '/reduction/area/param',
    params,
  });
}
