import { Moment } from 'moment';
import { request } from '@/api/request';

// 表格的每一列信息
export interface Column {
  operName: string;
  operTime: string;
  title: string;
  operLogFormat: string;
}

// 查看当前这条列表的详情
export interface ApiOperLogType {
  title: string | null; // 组织名称
  operName: string | null;
  beginTime: [Moment, Moment] | null; // 行业类别
  endTime: [Moment, Moment] | null; // 行业类别; // 行业编号
  pageSize?: number; // 行业规模
  pageNum?: number; // 行业所在地区
}
export interface SearchProps {
  dictType: string | null; // 字典标识
  dictName: string | null; // 字典名称
}
export interface CategoryProductProps {
  id?: number;
  guideId?: string;
  categoryId: string;
  categoryName: string;
  orderNum: number;
  key?: number;
}

export interface NavForm {
  guideName: string;
  isFloat: number;
  orderNum: number;
  id?: number;
  guideId?: number;
}

export interface EditGoodsProps {
  id?: number | string;
  goodsName: string | number;
  goodsId: string | number;
  goodsAttribute: string | number;
  type: string | number;
  goodsInfo: string | number;
  labels: string | number;
  productList: { productId: string }[];
  status?: string;
  priceList: {
    priceType: string;
    value: number | string;
    realPrice: number | string;
    standPrice: number | string;
  }[];
}
interface UsersType {
  userName?: string;
  beginTime?: string | Moment | null; // 行业类别
  endTime?: string | Moment | null; // 行业类别; // 行业编号
  status?: string;
}
interface Page {
  page: string | number;
  size: string | number;
}
// 组织管理列表
export function apiGetAllUsers(data: UsersType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/getAllUsers',
    data,
  });
}
// 组织列和搜素
interface CompanysType {
  companyName?: string; // 组织名称
  companyNum?: string; // 组织编号
  beginTime?: string | Moment | null; // 行业类别
  endTime?: string | Moment | null; // 行业类别; // 行业编号
  masterName?: string; // 负责人账号
  status?: string;
}
export function apiGetAllCompanys(data: CompanysType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/getAllCompanys',
    data,
  });
}
// 组织详情 包含订购的产品信息
interface ApiGetRoleInfoType {
  companyId: string;
}
interface ApiGetRoleInfoTypeRole {
  id: string;
}
// 组织详情 包含订购的产品信息

export function apiGetCompanyInfo(params: { companyId: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      company: {};
      companyProducts: [];
    };
  }>({
    method: 'get',
    url: '/system/saas/getCompanyInfo',
    params,
  });
}

export function apiGetRoleInfo(
  params: ApiGetRoleInfoType | ApiGetRoleInfoTypeRole,
) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      companyId: number;
      count: number;
      delflag: number;
      half: string[];
      permissionIds: string[];
      id: number;
      roleId: number;
      roleInfo: null | string;
      roleName: string;
      type: number;
      updateTime: null | string;
    };
  }>({
    method: 'get',
    url: '/system/saas/getRoleInfo',
    params,
  });
}
// 预置角色列表
export function apiGetGetRoles(params: { pageNo: number; pageSize: number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'get',
    url: '/system/role/page',
    params,
  });
}
export type TreeItemType = {
  cache?: boolean;
  component_path?: string;
  create_time?: string;
  creator?: null | string | number;
  creator_dept_id?: number;
  creator_name?: null;
  creator_organization_id?: number;
  creator_post_id?: number;
  description?: string;
  hidden?: string | boolean;
  icon?: string;
  id?: number;
  permissionId?: number;
  ident?: string;
  isFrame?: string;
  is_link?: string | boolean;
  is_need_id?: boolean;
  kind?: number;
  name?: string;
  orderNum: number;
  parentId?: null | number;
  status?: string | number;
  title?: string;
  tree_path?: string;
  update_time?: string;
  visible?: string | boolean;
  web_path?: string;
  children: TreeItemType[];
  key?: number | string | undefined;
  permissionName: string;
  menuId: number;
  menuType: string;
  value: number;
  auth?: number;
  base?: number;
  path?: string;
  perms?: null | string;
  query?: null | string;
  remark?: string;
  type?: string;
  updateBy?: string;
  updateTime?: string | null;
  component?: string;
};
// 权限层级树列表
export function apiGetAllPermissions() {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: TreeItemType[];
  }>({
    method: 'get',
    url: '/system/saas/getAllPermissions',
  });
}
// 新增权限点
interface AddPermissionType {
  parentId: number;
  type: string;
  permissionName: string;
  perms: string;
  path: string;
  component?: string;
  icon: string;
  isFrame: number;
  status: number | string;
  orderNum: number;
  remark: string;
}
export function apiAddPermission(data: AddPermissionType) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: TreeItemType[];
  }>({
    method: 'post',
    url: '/system/saas/addPermission',
    data,
  });
}
// 编辑
export function editAddPermission(data: AddPermissionType & { id: number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: TreeItemType[];
  }>({
    method: 'post',
    url: '/system/saas/editPermission',
    data,
  });
}
// 删除
export function apiDeleteTreeById(data: { permissionId: number }) {
  let newData = new FormData();
  newData.append('permissionId', `${data.permissionId}`);
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: TreeItemType[];
  }>({
    method: 'post',
    url: '/system/saas/deleteTreeById',
    data: newData,
  });
}
// 产品列表及搜索
export function apiGetProducts(data: Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/getProducts',
    data,
  });
}
// 新增产品
interface ApiAddProductType {
  productId: string;
  productName: string;
  productInfo: string;
  auth: number;
  permissionIds: number[];
  half: number[];
}
export function apiAddProduct(data: ApiAddProductType) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/addProduct',
    data,
  });
}
export function apiEditProduct(data: ApiAddProductType & { id: number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/editProduct',
    data,
  });
}
// 产品详情
// /system/saas/getProductInfo
export function apiGetProductInfo(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      companyId: number;
      count: number;
      delflag: number;
      half: string[];
      permissionIds: string[];
      id: number;
      roleId: number;
      roleInfo: null | string;
      roleName: string;
      type: number;
      updateTime: null | string;
    };
  }>({
    method: 'get',
    url: '/system/saas/getProductInfo',
    params,
  });
}
// 增加产品
// 新增字典
export function apiSystemTypeAdd(data: SearchProps) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'POST',
    url: '/system/type/add',
    data,
  });
}
// 修改字典
export function apiSystemTypeEdit(
  data: SearchProps & { id?: string | number | null },
) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'POST',
    url: '/system/type/edit',
    data,
  });
}
// 数据字典分类-查询字典分类数据列表
export function apiListByDictType(params: { dictType: string } & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'GET',
    url: '/system/data/listByDictType',
    params,
  });
}
export interface DataAddType {
  dictLabel: string;
  dictValue: string;
  dictType: string;
  dictSort: string;
  id?: string | number;
}
// 新增字典分类数据
export function apiDataAdd(data: DataAddType) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'post',
    url: '/system/data/add',
    data,
  });
}
// 修改字典分类数据
export function apiDataEdit(
  data: DataAddType & { id: string | number | null },
) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'POST',
    url: '/system/data/edit',
    data,
  });
}
// 导航列表
export function apiGetGuides(data: { page: number; size: number }) {
  return request<{
    code: number;
    msg: string;
    page?: number;
    pageSize?: number;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/getGuides',
    data,
  });
}

// 导航产品分类列表
export function apiCategoryList(data: {
  page: number;
  size: number;
  guideId: string | undefined;
}) {
  return request<{
    code: number;
    msg: string;
    page?: number;
    pageSize?: number;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/categoryList',
    data,
  });
}

// 导航产品列表列表
export function apiProductList(data: {
  page: number;
  size: number;
  guideId: string | undefined;
}) {
  return request<{
    code: number;
    msg: string;
    page?: number;
    pageSize?: number;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/categoryProducts',
    data,
  });
}

// 新增导航
export function apiAddGuide(data: NavForm) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/addGuide',
    data,
  });
}

// 编辑导航
export function apiEditGuide(data: NavForm) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/editGuide',
    data,
  });
}
export function apiProjectAuditPage(params: UserPageType & EnterPricePageType) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'get',
    url: '/reduction/project/audit/page',
    params,
  });
}
export function apiProjectDataPage(params: UserPageType & EnterPricePageType) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'get',
    url: '/reduction/project/data/page',
    params,
  });
}
// 删除项目
export function apiDeleteProjectInfo(data: { id: number }) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/reduction/project/info/delete',
    data,
  });
}
//项目报送人行
export function apiDeleteProjectCcpbc(data: { id: number }) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/reduction/project/audit/ccpbc',
    data,
  });
}
/**
 * 归档项目
 * **/
export function apiInfoArchivec(data: { id: number }) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/reduction/project/audit/archive',
    data,
  });
}
/**
 * 生成评估报告
 */
export function apiGenerate(data: { projectId: string }) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/report/appraisal/report/generate',
    data,
  });
}
// 项目附件列表
export function apiProjectInfoFileList(params: { id: number }) {
  return request<{
    code: number;
    msg: string;
    data: {
      feasibilityReportFile: [];
      projectApprovalFile: [];
      envAssessmentFile: [];
      envApprovalFile: [];
      gridConnectFile: [];
      elecUpFile: [];
      elecDownFile: [];
    };
  }>({
    method: 'get',
    url: '/reduction/project/query/fileList',
    params,
  });
}
// 导航产品编辑

// export function apiEditCategoryProduct(data: ProductProps) {
//   return request<{
//     code: number;
//     msg: string;
//     data: number;
//   }>({
//     method: 'POST',
//     url: '/system/saas/editCategoryProduct',
//     data,
//   });
// }
// 分类的修改
export function apiEditCategory(data: CategoryProductProps) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/editCategory',
    data,
  });
}
// 分类的增加
export function apiAddCategory(data: CategoryProductProps) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/addCategory',
    data,
  });
}

// 分类的删除
export function apiDeleteCategory(data: FormData) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/deleteCategory',
    data,
  });
}
// 导航产品新增
export function apiAddCategoryProduct(data: {
  guideId?: string | number;
  categoryId: string | number;
  productId: string | number;
  orderNum: string | number;
}) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/addCategoryProduct',
    data,
  });
}

// 导航产品编辑
export function apiEditCategoryProduct(data: {
  id?: number;
  guideId?: string | number;
  categoryId: number | string;
  productId: number | string;
  orderNum: number | string;
}) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/editCategoryProduct',
    data,
  });
}

// 导航产品删除
export function apiDeleteCategoryProduct(data: FormData) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/deleteCategoryProduct',
    data,
  });
}

// 商品列表及搜索

export function apiGetGoods(data: {
  page: number;
  size: number;
  goodsName?: string;
  goodsId?: string;
  status?: number | string;
}) {
  return request<{ [key: string]: any }>({
    method: 'POST',
    url: '/system/saas/getGoods',
    data,
  });
}

// 商品启用禁用

export function apiUpdateGoodsStatus(data: {
  id: number;
  status: number | string; // 0开启 1禁用
}) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/updateGoodsStatus',
    data,
  });
}

// 新增商品
export function apiAddGoods(data: EditGoodsProps) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/addGoods',
    data,
  });
}

// 编辑商品
export function apiEditGoods(data: EditGoodsProps) {
  return request<{
    code: number;
    msg: string;
    data: number;
  }>({
    method: 'POST',
    url: '/system/saas/editGoods',
    data,
  });
}

// 商品详情
export function apiGoodsInfo(params: { goodsId: string }) {
  return request<{
    code: number;
    msg: string;
    data: {
      id: number;
      goodsName: string;
      goodsId: string;
      goodsAttribute: string;
      goodsInfo: string;
      labels: string;
      type: number | string;
      mode: string | null;
      status: string;
      orderNum: string | null;
      delflag: number;
      createBy: string | null;
      createTime: string;
      updateBy: string | null;
      updateTime: string;
      page: number;
      size: number;
      sort: string | null;
      productList: [];
      priceList: [];
    };
  }>({
    method: 'GET',
    url: '/system/saas/goodsInfo',
    params,
  });
}

// 订单列表及搜索
interface OrderType {
  orderId?: string;
  companyNum?: string;
  beginTime?: string | Moment | null; // 行业类别
  endTime?: string | Moment | null; // 行业类别; // 行业编号
  status?: string; // 0 待支付 1 已完成
  auditState?: string; // 0待审核，1通过，2未通过；
  testFlag?: string; // 是否测试： 1是测试，0正常
}
export function apigetOrders(data: OrderType & Page) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/getOrders',
    data,
  });
}
export function apiUpdateProductStatus(data: { id: string; status: string }) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/updateProductStatus',
    data,
  });
}
// 商品列表及搜索
interface GetGoodsType {
  goodsName?: string;
  goodsId?: string;
  status?: string;
}
export function apigetGoods(data: GetGoodsType & Page) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/getGoods',
    data,
  });
}
// 新增订单接口

interface AddOrderType {
  testFlag?: string;
  totalMoney?: string;
  recieveMoney?: string | null;
  realMoney?: string | null;
  cutMoney?: string | null;
  companyName?: string;
  companyNum?: string;
  companyId?: string;
  payTime?: string | Moment | null; // 行业类别
  remark?: string;
  orderGoods: Partial<GoogType>[];
}
export function apiaddOrder(data: AddOrderType) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/addOrder',
    data,
  });
}
// 订单详情
export interface CurrentType {
  goodsName: string;
  id: string;
  sourceType?: string | number | undefined;
  sourceName?: string | undefined;
  dictValue?: string | undefined;
  dictLabel?: string | undefined;
  companyName?: string;
  companyId?: string;
  companyNum?: string;
  goodsId?: string;
  mode: string;
  priceId?: null | string;
  priceType?: null | string;
  value?: null | string;
  goodsPeriod?: null | string;
  totalMoney?: null | string;
  recieveMoney?: null | string;
  realMoney?: null | string;
  cutMoney?: null | string;
  priceList: {
    priceType?: string;
    value?: number | string;
    realPrice?: number | string;
    standPrice?: number | string;
    priceId?: string;
  }[];
}
export interface GoogType {
  goodsName: string;
  id: string;
  goodsId: string;
  mode: string;
  priceId: null | string;
  priceType: null | string;
  value: null | string;
  goodsPeriod: null | string;
  totalMoney: null | string;
  recieveMoney: string | null;
  realMoney: string | null;
  cutMoney: string | null;
  priceList: {
    priceType?: string;
    value?: number | string;
    realPrice?: number | string;
    standPrice?: number | string;
    priceId?: string;
  }[];
}
export function apiOrderInfo(params: { orderId: string }) {
  return request<{
    code: number;
    msg: string;
    data: {
      totalMoney: string;
      testFlag: string;
      recieveMoney: string;
      realMoney: string;
      cutMoney: string;
      companyNum: string;
      companyName: string;
      payTime: Moment;
      remark: string;
      companyId: string;
      id: string;
      auditState: string;
      orderGoods: GoogType[];
      orderAuditRecords: [];
    };
  }>({
    method: 'get',
    url: '/system/saas/orderInfo',
    params,
  });
}
// 订单审核
export function apiAuditOrder(data: { orderId: string }) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/auditOrder',
    data,
  });
}
// 订单编辑
export function apiEditOrder(
  data: AddOrderType & { id: string; orderId: string },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      rows: [];
    };
  }>({
    method: 'post',
    url: '/system/saas/editOrder',
    data,
  });
}

//分页查询企业变更审核
interface EnterPricePageType {
  pageNo?: number;
  pageSize?: number;
}
export function apiEnterprisePage(
  params: { likeOrgName?: string } & EnterPricePageType,
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'GET',
    url: '/system/enterprise/audit/page',
    params,
  });
}
// 组织管理
interface SystemOrgPageType {
  contactMobile?: string;
  startDate?: string;
  endDate?: string;
  likeOrgName?: string;
  orgStatus?: string;
  orgType?: string;
}
export function apiSystemOrgPage(
  params: SystemOrgPageType & EnterPricePageType,
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'GET',
    url: '/system/org/page',
    params,
  });
}
// /system/org/tree
interface OrgTreeType {
  likeOrgName?: string;
  orgType?: number;
}
export function apiOrgTree(params: OrgTreeType) {
  return request<{
    code: number;
    msg: string;
    data: {
      orgList: { orgName: string; id: number }[];
      orgType: number;
      orgType_name: string;
    }[];
  }>({
    method: 'GET',
    url: '/system/org/tree',
    params,
  });
}
export function apiOrgTreeCheck(params: OrgTreeType) {
  return request<{
    code: number;
    msg: string;
    data: {
      orgList: { orgName: string; id: number }[];
      orgType: number;
      orgType_name: string;
    }[];
  }>({
    method: 'GET',
    url: '/system/org/treeCheck',
    params,
  });
}
///system/org/create
interface OrgCreateType {
  bankOrgId?: string;
}
export function apiOrgCreate(data: OrgCreateType) {
  return request<{
    code: number;
    msg: string;
    data: {
      orgList: { orgName: string }[];
      orgType: number;
      orgType_name: string;
    }[];
  }>({
    method: 'post',
    url: '/system/org/create',
    data,
  });
}
///system/user/page
// 用户 分页查询
interface UserPageType {
  likeOrgName?: string;
  mobile?: string;
  userStatus?: string;
}
export function apiUserPage(params: UserPageType & EnterPricePageType) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'get',
    url: '/system/user/page',
    params,
  });
}
// /reduction/project/info/page
//分页查询项目信息
interface ProjectInfoPageType {
  likeProjectName?: string;
}
export function apiProjectInfoPage(
  params: ProjectInfoPageType & EnterPricePageType,
) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'get',
    url: '/reduction/project/info/page',
    params,
  });
}
interface UserStatusType {
  enableStatus: string;
  id: string;
}
export function apiUserStatus(data: UserStatusType) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'post',
    url: '/system/user/status',
    data,
  });
}
//reduction/project/audit/cc
// 项目抄送
export function apiAuditCc(data: { id: number; orgIdList: string[] }) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'post',
    url: '/reduction/project/audit/cc',
    data,
  });
}
//项目抄送核查机构
export function apiAuditCcheck(data: { id: number; orgIdList: string[] }) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'post',
    url: '/reduction/project/query/ccheck',
    data,
  });
}
// 查询项目信息
export function apiProjectPage(params: { id: number; orgIdList: string[] }) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'GET',
    url: '/reduction/project/query/projectPage',
    params,
  });
}
// 参数配置 - 分页查询
export function apiprojectParamPage(params: EnterPricePageType) {
  return request<{
    code: number;
    msg: string;
    data: {
      total: number;
      list: [];
    };
  }>({
    method: 'GET',
    url: '/system/projectParam/page',
    params,
  });
}
export function apiprojectParamPageList(params: EnterPricePageType) {
  return request<{
    code: number;
    msg: string;
    data: [];
  }>({
    method: 'GET',
    url: '/report/appraisal/report/list',
    params,
  });
}
// 监测数据列表
export function apiProjectDataList(
  params: { projectId: string } & EnterPricePageType,
) {
  return request<{
    code: number;
    msg: string;
    data: [];
  }>({
    method: 'GET',
    url: '/report/monitor/report/list',
    params,
  });
}
//參數配置详情
export function apiConfigDataInfo(params: { id: string; type: string }) {
  return request<{
    code: number;
    msg: string;
    data: [];
  }>({
    method: 'GET',
    url: '/system/projectParam/configDataInfo',
    params,
  });
}
///system/projectParam/configData
export function apiConfigData(data: {
  type: string;
  reductionParamProject: {
    id: number;
    paramId: number;
    type: number;
    reductionType: number;
    reductionType_name: string;
    checkId: number;
    checkName: string;
    checkType: number;
  }[];
  reductionType: number;
  paramId: string;
}) {
  return request<{
    code: number;
    msg: string;
    data: [];
  }>({
    method: 'POST',
    url: '/system/projectParam/configData',
    data,
  });
}

// 删除角色
export function apiRoleDelete(data: { id: number }) {
  return request<{
    code: number;
    msg: string;
    data: [];
  }>({
    method: 'POST',
    url: '/system/role/delete',
    data,
  });
}
// 修改项目金额
export function apiModifyAmount(data: {
  id: number;
  loanAmount: string;
  totalAmount: string;
}) {
  return request<{
    code: number;
    msg: string;
    data: [];
  }>({
    method: 'POST',
    url: '/reduction/project/info/modify/amount',
    data,
  });
}

// 监测数据列表
export function apiReportProjectDataList(params: { projectId: number }) {
  return request<{
    code: number;
    msg: string;
    data: [];
  }>({
    method: 'get',
    url: '/reduction/project/data/dateList',
    params,
  });
}
// 生成监测报告
export function apiReportGenerate(data: {
  projectId: number;
  dataIdList: string[];
}) {
  return request<{
    code: number;
    msg: string;
    data: [];
  }>({
    method: 'post',
    url: '/report/monitor/report/generate',
    data,
  });
}
// 文件URL
export function apiSystemFileUrl(params: {
  objKey?: string;
  name: string;
  fileName?: string;
}) {
  return request<{
    code: number;
    msg: string;
    data: string;
  }>({
    method: 'get',
    url: '/file/system/file/url',
    params,
  });
}
export function apiSystemFilePreviewUrl(params: {
  objKey?: string;
  name: string;
  fileName?: string;
}) {
  return request<{
    code: number;
    msg: string;
    data: string;
  }>({
    method: 'get',
    url: '/file/system/file/preview',
    params,
  });
}
/**
 *
 *获取 文件base64
 * @export
 * @param {{
 *   objKey?: string;
 *   name: string;
 *   fileName?: string;
 * }} params
 * @return {*}
 */
export function apiSystemFilePreviewBase64(params: {
  objKey?: string;
  name: string;
  fileName?: string;
}) {
  return request<{
    code: number;
    msg: string;
    data: string;
  }>({
    method: 'get',
    url: '/file/system/file/base64',
    params,
  });
}
