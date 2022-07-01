/**
 * @file 数据字典 column
 */
import { Button, Space, Popconfirm } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Dictionary } from 'lodash';
import { TableColumnWidth } from '@/components/Table/TableColumnWidth';
import { RouterProps } from 'react-router-dom';

export const useDictListColumn = <T extends Dictionary<any>>({
  onEdit,
}: DictColumnProps<T>): ColumnType<T>[] => {
  return [
    {
      dataIndex: 'dictLabel',
      title: '分类名称',
    },
    {
      dataIndex: 'dictValue',
      title: '分类标识',
    },
    {
      dataIndex: 'dictSort',
      title: '排序',
    },
    {
      dataIndex: 'actions',
      title: '操作',
      render: (text: any, record: T) => {
        // @ts-ignore
        return (
          <TableColumnWidth width={80}>
            <Button type='link' onClick={() => onEdit?.(record)}>
              修改
            </Button>
          </TableColumnWidth>
        );
      },
    },
  ];
};
type DictColumnProps<T> = {
  onEdit?: (record: T) => void;
  updateStatus?: (record: T) => void;
  delFn?: (record: T) => void;
  history: RouterProps['history'];
};
interface FactorIsNewObjType {
  add: string;
  edit: string;
}
const factorIsNewObj = {
  add: '新增因子',
  edit: '修改因子',
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDictColumn = <T extends Dictionary<any>>({
  updateStatus,
  delFn,
  history,
}: DictColumnProps<T>): ColumnType<T>[] => {
  // 排放因子库
  if (history.location.pathname.indexOf('emission-factor/library') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 90,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'name',
        title: '名称',
        width: 160,
        ellipsis: true,
      },
      {
        dataIndex: 'facilities',
        title: '设施/活动',
        width: 140,
        ellipsis: true,
      },
      {
        dataIndex: 'business',
        title: '适用行业',
        width: 140,
        ellipsis: true,
      },
      {
        dataIndex: 'factorType',
        title: '数据类型',
        width: 140,
        ellipsis: true,
      },
      {
        dataIndex: 'year',
        title: '发布年份',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'institution',
        title: '发布机构',
        width: 140,
        ellipsis: true,
      },
      {
        dataIndex: 'countries',
        title: '发布国家/组织',
        width: 160,
        ellipsis: true,
      },
      {
        dataIndex: 'area',
        title: '发布地区',
        width: 140,
        ellipsis: true,
      },
      {
        dataIndex: 'sourceLevel',
        title: '来源类别',
        width: 140,
        ellipsis: true,
      },
      {
        dataIndex: 'status',
        title: '状态',
        width: 120,
        ellipsis: true,
        render: (status: string) => {
          return Number(status) === 0 ? '禁用' : '启用';
        },
      },
      {
        dataIndex: 'createBy',
        title: '创建者',
        width: 120,
        ellipsis: true,
      },
      {
        dataIndex: 'auditUser',
        title: '最近审核人',
        width: 180,
        ellipsis: true,
      },
      {
        dataIndex: 'updateTime',
        title: '最近更新时间',
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 220,
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Button
                type='link'
                onClick={() =>
                  history.push(`/emission-factor/library/detail?${record.id}`)
                }
              >
                详情
              </Button>
              <Popconfirm
                title={`是否${Number(record.status) === 1 ? '禁用' : '启用'}`}
                onConfirm={() => {
                  updateStatus?.(record);
                }}
                onCancel={() => {}}
                okText='确定'
                cancelText='取消'
              >
                <Button type='link'>
                  {Number(record.status) === 1 ? '禁用' : '启用'}
                </Button>
              </Popconfirm>
              <Button
                type='link'
                onClick={() => {
                  history.push(`/emission-factor/library/edit?${record.id}`);
                }}
              >
                修改
              </Button>
            </Space>
          );
        },
      },
    ];
  }
  // 我的排放因子
  if (history.location.pathname.indexOf('emission-factor/myemission') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 100,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'factorIsNew',
        title: '类型',
        width: 100,
        ellipsis: true,
        render: (t: keyof FactorIsNewObjType) => {
          return factorIsNewObj[t];
        },
      },
      {
        dataIndex: 'name',
        title: '名称',
        width: 160,
      },
      {
        dataIndex: 'facilities',
        title: '设施/活动',
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'business',
        title: '适用行业',
        width: 200,
      },
      {
        dataIndex: 'factorType',
        title: '数据类型',
        width: 100,
      },
      {
        dataIndex: 'year',
        title: '发布年份',
        width: 100,
      },
      {
        dataIndex: 'countries',
        title: '发布国家/组织',
        width: 160,
        ellipsis: true,
      },
      {
        dataIndex: 'institution',
        title: '发布机构',
        width: 200,
      },
      {
        dataIndex: 'area',
        title: '发布地区',
        width: 100,
      },
      {
        dataIndex: 'sourceLevel',
        title: '来源类别',
        width: 160,
      },
      {
        dataIndex: 'auditStatus',
        title: '审核状态',
        width: 100,
      },
      {
        dataIndex: 'auditUser',
        title: '审核人',
        width: 100,
      },
      {
        dataIndex: 'updateTime',
        title: '最近更新时间',
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 200,
        ellipsis: true,
        render: (text: any, record: { id?: string; auditStatus?: string }) => {
          // @ts-ignore
          return (
            <Space>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/emission-factor/myemission/detail?${record.id}`,
                  )
                }
              >
                详情
              </Button>
              {`${record?.auditStatus}`?.indexOf('不通过') >= 0 && (
                <Button
                  type='link'
                  onClick={() => {
                    history.push(
                      `/emission-factor/myemission/edit?${record.id}`,
                    );
                  }}
                >
                  修改
                </Button>
              )}
            </Space>
          );
        },
      },
    ];
  }
  // 排放因子审核
  if (history.location.pathname.indexOf('emission-factor/examine') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 100,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'name',
        title: '名称',
        width: 160,
        ellipsis: true,
      },
      {
        dataIndex: 'facilities',
        title: '设施/活动',
        ellipsis: true,
        width: 100,
      },
      {
        dataIndex: 'year',
        title: '发布年份',
        width: 100,
      },
      {
        dataIndex: 'institution',
        title: '发布机构',
        width: 160,
        ellipsis: true,
      },
      {
        dataIndex: 'factorIsNew',
        title: '类型',
        width: 100,
        ellipsis: true,
        render: (t: keyof FactorIsNewObjType) => {
          return factorIsNewObj[t];
        },
      },
      {
        dataIndex: 'createBy',
        title: '提交人',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'createTime',
        title: '提交时间',
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'auditStatus',
        title: '审核状态',
        ellipsis: true,
        width: 100,
      },
      {
        dataIndex: 'auditContent',
        title: '审核说明',
        ellipsis: true,
        width: 200,
      },
      {
        dataIndex: 'auditUser',
        title: '审核人',
        ellipsis: true,
        width: 100,
      },
      {
        dataIndex: 'auditTime',
        title: '审核时间',
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 200,
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              {record.auditStatus === '待审核' && (
                <Button
                  type='link'
                  onClick={() => {
                    history.push(
                      `/emission-factor/examine/examine?${record.id}`,
                    );
                  }}
                >
                  审核
                </Button>
              )}
              <Button
                type='link'
                onClick={() => {
                  history.push(`/emission-factor/examine/detail?${record.id}`);
                }}
              >
                详情
              </Button>
            </Space>
          );
        },
      },
    ];
  }
  // 组织排放因子
  if (history.location.pathname.indexOf('emission-factor/organization') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 100,
        ellipsis: true,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'name',
        title: '名称',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'facilities',
        title: '设施/活动',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'business',
        title: '适用行业',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'year',
        title: '发布年份',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'institution',
        title: '发布机构',
        width: 180,
        ellipsis: true,
      },
      {
        dataIndex: 'countries',
        title: '发布国家/组织',
        width: 160,
        ellipsis: true,
      },
      {
        dataIndex: 'area',
        title: '发布地区',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'sourceLevel',
        title: '来源类别',
        width: 130,
        ellipsis: true,
      },
      {
        dataIndex: 'companyName',
        title: '发布组织',
        width: 100,
        ellipsis: true,
      },
      {
        dataIndex: 'companyNum',
        title: '组织编码',
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'createTime',
        title: '发布时间',
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 200,
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <TableColumnWidth width={80}>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/emission-factor/organization/detail?${record.id}`,
                  )
                }
              >
                详情
              </Button>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/emission-factor/organization/copy?${record.id}#companyName=${record.companyName}&companyNum=${record.companyNum}`,
                  )
                }
              >
                复制
              </Button>
            </TableColumnWidth>
          );
        },
      },
    ];
  }
  // 排放因子业务方
  if (history.location.pathname.indexOf('emission-factor/business') >= 0) {
    return [
      {
        dataIndex: 'id',
        title: '序号',
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'businessName',
        title: '业务方名称',
      },
      {
        dataIndex: 'businessLabel',
        title: '业务方标识',
      },
      {
        dataIndex: 'remark',
        title: '备注',
        ellipsis: true,
      },
      {
        dataIndex: 'status',
        title: '状态',
        render: (status: string) => {
          return Number(status) === 0 ? '禁用' : '启用';
        },
      },
      {
        dataIndex: 'updateBy',
        title: '最近更新人',
        width: 140,
        ellipsis: true,
      },
      {
        dataIndex: 'updateTime',
        title: '最近更新时间',
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'actions',
        title: '操作',
        render: (text: any, record: T) => {
          console.log(record.status, 'record');
          // @ts-ignore
          return (
            <Space>
              <Popconfirm
                title={`是否${Number(record.status) === 1 ? '禁用' : '启用'}`}
                onConfirm={() => {
                  updateStatus?.(record);
                }}
                onCancel={() => {}}
                okText='确定'
                cancelText='取消'
              >
                <Button type='link'>
                  {Number(record.status) === 1 ? '禁用' : '启用'}
                </Button>
              </Popconfirm>
              <Button
                type='link'
                onClick={() =>
                  history.push(`/emission-factor/business/edit?${record.id}`)
                }
              >
                修改
              </Button>
            </Space>
          );
        },
      },
    ];
  }
  // 组织因子产品配置
  if (
    history.location.pathname.indexOf(
      'emission-factor/orgConfig/product-list',
    ) >= 0
  ) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'productName',
        title: '产品名称',
      },
      {
        dataIndex: 'productId',
        title: '产品标识',
      },
      {
        dataIndex: 'labelIds',
        title: '开通标签',
      },
      {
        dataIndex: 'updateBy',
        title: '最近更新人',
      },
      {
        dataIndex: 'updateTime',
        title: '最近更新时间',
      },

      {
        dataIndex: 'actions',
        title: '操作',
        width: 120,
        render: (_: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/emission-factor/orgConfig/product-list/detail?${record.id}`,
                  )
                }
              >
                详情
              </Button>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/emission-factor/orgConfig/product-list/edit?${record.id}`,
                  )
                }
              >
                修改
              </Button>
              <Popconfirm
                title='是否删除'
                onConfirm={() => {
                  delFn?.(record);
                }}
                onCancel={() => {}}
                okText='确定'
                cancelText='取消'
              >
                <Button type='link'>删除</Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }
  // 组织因子配置
  if (history.location.pathname.indexOf('emission-factor/orgConfig') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'companyName',
        title: '组织名称',
      },
      {
        dataIndex: 'companyNum',
        title: '组织编码',
      },
      {
        dataIndex: 'companyPhone',
        title: '组织负责人账号',
      },
      {
        dataIndex: 'actions',
        title: '操作',
        render: (_: any, record: T) => {
          // @ts-ignore
          return (
            <TableColumnWidth width={80}>
              <Button
                type='link'
                onClick={() =>
                  history.push(
                    `/emission-factor/orgConfig/product-list?${record.companyId}`,
                  )
                }
              >
                因子配置
              </Button>
            </TableColumnWidth>
          );
        },
      },
    ];
  }
  return [];
};
