/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { memo, useEffect, useState } from 'react';
import { Form, Input, Tree, Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';
// import {
//   // apiGetRoleTreeList,
//   // apiGetAllPermissions
//   apiRoleQuery,
// } from '@/api/api';
import { TreeAddForm } from '../routeAuth/service';
import { apiGetMenus, apiRoleAdd, apiRoleEdit, apiRoleDetail } from './service';
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
    console.log(info, 'info=info', e, 'e=e=e');
    console.log(info, e.halfCheckedKeys);
    setCheckedKeys(info);
    setCheckedHaleKeys([...e.halfCheckedKeys]);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      menus: info || [],
    });
    // const arr: number[] = [];
    // e.halfCheckedKeys.forEach((item: any) => {
    //   if (item !== '0-0') arr.push(item);
    // });
    setHalf([...info]);
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
        const val = obj1.order_num - obj2.order_num;
        return val;
      });
    }
  };
  const formatToTree = (treeData: TreeAddForm[], key?: number | string) => {
    return treeData
      .filter(item => {
        const backF = item;
        if (!backF.parent) {
          backF.parent = 0;
        }
        return !key ? backF.parent === 0 : backF.parent === key;
      })
      .map(item => {
        const back = {
          ...item,
          // name: item.permissionName,
          key: item.id,
          title: item.name,
          id: item.id,
        };
        // @ts-ignore
        back.children = formatToTree(treeData, item.id);
        sortTreeByOrder(back.children);
        return back;
      });
  };
  const initTreeStructure = (treeData: TreeAddForm[]) => {
    return formatToTree(treeData);
  };
  // console.log(initTreeStructure, 'initTreeStructure');
  const getApiGetTreeList = () => {
    apiGetMenus().then((res: any) => {
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
        parent: 0,
        ident: '1',
        orderNum: 1,
        order_num: 1,
        status: 'true',
        name: '权限',
        key: '0-0',
        children: [],
      };
      // console.log(res.data.data.results, 'res');
      // @ts-ignore
      auth.children = initTreeStructure(res.data.data.results);
      // console.log(auth, 'auth=auth');
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
  const getApiRoleDetail = async () => {
    const id = new URLSearchParams(location.search).get('id') || '';
    await apiRoleDetail({ id }).then(res => {
      console.log(res.data, 'data');
      if (res.data.code === 200) {
        form.setFieldsValue({
          ...res.data.data,
          menus: [...res.data.data.menus],
        });
      } else {
        VerifyUtils.Toast('info', res.data.msg);
      }
      setCheckedKeys([...res.data.data.menus]);
      setHalf([...res.data.data.menus]);
      // form.setFieldsValue({
      //   ...res.data.data,
      //   menus: [...res.data.data.menus],
      // });
      // changeCurrentId(res.data.data.role.orgType);
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
      getApiRoleDetail();
    }
  }, []);
  return (
    <div style={{ width: '100%', background: '#fff', padding: '16px' }}>
      <Row gutter={24}>
        <Col span={12}>
          <Form
            form={form}
            layout='vertical'
            // validateTrigger='onChange'
            onFinishFailed={e => console.log(e)}
            onFinish={(e: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              // e.keys = e.keys.shift();
              e.menus.forEach((element: number | string, index: number) => {
                if (element === '0-0') e.menus.splice(index, 1);
              });
              if (window.location.search.split('?id=').length > 1) {
                apiRoleEdit({
                  ...e,
                  id: window.location.search.split('?id=')[1],
                  menus: halfCheck,
                }).then((res: any) => {
                  if (res.data.code === 200) {
                    history.push('/auth/role');
                    VerifyUtils.Toast('success', '修改成功');
                  } else {
                    VerifyUtils.Toast('info', res.data.msg);
                  }
                });
              } else {
                console.log(e);
                apiRoleAdd({ ...e, menus: halfCheck }).then((res: any) => {
                  if (res.data.code === 200) {
                    history.push('/auth/role');
                    VerifyUtils.Toast('success', '新增成功');
                  } else {
                    VerifyUtils.Toast('info', res.data.msg);
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
              name='name'
              label='角色名称'
            >
              <Input disabled={culDisAble()} placeholder='请输入' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: '角色描述不能为空' }]}
              name='description'
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
            {/* <Form.Item
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
            </Form.Item> */}
            <Form.Item
              rules={[{ required: true, message: '权限不能为空' }]}
              name='menus'
              label='权限列表'
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
