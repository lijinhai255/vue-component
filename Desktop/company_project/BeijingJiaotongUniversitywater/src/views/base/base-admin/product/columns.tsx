/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/**
 * @file 产品列表 分类 column
 */
import * as H from 'history';
import { ColumnType } from 'antd/es/table';

import { Button, Space } from 'antd';
import { Dictionary } from 'lodash';
// import * as H from 'history';
// import { TableColumnWidth } from '@/components/Table/TableColumnWidth';

type ProductType<T> = {
  onEdit?: (record: T) => void;
  history: H.History<H.LocationState>;
  onDelete?: (record: T) => void;
};
export const useDictColumn = <T extends Dictionary<any>>({
  onEdit,
  history,
  onDelete,
}: ProductType<T>): ColumnType<T>[] => {
  if (history.location.pathname.includes('product-class')) {
    return [
      {
        dataIndex: 'categoryName',
        title: '分类名称',
      },
      {
        dataIndex: 'categoryId',
        title: '分类标识',
      },
      {
        dataIndex: 'orderNum',
        title: '排序',
      },
      {
        dataIndex: 'name',
        title: '操作',
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Button type='link' onClick={() => onEdit?.(record)}>
                编辑
              </Button>
              <Button danger type='link' onClick={() => onDelete?.(record)}>
                删除
              </Button>
            </Space>
          );
        },
      },
    ];
  }
  if (history.location.pathname.includes('product-list')) {
    return [
      {
        dataIndex: 'productName',
        title: '产品名称',
      },
      {
        dataIndex: 'productId',
        title: '产品ID',
      },
      {
        dataIndex: 'auth',
        title: '是否上线',
        render: (t: string, recode: T) => {
          return <span>{recode.auth === '1' ? '是' : '否'}</span>;
        },
      },
      {
        dataIndex: 'orderNum',
        title: '排序',
      },
      {
        dataIndex: 'categoryName',
        title: '所属分类',
      },
      {
        dataIndex: 'name',
        title: '操作',
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Button type='link' onClick={() => onEdit?.(record)}>
                编辑
              </Button>
              <Button type='link' danger onClick={() => onDelete?.(record)}>
                删除
              </Button>
            </Space>
          );
        },
      },
    ];
  }
  return [];
};
