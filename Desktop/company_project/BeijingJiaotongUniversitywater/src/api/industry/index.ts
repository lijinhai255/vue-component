/**
  @file 行业版接口
  @doc http://192.168.1.50:8989/api/v1/docs/#operation/basedata_basedata_sys_dict_list
 */
import { AxiosPromise } from 'axios';
import { BackendResponse } from '../index-types';
import { request } from '../request';
import { SysDictData, SysDictUpdatePayload } from './index-type';

export const sysDictItem = () =>
  request({
    url: 'basedata/basedata/sys_dict_item/',
  });
// 字典列表
export const sysDict = (): AxiosPromise<BackendResponse<SysDictData>> =>
  request({
    url: 'basedata/basedata/sys_dict/',
  });
// 字典更新
export const sysDictUpdate = ({
  id,
  ...data
}: Partial<SysDictUpdatePayload>): AxiosPromise<SysDictUpdatePayload> =>
  request({
    method: 'PUT',
    url: `/basedata/basedata/sys_dict/`,
    data,
  });
// 字典创建
export const createSysDict = (
  data: Partial<SysDictUpdatePayload>,
): AxiosPromise<SysDictUpdatePayload> =>
  request({
    method: 'POST',
    url: '/basedata/basedata/sys_dict/',
    data,
  });
