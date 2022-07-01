/**
 * @file 数据字典 column
 */

import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Dictionary } from 'lodash';
import { RouterProps } from 'react-router-dom';

type DictColumnProps<T> = {
  onEdit?: (record: T) => void;
  onProduct?: (record: T, type?: string) => void;
  updateStatus?: (record: T) => void;
  onDelete?: (record: T) => void;
  ccpbc?: (record: T) => void;
  account?: (record: T) => void;
  auditcc?: (record: T) => void;
  fileList?: (record: T) => void;
  onGoodsDetail?: (record: T) => void;
  onGoodsEdit?: (record: T) => void;
  onGoodsOn?: (record: T) => void;
  monitoringReport?: (record: T) => void;
  archive?: (record: T) => void;
  generate?: (record: T) => void;
  greenPerformance?: (record: T) => void;
  previewFn?: (record: T) => void;
  history: RouterProps['history'];
  orgType?: string;
};
type SexObjType = {
  0?: string;
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
  6?: string;
  7?: string;
  8?: string;
  9?: string;
  10?: string;
  11?: string;
  12?: string;
};
// const statusObj: SexObjType = {
//   0: '正常',
//   1: '禁用',
//   2: '未激活',
// };
export const orgStatusObj: SexObjType = {
  0: '正常',
  1: '待审核',
  2: '审核不通过',
};

export const useDictColumn = <T extends Dictionary<any>>({
  history,
  onDelete,
}: DictColumnProps<T>): ColumnType<T>[] => {
  // console.log(orgType, 'orgType=orgType');
  // 生产系统管理
  if (
    history.location.pathname.indexOf(
      '/data-quality-management/control/productionProcess',
    ) >= 0
  ) {
    return [
      {
        dataIndex: 'id',
        title: '序号',
        width: 79,
        ellipsis: true,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'name',
        title: '生产工艺名称',
        ellipsis: true,
        render: (t: string) => {
          return (
            <Tooltip placement='topLeft' title={t}>
              {t}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'describe',
        title: '工艺流程描述',
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 230,
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/data-quality-management/control/process/detail?${record?.id}`,
                  )
                }
              >
                查看
              </Button>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/data-quality-management/control/process/edit?${record?.id}`,
                  )
                }
              >
                {record.create_org_id === record.secondary_org_id ? '编辑' : ''}
              </Button>
              <Popconfirm
                title='是否删除'
                onConfirm={() => {
                  onDelete?.(record);
                }}
                onCancel={() => {}}
                okText='确定'
                cancelText='取消'
              >
                <Button type='link'>
                  {record.create_org_id === record.secondary_org_id
                    ? '删除'
                    : ''}
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }

  return [];
};
