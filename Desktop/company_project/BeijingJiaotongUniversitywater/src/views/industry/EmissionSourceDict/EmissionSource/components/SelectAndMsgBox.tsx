/**
 * @file 选项 带 自动value 展示
 */

import { Form } from 'antd';
import { Selector, Props as SelectorProps } from '@components/Selector';
import { NamePath } from 'antd/es/form/interface';
import { Rule } from 'antd/lib/form';
import { BaseProps } from './Selector';
import style from './formItems.module.scss';

export type Props = {
  secondValue?: string | number;
  secondPlaceholder?: string;
  name2?: NamePath;
  editAble?: boolean;
  rules2?: Rule[];
  onSecondValueChange?: (val: number) => void;
} & SelectorProps &
  BaseProps;

export const SelectAndMsgBox = ({
  label,
  rules,
  rules2,
  name,
  name2,
  secondValue,
  editAble,
  secondPlaceholder,
  onSecondValueChange,
  ...props
}: Props) => {
  return (
    <div className={style.selectAndMsgBox}>
      <Form.Item label={label} name={name} rules={rules}>
        <Selector {...props} />
      </Form.Item>
      <div className={style.factorBox}>
        <Form.Item hidden name={name2} rules={rules2} />

        <input
          type='number'
          value={secondValue}
          placeholder={secondPlaceholder ?? '默认出现'}
          className={style.value}
          onChange={ev => onSecondValueChange?.(+ev.target.value)}
          disabled={!editAble}
        />
      </div>
    </div>
  );
};
