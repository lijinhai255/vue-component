/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useMemo, useCallback, useEffect, useState, memo } from 'react';
import { Table, Button, Modal, Tag, Select } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { useHistory } from 'react-router-dom';
// import Select from 'rc-select';
import Style from '@styles/UserIndex.module.scss';
import SearchForm, {
  SearchFormItem,
  // SearchFormAction,
} from '../../components/SearchForm';
import BaseTable from '../../components/BaseTable';
import {
  User,
  //  UserSearchParams,
  apiGetUserList,
  UserSearchParams,
  apichangeStatus,
} from './service';
import PageWrap from '../../components/PageWrap';
import { PageResponseData } from '../../../typings';
import { IconFont } from '@/components/IconFont';
import VerifyUtils from '@/utils/verifty';
import Permission from '@/utils/permission';

const UserButton = memo(
  ({
    index,
    onButtonClick,
    record,
  }: {
    index: number;
    record: User;
    onButtonClick: (
      type: string,
      index: number | string,
      UserId?: number | string,
      Status?: string | number,
    ) => void;
  }) => (
    <>
      <Permission flag='system:user:query'>
        <Button
          size='small'
          style={{ marginRight: '10px' }}
          onClick={() => {
            console.log(index);
            window.location.href = `/auth/user/checkUser?check=${Number(
              record.userId,
            )}`;
            onButtonClick('edit', Number(record.userId));
          }}
          type='link'
        >
          查看
        </Button>
      </Permission>
      <Permission flag='system:user:edit'>
        <Button
          size='small'
          style={{ marginRight: '10px' }}
          onClick={() => {
            window.location.href = `/auth/user/editUser?edit=${Number(
              record.userId,
            )}`;
          }}
          type='link'
        >
          编辑
        </Button>
      </Permission>
      <Permission flag='system:user:forbidden'>
        <Button
          size='small'
          type='link'
          onClick={() => {
            if (record.userName && record.userId) {
              onButtonClick(
                'remove',
                record.userName,
                record.userId,
                record.status,
              );
            }
          }}
        >
          {record.status && Number(record.status) === 0 ? '禁用' : '启用'}
        </Button>
      </Permission>
    </>
  ),
);

function UserManage() {
  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'userName',
        placeholder: '请输入用户账号',
        label: '账号：',
      },
      {
        name: 'nickName',
        placeholder: '请输入员工姓名',
        label: '员工姓名：',
      },
      {
        name: 'phonenumber',
        placeholder: '请输入联系方式',
        label: '联系方式：',
      },
      {
        name: 'status',
        placeholder: '请选择状态',
        label: '状态：',
        render: (
          <Select
            style={{ width: 160 }}
            className={Style.searcher}
            placeholder='状态'
            onChange={val => {
              console.log(val);
            }}
            options={[
              { label: '启用', value: '0' },
              { label: '禁用', value: '1' },
            ]}
          />
        ),
      },
    ],
    [],
  );
  const history = useHistory();
  // const [editVisible, setEditVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<UserSearchParams>({});
  const [page, setPage] = useState<{ pageNum: number; pageSize: number }>({
    pageNum: 1,
    pageSize: 10,
  });
  const [userData, setUserData] = useState<{
    list: User[];
    page: PageResponseData;
  }>({
    list: [
      {
        userId: 1,
      },
    ],
    page: {},
  });

  // const [setCurrentUser] = useState<User | null>(null);

  const initPageList = async () => {
    setLoading(true);
    await apiGetUserList({ ...page, ...searchParams }).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setUserData({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        list: res.data.rows,
        page: {
          ...userData.page,
          pageTotal: res.data.total as number,
          dataTotal: res.data.total as number,
        },
      });
      setLoading(false);
    });
  };
  // const onSearch = useCallback(
  //   (params: UserSearchParams) => {
  //     initPageList();
  //     console.log(params, 'llll');
  //   },
  //   [page],
  // );

  useEffect(() => {
    initPageList();
  }, [page, searchParams]);

  // const closeEditModal = useCallback(() => {
  //   setEditVisible(false);
  // }, [setEditVisible]);

  // const onOkEditModal = useCallback(() => {
  //   setEditVisible(false);
  //   initPageList();
  // }, [setEditVisible]);

  const onButtonClick = useCallback(
    (
      type: string,
      index: number | string,
      UserId?: number | string,
      Status?: string | number,
    ) => {
      if (type === 'remove') {
        Modal.confirm({
          title: '提示',
          content: `确认${Status === '0' ? '禁用' : '启用'}该账号：${index}？`,
          onOk() {
            // console.log(type, UserId, Status, index);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            apichangeStatus({
              userId: UserId,
              status: Status === '0' ? '1' : '0',
            })
              .then((res: any) => {
                if (res.data.code === 500)
                  VerifyUtils.Toast('info', res.data.msg);
                if (res.data.code === 200) initPageList();
              })
              .catch(() => {});
          },
          onCancel() {},
        });
      }
      // setCurrentUser(userData.list[index]);

      // setEditVisible(true);
    },
    [userData.list],
  );

  const onAddUser = useCallback(() => {
    history.push('/auth/user/addUser');
  }, []);

  const onTableChange = useCallback(
    ({ current, pageSize }: PaginationProps) => {
      setPage({ pageNum: current as number, pageSize: pageSize as number });
    },
    [],
  );

  return (
    <PageWrap>
      {/* 查询表单 */}
      <div className={Style.account_search}>
        <SearchForm
          formList={formList}
          // actions={actions}
          onSearch={e => setSearchParams(e)}
          onClick={onAddUser}
        />
      </div>
      <div className={Style.account_bg}>
        <Permission flag='system:user:add'>
          <div
            className={Style.account_title}
            onClick={() => history.push('/auth/user/addUser')}
          >
            <IconFont
              type='icon-icon-tianjia'
              style={{
                color: '#005BAC',
                margin: '0 10px',
                cursor: 'pointer',
              }}
            />
            新增账号
          </div>
        </Permission>
        {/* 数据表格 */}
        <BaseTable<User>
          data={userData}
          onChange={onTableChange}
          loading={loading}
        >
          <Table.Column<User>
            title='序号'
            dataIndex='userName'
            align='center'
            render={(text: string, record: any, index: number) => (
              <span>{(page.pageNum - 1) * 10 + index + 1}</span>
            )}
          />
          <Table.Column<User>
            title='账号'
            dataIndex='userName'
            align='center'
          />
          <Table.Column<User>
            title='员工姓名'
            dataIndex='nickName'
            align='center'
          />
          <Table.Column<User>
            title='部门'
            dataIndex='deptName'
            align='center'
          />

          <Table.Column<User>
            title='岗位'
            dataIndex='postName'
            align='center'
          />
          <Table.Column<User>
            title='联系方式'
            dataIndex='phonenumber'
            align='center'
          />
          <Table.Column<User>
            title='状态'
            dataIndex='status'
            align='center'
            render={text => (
              <Tag color={text === '0' ? 'green' : 'red'}>
                {text === '0' ? '启用' : '禁用'}
              </Tag>
            )}
          />
          <Table.Column<User>
            title='更新时间'
            dataIndex='updateTime'
            align='center'
          />
          <Table.Column<User>
            title='操作'
            align='center'
            render={(text, record, index) => (
              <UserButton
                record={record}
                index={index}
                onButtonClick={onButtonClick}
              />
            )}
          />
        </BaseTable>
      </div>
    </PageWrap>
  );
}

export default UserManage;
