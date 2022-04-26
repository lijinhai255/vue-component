/**
 * @file Button
 */
import { Button as AntButton, ButtonProps } from 'antd';
import { useState } from 'react';

export type Props = {
  onClick: (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => Promise<any> | void;
} & Omit<ButtonProps, 'onClick'>;

export const Button = ({ onClick, ...props }: Props) => {
  const [loading, setLoading] = useState(false);
  const clickEvent: React.MouseEventHandler<HTMLElement> = async ev => {
    if (loading) return;
    setLoading(true);
    await onClick(ev);
    setLoading(false);
  };
  return <AntButton onClick={clickEvent} loading={loading} {...props} />;
};
