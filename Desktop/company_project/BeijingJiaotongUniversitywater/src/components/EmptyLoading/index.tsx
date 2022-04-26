/**
 * @file 当数据加载中时展示的loading
 */

import { Spin, SpinProps } from 'antd';
import styles from './index.module.scss';

export type Props = { size?: SpinProps['size'] };

export const EmptyLoading = ({ size }: Props) => {
  return (
    <div className={styles.emptyLoadingWrapper}>
      <Spin size={size ?? 'large'} />
    </div>
  );
};
