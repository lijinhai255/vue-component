/**
 * @file auto height table
 * 默认table 会占满整个盒子
 */
import { Table as AntTable, TableProps } from 'antd';
import { combineClassName } from '@/utils';
import style from './index.module.scss';

export const Table = (props: TableProps<any>) => {
  const propsMerged = {
    ...props,
    className: combineClassName(props.className, style.autoHeightTable),
  };
  return <AntTable {...propsMerged} />;
};
