/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './index.module.scss';

const Dict: FC = () => {
  const history = useHistory();
  console.log(history, 'his', useState);

  useEffect(() => {}, []);

  return (
    <div className={style.dictWrapper}>
      <div className={style.gridContent}>
        <div className={style.gridContent_item}>
          <h2>今日新增</h2>
          <div>10000</div>
        </div>
        <div className={style.gridContent_item}>
          <h2>待审核</h2>
          <div>10000</div>
        </div>
        <div className={style.gridContent_item}>
          <h2>本月新增</h2>
          <div>10000</div>
        </div>
        <div className={style.gridContent_item}>
          <h2>总条数</h2>
          <div>10000</div>
        </div>
      </div>
      <div className={style.gridContent_botton}>
        <div>这是一个人图表</div>
        <div>这个一个排行榜</div>
      </div>
    </div>
  );
};

export default Dict;
