/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
import { request } from '@/api/requestMd';
//查询项目对应參數配置详情 dateType,可用值:1,2,3,4
export function apiStatistics(
  params: { dateType: string },
  current: 1 | 2 | 3,
) {
  let str = '';
  if (Number(current) === 1) {
    str = '/system/enterprise/statistics';
  }
  if (Number(current) === 2) {
    str = '/reduction/dashboard/project/statistics';
  }
  if (Number(current) === 3) {
    str = '/reduction/dashboard/reduction/statistics';
  }
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      xaxis: string[];
      yaxis: string[];
    };
    total: number;
  }>({
    method: 'get',
    url: str,
    params,
  });
}
export function apiDashboardData() {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      entOrgNum: string;
      entTodayAdd: String;
      projectTotal: string;
      reductionEffect: string;
    };
    total: number;
  }>({
    method: 'get',
    url: '/reduction/dashboard/data',
  });
}
