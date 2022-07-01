/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * @file 组织管理
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Moment } from 'moment';
import { Button, Drawer, message, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { PaginationProps } from 'antd/lib/pagination';
// import VerifyUtils from '@utils/verifty';
import BaseTable from '@views/components/BaseTable';
import PageWrap from '@views/components/PageWrap';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import { apiEditorganizationListDeatil } from '@api/api';
import Style from '@styles/UserIndex.module.scss';
import { apiOperLog, Column, apiOperlogModuleenums } from './service';

import TreeRoute from '../routeAuth/TreeRotue';
import './index.less';
import { TreeAddForm } from '../routeAuth/service';
import { number } from 'echarts';

// @ts-ignore
interface SearchProps {
  username: string | null; // 组织名称
  moduleType: string | null;
  startDate: string | Moment | null; // 行业类别
  endDate: string | Moment | null; // 行业类别; // 行业编号
  pageSize?: number; // 行业规模
  pageNo?: number; // 行业所在地区
}

function Organization() {
  // 分页信息
  const [searchParams, setSearchParams] = useState<SearchProps>({
    username: null, // 组织名称
    moduleType: null,
    startDate: null, // 行业类别
    endDate: null, // 行业编号
    pageSize: 10, // 行业规模
    pageNo: 1, // 行业所在地区
  });
  const [pageTotal, setPageTotal] = useState<number>(0);
  // 显示换出的抽屉
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  // 表格的loading效果
  const [loading, setLoading] = useState<boolean>(false);
  // 表格当前选中的值
  const [tableList, setTableList] = useState<Column[]>([]);
  // Tree当前选中的值
  const [checkTree, setCheckTree] = useState<string | number>('0-0');
  const [findOrEdit] = useState<boolean>(false); // 是否查看状态
  const [defaultCheckedTreeKey, setDefaultCheckedTreeKey] = useState<string[]>(
    [],
  ); // 当前tree默认勾选中的keys
  const [defaultCheckedTreeIds, setDefaultCheckedTreeIds] = useState<number[]>(
    [],
  ); // 当前tree默认勾选中的ids
  const [optionData, getOptionData] = useState<string[]>([]);

  const [treeList] = useState<TreeAddForm>({
    id: 0,
    menuId: 0,
    value: 0,
    menuType: 'M',
    component_path: '',
    is_link: 'false',
    hidden: 'false',
    isFrame: 'false',
    visible: 'false',
    title: '碳云',
    kind: 0,
    ident: '1',
    orderNum: 1,
    status: 'true',
    name: '碳云',
    key: '0',
    children: [],
    order_num: 1,
  });
  // 新增后要默认打开指定tree
  const [openTree, setOpenTree] = useState<Array<string | number>>(['0-0']);
  // 是否新增
  // 表格加载的动画
  // const [loading, setLoading] = useState<boolean>(false);
  // 搜索封装的组件
  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'username',
        placeholder: '请输入操作人',
        label: '操作人',
        type: 'Input',
        class: '200px',
      },
      {
        name: 'moduleType',
        placeholder: '请选择操作模块',
        label: '操作模块',
        type: 'SelectLists',
        class: '170px',
        data: optionData,
      },
      {
        name: 'startDate',
        placeholder: '请选择操作时间',
        label: '操作时间',
        type: 'selectTimck',
        class: '300px',
      },
    ],
    [],
  );
  // 根据分页初始表格信息
  const initPageList = async (params: SearchProps) => {
    setLoading(true);
    try {
      const { data } = await apiOperLog(params);
      if (data.code === 200) {
        setPageTotal(data.data.total); // 设置总页数
        setTableList(data.data.list); // 每条列表的数据
      }
    } catch (err) {
      console.log('异常信息', err);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Column> = [
    {
      title: '操作人',
      fixed: 'left',
      dataIndex: 'username',
      key: 'username',
      // width: '50px',
    },
    // {
    //   title: '操作人姓名',
    //   dataIndex: 'institutionID',
    //   fixed: 'left',
    //   key: 'institutionID',
    // },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      // width: '150px',
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => {
        return (
          <Tooltip placement='topLeft' title={text}>
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: '操作模块',
      dataIndex: 'moduleType_name',
      key: 'moduleType_name',
      // width: '200px',
    },
    {
      title: '操作日志',
      dataIndex: 'content',
      key: 'content',
      // width: '200px',    j
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => {
        return (
          <Tooltip placement='topLeft' title={text}>
            {text}
          </Tooltip>
        );
      },
    },
  ];
  // 修改权限点击提交
  const editTreeByTable = () => {
    console.log('12121212', apiEditorganizationListDeatil, message);
    // if (checkTableList?.key) {
    //   try {
    //     await apiEditorganizationListDeatil(checkTableList.key, {
    //       menus_ids: defaultCheckedTreeIds,
    //     });
    //     message.success('更新成功');
    //     setShowDrawer(false);
    //   } catch (err) {
    //     message.error('更新失败，接口返回异常');
    //   }
    // }
  };
  // 表格改变
  const onTableChange = useCallback(
    ({ current, pageSize }: PaginationProps) => {
      setSearchParams(searchParam => ({
        ...searchParam,
        pageNo: current as number,
        pageSize: pageSize as number,
      }));
    },
    [searchParams],
  );
  // 搜索点击
  const onSearch = (params: SearchProps) => {
    // console.log(params, 'params=params');
    const rangeValue = params?.startDate;
    setSearchParams({
      ...params,
      pageNo: 1,
      pageSize: 10,
      // @ts-ignore
      startDate: rangeValue?.[0]?.format('YYYY-MM-DD hh:mm:ss') || null,
      // @ts-ignore
      endDate: rangeValue?.[1]?.format('YYYY-MM-DD hh:mm:ss') || null,
    });
  };
  // 获取操作模块数据
  const operlogModuleListFn = async () => {
    const { data } = await apiOperlogModuleenums('moduleType');
    if (data.code === 200) {
      getOptionData(data.data);
    }
  };
  useEffect(() => {
    initPageList(searchParams);
  }, [searchParams]);
  useEffect(() => {
    operlogModuleListFn();
  }, []);
  return (
    <div className='organization-container'>
      <PageWrap>
        <div>
          <div className={Style.account_search}>
            <SearchForm formList={formList} onSearch={onSearch} />
          </div>
          <div className={Style.account_bg}>
            <BaseTable<Column>
              scroll={{ x: '100px' }}
              columns={columns}
              loading={loading}
              data={{
                list: tableList,
                page: {
                  page: searchParams.pageNo ? searchParams.pageNo : 1,
                  size: searchParams.pageSize ? searchParams.pageSize : 10,
                  dataTotal: pageTotal,
                },
              }}
              rowKey='operTime'
              onChange={onTableChange}
            />
          </div>
        </div>
        <Drawer
          className='Drawer-organization-container'
          title='组织信息'
          placement='right'
          width={460}
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
        >
          <div className='marginTop20 paddingBottom100'>
            <span>权限：</span>
            <span>
              <TreeRoute
                setDefaultCheckedTreeIds={setDefaultCheckedTreeIds}
                defaultCheckedTreeIds={defaultCheckedTreeIds}
                setDefaultCheckedTreeKey={setDefaultCheckedTreeKey}
                defaultCheckedTree={defaultCheckedTreeKey}
                checkableState={findOrEdit}
                setCheckTree={setCheckTree}
                checkTree={checkTree}
                treeList={treeList}
                openTree={openTree}
                setOpenTree={setOpenTree}
              />
            </span>
          </div>
          {findOrEdit && (
            <div className='Drawer-Btn'>
              <Button onClick={() => setShowDrawer(false)}>取消</Button>
              <Button
                onClick={editTreeByTable}
                className='marginLeft20'
                type='primary'
              >
                提交
              </Button>
            </div>
          )}
        </Drawer>
      </PageWrap>
    </div>
  );
}
export default Organization;
