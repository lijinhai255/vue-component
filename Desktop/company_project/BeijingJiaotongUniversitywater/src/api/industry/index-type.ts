/**
  @file 行业版类型
 */

export interface SysDictData {
  count: number;
  next: null;
  previous: null;
  results: SysDictDataResult[];
  projectId?: string;
}

export interface SysDictDataResult {
  loanAmount: string;
  totalAmount: string;
  id: number;
  area?: string;
  auditStatus?: string;
  auditUser?: string;
  business?: string;
  countries?: string;
  facilities?: string;
  factorId?: string;
  factorIsNew?: string;
  factorType?: string;
  institution?: string;
  name?: string;
  sourceLevel?: string;
  updateTime?: string;
  year?: string;
  userStatus?: string;
  recordId?: number;
  projectId?: string;
  reportStatus_name?: string;
  is_active?: boolean;
}

export type SysDictUpdatePayload = {
  id: number | string;
  is_forbid: boolean;
  dict_data_name: string;
  dict_data_value: string;
  apply_product: string;
};
