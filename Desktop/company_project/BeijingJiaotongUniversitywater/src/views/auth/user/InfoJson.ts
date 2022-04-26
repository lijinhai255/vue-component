export interface UserType {
  userName: string;
  nickName: string;
  postIds: string;
  phonenumber: string;
  roleIds: any;
}
export const userAddList = (roleIds: any) => {
  return [
    {
      label: '账号：',
      id: 'userName',
      type: 'input',
      placeholder: '账号',
      max: 50,
      require: [{ required: true, message: `请输入账号` }],
      checkList: [],
    },
    {
      label: '员工姓名：',
      type: 'input',
      id: 'nickName',
      max: 50,
      placeholder: '员工姓名',
      require: [{ required: true, message: `请输入员工姓名` }],
      checkList: [],
    },
    {
      label: '部门：',
      type: 'input',
      id: 'deptName',
      placeholder: '所在部门',
      max: 100,
      require: [{ required: true, message: `请输入所在部门` }],
      checkList: [],
    },
    {
      label: '岗位：',
      type: 'input',
      id: 'postName',
      placeholder: '岗位名称',
      max: 100,
      require: [{ required: true, message: `请输入岗位名称` }],
      checkList: [],
    },
    {
      label: '联系方式：',
      type: 'input',
      id: 'phonenumber',
      placeholder: '员工手机号',
      max: 11,
      require: [
        { required: true, message: `请输入员工手机号` },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '输入正确手机号',
        },
      ],
      checkList: [],
    },
    {
      label: '账号角色：',
      type: 'check',
      id: 'roleIds',
      placeholder: '账号角色',
      require: [{ required: true, message: ` ` }],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      checkList: roleIds,
    },
  ];
};
