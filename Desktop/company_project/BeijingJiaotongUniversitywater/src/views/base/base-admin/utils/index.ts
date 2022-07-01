import { Rule } from 'antd/lib/form';
import { Moment } from 'moment';
import { message } from 'antd';
import { apiSystemFileUrl } from '../../service';

export type SearchParams = {
  userName?: string;
  companyName?: string; // 组织名称
  companyNum?: string;
  masterName?: string;
  status?: string;
  beginTime?: string | Moment | null; // 行业类别
  endTime?: string | Moment | null; // 行业类别; // 行业编号
  dict_data_name?: string;
  dict_data_value?: string;
  orderId?: string;
  auditState?: string; // 0待审核，1通过，2未通过；
  testFlag?: string; // 是否测试： 1是测试，0正常
  likeOrgName?: string;
  likeProjectName?: string;
  username?: string;
  nick_name?: string;
  key?: string | number;
  is_active?: string | number | boolean | undefined;
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
    ],
  },
];
export const unique = <T>(arr: T[]): T[] => {
  const arrMap = new Map();
  arr.forEach((element: T) => {
    if (!arrMap.has(element)) {
      arrMap.set(element, element);
    }
  });
  return Array.from(arrMap.keys());
};
export type DatasItemSearchParams = {
  dict_item_name?: string;
  dict_item_value?: string;
  relevance_value?: string;
  is_forbid?: boolean;
  weights?: string;
};

/**
 * 文件下载 方法集合
 */
export const apiSystemFileUrlFn = async (obj: {
  objKey?: string;
  name: string;
}) => {
  await apiSystemFileUrl({ ...obj }).then(({ data }) => {
    message.info('报告下载中,请稍候...', 3).then(() => {
      // window.open(data.data, '_blank');
      const downloadElement = document.createElement('a');
      downloadElement.style.display = 'none';
      downloadElement.href = data.data;
      downloadElement.download = obj.name; // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
    });
  });
};
