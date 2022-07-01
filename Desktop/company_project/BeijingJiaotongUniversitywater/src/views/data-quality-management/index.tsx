/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState } from 'react';
import { Radio } from 'antd';
import { useHistory } from 'react-router-dom';
import EmoChart from '@/views/data-quality-management/library/component/EmoChart';
import style from './index.module.less';
import { apiGetFactorStatisticalData, SourceType } from './service-old';

const Dict: FC = () => {
  const history = useHistory();
  console.log(history, 'his', useState);
  const [soureData, getSoureData] = useState<SourceType>({});
  const [currentLabel, changeCurrentLabel] = useState<
    'weekRankingList' | 'monthRankingList' | 'allRankingList'
  >('weekRankingList');
  const apiGetFactorStatisticalDataFn = async () => {
    await apiGetFactorStatisticalData().then(({ data }) => {
      console.log(data.data.data, 'data=data');
      getSoureData(data.data.data);
    });
  };
  useEffect(() => {
    apiGetFactorStatisticalDataFn();
  }, []);
  const renderContent = () => {
    if (soureData.weekRankingList && currentLabel === 'weekRankingList') {
      return soureData.weekRankingList.map(
        (item: { createBy: string; counts: number }, index: number) => {
          return (
            <div className={style.content_item}>
              <div style={{ display: 'flex' }}>
                <span
                  className={
                    index + 1 > 3
                      ? style.content_item_num_ts
                      : style.content_item_num
                  }
                >
                  {index + 1}
                </span>
                <span className={style.content_item_name}>{item.createBy}</span>
              </div>
              <span className={style.content_item_counts}>{item.counts}</span>
            </div>
          );
        },
      );
    }
    if (soureData.allRankingList && currentLabel === 'allRankingList') {
      return soureData.allRankingList.map(
        (item: { createBy: string; counts: number }, index: number) => {
          return (
            <div className={style.content_item}>
              <div style={{ display: 'flex' }}>
                <span
                  className={
                    index + 1 > 3
                      ? style.content_item_num_ts
                      : style.content_item_num
                  }
                >
                  {index + 1}
                </span>
                <span className={style.content_item_name}>{item.createBy}</span>
              </div>
              <span className={style.content_item_counts}>{item.counts}</span>
            </div>
          );
        },
      );
    }
    if (soureData.monthRankingList && currentLabel === 'monthRankingList') {
      return soureData.monthRankingList.map(
        (item: { createBy: string; counts: number }, index: number) => {
          return (
            <div className={style.content_item}>
              <div style={{ display: 'flex' }}>
                <span
                  className={
                    index + 1 > 3
                      ? style.content_item_num_ts
                      : style.content_item_num
                  }
                >
                  {index + 1}
                </span>
                <span className={style.content_item_name}>{item.createBy}</span>
              </div>
              <span className={style.content_item_counts}>{item.counts}</span>
            </div>
          );
        },
      );
    }
    return '';
  };
  return (
    <div className={style.dictWrapper}>
      <div className={style.gridContent}>
        <div className={style.gridContent_item}>
          <h2>今日新增</h2>
          <div>{soureData.dayNewFactorCounts}</div>
        </div>
        <div className={style.gridContent_item}>
          <h2>待审核</h2>
          <div>{soureData.auditFactorCounts}</div>
        </div>
        <div className={style.gridContent_item}>
          <h2>本月新增</h2>
          <div>{soureData.monthNewFactorCounts}</div>
        </div>
        <div className={style.gridContent_item}>
          <h2>总条数</h2>
          <div>{soureData.allFactorCounts}</div>
        </div>
      </div>
      <div className={style.gridContent_botton}>
        <div className={style.gridContent_botton_left}>
          <h3>排放因子类别分布</h3>
          <EmoChart
            option={{
              tooltip: {
                position: 'top',
              },
              grid: {
                containLabel: true,
                left: 20,
                top: 30,
                bottom: 20,
                right: 30,
              },
              xAxis: {
                type: 'category',
                data: soureData.sourceList?.mapx,
              },
              xField: 'dictLabel',
              yField: 'counts',
              yAxis: {
                data: [0, 1000, 2000, 3000, 4000],
                // name: '单位：kgCO₂e',
                // nameTextStyle: {
                //   color: '#666666',
                //   fontSize: 12,
                //   padding: [0, 0, 0, 10],
                // },
                type: 'value',
                axisLine: {
                  show: false,
                },
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  color: '#999999', // 轴字体
                },
              },
              series: [
                {
                  data: soureData.sourceList?.mapy,
                  type: 'bar',
                },
              ],
            }}
          />
        </div>
        <div className={style.gridContent_botton_right}>
          <h3>贡献榜</h3>
          <div>
            <Radio.Group
              value={currentLabel}
              buttonStyle='solid'
              onChange={e => {
                console.log(e.target.value, 'e=e=e');
                changeCurrentLabel(e.target.value);
              }}
            >
              <Radio.Button value='weekRankingList'>本周</Radio.Button>
              <Radio.Button value='monthRankingList'>本月</Radio.Button>
              <Radio.Button value='allRankingList'>总榜</Radio.Button>
            </Radio.Group>
          </div>
          <div className={style.gridContent_botton_right_content}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dict;
