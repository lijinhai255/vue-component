/**
 * @file header & side menu
 */
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { IStoreState } from '../../store/types';
import LayoutNavBar from '../LayoutNavBar';
// import { LayoutSideBar } from '../LayoutSideBar';
import './index.less';

export const LayoutHeader = () => {
  const selector = useSelector<IStoreState, IStoreState>(state => state);
  const { layout, theme, fixedHeader, contentWidth } = selector.settings;
  const { sidebar } = selector.app;
  return (
    <header
      className={classnames(
        'layout__header',
        `layout__header--${layout}`,
        `layout__header--${theme}`,
        {
          'layout__header--fix': fixedHeader,
          // close 情况只有在 layout 为 side 的时候存在
          'layout__header--close': !sidebar.opened && layout === 'side',
        },
      )}
    >
      <div
        className={classnames('layout__header__inner', {
          [`layout__header__inner--${contentWidth}`]: layout === 'top',
        })}
      >
        <h1 className='layout__header__title'>水务系统碳中和智能化管理平台</h1>
        {/* {layout === 'top' && (
          <div className='layout__header--top-side-bar'>
            <LayoutSideBar />
          </div>
        )} */}
        <LayoutNavBar />
      </div>

      {/* <tags-view v-if="needTagsView" /> */}
    </header>
  );
};
