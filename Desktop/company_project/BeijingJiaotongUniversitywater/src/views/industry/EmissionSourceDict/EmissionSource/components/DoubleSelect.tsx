/**
 * @file 联动选择器
 */

import { Form } from 'antd';
import { Rule } from 'antd/lib/form';
import {
  Selector,
  Props as SelectorProps,
  filterOption,
} from '@components/Selector';
import { NamePath } from 'antd/es/form/interface';
import style from './formItems.module.scss';

export type Props = {
  label: string;
  rules?: Rule[];
  rules2?: Rule[];
  name: NamePath;
  name2?: NamePath;
  props: [SelectorProps, SelectorProps];
};
export const DoubleSelect = ({
  label,
  rules,
  rules2,
  name,
  name2,
  props,
}: Props) => {
  const props2 = { ...props[1], className: style.secondSelect };
  return (
    <div className={style.selectAndMsgBox}>
      <Form.Item label={label} name={name} rules={rules}>
        <Selector {...props[0]} filterOption={filterOption} />
      </Form.Item>
      <div className={style.factorBox}>
        <Form.Item hidden name={name2} rules={rules2} />
        <Selector {...props2} filterOption={filterOption} />
      </div>
    </div>
  );
};
