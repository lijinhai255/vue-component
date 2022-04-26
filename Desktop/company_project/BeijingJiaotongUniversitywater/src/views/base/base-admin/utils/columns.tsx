/**
 * @file 数据字典 column
 */

import { Button, Space, Popconfirm, Tag, Tooltip } from 'antd';
import { IconFont } from '@/components/IconFont';
import { ColumnType } from 'antd/es/table';
import { Dictionary } from 'lodash';
import * as H from 'history';
import Permission from '@/utils/permission';
import { apiSystemFileUrlFn } from '../utils/index';
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
  history: H.History<H.LocationState>;
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
export const industryObj: SexObjType = {
  1: '钢铁',
  2: '石化',
  3: '化工',
  4: '建材',
  5: '有色',
  6: '造纸',
  7: '电力',
  8: '航空',
  9: '科技',
  10: '金融',
  11: '消费',
  12: '其他',
};
const projectTypeObj: SexObjType = {
  1: '新建-并网',
  2: '新建-非并网',
  3: '改建-并网',
  4: '扩建-并网',
};
export const orgTypeObj: SexObjType = {
  1: '征信机构',
  2: '人民银行',
  3: '金融机构',
  4: '核查机构',
  5: '贷款企业',
};
export const orgStatusObj: SexObjType = {
  0: '正常',
  1: '待审核',
  2: '审核不通过',
};
const proStatusObj: SexObjType = {
  0: '启用',
  1: '禁用',
};
const colorObj: SexObjType = {
  0: 'gold',
  1: 'cyan',
  2: 'blue',
};
const examColorObj: SexObjType = {
  0: 'gold',
  1: 'gold',
  2: 'blue',
};
// const authStatusObj: SexObjType = {
//   0: '否',
//   1: '是',
// };
const testFlagObj: SexObjType = {
  1: '测试',
  0: '正常',
};
const auditStateObj: SexObjType = {
  0: '未送审',
  1: '已送审',
  2: '已通过',
  3: '已归档',
};
const auditExamStateObj: SexObjType = {
  0: '未送审',
  1: '待审核',
  2: '已通过',
  3: '已归档',
};
const monitorStatusObj: SexObjType = {
  1: '待监测',
  2: '监测中',
};
const payStatusObj: SexObjType = {
  0: '待支付',
  1: '已完成',
};
const energyTypeObj: SexObjType = {
  1: '风力发电',
  2: '光伏发电',
  3: '潮汐发电',
  4: '地热发电',
};
export const useDictColumn = <T extends Dictionary<any>>({
  history,
  onDelete,
  updateStatus,
  ccpbc,
  auditcc,
  fileList,
  account,
  monitoringReport,
  archive,
  generate,
  greenPerformance,
  previewFn,
}: DictColumnProps<T>): ColumnType<T>[] => {
  // console.log(orgType, 'orgType=orgType');
  // 用户管理
  if (history.location.pathname.indexOf('business-info') >= 0) {
    return [
      {
        dataIndex: 'id',
        title: '序号',
        width: 79,
        ellipsis: true,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'orgName',
        title: '企业名称',
        width: 300,
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
        dataIndex: 'orgStatus',
        title: '审核状态',
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return t === 0 ? '审核通过' : t === 1 ? '审核中' : '审核未通过';
        },
      },
      {
        dataIndex: 'auditContent',
        title: '审核说明',
        width: 300,
        ellipsis: true,
        render: (t: string, recode: T) => {
          return (
            <Tooltip
              placement='topLeft'
              title={recode.auditContent ? recode.auditContent : '-'}
            >
              {recode.auditContent ? recode.auditContent : '-'}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'auditTime',
        title: '审核时间',
        // width: 220,
        ellipsis: true,
        render: (t: string, recode: T) => {
          return (
            <Tooltip
              placement='topLeft'
              title={recode.auditTime ? recode.auditTime : '-'}
            >
              {recode.auditTime ? recode.auditTime : '-'}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'createTime',
        title: '提交时间',
        // width: 220,
        ellipsis: true,
        render: (t: string, recode: T) => {
          return (
            <Tooltip
              placement='topLeft'
              title={recode.createTime ? recode.createTime : '-'}
            >
              {recode.createTime ? recode.createTime : '-'}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 146,
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Permission flag='/business-infor/list/detail'>
                <Button
                  type='link'
                  onClick={() =>
                    history.push(`/business-infor/list/detail?${record.id}`)
                  }
                >
                  详情
                </Button>
              </Permission>
              {record.orgStatus_name === '待审核' ? (
                <Permission flag='/business-infor/list/exam'>
                  <Button
                    type='link'
                    onClick={() =>
                      history.push(`/business-infor/list/exam?${record?.id}`)
                    }
                  >
                    审核
                  </Button>
                </Permission>
              ) : (
                ''
              )}
            </Space>
          );
        },
      },
    ];
  }
  // 组织管理
  if (history.location.pathname.indexOf('auth/org') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 68,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'orgName',
        title: '组织名称',
        width: 222,
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
        dataIndex: 'orgType',
        title: '组织类型',
        width: 96,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return orgTypeObj[t];
        },
      },
      {
        dataIndex: 'regArea',
        title: '注册地区',
        width: 222,
        ellipsis: true,
        render: produceAreaCode => {
          return (
            <Tooltip title={produceAreaCode || '-'}>
              {produceAreaCode || '-'}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'createByUsername',
        title: '创建者',
        width: 124,
        ellipsis: true,
        render: produceAreaCode => {
          return (
            <Tooltip title={produceAreaCode || '-'}>
              {produceAreaCode || '-'}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'contactName',
        title: '联系人',
        width: 82,
        ellipsis: true,
        render: produceAreaCode => {
          return (
            <Tooltip title={produceAreaCode || '-'}>
              {produceAreaCode || '-'}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'contactMobile',
        title: '联系人电话',
        width: 123,
        ellipsis: true,
        render: produceAreaCode => {
          return (
            <Tooltip title={produceAreaCode || '-'}>
              {produceAreaCode || '-'}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'orgStatus',
        title: '状态',
        width: 110,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return orgStatusObj[t];
        },
      },
      {
        dataIndex: 'createTime',
        title: '创建时间',
        width: 183,
        fixed: 'right',
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
        dataIndex: 'actions',
        title: '操作',
        width: 136,
        fixed: 'right',
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Permission flag='/auth/role/detail'>
                <Button
                  type='link'
                  onClick={() => history.push(`/auth/org/detail?${record.id}`)}
                >
                  详情
                </Button>
              </Permission>
              {record.orgStatus === 1 ? (
                <Permission flag='/auth/role/examine'>
                  <Button
                    type='link'
                    onClick={() =>
                      history.push(`/auth/org/examine?id=${record?.id}`)
                    }
                  >
                    审核
                  </Button>
                </Permission>
              ) : (
                ''
              )}
            </Space>
          );
        },
      },
    ];
  }
  // 预置角色管理
  if (history.location.pathname.indexOf('/auth/role') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 68,
        ellipsis: true,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'roleName',
        title: '角色名称',
        width: 110,
        ellipsis: true,
        render: (presetFlag: string) => (
          <Tooltip title={presetFlag}>{presetFlag}</Tooltip>
        ),
      },
      {
        dataIndex: 'presetFlag',
        title: '是否预置角色',
        width: 124,
        ellipsis: true,
        render: (presetFlag: string) =>
          Number(presetFlag) === 0 ? '否' : '是',
      },
      {
        dataIndex: 'roleInfo',
        title: '角色描述',
        width: 180,
        ellipsis: true,
        render: (presetFlag: string) => (
          <Tooltip title={presetFlag}>{presetFlag}</Tooltip>
        ),
      },
      {
        dataIndex: 'orgType',
        title: '组织类型',
        width: 124,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return orgTypeObj[t];
        },
      },
      {
        dataIndex: 'userNum',
        title: '账号数量',
        width: 96,
      },
      {
        dataIndex: 'updateTime',
        title: '更新时间',
        width: 183,
        ellipsis: true,
        render: (presetFlag: string) => (
          <Tooltip title={presetFlag}>{presetFlag}</Tooltip>
        ),
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 191,
        fixed: 'right',
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              {
                <Permission flag='/auth/role/detail-chongqing'>
                  <Button
                    type='link'
                    onClick={() =>
                      history.push(`/auth/role/detail?id=${record.id}`)
                    }
                  >
                    详情
                  </Button>
                </Permission>
              }
              {Number(record.presetFlag) === 0 && (
                <Permission flag='/auth/role/edit-chongqing'>
                  <Button
                    type='link'
                    onClick={() =>
                      history.push(`/auth/role/edit?id=${record.id}`)
                    }
                  >
                    编辑
                  </Button>
                </Permission>
              )}
              {Number(record.presetFlag) === 0 && (
                <Permission flag='/auth/role/del-chongqing'>
                  <Popconfirm
                    title={`是否删除`}
                    onConfirm={() => {
                      onDelete?.(record);
                    }}
                    onCancel={() => {}}
                    okText='确定'
                    cancelText='取消'
                  >
                    <Button type='link' danger>
                      删除
                    </Button>
                  </Popconfirm>
                </Permission>
              )}
            </Space>
          );
        },
      },
    ];
  }
  // 产品管理
  if (history.location.pathname.indexOf('/auth/user') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 68,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'username',
        title: '手机号',
        width: 125,
        ellipsis: true,
      },
      {
        dataIndex: 'orgName',
        title: '所属组织',
        width: 96,
        ellipsis: true,
        render: text => {
          return text || '--';
        },
      },
      {
        dataIndex: 'orgType',
        title: '组织类型',
        width: 96,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return orgTypeObj[t];
        },
      },
      {
        dataIndex: 'roleNames',
        title: '用户角色',
        width: 110,
        ellipsis: true,
        render: text => {
          return <Tooltip title={text || '--'}>{text || '--'}</Tooltip>;
        },
      },
      {
        dataIndex: 'userStatus',
        title: '状态',
        width: 68,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return proStatusObj[t];
        },
      },
      {
        dataIndex: 'createTime',
        title: '创建时间',
        width: 143,
        ellipsis: true,
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 150,
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              <Button
                type='link'
                onClick={() => {
                  history.push(`/auth/user/edit?id=${record.id}`);
                }}
              >
                编辑
              </Button>
              <Permission flag='/auth/user/detail'>
                <Button
                  type='link'
                  onClick={() => {
                    history.push(`/auth/user/detail?${record.id}`);
                  }}
                >
                  详情
                </Button>
              </Permission>
              <Permission flag='/auth/user/updateStatus'>
                <Popconfirm
                  title={`是否${
                    Number(record.userStatus) === 0 ? '禁用' : '启用'
                  }`}
                  onConfirm={() => {
                    updateStatus?.(record);
                  }}
                  onCancel={() => {}}
                  okText='确定'
                  cancelText='取消'
                >
                  <Button type='link'>
                    {Number(record.userStatus) === 0 ? '禁用' : '启用'}
                  </Button>
                </Popconfirm>
              </Permission>
            </Space>
          );
        },
      },
    ];
  }
  // 项目信息
  if (history.location.pathname.indexOf('/mession-reduction/info') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 80,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'projectNo',
        title: '项目ID',
        width: 180,
        ellipsis: true,
      },
      {
        dataIndex: 'projectName',
        title: '项目名称',
        width: 260,
        ellipsis: true,
      },
      {
        dataIndex: 'projectType',
        title: '项目类型',
        width: 180,
        ellipsis: true,
        render: (t: keyof SexObjType) => projectTypeObj[t],
      },
      {
        dataIndex: 'area',
        title: '项目所在地',
        width: 180,
        ellipsis: true,
      },
      {
        dataIndex: 'applyTime',
        title: '项目申请时间',
        width: 180,
        ellipsis: true,
        render: (t: keyof SexObjType) => (t ? t : '-'),
      },
      {
        dataIndex: 'replyTime',
        title: '立项批复时间',
        width: 180,
        ellipsis: true,
      },
      {
        dataIndex: 'auditStatus',
        title: '审核状态',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return (
            <Tag color={t < 0 ? 'error' : colorObj[t]}>
              {t < 0 ? '已驳回' : auditStateObj[t]}
            </Tag>
          );
        },
      },
      {
        dataIndex: 'actions',
        title: '操作',
        width: 260,
        ellipsis: true,
        render: (_, record: T) => {
          // @ts-ignore
          return (
            <Space>
              {[0, 1, 2, -1].indexOf(record.auditStatus) >= 0 && (
                // <Permission flag='/mession-reduction/info/detail'>
                <Button
                  type='link'
                  onClick={() =>
                    history.push(
                      `/mession-reduction/info/detail?id=${record.id}`,
                    )
                  }
                >
                  详情
                </Button>
                // </Permission>
              )}
              {[0, -1].indexOf(record.auditStatus) >= 0 && (
                // <Permission flag='/mession-reduction/info/edit'>
                <Button
                  type='link'
                  onClick={() =>
                    history.push(`/mession-reduction/info/edit?id=${record.id}`)
                  }
                >
                  编辑
                </Button>
                // </Permission>
              )}
              {[0].indexOf(record.auditStatus) >= 0 && (
                // <Permission flag='/mession-reduction/info/del'>
                <Popconfirm
                  title={`是否删除`}
                  onConfirm={() => {
                    onDelete?.(record);
                  }}
                  onCancel={() => {}}
                  okText='确定'
                  cancelText='取消'
                >
                  <Button type='link' danger>
                    删除
                  </Button>
                </Popconfirm>
                // </Permission>
              )}
            </Space>
          );
        },
      },
    ];
  }
  // 项目审核
  if (history.location.pathname.indexOf('/mession-reduction/exam') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 70,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'projectName',
        title: '项目名称',
        ellipsis: true,
        width: 260,
      },
      {
        dataIndex: 'createTime',
        title: '审核发起时间',
        ellipsis: true,
        width: 200,
      },
      //companyName
      {
        dataIndex: 'orgName',
        title: '申请公司',
        ellipsis: true,
        width: 260,
      },
      {
        dataIndex: 'auditType',
        title: '审核单类型',
        width: '200px',
        ellipsis: true,
        render: auditType => {
          return auditType === 1 ? (
            <span>
              <IconFont
                type='icon-icon-weixiangshenqingshan'
                style={{
                  color: '#09C199',
                  fontSize: '16px',
                  marginRight: '6px',
                }}
              />
              立项申请单
            </span>
          ) : (
            <span>
              <IconFont
                type='icon-icon-jianceshenqingshan'
                style={{
                  color: '#096dd9',
                  fontSize: '16px',
                  marginRight: '6px',
                }}
              />
              监测申请单
            </span>
          );
        },
      },
      {
        dataIndex: 'auditStatus',
        title: '审核状态',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return (
            <Tag color={t < 0 ? 'error' : examColorObj[t]}>
              {t < 0 ? '已驳回' : auditExamStateObj[t]}
            </Tag>
          );
        },
      },
      {
        dataIndex: 'ccpbcFlag',
        title: '是否报送',
        width: 140,
        ellipsis: true,
        render: (t, record) => {
          return record.auditStatus < 2 ? '-' : Number(t) === 0 ? '否' : '是';
        },
      },
      {
        dataIndex: 'ccFlag',
        title: '是否抄送',
        width: 140,
        ellipsis: true,
        render: (t, record) => {
          return record.auditStatus < 2 ? '-' : Number(t) === 0 ? '否' : '是';
        },
      },
      {
        dataIndex: 'id',
        title: '项目金额（贷款/总金额）',
        width: 220,
        ellipsis: true,
        render: (t, record: T) => {
          return record.loanAmount
            ? `${record.loanAmount}/${record.totalAmount}`
            : '_';
        },
      },
      {
        dataIndex: 'actions',
        width: 300,
        title: '操作',
        fixed: 'right',
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              {[1].indexOf(record.auditStatus) >= 0 && (
                <Permission flag='/mession-reduction/exam/examine-info'>
                  <Button
                    type='link'
                    onClick={() => {
                      if (record.auditType === 1) {
                        // 项目审核
                        history.push(
                          `/mession-reduction/exam/examine-info?id=${record.recordId}&examid=${record.id}`,
                        );
                      }
                      if (record.auditType === 2) {
                        // 项目审核
                        history.push(
                          `/mession-reduction/exam/mession-monitor?id=${record.recordId}&examid=${record.id}`,
                        );
                      }
                    }}
                  >
                    审核
                  </Button>
                </Permission>
              )}
              <Permission flag='/mession-reduction/exam/detail'>
                <Button
                  type='link'
                  onClick={() => {
                    if (record.auditType === 1) {
                      // 项目审核
                      history.push(
                        `/mession-reduction/exam/exam-detail?id=${record.recordId}`,
                      );
                    }
                    if (record.auditType === 2) {
                      // 项目审核
                      history.push(
                        `/mession-reduction/exam/monitor-detail?id=${record.recordId}`,
                      );
                    }
                  }}
                >
                  详情
                </Button>
              </Permission>
              {[2, 3].indexOf(record.auditStatus) >= 0 &&
                record.auditType === 1 && (
                  <Permission flag='/mession-reduction/exam/auditcc'>
                    <Button type='link' onClick={() => auditcc?.(record)}>
                      抄送
                    </Button>
                  </Permission>
                )}
              {[2, 3].indexOf(record.auditStatus) >= 0 &&
                record.auditType === 1 && (
                  <Permission flag='/mession-reduction/exam/ccpdc'>
                    <Popconfirm
                      title={`将报送至人民银行，且报送后不可撤回，是否确认报送？`}
                      onConfirm={() => {
                        ccpbc?.(record);
                      }}
                      onCancel={() => {}}
                      okText='确定'
                      cancelText='取消'
                    >
                      <Button type='link'>报送</Button>
                    </Popconfirm>
                  </Permission>
                )}
              {
                <Permission flag='/mession-reduction/exam/account'>
                  {[2, 3].indexOf(record.auditStatus) >= 0 &&
                    record.auditType === 1 && (
                      <Button
                        type='link'
                        onClick={() => {
                          account?.(record);
                        }}
                      >
                        项目金额
                      </Button>
                    )}
                </Permission>
              }
              {[2].indexOf(record.auditStatus) >= 0 && record.auditType === 1 && (
                // <Permission flag='/mession-reduction/exam/ccpdc'>
                <Popconfirm
                  title={`归档后贷款企业用户不可在该项目下继续提交监测数据，是否确认归档？`}
                  onConfirm={() => {
                    archive?.(record);
                  }}
                  onCancel={() => {}}
                  okText='确定'
                  cancelText='取消'
                >
                  <Button type='link'>归档</Button>
                </Popconfirm>
                // </Permission>
              )}
              {[3].indexOf(record.auditStatus) >= 0 && record.auditType === 1 && (
                <Button type='link' disabled>
                  已归档
                </Button>
              )}
            </Space>
          );
        },
      },
    ];
  }
  // 事后预估报告
  if (
    history.location.pathname.indexOf(
      '/mession-reduction/query/after-report',
    ) >= 0
  ) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 70,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'projectName',
        title: '项目名称',
        ellipsis: true,
        width: 260,
      },
      {
        dataIndex: 'reportInfo',
        title: '监测时间段',
        width: '220px',
        ellipsis: true,
        render: (t: string) => {
          return t ? t : '-';
        },
      },
      //companyName
      {
        dataIndex: 'reportStatus',
        title: '生成报告',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return (
            <Tag color={Number(t) === 2 ? 'success' : 'blue'}>
              {record.reportStatus_name}
            </Tag>
          );
        },
      },
      {
        dataIndex: 'reportStatus',
        title: '下载报告',
        width: 140,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return record.reportStatus === 2 ? (
            <>
              <Button
                type='link'
                disabled={Number(t) === 1}
                data-type={t}
                onClick={async () => {
                  await apiSystemFileUrlFn(record.reportFile);
                }}
              >
                下载
              </Button>
              <Button
                type='link'
                disabled={Number(t) === 1}
                data-type={t}
                onClick={() => {
                  previewFn?.(record);
                }}
              >
                预览
              </Button>
            </>
          ) : (
            <IconFont type='icon-icon-dengdai' className='iconFontFram' />
          );
        },
      },

      // {
      //   dataIndex: 'actions',
      //   width: 220,
      //   title: '操作',
      //   render: (text: any, record: T) => {
      //     // @ts-ignore
      //     return (
      //       <Space>
      //         {
      //           <Button
      //             type='link'
      //             onClick={() => {
      //               if (record.auditType === 1) {
      //                 // 项目审核
      //                 history.push(
      //                   `/mession-reduction/exam/examine-info?id=${record.recordId}&examid=${record.id}`,
      //                 );
      //               }
      //               if (record.auditType === 2) {
      //                 // 项目审核
      //                 history.push(
      //                   `/mession-reduction/exam/mession-monitor?id=${record.recordId}&examid=${record.id}`,
      //                 );
      //               }
      //             }}
      //           >
      //             生成监测报告
      //           </Button>
      //         }
      //         <Button
      //           type='link'
      //           onClick={() => {
      //             if (record.auditType === 1) {
      //               // 项目审核
      //               history.push(
      //                 `/mession-reduction/exam/examine-info?id=${record.recordId}&examid=${record.id}`,
      //               );
      //             }
      //             if (record.auditType === 2) {
      //               // 项目审核
      //               history.push(
      //                 `/mession-reduction/exam/mession-monitor?id=${record.recordId}&examid=${record.id}`,
      //               );
      //             }
      //           }}
      //         >
      //           抄送
      //         </Button>
      //       </Space>
      //     );
      //   },
      // },
    ];
  }
  // 项目查询
  if (history.location.pathname.indexOf('/mession-reduction/query') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 68,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'projectNo',
        title: '项目ID',
        ellipsis: true,
        width: 200,
        render: (text: string) => {
          return (
            <Tooltip placement='topLeft' title={text}>
              {text}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'projectName',
        title: '项目名称',
        ellipsis: true,
        width: 260,
        render: (text: string) => {
          return (
            <Tooltip placement='topLeft' title={text}>
              {text}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'energyType',
        title: '能源类型',
        ellipsis: true,
        width: 110,
        render: (t: keyof SexObjType) => {
          return energyTypeObj[t];
        },
      },
      {
        dataIndex: 'projectType',
        title: '项目类型',
        ellipsis: true,
        width: 110,
        render: (t: keyof SexObjType) => {
          return (
            <Tooltip placement='topLeft' title={projectTypeObj[t]}>
              {projectTypeObj[t]}
            </Tooltip>
          );
        },
      },
      {
        dataIndex: 'auditTime',
        title: '项目申请时间',
        ellipsis: true,
        width: 220,
        render: (t: keyof SexObjType) => {
          return t ? t : '-';
        },
      },
      //companyName
      {
        dataIndex: 'orgName',
        title: '申请公司',
        ellipsis: true,
        width: 260,
      },
      {
        dataIndex: 'dataReduction',
        title: '实际减排量/预估减排量（tCO₂e）',
        width: '260px',
        ellipsis: true,
      },
      // {
      //   dataIndex: 'loanAmount',
      //   title: '贷款金额',
      //   width: 160,
      //   ellipsis: true,
      //   render: (t: keyof SexObjType) => {
      //     return t || '--';
      //   },
      // },
      // {
      //   dataIndex: 'totalAmount',
      //   title: '项目总金额',
      //   width: 160,
      //   ellipsis: true,
      //   render: (t: keyof SexObjType) => {
      //     return t || '--';
      //   },
      // },
      {
        dataIndex: 'greenPerformance',
        title: '绿色绩效(tCO₂e/亿元/年)',
        width: 200,
        ellipsis: true,
        render: (t, record) => {
          return t ? (
            <Button
              onClick={() => {
                greenPerformance?.(record);
              }}
              type='link'
            >
              {t || '--'}
            </Button>
          ) : (
            <Tag color=''></Tag>
          );
        },
      },
      {
        dataIndex: 'monitorStatus',
        title: '监测状态',
        width: 100,
        render: (t: keyof SexObjType) => {
          return (
            <Tag color={t < 0 ? 'error' : examColorObj[t]}>
              {t < 0 ? '已驳回' : monitorStatusObj[t]}
            </Tag>
          );
        },
      },
      {
        dataIndex: 'auditStatus',
        title: '附件查看',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return (
            <Permission flag='/mession-reduction/query/fileList'>
              <Button
                type='link'
                data-type={t}
                style={{ paddingLeft: '0' }}
                onClick={() => {
                  console.log(record, 'record');
                  fileList?.(record);
                }}
              >
                查看
              </Button>
            </Permission>
          );
        },
      },
      {
        dataIndex: 'auditStatus',
        title: '事前预估报告',
        width: 140,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return record.reportStatus === 2 ? (
            <Permission flag='/mession-reduction/query/pre-report'>
              <Button
                style={{ paddingLeft: '0' }}
                type='link'
                data-type={t}
                onClick={async () => {
                  await apiSystemFileUrlFn(record.reportFile);
                }}
              >
                下载
              </Button>
              <Button
                type='link'
                disabled={Number(t) === 1}
                data-type={t}
                onClick={() => {
                  previewFn?.(record);
                }}
              >
                预览
              </Button>
            </Permission>
          ) : record.reportStatus === 0 ? (
            <Permission flag='/mession-reduction/query/pre-report'>
              <Button
                type='link'
                onClick={() => {
                  generate?.(record);
                }}
              >
                生成
              </Button>
            </Permission>
          ) : record.reportStatus === 1 ? (
            <IconFont type='icon-icon-dengdai' className='iconFontFram' />
          ) : (
            <IconFont type='icon-icon-dengdai' className='iconFontFram' />
          );
        },
      },
      {
        dataIndex: 'id',
        title: '事后监测报告',
        width: 140,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return (
            <Permission flag='/mession-reduction/query/after-report'>
              <Button
                type='link'
                data-type={t}
                style={{ paddingLeft: '0' }}
                onClick={() => {
                  history.push(`/mession-reduction/query/after-report?id=${t}`);
                }}
              >
                查看详情
              </Button>
            </Permission>
          );
        },
      },
      {
        dataIndex: 'actions',
        width: 220,
        title: '操作',
        render: (text: any, record: T) => {
          // @ts-ignore
          return (
            <Space>
              {record.orgType === 1 && (
                <Permission flag='/mession-reduction/query/metion-report'>
                  <Button
                    type='link'
                    style={{ paddingLeft: '0' }}
                    onClick={() => {
                      monitoringReport?.(record);
                    }}
                  >
                    生成监测报告
                  </Button>
                </Permission>
              )}
              {record.orgType === 3 && (
                <Permission flag='/mession-reduction/query/auditcc'>
                  <Button type='link' onClick={() => auditcc?.(record)}>
                    抄送
                  </Button>
                </Permission>
              )}
            </Space>
          );
        },
      },
    ];
  }
  // 订单管理
  if (history.location.pathname.indexOf('basic-admin/orders') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 68,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'orderId',
        title: '订单号',
        width: '120px',
        ellipsis: true,
      },
      {
        dataIndex: 'companyName',
        title: '组织名称',
        width: '120px',
      },
      {
        dataIndex: 'companyNum',
        title: '组织编号',
        width: '120px',
        ellipsis: true,
      },
      {
        dataIndex: 'origin',
        title: '订单渠道',
        width: '120px',
        ellipsis: true,
      },
      {
        dataIndex: 'testFlag',
        title: '是否测试',
        width: '120px',
        ellipsis: true,

        render: (t: keyof SexObjType) => {
          return testFlagObj[t];
        },
      },
      {
        dataIndex: 'status',
        title: '订单状态',
        width: '120px',
        render: (t: keyof SexObjType) => {
          return payStatusObj[t];
        },
      },
      {
        dataIndex: 'totalMoney',
        title: '商品总价（元）',
        width: '140px',
        ellipsis: true,
      },
      {
        dataIndex: 'recieveMoney',
        title: '应收金额（元）',
        width: '140px',
        ellipsis: true,
      },
      {
        dataIndex: 'realMoney',
        title: '实收金额（元）',
        width: '140px',
        ellipsis: true,
      },
      {
        dataIndex: 'cutMoney',
        title: '优惠金额（元）',
        width: '140px',
        ellipsis: true,
      },
      {
        dataIndex: 'orderInfo',
        title: '订单备注',
        width: '120px',
      },
      {
        dataIndex: 'createBy',
        title: '创建人',
        width: '120px',
      },
      {
        dataIndex: 'createTime',
        title: '创建时间',
        width: '120px',
        ellipsis: true,
      },
      {
        dataIndex: 'payTime',
        title: '支付时间',
        width: '120px',
        ellipsis: true,
      },
      {
        dataIndex: 'auditTime',
        title: '审核时间',
        width: '120px',
        ellipsis: true,
      },
      {
        dataIndex: 'auditState',
        title: '审核状态',
        width: '120px',
        render: (t: keyof SexObjType) => {
          return auditStateObj[t];
        },
      },
      {
        dataIndex: 'updateTime',
        title: '更新时间',
        width: '120px',
        ellipsis: true,
      },
      {
        dataIndex: 'actions',
        title: '操作',
        fixed: 'right',
        width: '220px',
        render: (text: any, record: T) => {
          return (
            <Space>
              <Button
                type='link'
                onClick={() =>
                  history.push(`/basic-admin/orders/detail?${record.orderId}`)
                }
              >
                详情
              </Button>
              {Number(record.auditState) === 0 && (
                <Button
                  type='link'
                  onClick={() => {
                    history.push(`/basic-admin/orders/exam?${record.orderId}`);
                  }}
                >
                  审核
                </Button>
              )}
              {Number(record.auditState) === 2 && (
                <Button
                  type='link'
                  onClick={() =>
                    history.push(`/basic-admin/orders/edit?${record.orderId}`)
                  }
                >
                  编辑
                </Button>
              )}
            </Space>
          );
        },
      },
    ];
  }
  // 监测数据
  if (history.location.pathname.indexOf('/mession-monitor/info') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 68,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'projectName',
        title: '项目名称',
        width: '260px',
        ellipsis: true,
      },
      {
        dataIndex: 'startDate',
        title: '监测时间段',
        width: '220px',
        ellipsis: true,
        render: (t: string, record: T) => {
          return record.startDate
            ? `${record.startDate}至${record.endDate}`
            : '-';
        },
      },
      {
        dataIndex: 'actualCapacity',
        title: '实际装机容量（MW）',
        width: '220px',
        ellipsis: true,
      },
      {
        dataIndex: 'netElecUp',
        title: '净上网电量（MWh）',
        width: '220px',
        ellipsis: true,
      },
      {
        dataIndex: 'actualReduction',
        title: '实际减排量（tCO₂e）',
        width: '220px',
        ellipsis: true,
      },
      {
        dataIndex: 'auditStatus',
        title: '审核状态',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType) => {
          return (
            <Tag color={t < 0 ? 'error' : colorObj[t]}>
              {t < 0 ? '已驳回' : auditStateObj[t]}
            </Tag>
          );
        },
      },
      {
        dataIndex: 'actions',
        title: '操作',
        fixed: 'right',
        width: '220px',
        render: (text: any, record: T) => {
          return (
            <Space>
              {[0, 1, 2, -1].indexOf(record.auditStatus) >= 0 && (
                <Permission flag='/mession-monitor/info/detail'>
                  <Button
                    type='link'
                    onClick={() =>
                      history.push(
                        `/mession-monitor/info/detail?id=${record.id}`,
                      )
                    }
                  >
                    详情
                  </Button>
                </Permission>
              )}
              {[0, -1].indexOf(record.auditStatus) >= 0 && (
                <Permission flag='/mession-monitor/info/edit'>
                  <Button
                    type='link'
                    onClick={() =>
                      history.push(`/mession-monitor/info/edit?id=${record.id}`)
                    }
                  >
                    编辑
                  </Button>
                </Permission>
              )}
              {/* {[0].indexOf(record.auditStatus) >= 0 && (
                <Permission flag='/mession-monitor/info/del'>
                  <Popconfirm
                    title={`是否删除`}
                    onConfirm={() => {
                      onDelete?.(record);
                    }}
                    onCancel={() => {}}
                    okText='确定'
                    cancelText='取消'
                  >
                    <Button type='link' danger>
                      删除
                    </Button>
                  </Popconfirm>
                </Permission>
              )} */}
            </Space>
          );
        },
      },
    ];
  }
  // 评估报告
  if (history.location.pathname.indexOf('/mession-reduction/assessment') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: '120px',
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'projectName',
        title: '项目名称',
        width: '260px',
        ellipsis: true,
      },
      {
        dataIndex: 'auditStatus',
        title: '数据查看',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return (
            <Permission flag='/mession-reduction/assessment/detail'>
              <Button
                type='link'
                data-type={t}
                onClick={() =>
                  history.push(
                    `/mession-reduction/info/detail?id=${record.projectId}`,
                  )
                }
              >
                查看
              </Button>
            </Permission>
          );
        },
      },
      {
        dataIndex: 'reportStatus',
        title: '生成报告',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return t === 0 ? (
            <Button
              type='link'
              onClick={() => {
                generate?.(record);
              }}
            >
              生成
            </Button>
          ) : t === 1 ? (
            <IconFont type='icon-icon-dengdai' className='iconFontFram' />
          ) : (
            <Tag color={Number(t) === 2 ? 'success' : 'blue'}>
              {record.reportStatus_name}
            </Tag>
          );
        },
      },
      {
        dataIndex: 'reportStatus',
        title: '下载报告',
        width: 140,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return (
            <>
              <Button
                type='link'
                disabled={Number(t) === 1}
                data-type={t}
                onClick={async () => {
                  await apiSystemFileUrlFn(record.reportFile);
                }}
              >
                下载
              </Button>
              <Button
                type='link'
                disabled={Number(t) === 1}
                data-type={t}
                onClick={() => {
                  previewFn?.(record);
                }}
              >
                预览
              </Button>
            </>
          );
        },
      },
    ];
  }
  // 参数配置
  if (history.location.pathname.indexOf('/auth/config') >= 0) {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        width: 68,
        render: (t: string, record: T, index) => index + 1,
      },
      {
        dataIndex: 'energyType',
        title: '能源类型',
        ellipsis: true,
        width: 180,
        render: (t: keyof SexObjType) => {
          return energyTypeObj[t];
        },
      },
      {
        dataIndex: 'projectType',
        title: '项目类型',
        width: 180,
        ellipsis: true,
        render: (t: keyof SexObjType) => projectTypeObj[t],
      },
      {
        dataIndex: 'auditStatus',
        title: '项目参数配置',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return (
            <>
              {' '}
              <Permission flag='/auth/config/edit'>
                <Button
                  type='link'
                  data-type={t}
                  onClick={() => {
                    history.push(`/auth/config/edit?id=${record.id}&type=1`);
                  }}
                >
                  编辑
                </Button>
              </Permission>
              <Permission flag='/auth/config/detail'>
                <Button
                  type='link'
                  data-type={t}
                  onClick={() => {
                    history.push(`/auth/config/detail?id=${record.id}&type=1`);
                  }}
                >
                  详情
                </Button>
              </Permission>
            </>
          );
        },
      },
      {
        dataIndex: 'auditStatus',
        title: '监测参数配置',
        width: 100,
        ellipsis: true,
        render: (t: keyof SexObjType, record) => {
          return (
            <>
              <Permission flag='/auth/config/metion-edit'>
                <Button
                  type='link'
                  data-type={t}
                  onClick={() => {
                    history.push(`/auth/config/edit?id=${record.id}&type=2`);
                  }}
                >
                  编辑
                </Button>
              </Permission>
              <Permission flag='/auth/config/metion-detail'>
                <Button
                  type='link'
                  data-type={t}
                  onClick={() => {
                    history.push(`/auth/config/detail?id=${record.id}&type=2`);
                  }}
                >
                  详情
                </Button>
              </Permission>
            </>
          );
        },
      },
    ];
  }
  // 订单管理
  return [];
};
