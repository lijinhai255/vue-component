/**
 * @file 组织管理
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Drawer, message, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { PaginationProps } from 'antd/lib/pagination';
import { TableColumnWidth } from '@components/Table/TableColumnWidth';
// import VerifyUtils from '@utils/verifty';
import BaseTable from '@views/components/BaseTable';
import PageWrap from '@views/components/PageWrap';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import {
  apiGeTorganizationList,
  apiEditorganizationListDeatil,
} from '@api/api';
import Style from '@styles/UserIndex.module.scss';
import {
  ApiTableResult,
  Column,
  listDetatils,
  OrganSearchParamsOwer,
} from './service';
import TreeRoute from '../routeAuth/TreeRotue';
import './index.less';
import { TreeAddForm } from '../routeAuth/service';

function Organization() {
  // 分页信息
  const [searchParams, setSearchParams] = useState<OrganSearchParamsOwer>({
    page: 1,
    page_size: 10,
  });
  const [pageTotal, setPageTotal] = useState<number>(0);
  // 显示换出的抽屉
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  // 表格的loading效果
  const [loading, setLoading] = useState<boolean>(false);
  // 表格当前选中的值
  const [checkTableList] = useState<listDetatils>();
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
  // 表格加载的动画
  // const [loading, setLoading] = useState<boolean>(false);
  // 搜索封装的组件
  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'company_name',
        placeholder: '请输入组织名称',
        label: '组织名称',
      },
      {
        name: 'institutionID',
        placeholder: '请输入组织编号',
        label: '组织编号',
      },
      {
        name: 'phone_numbers',
        placeholder: '请输入负责人账号',
        label: '负责人账号',
      },
    ],
    [],
  );
  // 根据分页初始表格信息
  const initPageList = async (params: OrganSearchParamsOwer) => {
    setLoading(true);
    try {
      const state = await apiGeTorganizationList<ApiTableResult>(params);
      if (state.status === 200) {
        setPageTotal(state.data.total); // 设置总页数
        setTableList(state.data.data); // 每条列表的数据
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
      align: 'center',
      fixed: 'left',
      render: (text, re, index: number) => {
        return <TableColumnWidth width={90}>{index + 1}</TableColumnWidth>;
      },
    },
    {
      title: '操作人姓名',
      dataIndex: 'institutionID',
      fixed: 'left',
      key: 'institutionID',
    },
    {
      title: '时间',
      dataIndex: 'institutionID',
      key: 'institutionID',
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
      dataIndex: 'has_menus',
      key: 'has_menus',
      render: (text: boolean) => {
        return (
          <TableColumnWidth width={100}>{text ? '是' : '否'}</TableColumnWidth>
        );
      },
    },
    {
      title: '操作日志',
      dataIndex: 'phone_numbers',
      key: 'phone_numbers',
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
      setSearchParams({
        ...searchParams,
        page: current as number,
        page_size: pageSize as number,
      });
    },
    [searchParams],
  );
  // 搜索点击
  const onSearch = (params: OrganSearchParamsOwer) => {
    setSearchParams({ ...params, page: 1, page_size: 10 });
  };

  useEffect(() => {
    initPageList(searchParams);
  }, [searchParams]);

  return (
    <div className='organization-container'>
      <PageWrap>
        <div>
          <div className={Style.account_search}>
            <SearchForm
              formList={formList}
              onSearch={onSearch}
              onClick={() => {}}
            />
          </div>
          <div className={Style.account_bg}>
            <BaseTable<Column>
              columns={columns}
              scroll={{ x: true }}
              loading={loading}
              data={{
                list: tableList,
                page: {
                  page: searchParams.page,
                  size: searchParams.page_size,
                  dataTotal: pageTotal,
                },
              }}
              rowKey='pk'
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
          <div className='drawer-detail'>
            <span>组织编码: </span>
            <span>{checkTableList?.institutionID || '暂无'}</span>
          </div>
          <div className='drawer-detail'>
            <span>组织名称: </span>
            <Tooltip
              placement='bottomLeft'
              title={checkTableList?.company_name}
            >
              <span className='max_table_text'>
                {checkTableList?.company_name || '暂无'}
              </span>
            </Tooltip>
          </div>
          <div className='drawer-detail'>
            <span>行业类型: </span>
            <span>{checkTableList?.industry || '暂无'}</span>
          </div>
          <div className='drawer-detail'>
            <span>人员规模: </span>
            <span>{checkTableList?.personnel_size || '暂无'}</span>
          </div>
          <div className='drawer-detail'>
            <span>所在地区: </span>
            <span>{checkTableList?.location || '暂无'}</span>
          </div>
          <div className='drawer-detail'>
            <span>负责人账号: </span>
            <span>{checkTableList?.phone_numbers || '暂无'}</span>
          </div>
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
