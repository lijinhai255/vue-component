/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-param-reassign */
import React, { FC, useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Col,
  Button,
  Table,
  Row,
  Modal,
  Space,
} from 'antd';
import { IconFont } from '@components/IconFont';
import { useHistory } from 'react-router-dom';
import VerifyUtils from '@utils/verifty';
import { addEditForm, useProductColumn, useGooodsColumn } from './formColumn';
import style from '../index.module.scss';
import { combineClassName, removeRepeat } from '@/utils';
import { querystringToObject } from '@/utils';

import { apiMnumListALLByDictTypeBatch } from '../../../data-quality-management/service-old';
import {
  apiGoodsInfo,
  apiEditGoods,
  apiAddGoods,
  EditGoodsProps,
  apiGetProducts,
} from '../../service';
import useSyncCallback from '@/utils/useSyncCallback';

const AddEidtGoods: FC = () => {
  interface ProductProps {
    productform?: string;
    productId?: string | null;
    status: number;
    auth?: number | null;
    [key: string]: any;
  }
  // const [imageLoading, changeImageLoading] = useState(false);
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(true); // 编辑 和保存功能
  const [form] = Form.useForm<EditGoodsProps>();
  // 添加商品标签
  const [goodsTarget, setGoodsTarget] = useState<string[]>([]);
  // 本地产品列表
  interface LocalProductProp {
    productName: string;
    productId: string;
    productInfo: string;
  }
  const [localProductList, setLocalProductList] = useState<LocalProductProp[]>(
    [],
  );
  // 临时产品列表
  const [tmpProductMap, setTmpProductMap] = useState(new Map());
  // 记录选择位置
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 接口返回产品列表数据
  const [productList, setProductList] = useState([]);
  // 产品列表数据条数
  const [productCount, setProductCount] = useState(0);
  const [modalOkLoading, setModalOkLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  // 产品列表搜索
  const [productform] = Form.useForm<ProductProps>();
  // 商品类型
  const [goodsType, setGoodsType] = useState([]);
  // 商品属性
  interface GoodsType {
    dictValue: string;
    dictLabel: string;
  }

  interface QueryProps {
    goodsId?: string | undefined;
    id?: string;
  }
  const [goodsAttribute, setGoodsAttribute] = useState<GoodsType[]>([]);
  // 产品弹窗
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  // 传值对象
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queryObj, setQueryObj] = useState<QueryProps>();
  interface GoodsListProps {
    priceType: string;
    value: number | string;
    realPrice: number;
    standPrice: number;
  }
  // 商品列表
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [goodsList, setGoodsList] = useState<GoodsListProps[]>([
    { priceType: '天', value: 0, realPrice: 0, standPrice: 0 },
  ]);

  const getDicData = async () => {
    let { data } = await apiMnumListALLByDictTypeBatch({
      dictTypes: 'goods_type,goods_attribute',
    });
    setGoodsType(data.data.goods_type);
    setGoodsAttribute(data.data.goods_attribute);
  };
  // 获取商品详情
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getDetail = async (goodsId: string) => {
    try {
      const { data } = await apiGoodsInfo({ goodsId });
      data.data.labels && setGoodsTarget(data.data.labels.split(','));
      setLocalProductList(data.data.productList);
      setGoodsList(data.data.priceList);
      form.setFieldsValue({
        ...data.data,
        labels: '',
        type: String(data.data.type),
      });
    } catch (error) {
      console.log(error);
    }
  };
  // 添加编辑商品详情
  const addEidtGoods = async () => {
    const api = isEdit ? apiEditGoods : apiAddGoods;
    const productIds = localProductList.map(item => {
      return { productId: item.productId };
    });
    const obj: EditGoodsProps = {
      goodsName: form.getFieldValue('goodsName'),
      goodsId: form.getFieldValue('goodsId'),
      goodsAttribute: form.getFieldValue('goodsAttribute'),
      goodsInfo: form.getFieldValue('goodsInfo'),
      type: form.getFieldValue('type'),
      labels: goodsTarget.join(','),
      productList: productIds,
      priceList: goodsList,
    };
    isEdit && (obj.id = queryObj?.id);
    console.log(obj);
    // return;
    try {
      const { data } = await api(obj);
      if (data.code === 200) {
        VerifyUtils.Toast('success', data.msg);
        setTimeout(() => {
          history.go(-1);
        }, 500);
      } else {
        VerifyUtils.Toast('warn', data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDicData();
    if (history.location.pathname.includes('basic-admin/goods/add')) {
      setIsEdit(false);
    } else {
      setQueryObj(querystringToObject());
      const queryObjs: any = querystringToObject();
      getDetail(queryObjs?.goodsId);
    }
  }, []);
  // 上部表单
  const renderForm = () => {
    const addTarget = () => {
      if (goodsTarget.length < 10) {
        const lable = form.getFieldValue('labels');
        if (!lable) {
          VerifyUtils.Toast('warn', '请填写标签内容');
          return;
        }
        form.setFieldsValue({
          ...form.getFieldsValue(true),
          labels: '',
        });
        setGoodsTarget([...goodsTarget, lable]);
      } else {
        VerifyUtils.Toast('warn', '最多添加十个标签');
      }
    };
    const deleteTarget = (index: number) => {
      goodsTarget.splice(index, 1);
      setGoodsTarget([...goodsTarget]);
    };
    return (
      <Form form={form} style={{ width: '780px' }}>
        <Row>
          {
            // eslint-disable-next-line array-callback-return
            addEditForm?.map(item => {
              if (item.type === 'Input') {
                return (
                  <Col
                    key={item.name}
                    span={10}
                    offset={item.offset}
                    className={combineClassName(`${style.col}`)}
                  >
                    <Form.Item key={item.name} {...item}>
                      <Input
                        maxLength={item.max}
                        placeholder='请输入'
                        disabled={isEdit && item.name === 'goodsId'}
                      />
                    </Form.Item>
                  </Col>
                );
              }
            })
          }
        </Row>
        <Row>
          {
            // eslint-disable-next-line array-callback-return
            addEditForm?.map(item => {
              if (item.type === 'Select') {
                const form = (
                  <Col
                    key={item.name}
                    span={10}
                    offset={item.offset}
                    className={combineClassName(`${style.col}`)}
                  >
                    <Form.Item key={item.name} {...item}>
                      <Select placeholder='请选择'>
                        {(item.name == 'goodsAttribute'
                          ? goodsAttribute
                          : goodsType
                        )?.map(ite => {
                          return (
                            <Select.Option
                              key={ite.dictValue}
                              value={ite.dictValue}
                            >
                              {ite.dictLabel}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                );
                return form;
              }
            })
          }
        </Row>
        {
          // eslint-disable-next-line array-callback-return
          addEditForm?.map(item => {
            if (item.type === 'TextArea') {
              return (
                <Form.Item key={item.name} {...item}>
                  <Input.TextArea placeholder='请输入' maxLength={200} />
                </Form.Item>
              );
            }
            if (item.type === 'Button') {
              return (
                <div key={item.name}>
                  <Form.Item key={item.name} {...item}>
                    <Input maxLength={20} placeholder='商品标签' />
                  </Form.Item>
                  <Button
                    type='primary'
                    onClick={() => {
                      addTarget();
                    }}
                  >
                    添加
                  </Button>
                  <ul className={combineClassName(`${style.targetFlex}`)}>
                    {goodsTarget.map((ite, index) => {
                      // eslint-disable-next-line react/no-array-index-key
                      return (
                        <li key={index}>
                          {ite}
                          <div
                            onClick={() => deleteTarget(index)}
                            className={combineClassName(`${style.close}`)}
                          ></div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          })
        }
      </Form>
    );
  };

  // 产品列表
  const productColumn = useProductColumn<any>({});

  const renderProductList = () => {
    const onDelete = (record: any) => {
      for (let i = 0; i < localProductList.length; i++) {
        const item: any = localProductList[i];
        if (record.productId == item.productId) {
          localProductList.splice(i, 1);
        }
      }
      setLocalProductList([...localProductList]);
    };
    let deletes = {
      title: '操作',
      render: (t: string, record: any) => {
        return (
          <Space>
            <Button type='link' danger onClick={() => onDelete?.(record)}>
              删除
            </Button>
          </Space>
        );
      },
    };
    return (
      <Table
        bordered
        pagination={false}
        columns={[...productColumn, deletes]}
        dataSource={localProductList}
      ></Table>
    );
  };

  // 选择产品弹窗
  const getProductData = async () => {
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
      setProductList(
        data.data.rows.map((item, index) => {
          return Object.assign(item, { key: index });
        }),
      );
      setProductCount(data.data.total);
      // 重新匹配勾选项
      const localIds = localProductList.map((item: any) => item.productId);
      // console.log(localIds);
      if (localIds.length) {
        let rows: {}[] = [];
        let keys: number[] = [];
        data.data.rows.forEach((item: any, index) => {
          if (localIds.includes(item.productId)) {
            rows.push(item);
            keys.push(index);
          }
        });
        tmpProductMap.set('key' + page, keys);
        tmpProductMap.set(page, rows);
      }
      setSelectedRowKeys(Array.from(tmpProductMap.get('key' + page) || []));
    } catch (error) {
      console.log(error);
    }
  };
  const UseSyncCallbackFn = useSyncCallback(getProductData);
  const renderProductModal = () => {
    const forms = (
      <Form style={{ marginBottom: '20px' }} layout='inline' form={productform}>
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
    );
    return (
      <Modal
        title='选择产品'
        visible={showProductModal}
        onCancel={() => setShowProductModal(false)}
        maskClosable={false}
        width={1000}
        className={style.dictModal}
        onOk={async () => {
          setModalOkLoading(true);
          await productform
            .validateFields()
            .then((fields: any) => {
              let tmpArr = [];
              for (let index = 1; index <= tmpProductMap.size / 2; index++) {
                tmpArr.push(...tmpProductMap.get(index));
              }
              setLocalProductList([...tmpArr]);
              console.log(fields);
              setShowProductModal(false);
            })
            .finally(() => {
              setModalOkLoading(false);
            });
        }}
        okButtonProps={{
          loading: modalOkLoading,
        }}
      >
        {forms}
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
              tmpProductMap.set(page, selectedRows);
              tmpProductMap.set('key' + page, selectedRowKeys);
              setTmpProductMap(tmpProductMap);
              setSelectedRowKeys(selectedRowKeys);
              console.log(selectedRowKeys, selectedRows);
            },
          }}
          columns={productColumn}
          dataSource={productList}
          bordered
          pagination={{
            pageSize: size,
            total: productCount,
            current: page,
            onChange: (pageNum, pageSize) => {
              console.log(tmpProductMap);
              removeRepeat([], 'id');
              // setLocalProductList([]);
              setPage(pageNum);
              setSize(pageSize);
              UseSyncCallbackFn();
            },
          }}
        />
      </Modal>
    );
  };
  // 商品定价
  const goodsColumn = useGooodsColumn<any>({
    onChanges: (value, type, index) => {
      // let value = e.target.value;
      switch (type) {
        case 'priceType':
          goodsList[index].priceType = value;
          break;
        case 'value':
          goodsList[index].value = value;
          break;
        case 'realPrice':
          goodsList[index].realPrice = value;
          break;
        case 'standPrice':
          goodsList[index].standPrice = value;
          break;
        default:
          break;
      }
      setGoodsList([...goodsList]);
    },
  });

  const renderGoodsPrice = () => {
    const onAdd = (item: any) => {
      setGoodsList([
        ...goodsList,
        { priceType: '天', value: 0, realPrice: 0, standPrice: 0 },
      ]);
      console.log(item);
    };
    const onDelete = (item: any, index: number) => {
      console.log(item);
      goodsList.splice(index, 1);
      setGoodsList([...goodsList]);
    };
    let operate = {
      title: '操作',
      render: (t: string, record: any, index: number) => {
        // render: () => {
        const len = goodsList.length;
        console.log(len);
        console.log(index + 1);
        const addBtn = (
          <Space>
            <Button type='link' onClick={() => onAdd?.(record)}>
              增加
            </Button>
          </Space>
        );
        const deleteBtn = (
          <Space>
            <Button
              type='link'
              danger
              onClick={() => onDelete?.(record, index)}
            >
              删除
            </Button>
          </Space>
        );
        if (len === 1) {
          return addBtn;
        } else if (len > 1 && len !== index + 1) {
          return deleteBtn;
        } else {
          return [addBtn, deleteBtn];
        }
      },
    };
    return (
      <Table
        pagination={false}
        bordered
        columns={[...goodsColumn, operate]}
        dataSource={goodsList}
      ></Table>
    );
  };
  // 底部取消保存按钮
  const renderFooterBtn = () => {
    return (
      <div style={{ paddingBottom: '20px' }}>
        {renderForm()}
        <div className={combineClassName(style.titleBox)}>
          <p>产品列表</p>
          <Button
            type='link'
            onClick={() => {
              setShowProductModal(true);
              UseSyncCallbackFn();
            }}
            icon={<IconFont type='icon-icon-tianjia' />}
          >
            新增产品
          </Button>
        </div>
        {renderProductList()}
        <div className={combineClassName(style.titleBox)}>
          <p>商品定价</p>
        </div>
        {renderGoodsPrice()}
        <div className={style.bottomBox}>
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => history.go(-1)}
          >
            取消
          </Button>
          <Button
            type='primary'
            onClick={() => {
              addEidtGoods();
            }}
          >
            保存
          </Button>
        </div>
        {renderProductModal()}
      </div>
    );
  };

  return (
    <div style={{ background: '#fff', padding: '20px', marginBottom: '40px' }}>
      {renderFooterBtn()}
    </div>
  );
};

export default AddEidtGoods;
