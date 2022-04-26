
## 测试用户创建
征信机构账号：15145831111/aaaa1111

人民银行：15145832222/aaaa2222

工商银行：15145833333/aaaa3333

核查机构1：15145834444/ aaaa4444

贷款机构：15145835555/aaaa5555
- [测试后台地址](https://cq-credit-dev.carbonstop.net/)

- [正式地址](https://cq-credit-test.carbonstop.net/)

#### 使用技术

- **UI 框架**: `react`、`react-hook`、`classnames`
- **UI 组件**: `antd`、`@ant-design/aliyun-theme`
- **数据管理**：`redux`、`react-redux`、`redux-thunk`、`redux-logger`
- **类型检查**：`typescript`
- **接口请求**：`axios`
- **cookies**：`js-cookie`
- **过渡动画**：`react-transition-group`

#### 菜单

```js
-首页介绍 - 系统介绍 - 权限管理 - 用户管理 - 角色管理 - 菜单管理;
```



#### 文件说明

```js
.
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── api
│   │   ├── request.ts // Axios 请求统一封装
│   │   └── requestMd.ts // md 单独使用的 axios 实例
│   ├── components // 系统组建和业务无关
│   │   ├── Breadcrumb // 面包屑导航
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── Hamburger // 菜单栏开关
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── HeaderSearch // 头部搜索
│   │   │   └── index.tsx
│   │   ├── LayoutHeader // 系统头部
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── LayoutNavBar // 系统头部右侧内容
│   │   │   ├── AvatarDropdown.tsx
│   │   │   ├── NavBarItem.tsx
│   │   │   ├── NavDropdown.tsx
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── LayoutSettings // 系统设置
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── LayoutSideBar // 侧边栏导航
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── NoticeIcon // 消息通知
│   │   │   ├── NoticeTab.less
│   │   │   ├── NoticeTab.tsx
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── SideMenu // 菜单栏
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── SidebarLogo // 菜单栏logo
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── TransitionMain // 主体内容过度
│   │       └── index.tsx
│   ├── hooks // 自定义 react-hook
│   │   └── count.ts
│   ├── index.tsx
│   ├── layout
│   │   ├── AsyncRoutes.tsx // 负责异步路由请求和渲染
│   │   ├── Auth.tsx  // 权限校验
│   │   ├── MainRoutes.tsx // 业务路由渲染
│   │   ├── UserLayout.less // 系统用户路由渲染
│   │   ├── UserLayout.tsx
│   │   ├── index.less
│   │   └── index.tsx // 系统主要layout
│   ├── react-app-env.d.ts
│   ├── router
│   │   ├── config.ts // 项目的路由配置
│   │   └── utils.ts // 路由相关的一些 utils
│   ├── serviceWorker.ts
│   ├── store  // redux
│   │   ├── index.ts
│   │   ├── module
│   │   │   ├── app.ts
│   │   │   ├── notice.ts
│   │   │   ├── settings.ts
│   │   │   └── user.ts
│   │   └── types.ts
│   ├── styles // 基本公用的样式
│   │   ├── index.less
│   │   ├── md.css
│   │   └── var.less
│   ├── typings // 类型申明
│   │   ├── global.d.ts
│   │   └── index.ts
│   ├── utils // 工具类
│   │   ├── cookie.ts
│   │   ├── store.ts
│   │   └── verifty.ts
│   └── views // 视图
│       ├── auth
│       │   ├── menu
│       │   │   ├── AddOrEditMenu.tsx
│       │   │   ├── index.tsx
│       │   │   └── service.ts
│       │   ├── role
│       │   │   ├── AddOrEdit.tsx
│       │   │   ├── editMenu.tsx
│       │   │   ├── index.tsx
│       │   │   └── service.ts
│       │   └── user
│       │       ├── AddOrEdit.tsx
│       │       ├── index.tsx
│       │       └── service.ts
│       ├── components
│       │   ├── BaseTable.tsx
│       │   ├── PageWrap.tsx
│       │   ├── SearchForm.tsx
│       │   └── index.less
│       ├── dashborad
│       │   └── intro
│       │       ├── index.tsx
│       │       └── intro.md
│       ├── error
│       │   ├── 403.tsx
│       │   └── 404.tsx
│       └── system
│           ├── component
│           │   ├── FormItem.tsx
│           │   ├── FormWrap.tsx
│           │   └── LoginItem.tsx
│           ├── login
│           │   ├── index.less
│           │   ├── index.tsx
│           │   └── service.ts
│           ├── recoveryPwd
│           │   ├── index.tsx
│           │   └── service.ts
│           ├── register
│           │   ├── index.tsx
│           │   └── service.ts
│           └── registerResult
│               └── index.tsx
└── tsconfig.json

37 directories, 89 files


### 测试环境

REACT_APP_API_URL=https://cq-credit-gateway-test.carbonstop.net
252
```
### 开发环境
```text
REACT_APP_API_URL=http://192.168.1.157:10001
```
## changeLog
>3月4 

```text
提交11个项目模版
fix：相关小的需求
```



PRD地址：http://wiki.tzj.pub/pages/viewpage.action?pageId=17171793

原型图地址：https://modao.cc/app/0Nwd27V4r421c0WyVAKWv 

设计稿地址：https://codesign.qq.com/workspace/board/DyopjDqbq69Ve1g

技术wiki地址：
http://wiki.tzj.pub/pages/viewpage.action?pageId=22937799

swagger地址
- knife4j
http://192.168.1.157:10001/doc.html#/home

- swagger
http://192.168.1.157:10001/swagger-ui/index.html


地址
本地地址：http://chongqing-credit-investigation-base-admin-2-memotion-new.carboncloud.com/dashborad/intro 

外网地址：http://cq-credit-test.carbonstop.net

测试环境地址：
线上环境地址：
开发环境账号
- 征信机构：13011195170/aaaa1115
- 贷款企业：16611112222/aaaa1111

测试环境
http://172.31.32.252:10001/doc.html

征信机构账号：13269550737/aaaa1111



