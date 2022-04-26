export function companyItemFnArr(isTrue: boolean, type: string) {
  //// 扩建 并网
  return [
    {
      name: '能源类型',
      type: 'RadioGroup',
      title: 'energyType',
      class: 'oneRow1',
      disabled: isTrue,
      placeholder: !isTrue ? '请输入' : '',
      select_list: [
        {
          dictValue: '1',
          dictLabel: '风力发电',
        },
        {
          dictValue: '2',
          dictLabel: '光伏发电',
        },
        {
          dictValue: '3',
          dictLabel: '潮汐发电',
        },
        {
          dictValue: '4',
          dictLabel: '地热发电',
        },
      ],
      require: !isTrue ? [{ required: true, message: '项目类型不能为空' }] : [],
    },
    {
      name: '项目类型',
      type: 'RadioGroup',
      title: 'projectType',
      class: 'oneRow2',
      disabled: isTrue,
      placeholder: !isTrue ? '请输入' : '',
      select_list:
        ['3', '4'].indexOf(type) >= 0
          ? [
              {
                dictValue: '1',
                dictLabel: '新建-并网',
              },
              {
                dictValue: '2',
                dictLabel: '新建-非并网',
              },
            ]
          : [
              {
                dictValue: '1',
                dictLabel: '新建-并网',
              },
              {
                dictValue: '2',
                dictLabel: '新建-非并网',
              },
              {
                dictValue: '3',
                dictLabel: '改建-并网',
              },
              {
                dictValue: '4',
                dictLabel: '扩建-并网',
              },
            ],
      require: !isTrue ? [{ required: true, message: '项目类型不能为空' }] : [],
    },
  ];
}
