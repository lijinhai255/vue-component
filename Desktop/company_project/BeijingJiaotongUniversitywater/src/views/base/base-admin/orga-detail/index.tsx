import { FC, useEffect, useState } from 'react';
// import IconFont from '@components/iconfont';
import {
  Form,
  Input,
  Select,
  Col,
  Button,
  Row,
  Table,
  Tree,
  message,
} from 'antd';
import { Option } from 'antd/es/mentions';
// import { UploadChangeParam } from 'antd/lib/upload';
// import { UploadFile } from 'antd/lib/upload/interface';
// import { getToken } from '@utils/cookie';
import { Rule } from 'antd/lib/form';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import style from '../index.module.scss';
import { combineClassName } from '@/utils';
import {
  apiGetRoleInfo,
  apiGetAllPermissions,
  TreeItemType,
  apiAddProduct,
  apiGetProductInfo,
  apiEditProduct,
} from '../../service';

interface ItemType {
  title: string;
  name: string;
  require: Rule[];
  placeholder: string;
  type: string;
  class?: string;
  buttontext?: string;
  value?: string;
  select_list?: { id: string | number; name: string; value?: string }[];
  maxLength?: number;
  isNeedButton?: boolean;
  disabled?: boolean;
}
const Orgstaff: FC = () => {
  // const [imageLoading, changeImageLoading] = useState(false);
  const [isEdit] = useState(true); // 编辑 和保存功能
  const history = useHistory();
  const [menuDate, getMenuDate] = useState<any[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]); // 全选
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: [
      {
        key: '1',
        name: '二氧化碳（CO₂）',
        age: '二氧化碳（CO₂）',
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '甲烷（CH₄）',
        age: '甲烷（CH₄）',
        address: '西湖区湖底公园1号',
      },
      {
        key: '3',
        name: '氧化亚氮（N₂O）',
        age: '氧化亚氮（N₂O）',
        address: '西湖区湖底公园1号',
      },
      {
        key: '4',
        name: '氢氟碳化物（HFCs）',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {
        key: '5',
        name: '全氟化碳（PFCs）',
        age: 42,
        address: '西湖区湖底公园1号',
      },
      {
        key: '6',
        name: '六氟化硫（SF₆）',
        age: '六氟化硫（SF₆）',
        address: '西湖区湖底公园1号',
      },
      {
        key: '7',
        name: '三氟化氮（NF₃）',
        age: '三氟化氮（NF₃）',
        address: '西湖区湖底公园1号',
      },
    ],
    onSubmit: values => {
      console.log(values, 'values');
    },
  });
  const [form] = Form.useForm();
  useEffect(() => {}, []);
  const columns: ColumnsType<{
    name: string;
    age: string | number;
    address: string;
  }> = [
    {
      title: '温室气体类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '温室气体',
      dataIndex: 'age',
      key: 'age',
      render: (value, record, index: number) => {
        if ([3, 4].indexOf(index) >= 0) {
          return <Select value={value} placeholder='请选择' />;
        }
        return record.age;
      },
    },
    {
      title: '因子数值',
      dataIndex: 'address',
      key: 'address',
      render: (value, _, index: number) => {
        return (
          <Input
            placeholder='请选择'
            value={value}
            onChange={e => {
              const arr = formik.values;
              arr[index].address = e.target.value;
              formik.setValues([...arr]);
              // setQuoteFormData({
              //   type: 'update',
              //   index,
              //   datas: [
              //     {
              //       key: '1',
              //       name: '二氧化碳（CO₂）',
              //       age: '二氧化碳（CO₂）',
              //       address: e.target.value,
              //     },
              //   ],
              //   valueKey: 'address',
              //   value: e.target.value,
              // });
            }}
          />
        );
      },
    },
    {
      title: '因子单位',
      dataIndex: 'address',
      key: 'address',
      render: (value, record, index: number) => {
        console.log(index, record);
        return (
          <Row gutter={24}>
            <Col span='11'>
              <Select value={value} placeholder='请选择' />
            </Col>
            /
            <Col span='11'>
              <Select value={value} placeholder='请选择' />
            </Col>
          </Row>
        );
      },
    },
    {
      title: '活动数据单位',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  // 基本信息
  // 基本信息
  const isDetail = (): boolean => {
    if (history.location.pathname.indexOf('detail') >= 0) {
      return true;
    }
    return false;
  };
  const isDetailID = (): boolean => {
    return ['detail', 'edit'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  const leftItem = (): ItemType[] => {
    if (history.location.pathname.indexOf('basic-admin/pre-role/detail') >= 0) {
      return [
        {
          name: '角色名称：',
          type: 'disabledinput',
          title: 'roleName',
          placeholder: isEdit ? '' : '',
          disabled: true,
          require: isEdit
            ? [
                { required: true, message: '组织名称不能为空' },
                { max: 100, message: '最多可输入100个字符' },
              ]
            : [],
        },

        {
          name: '角色ID',
          type: 'disabledinput',
          title: 'roleId',
          disabled: true,
          placeholder: isEdit ? '' : '',
          require: [{ required: true, message: '组织编号不能为空' }],
        },
        {
          name: '角色描述',
          type: 'disabledinput',
          title: 'roleInfo',
          placeholder: isEdit ? '' : '',
          disabled: true,
          require: isEdit
            ? [
                { required: true, message: '组织名称不能为空' },
                { max: 100, message: '最多可输入100个字符' },
              ]
            : [],
        },
        {
          name: '权限：',
          type: 'tree',
          class: 'oneRow2',
          disabled: true,
          title: 'companyName',
          placeholder: isEdit ? '请输入' : '',
          require: isEdit ? [{ required: true, message: '权限不能为空' }] : [],
        },
      ];
    }
    if (history.location.pathname.indexOf('/basic-admin/product') >= 0) {
      return [
        {
          name: '产品名称',
          type: 'input',
          title: 'productName',
          placeholder: !isDetail() ? '请填写' : '',
          disabled: isDetail(),
          require: !isDetail()
            ? [
                { required: true, message: '产品名称不能为空' },
                { max: 50, message: '最多可输入50个字符' },
              ]
            : [],
        },

        {
          name: '产品ID',
          type: 'input',
          title: 'productId',
          disabled: isDetailID(),
          placeholder: !isDetail() ? '请填写' : '',
          require: [
            { required: true, message: '产品ID不能为空' },
            { max: 50, message: '最多可输入50个字符' },
            {
              pattern: /^[^\u4e00-\u9fa5]+$/,
              message: '不可包含中文',
            },
          ],
        },
        {
          name: '是否上线',
          type: 'select',
          title: 'auth',
          placeholder: !isDetail() ? '请选择' : '',
          disabled: isDetail(),
          select_list: [
            { id: '0', name: '否' },
            { id: '1', name: '是' },
          ],
          require: !isDetail()
            ? [{ required: true, message: '是否上线不能为空' }]
            : [],
        },
        {
          name: '产品状态',
          type: 'select',
          title: 'status',
          placeholder: !isDetail() ? '请选择' : '',
          disabled: isDetail(),
          select_list: [
            { id: '0', name: '启用' },
            { id: '1', name: '禁用' },
          ],
          require: !isDetail()
            ? [{ required: true, message: '产品状态不能为空' }]
            : [],
        },
        {
          name: '产品简介',
          type: 'oneTextarea',
          title: 'productInfo',
          class: 'oneRow',
          placeholder: !isDetail() ? '请填写产品简介' : '',
          disabled: isDetail(),
          require: !isDetail()
            ? [
                { required: true, message: '产品简介不能为空' },
                { max: 500, message: '最多可输入500个字符' },
              ]
            : [],
        },
        {
          name: '权限：',
          type: 'tree',
          class: 'oneRow2',
          title: 'permissionIds',
          disabled: isDetail(),
          placeholder: !isDetail() ? '请输入' : '',
          require: [],
        },
      ];
    }
    return [];
  };
  const onCheck = (checked: any, e: any): void => {
    if (Array(checked)) {
      setCheckedKeys(checked);
      setHalfCheckedKeys([...e.halfCheckedKeys]);
      // setHalfChecked
      form.setFieldsValue({
        ...form.getFieldsValue(),
        permissionIds: [...checked],
      });
    }
  };
  const renderLeftItem = (LeftItem: ItemType[], className?: string) => {
    return (
      <Col
        span={24}
        className={combineClassName(
          `${style.col} ${className ? style[className] : ''}`,
        )}
      >
        {LeftItem.map(item => {
          if (item.type === 'input') {
            return (
              <Form.Item
                name={item.title}
                label={item.name}
                labelAlign='right'
                rules={item.require}
              >
                <Input
                  disabled={item.disabled}
                  placeholder={item.placeholder}
                  maxLength={100}
                />
              </Form.Item>
            );
          }
          if (item.type === 'select') {
            return (
              <Form.Item
                name={item.title}
                label={item.name}
                labelAlign='right'
                rules={item.require}
              >
                <Select disabled={item.disabled} placeholder={item.placeholder}>
                  {item?.select_list &&
                    item.select_list?.map(
                      (tem: { id: string | number; name: string }) => {
                        return (
                          <Option value={String(tem.id || '')}>
                            {tem.name}
                          </Option>
                        );
                      },
                    )}
                </Select>
              </Form.Item>
            );
          }
          if (item.type === 'disabledinput') {
            return (
              <Form.Item
                name={item.title}
                label={item.name}
                labelAlign='right'
                rules={item.require}
              >
                <Input
                  disabled
                  placeholder={item.placeholder}
                  maxLength={100}
                />
              </Form.Item>
            );
          }
          if (item.type === 'text') {
            return (
              <Form.Item
                name={item.title}
                label={item.name}
                labelAlign='right'
                rules={item.require}
              >
                <span> {item.value}</span>
              </Form.Item>
            );
          }
          if (item.type === 'oneInput') {
            return (
              <Form.Item
                name={item.title}
                label={item.name}
                labelAlign='right'
                rules={item.require}
                className={item.class ? style[item.class] : ''}
              >
                <Row
                  gutter={24}
                  justify='space-between'
                  style={{ height: '32px' }}
                >
                  <Col flex='1'>
                    <Input
                      disabled={item.disabled}
                      placeholder={item.placeholder}
                      maxLength={100}
                      onChange={e => {
                        console.log(e.target.value, 'onChange');
                      }}
                    />
                  </Col>
                  {item.isNeedButton ? (
                    ''
                  ) : (
                    <Col span={4}>
                      <Button>{item.buttontext}</Button>
                    </Col>
                  )}
                </Row>
              </Form.Item>
            );
          }
          if (item.type === 'oneTable') {
            return (
              <Form.Item
                name={item.title}
                label={item.name}
                labelAlign='right'
                rules={item.require}
                className={item.class ? style[item.class] : ''}
              >
                <Row gutter={24} justify='space-between'>
                  <Col flex='1'>
                    <Table
                      bordered
                      dataSource={formik.values}
                      columns={columns}
                      pagination={false}
                    />
                  </Col>
                </Row>
              </Form.Item>
            );
          }
          if (item.type === 'oneTextarea') {
            return (
              <Form.Item
                name={item.title}
                label={item.name}
                labelAlign='right'
                rules={item.require}
                className={item.class ? style[item.class] : ''}
              >
                <Input.TextArea
                  showCount
                  disabled={item.disabled}
                  rows={4}
                  placeholder={item.placeholder}
                  maxLength={500}
                />
              </Form.Item>
            );
          }
          if (item.type === 'tree') {
            return (
              <Form.Item
                name={item.title}
                label={item.name}
                labelAlign='right'
                rules={item.require}
                className={item.class ? style[item.class] : ''}
              >
                <Row
                  gutter={24}
                  justify='space-between'
                  // style={{ height: 'ƒ32px' }}
                >
                  <Col flex='1'>
                    <Tree
                      checkable
                      height={800}
                      disabled={item.disabled}
                      onCheck={onCheck} // 点击复选框触发
                      // autoExpandParent={autoExpandParent} // 是否自动展开父节点
                      checkedKeys={{
                        checked: checkedKeys,
                        halfChecked: halfCheckedKeys,
                      }} // 选中复选框的树节点
                      treeData={menuDate} // treeNodes 数据
                    />
                  </Col>
                </Row>
              </Form.Item>
            );
          }
          return '';
        })}
      </Col>
    );
  };

  // 预置角色详情、包含权限
  const apiGetRoleInfoFn = async () => {
    await apiGetRoleInfo({
      id: history.location.search.split('?')[1],
    }).then(({ data }) => {
      setCheckedKeys([...data.data.permissionIds]);
      setHalfCheckedKeys([...data.data.half]);
      form.setFieldsValue({ ...data.data });
    });
  };
  // 获取顶级组织
  const sortTreeByOrder = (arr: Array<TreeItemType>) => {
    if (arr.length > 0) {
      arr.sort((obj1: TreeItemType, obj2: TreeItemType) => {
        const val = obj1?.orderNum - obj2?.orderNum;
        return val;
      });
    }
  };
  const formatToTree = (treeData: TreeItemType[], key?: number | string) => {
    return treeData
      ?.filter(item => {
        const backF = item;
        if (!backF.parentId) {
          backF.parentId = 0;
        }
        return !key ? backF.parentId === 0 : backF.parentId === key;
      })
      .map(item => {
        const back = item;
        back.title = item.permissionName;
        back.key = item.permissionId;
        back.children = formatToTree(treeData, item.permissionId);
        sortTreeByOrder(back.children);
        return back;
      });
  };
  const apiGetAllPermissionsFn = async () => {
    await apiGetAllPermissions().then(({ data }) => {
      if (data.code === 200) {
        const arr = formatToTree(data.data);
        getMenuDate([...arr]);
      }
    });
  };
  const apiGetProductInfoFn = async () => {
    await apiGetProductInfo({
      id: history.location.search.split('?')[1],
    }).then(({ data }) => {
      setCheckedKeys([...data.data.permissionIds]);
      setHalfCheckedKeys([...data.data.half]);
      form.setFieldsValue({ ...data.data });
    });
  };
  // 产品详情- 编辑和查看
  const isShowProductDetail = () => {
    return ['/basic-admin/product/edit', '/basic-admin/product/detail'].some(
      item => {
        return history.location.pathname.indexOf(item) >= 0;
      },
    );
  };
  useEffect(() => {
    // if (history.location.pathname.indexOf('basic-admin/product/edit') >= 0) {
    // }
    if (
      history.location.pathname.indexOf('/basic-admin/pre-role/detail') >= 0
    ) {
      apiGetRoleInfoFn(); // 预置角色详情、包含权限
    }
    if (isShowProductDetail()) {
      apiGetProductInfoFn();
    }
    apiGetAllPermissionsFn(); // 获取权限
    // apiFileUploadFn();
  }, []);
  const renderFooter = () => {
    if (history.location.pathname.indexOf('basic-admin/pre-role/detail') >= 0) {
      return <Button onClick={() => history.go(-1)}>返回</Button>;
    }
    return (
      <>
        <Button
          onClick={() => {
            history.go(-1);
          }}
        >
          取消
        </Button>
        <Button
          className='marginLeft20'
          type='primary'
          onClick={async () => {
            await form.validateFields().then(async value => {
              if (
                history.location.pathname.indexOf('basic-admin/product/add') > 0
              ) {
                await apiAddProduct({
                  ...value,
                  half: [...halfCheckedKeys],
                }).then(({ data }) => {
                  if (data.code === 200) {
                    message.success(data.msg);
                    history.go(-1);
                  } else {
                    message.error(data.msg);
                  }
                });
              }
              if (
                history.location.pathname.indexOf('basic-admin/product/edit') >=
                0
              ) {
                await apiEditProduct({
                  ...value,
                  half: [...halfCheckedKeys],
                  id: history.location.search.split('?')[1],
                }).then(({ data }) => {
                  if (data.code === 200) {
                    message.success(data.msg);
                    history.go(-1);
                  } else {
                    message.error(data.msg);
                  }
                });
              }
            });
          }}
        >
          提交
        </Button>
      </>
    );
  };
  return (
    <>
      <div className={style.organization}>
        <div className={style.left_content}>
          <div className={style.content}>
            <Form form={form} layout='vertical' size='middle'>
              {renderLeftItem(leftItem())}
            </Form>
          </div>
        </div>
      </div>
      <div
        className='Drawer-Btn'
        style={{
          textAlign: 'center',
          padding: '20px',
          borderTop: '1px solid #efefef',
        }}
      >
        {renderFooter()}
      </div>
    </>
  );
};

export default Orgstaff;
