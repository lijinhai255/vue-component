export type GetDrawerContainerFuc = () => HTMLElement;
export interface DrawerProps {
  /**
   * 抽屉是否打开
   */
  visible?: boolean;
  /**
   * 抽屉标题
   */
  title?: string;
  /**
   * 返回一个容器来装载抽屉
   * @description 默认为body内创建一个div作为容器
   */
  getContainer?: HTMLElement | GetDrawerContainerFuc;
  /**
   * 抽屉包裹内容
   */
  childrenData?: React.ReactNode;
  /**
   * 在左右方向时, 抽屉的宽度
   */
  width?: string;
  /**
   * 抽屉滑出方向
   */
  placement?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * 是否显示蒙层
   */
  showMask?: boolean;
  /**
   * 蒙层是否可关闭抽屉
   */
  maskClose?: boolean;
  /**
   * 关闭抽屉
   */
  onClose?: () => void;
  /**
   * 页脚
   */
  footer?: React.ReactNode;
}

export interface DrawerContextState {
  /**
   * 子元素数量
   */
  count?: number;
  /**
   * 添加子Drawer
   */
  addDrawer?: Function;
  /**
   * 移除子Drawer开始
   */
  removeDrawer?: Function;
  /**
   * 移除子Drawer完毕
   */
  removeDrawerDone?: Function;
}

export interface FormProps {
  /**
   * form数据
   */
  form_data?: any;
  submit?: (values: any) => void;
  record?: any;
  status?: string;
}

export interface IUserInfo {
  // key: string;
  // product_name: string;
  // product_specification: string;
  // functional_unit: string;
  // control_model: number;
  // code: number;
  // report_download: number;
  // total: number
}
// /月份数据
//
export interface FuelJSON {
  childrenDrawer: boolean;
  addForm: AddForm;
  fuel_data: FuelDatum[];
  fuel_name_list: any[];
  month: string;
  cas_product: string;
  title?: string;
  heating_coal_consumption_status: string;
  low_heat_status: string;
  fuel_json: FuelJSONElement[];
  function_key?: string;
  function_list?: ParamsFunction[];
}

export interface AddForm {
  fuel_type_disabled: boolean;
  fuel_disabled: boolean;
  fuel_type: string;
  fuel: string;
  unit: FuelDatum[];
  fuel_type_select: any[];
  fuel_select: any[];
  coal_disabled?: boolean;
  carbon_content_status?: boolean;
  function_list?: ParamsFunction[];
  unit_disabled?: boolean;
}

export interface FuelDatum {
  id: number;
  unit_name: string;
  is_merge: boolean;
  fuel_type: FuelType[];
  fuel: string[];
  fuel_json: PurpleFuelJSON | string;
  unit_type: string;
  detail_unit_type: string;
  label: string;
  value: number;
  key: number;
  type: string;
}
export interface ParamsFunction {
  label?: string;
  type?: string;
  value?: string;
  key?: number;
}

export interface PurpleFuelJSON {}

export enum FuelType {
  其他 = '其他',
  燃气 = '燃气',
  燃油 = '燃油',
  燃煤 = '燃煤',
}

export interface FuelJSONElement {
  id: number;
  is_use: boolean;
  weights: number;
  createtime: Date;
  modification: Date;
  fuel: string;
  unit: string;
  low_heat: number;
  carbon_content_calorific: number;
  carbon_oxidation_rate: number;
}
export interface ParamsFunction {
  forEach: any;
  map(arg0: (item: any) => JSX.Element): React.ReactNode;
  key?: number;
  type?: string;
  options?: Option[];
  function?: string;
  tab_title?: string;
  type_name?: string;
  filter(param: (item: any) => boolean): void;
}

export interface Option {
  name?: string;
  label?: string;
  suffix?: string;
  formType?: FormType;
}

export enum FormType {
  Number = 'number',
}

// 国内生产数据机组类型
export interface Unitdata {
  id: number;
  unit_name: string;
  is_merge: boolean;
  fuel_type: string[];
  fuel: string[];
  fuel_json: UnitFuelJSON[];
  unit_type: string;
  detail_unit_type: string;
  merge_unit_name: string;
  installed_capacity_json: { [key: string]: string };
  installed_capacity: string;
  label: string;
  value: number;
  key: number;
  type: string;
}

export interface UnitFuelJSON {
  type: string;
  value: string[];
}

export interface RecordData {
  id: number;
  unit_name: string;
  is_use: boolean;
  weights: number;
  createtime: Date;
  modification: Date;
  month: string;
  product_power?: number;
  power_supply: number;
  power_supply_json: null;
  hot_supply: number;
  hot_supply_json: null;
  heating_ratio: number;
  heating_ratio_json: null;
  coal_consumption_for_power: number;
  coal_consumption_for_power_json: null;
  heating_coal_consumption: number;
  heating_coal_consumption_json: null;
  run_hours: number;
  load_coefficient: number;
  load_coefficient_json: LoadCoefficientJSON[];
  power_supply_carbon_emission_intensity: number;
  power_supply_carbon_emission_intensity_json: null;
  heating_carbon_emission_intensity: number;
  heating_carbon_emission_intensity_json: null;
  carbon_emission: number;
  cas_product: number;
  unit: number;
}

export interface LoadCoefficientJSON {
  id: number;
  MW: string;
  name: string;
  hour: number;
  power: number;
}
