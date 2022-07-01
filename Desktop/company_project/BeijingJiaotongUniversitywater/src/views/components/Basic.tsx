import { FC } from 'react';
import {
  InputProps,
  Input,
  InputNumber,
  InputNumberProps,
  DatePicker,
  DatePickerProps,
  Radio,
  RadioProps,
  RadioGroupProps,
  SelectProps,
  Select,
  Cascader,
  CascaderProps,
  Checkbox,
  CheckboxProps,
  Upload,
  UploadProps,
  Table,
  TabPaneProps,
} from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { TextAreaProps } from 'antd/lib/input';

const { TextArea } = Input;
/**
 * ComstomInput
 * 输入框 文本输入框
 * **/
export const ComstomInput: FC<InputProps> = ({ ...props }) => {
  return <Input {...props} />;
};

/**
 * ComstomInputNumber
 * 输入框 数字输入框
 * ***/
export const ComstomInputNumber: FC<InputNumberProps> = ({ ...props }) => {
  return <InputNumber stringMode {...props} />;
};

/**
 * ComstomDatePicker
 * 日期组件
 * **/
export const ComstomDatePicker: FC<DatePickerProps> = ({ ...props }) => {
  //@ts-ignore
  return <DatePicker style={{ width: '100%' }} {...props} />;
};
/**
 * ComstomRadio
 * RadioGroup 组件
 * **/
export const ComstomRadio: FC<RadioProps> = ({ ...props }) => {
  return <Radio {...props} />;
};
/**
 * ComstomRadio
 * RadioGroup 组件
 * **/
export const ComstomRadioGroup: FC<RadioGroupProps> = ({ ...props }) => {
  return <Radio.Group {...props} />;
};
/**
 * ComstomSelect
 * Select 组件
 * **/
export const ComstomSelect: FC<SelectProps> = ({ ...props }) => {
  return <Select {...props} />;
};
/**
 * ComstomCascader
 * Cascader组件
 * **/
export const ComstomCascader: FC<
  CascaderProps<{ dictValue: string; dictLabel: string }>
> = ({ ...props }) => {
  return <Cascader {...props} />;
};
/***
 * ComstomCheckbox：
 * Checkbox： 组件
 * **/
export const ComstomCheckbox: FC<CheckboxProps> = ({ ...props }) => {
  return <Checkbox {...props} />;
};
/***
 * ComstomCheckboxGroup：
 * CheckboxGroup： 组件
 * **/
export const ComstomCheckboxGroup: FC<CheckboxGroupProps> = ({ ...props }) => {
  return <Checkbox.Group {...props} />;
};

/**
 * TextArea
 * **/
export const ComstomTextArea: FC<TextAreaProps> = ({ ...props }) => {
  return <TextArea {...props} />;
};

/**
 * 图片上传组件
 * **/
export const ComstomUploada: FC<UploadProps> = ({ ...props }) => {
  return <Upload {...props}>{props.children}</Upload>;
};
/**
 * 表格
 * **/
export const ComstomTable: FC<TabPaneProps> = ({ ...props }) => {
  return (
    <>
      <Table {...props} />
      {props.children}
    </>
  );
};
