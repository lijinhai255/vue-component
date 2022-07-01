import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Routes, IconObj } from '../../router/config';
import { IconFont } from '@/components/IconFont';
import './index.less';
import config from '../../config';

function renderTitle(meta: Routes) {
  /* eslint-disable no-confusing-arrow */
  // console.log(meta, 'meta');
  return (
    <span className='menu-item-inner'>
      {/* <span className='menu-title'> {meta?.permissionName} </span> */}
      {/* <span className='menu-title'> {meta?.meta?.title} </span> */}
      {meta?.meta?.title}
    </span>
  );
}

function renderMenuRoute(menu: Routes) {
  const pathKey = `${config.BASENAME || ''}${menu.path}`;
  return (
    <Menu.Item
      key={pathKey}
      // icon={
      //   menu.permissionName ? (
      //     <IconFont
      //       type={menu.permissionName ? IconObj[menu.permissionName] : ''}
      //       style={{ fontSize: '16px' }}
      //     />
      //   ) : (
      //     ''
      //   )
      // }
      // style={{ paddingLeft: '24px' }}
    >
      <Link to={menu.path}>{renderTitle(menu)}</Link>
    </Menu.Item>
  );
}

function renderSubMenu(menu: Routes) {
  const pathKey = `${config.BASENAME || ''}${menu.path}`;
  return (
    <Menu.SubMenu
      title={renderTitle(menu)}
      key={pathKey}
      icon={
        <IconFont
          type={menu.permissionName ? IconObj[menu.permissionName] : ''}
          style={{ fontSize: '16px' }}
        />
      }
    >
      {menu.children!.map(item => {
        return item.children && item.children?.length > 0
          ? renderMenuRoute(item)
          : renderMenuRoute(item);
      })}
    </Menu.SubMenu>
  );
}

function renderMenu(menu: Routes) {
  if (menu.children && menu.children?.length > 0) {
    // console.log(menu.children?.length);
    return renderSubMenu(menu);
  }
  return renderMenuRoute(menu);
}

export default renderMenu;
