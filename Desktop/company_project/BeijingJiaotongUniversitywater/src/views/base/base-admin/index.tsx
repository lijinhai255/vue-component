/* eslint-disable react-hooks/rules-of-hooks */
/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState, useMemo } from 'react';
import { Form, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import { Moment } from 'moment';
import VerifyUtils, { PersonKeys } from '@utils/verifty';
import { renderAsync } from 'docx-preview';
import { CloseOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { Table } from '@/components/AutoHeightTable';
import { useDictColumn } from './utils/columns';
import { SearchParams } from './utils';
import { SysDictDataResult } from '@/api/industry/index-type';
import store from '@/store';
import {
  apiRolePage,
  NavForm,
  apiDeleteProjectCcpbc,
  EditGoodsProps,
  apiAccountPage,
  apiOrganizationPage,
  apiProjectInfoFileList,
  apiRoleDelete,
  apiInfoArchivec,
  apiGenerate,
  apiSystemFilePreviewBase64,
  apiUserActive,
  apiProductionSysManageList,
  apiProductionDelete,
  apiStandardList,
  apiStandardDelete,
} from '../service';
import useSyncCallback from '@/utils/useSyncCallback';
// import Permission from '@/utils/permission';
import ReportModal from './component/reportModal';

const Dict: FC = () => {
  interface GoodsProps {
    goodsId?: string;
    goodsName?: string;
    status?: string;
  }
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<SearchParams & GoodsProps>(
    {},
  );
  const [form] = Form.useForm<SysDictDataResult & NavForm>();
  const [dataSource, getDataSource] = useState([]);
  const [mechanism, setmechanism] = useState<any>([]);
  const [page, getPage] = useState(1);
  const [size, changeSize] = useState(10);
  const [count, getCount] = useState(10);
  // 生成监测报告
  const [monitoringReportVisible, changeMonitoringReportVisible] =
    useState<boolean>(false);

  const [projectId, changeProjectId] = useState<number>(0);

  // 预览 获取报告数据
  const [previewModel, changePreviewModel] = useState(false);
  const { user } = store.getState();

  // 获取列表数据
  const getDicts = async () => {
    if (history.location.pathname.indexOf('/auth/org') >= 0) {
      console.log(searchParams);
      await apiOrganizationPage({
        ...searchParams,
        page,
        page_size: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.results);
          getCount(data.data.count);
          return;
        }
        VerifyUtils.Toast('error', data.msg);
      });
    }
    if (history.location.pathname.indexOf('/auth/role') >= 0) {
      await apiRolePage({ ...searchParams, page, page_size: size }).then(
        ({ data }) => {
          if (data.code === 200) {
            getDataSource(data.data.results);
            getCount(data.data.count);
          }
        },
      );
    }
    if (history.location.pathname.indexOf('/auth/user') >= 0) {
      await apiAccountPage({
        ...searchParams,
        page,
        page_size: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.results);
          getCount(data.data.count);
        }
      });
    }
    if (
      history.location.pathname.indexOf(
        '/data-quality-management/production',
      ) >= 0
    ) {
      await apiProductionSysManageList({
        ...searchParams,
        page,
        page_size: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.results);
          getCount(data.data.count);
        }
      });
    }
    if (
      history.location.pathname.indexOf('/data-quality-management/standard') >=
      0
    ) {
      await apiStandardList({
        ...searchParams,
        page,
        page_size: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.results);
          getCount(data.data.count);
        }
      });
    }
  };
  const syncCallbackFn = useSyncCallback(getDicts);
  const formList = useMemo<SearchFormItem[]>(() => {
    // 组织管理
    if (history.location.pathname.indexOf('/auth/org') >= 0) {
      return [
        {
          name: 'name',
          // label: '组织名称',
          type: 'Input',
          placeholder: '组织名称',
          rules: [],
          class: '230px',
        },
        {
          name: 'org_code',
          type: 'Input',
          placeholder: '组织编码',
          rules: [],
          class: '230px',
        },
      ];
    }
    // 用户管理
    if (history.location.pathname.indexOf('/auth/user') >= 0) {
      return [
        {
          name: 'username',
          // label: '账号',
          type: 'Input',
          placeholder: '账号',
          rules: [],
          class: '160px',
        },
        {
          name: 'nick_name',
          type: 'Input',
          placeholder: '姓名',
          rules: [],
          class: '160px',
        },
        {
          name: '_phone',
          type: 'Input',
          placeholder: '联系方式',
          rules: [],
          class: '160px',
        },
        {
          name: 'is_active',
          type: 'Select',
          class: '120px',
          placeholder: '状态',
          searchOptionData: [
            { value: 'true', label: '启用' },
            { value: 'false', label: '禁用' },
          ],
        },
        {
          name: 'organization_id',
          type: 'Select',
          class: '120px',
          placeholder: '所属组织',
          searchOptionData: mechanism,
        },
      ];
    }
    // 角色管理
    if (history.location.pathname.indexOf('/auth/role') >= 0) {
      return [
        {
          name: 'name',
          // label: '角色名称',
          type: 'Input',
          placeholder: '角色名称',
          rules: [],
          class: '230px',
        },
      ];
    }
    // 生产系统管理
    if (
      history.location.pathname.indexOf(
        '/data-quality-management/production',
      ) >= 0
    ) {
      return [
        {
          name: 'sys_name',
          // label: '组织名称',
          type: 'Input',
          placeholder: '系统名称',
          rules: [],
          class: '230px',
        },
        {
          name: 'organization_id',
          type: 'Select',
          class: '120px',
          placeholder: '所属组织',
          searchOptionData: mechanism,
        },
        {
          name: 'sys_type',
          type: 'Select',
          class: '120px',
          placeholder: '系统类型',
          searchOptionData: [
            // { value: 1, label: '新鲜水系统' },
            // { value: 2, label: '循环水系统' },
            // { value: 3, label: '化学水系统' },
            { value: 4, label: '污水处理系统' },
          ],
        },
      ];
    }
    // 行业标准
    if (
      history.location.pathname.indexOf('/data-quality-management/standard') >=
      0
    ) {
      return [
        {
          name: 'zh_hans_name',
          // label: '组织名称',
          type: 'Input',
          placeholder: '中文标准名称',
          rules: [],
          class: '230px',
        },
        {
          name: 'level',
          type: 'Select',
          class: '120px',
          placeholder: '标准级别',
          searchOptionData: [
            { value: 1, label: '国际标准' },
            { value: 2, label: '国家标准' },
            { value: 3, label: '地方标准' },
            { value: 4, label: '行业标准' },
            { value: 5, label: '企业标准' },
            { value: 6, label: '产品标准' },
          ],
        },
        {
          name: 'classify',
          type: 'Select',
          class: '120px',
          placeholder: '标准分类',
          searchOptionData: [
            { value: 1, label: '水管理标准' },
            { value: 2, label: '能源管理标准' },
            { value: 3, label: '碳管理标准' },
            { value: 4, label: '环境管理标准' },
          ],
        },
        {
          name: 'status',
          type: 'Select',
          class: '120px',
          placeholder: '状态',
          searchOptionData: [
            { value: 1, label: '即将施行' },
            { value: 2, label: '现行' },
            { value: 3, label: '废止' },
          ],
        },
      ];
    }

    return [];
  }, [form.getFieldsValue(true), mechanism]);

  // 列表操作事件
  const columns = useDictColumn<SysDictDataResult & NavForm & EditGoodsProps>({
    updateStatus: async (record): Promise<void> => {
      if (history.location.pathname.indexOf('/auth/user') >= 0) {
        await apiUserActive({
          id: record.id,
          is_active: !record.is_active,
        }).then(({ data }) => {
          syncCallbackFn();
          VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
        });
      }
    },

    onDelete: async (record: { id: number }): Promise<void> => {
      if (history.location.pathname.indexOf('/auth/role') >= 0) {
        await apiRoleDelete({ id: record.id }).then(({ data }) => {
          syncCallbackFn();
          VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
        });
        return;
      }
      if (
        history.location.pathname.indexOf(
          '/data-quality-management/production',
        ) >= 0
      ) {
        await apiProductionDelete({ id: record.id }).then(({ data }) => {
          syncCallbackFn();
          VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
        });
        return;
      }
      if (
        history.location.pathname.indexOf(
          '/data-quality-management/standard',
        ) >= 0
      ) {
        await apiStandardDelete({ id: record.id }).then(({ data }) => {
          syncCallbackFn();
          VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
        });
      }
    },
    ccpbc: async (record: { id: number }): Promise<void> => {
      await apiDeleteProjectCcpbc({ id: record.id }).then(({ data }) => {
        if (data.code === 200) {
          VerifyUtils.Toast('success', '报送成功');
        }
        syncCallbackFn();
      });
    },
    archive: async (record: { id: number }): Promise<void> => {
      await apiInfoArchivec({
        id: record.id,
      }).then(async ({ data }) => {
        if (data.code === 200) {
          await VerifyUtils.Toast('success', '归档成功');
        }
        await VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
        syncCallbackFn();
      });
    },
    fileList: async (record: { id: number }): Promise<void> => {
      // 查看附件
      console.log(record, 'record-record');
      await apiProjectInfoFileList({ id: record.id }).then(({ data }) => {
        console.log(data, 'data');
      });
    },
    onProduct: (record, type) => {
      let path = '';
      if (type === 'class') {
        path = `/basic-admin/nav/product-class`;
      } else if (type === 'list') {
        path = `/basic-admin/nav/product-list`;
      }
      history.push(
        `${path}?id=${record.guideId}&name=${record.guideName}&isFloat=${record.isFloat}`,
      );
    },
    generate: async (record): Promise<void> => {
      await apiGenerate({
        projectId: record.projectId
          ? record.projectId
          : `${record.id}`
          ? `${record.id}`
          : '',
      }).then(async ({ data }) => {
        if (data.code === 200) {
          await VerifyUtils.Toast('success', '生成成功');
        }
        await VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
        syncCallbackFn();
      });
    },
    greenPerformance: record => {
      console.log(record, 'record');
    },
    monitoringReport: async record => {
      changeProjectId(record.id);
      changeMonitoringReportVisible(true);
    },
    previewFn: async record => {
      changePreviewModel(true);
      console.log(record);
      // @ts-ignore
      await apiSystemFilePreviewBase64(record.reportFile).then(({ data }) => {
        console.log(data, 'data');
        // @ts-ignore
        const del = document.getElementById('container');
        console.log(del, 'del=del');
        if (del) {
          renderAsync(
            base64toBlob(
              `data:application/octet-stream;base64,${data}`,
              'ceshi.docx',
            ),
            del,
          ).then(x => console.log(1221212, x));
        }
      });
    },
    history,
    orgType: user.orgType,
  });
  function base64toBlob(dataurl: any, filename: any) {
    console.log(dataurl, ';dataurl=dataurl');
    // 将base64转换为文件
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  // const createDictFields = dictParams;
  const onSearch = (
    params: SearchParams & {
      beginTime: [Moment, Moment] | null;
    },
  ) => {
    setSearchParams({
      ...params,
    });
    getPage(1);
    syncCallbackFn();
  };
  // 获取所属组织
  const apiOrgTreeFn = async () => {
    await apiOrganizationPage({
      page: 1,
      page_size: 100,
    }).then(({ data }) => {
      console.log(data, 'data=data');
      if (data.code !== 200) VerifyUtils.Toast('info', data.msg);
      if (data?.data) {
        data.data.results.forEach((item: any) => {
          item.label = item.name;
          item.value = item.id;
        });
        setmechanism(data.data.results);
      } else {
        setmechanism([]);
      }
    });
  };
  useEffect(() => {
    if (
      history.location.pathname.indexOf('auth/user') >= 0 ||
      history.location.pathname.indexOf(
        '/data-quality-management/production',
      ) >= 0
    ) {
      apiOrgTreeFn();
    }
  }, []);

  useEffect(() => {
    syncCallbackFn();
    // apiOrgTreeFn();
  }, []);
  const returnNavText = () => {
    if (history.location.pathname === '/data-quality-management/production') {
      return '新增';
    }
    if (history.location.pathname === '/data-quality-management/standard') {
      return '新增';
    }
    if (history.location.pathname === '/auth/user') {
      return '新增';
    }
    if (history.location.pathname === '/auth/org') {
      return '新增';
    }
    if (history.location.pathname === '/auth/role') {
      return '新增';
    }
    return '';
  };
  return (
    <div className={style.dictWrapper} style={{ flex: '1' }}>
      {!(
        ['/basic-admin/nav', '/mession-reduction/assessment'].indexOf(
          history.location.pathname,
        ) >= 0
      ) && (
        <div className={style.header}>
          <SearchForm
            formList={formList}
            onSearch={onSearch}
            onClick={() => {}}
          />

          <Button
            className={style.addDict}
            type='primary'
            style={{ marginBottom: '20px' }}
            onClick={() => {
              if (
                history.location.pathname.indexOf(
                  '/data-quality-management/production',
                ) >= 0
              ) {
                return history.push(`/data-quality-management/production/add`);
              }
              if (
                history.location.pathname.indexOf(
                  '/data-quality-management/standard',
                ) >= 0
              ) {
                return history.push(`/data-quality-management/standard/add`);
              }
              if (history.location.pathname.indexOf('/basic-admin/nav') >= 0) {
                form.setFieldsValue({
                  guideName: '',
                  isFloat: 1,
                  orderNum: 1,
                });
                return null;
              }
              // 新增用户
              if (history.location.pathname.indexOf('/auth/user') >= 0) {
                return history.push(`/auth/user/add`);
              }
              // 新增组织
              if (history.location.pathname.indexOf('/auth/org') >= 0) {
                history.push(`/auth/org/add`);
                return null;
              }
              // 新增角色
              if (history.location.pathname.indexOf('/auth/role') >= 0) {
                history.push(`/auth/role/add`);
                return null;
              }
              return null;
            }}
          >
            {returnNavText()}
          </Button>
        </div>
      )}
      <div className={style.tableWrapper}>
        <Table
          columns={columns}
          scroll={{ x: 1000 }}
          dataSource={dataSource}
          className={style.table}
          rowKey={record => record.id}
          pagination={
            ['/mession-reduction/assessment'].indexOf(
              history.location.pathname,
            ) >= 0
              ? false
              : {
                  showSizeChanger: true,
                  pageSize: size,
                  total: count,
                  current: page,
                  onChange: (pageNum, pageSize) => {
                    getPage(pageNum);
                    changeSize(pageSize);
                    syncCallbackFn();
                  },
                }
          }
        />
        <div
          className={style.model}
          style={{ display: previewModel ? 'block' : 'none' }}
        >
          <Button
            shape='circle'
            className={style.closeIcon}
            icon={<CloseOutlined color='#fff' />}
            onClick={() => {
              changePreviewModel(false);
            }}
          />
          <div id='container' />
        </div>
        {
          // <div className='Drawer-Btn_position'>
          //   <Button
          //     onClick={() => {
          //       history.go(-1);
          //     }}
          //   >
          //     返回
          //   </Button>
          // </div>
        }
      </div>
      <ReportModal
        monitoringReportVisible={monitoringReportVisible}
        changeMonitoringReportVisible={changeMonitoringReportVisible}
        projectId={projectId}
      />
    </div>
  );
};

export default Dict;
