/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/**
 * @file 添加产品
 */
import { FC, useEffect, useState } from 'react';
// import IconFont from '@components/iconfont';
// import { ColumnType } from 'antd/es/table';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  // Col,
  // Row,
  Table,
  // Radio,
  InputNumber,
  // Tree,
} from 'antd';
// import { Option } from 'antd/es/mentions';
import { Rule } from 'antd/lib/form';
// import { ColumnsType } from 'antd/lib/table';
// import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
// import { useDictColumn } from './columns';
import { NamePath } from 'antd/es/form/interface';
import style from '../index.module.scss';
import VerifyUtils from '@/utils/verifty';
// import { apiCategoryList, apiProductList } from '../../service';

import useSyncCallback from '@/utils/useSyncCallback';
import {
  apiGetProducts,
  apiCategoryList,
  CategoryProductProps,
  apiAddCategoryProduct,
  apiEditCategoryProduct,
} from '../../service';
import { querystringToObject } from '@/utils';

const AddProduct: FC = () => {
  interface AddProduct {
    dictName?: string;
    productId?: string;
    auth?: string;
    categoryId: NamePath;
    orderNum?: number;
    id?: string;
  }
  interface ProductProps {
    productform?: string;
    productId?: string | null;
    status: number;
    auth?: number | null;
    [key: string]: any;
  }
  const history = useHistory();
  const [form] = Form.useForm<AddProduct>();
  const [productform] = Form.useForm<ProductProps>();

  const [showModel, setShowModel] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryProductProps[]>([]);
  const [productData, setProductData] = useState([]);
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const queryObj: { guideId?: string; [other: string]: any } =
    querystringToObject();
  const formProps: {
    name: string;
    label: string;
    required?: boolean;
    rules?: Rule[];
    type: string;
    key: number;
    placeholder?: string;
  }[] = [
    {
      name: 'dictName',
      label: '产品名称：',
      type: 'InputButton',
      key: 1,
      rules: [
        {
          required: true,
          message: '请选择产品',
        },
      ],
    },
    {
      name: 'productId',
      type: 'Text',
      key: 2,
      label: '产品ID：',
    },
    {
      name: 'auth',
      type: 'Text',
      key: 3,
      label: '是否上线：',
    },
    {
      name: 'categoryId',
      label: '所属分类：',
      key: 4,
      type: 'Select',
      placeholder: '请选择分类',
      rules: [
        {
          required: true,
          message: '请选择分类',
        },
      ],
    },
    {
      name: 'orderNum',
      label: '排序：',
      type: 'InputNumber',
      key: 5,
      placeholder: '排序',
      rules: [
        {
          required: true,
          message: '请输入排序',
        },
      ],
    },
  ];
  const getCategoryData = async () => {
    const { data } = await apiCategoryList({
      page: 1,
      size: 10000,
      guideId: queryObj?.guideId,
    });
    try {
      setCategoryList(
        data.data.rows.map((item, index) => {
          return Object.assign(item, { key: index });
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getProductData = async () => {
    // const obj = productform.getFieldsValue(true);
    const obj: Partial<ProductProps> = {};
    Object.assign(productform.getFieldsValue(true), {
      status: 0,
    });
    Object.keys(productform.getFieldsValue(true)).forEach(key => {
      if (productform.getFieldsValue(true)[key] !== '') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        obj[key] = productform.getFieldsValue(true)[key];
      }
    });

    const { data } = await apiGetProducts({ ...obj, page, size });
    try {
      setProductData(
        data.data.rows.map((item, index) => {
          return Object.assign(item, { key: index });
        }),
      );
      setCount(data.data.total);
    } catch (error) {
      console.log(error);
    }
  };
  const UseSyncCallbackFn = useSyncCallback(getProductData);
  useEffect(() => {
    getCategoryData();
    if (history.location.pathname.includes('basic-admin/nav/product/edit')) {
      form.setFieldsValue({
        dictName: decodeURI(queryObj?.productName),
        productId: decodeURI(queryObj?.productId),
        auth: queryObj?.auth,
        categoryId: decodeURI(queryObj?.categoryId),
        id: queryObj?.id,
        orderNum: queryObj?.orderNum,
      });
    }
  }, []);
  const renderFrom = () => {
    return (
      <Form form={form} labelCol={{ span: 2 }}>
        {formProps.map(item => {
          if (item.type === 'Select') {
            return (
              <Form.Item {...item}>
                <Select placeholder='请选择' style={{ width: '300px' }}>
                  {categoryList?.map(ite => {
                    return (
                      <Select.Option key={ite.key} value={ite.categoryId}>
                        {ite.categoryName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            );
          }
          if (item.type === 'InputButton') {
            return (
              // <div key={item.key} style={{ display: 'flex' }}>
              <Form.Item {...item}>
                <Input
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  value={form.getFieldValue('dictName')}
                  disabled
                  style={{ width: '300px', marginRight: '20px' }}
                />
                <Button
                  type='primary'
                  onClick={() => {
                    setShowModel(true);
                    getProductData();
                  }}
                >
                  选择产品
                </Button>
              </Form.Item>
              // </div>
            );
          }
          if (item.type === 'InputNumber') {
            return (
              <Form.Item {...item}>
                <InputNumber
                  controls={false}
                  style={{ width: '80px' }}
                  min={1}
                  max={999}
                  formatter={value => `${Number(value).toFixed(0)}`}
                />
              </Form.Item>
            );
          }
          if (item.type === 'Text') {
            return (
              <Form.Item {...item}>
                {
                  // eslint-disable-next-line no-nested-ternary
                  item.name === 'auth'
                    ? // eslint-disable-next-line no-nested-ternary
                      form.getFieldValue('auth') === '1'
                      ? '是'
                      : form.getFieldValue('auth') === '0'
                      ? '否'
                      : '--'
                    : form.getFieldValue(item.name) || '--'
                }
                {/* <Input placeholder='请输入' disabled /> */}
              </Form.Item>
            );
          }

          return <Form.Item />;
        })}
      </Form>
    );
  };

  const renderSelectPro = () => {
    interface ProductColumns {
      id: number;
      auth: string;
      dict_data_value: string;
      productId: string;
      productName: string;
      apply_product: string;
      is_forbid: boolean;
      productInfo: string | undefined;
    }
    // const submint = () => {

    //   setPage(1);
    //   UseSyncCallbackFn();
    // };
    const columns = [
      {
        dataIndex: 'index',
        title: '序号',
        render: (t: string, record: ProductColumns, index: number) => index + 1,
      },
      {
        dataIndex: 'productName',
        title: '产品名称',
      },
      {
        dataIndex: 'productId',
        title: '产品ID',
      },
      {
        title: '是否上线',
        render: (t: string, record: ProductColumns) => {
          return <span>{record.auth === '1' ? '是' : '否'}</span>;
        },
      },
      {
        dataIndex: 'productInfo',
        title: '产品简介',
        render: (t: string, record: ProductColumns) => {
          return <span>{record.productInfo || '--'}</span>;
        },
      },
    ];
    return (
      <div>
        <Form
          style={{ marginBottom: '20px' }}
          layout='inline'
          form={productform}
        >
          <Form.Item label='产品名称' name='productName'>
            <Input placeholder='产品名称' />
          </Form.Item>
          <Form.Item label='产品ID' name='productId'>
            <Input placeholder='产品ID' />
          </Form.Item>
          <Form.Item label='是否上线' name='auth' style={{ width: '200px' }}>
            <Select placeholder='请选择'>
              <Select.Option value=''>全部</Select.Option>
              <Select.Option value='1'>是</Select.Option>
              <Select.Option value='0'>否</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={() => getProductData()}>
              查询
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              onClick={() => productform.resetFields()}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys: React.Key[], selectedRows) => {
              const { productId, auth, productName } = selectedRows[0];
              form.setFieldsValue({ productId, auth, dictName: productName });
              console.log(form.getFieldsValue(true));
            },
          }}
          columns={columns}
          dataSource={productData}
          pagination={{
            pageSize: size,
            total: count,
            current: page,
            onChange: (pageNum, pageSize) => {
              setPage(pageNum);
              setSize(pageSize);
              UseSyncCallbackFn();
            },
          }}
        />
      </div>
    );
  };
  return (
    <div>
      {renderFrom()}
      <Modal
        title='选择产品'
        visible={showModel}
        onCancel={() => setShowModel(false)}
        maskClosable={false}
        width={1000}
        className={style.dictModal}
        onOk={async () => {
          setShowModel(true);
          await form
            .validateFields()
            .then(fields => {
              console.log(form);
              console.log(fields);
            })
            .finally(() => {
              setShowModel(false);
            });
        }}
      >
        {renderSelectPro()}
      </Modal>
      <div className={style.bottomBox}>
        <Button style={{ marginRight: '30px' }} onClick={() => history.go(-1)}>
          取消
        </Button>
        <Button
          type='primary'
          onClick={() => {
            form.validateFields().then(() => {
              let api;
              const obj = {
                guideId: queryObj.guideId,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                productId: form.getFieldValue('productId'),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                categoryId: String(form.getFieldValue('categoryId')),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                orderNum: form.getFieldValue('orderNum'),
              };
              if (history.location.pathname.includes('nav/product/add')) {
                api = apiAddCategoryProduct;
              } else {
                api = apiEditCategoryProduct;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                // obj.id = form.getFieldValue('id');
                Object.assign(obj, { id: form.getFieldValue('id') });
              }
              api(obj).then(res => {
                if (res.data.data === 1) {
                  VerifyUtils.Toast('success', res.data.msg);
                  setTimeout(() => {
                    history.go(-1);
                  }, 500);
                } else {
                  VerifyUtils.Toast('error', res.data.msg);
                }
              });
            });
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
