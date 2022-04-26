import { memo, MouseEventHandler } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './index.less';

interface HamburgerProps {
  isActive: boolean;
  onTrigger: MouseEventHandler<HTMLDivElement>;
}

function Hamburger({ isActive, onTrigger }: HamburgerProps) {
  return (
    <div className='layout__nav-bar__hamburger' onClick={ev => onTrigger(ev)}>
      {isActive ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
    </div>
  );
}

export default memo(Hamburger);
