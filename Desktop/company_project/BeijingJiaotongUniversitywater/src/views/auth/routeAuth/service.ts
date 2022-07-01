export interface ApiTreeResult {
  count: number;
  next: string;
  previous?: any;
  results?: TreeAddForm[];
  data: TreeAddForm[];
}
// 根据Id分配给映射的对象
export interface TreeIdByKey {
  [key: number]: TreeAddForm;
}

export interface TreeAddForm {
  id: number; // id 唯一标识
  menuType: string | number; // 类型（M目录 C菜单 F按钮）
  path?: string; // 路由地址
  status?: string; // 权限状态
  remark?: string; // 备注
  perms?: string; // 权限标识
  menuId: string | number;
  value: string | number;
  title: string; // antd 框架需要显示的title
  key: string; // 数据默认不携带，初始化添加字段 唯一的标识
  kind: number; // 菜单类型 0, 按钮类型 1
  name: string; // 名称
  ident: string; // 标识
  order_num: number; // 顺序
  secondary_org_id?: number | string | null; // 父级ID
  orderNum: number; // 顺序
  parentId?: number | string | null; // 父级ID
  parent?: number | string | null; // 父级ID
  web_path?: string; // 前端路由地址
  component_path: string; // 前端组件地址
  icon?: string; // 前端图标地址
  description?: string; // 备注信息
  children: TreeAddForm[]; // 子级
  has_permission?: boolean; // 当前菜单是否选中
  is_link: string; // 是否碳阻迹计算路由
  hidden: string; // 是否隐藏
  isFrame: string; // 是否外连接
  visible: string; // 侧边栏是否显示
  tree_path?: string; // 具体路径
  type?: string;
  permissionName?: string;
}
