import { Rule } from 'antd/lib/form';

export type SearchParams = {
  businessName?: string;
  businessLabel?: string;
  status?: string;
  is_forbid?: boolean;
  dict_data_name?: string;
  dict_data_value?: string;
  dictValue?: string;
  dictLabel?: string;
  name?: string;
  factorType?: string;
  auditStatus?: string;
  institution?: string;
  source?: string;
};

export const dictParams: {
  name: keyof SearchParams;
  label: string;
  required?: boolean;
  rules?: Rule[];
}[] = [
  {
    name: 'dict_data_name',
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
];
export const dictListParams: {
  name: keyof SearchParams;
  label: string;
  required?: boolean;
  rules?: Rule[];
}[] = [
  {
    name: 'dict_data_name',
    label: '分类名称',
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
    name: 'dict_data_value',
    label: '分类标识',
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
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: '标识符只能为大小写字母、数字和下划线',
      },
    ],
  },
  {
    name: 'dict_data_value',
    label: '排序',
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
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: '标识符只能为大小写字母、数字和下划线',
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
