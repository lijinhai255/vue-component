/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * @file page utils
 */

export interface MenuPermission {
  id: number;
  create_datetime: Date;
  update_datetime: Date;
  creator_name: null;
  name: string;
  value: string;
  api: string;
  method: string;
  menu: number;
}

export interface CarbonRoutes {
  cache: boolean;
  children: CarbonRoutes[];
  component_path: string;
  create_datetime: string;
  creator: string;
  creator_name: string;
  dept_belong_id: number;
  description: string;
  icon: string;
  id: number;
  isFrame: boolean;
  is_link: boolean;
  is_need_id: boolean;
  linking_list: any[];
  hidden?: boolean;
  menuPermission: MenuPermission[];
  modifier: string;
  name: string;
  orderNum: number;
  parentId: number;
  path: string;
  status: boolean;
  title: string;
  tree_path: string;
  update_datetime: string;
  visible: boolean;
  web_path: string;
}

export type MatchRoute = {
  matchLen: number;
  route: ChildRoutes[];
};

// 计算最佳匹配的路由
export const caculateCheckedMenu = (
  routerTree: CarbonRoutes[],
  pathName: string,
) => {
  if (!routerTree?.length || !(typeof pathName === 'string')) return [];
  const pathNameArr = pathName.split('/').filter(Boolean);
  const pathNameArrLength = pathNameArr.length;
  const childRoutes = getBaseRoutes(routerTree, []);
  let matchRoute: MatchRoute = {
    matchLen: 0,
    route: [],
  };
  childRoutes.forEach(route => {
    // eslint-disable-next-line
    let pathArr = route.path?.split('/') || [];
    pathArr = pathArr.filter(Boolean);
    const pathLength = pathArr.length;
    // todo 需要fix 路由最后是可选参数的情况，可能有连续多个可选参数
    if (
      pathLength === pathNameArrLength ||
      (pathLength - 1 === pathNameArrLength &&
        pathArr[pathLength - 1].endsWith('?'))
    ) {
      let matchLen = 0;
      for (let i = 0; i < pathNameArrLength; i += 1) {
        if (pathArr[i] === pathNameArr[i]) {
          matchLen += 1;
        }
      }
      // while (pathLength--) {
      // }
      if (matchLen >= matchRoute.matchLen) {
        matchRoute = {
          matchLen,
          route:
            matchLen > matchRoute.matchLen
              ? [route]
              : [...matchRoute.route, route],
        };
      }
    }
  });
  if (!matchRoute?.route?.[0]) return [undefined, undefined];
  const { $$$keyMap, ...matchRoutes } = matchRoute.route[0];
  return [$$$keyMap, matchRoutes] as const;
};

type ChildRoutes = {
  $$$keyMap?: number[];
} & CarbonRoutes;

// 获取所有的子路由
const getBaseRoutes = (
  routeTree: ChildRoutes[],
  childRoutes: ChildRoutes[],
  $$$keyMap?: number[],
): ChildRoutes[] => {
  let routes = childRoutes || [];
  const nowKeyArr = $$$keyMap || [];
  routeTree.forEach((route, index) => {
    if (!route?.children?.length) {
      routes.push({
        $$$keyMap: [...nowKeyArr, index],
        ...route,
      });
    } else {
      routes = routes.concat(
        [{ ...route, $$$keyMap: [...nowKeyArr, index] }],
        getBaseRoutes(route.children, [], [...nowKeyArr, index]),
      );
    }
  });

  return routes;
};
