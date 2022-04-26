/**
 * @file 排放信息类型
 */

import { AnyKindOfDictionary } from 'lodash';
import { Props as SelectorProps } from './components/Selector';
import { Props as DoubleSelectProps } from './components/DoubleSelect';
import { Props as InputProps } from './components/Input';
import { Props as CheckboxGroupProps } from './components/CheckboxGroup';
import { Props as SelectAndMsgBox } from './components/SelectAndMsgBox';

export interface EmissionsSubCategory {
  value: number;
  label: string;
  user?: string;
  emissions_category: string;
}
export interface EmissionSources {
  facility_list: EmissionsSubCategory[];
  emission_source_list: ActivityDataListElement[];
  emission_source_unit_list: UnitList[];
  activity_data_record_mode_list: EmissionsSubCategory[];
  activity_data_list: ActivityDataListElement[];
  emission_source_department_list: EmissionsSubCategory[];
  emissions_sub_category_list: EmissionsSubCategory[];
  greenhouse_gases_list: GreenhouseGasesList[];
  emission_source_emission_factor_list: ActivityDataListElement[];
  emission_factor_source_list: EmissionsSubCategory[];
  exhaust_gses_chios: Array<string[]>;
}
export interface EmissionInfoValues {
  carbon_emission_info: number;
  facility: string;
  emission_source: string;
  emissions_category: string;
  emissions_subcategory: string;
  active_data: number;
  unit: string;
  active_data_record_mode: string;
  active_data_type: string;
  active_data_grade: number;
  department: string;
  emission_factor: string;
  emission_factor_grade: number;
  emission_factor_source: string;
  gas_type?: string[];
  produce_gas_type_list: ProduceGasTypeList[];
  [key: string]: any;
}
export interface AddEmissionSelectItem {
  facility?: string;
  activitydatarecord?: string;
  emissionsourcedepartment?: string;
  emissionfactorsource?: string;
}
export interface PrpducegGasList {
  value?: string | number;
  label: string;
  greenhouse_gases_list: GreenhouseGasesList[];
}
export enum GasCheckedSubKey {
  prpduce_gas_emission_factor = 'prpduce_gas_emission_factor',
  greenhouse_gases = 'greenhouse_gases',
  prpduce_gas_unit = 'prpduce_gas_unit',
  potential_energy_name = 'potential_energy_name',
  potential_energy_numeric = 'potential_energy_numeric',
}

export interface ProduceGasTypeList {
  id: number;
  prpduce_gas_name: string;
  prpduce_gas_emission_factor: number;
  greenhouse_gases: string;
  prpduce_gas_unit: string;
  potential_energy_name: string;
  potential_energy_numeric: number;
}
export enum EmissionGas {
  'CO₂' = 'CO₂',
  'CH₄' = 'CH₄',
  'NO₂' = 'NO₂',
  'HFCs' = 'HFCs',
  'PFCs' = 'PFCs',
  'SF₆' = 'SF₆',
  'NF₃' = 'NF₃',
}

export interface UnitList {
  value: number;
  label: string;
}

export interface ActivityDataListElement {
  label: string;
  label_two: string;
  value: number;
  user?: number;
}

export interface GreenhouseGasesList {
  value: number;
  label: string;
  label_two: string;
  exhaust_gases: EmissionGas;
  greenhouse_gases_unit_list: UnitList[];
  potential_energy_list: ActivityDataListElement[];
}

export enum EmissionFormType {
  'select',
  'input',
  'checkboxGroup',
  'doubleSelect',
  'selectAndMsgBox',
}
export type Children =
  | { type: EmissionFormType.select; props: SelectorProps }
  | { type: EmissionFormType.doubleSelect; props: DoubleSelectProps }
  | { type: EmissionFormType.input; props: InputProps }
  | { type: EmissionFormType.selectAndMsgBox; props: SelectAndMsgBox }
  | { type: EmissionFormType.checkboxGroup; props: CheckboxGroupProps };

export type EmissionArr = {
  title: string;
  props: { childrenColSpan?: number[] } & AnyKindOfDictionary;
  children: Children[];
};

export type GasMap = {
  [gas: string]: GreenhouseGasesList[];
};

type FormTargetBasePath = string | string[];
export type FormValueTargetPath =
  | {
      [key: string]: string[];
    }
  | FormTargetBasePath;
