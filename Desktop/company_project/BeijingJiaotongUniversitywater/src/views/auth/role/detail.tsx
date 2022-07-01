/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { memo, useEffect, useState } from 'react';
import { Form, Input, Tree, Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { apiGetTreeList, apiRoleAdd, apiRoleCheck } from '@/api/api';
import { TreeAddForm } from '../routeAuth/service';
import VerifyUtils from '@/utils/verifty';

function RoleDetaile() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [menuDate, getMenuDate] = useState<any[]>([]);
  const onCheck = (info: any): void => {
    console.log(info);
    setCheckedKeys(info);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      menuIds: info || [],
    });
    // console.log(info, 'info=info');
    // if (Array(checked)) {
    //   setCheckedKeys(checked);
    //   setHalfCheckedKeys([
    //     ...(info?.halfCheckedKeys ? info?.halfCheckedKeys : []),
    //   ]);
    //   staffsFrom.setFieldsValue({
    //     ...staffsFrom.getFieldsValue(),
    //     menus_ids: [...checked],
    //     half_menus_ids: [
    //       ...(info?.halfCheckedKeys ? info?.halfCheckedKeys : []),
    //     ],
    //   });
    // }
    console.log(setCheckedKeys, getMenuDate);
  };

  // 根据生成的children树递归将key值填充进去
  // const formatToTreeKey = (treeData: TreeAddForm[], parentTreekey: string) => {
  //   const toKeyTree = treeData;
  //   toKeyTree.forEach((keyTree, _index) => {
  //     const tree = keyTree;
  //     tree.status = `${tree.status ? tree.status : 0}`;
  //     tree.is_link = `${tree.is_link}`;
  //     tree.hidden = `${tree.hidden}`;
  //     tree.isFrame = `${tree.isFrame}`;
  //     tree.visible = `${tree.visible}`;
  //     if (!tree.key && parentTreekey) {
  //       tree.key = `${parentTreekey}-${_index + 1}`;
  //     }
  //     console.log(tree, 'tree');
  //     if (tree.children) {
  //       formatToTreeKey(tree.children, tree.key);
  //     }
  //   });
  // };
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
        const back = item;
        back.children = formatToTree(treeData, item.key);
        sortTreeByOrder(back.children);
        return back;
      });
  };
  const initTreeStructure = (treeData: TreeAddForm[]) => {
    return formatToTree(treeData);
  };
  const getApiGetTreeList = (id?: number | string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    apiGetTreeList({ status: '' }).then((res: any) => {
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
        title: '碳云',
        kind: 0,
        ident: '1',
        orderNum: 1,
        status: 'true',
        name: '碳云',
        key: '0-0',
        children: [],
        order_num: 1,
      };
      auth.children = initTreeStructure(res.data.data);
      console.log(auth);
      sortTreeByOrder(auth.children);
      // 将每条数据加上0-0-x..的关系
      // console.log(formatToTreeKey(auth.children, '0'));
      getMenuDate([auth]);
      if (id) {
        apiRoleCheck(id).then((es: any) => {
          if (es.data.code === 500) VerifyUtils.Toast('info', res.data.msg);
          if (es.data.code === 200) {
            form.setFieldsValue({
              remark: es.data.data.remark,
              roleName: es.data.data.roleName,
              menuIds: es.data.data.keys,
            });
            setCheckedKeys(es.data.data.keys);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.location.pathname.split('/auth/role/roleDetail/').length > 1) {
      getApiGetTreeList(
        window.location.pathname.split('/auth/role/roleDetail/')[1],
      );
    } else {
      getApiGetTreeList();
    }
  }, []);
  // eslint-disable-next-line no-console
  return (
    <div style={{ width: '100%' }}>
      <Row gutter={24}>
        <Col span={12}>
          <Form
            form={form}
            // validateTrigger='onChange'
            onFinishFailed={e => console.log(e)}
            onFinish={(e: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              // e.menuIds = e.menuIds.shift();
              if (
                window.location.pathname.split('/auth/role/roleDetail/')
                  .length > 1
              ) {
                console.log(e);
              } else {
                e.menuIds.forEach((element: number | string, index: number) => {
                  if (element === '0-0') e.menuIds.splice(index, 1);
                });
              }
              console.log(e);
              apiRoleAdd({ ...e }).then((res: any) => {
                if (res.data.code === 500)
                  VerifyUtils.Toast('info', res.data.msg);
                if (res.data.code === 200)
                  VerifyUtils.Toast('success', '新增成功');
              });
            }}
          >
            <Form.Item
              rules={[{ required: true, message: '角色名称不能为空' }]}
              name='roleName'
              label='角色名称'
            >
              <Input placeholder='请输入' disabled maxLength={30} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: '角色描述不能为空' }]}
              name='remark'
              label='角色描述'
            >
              <Input.TextArea
                placeholder='最多输入100个字符'
                showCount
                disabled
                maxLength={100}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: '权限不能为空' }]}
              name='menuIds'
              label='权限'
            >
              {menuDate?.length ? (
                <Tree
                  height={450}
                  disabled
                  style={{ marginTop: '6px' }}
                  checkable
                  defaultExpandAll
                  onCheck={onCheck} // 点击复选框触发
                  checkedKeys={{
                    checked: checkedKeys,
                    halfChecked: [],
                  }} // 选中复选框的树节点
                  treeData={menuDate} // treeNodes 数据
                />
              ) : (
                ''
              )}
            </Form.Item>
            <Row className='footerButton' gutter={24} justify='end'>
              <div className='Drawer-Btn'>
                <Button
                  className='marginLeft20'
                  type='primary'
                  htmlType='submit'
                  onClick={() => {
                    history.push('/auth/role');
                  }}
                >
                  返回
                </Button>
              </div>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default memo(RoleDetaile);
