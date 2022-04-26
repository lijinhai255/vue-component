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
    path: '/dashborad',
    meta: {
      title: '首页',
    },
    redirect: '/dashborad/intro',
    children: [
      {
        path: '/dashborad/intro',
        component: lazy(() => import('../views/dashborad/intro')),
        meta: {
          title: '系统介绍',
        },
      },
      {
        path: '/auth/person',
        component: lazy(() => import('../views/person/index')),
        meta: {
          title: '个人中心',
        },
      },
    ],
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
            path: '/auth/org/examine',
            meta: {
              title: '组织审核',
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
      {
        path: '/auth/route',
        meta: {
          title: '菜单权限',
        },
        component: lazy(() => import('../views/auth/routeAuth')),
      },
      {
        path: '/auth/config',
        meta: {
          title: '参数配置',
        },
        component: lazy(() => import('../views/base/base-admin/index')),
        children: [
          {
            path: '/auth/config/edit',
            meta: {
              title: '编辑参数配置',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/config-detail'),
            ),
          },
          {
            path: '/auth/config/detail',
            meta: {
              title: '参数配置详情',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/config-detail'),
            ),
          },
          {
            path: '/auth/config/metion-detail',
            meta: {
              title: '参数监测详情',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/config-detail'),
            ),
          },
          {
            path: '/auth/config/metion-edit',
            meta: {
              title: '参数监测编辑',
            },
            component: lazy(() =>
              import('../views/base/base-admin/Show/config-detail'),
            ),
          },
        ],
      },
      {
        path: '/auth/history',
        meta: {
          title: '操作日志',
        },
        component: lazy(() => import('../views/auth/history')),
      },
    ],
  },
  {
    path: '/business-infor',
    meta: {
      title: '企业信息管理',
    },
    component: lazy(() => import('../views/base/base-admin/index')),
    children: [
      {
        path: '/business-infor/detail',
        component: lazy(() => import('@views/system/register/index')),
        meta: {
          title: '企业基本信息',
        },
      },
      {
        path: '/business-infor/list',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '企业变更审核',
        },
        children: [
          {
            path: '/business-infor/list/exam',
            component: lazy(() => import('../views/system/register')),
            meta: {
              title: '企业信息变更审核',
            },
          },
          {
            path: '/business-infor/list/detail',
            component: lazy(() => import('@views/system/register/index')),
            meta: {
              title: '企业信息变更详情',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/mession-reduction',
    meta: {
      title: '减排项目',
    },
    component: lazy(() => import('../views/base/base-admin/index')),
    children: [
      {
        path: '/mession-reduction/info',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '项目信息',
        },
        children: [
          {
            path: '/mession-reduction/info/add',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '新增项目',
            },
          },
          {
            path: '/mession-reduction/info/detail',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '项目信息详情',
            },
          },
          {
            path: '/mession-reduction/exam/monitor-detail',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '监测项目详情',
            },
          },
          {
            path: '/mession-reduction/exam/exam-detail',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '项目详情',
            },
          },
          {
            path: '/mession-reduction/info/edit',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '编辑项目信息',
            },
          },
        ],
      },
      {
        path: '/mession-reduction/exam',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '项目审核',
        },
        children: [
          {
            path: '/mession-reduction/exam/examine-info',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '审核项目数据',
            },
          },
          {
            path: '/mession-reduction/exam/mession-monitor',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '监测项目审核',
            },
          },
          {
            path: '/mession-reduction/exam/detail',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '项目数据详情',
            },
          },
        ],
      },
      {
        path: '/mession-reduction/query',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '项目查询',
        },
        children: [
          {
            path: '/mession-reduction/query/after-report',
            component: lazy(() => import('../views/base/base-admin/index')),
            meta: {
              title: '事后预估报告',
            },
          },
        ],
      },
      {
        path: '/mession-reduction/assessment',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '评估报告',
        },
      },
      {
        path: '/mession-reduction/disclosure',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '披露报告',
        },
      },
    ],
  },
  {
    path: '/mession-monitor',
    meta: {
      title: '碳减排监测',
    },
    component: lazy(() => import('../views/base/base-admin/index')),
    children: [
      {
        path: '/mession-monitor/info',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '监测数据',
        },
        children: [
          {
            path: '/mession-monitor/info/add',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '新建监测数据',
            },
          },
          {
            path: '/mession-monitor/info/detail',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '监测数据详情',
            },
          },
          {
            path: '/mession-monitor/info/edit',
            component: lazy(() =>
              import('../views/emission/library/Show/index'),
            ),
            meta: {
              title: '监测数据编辑',
            },
          },
        ],
      },
      {
        path: '/mession-monitor/exam',
        component: lazy(() => import('../views/base/base-admin/index')),
        meta: {
          title: '监测报告',
        },
      },
    ],
  },
  {
    path: '/preview',
    meta: {
      title: '预览',
    },
    component: lazy(() => import('../views/preview')),
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
          title: '企业碳减排账户管理系统',
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
        path: '/auth/role/addRole',
        meta: {
          title: '新增角色',
        },
        component: lazy(() => import('../views/auth/role/AddOrEdit')),
      },
      {
        path: '/auth/role/editRole',
        meta: {
          title: '编辑角色',
        },
        component: lazy(() => import('../views/auth/role/AddOrEdit')),
      },
      {
        path: '/auth/role/roleDetail/:id?',
        meta: {
          title: '详情',
        },
        component: lazy(() => import('../views/auth/role/detail')),
      },
      {
        path: '/auth/user/addUser',
        meta: {
          title: '新增账号',
        },
        component: lazy(() => import('../views/auth/user/AddOrEdit')),
      },
      {
        path: '/auth/user/editUser',
        meta: {
          title: '编辑账号',
        },
        component: lazy(() => import('../views/auth/user/AddOrEdit')),
      },
      {
        path: '/auth/user/checkUser',
        meta: {
          title: '查看账号',
        },
        component: lazy(() => import('../views/auth/user/AddOrEdit')),
      },
      {
        path: '/basic-datas/dict/:id?',
        component: lazy(() => import('@views/Dict/Show')),
        meta: {
          title: '详情',
        },
      },
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
