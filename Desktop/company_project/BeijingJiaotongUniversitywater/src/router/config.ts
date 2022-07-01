import { ComponentType, lazy } from 'react';

export interface RouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: ComponentType<any>;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: RouteMeta;
  menuType?: string;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
  title?: string | undefined;
  show?: boolean;
}

export interface RouteMeta {
  title: string;
}
export const IconObj = {
  首页: 'icon-icon-shouye-2',
  企业信息管理: 'icon-icon-qiyexinxiguanli',
  减排项目: 'icon-icon-jianbaixiangmu',
  碳减排监测: 'icon-icon-tanjianbaijiance',
  系统管理: 'icon-icon-jitongguanli-1',
};
export interface Routes extends RouteBase {
  children?: Routes[];
  permissionName?: keyof typeof IconObj;
}

/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入，而菜单栏的控制是支持异步请求控制的
 */
export const menuRoutes: Routes[] = [
  {
    path: '/dashborad/intro',
    meta: {
      title: '首页',
    },
    component: lazy(() => import('../views/dashborad/intro')),
    // children: [
    //   {
    //     path: '/dashborad/intro/userInfo',
    //     component: lazy(() => import('../views/dashborad/intro/userInfo')),
    //     show: true,
    //     meta: {
    //       title: '账户信息',
    //     },
    //   },
    // ],
  },

  // 以下菜单为系统权限管理
  {
    path: '/auth',
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path: '/auth/user',
        meta: {
          title: '用户管理',
        },
        component: lazy(() => import('../views/base/base-admin/index')),
        children: [
          {
            path: '/auth/user/add',
            meta: {
              title: '新增用户',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/index'),
            ),
          },
          {
            path: '/auth/user/detail',
            meta: {
              title: '用户详情',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/index'),
            ),
          },
          {
            path: '/auth/user/edit',
            meta: {
              title: '编辑用户',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/index'),
            ),
          },
        ],
      },
      {
        path: '/auth/org',
        meta: {
          title: '组织管理',
        },
        component: lazy(() => import('../views/base/base-admin/index')),
        children: [
          {
            path: '/auth/org/add',
            meta: {
              title: '新增组织',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/index'),
            ),
          },
          {
            path: '/auth/org/detail',
            meta: {
              title: '组织详情',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/index'),
            ),
          },
          {
            path: '/auth/org/edit',
            meta: {
              title: '编辑组织',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/index'),
            ),
          },
        ],
      },
      {
        path: '/auth/role',
        meta: {
          title: '角色管理',
        },
        component: lazy(() => import('../views/base/base-admin/index')),
        children: [
          {
            path: '/auth/role/detail',
            meta: {
              title: '角色详情',
            },
            component: lazy(() => import('../views/auth/role/AddOrEdit')),
          },
          {
            path: '/auth/role/add',
            meta: {
              title: '新增角色',
            },
            component: lazy(() => import('../views/auth/role/AddOrEdit')),
          },
          {
            path: '/auth/role/del',
            meta: {
              title: '删除角色',
            },
            component: lazy(() => import('../views/auth/role/AddOrEdit')),
          },
          {
            path: '/auth/role/edit',
            meta: {
              title: '编辑角色',
            },
            component: lazy(() => import('../views/auth/role/AddOrEdit')),
          },
        ],
      },
    ],
  },
  {
    path: '/data-quality-management',
    meta: {
      title: '数据质量管理',
    },
    component: lazy(() => import('../views/base/base-admin/index')),
    children: [
      {
        path: '/data-quality-management/production',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '生产系统管理',
        },
        children: [
          {
            path: '/data-quality-management/production/add',
            component: lazy(() =>
              import('../views/data-quality-management/library/Show/index'),
            ),
            meta: {
              title: '新增生产系统',
            },
          },
          {
            path: '/data-quality-management/production/detail',
            component: lazy(() =>
              import('../views/data-quality-management/library/Show/index'),
            ),
            meta: {
              title: '生产系统详情',
            },
          },
          {
            path: '/data-quality-management/production/edit',
            component: lazy(() =>
              import('../views/data-quality-management/library/Show/index'),
            ),
            meta: {
              title: '编辑生产系统',
            },
          },
        ],
      },
      {
        path: '/data-quality-management/standard',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '行业标准',
        },
        children: [
          {
            path: '/data-quality-management/standard/add',
            component: lazy(() =>
              import('../views/data-quality-management/standard/index'),
            ),
            meta: {
              title: '新增标准',
            },
          },
          {
            path: '/data-quality-management/standard/edit',
            component: lazy(() =>
              import('../views/data-quality-management/standard/index'),
            ),
            meta: {
              title: '编辑标准',
            },
          },
          {
            path: '/data-quality-management/standard/detail',
            component: lazy(() =>
              import('../views/data-quality-management/standard/index'),
            ),
            meta: {
              title: '标准详情',
            },
          },
        ],
      },
      {
        path: '/data-quality-management/control',
        component: lazy(() =>
          import('../views/data-quality-management/control/index'),
        ),
        meta: {
          title: '数据质量控制',
        },
        children: [
          {
            path: '/data-quality-management/control/productionProcess',
            component: lazy(() =>
              import('../views/data-quality-management/control/base'),
            ),
            meta: {
              title: '生产工艺',
            },
            children: [
              {
                path: '/data-quality-management/control/process/add',
                component: lazy(() =>
                  import('../views/data-quality-management/control/process'),
                ),
                meta: {
                  title: '新增生产工艺',
                },
              },
              {
                path: '/data-quality-management/control/process/edit',
                component: lazy(() =>
                  import('../views/data-quality-management/control/process'),
                ),
                meta: {
                  title: '编辑生产工艺',
                },
              },
              {
                path: '/data-quality-management/control/process/detail',
                component: lazy(() =>
                  import('../views/data-quality-management/control/process'),
                ),
                meta: {
                  title: '生产工艺详情',
                },
              },
            ],
          },
          {
            path: '/data-quality-management/control/account',
            component: lazy(() => import('../views/base/base-admin/index')),
            meta: {
              title: '核算边界',
            },
          },
          {
            path: '/data-quality-management/control/facilityDischarge',
            component: lazy(() => import('../views/base/base-admin/index')),
            meta: {
              title: '设施排放',
            },
          },
          {
            path: '/data-quality-management/control/discharge',
            component: lazy(() => import('../views/base/base-admin/index')),
            meta: {
              title: '数据确认方式',
            },
          },
          {
            path: '/data-quality-management/control/discharge',
            component: lazy(() => import('../views/base/base-admin/index')),
            meta: {
              title: '质量管理规定',
            },
          },
        ],
      },
    ],
  },
];

const routes: Routes[] = [
  // 登录、注册、
  {
    path: '/system',
    component: lazy(() => import('../layout/UserLayout')),
    meta: {
      title: '系统路由',
    },
    redirect: '/system/login',
    children: [
      {
        path: '/system/login',
        component: lazy(() => import('../views/system/login')),
        meta: {
          title: '碳中和智能化管理平台',
        },
      },
      {
        path: '/system/register',
        component: lazy(() => import('../views/system/register')),
        meta: {
          title: '注册',
        },
      },
      {
        path: '/system/result',
        component: lazy(() => import('../views/system/register')),
        meta: {
          title: '注册',
        },
      },
      {
        path: '/system/register-result/:id',
        auth: false,
        component: lazy(() => import('../views/system/registerResult')),
        meta: {
          title: '注册结果',
        },
      },
      {
        path: '/system/recovery-pwd',
        auth: false,
        component: lazy(() => import('../views/system/recoveryPwd')),
        meta: {
          title: '重置密码',
        },
      },
    ],
  },

  {
    path: '/',
    component: lazy(() => import('../layout/index')),
    meta: {
      title: '系统',
    },
    redirect: '/dashborad/intro',
    children: [
      ...menuRoutes,
      {
        path: '/industry/emission-source-dicts/emission-source/:id?',
        component: lazy(() =>
          import('@views/industry/EmissionSourceDict/EmissionSource'),
        ),
        meta: {
          title: '新增排放源',
        },
      },
      {
        path: '/dashborad/intro/userInfo',
        component: lazy(() => import('../views/system/userInfo')),
        show: true,
        meta: {
          title: '账户信息',
        },
      },
      {
        path: '/error',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            auth: false,
            component: lazy(() => import('../views/error/404')),
            meta: {
              title: '页面不存在',
            },
          },
          {
            path: '/error/403',
            auth: false,
            component: lazy(() => import('../views/error/403')),
            meta: {
              title: '暂无权限',
            },
          },
        ],
      },
      {
        path: '/*',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
      },
    ],
  },
];
export default routes;
