import { Rule } from 'antd/lib/form';

export type SearchParams = {
  dictName?: string;
  dict_data_value?: string;
  apply_product?: string;
  is_forbid?: boolean;
};

export const dictParams: {
  name: keyof SearchParams;
  label: string;
  required?: boolean;
  rules?: Rule[];
}[] = [
  {
    name: 'dictName',
    label: '字典名称',
    rules: [
      {
        required: true,
        message: '请输入字典名称',
      },
      {
        type: 'string',
        max: 50,
        message: '字典名称不能超过50个字符',
      },
    ],
  },
  {
    name: 'dict_data_value',
    label: '字典标识',
    rules: [
      {
        required: true,
        message: '请输入字典标识',
      },
      {
        type: 'string',
        max: 50,
        message: '字典标识不能超过50个字符',
      },
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: '标识符只能为大小写字母、数字和下划线',
      },
    ],
  },
  {
    name: 'apply_product',
    label: '适用产品',
    rules: [
      {
        required: true,
        message: '请输入适用产品',
      },
      {
        type: 'string',
        max: 50,
        message: '适用产品不能超过50个字符',
      },
    ],
  },
];

export type DatasItemSearchParams = {
  dict_item_name?: string;
  dict_item_value?: string;
  relevance_value?: string;
  is_forbid?: boolean;
  weights?: string;
};
