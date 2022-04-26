/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/**
 * @file 产品列表产品分类 column
 */
import { FC, useEffect, useState } from 'react';
// import IconFont from '@components/iconfont';
import {
  Button,
  Form,
  Input,
  Modal,
  InputNumber,
  // Select,
  // Col,
  // Row,
  Table,
  // Tree,
} from 'antd';
// import { Option } from 'antd/es/mentions';
import { Rule } from 'antd/lib/form';
// import { ColumnsType } from 'antd/lib/table';
// import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import VerifyUtils, { PersonKeys } from '@/utils/verifty';
import { useDictColumn } from './columns';
import style from '../index.module.scss';
import { querystringToObject } from '@/utils';
import {
  apiCategoryList,
  apiProductList,
  CategoryProductProps,
  apiEditCategory,
  apiAddCategory,
  apiDeleteCategory,
  apiDeleteCategoryProduct,
} from '../../service';
import useSyncCallback from '@/utils/useSyncCallback';

const Product: FC = () => {
  interface QueryProps {
    name?: string;
    id?: string;
    isFloat?: string;
  }

  const [showModel, setShowModel] = useState<boolean>(false);
  const [dataSource, setdataSource] = useState([]);
  const [pageType, setdPageType] = useState('');
  const [page, setPage] = useState(1);
  const [isEdit, setIsEdit] = useState<string>('新增');
  const [size, changeSize] = useState(10);
  const [count, setCount] = useState(10);
  const history = useHistory();
  const [form] = Form.useForm<CategoryProductProps>();
  const [modalOkLoading, setModalOkLoading] = useState(false);
  const [queryObj, setQueryObj] = useState<QueryProps>();

  const getProductData = async () => {
    const query: QueryProps = querystringToObject();
    const path: string = history.location.pathname;
    let api;
    if (path.includes('product-class')) {
      setdPageType('分类');
      api = apiCategoryList;
    } else {
      setdPageType('产品');
      api = apiProductList;
    }
    const { data } = await api({
      page,
      size,
      guideId: query.id,
    });
    if (data.code === 200) {
      setdataSource(
        data.data.rows.map((item, index) => {
          return Object.assign(item, { key: index });
        }),
      );
      setCount(data.data.total);
    }
  };
  const UseSyncCallbackFn = useSyncCallback(getProductData);

  const columns = useDictColumn({
    onEdit: record => {
      if (pageType === '分类') {
        form.setFieldsValue(record);
        setIsEdit('编辑');
        setShowModel(true);
      } else {
        const {
          guideId,
          auth,
          productId,
          categoryId,
          orderNum,
          productName,
          id,
        } = record;
        console.log(Number(id));

        history.push(
          `/basic-admin/nav/product/edit?guideId=${guideId}&auth=${auth}&productId=${productId}&categoryId=${categoryId}&orderNum=${
            orderNum || 0
          }&productName=${productName}&id=${Number(id)}`,
        );
      }
    },
    onDelete: record => {
      Modal.confirm({
        title: '系统提示',
        content: '此操作将永久删除该数据, 是否继续?',
        async onOk() {
          const fromData = new FormData();
          fromData.append('id', record.id);
          if (pageType === '分类') {
            await apiDeleteCategory(fromData);
          } else {
            await apiDeleteCategoryProduct(fromData);
          }
          UseSyncCallbackFn();
          VerifyUtils.Toast('success', '删除成功！');
        },
        onCancel() {},
      });
    },
    history,
  });
  useEffect(() => {
    const obj = querystringToObject();
    setQueryObj(obj);

    getProductData();
  }, []);
  const formClass: {
    name: string;
    label: string;
    required?: boolean;
    rules?: Rule[];
    type: string;
  }[] = [
    {
      name: 'categoryName',
      label: '分类名称：',
      type: 'Input',
      rules: [
        {
          required: true,
          message: '请输入分类名称',
        },
        {
          type: 'string',
          max: 50,
          message: '分类名称不能超过50个字符',
        },
      ],
    },
    {
      name: 'categoryId',
      type: 'Input',
      label: '分类标识：',
      rules: [
        {
          required: true,
          message: '请输入分类标识',
        },
        {
          type: 'string',
          max: 50,
          message: '分类标识不能超过50个字符',
        },
      ],
    },
    {
      name: 'orderNum',
      label: '排序：',
      type: 'InputNumber',
      rules: [
        {
          required: true,
          message: '请输入排序',
        },
      ],
    },
  ];
  return (
    <div>
      <div className={style.titleWord}>
        <section>
          <span>导航名称：{decodeURI(String(queryObj?.name))}</span>
          <span>是否有悬浮窗：{queryObj?.isFloat === '1' ? '是' : '否'}</span>
        </section>
        <Button
          type='primary'
          onClick={() => {
            if (pageType === '分类') {
              setShowModel(true);
              form.setFieldsValue({
                categoryName: '',
                categoryId: '',
                orderNum: 1,
                id: 0,
              });
              setIsEdit('新增');
              // form.setFields()
            } else {
              history.push(
                `/basic-admin/nav/product/add?guideId=${queryObj?.id}`,
              );
            }
          }}
        >
          新增{pageType}
        </Button>
      </div>
      <Table
        columns={columns}
        scroll={{ x: 1000 }}
        dataSource={dataSource}
        pagination={{
          pageSize: size,
          total: count,
          current: page,
          onChange: (pageNum, pageSize) => {
            setPage(pageNum);
            changeSize(pageSize);
            UseSyncCallbackFn();
          },
        }}
      />
      <div className={style.bottomBox}>
        <Button onClick={() => history.go(-1)}>返回</Button>
      </div>

      <Modal
        title={`${isEdit}分类`}
        visible={showModel}
        onCancel={() => setShowModel(false)}
        maskClosable={false}
        width={400}
        onOk={async () => {
          await form
            .validateFields()
            .then(async fields => {
              //
              try {
                const id: unknown = form.getFieldValue('id');

                const guideId = Number(queryObj?.id);
                if (pageType === '分类') {
                  if (id) {
                    Object.assign(fields, { id, guideId });
                    await apiEditCategory(fields);
                  } else {
                    Object.assign(fields, { guideId });
                    try {
                      let { data } = await apiAddCategory(fields);
                      VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                  UseSyncCallbackFn();
                  setShowModel(false);
                } else {
                  history.push('');
                }
              } catch (err) {
                console.log(err);
              }
            })
            .finally(() => {
              setModalOkLoading(false);
            });
        }}
        okButtonProps={{
          loading: modalOkLoading,
        }}
      >
        <Form form={form} labelCol={{ span: 6, offset: 0 }}>
          {formClass.map(item => {
            if (item.type === 'InputNumber') {
              return (
                <Form.Item key={item.name} {...item}>
                  <InputNumber
                    controls={false}
                    min={1}
                    max={999}
                    formatter={value => `${Number(value).toFixed(0)}`}
                  />
                </Form.Item>
              );
            }
            return (
              <Form.Item key={item.name} {...item}>
                <Input
                  maxLength={20}
                  disabled={item.name === 'categoryId' && isEdit === '编辑'}
                  placeholder='请输入'
                />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
