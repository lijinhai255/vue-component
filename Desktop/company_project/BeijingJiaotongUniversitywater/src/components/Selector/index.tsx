/**
 * @file 所属行业、碳盘查负责部门、组织边界确定方式 下拉选择器
 * 目前仅考虑单选下的适配
 */

import { Divider, Input, Select, Spin } from 'antd';
import { ChangeEvent, memo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { SelectProps, SelectValue } from 'antd/lib/select';

import styles from './index.module.scss';
import { combineClassName } from '@/utils';
import { IconFont } from '../IconFont';

export type Options = {
  label: string;
  value: string | number;
  user?: number;
  [key: string]: any;
}[];
export const filterOption: SelectProps<Options>['filterOption'] = (
  input,
  options,
) =>
  // eslint-disable-next-line
  options?.props?.children.some((t: string) => {
    return typeof t === 'string' && !!t?.toLowerCase()?.includes(input);
  });
export type Props<T = Options> = {
  placeholder?: string;
  onChange?: (value: SelectValue) => void;
  onAddItem?: (value: string) => Promise<any>;
  onDelItem?: (id: number, label: string) => Promise<any>;
  options?: T;
  style?: React.CSSProperties;
  defaultValue?: string | number;
  value?: string | number;
  filterOption?: SelectProps<T>['filterOption'];
  disabled?: boolean;
  className?: string;
};

export const isOptionsType = (
  list?: any[],
): list is Required<Props>['options'] => {
  if (!list) return true;
  if (list.length && list[0]?.value && list[0]?.label) return true;
  return false;
};
export const checkList = (list?: any[]): Props['options'] => {
  return isOptionsType(list) ? list : undefined;
};

export const Selector = memo(
  ({
    placeholder,
    onChange,
    onAddItem,
    options,
    style,
    onDelItem,
    defaultValue,
    value,
    disabled,
    className,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    filterOption,
  }: Props) => {
    const [inputItem, setInputItem] = useState('');
    const [loading, setLoading] = useState(false);
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputItem(event.target.value);
    };

    const onValueChange = (val?: string | number) => {
      onChange?.(val);
    };

    return (
      <Select
        className={combineClassName(styles.selectWrapper, className)}
        defaultValue={defaultValue}
        style={style}
        value={value}
        showSearch={!!filterOption}
        filterOption={filterOption}
        disabled={disabled}
        placeholder={placeholder || '下拉选择，也可自行添加'}
        listItemHeight={10}
        listHeight={160}
        // eslint-disable-next-line react/no-unstable-nested-components
        dropdownRender={menus => (
          <div>
            <Spin spinning={loading}>
              {menus}
              {!!onAddItem && (
                <>
                  <Divider style={{ margin: '4px 0' }} />
                  <div className={styles.addItemWrapper}>
                    <Input
                      value={inputItem}
                      style={{ flex: 'auto', height: 34 }}
                      onChange={onNameChange}
                    />
                    <span
                      className={styles.addButton}
                      onClick={() => {
                        if (inputItem.trim() && onAddItem) {
                          setLoading(true);
                          onAddItem(inputItem)
                            ?.then(() => {
                              setInputItem('');
                            })
                            .finally(() => setLoading(false));
                        }
                      }}
                    >
                      <PlusOutlined /> 添加
                    </span>
                  </div>
                </>
              )}
            </Spin>
          </div>
        )}
        onChange={onValueChange}
      >
        {options?.map(({ label, value: val, user }) => (
          <Select.Option value={val} key={val} className={styles.select}>
            {label}
            {user && onDelItem && (
              <IconFont
                className={styles.closeIcon}
                onClick={ev => {
                  ev.stopPropagation();
                  if (value === +val || value === label) {
                    onValueChange(undefined);
                  }
                  if (onDelItem) {
                    setLoading(true);
                    onDelItem(+val, label).finally(() => {
                      setLoading(false);
                    });
                  }
                }}
                type='icon-icon-guanbi-1'
                style={{ color: '#666' }}
              />
            )}
          </Select.Option>
        ))}
      </Select>
    );
  },
);
