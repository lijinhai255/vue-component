interface OptionType {
  label: string;
  value: string;
  disabled?: boolean;
}
export type EnterPriseStaffType = {
  phone_number: string | null;
  contact_info: string | null;
  roles_list: string[] | null;
  roles?: OptionType[] | null;
  user_name?: string | null;
  name?: string | null;
  is_active: boolean | null;
};

export type SearchStaffsFromType = {
  search?: string;
  page: number;
  page_size: number;
  pk?: null | string;
  user_name?: null | string;
  name?: null | string;
  phone_number?: null | string;
  contact_info?: null | string;
  roles_list?: null | string;
  is_active?: null | string;
};
export interface Column {
  id: string;
  roleName: string;
  is_predefined: boolean;
  roleInfo: string;
  staff_count: string;
  is_master: boolean;
  roleId?: number;
}
