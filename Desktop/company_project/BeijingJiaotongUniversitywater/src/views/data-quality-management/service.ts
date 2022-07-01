import { request } from '@/api/request';
import { genFormData } from '@/utils';

interface ListPageType {
  page: number;
  page_size: number;
}

// 组织管理
interface OrganizationPageType {
  ordering?: string;
  search?: string;
}
export function apiOrganizationPage(
  params: OrganizationPageType & ListPageType,
) {
  return request<{
    code: number;
    msg: string;
    data: {
      count: number;
      results: [];
    };
  }>({
    method: 'get',
    url: '/organization/organization_info/',
    params,
  });
}
interface ProductionAddType {
  equipment: [];
  sys_name: string;
  sys_type: number;
  sys_number: string;
}
// 新增生产设备
export function apiProductionAdd(data: ProductionAddType) {
  return request<{
    code: number;
    msg: string;
    status: string;
    data: [];
  }>({
    method: 'POST',
    url: '/data_quality_manage/production_sys_manage/',
    data,
  });
}
// 修改生产设备
export function apiProductionEdit(data: { id: string } & ProductionAddType) {
  return request<{
    code: number;
    msg: string;
    status: string;
    data: [];
  }>({
    method: 'put',
    url: `data_quality_manage/production_sys_manage/${data.id}/`,
    data,
  });
}
// 获取生产管理详情
export function apiProductionQuery(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    status: string;
    data: [];
  }>({
    method: 'get',
    url: `data_quality_manage/production_sys_manage/${params.id}/`,
    params,
  });
}

interface StandardAddType {
  release_time?: string;
  implement_time?: string;
  document?: string | any;
  level: number | string;
  classify: number | string;
  numbers?: string;
  zh_hans_name?: string;
  en_name?: string;
  status: number | string;
  international_numbers: string;
  china_numbers: string;
  unit: string;
  link_address: string;
  remark: string;
}
// 新增行业标准
export function apiStandardAdd(data: StandardAddType) {
  const newData = genFormData(data);
  return request<{
    code: number;
    msg: string;
    status: string;
    data: [];
  }>({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/data_quality_manage/industry_standard/',
    data: newData,
  });
}
// 修改行业标准
export function apiStandardEdit(data: StandardAddType, id: string) {
  const newData = genFormData(data);
  return request<{
    code: number;
    msg: string;
    status: string;
    data: [];
  }>({
    method: 'put',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: `data_quality_manage/industry_standard/${id}/`,
    data: newData,
  });
}
// 获取行业标准详情
export function apiStandardQuery(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    status: string;
    data: any;
  }>({
    method: 'get',
    url: `data_quality_manage/industry_standard/${params.id}/`,
    params,
  });
}

interface QualityControlPageType {
  create_org_id?: number;
  search?: string;
}
// 获取数据质量控制列表
export function apiQualityControlPage(
  params: QualityControlPageType & ListPageType,
) {
  return request<{
    code: number;
    msg: string;
    data: {
      count: number;
      results: [];
    };
  }>({
    method: 'get',
    url: '/data_quality_manage/quality_control/',
    params,
  });
}

// 获取生产工艺列表
export function apiProcessPage(
  params: { quality_control_id: string } & ListPageType,
) {
  return request<{
    code: number;
    msg: string;
    data: {
      count: number;
      results: [];
    };
  }>({
    method: 'get',
    url: '/data_quality_manage/production_process/',
    params,
  });
}
interface ProcessAddType {
  quality_control_id: string;
  name: string;
  flow_chart?: string;
  describe: string;
}
// 新增生产工艺
export function apiProcessAdd(data: ProcessAddType) {
  const newData = genFormData(data);
  return request<{
    code: number;
    msg: string;
    status: string;
    data: [];
  }>({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/data_quality_manage/production_process/',
    data: newData,
  });
}
// 修改生产工艺
export function apiProcessEdit(data: ProcessAddType, id: string | number) {
  const newData = genFormData(data);
  return request<{
    code: number;
    msg: string;
    status: string;
    data: [];
  }>({
    method: 'put',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: `data_quality_manage/production_process/${id}/`,
    data: newData,
  });
}
// 获取生产工艺详情
export function apiProcessQuery(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    status: string;
    data: any;
  }>({
    method: 'get',
    url: `data_quality_manage/production_process/${params.id}/`,
    params,
  });
}
