/**
 * @file checkbox group
 */

import { Checkbox, Form } from 'antd';
import { CheckboxChangeEvent, CheckboxOptionType } from 'antd/lib/checkbox';
import { useEffect, useState } from 'react';
import { BaseProps } from './Selector';

type ValueType = string[] | number[];
export type Options = (string | CheckboxOptionType)[];
export type Props = {
  onChange: (arr: ValueType) => void;
  value?: ValueType;
  options?: Options;
  disabled?: boolean;
} & BaseProps;
export const RenderCheckboxGroup = ({
  label,
  name,
  disabled,
  onChange,
  rules,
  value,
  options,
}: Props) => {
  const [checked, setChecked] = useState<ValueType>([]);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const isValueType = (options?: Options): options is string[] =>
    typeof options?.[0] === 'string';

  const [indeterminate, setIndeterminate] = useState(false);
  const onCheckAllChange = (ev: CheckboxChangeEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { checked } = ev.target;
    if (checked) {
      setIndeterminate(false);
      if (isValueType(options)) setChecked(options);
      else {
        setChecked(
          (options as unknown as { value: string }[]).map(it => it.value),
        );
      }
    } else {
      setIndeterminate(false);
      setChecked([]);
    }
  };
  const changeCheckbox = (arr: ValueType) => {
    if (!options?.length) return;
    const len = arr.length;
    if (len) {
      const isAll = len === options.length;
      setIndeterminate(!isAll);
    } else {
      setIndeterminate(false);
    }
    setChecked(arr);
  };
  useEffect(() => {
    onChange(checked);
  }, [checked]);
  const isCheckAll = (value || checked).length === options?.length;
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <div className='checkbox_style'>
        <Checkbox
          indeterminate={isCheckAll ? false : indeterminate}
          onChange={onCheckAllChange}
          checked={isCheckAll}
          disabled={disabled}
        >
          全部
        </Checkbox>
        <Checkbox.Group
          options={options}
          disabled={disabled}
          value={value || checked}
          onChange={val => changeCheckbox(val as ValueType)}
        />
      </div>
    </Form.Item>
  );
};
