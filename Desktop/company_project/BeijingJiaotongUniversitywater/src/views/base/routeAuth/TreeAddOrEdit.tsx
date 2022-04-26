import { useCallback, useEffect } from 'react';
import { Form, Input, Button, Select, message, InputNumber } from 'antd';
import { TreeItemType, apiAddPermission, editAddPermission } from '../service';

const { TextArea } = Input;
const { Option } = Select;

export interface TreeAddProps {
  addVisible: boolean;
  editVisible: boolean;
  checkTree: string | number;
  setCheckTree: (key: string | number) => void;
  addTreeList: (data: TreeItemType) => void;
  setOpenTree: (data: Array<string | number>) => void;
  showCheckButton: (state: boolean) => void;
  changeFindState: () => void;
  treeList: TreeItemType;
  checkTreeDetail: TreeItemType;
  addCanCelFn: () => void;
}

// 根据字段顺序信息将数组进行排序
// const sortTreeByOrder = (arr: Array<TreeItemType>) => {
//   if (arr.length > 0) {
//     arr.sort((obj1: TreeItemType, obj2: TreeItemType) => {
//       const val = obj1.orderNum - obj2.orderNum;
//       return val;
//     });
//   }
// };

// 递归数组 更改数组格式或者排序
// const recursionTree = (data: TreeItemType) => {
//   if (data.children.length > 0) {
//     sortTreeByOrder(data.children);
//     data.children.forEach(item => {
//       recursionTree(item);
//     });
//   }
// };

// 根据key找到对应的tree,添加上规定的唯一key, 然后添加返回完整的tree
// const treeByKey = (
//   key: string | number,
//   list: TreeItemType,
//   tree: TreeItemType,
// ) => {
//   const copyTree = tree;
//   if (copyTree.key === key) {
//     const copyList = list;
//     copyList.parentId = copyTree.id;
//     copyList.key = `${copyTree.key}-${copyTree.children.length + 1}`;
//     copyTree.children.push(copyList);
//   } else {
//     copyTree.children.forEach(item => {
//       treeByKey(key, list, item);
//     });
//   }
//   return copyTree;
// };

// 编辑状态下根据编辑的key  找到指定tree分支 替换掉除了children外的所有值
const editTreeByKey = (editNewTree: TreeItemType, tree: TreeItemType) => {
  const editTree = tree;
  if (editTree.key === editNewTree.key) {
    // 代理下当前获取children，因为编辑的时候不需要修改children的属性
    Object.defineProperty(editNewTree, 'children', {
      get() {
        return editTree.children;
      },
    });
    Object.assign(editTree, editNewTree);
  } else {
    editTree.children.forEach(item => {
      editTreeByKey(editNewTree, item);
    });
  }
  return editTree;
};

// 根据当前的key 找到tree要展开的上层 因为ant展开置顶的tree需要之前层级的key
// const openTreeByKey = (arr: string) => {
//   const keyArr = arr.split('-');
//   const backArr = ['0-0'];
//   for (let i = 2; i < keyArr.length; i += 1) {
//     backArr.push(`${backArr[backArr.length - 1]}-${keyArr[i]}`);
//   }
//   return backArr;
// };

function TreeAdd(props: TreeAddProps) {
  const {
    treeList,
    addVisible,
    checkTreeDetail,
    editVisible,
    showCheckButton,
    changeFindState,
    addCanCelFn,
  } = props;
  console.log(editVisible, 'editVisible=editVisible');
  const [form] = Form.useForm();
  const onFinish = async (values: TreeItemType) => {
    const subTree = {
      ...values,
      children: [],
    };
    if (editVisible) {
      editTreeByKey(subTree, treeList);
      const backEditTree = Object.assign(checkTreeDetail, subTree);
      // 因为传递给后台不需要children的信息 所以这边进行拷贝一下传递给后台
      const apiBackEditTree = JSON.parse(
        JSON.stringify(backEditTree),
      ) as TreeItemType;
      apiBackEditTree.children = [];
      apiBackEditTree.parentId =
        apiBackEditTree.parentId === 1
          ? (apiBackEditTree.parentId = null)
          : apiBackEditTree.parentId;
      try {
        const { data } = await editAddPermission({
          id: Number(checkTreeDetail.id),
          parentId:
            Number(checkTreeDetail.permissionId) === 0
              ? 0
              : Number(checkTreeDetail.permissionId),
          type: subTree.type ? subTree.type : '',
          orderNum: subTree.orderNum,
          perms: subTree.perms ? subTree.perms : '0',
          path: subTree.path ? subTree.path : '',
          status: `${subTree.status ? subTree.status : ''}`,
          remark: subTree.remark ? subTree.remark : '',
          permissionName: subTree.permissionName ? subTree.permissionName : '',
          icon: subTree.icon ? subTree.icon : '',
          isFrame: subTree.isFrame ? Number(subTree.isFrame) : 0,
        });
        // recursionTree(treeList);
        // addTreeList({ ...treeList });
        if (data.code === 200) {
          message.success('修改成功');
        } else {
          message.error(data.msg);
        }

        changeFindState();
      } catch (err) {
        console.log(err);
      }
      return;
    }

    try {
      console.log(
        checkTreeDetail,
        'checkTreeDetail',
        apiAddPermission,
        showCheckButton,
      );
      const { data } = await apiAddPermission({
        parentId:
          Number(checkTreeDetail.permissionId) === 0
            ? 0
            : Number(checkTreeDetail.permissionId),
        type: subTree.type ? subTree.type : '',
        orderNum: subTree.orderNum,
        perms: subTree.perms ? subTree.perms : '0',
        path: subTree.path ? subTree.path : '',
        status: `${subTree.status ? subTree.status : ''}`,
        remark: subTree.remark ? subTree.remark : '',
        permissionName: subTree.permissionName ? subTree.permissionName : '',
        icon: subTree.icon ? subTree.icon : '',
        isFrame: subTree.isFrame ? Number(subTree.isFrame) : 0,
      });
      if (data.code === 200) {
        message.success('新增成功');
      } else {
        message.error(data.msg);
      }
      changeFindState();
      // addTreeList({ ...treeList });
      showCheckButton(true);
    } catch (err) {
      console.log(err, 'errerrerrerr');
      message.error('更新失败，接口返回异常');
    }
  };
  const onReset = () => {
    if (editVisible) {
      changeFindState();
    }
    form.resetFields();
  };

  const changeCheckTreeDetail = useCallback(() => {
    if (editVisible) {
      checkTreeDetail.status = `${
        checkTreeDetail.status ? checkTreeDetail.status : 0
      }`;
      form.setFieldsValue(checkTreeDetail);
    }
    if (addVisible) {
      onReset();
    }
  }, [editVisible, addVisible]);

  useEffect(() => {
    changeCheckTreeDetail();
  }, [editVisible, addVisible]);
  return (
    <>
      <div className='detail-title'>
        {editVisible ? '编辑权限' : '新增权限'}
      </div>
      <div className='detail-title-form'>
        <Form
          name='basic'
          form={form}
          labelCol={{ xl: { span: 6 }, lg: { span: 10 } }}
          wrapperCol={{ xl: { span: 10 }, lg: { span: 10 } }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item name='type' label='权限类型' rules={[{ required: true }]}>
            <Select placeholder='请选择权限类型' allowClear>
              <Option value='P'>产品权限</Option>
              <Option value='M'>菜单权限</Option>
              <Option value='B'>按钮权限</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='权限名称'
            name='permissionName'
            rules={[
              { required: true, message: '请输入权限名称!' },
              { type: 'string', min: 0, max: 50 },
            ]}
          >
            <Input placeholder='请输入权限名称' />
          </Form.Item>
          <Form.Item
            label='权限标识'
            name='perms'
            rules={[
              { required: true, message: '请输入权限标识!' },
              { type: 'string', min: 0, max: 50 },
            ]}
          >
            <Input placeholder='请输入权限标识' />
          </Form.Item>
          <Form.Item
            label='链接地址'
            name='path'
            rules={[{ type: 'string', min: 0, max: 500 }]}
          >
            <Input placeholder='请输入链接地址' />
          </Form.Item>
          <Form.Item
            label='图标地址'
            name='icon'
            rules={[{ type: 'string', min: 0, max: 500 }]}
          >
            <Input placeholder='请输入图标地址' />
          </Form.Item>
          <Form.Item
            name='isFrame'
            label='是否链接页面'
            rules={[{ required: true }]}
          >
            <Select placeholder='请选择' allowClear>
              <Option value={0}>否</Option>
              <Option value={1}>是</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='status'
            label='启用/禁用'
            rules={[{ required: true }]}
          >
            <Select placeholder='请选择权限状态' allowClear>
              <Option value='0'>启用</Option>
              <Option value='1'>禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='顺序'
            name='orderNum'
            rules={[{ required: true, message: '请输入顺序!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              type='number'
              max={9999}
              placeholder='请输入当前权限的顺序'
            />
          </Form.Item>
          <Form.Item
            label='备注'
            name='remark'
            rules={[{ type: 'string', min: 0, max: 200 }]}
          >
            <TextArea
              showCount
              maxLength={200}
              placeholder='当前权限的备注信息'
              rows={4}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button
              className='detail-btn'
              htmlType='button'
              onClick={() => {
                onReset();
                addCanCelFn();
              }}
            >
              取消
            </Button>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default TreeAdd;
