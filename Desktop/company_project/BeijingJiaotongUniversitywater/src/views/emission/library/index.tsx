/* eslint-disable react-hooks/rules-of-hooks */
/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState, useMemo } from 'react';
import { Form, Input, message, Modal, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import { IconFont } from '@components/IconFont';
import style from './index.module.scss';
import { Table } from '@/components/AutoHeightTable';
import { useDictColumn } from './utils/columns';
import { dictParams, SearchParams } from './utils';
import { createSysDict, sysDictUpdate } from '@/api/industry';
import { SysDictDataResult } from '@/api/industry/index-type';
import {
  apiBusinessList,
  apiFactorList,
  apiMarkList,
  apiPompanyList,
  apiBusinessStatus,
  apiCompanyList,
  apiProductList,
  apiQueryAuditList,
  apiQueryCompany,
  apiProRemove,
  apiEditFactorStatus,
  apiMnumListALLByDictTypeBatch,
} from '../service';
import useSyncCallback from '@/utils/useSyncCallback';
import VerifyUtils, { PersonKeys } from '@/utils/verifty';

const Dict: FC = () => {
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [form] = Form.useForm<SysDictDataResult>();
  const [modalOkLoading, setModalOkLoading] = useState(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, changeSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(10);
  // 获取枚举值
  const [menuList, getMenuList] = useState<{
    factorDataType?: { dictLabel: string; dictValue: string }[]; // 因子数据类型
    reportArea?: { dictLabel: string; dictValue: string }[]; // 发布地区
    sourceLanguage?: { dictLabel: string; dictValue: string }[]; // 源语音
    sourceLevel?: { dictLabel: string; dictValue: string }[]; // 来源类别
    factorUnitZ?: { dictLabel: string; dictValue: string }[]; // 分子单位
    factorUnitM?: { dictLabel: string; dictValue: string }[]; // 分母单位
    PFCseNUM?: { dictLabel: string; dictValue: string }[]; // 全氟化碳
    HFCsEnum?: { dictLabel: string; dictValue: string }[]; // 氢氟碳化物
    business?: { dictLabel: string; dictValue: string }[]; // 行业
    factorLabel?: { dictLabel: string; dictValue: string }[]; // 因子标签
  }>({});
  const [orgDetail, getOrgDetail] = useState<{
    companyName: string;
    companyId: string;
    companyPhone: string;
    companyNum: string;
  }>({
    companyName: '',
    companyId: '',
    companyPhone: '',
    companyNum: '',
  });
  const [modalFormVal, setModalFormVal] =
    useState<Partial<SysDictDataResult>>();
  const [dataSource, getDataSource] = useState([]);
  const getDicts = async () => {
    // 业务方接口
    if (history.location.pathname.indexOf('emission-factor/business') >= 0) {
      await apiBusinessList({ ...searchParams, pageNum, pageSize }).then(
        ({ data }) => {
          getDataSource(data.rows);
          setPageCount(data.total);
        },
      );
    }
    if (history.location.pathname.indexOf('emission-factor/myemission') >= 0) {
      await apiMarkList({
        factorMarkType: 'all',
        ...searchParams,
        pageNum,
        pageSize,
      }).then(({ data }) => {
        getDataSource(data.rows);
        setPageCount(data.total);
      });
    }
    if (
      // 产品列表
      history.location.pathname.indexOf(
        'emission-factor/orgConfig/product-list',
      ) >= 0
    ) {
      // 产品列表
      await apiProductList({
        companyId: history.location.search.split('?')[1],
        pageNum,
        pageSize,
      }).then(({ data }) => {
        getDataSource(data.data);
        setPageCount(data.total);
      });
      // 组织详情
      await apiQueryCompany({
        companyId: history.location.search.split('?')[1],
      }).then(({ data }) => {
        getOrgDetail(data.data);
      });
      return;
    }
    // 组织因子配置
    if (history.location.pathname.indexOf('emission-factor/orgConfig') >= 0) {
      await apiCompanyList({ ...searchParams, pageNum, pageSize }).then(
        ({ data }) => {
          getDataSource(data.rows);
          setPageCount(data.total);
        },
      );
    }
    // 排放因子审核列表
    if (history.location.pathname.indexOf('emission-factor/examine') >= 0) {
      await apiQueryAuditList({ ...searchParams, pageNum, pageSize }).then(
        ({ data }) => {
          getDataSource(data.rows);
          setPageCount(data.total);
        },
      );
    }
    // 排放因子库
    if (history.location.pathname.indexOf('emission-factor/library') >= 0) {
      await apiFactorList({ ...searchParams, pageNum, pageSize }).then(
        ({ data }) => {
          getDataSource(data.rows);
          setPageCount(data.total);
        },
      );
    }
    // 组织排放因子
    if (
      history.location.pathname.indexOf('emission-factor/organization') >= 0
    ) {
      await apiPompanyList({ ...searchParams, pageNum, pageSize }).then(
        ({ data }) => {
          getDataSource(data.rows);
          setPageCount(data.total);
        },
      );
    }
  };
  const useSyncCallbackFn = useSyncCallback(getDicts);

  const successFn = () => {
    setModalFormVal(undefined);
    useSyncCallbackFn();
  };
  const updateDict = async (dict: SysDictDataResult) => {
    await sysDictUpdate(dict).then(({ data }) => {
      if (data?.id) {
        message.success('数据更新成功');
        successFn();
      }
    });
  };

  const formList = useMemo<SearchFormItem[]>(() => {
    // 排放因子库
    if (history.location.pathname.indexOf('emission-factor/library') >= 0) {
      return [
        {
          name: 'name',
          label: '名称',
          type: 'Input',
          placeholder: '请填写名称',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '名称不能超过50个字符',
            },
          ],
        },
        {
          name: 'facilities',
          label: '设施/活动',
          type: 'Input',
          placeholder: '请填写设施/活动',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '设施/活动不能超过50个字符',
            },
          ],
        },
        {
          name: 'business',
          label: '适用行业',
          type: 'Select',
          searchOptionData: menuList.business,
          placeholder: '请填写适用行业',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '适用行业不能超过50个字符',
            },
          ],
        },
        {
          name: 'factorType',
          label: '数据类型',
          type: 'Select',
          searchOptionData: menuList.factorDataType,
          placeholder: '请填写数据类型',
        },
        {
          name: 'countries',
          label: '发布国家/组织',
          type: 'Select',
          placeholder: '请填写发布国家/组织',
          searchOptionData: menuList.reportArea,
        },
        {
          name: 'sourceLevel',
          label: '来源类别',
          type: 'Select',
          searchOptionData: menuList.sourceLevel,
          placeholder: '请填写来源类别',
        },
        {
          name: 'status',
          label: '状态',
          type: 'Select',
          placeholder: '请填写状态',
          searchOptionData: [
            {
              label: '启用',
              value: '1',
            },
            {
              label: '禁用',
              value: '0',
            },
          ],
        },
      ];
    }
    // 我的排放因子库
    if (history.location.pathname.indexOf('emission-factor/myemission') >= 0) {
      return [
        {
          name: 'name',
          label: '名称',
          type: 'Input',
          placeholder: '请填写名称',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '名称不能超过50个字符',
            },
          ],
        },
        {
          name: 'factorMarkType',
          label: '类型',
          type: 'Select',
          searchOptionData: [
            {
              dictValue: 'add',
              dictLabel: '新增因子',
            },
            {
              dictValue: 'edit',
              dictLabel: '修改因子类',
            },
          ],
          placeholder: '请填写类型',
        },
        {
          name: 'auditStatus',
          label: '审核状态',
          type: 'Select',
          placeholder: '请填写审核状态',
          searchOptionData: [
            {
              dictValue: '0',
              dictLabel: '待审核',
            },
            {
              dictValue: '1',
              dictLabel: '审核通过',
            },
            {
              dictValue: '2',
              dictLabel: '审核不通过',
            },
          ],
        },
      ];
    }
    // 排放因子审核
    if (history.location.pathname.indexOf('emission-factor/examine') >= 0) {
      return [
        {
          name: 'name',
          label: '名称',
          type: 'Input',
          placeholder: '请填写名称',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '名称不能超过50个字符',
            },
          ],
        },
        {
          name: 'factorMarkType',
          label: '类型',
          type: 'Select',
          placeholder: '请填写类型',
          searchOptionData: [
            {
              dictValue: 'add',
              dictLabel: '新增因子',
            },
            {
              dictValue: 'edit',
              dictLabel: '修改因子类',
            },
          ],
        },
        {
          name: 'auditStatus',
          label: '审核状态',
          type: 'Select',
          placeholder: '请填写审核状态',
          searchOptionData: [
            {
              dictValue: '0',
              dictLabel: '待审核',
            },
            {
              dictValue: '1',
              dictLabel: '审核通过',
            },
            {
              dictValue: '2',
              dictLabel: '审核不通过',
            },
          ],
        },
        {
          name: 'createBy',
          label: '提交人',
          type: 'Input',
          placeholder: '请填写提交人',
        },
      ];
    }
    // 组织排放因子
    if (
      history.location.pathname.indexOf('emission-factor/organization') >= 0
    ) {
      return [
        {
          name: 'name',
          label: '名称',
          type: 'Input',
          placeholder: '请填写名称',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '名称不能超过50个字符',
            },
          ],
        },
        {
          name: 'facilities',
          label: '设施/活动',
          type: 'Input',
          placeholder: '请填写设施/活动',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '设施/活动不能超过50个字符',
            },
          ],
        },
        {
          name: 'business',
          label: '适用行业',
          type: 'Select',
          searchOptionData: menuList.business,
          placeholder: '请填写适用行业',
        },
        {
          name: 'sourceLevel',
          label: '来源类别',
          type: 'Select',
          searchOptionData: menuList.sourceLevel,
          placeholder: '请填写来源类别',
        },
      ];
    }
    // 排放因子业务方
    if (history.location.pathname.indexOf('emission-factor/business') >= 0) {
      return [
        {
          name: 'businessName',
          label: '业务方名称',
          type: 'Input',
          placeholder: '请填写业务方名称',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '业务方名称不能超过50个字符',
            },
          ],
        },
        {
          name: 'businessLabel',
          label: '业务方标识',
          type: 'Input',
          placeholder: '请填写业务方标识',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '业务方标识不能超过50个字符',
            },
          ],
        },
        {
          name: 'status',
          label: '状态',
          type: 'Select',
          placeholder: '请填写状态',
          searchOptionData: [
            {
              label: '启用',
              value: '1',
            },
            {
              label: '禁用',
              value: '0',
            },
          ],
        },
      ];
    }
    // 组织因子配置
    if (history.location.pathname.indexOf('emission-factor/orgConfig') >= 0) {
      return [
        {
          name: 'companyName',
          label: '组织名称',
          type: 'Input',
          placeholder: '请填写组织名称',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '组织名称不能超过50个字符',
            },
          ],
        },
        {
          name: 'companyNum',
          label: '组织编码',
          type: 'Input',
          placeholder: '请填写组织编码',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '组织编码不能超过50个字符',
            },
          ],
        },
        {
          name: 'companyPhone',
          label: '组织负责人账号',
          type: 'Input',
          placeholder: '请填写组织负责人账号',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '组织负责人编号不能超过50个字符',
            },
          ],
        },
      ];
    }

    return [];
  }, [menuList]);
  const columns = useDictColumn<SysDictDataResult>({
    onEdit: record => {
      form.setFieldsValue({
        ...record,
      });
      setModalFormVal({ ...record });
    },
    updateStatus: async record => {
      if (history.location.pathname.indexOf('emission-factor/library') >= 0) {
        await apiEditFactorStatus({ id: record.id }).then(({ data }) => {
          VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
          useSyncCallbackFn();
        });
        return;
      }
      await apiBusinessStatus({ id: record.id }).then(({ data }) => {
        VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
        useSyncCallbackFn();
      });
    },
    delFn: async record => {
      console.log(record);
      if (
        history.location.pathname.indexOf(
          '/emission-factor/orgConfig/product-list',
        ) >= 0
      ) {
        await apiProRemove({ id: record.id }).then(({ data }) => {
          VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
          useSyncCallbackFn();
        });
      }
      return '';
    },
    history,
  });

  const createDictFields = dictParams;
  const closeCreateDictModal = () => {
    setModalFormVal(undefined);
  };

  const onSearch = (params: SearchParams) => {
    setPageNum(1);
    setSearchParams(params);
    useSyncCallbackFn();
  };
  // 获取需要的枚举值 行业 数据类型 发布国家组织 来源类别 状态
  const apiMnumListALLByDictTypeBatchFn = async () => {
    await apiMnumListALLByDictTypeBatch({
      dictTypes: `sourceLanguage,factorDataType,reportArea,sourceLevel,factorUnitM,factorUnitZ,PFCseNUM,HFCsEnum,business,factorLabel`,
    }).then(({ data }) => {
      getMenuList({ ...data.data });
    });
  };
  useEffect(() => {
    apiMnumListALLByDictTypeBatchFn();
    getDicts();
  }, []);
  const returnText = () => {
    if (history.location.pathname === '/emission-factor/business') {
      return '新增业务方';
    }
    if (history.location.pathname === '/emission-factor/myemission') {
      return '新增因子';
    }
    if (
      history.location.pathname.indexOf(
        '/emission-factor/orgConfig/product-list',
      ) >= 0
    ) {
      return '新增配置';
    }

    return '';
  };
  return (
    <div className={style.dictWrapper} style={{ flex: '1' }}>
      {/* 组织因子产品列表 */}
      {!['/emission-factor/orgConfig/product-list'].some(
        item => history.location.pathname.indexOf(item) >= 0,
      ) ? (
        <div className={style.header}>
          <SearchForm
            formList={formList}
            onSearch={onSearch}
            onClick={() => {}}
          />
        </div>
      ) : (
        <div style={{ padding: '10px 16px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>组织名称：{orgDetail.companyName}</p>
            <p>组织编码：{orgDetail.companyNum}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>组织负责人账号：{orgDetail.companyPhone}</p>
          </div>
        </div>
      )}
      <div className={style.tableWrapper}>
        {[
          '/emission-factor/myemission',
          '/emission-factor/business',
          '/emission-factor/orgConfig/product-list',
        ].some(item => history.location.pathname.indexOf(item) >= 0) && (
          <Button
            className={style.addDict}
            type='link'
            icon={<IconFont type='icon-icon-tianjia' />}
            onClick={() => {
              if (history.location.pathname === '/emission-factor/business') {
                history.push('/emission-factor/business/add');
              }
              if (
                history.location.pathname.indexOf(
                  '/emission-factor/orgConfig/product-list',
                ) >= 0
              ) {
                history.push(
                  `/emission-factor/orgConfig/product-list/add?${
                    history.location.search.split('?')[1]
                  }`,
                );
              }
              // 我的因子单据
              if (
                history.location.pathname.indexOf(
                  'emission-factor/myemission',
                ) >= 0
              ) {
                history.push(`/emission-factor/myemission/add`);
              }
            }}
          >
            {returnText()}
          </Button>
        )}
        <Table
          columns={columns}
          dataSource={dataSource}
          className={style.table}
          scroll={{ x: 1300 }}
          pagination={{
            pageSize,
            total: pageCount || 0,
            current: pageNum,
            onChange: (number, size) => {
              setPageNum(number);
              changeSize(size);
              useSyncCallbackFn();
            },
          }}
        />
      </div>
      <Modal
        title='新增字典'
        visible={!!modalFormVal}
        onCancel={() => closeCreateDictModal()}
        maskClosable={false}
        width={400}
        className={style.dictModal}
        onOk={async () => {
          setModalOkLoading(true);
          await form
            .validateFields()
            .then(fields => {
              // edit
              if (modalFormVal?.id) {
                return updateDict({ ...modalFormVal, ...fields });
              }
              // create;
              return createSysDict({ ...modalFormVal, ...fields }).then(
                ({ data }) => {
                  if (data?.id) {
                    message.success('创建成功');
                    successFn();
                  }
                },
              );
            })
            .finally(() => {
              setModalOkLoading(false);
            });
        }}
        okButtonProps={{
          loading: modalOkLoading,
        }}
      >
        <Form form={form}>
          {createDictFields.map(item => (
            <Form.Item {...item}>
              <Input placeholder='请输入' />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default Dict;
