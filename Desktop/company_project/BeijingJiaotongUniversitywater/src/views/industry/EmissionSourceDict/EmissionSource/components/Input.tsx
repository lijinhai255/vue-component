/**
 * @file input
 */

import { Form, Input, InputProps } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import { BaseProps } from './Selector';
import style from './formItems.module.scss';

export type Props = {
  placeholder?: string;
  type?: InputProps['type'];
  onChange: (val: string) => void;
  value?: string | number;
  disabled?: boolean;
  prop2?: {
    name: NamePath;
    label?: string;
    rules?: Rule[];
  };
} & BaseProps;
export const RenderInput = ({
  label,
  name,
  type,
  rules,
  value,
  placeholder,
  onChange,
  disabled,
  prop2,
}: Props) => {
  return (
    <>
      <Form.Item label={label} name={name} rules={rules}>
        <Input
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder ?? '请填写'}
          onChange={ev => onChange(ev.target.value)}
        />
      </Form.Item>
      {prop2 && (
        <Form.Item
          className={style.hiddenFormItem}
          label={prop2.label}
          name={prop2.name}
          rules={prop2?.rules}
        />
      )}
    </>
  );
};
