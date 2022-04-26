import { Popconfirm, Popover } from 'antd';
import Permission from '@/utils/permission';
// import Permission from 'components/Permission';
import './TableEdit.scss';

interface TableDataProps {
  btn_title?: string;
  type?: string;
  color?: string;
  is_pop?: boolean;
  flag?: string;
  pop_title?: string;
  btn_sure?: boolean;
  btn_cancel?: boolean;
  is_code?: boolean;
  is_switch?: boolean;
}
interface TableEditProps<T> {
  onHandelType?: (values: TableDataProps) => void;
  get_action_data: TableDataProps[];
  record: T;
}

function TableEditTsx<T extends { [key: string]: any }>({
  get_action_data,
  onHandelType,
  record,
}: TableEditProps<T>) {
  const cancel = () => {
    // message.error('取消').then(() => {});
  };
  const renderContent = (item: TableDataProps) => {
    if (item.is_pop) {
      return (
        <Permission flag={item.flag}>
          <Popconfirm
            title={item.pop_title}
            onConfirm={() => {
              if (onHandelType) {
                onHandelType(item);
              }
            }}
            onCancel={cancel}
            okText={item.btn_sure ? item.btn_sure : '确定'}
            cancelText={item.btn_cancel ? item.btn_cancel : '取消'}
          >
            <span className={`${item.color || ''} text-14  margin-right30`}>
              {item.btn_title}
            </span>
          </Popconfirm>
        </Permission>
      );
    }
    if (item?.is_code) {
      return (
        <Popover title={item.pop_title} trigger='click'>
          <span className={`${item.color || ''} text-14 margin-right30`}>
            {item.btn_title}
          </span>
        </Popover>
      );
    }
    if (item?.is_switch) {
      return (
        <span className={`${item.color || ''} text-14 margin-right30`}>
          <Popconfirm
            title={
              record?.is_active
                ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  `是否禁用该员工：${record?.name}`
                : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  `是否启用该员工：${record?.name}`
            }
            onConfirm={() => {
              if (onHandelType) {
                onHandelType(item);
              }
            }}
            onCancel={cancel}
            okText={item.btn_sure ? item.btn_sure : '确定'}
            cancelText={item.btn_cancel ? item.btn_cancel : '取消'}
          >
            {/* <Switch checked={record?.is_active} /> */}
            {record?.is_active ? '禁用' : '启用'}
          </Popconfirm>
        </span>
      );
    }
    return (
      <Permission flag={item.flag}>
        <span
          className={`${item.color || ''} text-14 margin-right30`}
          onClick={() => {
            if (onHandelType) {
              onHandelType(item);
            }
          }}
        >
          {item.btn_title}
        </span>
      </Permission>
    );
  };
  return (
    <div style={{ cursor: 'pointer' }}>
      {get_action_data
        ? get_action_data.map(item => {
            return (
              //   <Permission flag={item?.flag || ''} key={item?.flag}>
              renderContent(item)
              //   </Permission>
            );
          })
        : ''}
    </div>
  );
}

export default TableEditTsx;
