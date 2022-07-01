/**
 * @file 数据字典 column
 */

import { Button, Space, Tooltip } from 'antd';
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
}: DictColumnProps<T>): ColumnType<T>[] => {
  // console.log(orgType, 'orgType=orgType');
  // 生产系统管理
  if (
    history.location.pathname.indexOf('data-quality-management/control') >= 0
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
        dataIndex: 'belong_org_name',
        title: '组织名称',
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
        dataIndex: 'update_time',
        title: '更新时间',
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 180,
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/data-quality-management/control/productionProcess?${record.id}`,
                  )
                }
              >
                {record.create_org_id === record.secondary_org_id
                  ? '管理'
                  : '查看'}
              </Button>
            </Space>
          );
        },
      },
    ];
  }

  return [];
};
