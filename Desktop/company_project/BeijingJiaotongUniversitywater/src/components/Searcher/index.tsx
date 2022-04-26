/**
  @file searcher
 */

import { Input, InputProps } from 'antd';
import { debounce } from 'lodash';
import { ChangeEvent, FC, useRef } from 'react';
import { IconFont } from '../IconFont';

export interface Props extends InputProps {
  onSearch?: (k: string) => Promise<void>;
}
export const Searcher: FC<Props> = ({ onSearch, ...props }) => {
  const valueRef = useRef<ChangeEvent<HTMLInputElement>>();
  const onValueChange = (k: ChangeEvent<HTMLInputElement>) => {
    valueRef.current = k;
    props?.onChange?.(valueRef.current);
  };
  return (
    <Input
      suffix={
        <IconFont
          type='icon-icon-xiaosuo'
          onClick={() => onSearch?.(valueRef.current?.target.value || '')}
        />
      }
      onChange={ev => debounce(onValueChange)(ev)}
      {...props}
      // @ts-ignore
      onPressEnter={ev => onSearch?.(ev.target.value || '')}
    />
  );
};
