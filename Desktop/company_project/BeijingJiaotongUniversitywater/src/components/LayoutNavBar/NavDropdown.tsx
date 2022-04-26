import { memo, ReactNode } from 'react';
import { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';

interface NavDropDownProps extends DropDownProps {
  children: ReactNode;
}

function NavDropDown(props: NavDropDownProps) {
  return <Dropdown {...props}>{props.children}</Dropdown>;
}

export default memo(NavDropDown);
