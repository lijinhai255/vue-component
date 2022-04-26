/**
 * @file 数据字典 column
 */

import { Button } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { Rule } from 'antd/lib/form';
import { TableColumnWidth } from '@/components/Table/TableColumnWidth';

export const useDictColumn = <T extends any>(): ColumnType<T>[] => {
  return useMemo(() => {
    return [
      {
        dataIndex: 'index',
        title: '序号',
      },
      {
        dataIndex: 'key-name',
        title: '字典名称',
      },
      {
        dataIndex: 'key-identity',
        title: '字典标识',
      },
      {
        dataIndex: 'product',
        title: '适用产品',
      },
      {
        dataIndex: 'status',
        title: '状态',
      },
      {
        dataIndex: 'actions',
        title: '操作',
        render: (text: any, record: T) => {
          console.log(text, record);
          return (
            <TableColumnWidth width={170}>
              <Button type='link'>编辑</Button>
              <Button type='link'>禁用</Button>
              <Button type='link'>详情</Button>
            </TableColumnWidth>
          );
        },
      },
    ];
  }, []);
};

export type SearchParams = {
  dictName?: string;
  dictIdentity?: string;
  product?: string;
  status?: string;
};

export const dictParams: {
  name: keyof SearchParams;
  label: string;
  required?: boolean;
  rules?: Rule[];
}[] = [
  {
    name: 'dictName',
    label: '字典名称',
    rules: [
      {
        required: true,
        message: '请输入字典名称',
      },
      {
        type: 'string',
        max: 50,
        message: '字典名称不能超过50个字符',
      },
    ],
  },
  {
    name: 'dictIdentity',
    label: '字典标识',
    rules: [
      {
        required: true,
        message: '请输入字典标识',
      },
      {
        type: 'string',
        max: 50,
        message: '字典标识不能超过50个字符',
      },
    ],
  },
  {
    name: 'product',
    label: '适用产品',
    rules: [
      {
        required: true,
        message: '请输入适用产品',
      },
      {
        type: 'string',
        max: 50,
        message: '适用产品不能超过50个字符',
      },
    ],
  },
];
