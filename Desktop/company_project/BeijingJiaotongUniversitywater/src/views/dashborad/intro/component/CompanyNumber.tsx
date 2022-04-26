import { useState, useEffect, FC } from 'react';
import Histogram from './Histogram';
import { Radio } from 'antd';
import style from '../index.module.scss';
import { apiStatistics } from '../service';
interface CompanyNumberType {
  1: string;
  2: string;
  3: string;
}
const CompanyNumber: FC<{
  type: string;
  current: keyof CompanyNumberType;
  defaultOptions?: echarts.EChartsCoreOption;
}> = ({ type, current, defaultOptions }) => {
  const [currentIndex, changeCurrentIndex] = useState<{
    1: string;
    2: string;
    3: string;
  }>({
    1: '2',
    2: '2',
    3: '2',
  });
  const [chartData, getChartData] = useState<{
    xaxis: string[];
    yaxis: string[];
  }>({ xaxis: [], yaxis: [] });
  const apiStatisticsFn = async () => {
    await apiStatistics(
      { dateType: currentIndex[current] as string },
      current,
    ).then(({ data }) => {
      getChartData({
        ...data.data,
      });
    });
  };
  useEffect(() => {
    apiStatisticsFn();
  }, [currentIndex]);
  const objText = {
    1: '贷款企业注册数量',
    2: '新增项目',
    3: '各类型项目绿色绩效强度',
  };
  return (
    <div className={style.content_unit}>
      <div className={style.content_unit_head}>
        <h3>{objText[current]}</h3>
        {Number(current) === 3 ? (
          <></>
        ) : (
          <Radio.Group
            value={currentIndex[current]}
            onChange={e => {
              changeCurrentIndex({
                ...currentIndex,
                [current]: e.target.value,
              });
            }}
          >
            <Radio.Button value='2'>近一周</Radio.Button>
            <Radio.Button value='3'>近一月</Radio.Button>
            <Radio.Button value='4'>近一年</Radio.Button>
          </Radio.Group>
        )}
      </div>
      {Number(current) === 3 ? (
        <p style={{ margin: 0, padding: 0, fontSize: '12px' }}>tCO₂e/亿元/年</p>
      ) : (
        ''
      )}
      <Histogram
        option={{
          grid: [
            {
              left: '1%',
              right: '5%',
              bottom: Number(current) === 3 ? '1%' : '12%',
              width: '95%',
              top: Number(current) === 2 ? '10%' : '3%',
              containLabel: true,
              borderWidth: 1,
            },
          ],
          tooltip: {
            position: 'top',
          },
          xAxis: {
            type: 'category',
            data: chartData.xaxis,
            axisLabel: {
              fontSize: 11,
            },
            axisTick: {
              show: false,
            },
            start: 10,
            boundaryGap: ['0%', '0%'], // 控制
            axisLine: { onZero: false },
            splitLine: { show: false }, // 是否显示坐标轴轴线
            splitNumber: 20, //坐标轴的分割段数，预估值，在类目轴中无效
            min: 'dataMin', // 特殊值，数轴上的最小值作为最小刻度
            max: 'dataMax', // 特殊值，数轴上的最大值作为最大刻度
          },
          yAxis: {
            name: Number(current) === 2 ? '' : '',
            type: 'value',
            nameTextStyle: {
              color: '#666666',
              fontSize: 12,
              // 关键代码
              padding: [30, 0, 11, 30],
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
              },
            }, // 是否显示坐标轴轴线
            splitArea: {
              show: false, // 显示分割区域
            },
          },
          dataZoom:
            Number(current) === 3
              ? []
              : [
                  {
                    type: 'inside',
                    start: 0,
                    end: 100,
                  },
                  {
                    start: 0,
                    end: 100,
                  },
                ],
          series: [
            {
              // data: soureData.sourceList?.mapy,
              data: chartData.yaxis,
              type: type,
              // barWidth: '100%',
            },
          ],
          ...defaultOptions,
        }}
      />
    </div>
  );
};
export default CompanyNumber;
