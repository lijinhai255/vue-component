/* eslint-disable */
import { FC, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import {
  Form,
  Input,
  Select,
  Col,
  Button,
  Table,
  Row,
  Space,
  InputNumber,
  DatePicker,
} from 'antd';
// import { IconFont } from '@components/IconFont';
import { useHistory } from 'react-router-dom';
import { addEditForm } from './formColumn';
import style from './style.module.scss';
import { combineClassName } from '@/utils';
import { useFormik } from 'formik';
import VerifyUtils, { PersonKeys } from '@utils/verifty';
import Examine from '@/views/emission/library/component/examine';

import EmissionModel, { SexObjType, modelObj } from '../component/modal';
import {
  apiOrderInfo,
  apiaddOrder,
  GoogType,
  apiEditOrder,
  CurrentType,
  apiGetAllCompanys,
} from '../../service';
interface EditPrderProps {
  totalMoney?: number | string;
  id?: number | string;
  goodsName: string | number;
  goodsId: string | number;
  goodsAttribute: string | number;
  type: string | number;
  goodsInfo: string | number;
  labels: string | number;
  productList: { productId: string }[];
  payTime?: Moment; // 行业类别
  status?: string;
  priceList: {
    priceType: string;
    value: number | string;
    realPrice: number | string;
    standPrice: number | string;
  }[];
}
const AddEidtGoods: FC = () => {
  // const [imageLoading, changeImageLoading] = useState(false);
  const history = useHistory();
  const [modelVisBle, changeModelVisBle] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(true); // 编辑 和保存功能
  const [currentLableIds, changeCurrentLableIds] = useState<React.Key[]>();
  const [currentLableArr, changeCurrentArr] = useState<CurrentType[]>();
  const [organizationId, changeOrganizationId] = useState<React.Key[]>();
  const [oragnizationArr, changeOrganizationArr] = useState<CurrentType[]>();
  const [examineData, getExamineData] = useState<{}>({});
  const [editId, getEditId] = useState<string>('');
  const [currentLabel, changeCurrentLabel] = useState<string>('');
  const [form] = Form.useForm<EditPrderProps & GoogType>();
  // 添加商品标签
  const [goodsTarget, setGoodsTarget] = useState<string[]>([]);
  // 产品列表
  const culDisAble = () => {
    return ['exam', 'detail'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  const culAddButton = () => {
    return ['exam', 'detail', 'openService'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  // const [localProductList, setLocalProductList] = useState([]);
  const formik = useFormik<GoogType[]>({
    // 数值类
    initialValues: [],
    onSubmit: values => {
      console.log(values, 'values');
    },
  }); // 数值类
  const returnOption = (index: number) => {
    // {"id":122,"priceId":122,"goodsId":"goods122","priceType":"天","value":30,"realPrice":333.33,"standPrice":5555.55},
    if (currentLableArr && currentLableArr[index]?.priceList) {
      return currentLableArr[index] && currentLableArr[index]?.priceList
        ? currentLableArr[index]?.priceList.map(item => {
            return (
              <Select.Option
                value={`${item.priceId}`}
                key={JSON.stringify(item)}
              >{`${item.value}${item.priceType}`}</Select.Option>
            );
          })
        : '';
    }
    return '';
  };
  //计算订单信息 计算价格
  const culOrderNumber = (type?: string) => {
    if (type === 'recieveMoney') {
      // @ts-ignore
      const recieveMoney = formik.values.reduce((prev, cur) => {
        return Number(prev) + Number(cur?.recieveMoney);
      }, 0);
      console.log(recieveMoney);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        recieveMoney: `${Number(recieveMoney).toFixed(2)}`,
      });
      return;
    }
    if (type === 'realMoney') {
      // @ts-ignore
      const realMoney = formik.values.reduce((prev, cur) => {
        return Number(prev) + Number(cur?.realMoney);
      }, 0);
      // @ts-ignore
      const cutMoney = formik.values.reduce((prev, cur) => {
        return Number(prev) + Number(cur?.cutMoney);
      }, 0);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        realMoney: `${Number(realMoney).toFixed(2)}`,
        cutMoney: `${Number(cutMoney).toFixed(2)}`,
      });
      return;
    }
    // 计算商品总价
    // @ts-ignore
    const totalMoney = formik.values.reduce((prev, cur) => {
      return Number(prev) + Number(cur?.totalMoney);
    }, 0);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      totalMoney: `${Number(totalMoney).toFixed(2)}`,
    });
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (__: string, _: GoogType, index: number) => {
        return index + 1;
      },
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    },
    {
      title: '商品编号',
      dataIndex: 'goodsId',
      key: 'goodsId',
    },
    {
      title: '计费模式',
      dataIndex: 'mode',
      key: 'mode',
      render: (t: keyof SexObjType) => {
        return modelObj[t];
      },
    },
    {
      title: '商品有效期',
      dataIndex: 'priceId',
      key: 'priceId',
      width: 200,
      render: (t: keyof SexObjType, _: any, index: number) => {
        return (
          <Select
            style={{ width: '100%' }}
            placeholder='请选择'
            disabled={culDisAble()}
            onChange={(e, option) => {
              // @ts-ignore
              let keyObj = JSON.parse(option.key);
              let arr = formik.values;
              arr[index].priceId = `${e}`;
              arr[index].priceType = keyObj.priceType;
              arr[index].value = keyObj.value;
              arr[index].goodsPeriod = `${keyObj.value}${keyObj.priceType}`;
              arr[index].totalMoney = `${keyObj.realPrice}`;
              arr[index].cutMoney = Number(arr[index].realMoney)
                ? `${(
                    Number(keyObj.realPrice) - Number(arr[index].realMoney)
                  ).toFixed(2)}`
                : null;
              console.log(arr, 'arr=arr');
              culOrderNumber();
              culOrderNumber('realMoney');
              formik.setValues([...arr]);
            }}
            value={
              `${formik.values[index].priceId}`
                ? `${formik.values[index].priceId}`
                : null
            }
          >
            {returnOption(index)}
          </Select>
        );
      },
    },
    {
      title: '商品价格（元）',
      dataIndex: 'totalMoney',
      key: 'totalMoney',
      render: (totalMoney: string) => {
        return totalMoney;
      },
    },
    {
      title: '应收金额（元）',
      dataIndex: 'recieveMoney',
      key: 'recieveMoney',
      width: 200,
      render: (recieveMoney: string, _: any, index: number) => {
        return (
          <InputNumber
            disabled={culDisAble()}
            style={{ width: '100%' }}
            placeholder='请填写'
            value={recieveMoney}
            min={`0`}
            onChange={e => {
              const arr = formik.values;
              arr[index].recieveMoney = e ? `${Number(e).toFixed(2)}` : null;
              formik.setValues([...arr]);
              culOrderNumber('recieveMoney');
            }}
          ></InputNumber>
        );
      },
    },
    {
      title: '实收金额（元）',
      dataIndex: 'realMoney',
      key: 'realMoney',
      width: 200,
      render: (realMoney: string, _: any, index: number) => {
        return (
          <InputNumber
            disabled={culDisAble()}
            placeholder='请填写'
            style={{ width: '100%' }}
            min={`0`}
            value={realMoney}
            onChange={e => {
              const arr = formik.values;
              let result =
                Number(formik.values[index].totalMoney) - Number(e) < 0
                  ? `0`
                  : `${(
                      Number(formik.values[index].totalMoney) - Number(e)
                    ).toFixed(2)}`;
              arr[index].realMoney = e ? `${Number(e).toFixed(2)}` : null;
              arr[index].cutMoney = result;
              console.log(result, 'result=result');
              formik.setValues([...arr]);
              culOrderNumber('realMoney');
            }}
          />
        );
      },
    },
    {
      title: '优惠金额（元）',
      dataIndex: 'cutMoney',
      key: 'cutMoney',
      render: (value: string) => {
        console.log(value, 'value=value');
        return value;
      },
    },
    culDisAble()
      ? {}
      : {
          title: '操作',
          dataIndex: 'address',
          key: 'address',
          render: (t: keyof SexObjType, _: any, index: number) => {
            return (
              <Space>
                <Button
                  type='link'
                  onClick={() => {
                    let arr = formik.values.filter((_, ind) => ind !== index);
                    if (currentLableIds) {
                      let laberKeyArr = currentLableIds.filter(
                        (_: unknown, ind: number) => ind !== index,
                      );
                      changeCurrentLableIds([...laberKeyArr]);
                    }
                    if (currentLableArr) {
                      let laberKeyArr = currentLableArr.filter(
                        (_: unknown, ind: number) => ind !== index,
                      );
                      changeCurrentArr([...laberKeyArr]);
                    }

                    formik.setValues([...arr]);
                  }}
                >
                  删除
                </Button>
              </Space>
            );
          },
        },
  ];
  // 获取商品详情
  const getDetail = async (orderId: string) => {
    try {
      const { data } = await apiOrderInfo({ orderId });
      let newObj = {
        totalMoney: data.data.totalMoney,
        testFlag: data.data.testFlag,
        recieveMoney: data.data.recieveMoney,
        realMoney: data.data.realMoney,
        cutMoney: data.data.cutMoney,
        companyName: data.data.companyName,
        companyNum: data.data.companyNum,
        payTime: moment(data.data.payTime, ''),
        remark: data.data.remark,
        companyId: data.data.companyId,
        id: data.data.id,
        priceList: [],
        goodsName: '',
        mode: '',
      };
      getEditId(data.data.id);
      getExamineData({
        auditResult: data.data.auditState,
        auditList: data.data.orderAuditRecords,
      });
      changeOrganizationArr([{ ...newObj }]);
      changeOrganizationId([data.data.companyNum]);
      formik.setValues([...data.data.orderGoods]);
      changeCurrentArr([...data.data.orderGoods]);
      changeCurrentLableIds([
        ...data.data.orderGoods.map(item => item.goodsId),
      ]);
      form.setFieldsValue({
        ...newObj,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const apiGetAllCompanysFn = async () => {
    const { data } = await apiGetAllCompanys({
      companyNum: history.location.search.split('?')[1],
      page: 1,
      size: 100000,
    });
    if (data.code === 200) {
      form.setFieldsValue({
        ...form.getFieldsValue(true),
        // ...data.data.rows[0],
        ...form.getFieldsValue(true),
        // @ts-ignore
        companyName: data.data.rows[0].companyName
          ? // @ts-ignore
            data.data.rows[0].companyName
          : '',
        // @ts-ignore
        companyNum: data.data.rows[0].companyNum
          ? // @ts-ignore
            data.data.rows[0].companyNum
          : '',
      });
      // @ts-ignore
      changeOrganizationArr(data.data.rows);
    }
    console.log(data, 'data=data');
  };
  useEffect(() => {
    if (history.location.pathname.includes('basic-admin/goods/add')) {
      setIsEdit(false);
    } else {
      if (history.location.pathname.indexOf('openService') >= 0) {
        apiGetAllCompanysFn();
      }
      // setIsEdit(true);
      getDetail(history.location.search.split('?')[1]);
    }
  }, []);
  // 上部表单
  const renderForm = () => {
    return (
      <Form form={form} style={{ width: '50%' }} layout='horizontal'>
        {
          // eslint-disable-next-line array-callback-return
          addEditForm?.map(item => {
            if (item.type === 'Input') {
              return (
                <Form.Item key={item.name} {...item}>
                  <Input disabled={culDisAble()} placeholder='请输入' />
                </Form.Item>
              );
            }
            if (item.type === 'disAbleInput') {
              return (
                <Form.Item key={item.name} {...item}>
                  <Input disabled={true} />
                </Form.Item>
              );
            }
            if (item.type === 'Select') {
              const form = (
                <Form.Item key={item.name} {...item}>
                  <Select disabled={culDisAble()} placeholder='请选择'>
                    <Select.Option value={1}>是</Select.Option>
                    <Select.Option value={0}>否</Select.Option>
                  </Select>
                </Form.Item>
              );
              return form;
            }
            if (item.type === 'TextArea') {
              return (
                <Form.Item key={item.name} {...item}>
                  <Input.TextArea
                    disabled={culDisAble()}
                    showCount
                    placeholder='最多输入100个字符'
                    maxLength={100}
                  />
                </Form.Item>
              );
            }
            if (item.type === 'DatePicker') {
              return (
                <Form.Item key={item.name} {...item}>
                  <DatePicker
                    disabled={culDisAble()}
                    showTime
                    style={{ width: '100%' }}
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder='请选择'
                  />
                </Form.Item>
              );
            }
            if (item.type === 'Button') {
              return (
                <Row gutter={24}>
                  <Col span={20} style={{ paddingRight: '0' }}>
                    <Form.Item key={item.name} {...item}>
                      <Input
                        style={{ width: '100%' }}
                        disabled
                        placeholder='请添加'
                      />
                    </Form.Item>
                  </Col>
                  {culAddButton() ? (
                    ''
                  ) : (
                    <Button
                      type='primary'
                      onClick={() => {
                        changeModelVisBle(true);
                        changeCurrentLabel('organization');
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      添加
                    </Button>
                  )}
                </Row>
              );
            }
          })
        }
      </Form>
    );
  };
  // 底部取消保存按钮
  // 去除排放因子审核信息
  const reExamine = () => {
    return ['/basic-admin/orders/exam', '/basic-admin/orders/detail'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  const renderFooterBtn = () => {
    return (
      <div className={style.orderContent}>
        <h2>订单商品详情</h2>
        <p>
          {culDisAble() ? (
            ''
          ) : (
            <Button
              type='primary'
              onClick={() => {
                changeModelVisBle(true);
                changeCurrentLabel('');
              }}
            >
              选择商品
            </Button>
          )}
        </p>
        <Table
          dataSource={formik.values}
          columns={columns}
          rowKey={item => {
            return `${item.goodsId}`;
          }}
        />
        <h2 style={{ marginTop: '20px' }}>订单信息</h2>
        {renderForm()}
        Cascader
        {modelVisBle && (
          <EmissionModel
            currentLabel={currentLabel}
            visible={modelVisBle}
            selectKeys={
              currentLabel === 'organization' ? organizationId : currentLableIds
            }
            seleckRows={
              currentLabel === 'organization'
                ? oragnizationArr
                : currentLableArr
            }
            onCancel={() => {
              changeModelVisBle(false);
            }}
            onConfime={(value: React.Key[]) => {
              console.log(value, 'value=value');
              if (currentLabel === 'organization') {
                return changeOrganizationId([...value]);
              }
              return changeCurrentLableIds([...value]);
            }}
            onConfimeRow={(value: CurrentType[]) => {
              if (value.length === 0) return;
              if (currentLabel === 'organization') {
                changeOrganizationArr([...value]);
                changeModelVisBle(false);
                form.setFieldsValue({
                  ...form.getFieldsValue(true),
                  companyName: value[0].companyName ? value[0].companyName : '',
                  companyNum: value[0].companyNum ? value[0].companyNum : '',
                });
                return;
              }
              changeCurrentArr([...value]);
              let newArr = value.map((item: CurrentType) => {
                return {
                  goodsName: item.goodsName,
                  goodsId: item.goodsId ? item.goodsId : '',
                  mode: item.mode,
                  priceId: '',
                  priceType: '',
                  value: '',
                  goodsPeriod: '',
                  totalMoney: '',
                  recieveMoney: '',
                  realMoney: '',
                  cutMoney: '',
                  id: '',
                  priceList: [],
                };
              });
              formik.setValues([...newArr]);
              changeModelVisBle(false);
            }}
          />
        )}
        {culDisAble() ? (
          <Row className='Drawer-Btn'>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => history.go(-1)}
            >
              返回
            </Button>
          </Row>
        ) : (
          <Row className='Drawer-Btn'>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => history.go(-1)}
            >
              取消
            </Button>
            <Button
              type='primary'
              onClick={async () => {
                await form.validateFields().then(async values => {
                  const resultVlaue = {
                    ...values,
                    payTime: values?.payTime?.format('YYYY-MM-DD HH:mm:ss'),
                    orderGoods: formik.values,
                  };
                  if (history.location.pathname.indexOf('edit') >= 0) {
                    await apiEditOrder({
                      ...resultVlaue,
                      orderGoods: formik.values,
                      companyId:
                        oragnizationArr && oragnizationArr[0]?.companyId
                          ? oragnizationArr[0]?.companyId
                          : '',
                      id: editId,
                      orderId: history.location.search.split('?')[1],
                    }).then(({ data }) => {
                      VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
                      if (data.code === 200) {
                        history.go(-1);
                      }
                    });
                    return;
                  }
                  await apiaddOrder({
                    ...resultVlaue,
                    orderGoods: formik.values,
                    companyId:
                      oragnizationArr && oragnizationArr[0]?.companyId
                        ? oragnizationArr[0]?.companyId
                        : '',
                  }).then(({ data }) => {
                    VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
                    if (data.code === 200) {
                      history.go(-1);
                    }
                  });
                });
              }}
            >
              提交审核
            </Button>
          </Row>
        )}
      </div>
    );
  };

  return <div>{renderFooterBtn()}</div>;
};

export default AddEidtGoods;
