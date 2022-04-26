import { Rule } from 'antd/lib/form';
import { ColumnType } from 'antd/es/table';
import { Dictionary } from 'lodash';
import { Radio, InputNumber } from 'antd';

export interface AddEidtType {
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  rules: Rule[];
  offset?: number;
  label: string;
  max?: number;
}
export const addEditForm: AddEidtType[] = [
  {
    label: '商品名称：',
    type: 'Input',
    name: 'goodsName',
    placeholder: '',
    disabled: false,
    offset: 0,
    max: 100,
    rules: [
      { required: true },
      {
        type: 'string',
        max: 100,
        message: '商品名称不能超过100个字符',
      },
    ],
  },
  {
    label: '商品编码：',
    type: 'Input',
    name: 'goodsId',
    max: 50,
    offset: 4,
    placeholder: '',
    disabled: true,
    rules: [
      { required: true },
      {
        type: 'string',
        max: 50,
        message: '商品编码不能超过50个字符',
      },
    ],
  },
  {
    label: '商品属性：',
    offset: 0,
    type: 'Select',
    name: 'goodsAttribute',
    placeholder: '',
    disabled: false,
    rules: [
      { required: true },
      {
        type: 'string',
        max: 100,
        message: '商品名称不能超过100个字符',
      },
    ],
  },
  {
    label: '商品类型：',
    offset: 4,
    type: 'Select',
    name: 'type',
    placeholder: '',
    disabled: false,
    rules: [
      { required: true },
      {
        type: 'string',
        message: '请选择商品类型',
      },
    ],
  },
  {
    label: '商品简介：',
    offset: 0,
    type: 'TextArea',
    name: 'goodsInfo',
    placeholder: '',
    disabled: false,
    rules: [
      { required: true },
      {
        type: 'string',
        max: 200,
        message: '商品名称不能超过200个字符',
      },
    ],
  },
  {
    label: '商品标签:',
    offset: 0,
    type: 'Button',
    name: 'labels',
    placeholder: '',
    disabled: false,
    rules: [
      { required: false },
      {
        type: 'string',
        max: 20,
        message: '商品标签不能超过20个字符',
      },
    ],
  },
];

// 产品列表
type ProductColumnProps<T> = {
  onDelete?: (record: T) => void;
};

export const useProductColumn = <
  T extends Dictionary<any>,
>({}: ProductColumnProps<T>): ColumnType<T>[] => {
  return [
    {
      dataIndex: 'index',
      title: '序号',
      render: (t: string, record: T, index) => index + 1,
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
      dataIndex: 'productInfo',
      title: '产品简介',
    },
  ];
};

// 商品定价

type GoodsProps<T> = {
  onDelete?: (record: T) => void;
  onAdd?: (record: T) => void;
  onChanges?: (e: any, type: string, index: number) => void;
};
export const useGooodsColumn = <T extends Dictionary<any>>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDelete,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAdd,
  onChanges,
}: GoodsProps<T>): ColumnType<T>[] => {
  return [
    {
      dataIndex: 'priceType',
      title: '有效期',
      render: (t: string, record: T, index) => {
        return (
          <div>
            <Radio.Group
              value={record.priceType}
              onChange={e => onChanges?.(e.target.value, 'priceType', index)}
            >
              <Radio value='天'>按天</Radio>
              <Radio value='月'>按月</Radio>
              <Radio value='年'>按年</Radio>
            </Radio.Group>
            <InputNumber
              style={{ width: '200px' }}
              formatter={value => Number(value).toFixed(0)}
              onChange={e => onChanges?.(e, 'value', index)}
              value={record.value}
            />
            {record.priceType}
          </div>
        );
      },
    },
    {
      dataIndex: 'realPrice',
      title: '现价',
      render: (t: string, record: T, index) => {
        return (
          <div>
            <InputNumber
              min='0'
              style={{ width: '200px' }}
              step='0.01'
              formatter={value =>
                value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
              }
              onChange={e => onChanges?.(e, 'realPrice', index)}
              value={record.realPrice}
            />
            元
          </div>
        );
      },
    },
    {
      dataIndex: 'standPrice',
      title: '标准价',
      render: (t: string, record: T, index) => {
        return (
          <div>
            <InputNumber
              min='0'
              formatter={value =>
                value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
              }
              step='0.01'
              style={{ width: '200px' }}
              onChange={e => onChanges?.(e, 'standPrice', index)}
              value={record.standPrice}
            />
            元
          </div>
        );
      },
    },
  ];
};
