import { PageQueryParams, PageQueryParamsOwer } from '../../../typings';
import { TreeAddForm } from '../routeAuth/service';

// 搜索的类型信息
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
  institutionID: string;
  company_name: string;
  createTime: string;
  phone_numbers: string;
  type: string;
  serveState: string;
  pk: number; // 当前表单的唯一标识
}

// 表格数据
export interface ApiTableResult {
  total: number;
  next?: string;
  previous?: any;
  data: Column[];
}

// 查看当前这条列表的详情
export interface listDetatils {
  company_name: string; // 组织名称
  id: number;
  industry: string; // 行业类别
  institutionID: string; // 行业编号
  personnel_size: string; // 行业规模
  location: string; // 行业所在地区
  phone_numbers: string; // 负责人账号
  menus_list: TreeAddForm[]; // tree的信息
}
export interface checkTreeIdKeys {
  keys: string[]; // 当前选中的key集合
  ids: number[]; // 当前选中的id集合
}
