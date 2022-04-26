/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
import { request } from '@/api/requestMd';
import { RcFile } from 'antd/lib/upload/interface';

// 12 数据字典分类-根据字典标识查询字典分类-批量查询
export function apiListALLByDictTypeBatch(params: { dictTypes: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {};
    total: number;
  }>({
    method: 'get',
    url: '/system/data/listALLByDictTypeBatch',
    params,
  });
}
// 标签 分类列表
interface ByLabelType {
  dictType: string;
  dictLabel?: string;
  dictValue?: string;
}
export function apiQsueryListBylableh(params: ByLabelType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/enum/queryListBylable',
    params,
  });
}
// 13 根据字典标识查询字典枚举值-批量查询
export function apiMnumListALLByDictTypeBatch(params: { dictTypes: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: { [key: string]: any };
    total: number;
  }>({
    method: 'get',
    url: '/system/enum/listALLByDictTypeBatch',
    params,
  });
}
//因子库–>排放因子-组织因子产品配置-获取产品列表
export function apiGetAllProducts() {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: { productId: string; id: string; productName: string }[];
    total: number;
  }>({
    method: 'get',
    url: '/system/prd/getAllProducts',
  });
}
interface BusinessSearchProps {
  businessName?: string;
  businessLabel?: string;
  status?: string;
}
interface Page {
  pageSize: string | number;
  pageNum: string | number;
}
// 14  因子库–>排放因子-排放因子业务方-查询排放因子业务方列表
export function apiBusinessList(params: BusinessSearchProps & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/business/list',
    params,
  });
}
// 15  因子库–>排放因子-排放因子业务方-新增排放因子业务方
interface BusinessAddProps {
  businessName: string;
  businessLabel: string;
  remark: string;
}
export function apiBusinessAdd(data: BusinessAddProps) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'POST',
    url: '/system/business/add',
    data,
  });
}
// 16 因子库–>排放因子-排放因子业务方-修改排放因子业务方
export function apiBusinessEdit(
  data: BusinessAddProps & { id: string | number },
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
    url: '/system/business/edit',
    data,
  });
}
// 17 因子库–>排放因子-排放因子业务方-获取排放因子业务方详细信息
export function apiBusinessQuery(params: { id: string | number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/business/query',
    params,
  });
}
// 18. 因子库–>排放因子-排放因子业务方-启用/禁用排放因子业务方
export function apiBusinessStatus(data: { id: string | number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'POST',
    url: '/system/business/editBusinessStatus',
    data,
  });
}
//= ================组织因子配置==================//
// 20. 因子库–>排放因子-组织因子配置-查询组织列表
interface CompanyType {
  companyPhone?: string;
  companyId?: string;
  companyName?: string;
}
export function apiCompanyList(params: CompanyType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/prd/companyList',
    params,
  });
}
// 20因子库–>排放因子-组织因子产品配置-查询组织因子产品配置列表
interface ProListType {
  companyId: string;
}
export function apiProductList(params: ProListType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/prd/list',
    params,
  });
}
// 因子库–>排放因子-组织因子产品配置-获取组织详细信息
export function apiQueryCompany(params: ProListType) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      companyName: string;
      companyId: string;
      companyPhone: string;
      companyNum: string;
    };
  }>({
    method: 'get',
    url: '/system/prd/queryCompany',
    params,
  });
}
// 21. 因子库–>排放因子-组织因子产品配置-获取组织因子产品配置详细信息
export function apiProQuery(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: { labelIds: string };
    total: number;
  }>({
    method: 'get',
    url: '/system/prd/query',
    params,
  });
}
// 22. 因子库–>排放因子-组织因子产品配置-新增组织因子产品配置
interface ProAddType {
  productId: string;
  labelIds: string;
  companyId: string;
}
export function apiProAdd(data: ProAddType) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'POST',
    url: '/system/prd/add',
    data,
  });
}
// 23. 因子库–>排放因子-组织因子产品配置-修改组织因子产品配置

export function apiProEdit(data: ProAddType & { id: string | number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'POST',
    url: '/system/prd/edit',
    data,
  });
}
// 24. 因子库–>排放因子-组织因子产品配置-删除组织因子产品配置
export function apiProRemove(params: { id: string | number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'delete',
    url: '/system/prd/remove',
    params,
  });
}

// 因子库–>排放因子-我的因子单据-查询排放因子数据记录列表
interface MarkListType {
  name?: string;
  factorMarkType?: string;
  auditStatus?: string;
}
export function apiMarkList(params: MarkListType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/mark/list',
    params,
  });
}
// 新增获取数值和公式类 表格相关数据
export interface ColUmsType {
  ratedPower?: string;
  num?: string;
}
export interface GasType {
  activeUnit?: string;
  id?: number;
  paraName?: string;
  paraType?: string;
  paraUnit?: string;
  paraValue?: string;
  type?: string;
}
export interface Formul {
  activeUnit?: string;
  factorUnit?: string;
  factorUnitM?: any;
  factorValue?: string;
  greenhouseGases?: string;
  greenhouseGasesType?: string;
  id?: number;
  type?: string;
}
export function apiSourceList() {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      gasData: ColUmsType[];
      formulaData: {
        carbonFactorFormula: GasType[];
        carbonFactorGas: Formul[];
      };
    };
    total: number;
  }>({
    method: 'get',
    url: '/system/gas/listGas',
  });
}
// 因子库–>排放因子-我的因子单据-选择因子来源-查询排放因子来源数据列表
interface ApiSourceList2Type {
  institution?: string;
  source?: string;
}
export function apiSourceList2(params: ApiSourceList2Type & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/source/list',
    params,
  });
}
// 因子库–>排放因子-我的因子单据-新增排放因子数据记录
export interface ApiMarkAddType {
  activeUnit: string; //	活动数据单位	无
  area: string; //	发布地区	无
  business: string; //	适用行业	不为空
  carbonFactorFormula: string; //	公式类 参数值列表 list	无
  carbonFactorGas: string; //	数值类 列表 list	无
  countries: string; //	发布国家/组织	不为空
  description: string; //	场景描述	无
  facilities: string; //	设施/活动	无
  factorType: string; //	因子类型 1 数值类 2 公式类	不为空
  factorUnit: string; //	因子单位-分子	无
  factorUnitM: string; //	因子单位-分母	无
  factorValue: string; //	因子数值	不为空
  greenhouseGases: string; //	温室气体	无
  greenhouseGasesType: string; //	温室气体类型	无
  institution: string; //	发布机构	不为空
  institutionShort: string; //	发布机构(简称)	无
  labelFactor: string; //	标签因子	不为空
  name: string; //	排放因子名称	不为空
  otherName: string; //	别名	无
  paraName: string; //	参数名称	无
  paraType: string; //	参数类型 1 参数值 2 计算系数	无
  paraUnit: string; //	参数单位	无
  paraValue: string; //	参数值	不为空
  source: string; //	来源文件名称	无
  sourceLanguage: string; //	源语言	无
  sourceLanguageName: string; //	源语言名称	无
  sourceLevel: string; //	来源类别	不为空
  sourceUrl: string; //	来源文件地址	无
  type: string;
  url: string;
  year?: string;
  factorCompanyId?: string;
  sourceFileList: { name: string; url?: string }[];
}
export function apiMarkAdd(
  data: Partial<ApiMarkAddType>,
  url?: string,
  factorCompanyId?: string,
) {
  let queryUrl = '/system/mark/add';
  if (url && url?.indexOf('copy') >= 0 && factorCompanyId) {
    queryUrl = '/system/mark/addFactorMarkByCopy';
    data.factorCompanyId = factorCompanyId;
  }
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'post',
    url: queryUrl,
    data,
  });
}

//  因子库–>排放因子-我的因子单据-查询排放因子审核列表
interface QueryAuditListType {
  name?: string;
  auditStatus?: string;
  auditUser?: string;
  createBy?: string;
  factorMarkType?: string;
}
export function apiQueryAuditList(data: QueryAuditListType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'post',
    url: '/system/mark/queryAuditList',
    data,
  });
}

// 因子库–>排放因子-我的因子单据-获取排放因子数据记录详细信息
interface AuditResultObjType {
  '0': string;
  '1': string;
  '2': string;
}
export interface AuditInfo {
  auditList?: [];
  auditResult?: keyof AuditResultObjType;
  modifyRecords?: string;
  factorIsNew?: string;
}
// system/company/query 组织排放因子数据详情
export function apiMarkQuery(params: { id: string }, url?: string) {
  let apiUrl = '';
  if (url && url?.indexOf('emission-factor/examine') >= 0) {
    apiUrl = '/system/mark/query';
  }
  if (url && url.indexOf('emission-factor/myemission') >= 0) {
    ///
    apiUrl = '/system/mark/query';
  }
  if (url && url.indexOf('/emission-factor/library/') >= 0) {
    // 排放因子库
    apiUrl = '/system/factor/query';
  }
  if (url && url.indexOf('/emission-factor/organization/') >= 0) {
    // 排放因子库
    apiUrl = '/system/company/query';
  }
  if (url && url.indexOf('/emission-factor/organization/copy') >= 0) {
    // 排放因子库
    apiUrl = '/system/company/getFactorCompanyInfo';
  }
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      year: string;
      business: string;
      auditInfo: AuditInfo;
      labelFactor: string;
      gasData: ColUmsType[];
      formulaData: {
        carbonFactorFormula: GasType[];
        carbonFactorGas: Formul[];
      };
      sourceFileList: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
    };
    total: number;
  }>({
    method: 'get',
    url: apiUrl,
    params,
  });
}
// 因子库–>排放因子-排放因子库-获取排放因子数据详细信息
export function apiFactorQuery(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      business: string;
      auditInfo: AuditInfo;
      labelFactor: string;
      gasData: ColUmsType[];
      formulaData: {
        carbonFactorFormula: GasType[];
        carbonFactorGas: Formul[];
      };
    };
    total: number;
  }>({
    method: 'get',
    url: '/system/factor/query',
    params,
  });
}
// 因子库–>排放因子-我的因子单据-获取排放因子数据记录详细信息
export function apiMarkEdit(
  data: Partial<ApiMarkAddType & { id: string; factorId: string }>,
  url?: string,
  searchId?: string,
) {
  let pathUrl = '/system/mark/edit';
  if (url && url?.indexOf('emission-factor/library/edit') >= 0) {
    pathUrl = '/system/mark/addByFactor';
    data.factorId = searchId;
  } else {
    data.id = searchId;
  }

  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      business: string;
      labelFactor: string;
      gasData: ColUmsType[];
      formulaData: {
        carbonFactorFormula: GasType[];
        carbonFactorGas: Formul[];
      };
    };
    total: number;
  }>({
    method: 'POST',
    url: pathUrl,
    data,
  });
}
// 因子库–>排放因子-我的因子单据-查询排放因子审核列表
interface ApiAuditAddType {
  factorMarkId?: string;
  auditResult?: string;
  auditContent?: string;
}
export function apiAuditAdd(data: ApiAuditAddType) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      business: string;
      labelFactor: string;
      gasData: ColUmsType[];
      formulaData: {
        carbonFactorFormula: GasType[];
        carbonFactorGas: Formul[];
      };
    };
    total: number;
  }>({
    method: 'POST',
    url: '/system/audit/add',
    data,
  });
}
// 因子库–>排放因子-排放因子库-查询排放因子数据列表
interface ApiFactorListType {
  name?: string;
  facilities?: string;
  business?: string;
  factorType?: string; // 因子类型 1 数值类 2 公式类
  sourceLevel?: string;
  countries?: string;
  status?: string;
}
export function apiFactorList(params: ApiFactorListType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/factor/list',
    params,
  });
}
//  因子库–>排放因子-排放因子库-启用/禁用排放因子
export function apiEditFactorStatus(data: { id: number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'post',
    url: '/system/factor/editFactorStatus',
    data,
  });
}
// 组织排放因子 列表
interface ApiPompanyListType {
  name?: string;
  facilities?: string;
  business?: string;
  sourceLevel?: string;
}
export function apiPompanyList(params: ApiPompanyListType & Page) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    rows: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/company/list',
    params,
  });
}

// . 因子库–>排放因子-因子概览-因子概览数据
export interface SourceType {
  sourceList?: { mapy: string[]; mapx: string[] }; // 排放因子类别
  dayNewFactorCounts?: number; // 今日新增因子
  auditFactorCounts?: number; // 待审核因子
  monthRankingList?: []; // 月榜
  monthNewFactorCounts?: number; // 本月新增
  allFactorCounts?: number; // 总条数
  allRankingList?: []; // 总榜
  weekRankingList?: []; // 周榜
}
export function apiGetFactorStatisticalData() {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: { data: SourceType };
    total: number;
  }>({
    method: 'get',
    url: '/system/factor/getFactorStatisticalData',
  });
}
// 因子库–>排放因子-组织排放因子-获取组织排放因子数据详细信息
// /system/enum/listALLByDictTypeData
export function apiListALLByDictTypeData(params: { dictType: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/enum/listDictTypeAndDataByType',
    params,
  });
}

//因子库–>文件上传-单文件上传
export function apiUploadImg(params: { dictType: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'get',
    url: '/system/file/uploadImg',
    params,
  });
}
//保存项目草稿
//reduction/project/info/draft
export function apiInfoDraft(data: { dictType: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'post',
    url: '/reduction/project/info/draft',
    data,
  });
}
// 监测数据保存草稿
export function apiDataDraft(data: { dictType: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'post',
    url: '/reduction/project/data/draft',
    data,
  });
}
export function apiDataCalc(data: { dictType: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      locationFactor: string;
      netElecUp: string;
      actualReduction: string;
      actualCapacity: string;
    };
    total: number;
  }>({
    method: 'post',
    url: '/reduction/project/data/calc',
    data,
  });
}
export function apiProjectCalc(data: { dictType: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      locationFactor: string;
      projectId: number;
      energyType: string;
      projectType: string;
      endDate: string;
      startDate: string;
      projectName: string;
      areaCodes: number[];
      elecDownFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      elecUpFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      envAssessmentFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      envApprovalFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      gridConnectFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      generatorList: { ratedPower: string; num: string }[];
      fossilFuelList: {
        fossilFuelType: string | null;
        consumption: string | null;
        deviceElec: string | null;
        year: string | null;
        unitType: string | null;
      }[];
      actualElectFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      yearElecList: { netElecUp: string; year: string }[];
      expectReduction?: string;
      elecRefLimit?: string;
      expectCapacity?: string;
    };
    total: number;
  }>({
    method: 'post',
    url: '/reduction/project/info/calc',
    data,
  });
}
// 项目提交审核
export function apiInfoSubmit(
  data: { dictType: string; id?: string },
  id?: string | null,
) {
  if (id) {
    data = { ...data, id };
  }
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'post',
    url: '/reduction/project/info/submit',
    data,
  });
}
// 监测数据提交审核
export function apiDataSubmit(
  data: { dictType: string; id?: string },
  id?: string | null,
) {
  if (id) {
    data = { ...data, id };
  }
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'post',
    url: '/reduction/project/data/submit',
    data,
  });
}
//项目详情
export function apiInfoDetail(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      replyTime: string;
      projectName: string;
      deviceOpenedDate: string;
      areaCodes: string[];
      feasibilityReportFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      projectApprovalFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      envAssessmentFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      envApprovalFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      gridConnectFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      generatorList: { ratedPower: string; num: string }[];
      fossilFuelList: {
        fossilFuelType: string | null;
        consumption: string | null;
        deviceElec: string | null;
        year: string | null;
        unitType: string | null;
      }[];
      yearElecList: { netElecUp: string; year: string }[];
      projectType?: string;
      energyType?: string;
    };
    total: number;
    loanAmount?: string;
    totalAmount?: string;
    projectType?: string;
    energyType?: string;
  }>({
    method: 'get',
    url: '/reduction/project/info/detail',
    params,
  });
}
// 监测详情
export function apiProjectDetail(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      projectId: number;
      energyType: string;
      projectType: string;
      endDate: string;
      startDate: string;
      projectName: string;
      areaCodes: number[];
      elecDownFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      elecUpFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      envAssessmentFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      envApprovalFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      gridConnectFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      generatorList: { ratedPower: string; num: string }[];
      fossilFuelList: {
        fossilFuelType: string | null;
        consumption: string | null;
        deviceElec: string | null;
        year: string | null;
        unitType: string | null;
      }[];
      actualElectFile: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
      yearElecList: { netElecUp: string; year: string }[];
    };
    total: number;
    projectType: string;
    energyType: string;
  }>({
    method: 'get',
    url: '/reduction/project/data/detail',
    params,
  });
}
// /reduction/project/audit/audit
export function apiProjectAudit(data: {
  auditPass: string;
  id: number;
  auditContent: string;
}) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'post',
    url: '/reduction/project/audit/audit',
    data,
  });
}

// 项目列表-全量
export function apiProjectInfoList(params: { auditStatus: number }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'get',
    url: '/reduction/project/info/list',
    params,
  });
}
// 获取审核列表
export function apiProjectAuditInfoList(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: [];
    total: number;
  }>({
    method: 'get',
    url: '/reduction/project/info/audit/list',
    params,
  });
}
export function apiProjectDataAuditInfoList(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      projectName: string;
      auditTime: string;
      auditStatus_name: string;
      auditContent: string;
    }[];
    total: number;
  }>({
    method: 'get',
    url: '/reduction/project/data/audit/list',
    params,
  });
}
export function apiinfoCcList(params: { id: string }) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      createTime: string;
      fromOrgName: string;
      toOrgName: string;
      id: string;
    }[];
    total: number;
  }>({
    method: 'get',
    url: '/reduction/project/info/cc/list',
    params,
  });
}
//查询项目对应參數配置详情
export function apiQueryProjectConfigData(params: {
  energyType: string;
  projectType: string;
  type: string;
}) {
  return request<{
    code: number;
    msg: string;
    page: number;
    pageSize: number;
    data: {
      reductionParamCheckProject: {
        checkStatus: number;
        fieldName: string;
      }[];
      reductionParamShowProject: {
        checkStatus: number;
        fieldName: string;
      }[];
      reductionParamUncheckProject: {
        checkStatus: number;
        fieldName: string;
      }[];
    };
    total: number;
  }>({
    method: 'get',
    url: '/system/projectParam/queryProjectConfigData',
    params,
  });
}
