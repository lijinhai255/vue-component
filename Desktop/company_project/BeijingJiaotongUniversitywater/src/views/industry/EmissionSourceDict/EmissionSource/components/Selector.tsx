/**
 * @file
 */
import { Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { Rule } from 'antd/lib/form';
import {
  Selector,
  Props as SelectorProps,
  filterOption,
} from '@components/Selector';

export type BaseProps = {
  label: string;
  rules?: Rule[];
  name: NamePath;
};
export type Props = BaseProps & SelectorProps;

export const RenderSelect = ({ label, rules, name, ...props }: Props) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Selector {...props} filterOption={filterOption} />
    </Form.Item>
  );
};
