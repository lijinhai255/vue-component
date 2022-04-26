/**
 * @file 权限组件
 * @usage  <Permission flag='element flag'>you reactNode</Permission>
 */
import { FC, ReactFragment, useEffect, useState } from 'react';
// import { apiMenuList } from '@/api/api';

// import { useSelector } from 'react-redux';

interface IProps {
  children: ReactFragment;
  flag?: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Permission: FC<IProps> = ({ children, flag }) => {
  // 按钮级别权限控制 redux 中user_list中name 和flag 进行对比
  const [userList, setuserList] = useState([]);
  // const userList = useSelector(
  //   (a: { user_list: { btn_role: string[] } }) => a.user_list.btn_role,
  // ); // redux-按钮权限
  const getList = () => {
    setuserList(JSON.parse(sessionStorage.getItem('role') as string));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    // apiMenuList().then((res: any) => {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   const { data } = res.data;
    //   setuserList(data);
    // });
  };
  useEffect(() => {
    getList();
  }, []);
  // const userList: { ident: string }[] = [];
  // eslint-disable-next-line no-console
  const RenderChildren = () => {
    // @ts-ignore
    const isRender = userList?.some((item: { perms: string }) =>
      flag ? item.perms.includes(flag) : '',
    );
    return isRender && children;
  };
  return <>{RenderChildren()}</>;
};

export default Permission;
