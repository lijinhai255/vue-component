/* eslint-disable react-hooks/rules-of-hooks */
/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState, useMemo } from 'react';
import {
  Form,
  Input,
  Modal,
  Button,
  Select,
  InputNumber,
  Transfer,
} from 'antd';
import { useHistory } from 'react-router-dom';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import { Moment } from 'moment';
import { Rule } from 'antd/lib/form';
import style from './index.module.scss';
import { Table } from '@/components/AutoHeightTable';
import { useDictColumn } from './utils/columns';
import { SearchParams } from './utils';
import VerifyUtils, { PersonKeys } from '@utils/verifty';
import { SysDictDataResult } from '@/api/industry/index-type';
import store from '@/store';
import { renderAsync } from 'docx-preview';
import {
  apiGetGetRoles,
  NavForm,
  apiDeleteProjectInfo,
  apiDeleteProjectCcpbc,
  EditGoodsProps,
  apiEnterprisePage,
  apiSystemOrgPage,
  apiUserPage,
  apiProjectInfoPage,
  apiProjectAuditPage,
  apiOrgTree,
  apiOrgTreeCheck,
  apiAuditCc,
  apiAuditCcheck,
  apiProjectDataPage,
  apiProjectPage,
  apiprojectParamPage,
  apiProjectInfoFileList,
  apiProjectDataList,
  apiRoleDelete,
  apiprojectParamPageList,
  apiModifyAmount,
  apiInfoArchivec,
  apiGenerate,
  apiSystemFilePreviewBase64,
} from '../service';
import { apiInfoDetail } from '@/views/emission/service';
import { FileImageOutlined } from '@ant-design/icons';
import useSyncCallback from '@/utils/useSyncCallback';
import Permission from '@/utils/permission';
import { CloseOutlined } from '@ant-design/icons';
import ReportModal from './component/reportModal';
let timer: unknown = undefined;
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
  const [modalOkLoading, setModalOkLoading] = useState(false);
  const [dataSource, getDataSource] = useState([]);
  const [page, getPage] = useState(1);
  const [size, changeSize] = useState(10);
  const [count, getCount] = useState(10);
  const [modalFormVal, setModalFormVal] = useState<boolean>(false);
  const [companyData, getCompanyData] = useState<
    { orgName: string; id: number }[]
  >([]);
  const [currentId, setCurrentId] = useState<number>(0);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // 附件查看
  const [modalFilrFormVal, changeModalFilrFormVal] = useState<boolean>(false);
  // 生成监测报告
  const [monitoringReportVisible, changeMonitoringReportVisible] =
    useState<boolean>(false);
  const [dataFileList, getDataFileList] = useState({
    feasibilityReportFile: [],
    projectApprovalFile: [],
    envAssessmentFile: [],
    envApprovalFile: [],
    gridConnectFile: [],
    elecUpFile: [],
    elecDownFile: [],
  });
  const [projectId, changeProjectId] = useState<number>(0);
  /**
   * 控制绿色绩效弹窗
   *
   */
  const [isShowgreenPerformance, changeIsgreenPerformance] = useState(false);
  const [greenPerformanceData, getGreenPerformance] = useState<{
    greenPerformance?: string;
    loanAmount?: string;
    totalAmount?: string;
  }>({});
  //预览 获取报告数据
  const [previewModel, changePreviewModel] = useState(false);
  const { user } = store.getState();
  const clearTimer = () => {
    if (timer) {
      //@ts-ignore
      clearTimeout(timer);
      timer = undefined;
    }
  };
  const startTimer = () => {
    if (timer) {
      return;
    }
    timer = setTimeout(async () => {
      await setTimeoutFn();
    }, 5000);
  };
  let setTimeoutFn = async () => {
    try {
      const { data } = await apiprojectParamPageList({
        ...searchParams,
        pageNo: page,
        pageSize: size,
      });
      if (data.code === 200) {
        getDataSource(data.data);
        clearTimer();
        // 如果数据存在 又一个未生成的
        let isCule = data.data.some(
          (item: { reportStatus: number }) => item.reportStatus === 0,
        );
        if (isCule) {
          startTimer();
        }
        // getCount(data.data.total);
      }
      // getCount(data.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getDicts = async () => {
    if (history.location.pathname.indexOf('/business-info') >= 0) {
      await apiEnterprisePage({
        ...searchParams,
        pageNo: page,
        pageSize: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.list);
          getCount(data.data.total);
        }
      });
    }
    if (history.location.pathname.indexOf('/auth/org') >= 0) {
      console.log(searchParams);
      await apiSystemOrgPage({
        ...searchParams,
        startDate:
          Object.keys(searchParams).length > 0
            ? 'startDate' in searchParams
              ? //@ts-ignore
                searchParams?.startDate[0]?.format('YYYY-MM-DD')
              : ''
            : '',
        //@ts-ignore
        endDate:
          Object.keys(searchParams).length > 0
            ? 'startDate' in searchParams
              ? //@ts-ignore
                searchParams?.startDate[1]?.format('YYYY-MM-DD')
              : ''
            : '',
        pageNo: page,
        pageSize: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.list);
          getCount(data.data.total);
          return;
        }
        VerifyUtils.Toast('error', data.msg);
      });
    }
    if (history.location.pathname.indexOf('/auth/role') >= 0) {
      await apiGetGetRoles({ pageNo: page, pageSize: size }).then(
        ({ data }) => {
          if (data.code === 200) {
            getDataSource(data.data.list);
            getCount(data.data.total);
          }
        },
      );
    }
    if (history.location.pathname.indexOf('/auth/user') >= 0) {
      await apiUserPage({ ...searchParams, pageNo: page, pageSize: size }).then(
        ({ data }) => {
          if (data.code === 200) {
            getDataSource(data.data.list);
            getCount(data.data.total);
          }
        },
      );
    }
    if (history.location.pathname.indexOf('/mession-reduction/info') >= 0) {
      await apiProjectInfoPage({
        ...searchParams,
        pageNo: page,
        pageSize: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.list);
          getCount(data.data.total);
          return;
        }
        VerifyUtils.Toast('error', data.msg);
      });
    }
    if (history.location.pathname.indexOf('/mession-reduction/exam') >= 0) {
      // 项目审核列表
      await apiProjectAuditPage({
        ...searchParams,
        //@ts-ignore
        startDate: searchParams?.beginTime
          ? //@ts-ignore
            searchParams?.beginTime[0]?.format('YYYY-MM-DD')
          : '',
        //@ts-ignore
        endDate: searchParams?.beginTime
          ? //@ts-ignore
            searchParams?.beginTime[1]?.format('YYYY-MM-DD')
          : '',
        beginTime: '',
        pageNo: page,
        pageSize: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.list);
          getCount(data.data.total);
        }
      });
    }
    // 项目监测
    if (history.location.pathname.indexOf('/mession-monitor/info') >= 0) {
      // 项目审核列表
      await apiProjectDataPage({
        ...searchParams,
        //@ts-ignore
        startDate: searchParams?.beginTime
          ? //@ts-ignore
            searchParams?.beginTime[0]?.format('YYYY-MM-DD')
          : '',
        //@ts-ignore
        endDate: searchParams?.beginTime
          ? //@ts-ignore
            searchParams?.beginTime[1]?.format('YYYY-MM-DD')
          : '',
        beginTime: '',
        pageNo: page,
        pageSize: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.list);
          getCount(data.data.total);
        }
      });
    }
    // 项目事后
    if (
      history.location.pathname.includes(
        '/mession-reduction/query/after-report',
      )
    ) {
      try {
        const id = new URLSearchParams(location.search).get('id') || '';
        const { data } = await apiProjectDataList({
          projectId: id,
          pageNo: page,
          pageSize: size,
        });
        if (data.code === 200) {
          getDataSource(data.data);
          // getCount(data.data.total);
        }
        // getCount(data.data.total);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    // 项目查询
    if (history.location.pathname.includes('mession-reduction/query')) {
      try {
        const { data } = await apiProjectPage({
          ...searchParams,
          //@ts-ignore
          startDate: searchParams?.endDate
            ? //@ts-ignore
              searchParams?.endDate[0]?.format('YYYY-MM-DD')
            : '',
          //@ts-ignore
          endDate: searchParams?.endDate
            ? //@ts-ignore
              searchParams?.endDate[1]?.format('YYYY-MM-DD')
            : '',
          beginTime: '',
          pageNo: page,
          pageSize: size,
        });
        if (data.code === 200) {
          getDataSource(data.data.list);
          getCount(data.data.total);
        }
        getCount(data.data.total);
      } catch (error) {
        console.log(error);
      }
    }
    if (history.location.pathname.includes('/mession-reduction/assessment')) {
      await setTimeoutFn();
    }
    // 参数配置
    if (history.location.pathname.includes('/auth/config')) {
      try {
        const { data } = await apiprojectParamPage({
          ...searchParams,
          //@ts-ignore
          startDate: searchParams?.beginTime
            ? //@ts-ignore
              searchParams?.beginTime[0]?.format('YYYY-MM-DD')
            : '',
          //@ts-ignore
          endDate: searchParams?.beginTime
            ? //@ts-ignore
              searchParams?.beginTime[1]?.format('YYYY-MM-DD')
            : '',
          beginTime: '',
          pageNo: page,
          pageSize: size,
        });
        if (data.code === 200) {
          getDataSource(data.data.list);
          getCount(data.data.total);
        }
        getCount(data.data.total);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const syncCallbackFn = useSyncCallback(getDicts);
  const [accoutnModalFormVal, setAccoutnModalFormVal] = useState(false);
  const formList = useMemo<SearchFormItem[]>(() => {
    // 企业变更审核
    if (history.location.pathname.indexOf('business-info') >= 0) {
      return [
        {
          name: 'likeOrgName',
          label: '企业名称',
          type: 'Input',
          placeholder: '企业名称',
          rules: [
            // {
            //   type: 'string',
            //   max: 50,
            //   message: '企业名称不能超过50个字符',
            // },
          ],
        },
      ];
    }
    // 组织管理
    if (history.location.pathname.indexOf('auth/org') >= 0) {
      return [
        {
          name: 'likeOrgName',
          label: '组织名称',
          type: 'Input',
          placeholder: '请填写',
          rules: [],
          class: '230px',
        },
        {
          name: 'orgType',
          label: '组织类型',
          type: 'Select',
          class: '170px',
          placeholder: '请选择',
          searchOptionData: [
            { value: '1', label: '征信机构' },
            { value: '2', label: '人民银行' },
            { value: '3', label: '金融机构' },
            { value: '4', label: '核查机构' },
            { value: '5', label: '贷款企业' },
          ],
        },
        {
          name: 'contactMobile',
          label: '联系电话',
          type: 'Input',
          placeholder: '请填写',
          class: '170px',
        },
        {
          name: 'orgStatus',
          label: '状态',
          type: 'Select',
          placeholder: '请选择',
          searchOptionData: [
            { value: '0', label: '正常' },
            { value: '1', label: '待审核' },
            { value: '2', label: '审核不通过' },
          ],
        },
        {
          name: 'startDate',
          label: '创建时间',
          type: 'selectTimck',
          placeholder: '请选择',
        },
      ];
    }
    // 产品管理
    if (history.location.pathname.indexOf('/auth/user') >= 0) {
      return [
        {
          name: 'mobile',
          label: '手机号',
          type: 'Input',
          placeholder: '手机号',
          rules: [],
          class: '160px',
        },
        {
          name: 'likeOrgName',
          label: '所属组织',
          type: 'Input',
          placeholder: '所属组织',
          rules: [],
          class: '200px',
        },
        {
          name: 'userStatus',
          label: '状态',
          type: 'Select',
          class: '120px',
          placeholder: '全部',
          searchOptionData: [
            { value: '0', label: '启用' },
            { value: '1', label: '禁用' },
          ],
        },
        {
          name: 'orgType',
          label: '组织类型',
          type: 'Select',
          class: '120px',
          placeholder: '全部',
          searchOptionData: [
            { value: 1, label: '征信机构' },
            { value: 2, label: '人民银行' },
            { value: 3, label: '金融机构' },
            { value: 4, label: '核查机构' },
            { value: 5, label: '贷款企业' },
          ],
        },
      ];
    }
    // 商品管理
    if (history.location.pathname.indexOf('/mession-reduction/info') >= 0) {
      return [
        {
          name: 'likeProjectName',
          label: '项目名称',
          type: 'Input',
          placeholder: '请填写',
          rules: [
            {
              type: 'string',
              max: 50,
              message: '企业名称不能超过50个字符',
            },
          ],
        },
      ];
    }
    // 项目审核
    if (history.location.pathname.indexOf('/mession-reduction/exam') >= 0) {
      return [
        {
          name: 'likeProjectName',
          label: '项目名称',
          type: 'Input',
          placeholder: '请填写',
        },
        {
          name: 'likeOrgName',
          label: '申请公司',
          type: 'Input',
          placeholder: '请填写',
          rules: [],
        },
        {
          name: 'auditStatus',
          label: '审核状态',
          type: 'Select',
          placeholder: '请选择审核状态',
          searchOptionData: [
            // { value: '0', label: '未送审' },
            { value: '1', label: '待审核' },
            { value: '2', label: '已通过' },
            { value: '-1', label: '已驳回' },
          ],
        },
        {
          name: 'auditType',
          label: '审核单类型',
          type: 'Select',
          placeholder: '请选择审核状态',
          searchOptionData: [
            { value: '1', label: '立项申请单' },
            { value: '2', label: '监测申请单' },
          ],
        },
        {
          name: 'beginTime',
          label: '发起时间',
          type: 'selectTimck',
          placeholder: '请填写',
        },
      ];
    }
    // 项目监测
    // 项目审核
    if (history.location.pathname.indexOf('/mession-monitor/info') >= 0) {
      return [
        {
          name: 'beginTime',
          label: '监测时间段',
          type: 'selectTimck',
          placeholder: '请填写',
        },
      ];
    }
    // 排放因子业务方
    if (history.location.pathname.indexOf('emission-factor/orgConfig') >= 0) {
      return [
        {
          name: 'dict_data_name',
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
          name: 'dict_data_value',
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
          name: 'dict_data_value',
          label: '组织负责人编号',
          type: 'Input',
          placeholder: '请填写组织负责人编号',
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
    // 项目查询
    if (history.location.pathname.indexOf('mession-reduction/query') >= 0) {
      return [
        {
          name: 'projectName',
          label: '项目名称',
          type: 'Input',
          placeholder: '请填写项目名称',
          rules: [],
        },
        {
          name: 'orgName',
          label: '申请公司',
          type: 'Input',
          placeholder: '请填写申请公司',
          rules: [],
        },
        {
          name: 'projectNo',
          label: '项目ID',
          type: 'Input',
          placeholder: '请填写项目ID',
          rules: [],
        },

        {
          name: 'projectType',
          label: '项目类型',
          type: 'Select',
          placeholder: '请选择',
          searchOptionData: [
            { value: '1', label: '新建-并网' },
            { value: '2', label: '新建-非并网' },
            { value: '3', label: '改建-并网' },
            { value: '4', label: '扩建-并网' },
          ],
          rules: [],
        },
        {
          name: 'monitorStatus',
          label: '监测状态',
          type: 'Select',
          placeholder: '请选择',
          searchOptionData: [
            { value: '1', label: '待监测' },
            { value: '2', label: '监测中' },
          ],
          rules: [],
        },
        {
          name: 'energyType',
          label: '能源类型',
          type: 'Select',
          placeholder: '请选择',
          searchOptionData: [
            { value: '1', label: '风力发电' },
            { value: '2', label: '光伏发电' },
            { value: '3', label: '潮汐发电' },
            { value: '4', label: '地热发电' },
          ],
          rules: [],
        },
        {
          name: 'endDate',
          label: '申请时间',
          type: 'selectTimck',
          placeholder: '请填写',
          class: '200px',
        },
      ];
    }
    //参数配置
    if (history.location.pathname.indexOf('/auth/config') >= 0) {
      return [
        {
          name: 'energyType',
          label: '能源类型',
          type: 'Select',
          placeholder: '请选择',
          class: '170px',
          searchOptionData: [
            { value: '1', label: '风力发电' },
            { value: '2', label: '光伏发电' },
            { value: '3', label: '潮汐发电' },
            { value: '4', label: '地热发电' },
          ],
          rules: [],
        },
        {
          name: 'projectType',
          label: '项目类型',
          type: 'Select',
          placeholder: '请选择',
          class: '170px',
          searchOptionData: [
            { value: '1', label: '新建-并网' },
            { value: '2', label: '新建-非并网' },
            { value: '3', label: '改建-并网' },
            { value: '4', label: '扩建-并网' },
          ],
          rules: [],
        },
      ];
    }

    return [];
  }, []);

  const createNav: {
    name: string;
    label: string;
    required?: boolean;
    rules?: Rule[];
    type: string;
    max: number;
    min: number;
    precision?: number;
    step?: string;
  }[] = [
    {
      name: 'loanAmount',
      label: '输入贷款金额（元）',
      type: 'InputNumber',
      max: 999999999999,
      step: '0.0001',
      min: 0,
      // id: 1,
      rules: [],
    },
    {
      name: 'totalAmount',
      label: '请输入项目金额（元）',
      type: 'InputNumber',
      rules: [],
      max: 999999999999,
      min: 0,
      step: '0.0001',
    },
  ];
  const columns = useDictColumn<SysDictDataResult & NavForm & EditGoodsProps>({
    onEdit: (record): void => {
      setModalFormVal(true);
      setCurrentId(record.id);
    },
    onDelete: async (record: { id: number }): Promise<void> => {
      if (history.location.pathname.indexOf('/auth/role') >= 0) {
        await apiRoleDelete({ id: record.id }).then(({ data }) => {
          syncCallbackFn();
          VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
        });
        return;
      }
      await apiDeleteProjectInfo({ id: record.id }).then(() => {
        syncCallbackFn();
      });
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
    auditcc: async (record: { id: number }): Promise<void> => {
      setModalFormVal(true);
      setCurrentId(record.id);
    },
    fileList: async (record: { id: number }): Promise<void> => {
      // 查看附件
      console.log(record, 'record-record');
      await apiProjectInfoFileList({ id: record.id }).then(({ data }) => {
        console.log(data, 'data');
        changeModalFilrFormVal(true);
        getDataFileList(data.data);
      });
    },
    account: async (record: { recordId?: number; id?: number }) => {
      console.log(record, '项目金额');
      await apiInfoDetail({ id: `${record.recordId}` }).then(({ data }) => {
        console.log(data.data, 'apiProjectDetail=apiProjectDetail');
        // if(data.code===200){
        setAccoutnModalFormVal(true);
        if (record.recordId) {
          setCurrentId(record.recordId);
          form.setFieldsValue({
            //@ts-ignore
            loanAmount: data.data.loanAmount ? data.data.loanAmount : null,
            //@ts-ignore
            totalAmount: data.data.totalAmount ? data.data.totalAmount : null,
          });
        }
        // }
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
      changeIsgreenPerformance(true);
      getGreenPerformance({ ...record });
    },
    monitoringReport: async record => {
      changeProjectId(record.id);
      changeMonitoringReportVisible(true);
    },
    previewFn: async record => {
      changePreviewModel(true);
      console.log(record);
      //@ts-ignore
      await apiSystemFilePreviewBase64(record.reportFile).then(({ data }) => {
        console.log(data, 'data');
        //@ts-ignore
        let del = document.getElementById('container');
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
    //将base64转换为文件
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  // const createDictFields = dictParams;
  const closeCreateDictModal = () => {
    setModalFormVal(false);
    setTargetKeys([]);
    setSelectedKeys([]);
  };

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
  // 获取组织书
  const apiOrgTreeFn = async () => {
    if (history.location.pathname.indexOf('mession-reduction/query') >= 0) {
      await apiOrgTreeCheck({ orgType: 4 }).then(({ data }) => {
        try {
          if (data.data) {
            getCompanyData(data?.data[0].orgList);
          }
        } catch (error) {
          console.log(error);
        }
      });
      return;
    }
    await apiOrgTree({ orgType: 3 }).then(({ data }) => {
      try {
        if (data.data) {
          getCompanyData(data?.data[0].orgList);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    syncCallbackFn();
    apiOrgTreeFn();
  }, []);
  const returnNavText = () => {
    if (history.location.pathname === '/mession-reduction/info') {
      return '新增项目';
    }
    if (history.location.pathname === '/auth/user') {
      return '新增用户';
    }
    if (history.location.pathname === '/auth/org') {
      return '新增组织';
    }
    if (history.location.pathname === '/basic-admin/orders') {
      return '新增订单';
    }
    if (history.location.pathname === '/mession-monitor/info') {
      return '新建监测数据';
    }
    if (history.location.pathname === '/mession-monitor/info') {
      return '新建监测数据';
    }
    if (history.location.pathname === '/auth/role') {
      return '新建角色';
    }
    return '';
  };
  const renderFileList = () => {
    try {
      const fileArr = [
        {
          name: '可研项目',
          key: 'feasibilityReportFile',
          data: dataFileList.feasibilityReportFile,
        },
        {
          name: '立项核准文件',
          key: 'projectApprovalFile',
          data: dataFileList.projectApprovalFile,
        },
        {
          name: '环评报告',
          key: 'envAssessmentFile',
          data: dataFileList.envAssessmentFile,
        },
        {
          name: '环评批复文件',
          key: 'envApprovalFile',
          data: dataFileList.envApprovalFile,
        },
      ];
      const fileListArr = [
        {
          name: '并网文件',
          key: 'gridConnectFile',
          data: dataFileList.gridConnectFile,
        },
        {
          name: '上网电量',
          key: 'elecUpFile',
          data: dataFileList.elecUpFile,
        },
        {
          name: '下网电量',
          key: 'elecDownFile',
          data: dataFileList.elecDownFile,
        },
      ];
      return (
        <div style={{ height: '660px', overflowY: 'auto' }}>
          <ul className={style.fileList}>
            {fileArr.map(item => {
              return (
                <li>
                  <div> {item.name}:</div>
                  {item?.data?.length > 0 &&
                    item?.data?.map((item: { name: string; url: string }) => (
                      <>
                        <Button
                          className='upload_button'
                          href={item.url}
                          type='link'
                          target='_blank'
                          icon={
                            <FileImageOutlined
                              style={{ color: '#09C199', fontSize: '16px' }}
                            />
                          }
                        >
                          {item.name}
                        </Button>
                      </>
                    ))}
                </li>
              );
            })}
          </ul>
          <ul className={style.fileList_1}>
            {fileListArr.map(item => {
              return (
                <li>
                  <div>{item.name}:</div>
                  <div className={style.fileContent}>
                    {item?.data?.length > 0 &&
                      item?.data?.map((item: { name: string; url: string }) => (
                        <Button
                          className='upload_button'
                          href={item.url}
                          type='link'
                          target='_blank'
                        >
                          <FileImageOutlined
                            style={{ color: '#09C199', fontSize: '16px' }}
                          />
                          {item.name}
                        </Button>
                      ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } catch (error) {
      console.log(error, 'error-error');
    }
  };
  return (
    <div className={style.dictWrapper} style={{ flex: '1' }}>
      {!(
        [
          '/auth/role',
          '/basic-admin/nav',
          '/mession-reduction/query/after-report',
          '/mession-reduction/assessment',
        ].indexOf(history.location.pathname) >= 0
      ) && (
        <div className={style.header}>
          <SearchForm
            formList={formList}
            onSearch={onSearch}
            onClick={() => {}}
          />
          {[
            '/mession-reduction/info',
            '/auth/user',
            '/auth/org',
            '/auth/role',
            '/basic-admin/orders',
            '/mession-monitor/info',
          ].indexOf(history.location.pathname) >= 0 && (
            <Permission
              flag={
                returnNavText() === '新增组织'
                  ? '/auth/role/add'
                  : returnNavText() === '新增用户'
                  ? '/auth/user/add'
                  : returnNavText() === '新建角色'
                  ? '/auth/role/add-chongqing'
                  : returnNavText() === '新建监测数据'
                  ? '/mession-monitor/info/add'
                  : returnNavText() === '新增项目'
                  ? '/mession-reduction/info/add'
                  : ''
              }
            >
              <Button
                className={style.addDict}
                type='primary'
                style={{ marginBottom: '20px' }}
                onClick={() => {
                  if (
                    history.location.pathname.indexOf(
                      '/mession-reduction/info',
                    ) >= 0
                  ) {
                    return history.push(`/mession-reduction/info/add`);
                  }
                  if (
                    history.location.pathname.indexOf('/basic-admin/nav') >= 0
                  ) {
                    setModalFormVal(true);
                    form.setFieldsValue({
                      guideName: '',
                      isFloat: 1,
                      orderNum: 1,
                    });
                    return null;
                  }
                  if (history.location.pathname.indexOf('/auth/user') >= 0) {
                    return history.push(`/auth/user/add`);
                  }
                  // 新增订单
                  if (history.location.pathname.indexOf('/auth/org') >= 0) {
                    history.push(`/auth/org/add`);
                    return null;
                  }
                  // 新增角色
                  if (history.location.pathname.indexOf('/auth/role') >= 0) {
                    history.push(`/auth/role/add`);
                    return null;
                  }
                  // 新增监测数据
                  if (
                    history.location.pathname.indexOf(
                      '/mession-monitor/info',
                    ) >= 0
                  ) {
                    history.push(`/mession-monitor/info/add`);
                    return null;
                  }
                  return null;
                }}
              >
                {returnNavText()}
              </Button>
            </Permission>
          )}
        </div>
      )}
      <div className={style.tableWrapper}>
        {['/auth/role', '/basic-admin/orders'].indexOf(
          history.location.pathname,
        ) >= 0 && (
          <Permission
            flag={
              returnNavText() === '新增组织'
                ? '/auth/role/add'
                : returnNavText() === '新增用户'
                ? '/auth/user/add'
                : returnNavText() === '新建角色'
                ? '/auth/role/add-chongqing'
                : returnNavText() === '新建监测数据'
                ? '/mession-monitor/info/add'
                : returnNavText() === '新增项目'
                ? '/mession-reduction/info/add'
                : ''
            }
          >
            <Button
              className={style.addDict}
              type='primary'
              style={{ marginBottom: '20px' }}
              // icon={<IconFont type='icon-icon-tianjia' />}
              onClick={() => {
                if (
                  history.location.pathname.indexOf(
                    '/mession-reduction/info',
                  ) >= 0
                ) {
                  return history.push(`/mession-reduction/info/add`);
                }
                if (
                  history.location.pathname.indexOf('/basic-admin/nav') >= 0
                ) {
                  setModalFormVal(true);
                  form.setFieldsValue({
                    guideName: '',
                    isFloat: 1,
                    orderNum: 1,
                  });
                  return null;
                }
                if (history.location.pathname.indexOf('/auth/user') >= 0) {
                  return history.push(`/auth/user/add`);
                }
                // 新增订单
                if (history.location.pathname.indexOf('/auth/org') >= 0) {
                  history.push(`/auth/org/add`);
                  return null;
                }
                // 新增角色
                if (history.location.pathname.indexOf('/auth/role') >= 0) {
                  history.push(`/auth/role/add`);
                  return null;
                }
                // 新增监测数据
                if (
                  history.location.pathname.indexOf('/mession-monitor/info') >=
                  0
                ) {
                  history.push(`/mession-monitor/info/add`);
                  return null;
                }
                return null;
              }}
            >
              {returnNavText()}
            </Button>
          </Permission>
        )}

        <Table
          columns={columns}
          scroll={{ x: 1000 }}
          dataSource={dataSource}
          className={style.table}
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
          <div id='container'></div>
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
      <Modal
        title={`项目金额`}
        visible={accoutnModalFormVal}
        onCancel={() => {
          setAccoutnModalFormVal(false);
          form.resetFields();
        }}
        maskClosable={false}
        width={500}
        className={style.dictModal}
        onOk={async () => {
          await form.validateFields().then(async value => {
            await apiModifyAmount({
              ...value,
              id: currentId,
            }).then(({ data }) => {
              if (data.code === 200) {
                form.resetFields();
                setAccoutnModalFormVal(false);
              }
              VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
            });
          });
          setAccoutnModalFormVal(false);
        }}
        okButtonProps={{
          loading: modalOkLoading,
        }}
      >
        <Form form={form} labelCol={{ span: 8, offset: 0 }}>
          {createNav.map(item => {
            if (item.type === 'Select') {
              return (
                <Form.Item key={item.name} {...item}>
                  <Select placeholder='请选择'>
                    <Select.Option value={1}>是</Select.Option>
                    <Select.Option value={0}>否</Select.Option>
                  </Select>
                </Form.Item>
              );
            }
            if (item.type === 'InputNumber') {
              return (
                <Form.Item key={item.name} {...item}>
                  <InputNumber
                    style={{ width: '100%' }}
                    controls={false}
                    min={item.min}
                    max={item.max}
                    precision={item.precision}
                  />
                </Form.Item>
              );
            }
            return (
              <Form.Item key={item.name} {...item}>
                <Input placeholder='请输入' maxLength={20} />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
      <Modal
        title={`抄送`}
        visible={modalFormVal}
        onCancel={() => closeCreateDictModal()}
        maskClosable={false}
        width={570}
        className={style.dictModal}
        onOk={async () => {
          setModalOkLoading(true);
          if (targetKeys.length === 0)
            VerifyUtils.Toast('error', '请选择抄送机构');
          if (
            history.location.pathname.indexOf('/mession-reduction/query') >= 0
          ) {
            await apiAuditCcheck({ id: currentId, orgIdList: targetKeys })
              .then(({ data }) => {
                try {
                  setModalFormVal(false);
                  closeCreateDictModal();
                  syncCallbackFn();
                  VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
                } catch (err) {
                  console.log(err);
                }
                closeCreateDictModal();
              })
              .finally(() => {
                closeCreateDictModal();
                setModalOkLoading(false);
              });
            return;
          }
          await apiAuditCc({ id: currentId, orgIdList: targetKeys })
            .then(({ data }) => {
              try {
                setModalFormVal(false);
                closeCreateDictModal();
                syncCallbackFn();
                VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
              } catch (err) {
                console.log(err);
              }
              closeCreateDictModal();
            })
            .finally(() => {
              closeCreateDictModal();
              setModalOkLoading(false);
            });
        }}
        okButtonProps={{
          loading: modalOkLoading,
        }}
      >
        <Form
          style={{ display: 'none' }}
          form={form}
          labelCol={{ span: 6, offset: 0 }}
        >
          {createNav.map(item => {
            if (item.type === 'Select') {
              return (
                <Form.Item key={item.name} {...item}>
                  <Select placeholder='请选择'>
                    <Select.Option value={1}>是</Select.Option>
                    <Select.Option value={0}>否</Select.Option>
                  </Select>
                </Form.Item>
              );
            }
            if (item.type === 'InputNumber') {
              return (
                <Form.Item key={item.name} {...item}>
                  <InputNumber
                    controls={false}
                    min={1}
                    max={999}
                    formatter={value => `${Number(value).toFixed(0)}`}
                  />
                </Form.Item>
              );
            }
            return (
              <Form.Item key={item.name} {...item}>
                <Input placeholder='请输入' maxLength={20} />
              </Form.Item>
            );
          })}
        </Form>
        <Transfer
          listStyle={{
            width: 240,
            height: 240,
          }}
          dataSource={companyData}
          titles={[
            `${
              history.location.pathname.indexOf('/mession-reduction/query') >= 0
                ? '选择稽查机构'
                : '选择金融机构'
            }`,
            '选择',
          ]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={nextTargetKeys => {
            setTargetKeys(nextTargetKeys);
          }}
          onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
            console.log(sourceSelectedKeys, targetSelectedKeys);
            setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
          }}
          rowKey={record => `${record.id}`}
          // onScroll={onScroll}
          render={item => item.orgName}
        />
      </Modal>
      <Modal
        title={`附件查看`}
        visible={modalFilrFormVal}
        onCancel={() => {
          changeModalFilrFormVal(false);
        }}
        maskClosable={false}
        width={800}
        className={style.dictModal}
        onOk={() => {
          changeModalFilrFormVal(false);
        }}
        okButtonProps={{
          loading: modalOkLoading,
        }}
      >
        {renderFileList()}
      </Modal>
      <Modal
        title={`绿色绩效`}
        visible={isShowgreenPerformance}
        onCancel={() => {
          changeIsgreenPerformance(false);
        }}
        maskClosable={false}
        width={800}
        className={style.dictModal}
        onOk={() => {
          changeIsgreenPerformance(false);
        }}
        okButtonProps={{
          loading: modalOkLoading,
        }}
      >
        <Form labelCol={{ span: 6, offset: 0 }}>
          <Form.Item label='绿色绩效(tC02/亿元/年)'>
            {greenPerformanceData.greenPerformance}
          </Form.Item>
          <Form.Item label='贷款金额(元)：'>
            {greenPerformanceData.loanAmount}
          </Form.Item>
          <Form.Item label='项目总投资（元）：'>
            {greenPerformanceData.totalAmount}
          </Form.Item>
        </Form>
      </Modal>
      <ReportModal
        monitoringReportVisible={monitoringReportVisible}
        changeMonitoringReportVisible={changeMonitoringReportVisible}
        projectId={projectId}
      />
    </div>
  );
};

export default Dict;
