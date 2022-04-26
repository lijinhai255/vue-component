/* eslint-disable no-nested-ternary */
import { memo, ReactElement, useEffect } from 'react';
import { Button, Input, Form, Select, DatePicker } from 'antd';
import { ButtonType } from 'antd/es/button/button';
import './index.less';
import { IconFont } from '@/components/IconFont';
import style from './searchform.module.scss';
const { Option } = Select;
const { RangePicker } = DatePicker;
export interface SearchFormAction {
  name: string;
  type?: ButtonType;
}

export interface SearchFormItem {
  name: string;
  label: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  rules?: object[];
  render?: ReactElement;
  type?: string;
  class?: string;
  searchOptionData?: {
    label?: string;
    value?: string | number;
    dictLabel?: string;
    dictValue?: string;
  }[];
}

interface SearchFormProps {
  formList: SearchFormItem[];
  onSearch: (values: any) => void;
  returnNavText?: string;
  actions?: SearchFormAction[];
  onClick: (index: number) => void;
  showLabel?: boolean;
  searchOptionData?: string[];
  ref?: any;
  visible?: boolean;
  addurl?: () => void;
}

function SearchForm(props: SearchFormProps) {
  const [form] = Form.useForm();
  const reset = () => {
    console.log('reset=reset=reset');
    form.resetFields();
    props.onSearch({});
  };
  useEffect(() => {
    reset();
  }, [props.visible]);

  const onSearch = async () => {
    await form.validateFields().then(res => {
      props.onSearch(res);
    });
  };
  const renderFromDom = (item: SearchFormItem) => {
    if (item.render) {
      return item.render;
    }
    if (item.type === 'Select') {
      return (
        <Select
          placeholder='请选择'
          style={{ width: item.class || '140px', borderRadius: '4px' }}
        >
          {props?.searchOptionData
            ? props?.searchOptionData.map(it => (
                <Option value={Number(it)}>{it}</Option>
              ))
            : item?.searchOptionData &&
              item?.searchOptionData.map(it => (
                <Option
                  value={
                    it?.value ? it?.value : it?.dictValue ? it?.dictValue : 0
                  }
                >
                  {it?.label ? it.label : it.dictLabel}
                </Option>
              ))}
        </Select>
      );
    }
    if (item.type === 'SelectLists') {
      return (
        <Select
          placeholder={item.placeholder}
          style={{ width: item.class || '140px', borderRadius: '4px' }}
        >
          {props?.searchOptionData
            ? props?.searchOptionData.map((it: any) => (
                <Option value={Number(it.code)}>{it.name}</Option>
              ))
            : ''}
        </Select>
      );
    }
    if (item.type === 'selectTimck') {
      return (
        <RangePicker
          format='YYYY-MM-DD'
          style={{ width: item.class || '300px', borderRadius: '4px' }}
        />
      );
    }
    return (
      <Input
        placeholder={item.placeholder}
        style={{ width: item.class || '', borderRadius: '4px' }}
        className={style.searchipt}
      />
    );
  };
  return (
    <Form
      className={style.layout_search}
      form={form}
      layout='inline'
      onFinish={onSearch}
      style={{ flex: 1 }}
    >
      {props.formList.map((item: SearchFormItem) => (
        <Form.Item
          label={props.showLabel !== false && item.label ? item.label : ''}
          key={item.name}
          name={item.name}
          rules={item.rules}
          className={style.seachlist}
        >
          {renderFromDom(item)}
        </Form.Item>
      ))}

      <Form.Item className={style.seachlistbtn}>
        <Button htmlType='submit' type='primary' className={style.searchbtn}>
          <IconFont type='icon-icon-zhaxun' className={style.icon} />
          <span>查询</span>
        </Button>
      </Form.Item>

      <Form.Item style={{ marginBottom: '20px' }}>
        <Button htmlType='reset' onClick={reset} className={style.searchbtn}>
          重置
        </Button>
      </Form.Item>
      {props.actions?.map((action: SearchFormAction, index: number) => (
        <Form.Item key={action.name}>
          <Button type={action.type} onClick={() => props.onClick(index)}>
            {action.name}
          </Button>
        </Form.Item>
      ))}
    </Form>
  );
}

export default memo(SearchForm);
