import { Moment } from 'moment';
export type SearchParams = {
  userName?: string;
  companyName?: string; // 组织名称
  companyNum?: string;
  masterName?: string;
  status?: string;
  beginTime?: string | Moment | null; // 行业类别
  endTime?: string | Moment | null; // 行业类别; // 行业编号
  dict_data_name?: string;
  dict_data_value?: string;
  orderId?: string;
  auditState?: string; //0待审核，1通过，2未通过；
  testFlag?: string; //是否测试： 1是测试，0正常
  likeOrgName?: string;
  likeProjectName?: string;
  username?: string;
  nick_name?: string;
  key?: string | number;
  is_active?: string | number | boolean | undefined;
};

export const unique = <T>(arr: T[]): T[] => {
  const arrMap = new Map();
  arr.forEach((element: T) => {
    if (!arrMap.has(element)) {
      arrMap.set(element, element);
    }
  });
  return Array.from(arrMap.keys());
};
export type DatasItemSearchParams = {
  dict_item_name?: string;
  dict_item_value?: string;
  relevance_value?: string;
  is_forbid?: boolean;
  weights?: string;
};
