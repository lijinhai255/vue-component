import { Rule } from 'antd/lib/form';
import { RcFile } from 'antd/lib/upload';
export interface ItemType {
  title?: string;
  name?: string;
  require?: Rule[];
  placeholder?: string;
  type?: string;
  class?: string;
  buttontext?: string;
  value?: string;
  disabled?: boolean;
  select_list?: {
    dictLabel?: string;
    dictValue?: string;
    id?: string | number;
    name?: string;
  }[];
  maxLength?: number;
  isNeedButton?: boolean;
  defaultValue?: string;
  dataSource?: [];
  modelLabel?: string;
  addonAfter?: string;
  areaDatalist?: {
    addressCode: number;
    addressLevel: number;
    addressName: string;
    pcode: number;
  }[];
  min?: number;
  max?: number;
  precision?: number;
  maxCount?: number;
  tooltip?: string;
  child?: ItemType[];
  tempProjectType?: string[];
  tempEnergyType?: string[];
  step?: string;
}
export interface UploadType {
  uid: string;
  name: string;
  status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
  url?: string;
  originFileObj?: RcFile;
}
export interface ProjectListType {
  dictValue: string;
  dictLabel: string;
  locationFactor: string;
  gridConnectFile?: [];
  energyType?: string;
  projectType?: string;
}
export interface CurrentAreaParams {
  addressCode: string;
  addressId: string;
  createTime: string;
  id: string;
  locationFactor: string;
  updateTime: string;
  yearHours: string;
}

export interface AreaData {
  addressCode: number;
  addressLevel: number;
  addressName: string;
  pcode: number;
}
export interface ExamData {
  projectName: string;
  auditTime: string;
  auditStatus_name: string;
  auditContent: string;
}
export interface ExamData2 {
  createTime: string;
  fromOrgName: string;
  toOrgName: string;
  id: string;
}
export interface FormikConsumptionType {
  fossilFuelType: string | null;
  consumption: string | null;
  deviceElec: string | null;
  year: string | null;
  unitType: string | null;
}

export interface ProductionDataType {
  netElecUp: null | string;
  year: null | string;
}
