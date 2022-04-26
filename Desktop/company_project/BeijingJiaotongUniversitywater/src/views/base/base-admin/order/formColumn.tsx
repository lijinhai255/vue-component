import { Rule } from 'antd/lib/form';
import { ColumnType } from 'antd/es/table';
import { Dictionary } from 'lodash';
import { Button, Space, Radio, Input } from 'antd';

export interface AddEidtType {
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  rules: Rule[];
  offset?: number;
  label: string;
  option?: { value: number; label: string }[];
}
export const addEditForm: AddEidtType[] = [
  {
    label: '是否测试订单',
    type: 'Select',
    name: 'testFlag',
    placeholder: '',
    disabled: false,
    offset: 0,
    option: [
      { value: 0, label: '正常' },
      { value: 1, label: '测试' },
    ],
    rules: [{ required: true, message: '请选择' }],
  },
  {
    label: '商品总价：',
    type: 'disAbleInput',
    name: 'totalMoney',
    placeholder: '',
    disabled: true,
    rules: [],
  },
  {
    label: '应收金额',
    offset: 0,
    type: 'disAbleInput',
    name: 'recieveMoney',
    placeholder: '',
    disabled: false,
    rules: [],
  },
  {
    label: '实收金额',
    type: 'disAbleInput',
    name: 'realMoney',
    placeholder: '',
    disabled: false,
    rules: [],
  },
  {
    label: '优惠金额',
    type: 'disAbleInput',
    name: 'cutMoney',
    placeholder: '',
    disabled: false,
    rules: [],
  },
  {
    label: '组织名称:',
    offset: 0,
    type: 'Button',
    name: 'companyName',
    placeholder: '',
    disabled: false,
    rules: [],
  },
  {
    label: '组织编码',
    type: 'disAbleInput',
    name: 'companyNum',
    placeholder: '',
    disabled: false,
    rules: [],
  },
  // {
  //   label: '组织ID',
  //   type: 'disAbleInput',
  //   name: 'companyId',
  //   placeholder: '',
  //   disabled: false,
  //   rules: [],
  // },
  {
    label: '支付时间',
    type: 'DatePicker',
    name: 'payTime',
    placeholder: '',
    disabled: false,
    rules: [{ required: true, message: '请选择支付时间' }],
  },
  {
    label: '订单备注',
    type: 'TextArea',
    name: 'remark',
    placeholder: '',
    disabled: false,
    rules: [],
  },
];

// 产品列表
type ProductColumnProps<T> = {
  onDelete?: (record: T) => void;
};

export const useProductColumn = <T extends Dictionary<any>>({
  onDelete,
}: ProductColumnProps<T>): ColumnType<T>[] => {
  return [
    {
      dataIndex: 'index',
      title: '序号',
      render: (t: string, record: T, index) => index + 1,
    },
    {
      dataIndex: 's',
      title: '产品名称',
    },
    {
      dataIndex: 's',
      title: '产品ID',
    },
    {
      dataIndex: 's',
      title: '产品简介',
    },
    {
      dataIndex: 's',
      title: '操作',
      render: (t: string, record: T) => {
        return (
          <Space>
            <Button type='link' onClick={() => onDelete?.(record)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
};

// 商品定价

type GoodsProps<T> = {
  onDelete?: (record: T) => void;
  onAdd?: (record: T) => void;
};

export const gooodsColumn = <T extends Dictionary<any>>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDelete,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAdd,
}: GoodsProps<T>): ColumnType<T>[] => {
  return [
    {
      dataIndex: 'index',
      title: '有效期',
      render: () => {
        return (
          <div>
            <Radio.Group>
              <Radio value={1}>按天</Radio>
              <Radio value={2}>按月</Radio>
              <Radio value={3}>按年</Radio>
            </Radio.Group>
            <Input />
          </div>
        );
      },
    },
    {
      dataIndex: 's',
      title: '现价',
    },
    {
      dataIndex: 's',
      title: '标准价',
    },
  ];
};
