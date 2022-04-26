import { memo, useCallback, useState } from 'react';
import { Menu, message } from 'antd';
import { connect } from 'react-redux';
import { MenuProps } from 'antd/lib/menu';
import { useHistory } from 'react-router-dom';
import NavDropdown from './NavDropdown';
import ChangeSteganogram from '@/views/person/ChanageSteganogram';
import { IStoreState } from '../../store/types';
import { clearSideBarRoutes } from '../../store/module/app';
import { setUserInfo, UserState } from '../../store/module/user';
import { removeToken } from '../../utils/cookie';
import { logoutSend } from '../../api/api';
import VerifyUtils from '../../utils/verifty';
import { IconFont } from '../IconFont';
import './dropdown.scss';
interface AvatarDropdownProps {
  avatar?: string;
  account: string;
  classNames: string;
  clearSideBarRoutes: () => void;
  setUserInfo: (user: UserState) => void;
}

function renderManageUser(onMenuClick: MenuProps['onClick']) {
  return (
    <Menu
      selectedKeys={[]}
      onClick={onMenuClick}
      style={{ width: '140px', marginRight: '14px', padding: '0px' }}
    >
      <Menu.Item
        key='center'
        style={{
          paddingLeft: '20px',
          height: '36px',
          borderBottom: '1px solid #F8F8F8',
        }}
      >
        {JSON.parse(sessionStorage.getItem('userinfo') as string)
          ? JSON.parse(sessionStorage.getItem('userinfo') as string).username
          : ''}
      </Menu.Item>
      <Menu.Item key='settings' style={{ paddingLeft: '20px', height: '36px' }}>
        修改密码
      </Menu.Item>
      {/* <Menu.Divider /> */}
      <Menu.Item key='logout' style={{ paddingLeft: '20px', height: '36px' }}>
        退出登录
      </Menu.Item>
    </Menu>
  );
}

function AvatarDropdown(props: AvatarDropdownProps) {
  const history = useHistory();
  const [visable, setVisable] = useState(false);
  const [iconUrl, setIconUrl] = useState('icon-icon-jiantou-shouqi1');
  const onMenuClick = useCallback(({ key }: { key: string }) => {
    if (key === 'logout') {
      logoutSend().then((res: any) => {
        if (res.data.code === 200) {
          removeToken();
          props.setUserInfo({
            token: '',
            account: '',
            avatar: '',
            mobile: '',
            id: 0,
            role: 0,
          });
          props.clearSideBarRoutes();
          // eslint-disable-next-line import/no-named-as-default-member
          VerifyUtils.Toast('success', '退出成功');
          removeToken();
          history.replace('/system/login');
        } else {
          message.error('退出失败，接口异常');
        }
      });
    } else if (key === 'settings') {
      setVisable(true);
    } else {
    }
  }, []);

  return (
    <>
      <NavDropdown
        overlay={renderManageUser(onMenuClick)}
        trigger={['click']}
        onVisibleChange={(visible: boolean) => {
          setIconUrl(
            visible
              ? 'icon-icon-jiantou-zhankai1'
              : 'icon-icon-jiantou-shouqi1',
          );
        }}
      >
        <div className={props.classNames}>
          <IconFont
            type='icon-icon-yonghutouxiang'
            style={{ fontSize: '28px', color: '#999999' }}
          />
          <span className='layout__navbar__account'>
            {JSON.parse(sessionStorage.getItem('userinfo') as string)
              ? JSON.parse(sessionStorage.getItem('userinfo') as string).orgName
              : ''}
          </span>
          <IconFont type={iconUrl} style={{ marginLeft: '10px' }} />
        </div>
      </NavDropdown>
      <ChangeSteganogram
        visable={visable}
        handelcancel={() => setVisable(!visable)}
      />
    </>
  );
}

export default connect(
  ({ user: { avatar, account } }: IStoreState) => ({ avatar, account }),
  {
    clearSideBarRoutes,
    setUserInfo,
  },
)(memo(AvatarDropdown));
