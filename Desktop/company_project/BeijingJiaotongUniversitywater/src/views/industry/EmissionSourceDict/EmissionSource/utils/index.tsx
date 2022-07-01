/**
 * @file utils
 */
import { Dictionary } from 'lodash';
import { useMemo } from 'react';
import { RenderCheckboxGroup } from '../components/CheckboxGroup';
import { DoubleSelect } from '../components/DoubleSelect';
import { RenderInput } from '../components/Input';
import { SelectAndMsgBox } from '../components/SelectAndMsgBox';
import { RenderSelect } from '../components/Selector';
import {
  Children,
  EmissionFormType,
  EmissionSources,
  EmissionsSubCategory,
  GasMap,
} from '../types';

export type Props = ({
  label: string;
} & Dictionary<any>)[];

// 由于后端要的选项中的文字，所以把label和value统一为文字
export const genLabelSelectOptions = (val?: Props) => {
  const res =
    val?.map(({ value, label, ...others }) => ({
      ...others,
      key: (value || label) as string,
      label,
      value: label,
    })) || [];

  return res;
};

export const uniqBy = <T extends Dictionary<any>>(
  arr: T[],
  key: keyof T,
): T[] => {
  const map: any = {};
  const newData: T[] = [];
  arr.forEach(item => {
    if (!map[item[key]]) {
      newData.push({ ...item });
      map[item[key]] = true;
    }
  });
  return newData;
};

export const getSelectOptionsValue = <
  T extends {
    value: string | number;
    label: string;
    [key: string]: string | number;
  },
  K extends keyof T,
>(
  str: string | number,
  options?: T[],
  target?: K,
): string | number => {
  const t = target ?? 'value';
  return options?.find(obj => obj?.label === str)?.[t] || '';
};

// 新建排放数据 组件渲染
export const renderChildren = (children: Children) => {
  switch (children.type) {
    case EmissionFormType.select:
      return <RenderSelect {...{ placeholder: '请选择', ...children.props }} />;
    case EmissionFormType.doubleSelect:
      return <DoubleSelect {...children.props} />;
    case EmissionFormType.input:
      return <RenderInput {...children.props} />;
    case EmissionFormType.checkboxGroup:
      return <RenderCheckboxGroup {...children.props} />;
    case EmissionFormType.selectAndMsgBox:
      return <SelectAndMsgBox {...children.props} />;
    default:
      return null;
  }
};
// 时间转换
export const transformTimestamp = (timestamp: any) => {
  const a = new Date(timestamp).getTime();
  const date = new Date(a);
  const Y = date.getFullYear();
  const M =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const dateString = `${Y}-${M}-${D} ${h}:${m}`;
  return dateString;
};

/**
 * 所有的气体
 * eg. {CO₂: greenhouse_gases_list[]}
 */
export const useGasMap = (source?: EmissionSources) =>
  useMemo(() => {
    // 气体类型：【】
    const gasMap: GasMap = {};
    source?.exhaust_gses_chios?.forEach(g => {
      gasMap[g[0]] = [];
    });
    if (!source?.greenhouse_gases_list?.length) return gasMap;
    source?.exhaust_gses_chios.forEach(([gas]) => {
      gasMap[gas] =
        source.greenhouse_gases_list.filter(
          ({ exhaust_gases }) => gas === exhaust_gases,
        ) || [];
    });
    return gasMap;
  }, [source]);

/**
 * 计算所有的分类 排放类别
 */
export const caculateCategorys = (subCategorys: EmissionsSubCategory[]) => {
  const categoryMap: {
    [key: string]: EmissionsSubCategory[];
  } = {};

  subCategorys.forEach(item => {
    if (!categoryMap[item.emissions_category]) {
      categoryMap[item.emissions_category] = [item];
    } else {
      categoryMap[item.emissions_category] = [
        ...categoryMap[item.emissions_category],
        item,
      ];
    }
  });
  return Object.keys(categoryMap).map(k => ({
    label: k,
    value: k,
    emissions_sub_category_list: categoryMap[k],
  }));
};
