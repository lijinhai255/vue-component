/**
  @file 全局共用ts类型
 */
export interface BackendResponse<T> {
  code: number;
  data: T;
  msg: string;
  status: string;
}
