import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { themObj } from './cq-project';
console.log(themObj, 'themObj=themObj');
// EChartOption// 被注释掉了

export type EchartProp = {
  option: echarts.EChartsCoreOption;
  key?: string;
  style?: {
    width: string;
    height: string;
  };
  className?: string;
};

const removeUndefined = (obj: object) => {
  for (const key in obj) {
    if (obj[key as keyof typeof obj] === undefined) {
      delete obj[key as keyof typeof obj];
    }
  }
  return obj;
};

const Histogram: React.FC<EchartProp> = ({
  option,
  key,
  className,
  style = { width: '100%', height: '390px' },
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const echartsInstance = useRef<echarts.ECharts>();

  useEffect(() => {
    echarts.registerTheme('cq-project', themObj);
    echartsInstance.current = echarts.init(
      chartRef.current as HTMLDivElement,
      'cq-project',
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      echartsInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    echartsInstance.current?.setOption({ ...option });
  }, [option]);

  return (
    <div
      ref={chartRef}
      {...removeUndefined({ option, key, className, style })}
    />
  );
};

export default Histogram;
