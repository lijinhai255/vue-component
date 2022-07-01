import { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import { ColumnsType } from 'antd/lib/table';
import style from '@styles/global.module.scss';
import { Form, Input, Button, Tooltip, Col, Row, Tree } from 'antd';
import { IconFont } from '@components/IconFont';
// import Permission from '@components/Permission';
import BaseTable from '@components/BaseTable';
import DrawerCom from '@components/DrawerCom';
import TableEditTsx from '@components/TableEditTsx';
import { Column } from './type';
import { apiAddRole, apiRoleList, apiSetRolePermission } from './service'; // 获取api
// import { CodeSandboxCircleFilled } from '@ant-design/icons';

/** *
 * 操作
 */
const GetActionContentArray = (record: Column) => {
  // 编辑暂时放掉注释掉
  return [
    {
      btn_title: '查看',
      type: 'edit',
      color: style.textGreen,
      is_pop: false,
      flag: 'xls9c08nUE',
    },
    record.is_predefined
      ? {}
      : {
          btn_title: '编辑',
          type: 'edit',
          color: style.textGreen,
          is_pop: false,
          flag: 'Fie274wrMY',
        },
    record.is_predefined
      ? {}
      : {
          btn_title: '删除',
          type: 'delete',
          color: style.textError,
          is_pop: true,
          pop_title: '此操作将永久删除该数据, 是否继续?',
          flag: 'aHjRryqNhW',
        },
  ];
};

export type Options = {
  label: string;
  value: string | number;
  user?: number;
  [key: string]: any;
}[];
type ModelTextType = {
  [name: number | string]: string;
};
const modelText: ModelTextType = {
  0: '新增角色',
  1: '员工详情',
  2: '编辑角色',
};

const Orgstaff: FC = () => {
  const [staffsFrom] = Form.useForm<{
    phone_number: string | null;
    name: string | null;
    contact_info: string | null;
    roles: string[] | null;
  }>(); // 新增员工 表单
  const [isLoading, changeIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setCount] = useState(0); // 设置总条数
  const [staffDataSource, getDataSource] = useState([
    {
      id: '12121',
      roleName: 'ces',
      is_predefined: false,
      roleInfo: '121212',
      staff_count: '1212',
      is_master: false,
    },
  ]); // 列表数据
  /**
   * 查看 功能
   * * */

  const [showContent, changeShowCount] = useState<Column>({
    id: '',
    roleName: '',
    is_predefined: false,
    roleInfo: '',
    staff_count: '',
    is_master: false,
  });
  const [currentStatus, changeCurrentStatus] = useState<number>(0); // 0：新增功能 1:查看功能 2:编辑功能
  const [visible, setVisible] = useState(false); // 弹窗显示隐藏
  const [autoExpandParent] = useState(true);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [menuDate, getMenuDate] = useState<any[]>([]);

  console.log(
    'role',
    getDataSource,
    changeIsLoading,
    setPage,
    setPageSize,
    setCount,
    changeCurrentStatus,
    staffsFrom,
    checkedKeys,
    getMenuDate,
  );
  // 获取角色列表
  const apiRoleListFn = async () => {
    const data = await apiRoleList({ userId: '1', companyId: '1' });
    console.log(data, 'dagta=dta');
  };
  useEffect(() => {
    apiRoleListFn();
  }, []);
  const onCheck = (): void => {
    // if (Array(checked)) {
    //   setCheckedKeys(checked);
    // setHalfCheckedKeys([
    //   ...(info?.halfCheckedKeys ? info?.halfCheckedKeys : []),
    // ]);
    // staffsFrom.setFieldsValue({
    //   ...staffsFrom.getFieldsValue(),
    //   menus_ids: [...checked],
    //   half_menus_ids: [
    //     ...(info?.halfCheckedKeys ? info?.halfCheckedKeys : []),
    //   ],
    // });
    // }
  };
  const columns: ColumnsType<Column> = [
    {
      title: '编号',
      key: 'id',
      fixed: 'left',
      dataIndex: 'id',
      width: '10%',
      render: (value, record, index: number) => {
        return index + 1;
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: '20%',
      ellipsis: true,
      render: (roleName: string) => {
        return (
          <Tooltip title={roleName} placement='topLeft'>
            {`${roleName}=roleName`}
          </Tooltip>
        );
      },
    },
    {
      title: '角色描述',
      dataIndex: 'roleInfo',
      key: 'roleInfo',
      width: '20%',
      ellipsis: true,
      render: (roleInfo: string) => {
        return (
          <Tooltip title={roleInfo} placement='topLeft'>
            {roleInfo === null || roleInfo === '' ? '-' : roleInfo}
            -`roleInfo`
          </Tooltip>
        );
      },
    },
    {
      title: '账号数量',
      dataIndex: 'staff_count',
      key: 'staff_count',
      width: '20%',
      render: (staff_count: string) => {
        return (
          <Tooltip title={staff_count} placement='topLeft'>
            {staff_count === null || staff_count === '' ? '-' : staff_count}
            -`staff_count`
          </Tooltip>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: '280px',
      fixed: 'right',
      render: (record: Column) => {
        return (
          <TableEditTsx<Column>
            get_action_data={GetActionContentArray(record)}
            record={record}
            onHandelType={values => {
              console.log(values, 'values=values', setCheckedKeys);
              if (values.btn_title === '编辑') {
                changeShowCount(record);
                setVisible(true);
              }
              if (values.btn_title === '查看') {
                changeShowCount(record);
                setVisible(true);
              }

              // switch (values.btn_title) {
              //   case '查看':
              //     showAndEdit(values.btn_title, record.pk);
              //     return;
              //   case '编辑':
              //     showAndEdit(values.btn_title, record.pk);
              //     changetIsMaster(record);
              //     break;
              //   case '禁用':
              //     apiPatchStaffActive(!record.is_active, record.pk);
              //     break;
              //   case '删除':
              //     apiDelRole(record.pk);
              //     break;
              // }
            }}
          />
        );
      },
    },
  ];

  /** *
   * 抽屉内容
   */
  // eslint-disable-next-line consistent-return
  const getContent = () => {
    if (currentStatus === 1) {
      return (
        <div>
          <div className={style.marginBottom30}>
            <span className={style.text14}>角色名称：</span>
            <span className={style.text14}>{showContent.roleName}</span>
          </div>
          <div className={style.marginBottom30}>
            <span className={style.text14}>角色描述：</span>
            <span className={style.text14}>{showContent.roleInfo}</span>
          </div>
          <div className={style.marginBottom30} style={{ display: 'flex' }}>
            <span className={style.text14}>权限：</span>
            <span className={style.text14} style={{ flex: 1 }}>
              <Tree
                checkable
                height={800}
                disabled
                defaultExpandAll
                defaultExpandParent
                autoExpandParent={autoExpandParent} // 是否自动展开父节点
                onCheck={onCheck} // 点击复选框触发
                checkedKeys={{
                  checked: checkedKeys,
                  halfChecked: [],
                }} // 选中复选框的树节点
                // treeData={menuDate} // treeNodes 数据
              />
            </span>
          </div>
        </div>
      );
    }
    if ([0, 2].indexOf(currentStatus) >= 0) {
      return (
        <Form form={staffsFrom} validateTrigger='onChange'>
          <Form.Item
            rules={[{ required: true, message: '角色名称不能为空' }]}
            name='roleName'
            label='角色名称'
          >
            <Input placeholder='请输入' maxLength={30} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '角色描述不能为空' }]}
            name='description'
            label='角色描述'
          >
            <Input.TextArea
              placeholder='最多输入100个字符'
              showCount
              maxLength={100}
              rows={4}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '权限不能为空' }]}
            name='menus_ids'
            label='权限'
          >
            {
              <Tree
                height={800}
                style={{ marginTop: '6px' }}
                checkable
                onCheck={onCheck} // 点击复选框触发
                checkedKeys={{
                  checked: checkedKeys,
                  halfChecked: [],
                }} // 选中复选框的树节点
                treeData={menuDate} // treeNodes 数据
              />
            }
          </Form.Item>
        </Form>
      );
    }
  };
  /** *
   * 清空 抽屉表单 数据
   *
   */
  const clearStaffsFrom = () => {
    staffsFrom.setFieldsValue({
      phone_number: null,
      contact_info: null,
      roles: [],
      name: null,
    });
  };
  const footerConfig = () => {
    return (
      [0, 2].indexOf(currentStatus) >= 0 && (
        <div style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => {
              setVisible(false);
              clearStaffsFrom();
            }}
          >
            取消
          </Button>
          <Button
            type='primary'
            // loading={state.loading}
            onClick={async () => {
              await staffsFrom.validateFields().then(value => {
                console.log(value);
              });
            }}
          >
            确认
          </Button>
        </div>
      )
    );
  };
  return (
    <div>
      <div
        className={classnames(
          'Dashboard',
          style.marginTop,
          style.searchBackground,
        )}
      >
        <Row>
          {/* <Permission flag='9no8mblCZ0'> */}
          <Col span={24}>
            <div
              className={classnames(
                style.textRight,
                style.PingFangSCRegular,
                style.cursorPoint,
                style.textGreen,
                style.text14,
              )}
              onClick={() => {
                changeCurrentStatus(0);
                setVisible(true);
                clearStaffsFrom();
              }}
            >
              <IconFont
                type='icon-icon-tianjia'
                style={{
                  color: '#005BAC',
                  margin: '0 10px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
              />
              新增角色
            </div>
          </Col>
          {/* </Permission> */}
          <Col span={24}>
            <BaseTable<Column>
              columns={columns}
              loading={isLoading}
              // scroll={{ x: 'min-content' }}
              data={{
                list: staffDataSource,
                page: {
                  page,
                  size: pageSize,
                  dataTotal: pageCount,
                },
              }}
              rowKey='pk'
              onChange={e => {
                console.log(e, 'e=e=e');
              }}
            />
          </Col>
        </Row>
        <DrawerCom
          childrenData={getContent()}
          visible={visible}
          title={modelText[currentStatus]}
          width='460'
          footer={footerConfig()}
          onClose={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
};

export default Orgstaff;
