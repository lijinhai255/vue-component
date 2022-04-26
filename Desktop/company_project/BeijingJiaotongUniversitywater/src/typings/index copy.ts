import { ColumnsType } from 'antd/lib/table/interface';

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface ResponceDataType<T> {
  code: string;
  msg: string;
  data: T[];
}

export interface PageQueryParams {
  page: number;
  size: number;
}

export interface PageQueryParamsOwer {
  page: number;
  page_size: number;
}

export interface PageResponseData {
  dataTotal?: number;
  pageTotal?: number;
  page?: number;
  size?: number;
}

export interface QueryListResponseData<T> {
  list: T[];
  page: PageResponseData;
}
export interface TableData<T> {
  dataSources: T[];
  columns: ColumnsType<T>;
}
