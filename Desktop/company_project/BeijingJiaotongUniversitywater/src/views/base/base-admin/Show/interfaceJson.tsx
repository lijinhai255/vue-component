interface organizationType {
  titleName: string;
  orgType_name: string;
  orgType: string | number;
  titleId: string | number | undefined;
}
interface organizationTypeOrg {
  titleName?: string;
  orgType_name?: string;
  orgType?: string | number;
  titleId?: string | number | undefined;
  orgList?: organizationType[];
}
export interface RolesList {
  organizationTypeOrg: organizationTypeOrg;
  userList: [
    {
      createBy?: number;
      createTime?: string;
      delFlag?: string;
      id?: number;
      orgType?: string;
      presetFlag?: string;
      roleInfo?: string;
      roleName?: string;
      updateBy?: number;
      updateTime?: string;
    },
  ];
}
