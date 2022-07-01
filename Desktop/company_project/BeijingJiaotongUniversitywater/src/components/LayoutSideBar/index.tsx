/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-named-as-default */
/**
 * @file 菜单
 */
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../SidebarLogo';
import { IStoreState } from '../../store/types';
import { menuRoutes } from '../../router/config';
import renderMenu from '../SideMenu';
import './index.less';
import { getPagePathList } from '../../router/utils';
import { apiMenuList } from '@/api/api';
// import { RoleFilter } from './role';
import { getToken } from '@/utils/cookie';
import { filterChaeck } from './filterCheck';
import VerifyUtils from '@/utils/verifty';

export const LayoutSideBar = () => {
  const inlineCollapsed: {
    inlineCollapsed?: boolean;
  } = {};

  const selector = useSelector<IStoreState, IStoreState>(state => state);
  const { layout, theme } = selector.settings;
  // const { sidebar } = selector.app;
  // redux 里面有路由，暂时不需要
  // const [routes, setRoutes] = useState([{}]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const history = useHistory();
  useEffect(() => {
    setBreadcrumbs(getPagePathList());

    const unListen = history.listen(() => {
      setBreadcrumbs(getPagePathList());
    });

    return () => {
      unListen();
    };
  }, []);
  if (layout === 'side') {
    inlineCollapsed.inlineCollapsed = !true;
  }

  const { pathname } = window.location;
  const [path, setPath] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getList = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await apiMenuList().then((res: any) => {
      if (res.data.code === 200) {
        // setRoutes(RoleFilter(res.data.data));
        // setRoutes([...Routes]);
        sessionStorage.setItem('role', JSON.stringify(res.data.data));
        if (filterChaeck(res.data.data))
          setPath(String(filterChaeck(res.data.data)));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // setPath(filterCheck(res.data.data) as string);
      } else VerifyUtils.Toast('info', res.data.msg);
    });
  };
  useEffect(() => {
    if (getToken()) {
      // getList();
    }
  }, [window.location.href]);
  console.log(menuRoutes, 'menuRoutes=menuRoutes');
  return (
    <aside
      className={classnames(
        'layout__side-bar',
        `layout__side-bar--${theme}`,
        `layout__side-bar--${layout}`,
        {
          'layout__side-bar--close': !true && layout === 'side',
        },
      )}
    >
      <div className={`layout__side-bar__logo--${layout}`}>
        <Logo opened={!true} layout={layout} />
      </div>
      <div className='layout__side-bar__menu'>
        <Menu
          selectedKeys={breadcrumbs}
          defaultOpenKeys={
            layout === 'side' && true ? getPagePathList(path || pathname) : []
          }
          mode={layout === 'side' ? 'inline' : 'horizontal'}
          theme='light'
          {...inlineCollapsed}
          style={{
            marginTop: '16px',
          }}
        >
          {menuRoutes.length > 0
            ? menuRoutes.map((menu: any) => renderMenu(menu))
            : ''}
        </Menu>
      </div>
    </aside>
  );
};
