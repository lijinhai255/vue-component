/**
 * @file 搜索组件
 */
import { memo, ReactElement, useEffect } from 'react';
import {
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  FormInstance,
  Col,
} from 'antd';
import { ButtonType } from 'antd/es/button/button';
import { Rule } from 'antd/lib/form';
import classNames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
import style from './searchform.module.scss';

const { RangePicker } = DatePicker;
export interface SearchFormAction {
  name: string;
  type?: ButtonType;
}

export interface SearchFormItem {
  /**
   * formItems name
   */
  name: string;
  /**
   * formItems label
   */
  label?: string;
  /**
   * 渲染到具体表单上的类名
   */
  className?: string;
  class?: string;
  placeholder?: string;
  rules?: Rule[];
  render?: ReactElement;
  maxLength?: number;
  showSearch?: boolean;
  type?:
    | 'input'
    | 'Input'
    | 'select'
    | 'Select'
    | 'selectTimck'
    | 'SelectLists';
  /**
   * select 框的参数
   */
  searchOptionData?: {
    label?: string;
    value?: string | number;
    dictLabel?: string;
    dictValue?: string;
    code?: string;
    name?: string;
  }[];
  selecData?: string;
  onChange?: (v: any) => void;
}

export interface SearchFormProps<T = any> {
  formList: SearchFormItem[];
  getForm?: () => (f: FormInstance<T>) => void;
  onSearch: (values: T) => void;
  actions?: SearchFormAction[];
  onClick?: (index: number) => void;
  showLabel?: boolean;
  searchOptionData?: {
    label?: string;
    value?: string | number;
    dictLabel?: string;
    dictValue?: string;
    code?: string;
    name?: string;
  }[];
  ref?: any;
  visible?: boolean;
  className?: string;
}

function SearchForm({ getForm, ...props }: SearchFormProps) {
  const { className } = props;
  const [form] = Form.useForm();
  getForm?.()(form);
  const reset = () => {
    form.resetFields();
    props.onSearch({});
  };
  useEffect(() => {
    reset();
  }, [props.visible]);
  // 设置默认值
  const setDefauleValue = () => {
    form.setFieldsValue({
      ...form.getFieldsValue(true),
      auditStatus: '0',
    });
  };
  useEffect(() => {
    if (window.location.pathname === '/emission-factor/examine') {
      setDefauleValue();
    }
  }, []);

  const onSearch = async () => {
    await form.validateFields().then(res => {
      props.onSearch(res);
    });
  };
  const renderFromDom = (item: SearchFormItem) => {
    if (item.render) {
      return item.render;
    }
    if (item.type?.toLowerCase() === 'select') {
      return (
        <Select
          className={item?.className}
          placeholder={item.placeholder ?? '请选择'}
          onChange={item?.onChange}
          aria-label={item.name}
          dropdownClassName={`search-form-select-${item.name}`}
          style={{ width: '100%' }}
          // @ts-ignore
          options={
            props?.searchOptionData
              ? props?.searchOptionData.map(it => ({ label: it, value: it }))
              : item?.searchOptionData?.map(it => ({
                  value: it?.value || it?.dictValue || it.dictLabel,
                  label: it?.label || it.dictLabel,
                }))
          }
        />
      );
    }
    if (item?.type === 'SelectLists') {
      return (
        <Select
          placeholder={item.placeholder}
          style={{ width: '100%' }}
          // @ts-ignore
          options={
            props?.searchOptionData
              ? props?.searchOptionData.map(it => ({ label: it, value: it }))
              : item?.searchOptionData?.map(it => ({
                  value: it?.value || it?.dictValue || it.dictLabel,
                  label: it?.label || it.dictLabel,
                }))
          }
        />
      );
    }
    if (item.type === 'selectTimck') {
      return (
        // @ts-ignore
        <RangePicker
          format='YYYY-MM-DD'
          aria-label={item.name}
          className={item?.className}
          onChange={item.onChange}
        />
      );
    }
    return (
      <Input
        maxLength={item?.maxLength}
        className={item?.className}
        aria-label={item.name}
        placeholder={item.placeholder || '请输入'}
        onChange={item?.onChange}
      />
    );
  };
  return (
    <Form
      className={classNames('layout__search', style.formWrapper, className)}
      form={form}
      layout='inline'
      onFinish={onSearch}
    >
      {props.formList.map((item: SearchFormItem) => (
        <Col
          xxl={5}
          md={8}
          xl={8}
          key={`${item.name}Search`}
          style={{
            paddingRight: '0',
          }}
        >
          <Form.Item
            label={props.showLabel !== false && item.label ? item.label : ''}
            key={item.name}
            name={item.name}
            rules={item.rules}
          >
            {renderFromDom(item)}
          </Form.Item>
        </Col>
      ))}
      <div className={style.buttonGroup}>
        <Form.Item>
          <Button
            aria-label='search-form-search'
            htmlType='submit'
            type='default'
          >
            <SearchOutlined />
            查询
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            aria-label='search-form-reset'
            htmlType='reset'
            onClick={reset}
          >
            重置
          </Button>
        </Form.Item>
      </div>
      {props.actions?.map((action: SearchFormAction, index: number) => (
        <Form.Item key={action.name}>
          <Button
            aria-label={action.name}
            type={action.type}
            onClick={() => props?.onClick?.(index)}
          >
            {action.name}
          </Button>
        </Form.Item>
      ))}
    </Form>
  );
}

export default memo(SearchForm);
