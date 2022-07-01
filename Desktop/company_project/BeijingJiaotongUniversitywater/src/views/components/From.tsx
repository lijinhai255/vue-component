import { FC, CSSProperties, ReactNode } from 'react';
import {
  Form,
  FormInstance,
  FormItemProps,
  InputProps,
  InputNumberProps,
  SelectProps,
  RadioGroupProps,
  CheckboxProps,
  DatePickerProps,
  UploadProps,
  TableProps,
} from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import {
  ComstomInput,
  ComstomInputNumber,
  ComstomRadioGroup,
  ComstomSelect,
  ComstomDatePicker,
  ComstomCheckboxGroup,
  ComstomTextArea,
  ComstomUploada,
  ComstomTable,
} from './Basic';

export type ListArrType =
  | (FormItemProps & {
      baseType: 'Input';
      baseItem: InputProps;
    })
  | (FormItemProps & {
      baseType: 'InputNumber';
      baseItem: InputNumberProps;
    })
  | (FormItemProps & {
      baseType: 'Select';
      baseItem: SelectProps;
    })
  | (FormItemProps & {
      baseType: 'RadioGroup';
      baseItem: RadioGroupProps;
    })
  | (FormItemProps & {
      baseType: 'CheckBox';
      baseItem: CheckboxProps;
    })
  | (FormItemProps & {
      baseType: 'DatePicker';
      baseItem: DatePickerProps;
    })
  | (FormItemProps & {
      baseType: 'ComstomCheckboxGroup';
      baseItem: CheckboxGroupProps;
    })
  | (FormItemProps & {
      baseType: 'TextArea';
      baseItem: TextAreaProps;
    })
  | (FormItemProps & {
      baseType: 'Upload';
      baseItem: UploadProps & { children?: ReactNode };
    })
  | (FormItemProps & {
      baseType: 'Table';
      baseItem: TableProps<any> & { children?: ReactNode };
    })
  | (FormItemProps & {
      baseType: '';
      baseItem: any;
    });

interface ComstomFromProps {
  form: FormInstance;
  layout?: 'vertical' | 'horizontal' | 'inline' | undefined;
  style?: CSSProperties;
  fromClassName?: string;
  changeDataValue?: (value: { [x: string]: any }) => void;
  dataValue?: { [x: string]: any };
  tableData?: { [x: string]: any };
  listArr: ListArrType[];
}
/**
 * ComstomFrom
 * 集合成需要的表单
 * @params form：formInstance
 * @params layout 布局方向
 * @params style 表单控制的样式
 * @
 * ***/
const ComstomFrom: FC<ComstomFromProps> = ({
  form,
  layout = 'vertical',
  style,
  fromClassName,
  listArr,
  children,
}) => {
  const returnBase = (item: ListArrType) => {
    if (item.baseType === 'Input') {
      const { baseItem } = item;
      return <ComstomInput {...baseItem} />;
    }
    if (item.baseType === 'InputNumber') {
      const { baseItem } = item;
      return <ComstomInputNumber {...baseItem} />;
    }
    if (item.baseType === 'Select') {
      const { baseItem } = item;
      return <ComstomSelect {...baseItem} />;
    }
    if (item.baseType === 'RadioGroup') {
      const { baseItem } = item;
      return <ComstomRadioGroup {...baseItem} />;
    }
    if (item.baseType === 'ComstomCheckboxGroup') {
      const { baseItem } = item;
      return <ComstomCheckboxGroup {...baseItem} />;
    }
    if (item.baseType === 'DatePicker') {
      const { baseItem } = item;
      return <ComstomDatePicker {...baseItem} />;
    }
    if (item.baseType === 'TextArea') {
      const { baseItem } = item;
      return <ComstomTextArea {...baseItem} />;
    }
    if (item.baseType === 'Upload') {
      const { baseItem } = item;
      return <ComstomUploada {...baseItem} />;
    }
    if (item.baseType === 'Table') {
      const { baseItem, children } = item;
      return (
        <>
          <ComstomTable {...baseItem} />
          {children}
        </>
      );
    }
    // 占位标识
    if (item.baseType === '') {
      return null;
    }
    return '你真皮！！！！！！';
  };
  const returnFromList = (item: ListArrType, index: number) => {
    return (
      <Form.Item key={index} {...item}>
        {returnBase(item)}
      </Form.Item>
    );
  };
  const returnListArr = () => {
    return (
      listArr &&
      listArr.map((item, index) => {
        return returnFromList(item, index);
      })
    );
  };
  return (
    <Form className={fromClassName} form={form} layout={layout} style={style}>
      {returnListArr()}
      {children}
    </Form>
  );
};

export default ComstomFrom;
