import { TreeAddForm } from '@/views/auth/routeAuth/service';

const sortTreeByOrder = (arr: Array<TreeAddForm>) => {
  if (arr.length > 0) {
    arr.sort((obj1: TreeAddForm, obj2: TreeAddForm) => {
      const val = obj1.orderNum - obj2.orderNum;
      return val;
    });
  }
};
const formatToTree = (treeData: TreeAddForm[], key?: number | string) => {
  return treeData
    .filter(item => {
      const backF = item;
      if (!backF.parentId) {
        backF.parentId = 0;
      }
      return !key ? backF.parentId === 0 : backF.parentId === key;
    })
    .map(item => {
      const back = item;
      back.children = formatToTree(treeData, item.key);
      sortTreeByOrder(back.children);
      return back;
    });
};
const initTreeStructure = (data: any) => {
  return formatToTree(data);
};
const filterType = (data: any) => {
  const arr: any[] = [];
  // eslint-disable-next-line
  data.forEach((item: any) => {
    if (item.menuType !== 'F') arr.push(item);
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return arr;
};
export const RoleFilter = (data: any) => {
  const auth: any = {
    id: 0,
    menuId: 0,
    menuType: 'M',
    value: 0,
    component_path: '',
    is_link: 'false',
    hidden: 'false',
    isFrame: 'false',
    visible: 'false',
    title: '企业碳减排账户管理系统',
    kind: 0,
    ident: '1',
    orderNum: 1,
    status: 'true',
    name: '企业碳减排账户管理系统',
    key: '0-0',
    children: [],
  };
  // eslint-disable-next-line no-param-reassign
  data = filterType(data);
  auth.children = initTreeStructure(data);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return auth.children;
};
