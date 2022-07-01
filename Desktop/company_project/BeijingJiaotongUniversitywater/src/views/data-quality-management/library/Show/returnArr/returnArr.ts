import { ListArrType } from '@views/components/From';

export function returnGoodsArr(culIsShow: () => boolean): ListArrType[] {
  return [
    {
      label: '系统名称',
      name: 'sys_name',
      className: 'a1',
      rules: !culIsShow()
        ? [{ required: true, message: '系统名称不能为空' }]
        : [],
      baseType: 'Input',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        maxLength: 50,
      },
    },
    {
      label: '系统编号',
      name: 'sys_number',
      className: 'a1',
      rules: !culIsShow()
        ? [{ required: true, message: '系统编号不能为空' }]
        : [],
      baseType: 'Input',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        maxLength: 50,
      },
    },
    {
      label: '系统类型',
      name: 'sys_type',
      className: 'a1',
      rules: !culIsShow()
        ? [{ required: true, message: '请选择系统类型' }]
        : [],
      baseType: 'Select',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        options: [
          // { value: 1, label: '新鲜水系统' },
          // { value: 2, label: '循环水系统' },
          // { value: 3, label: '化学水系统' },
          { value: 4, label: '污水处理系统' },
        ],
      },
    },
  ];
}
