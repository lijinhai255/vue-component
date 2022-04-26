import { useMemo, useCallback, useEffect, useState, memo } from 'react';
import { Button, Modal, message, Drawer } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { useSelector } from 'react-redux';
import { ColumnsType } from 'antd/es/table';
import SearchForm, { SearchFormItem } from '../../components/SearchForm';
import BaseTable from '../../components/BaseTable';
import Style from '../../../styles/organza.module.scss';
import './index.less';
import VerifyUtils from '../../../utils/verifty';
import {
  Menu,
  MenuSearchParams,
  // apiGetMenuList,
  apiRemoveMenu,
} from './service';
import PageWrap from '../../components/PageWrap';
import { PageResponseData } from '../../../typings';
import AddOrEditMenu from './AddOrEditMenu';
import { IStoreState } from '../../../store/types';

memo(
  ({
    index,
    onButtonClick,
  }: {
    index: number;
    onButtonClick: (type: string, index: number) => void;
  }) => (
    <>
      <Button
        size='small'
        style={{ marginRight: '10px' }}
        onClick={() => onButtonClick('edit', index)}
        type='link'
      >
        编辑
      </Button>
      <Button
        size='small'
        type='link'
        onClick={() => onButtonClick('remove', index)}
      >
        删除
      </Button>
    </>
  ),
);
function MenuManage() {
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

  const [menuHeadder] = useState<{
    showLabel: boolean;
    page: PageResponseData;
  }>({
    showLabel: true,
    page: {},
  });
  const selector = useSelector<IStoreState, IStoreState>(state => state);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<{ page: number; size: number }>({
    page: 1,
    size: 10,
  });

  const [menuData, setMenuData] = useState<{
    list: Menu[];
    page: PageResponseData;
  }>({
    list: [],
    page: {},
  });

  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);

  const initPageList = (params?: MenuSearchParams) => {
    setLoading(true);
    try {
      setMenuData(selector.menu || params);
    } catch (error) {
      // dosomethings
    } finally {
      setLoading(false);
    }
  };

  const onSearch = useCallback(
    (params: MenuSearchParams) => {
      initPageList(params);
    },
    [page],
  );

  useEffect(() => {
    initPageList();
  }, [page]);

  const closeEditModal = useCallback(() => {
    setEditVisible(false);
  }, [setEditVisible]);

  const onOkEditModal = useCallback(() => {
    setEditVisible(false);
    initPageList();
  }, [setEditVisible]);
  useCallback(
    (type: string, index: number) => {
      if (type === 'remove') {
        Modal.confirm({
          title: '系统提示',
          content: '此操作将永久删除该菜单, 是否继续?',
          onOk() {
            apiRemoveMenu(menuData.list[index].id!).then(() => {
              message.success('删除成功！');
              initPageList();
            });
          },
          onCancel() {},
        });
      } else {
        setEditVisible(true);
        setCurrentMenu(menuData.list[index]);
      }
    },
    [menuData.list],
  );
  const onAddMenu = useCallback(() => {
    setCurrentMenu(null);
    setEditVisible(true);
  }, []);

  const onTableChange = useCallback(
    ({ current, pageSize }: PaginationProps) => {
      setPage({ page: current as number, size: pageSize as number });
    },
    [],
  );
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [Drawer_list, set_Drawer_list] = useState({
    visable: false,
    detail_list: {
      list: [
        {
          name: '组织编码',
          value: '',
        },
        {
          name: '组织名称',
          value: '',
        },
        {
          name: '行业类别',
          value: '',
        },
        {
          name: '人员规模',
          value: '',
        },
        {
          name: '所在地区',
          value: '',
        },
        {
          name: '负责人账号',
          value: '',
        },
      ],
      jurisdiction: [],
    },
  });

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 'Mon Sep 30 2019 20:38:03 GMT+0800 (中国标准时间)',
      address: '13526252526',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 'Mon Sep 30 2019 20:38:03 GMT+0800 (中国标准时间)',
      address: '13526252526',
    },
  ];
  type Column = {
    key: string;
    name: string;
    age: string;
    address: string;
  };
  const columns: ColumnsType<Column> = [
    {
      title: '序号',
      render: (text, record: Column, index: number) => {
        return index + 1;
      },
    },
    {
      title: '组织编号',
      dataIndex: 'age',
      key: 'age',
      render: (text: string) => {
        return VerifyUtils.get_time(text);
      },
    },
    {
      title: '组织名称',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '是否开通服务',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '负责人账号',
      dataIndex: 'address',
      key: 'address',
      render: text => {
        return VerifyUtils.desensitizationPhoneNumber(text);
      },
    },
    {
      title: '创建时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record: Column, index: number) => {
        return (
          <div>
            <span
              className={`${Style.normal_size} ${Style.normal_font_color}`}
              onClick={() => set_Drawer_list({ ...Drawer_list, visable: true })}
            >
              查看
            </span>
            <span
              className={`${Style.normal_size} ${Style.primay_font_color}`}
              onClick={() => set_Drawer_list({ ...Drawer_list, visable: true })}
            >
              权限配置
            </span>
          </div>
        );
      },
    },
  ];

  const onTreeClose = () => {
    Drawer_list.visable = false;
  };
  const onTreeSub = () => {
    console.log('提交');
  };
  return (
    <PageWrap>
      {/* 查询表单 */}
      <SearchForm
        formList={formList}
        onSearch={onSearch}
        onClick={onAddMenu}
        showLabel={menuHeadder.showLabel}
      />
      {editVisible && (
        <AddOrEditMenu
          menu={currentMenu}
          visible={editVisible}
          onClose={closeEditModal}
          onConfirm={onOkEditModal}
        />
      )}
      {/* 数据表格 */}
      <BaseTable<Column>
        columns={columns}
        scroll={{ x: 'min-content' }}
        data={{
          list: dataSource,
          page: {
            page: 1,
          },
        }}
        rowKey='key'
        onChange={onTableChange}
        loading={loading}
      >
        <div> 12</div>
      </BaseTable>
      {/* 抽屉 */}
      <Drawer
        className='Drawer-container'
        title='组织信息'
        placement='right'
        width={460}
        onClose={() => set_Drawer_list({ ...Drawer_list, visable: false })}
        visible={Drawer_list.visable}
      >
        <ul>
          {Drawer_list.detail_list.list.map(
            // eslint-disable-next-line array-callback-return
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_item: { name: string; value: string }, index: number) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className={Style.list_ipt}>
                  <span className={Style.list_ipt_span}>{_item.name}：</span>
                  <span>{_item.value}</span>
                </li>
              );
            },
          )}
          <li className={Style.list_ipt}>
            <span className={Style.list_ipt_span}>权限</span>
          </li>
        </ul>
        <div className='Drawer-Btn'>
          <Button onClick={onTreeClose}>取消</Button>
          <Button className='marginLeft20' type='primary' onClick={onTreeSub}>
            提交
          </Button>
        </div>
      </Drawer>
    </PageWrap>
  );
}

export default MenuManage;
