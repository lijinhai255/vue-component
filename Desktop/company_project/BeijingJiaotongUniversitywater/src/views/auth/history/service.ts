import { Moment } from 'moment';
import { request } from '@/api/request';
import { PageQueryParams, PageQueryParamsOwer } from '../../../typings';

// 操作日志
export interface OrganSearchParams extends PageQueryParams {
  company_name?: string; // 组织名称
  institutionID?: string; // 组织编号
  phone_numbers?: number; // 负责人电话
}

export interface OrganSearchParamsOwer extends PageQueryParamsOwer {
  company_name?: string; // 组织名称
  institutionID?: string; // 组织编号
  phone_numbers?: number; // 负责人电话
}

// 表格的每一列信息
export interface Column {
  operName: string;
  operTime: string;
  title: string;
  operLogFormat: string;
}

// 查看当前这条列表的详情
export interface ApiOperLogType {
  title: string | null; // 组织名称
  operName: string | null;
  beginTime: [Moment, Moment] | null; // 行业类别
  endTime: [Moment, Moment] | null; // 行业类别; // 行业编号
  pageSize?: number; // 行业规模
  pageNum?: number; // 行业所在地区
}
interface SearchProps {
  moduleType: string | null; // 组织名称
  username: string | null;
  startDate: string | Moment | null; // 行业类别
  endDate: string | Moment | null; // 行业类别; // 行业编号
  pageSize?: number; // 行业规模
  pageNo?: number; // 行业所在地区
}
export function apiOperLog(params: SearchProps) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      total: number;
      list: [];
    };
    total: number;
  }>({
    method: 'get',
    url: '/system/operlog/page',
    params,
  });
}
// 2.操作模块数据查询
export function apiOperlogModuleenums(params: string) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'get',
    url: `/system/enums/${params}`,
  });
}
export function apiOperlogModuleList(params: {
  pageNo: number;
  pageSize: number;
}) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      list: [];
    };
    total: number;
  }>({
    method: 'get',
    params,
    url: '/system/operlog/page',
  });
}
