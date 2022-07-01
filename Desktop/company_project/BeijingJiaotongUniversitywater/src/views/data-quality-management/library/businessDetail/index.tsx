/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect, useState } from 'react';
import { Form, Input, Select, Col, Button, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { Rule } from 'antd/lib/form';
import style from '../index.module.scss';
import { combineClassName } from '@/utils';
import EmissionModel from '@/views/data-quality-management/library/component/modal';
import {
  apiBusinessAdd,
  apiBusinessQuery,
  apiBusinessEdit,
  apiMnumListALLByDictTypeBatch,
  apiGetAllProducts,
  apiProAdd,
  apiProQuery,
  apiProEdit,
} from '../../service-old';
import VerifyUtils, { PersonKeys } from '@/utils/verifty';
import useSyncCallback from '@/utils/useSyncCallback';

interface ItemType {
  title: string;
  name: string;
  require: Rule[];
  placeholder: string;
  type: string;
  class?: string;
  buttontext?: string;
  value?: string;
  select_list?: {
    id?: string | number;
    name?: string;
    value?: string;
    dictLabel?: string;
    dictValue?: string;
    productId?: string;
    productName?: string;
  }[];
  maxLength?: number;
  isNeedButton?: boolean;
  disabled?: boolean;
}

const Orgstaff: FC = () => {
  // const [imageLoading, changeImageLoading] = useState(false);
  const [isEdit] = useState(true); // 编辑 和保存功能
  const [modelVisBle, changeModelVisBle] = useState<boolean>(false);
  const [productList, getProductList] = useState<{}[]>([]);
  const [menList, getMenuList] = useState<{
    companyProduct?: { dictLabel: string; id: string }[];
    factorLabel?: {
      dictLabel: string;
      dictSort?: string;
      dictType?: string;
      dictValue: number;
      id: string;
      sourceType?: string;
    }[];
  }>({});
  const [lableArr, getLabelArr] = useState<string[]>([]);
  const [currentLableIds, changeCurrentLableIds] = useState<string[]>();
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {}, []);
  // 基本信息
  const isShowDisAblee = () => {
    return ['emission-factor/orgConfig/product-list/detail'].some(item => {
      return history.location.pathname.indexOf(item) >= 0;
    });
  };
  const isShowBussDisAblee = () => {
    return ['/emission-factor/business/edit', 'detail'].some(item => {
      return history.location.pathname.indexOf(item) >= 0;
    });
  };
  // 控制因子标签是否可以选中
  const isShowFactor = () => {
    return ['emission-factor/orgConfig/product-list/detail'].some(item => {
      return history.location.pathname.indexOf(item) >= 0;
    });
  };
  const leftItem = (): ItemType[] => {
    if (
      history.location.pathname.indexOf(
        '/emission-factor/orgConfig/product-list',
      ) >= 0
    ) {
      return [
        {
          name: '产品',
          type: 'select',
          title: 'productId',
          placeholder: isEdit ? '请选择' : '',
          class: 'oneRow',
          select_list: productList,
          require: isEdit
            ? [
                { required: true, message: '产品不能为空' },
                { max: 100, message: '最多可输入100个字符' },
              ]
            : [],
          disabled: isShowDisAblee(),
        },
        {
          name: '因子标签',
          type: 'oneInput',
          class: 'oneRow',
          title: 'labelIds',
          placeholder: isEdit ? '请选择' : '',
          buttontext: '选择标签',
          require: [{ required: true, message: '因子标签不能为空' }],
          disabled: true,
        },
      ];
    }
    return [
      {
        name: '业务方名称：',
        type: 'input',
        title: 'businessName',
        placeholder: isEdit ? '请输入' : '',
        require: isEdit
          ? [
              { required: true, message: '业务方名称不能为空' },
              { max: 100, message: '最多可输入100个字符' },
            ]
          : [],
      },

      {
        name: '业务方标识',
        type: 'input',
        title: 'businessLabel',
        placeholder: isEdit ? '请输入' : '',
        disabled: isShowBussDisAblee(),
        require: [
          { required: true, message: '业务方标识不能为空' },
          { max: 50, message: '最多可输入50个字符' },
        ],
      },
      {
        name: '备注',
        placeholder: isEdit ? '请填写' : '',
        title: 'remark',
        type: 'oneTextarea',
        class: 'oneRow2',
        maxLength: 1000,
        require: isEdit ? [{ max: 1000, message: '最多可输入1000个字符' }] : [],
      },
    ];
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
                key={item.name}
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
                key={item.name}
              >
                <Select placeholder={item.placeholder} disabled={item.disabled}>
                  {item?.select_list &&
                    item.select_list?.map(tem => {
                      return (
                        <Select.Option
                          key={tem.productId || ''}
                          value={String(tem.productId || '')}
                        >
                          {tem.productName}，{tem.productId}
                        </Select.Option>
                      );
                    })}
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
                      placeholder={item.placeholder}
                      maxLength={100}
                      disabled={item.disabled}
                      value={lableArr}
                    />
                  </Col>
                  {item.isNeedButton ? (
                    ''
                  ) : (
                    <Col span={4}>
                      {isShowDisAblee() ? (
                        ''
                      ) : (
                        <Button
                          onClick={() => {
                            changeModelVisBle(true);
                            const str = form
                              ?.getFieldValue('labelIds')
                              ?.split(',');
                            if (str) {
                              changeCurrentLableIds([...str]);
                            }
                          }}
                        >
                          {item.buttontext}
                        </Button>
                      )}
                    </Col>
                  )}
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
                  rows={4}
                  placeholder={item.placeholder}
                  maxLength={item.maxLength}
                />
              </Form.Item>
            );
          }
          return '';
        })}
      </Col>
    );
  };

  // 获取业务方编辑数据
  const apiBusinessQueryFn = async () => {
    await apiBusinessQuery({ id: history.location.search.split('?')[1] }).then(
      ({ data }) => {
        form.setFieldsValue({ ...data.data });
      },
    );
  };
  // 获取产品配置详情
  const apiProQueryFn = async () => {
    await apiProQuery({ id: history.location.search.split('?')[1] }).then(
      ({ data }) => {
        const arr: string[] = [];
        const value: string[] = data.data.labelIds.split(',');
        console.log(menList, 'menList=menList', data.data.labelIds.split(','));
        if (menList.factorLabel) {
          menList.factorLabel.forEach(item => {
            console.log(
              value.indexOf(`${item.dictValue}`) >= 0,
              item.dictValue,
              value,
            );
            if (value.indexOf(`${item.dictValue}`) >= 0) {
              arr.push(item.dictLabel);
            }
          });
        }
        changeCurrentLableIds([...value]);
        getLabelArr([...arr]);
        form.setFieldsValue({ ...data.data });
      },
    );
  };
  const useSyncCallbackFn = useSyncCallback(apiProQueryFn);

  // 获取产品列表相关枚举值
  const apiMnumListALLByDictTypeBatchFn = async () => {
    await apiMnumListALLByDictTypeBatch({
      dictTypes: 'factorLabel,companyProduct',
    }).then(({ data }) => {
      getMenuList({ ...data.data });
      // 编辑 获取基本信息
      if (
        history.location.pathname.indexOf(
          'emission-factor/orgConfig/product-list/edit',
        ) >= 0
      ) {
        useSyncCallbackFn();
      }
      // 详情 获取基本信息
      if (
        history.location.pathname.indexOf(
          'emission-factor/orgConfig/product-list/detail',
        ) >= 0
      ) {
        useSyncCallbackFn();
      }
    });
    await apiGetAllProducts().then(({ data }) => {
      getProductList(data.data);
    });
  };

  useEffect(() => {
    // 组织因子配置枚举列表
    if (
      history.location.pathname.indexOf(
        'emission-factor/orgConfig/product-list',
      ) >= 0
    ) {
      apiMnumListALLByDictTypeBatchFn();
    }
    // 配置详情 编辑修改 -获取产品配置详情
    if (
      history.location.pathname.indexOf('emission-factor/business/edit') >= 0
    ) {
      // 业务方的编辑数据
      apiBusinessQueryFn();
    }
  }, []);
  // 弹窗取消的方法
  const modelCancelFn = () => {
    changeModelVisBle(false);
  };
  // 弹窗确定的方法
  const modelConfirmeFn = (value: React.Key[]) => {
    const arr: string[] = [];
    if (menList.factorLabel) {
      menList.factorLabel.forEach(item => {
        if (value.indexOf(item.dictValue) >= 0) {
          arr.push(item.dictLabel);
        }
      });
    }
    form.setFieldsValue({
      labelIds: value.toString(),
    });
    getLabelArr([...arr]);
    changeModelVisBle(false);
  };
  return (
    <>
      <div className={style.organization}>
        <div className={style.left_content}>
          <div className={style.title}>
            <h2>基本信息</h2>
          </div>
          <div className={style.content}>
            <Form form={form} layout='vertical' size='middle'>
              {renderLeftItem(leftItem())}
            </Form>
          </div>
        </div>
      </div>
      <div className='Drawer-Btn'>
        {isShowFactor() ? (
          <>
            <Button
              onClick={() => {
                history.go(-1);
              }}
            >
              返回
            </Button>
          </>
        ) : (
          <>
            {' '}
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
                  // 排放因子业务方 修改
                  if (
                    history.location.pathname.indexOf(
                      'emission-factor/business/edit',
                    ) >= 0
                  ) {
                    await apiBusinessEdit({
                      ...value,
                      id: history.location.search.split('?')[1],
                    }).then(({ data }) => {
                      VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
                      if (data.code === 200) {
                        history.go(-1);
                      }
                    });
                    return;
                  }
                  // 排放因子业务方 新增
                  if (
                    history.location.pathname.indexOf(
                      'emission-factor/business/add',
                    ) >= 0
                  ) {
                    await apiBusinessAdd({ ...value }).then(({ data }) => {
                      VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
                      if (data.code === 200) {
                        history.go(-1);
                      }
                    });
                  }
                  // 新增产品配置
                  if (
                    history.location.pathname.indexOf(
                      'emission-factor/orgConfig/product-list/add',
                    ) >= 0
                  ) {
                    await apiProAdd({
                      ...value,
                      companyId: history.location.search.split('?')[1],
                    }).then(({ data }) => {
                      VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
                      if (data.code === 200) {
                        history.go(-1);
                      }
                    });
                  }
                  if (
                    history.location.pathname.indexOf(
                      'emission-factor/orgConfig/product-list/edit',
                    ) >= 0
                  ) {
                    await apiProEdit({
                      ...value,
                      id: history.location.search.split('?')[1],
                    }).then(({ data }) => {
                      VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
                      if (data.code === 200) {
                        history.go(-1);
                      }
                    });
                  }
                  // apiProEdit
                });
              }}
            >
              提交
            </Button>
          </>
        )}
        <EmissionModel
          visible={modelVisBle}
          selectKeys={currentLableIds}
          onCancel={() => modelCancelFn()}
          onConfime={(value: React.Key[]) => modelConfirmeFn(value)}
        />
      </div>
    </>
  );
};

export default Orgstaff;
