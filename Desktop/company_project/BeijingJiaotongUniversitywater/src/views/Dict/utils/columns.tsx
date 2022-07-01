/**
 * @file 数据字典 column
 */

import { Button } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Dictionary } from 'lodash';
import { TableColumnWidth } from '@/components/Table/TableColumnWidth';
import { RouterProps } from 'react-router-dom';

type DictColumnProps<T> = {
  onEdit?: (record: T) => void;
  updateStatus: (record: T) => void;
  history: RouterProps['history'];
};
export const useDictColumn = <T extends Dictionary<any>>({
  onEdit,
  updateStatus,
  history,
}: DictColumnProps<T>): ColumnType<T>[] => {
  return [
    {
      dataIndex: 'index',
      title: '序号',
      render: (t: string, record: T, index) => index + 1,
    },
    {
      dataIndex: 'dict_data_name',
      title: '字典名称',
    },
    {
      dataIndex: 'dict_data_value',
      title: '字典标识',
    },
    {
      dataIndex: 'apply_product',
      title: '适用产品',
    },
    {
      dataIndex: 'is_forbid',
      title: '状态',
      render(text: boolean) {
        return !text ? '启用' : '禁用';
      },
    },
    {
      dataIndex: 'actions',
      title: '操作',
      render: (text: any, record: T) => {
        // @ts-ignore
        const isForbid = !!record?.is_forbid;
        return (
          <TableColumnWidth width={170}>
            <Button type='link' onClick={() => onEdit?.(record)}>
              编辑
            </Button>
            <Button
              type='link'
              onClick={() =>
                updateStatus({ ...record, is_forbid: !record.is_forbid })
              }
            >
              {isForbid ? '启用' : '禁用'}
            </Button>
            <Button
              type='link'
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                if (record.id) history.push(`/basic-datas/dict/${record.id}`);
              }}
            >
              详情
            </Button>
          </TableColumnWidth>
        );
      },
    },
  ];
};

export const useDictDetailColumns = <T extends any>(): ColumnType<T>[] => {
  return [
    {
      dataIndex: 'index',
      title: '序号',
      render: (t: string, record: T, index) => index + 1,
    },
    {
      dataIndex: 'dict_item_name',
      title: '枚举值名称',
    },
    {
      dataIndex: 'dict_item_value',
      title: '枚举值标识',
    },
    {
      dataIndex: 'relevance_value',
      title: '枚举值关联值',
    },
    {
      dataIndex: 'weights',
      title: '排序',
    },
    {
      dataIndex: 'actions',
      title: '操作',
      render: (text: string, record: T) => {
        console.log(text, record);
        return (
          <TableColumnWidth width={170}>
            <Button type='link'>编辑</Button>
            <Button type='link'>禁用</Button>
          </TableColumnWidth>
        );
      },
    },
  ];
};
