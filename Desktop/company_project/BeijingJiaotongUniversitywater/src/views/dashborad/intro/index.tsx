/**
 * @file 首页介绍
 */
import style from './index.module.scss';
// import { Carousel } from 'antd';
// import { useEffect, useRef, useState } from 'react';
// import { IconFont } from '@/components/IconFont';
// import CompanyNumber from './component/CompanyNumber';
import store from '@/store';
// import { apiDashboardData } from './service';

function Intro() {
  const { user } = store.getState();
  // const [CarouselWidth, changeCarouselWidth] = useState<number>(0);
  // const [DashboardData, getDashboardData] = useState<{
  //   entOrgNum?: string;
  //   entTodayAdd?: String;
  //   projectTotal?: string;
  //   reductionEffect?: string;
  // }>({});
  // const unitRef = useRef<HTMLDivElement>(null);
  console.log(user.orgType, 'user-user');
  // useEffect(() => {
  //   let current = unitRef?.current;
  //   if (current) {
  //     changeCarouselWidth(current.clientWidth);
  //   }
  // }, [unitRef]);
  // const apiDashboardDataFn = async () => {
  //   await apiDashboardData().then(({ data }) => {
  //     console.log(data, 'data=data');
  //     getDashboardData(data.data);
  //   });
  // };
  // useEffect(() => {
  //   apiDashboardDataFn();
  // }, []);
  return (
    <div>
      <div className={style.header}>
        <h1 className={style.title}>
          欢迎来到
          <span style={{ color: '#005BAC', paddingLeft: '10px' }}>
            碳中和智能化管理平台
          </span>
        </h1>
        <span className={style.tip}>让项目减排量变的可视化</span>
      </div>
      {/* {Number(user.orgType) === 1 && (
        <>
          <div className={style.unit}>
            <div className={style.unit_item}>
              <h3>贷款企业注册总数（个）</h3>
              <div className={style.unit_item_content}>
                <h4>{DashboardData.entOrgNum}</h4>
                <IconFont type='icon-icon-1-1' className={style.icon} />
              </div>
            </div>
            <div className={style.unit_item}>
              <h3>今日新增贷款企业（个）</h3>
              <div className={style.unit_item_content}>
                <h4>{DashboardData.entTodayAdd}</h4>
                <IconFont type='icon-icon-2-1' className={style.icon} />
              </div>
            </div>
            <div className={style.unit_item}>
              <h3>历史项目总数（个）</h3>
              <div className={style.unit_item_content}>
                <h4>{DashboardData.projectTotal}</h4>
                <IconFont type='icon-icon-3-1' className={style.icon} />
              </div>
            </div>
            <div className={style.unit_item}>
              <h3>单位贷款碳减排效应（tCO₂e/亿元/年）</h3>
              <div className={style.unit_item_content}>
                <h4>{DashboardData.reductionEffect}</h4>
                <IconFont type='icon-icon-4-1' className={style.icon} />
              </div>
            </div>
          </div>
          <div className={style.content}>
            <CompanyNumber type='line' current={1} />
            <div className={style.content_unit} ref={unitRef}>
              <h3>资讯模块</h3>
              <div className={style.Carousel}>
                <p
                  style={{
                    textAlign: 'center',
                    color: '#666',
                    marginTop: '60px',
                  }}
                >
                  暂无内容
                </p>
                <Carousel style={{ width: CarouselWidth, display: 'none' }}>
                  <div>
                    <h3
                      style={{
                        height: '160px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        background: '#364d79',
                      }}
                    >
                      1
                    </h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        height: '160px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        background: '#364d79',
                      }}
                    >
                      2
                    </h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        height: '160px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        background: '#364d79',
                      }}
                    >
                      3
                    </h3>
                  </div>
                  <div>
                    <h3
                      style={{
                        height: '160px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        background: '#364d79',
                      }}
                    >
                      4
                    </h3>
                  </div>
                </Carousel>
              </div>
            </div>
            <div className={style.content_unit} style={{ padding: '0' }}>
              <CompanyNumber
                type='bar'
                current={3}
                defaultOptions={{
                  yAxis: {
                    type: 'value',
                    min: function (value: { min: number; max: number }) {
                      return value.min;
                    },
                    max: function (value: { min: number; max: number }) {
                      return value.max;
                    },
                  },
                }}
              />
            </div>
            <div className={style.content_unit} style={{ padding: '0' }}>
              <CompanyNumber type='line' current={2} />
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}

export default Intro;
