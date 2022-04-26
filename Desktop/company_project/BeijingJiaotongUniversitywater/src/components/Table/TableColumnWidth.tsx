/**
 * @file table column 指定宽度组件
 */

import { CSSProperties, FC } from 'react';

export type Props = {
  width: number | string;
  style?: CSSProperties;
  align?: 'center' | 'start' | 'end';
};

export const TableColumnWidth: FC<Props> = ({
  children,
  width,
  style,
  align,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width,
        justifyContent: align || 'start',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
