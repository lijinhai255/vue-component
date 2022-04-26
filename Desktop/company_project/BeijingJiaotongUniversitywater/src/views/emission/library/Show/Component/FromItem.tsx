import { FC, ReactFragment, ReactElement } from 'react';
import { ItemType, UploadType } from '../type/index';
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Upload,
  Button,
  Radio,
  RadioChangeEvent,
  Select,
} from 'antd';
import style from '../../index.module.scss';
import { Moment } from 'moment';
import { getToken } from '@utils/cookie';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { apiSystemFileUrlFn } from '@/views/base/base-admin/utils/index';
interface ReturnFromItemType {
  item: ItemType;
  children?: ReactFragment;
  onChangeFn?: () => void;
  dataValue?: Moment;
  beforeUploadFn?: (file: File) => void;
  fileList?: UploadType[];
  fileChanganeFn?: (fileList: UploadChangeParam) => void;
  disabled?: boolean;
  onChangeRadioGroupFn?: (e: RadioChangeEvent) => void;
  onSelectChangeFn?: (e: string) => void;
  styleList?: React.CSSProperties;
}
const ReturnFromItem: FC<ReturnFromItemType> = ({
  item,
  children,
  onChangeFn,
  dataValue,
  beforeUploadFn,
  fileList,
  fileChanganeFn,
  disabled,
  onChangeRadioGroupFn,
  onSelectChangeFn,
  styleList,
}) => {
  const returnChildren = () => {
    if (item.type == 'input') {
      return (
        <Input
          disabled={item.disabled}
          placeholder={item.placeholder}
          maxLength={item.maxLength}
          addonAfter={item.addonAfter ? item.addonAfter : ''}
          onChange={onChangeFn}
        />
      );
    }
    if (item.type === 'InputNumber') {
      return (
        <InputNumber
          stringMode
          disabled={item.disabled}
          placeholder={item.placeholder}
          maxLength={item.maxLength}
          style={{ width: '100%' }}
          min={item.min}
          max={item.max}
          // precision={item.precision}
          step={item.step}
          addonAfter={item.addonAfter ? item.addonAfter : ''}
          onChange={onChangeFn}
        />
      );
    }
    if (item.type === 'year') {
      return (
        <DatePicker
          style={{ width: '100%' }}
          disabled={item.disabled}
          value={dataValue}
        />
      );
    }
    if (item.type === 'upload') {
      return (
        <>
          <Upload
            maxCount={item.maxCount ? item.maxCount : 5}
            // disabled={culDisAbled()}
            fileList={fileList}
            action={`${
              process?.env?.REACT_APP_API_URL
                ? process.env.REACT_APP_API_URL
                : ''
            }/file/system/file/uploadImg`}
            headers={{
              Authorization: getToken(),
            }}
            beforeUpload={beforeUploadFn}
            onChange={fileChanganeFn}
            disabled={item.disabled}
            showUploadList={{
              showDownloadIcon: true,
              downloadIcon: <DownloadOutlined />,
              showRemoveIcon: true,
            }}
            onDownload={async (file: {
              objKey?: string;
              name: string;
              fileName?: string;
            }) => {
              console.log(file, 'file=file');
              await apiSystemFileUrlFn({ ...file });
            }}
            itemRender={(
              originNode: ReactElement,
              file: UploadFile,
              fileList: object[],
            ) => {
              console.log(file, fileList, originNode);
              return originNode;
            }}
          >
            <Button icon={<UploadOutlined />}>上传附件</Button>
          </Upload>
        </>
      );
    }
    if (item.type === 'RadioGroup') {
      return (
        <Radio.Group disabled={disabled} onChange={onChangeRadioGroupFn}>
          {item.select_list?.map(it => {
            return <Radio value={it.dictValue}>{it.dictLabel}</Radio>;
          })}
        </Radio.Group>
      );
    }
    if (item.type === 'select') {
      return (
        <Select
          disabled={item.disabled}
          placeholder={item.placeholder}
          onChange={onSelectChangeFn}
        >
          {item?.select_list &&
            item.select_list?.map(tem => {
              return (
                <Select.Option value={String(tem.dictValue)}>
                  {tem.dictLabel}
                </Select.Option>
              );
            })}
        </Select>
      );
    }
    if (item.type === 'InputNumberButton') {
      return (
        <Button
          disabled={item.disabled}
          placeholder={item.placeholder}
          style={{ width: '50%' }}
          onClick={onChangeFn}
        >
          立即填写
        </Button>
      );
    }
    if (item.type === 'TextArea') {
      return <Input.TextArea placeholder='请填写'></Input.TextArea>;
    }
    if (item.type === 'empty') {
      <Button
        disabled={item.disabled}
        placeholder={item.placeholder}
        style={{ width: '50%', opacity: '0' }}
        onClick={onChangeFn}
      >
        {/* 立即填写 */}
      </Button>;
    }
    return children;
  };
  return (
    <Form.Item
      colon={false}
      name={item.title}
      label={item.name}
      labelAlign='right'
      rules={item.require}
      className={item.class ? style[item.class] : ''}
      tooltip={item.tooltip}
      style={{
        ...styleList,
      }}
    >
      {returnChildren()}
    </Form.Item>
  );
};
export default ReturnFromItem;
