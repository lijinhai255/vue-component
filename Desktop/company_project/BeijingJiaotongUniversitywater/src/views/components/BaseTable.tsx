import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { TableProps } from 'antd/lib/table';
import { PageResponseData } from '../../typings';
import style from './searchform.module.scss';
// 基本的表格组件，后续根据需求可继续完善

interface BaseTableProps<T> extends TableProps<T> {
  data: {
    list: T[];
    page: PageResponseData;
  };
  rowKey?: string;
  children?: ReactNode;
  onChange: (page: PaginationProps) => void;
}

const BaseTable = <T extends { [key: string]: any }>(
  props: BaseTableProps<T>,
) => {
  const {
    data: { list, page },
    rowKey,
    ...resetProps
  } = props;
  const [pagination, setPagination] = useState<PaginationProps>({
    current: page.page,
    pageSize: page.size,
    showSizeChanger: true,
  });

  const onTableChange = useCallback((pageParams: PaginationProps) => {
    setPagination({ ...pageParams });
    props.onChange(pageParams);
  }, []);

  useEffect(() => {
    setPagination({
      current: page.page,
      pageSize: page.size,
      showSizeChanger: true,
    });
  }, [page]);

  return (
    <Table<T>
      {...resetProps}
      className={style.usertable}
      onChange={onTableChange}
      scroll={props.scroll}
      // style={{ marginTop: '40px' }}
      dataSource={list}
      rowKey={(record: T) =>
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${record[rowKey as keyof T] || record?.key || record?.id || ''}`
      }
      pagination={{
        ...pagination,
        total: page.dataTotal,
      }}
    >
      {props?.children}
    </Table>
  );
};

export default BaseTable;
