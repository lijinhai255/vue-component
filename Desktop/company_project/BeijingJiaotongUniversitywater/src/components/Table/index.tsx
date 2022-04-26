import { Table } from 'antd';
import { TableData } from '../../typings';

export const TableList = <T extends any>({
  dataSources,
  columns,
}: TableData<T>) => {
  // @ts-ignore
  return <Table dataSource={dataSources} columns={columns} />;
};
