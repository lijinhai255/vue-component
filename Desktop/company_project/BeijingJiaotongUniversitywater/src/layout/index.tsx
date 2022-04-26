/**
 * @file 首页入口
 */
import { Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { IStoreState } from '../store/types';
import './index.less';
import { LayoutSideBar as Sidebar } from '../components/LayoutSideBar/index';
import { Settings } from '../store/module/settings';
import { LayoutHeader as Header } from '../components/LayoutHeader';
import MainRoutes from './MainRoutes';
import Breadcrumb from '@/components/Breadcrumb';

interface LayoutProps {
  layout: Settings['layout'];

  colorWeak: boolean;

  fixedHeader: boolean;

  contentWidth: Settings['contentWidth'];
}

function Layout(props: LayoutProps) {
  const vis =
    sessionStorage.getItem('updatePsw') &&
    sessionStorage.getItem('updatePsw') !== 'false';
  // console.log(vis);
  const history = useHistory();
  const [visible] = useState(vis === null ? false : vis);

  useEffect(() => {
    if (visible) history.push('/system/recovery-pwd');
    // console.log(visible, 'kjdksajkd');
  }, []);
  return (
    <>
      <section
        className={classnames({
          layout: true,
          'layout--side-bar': props.layout === 'side',
          'layout--weak': props.colorWeak,
        })}
      >
        {props.layout === 'side' && <Sidebar />}
        <section className={classnames('layout__main')}>
          <Header />
          <div
            className={classnames('layout__container', {
              'layout__container--fix': props.fixedHeader,
              'layout__container--fixed':
                props.contentWidth === 'fixed' && props.layout === 'top',
            })}
          >
            <Breadcrumb />
            <Suspense
              fallback={<Spin size='large' className='layout__loading' />}
            >
              <MainRoutes />
            </Suspense>
          </div>
        </section>

        {/* <LayoutSettings /> */}
      </section>
    </>
  );
}

export default connect(
  ({
    settings: { layout, colorWeak, fixedHeader, contentWidth },
  }: IStoreState) => ({
    layout,
    colorWeak,
    fixedHeader,
    contentWidth,
  }),
)(Layout);
