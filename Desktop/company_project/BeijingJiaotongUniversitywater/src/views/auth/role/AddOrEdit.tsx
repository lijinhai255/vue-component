/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { memo, useEffect, useState } from 'react';
import { Form, Input, Tree, Row, Col, Button, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  // apiGetRoleTreeList,
  apiGetAllPermissions,
  apiRoleAdd,
  apiRoleEdit,
  apiRoleQuery,
} from '@/api/api';
import { TreeAddForm } from '../routeAuth/service';
import VerifyUtils from '@/utils/verifty';

function AddOrEditRole() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [halfCheckedKeys, setCheckedHaleKeys] = useState<string[]>([]);
  const [menuDate, getMenuDate] = useState<any[]>([]);
  const [halfCheck, setHalf] = useState<any[]>([]);
  const [currentId, changeCurrentId] = useState<number>(1);
  const onCheck = (info: any, e: any): void => {
    console.log(info, e.halfCheckedKeys);
    setCheckedKeys(info);
    setCheckedHaleKeys([...e.halfCheckedKeys]);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      keys: info || [],
    });
    const arr: number[] = [];
    e.halfCheckedKeys.forEach((item: any) => {
      if (item !== '0-0') arr.push(item);
    });
    setHalf(arr);
  };
  const culDisAble = () => {
    return ['detail'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
    // return false;
  };
  const sortTreeByOrder = (arr: Array<TreeAddForm>) => {
    if (arr.length > 0) {
      arr.sort((obj1: TreeAddForm, obj2: TreeAddForm) => {
        const val = obj1.orderNum - obj2.orderNum;
        return val;
      });
    }
  };
  const formatToTree = (treeData: TreeAddForm[], key?: number | string) => {
    return treeData
      .filter(item => {
        const backF = item;
        if (!backF.parentId) {
          backF.parentId = 0;
        }
        return !key ? backF.parentId === 0 : backF.parentId === key;
      })
      .map(item => {
        const back = { ...item, name: item.permissionName, key: item.id };
        // @ts-ignore
        back.children = formatToTree(treeData, item.key);
        sortTreeByOrder(back.children);
        return back;
      });
  };
  const initTreeStructure = (treeData: TreeAddForm[]) => {
    return formatToTree(treeData);
  };
  console.log(initTreeStructure, 'initTreeStructure');
  const getApiGetTreeList = () => {
    apiGetAllPermissions({ orgType: currentId }).then((res: any) => {
      const auth: TreeAddForm = {
        id: 0,
        menuId: 0,
        menuType: 'M',
        value: 0,
        component_path: '',
        is_link: 'false',
        hidden: 'false',
        isFrame: 'false',
        visible: 'false',
        title: '权限',
        kind: 0,
        ident: '1',
        orderNum: 1,
        status: 'true',
        name: '权限',
        key: '0-0',
        children: [],
      };
      // @ts-ignore
      auth.children = initTreeStructure(res.data.data);
      console.log(auth, 'auth=auth');
      // @ts-ignore
      sortTreeByOrder(auth.children);
      // 将每条数据加上0-0-x..的关系
      // console.log(formatToTreeKey(auth.children, '0'));
      getMenuDate([auth]);
    });
  };

  useEffect(() => {
    getApiGetTreeList();
  }, [currentId]);
  // 获取角色详情
  const apiRoleQueryFn = async () => {
    const id = new URLSearchParams(location.search).get('id') || '';
    await apiRoleQuery({ id }).then(({ data }) => {
      try {
        setCheckedKeys([...data.data.keys]);
        setHalf([...data.data.mainKeys]);
        form.setFieldsValue({
          ...data.data.role,
          keys: [...data.data.keys],
        });
        changeCurrentId(data.data.role.orgType);
      } catch (error) {}
    });
  };
  useEffect(() => {
    if (history.location.pathname.indexOf('auth/role/add') >= 0) {
      form.setFieldsValue({
        ...form.getFieldsValue(true),
        orgType: 1,
      });
      changeCurrentId(1);
    } else {
      apiRoleQueryFn();
    }
  }, []);
  return (
    <div style={{ width: '100%', background: '#fff', padding: '16px' }}>
      <Row gutter={24}>
        <Col span={12}>
          <Form
            form={form}
            layout={'vertical'}
            // validateTrigger='onChange'
            onFinishFailed={e => console.log(e)}
            onFinish={(e: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              // e.keys = e.keys.shift();
              e.keys.forEach((element: number | string, index: number) => {
                if (element === '0-0') e.keys.splice(index, 1);
              });
              if (window.location.search.split('?id=').length > 1) {
                apiRoleEdit({
                  ...e,
                  id: window.location.search.split('?id=')[1],
                  mainKeys: halfCheck,
                }).then((res: any) => {
                  if (res.data.code === 500)
                    VerifyUtils.Toast('info', res.data.msg);
                  if (res.data.code === 200) {
                    history.push('/auth/role');
                    VerifyUtils.Toast('success', '修改成功');
                  }
                });
              } else {
                console.log(e);
                apiRoleAdd({ ...e, mainKeys: halfCheck }).then((res: any) => {
                  if (res.data.code === 500)
                    VerifyUtils.Toast('info', res.data.msg);
                  if (res.data.code === 200) {
                    history.push('/auth/role');
                    VerifyUtils.Toast('success', '新增成功');
                  }
                });
              }
            }}
          >
            <Form.Item
              rules={[
                { required: true, message: '角色名称不能为空' },
                {
                  type: 'string',
                  max: 50,
                  message: '不能超过50个字符',
                },
              ]}
              name='roleName'
              label='角色名称'
            >
              <Input disabled={culDisAble()} placeholder='请输入' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: '角色描述不能为空' }]}
              name='roleInfo'
              label='角色描述'
            >
              <Input.TextArea
                disabled={culDisAble()}
                placeholder='最多输入100个字符'
                showCount
                maxLength={100}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: '所属组织类型不能为空' }]}
              name='orgType'
              label='所属组织类型'
            >
              <Select
                size='middle'
                placeholder='请选择'
                onChange={e => {
                  changeCurrentId(e);
                  setCheckedKeys([]);
                  setCheckedHaleKeys([]);
                  setHalf([]);
                }}
                disabled={culDisAble()}
              >
                <Select.Option value={1}>征信机构 </Select.Option>
                <Select.Option value={2}>人民银行</Select.Option>
                <Select.Option value={3}>金融机构</Select.Option>
                <Select.Option value={4}>核查机构</Select.Option>
                <Select.Option value={5}>贷款企业</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: '权限不能为空' }]}
              name='keys'
              label='权限'
            >
              {menuDate?.length ? (
                <Tree
                  height={400}
                  style={{ marginTop: '6px' }}
                  checkable
                  defaultExpandAll
                  onCheck={onCheck} // 点击复选框触发
                  disabled={culDisAble()}
                  checkedKeys={{
                    checked: checkedKeys,
                    halfChecked: halfCheckedKeys,
                  }} // 选中复选框的树节点
                  treeData={menuDate} // treeNodes 数据
                />
              ) : (
                ''
              )}
            </Form.Item>
            {culDisAble() ? (
              ''
            ) : (
              <Row className='Drawer-Btn-bottom' gutter={24} justify='end'>
                <div className='Drawer-Btn-bottom-con'>
                  <Button onClick={() => history.push('/auth/role')}>
                    取消
                  </Button>
                  <Button
                    className='marginLeft20'
                    type='primary'
                    htmlType='submit'
                    onClick={() => {}}
                  >
                    保存
                  </Button>
                </div>
              </Row>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default memo(AddOrEditRole);
