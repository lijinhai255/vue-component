/**
 * @file
 */
import { memo, useEffect, useRef, useState } from 'react';
import { Tooltip } from 'antd';
import styles from './index.module.scss';
import { combineClassName } from '@/utils';

export type Props = {
  className?: string;
  text?: string;
};

export const Ellipsis = memo(({ className, text }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    if (
      wrapperRef.current &&
      wrapperRef.current.scrollWidth > wrapperRef.current.offsetWidth
    ) {
      setShowTip(true);
    } else {
      setShowTip(false);
    }
  }, [text]);
  return (
    <div
      ref={wrapperRef}
      className={combineClassName(
        styles.wrapper,
        className,
        showTip ? styles.activeTip : '',
      )}
    >
      <Tooltip title={text} visible={showTip ? undefined : false}>
        {text}
      </Tooltip>
    </div>
  );
});
