import { ListArrType } from '@views/components/From';

export function returnStandardList(culIsShow: () => boolean): ListArrType[] {
  return [
    {
      label: '标准级别',
      name: 'level',
      className: 'a1',
      //   labelCol: { span: 8 },
      rules: !culIsShow()
        ? [{ required: true, message: '请选择标准级别' }]
        : [],
      baseType: 'Select',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请选择' : '',
        options: [
          { value: 1, label: '国际标准' },
          { value: 2, label: '国家标准' },
          { value: 3, label: '地方标准' },
          { value: 4, label: '行业标准' },
          { value: 5, label: '企业标准' },
          { value: 6, label: '产品标准' },
        ],
      },
    },
    {
      label: '标准分类',
      name: 'classify',
      //   labelCol: { span: 8 },
      rules: !culIsShow()
        ? [{ required: true, message: '请选择标准分类' }]
        : [],
      baseType: 'Select',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请选择' : '',
        options: [
          { value: 1, label: '水管理标准' },
          { value: 2, label: '能源管理标准' },
          { value: 3, label: '碳管理标准' },
          { value: 4, label: '环境管理标准' },
        ],
      },
    },
    {
      label: '标准号',
      name: 'numbers',
      rules: !culIsShow() ? [{ required: true, message: '请输入标准号' }] : [],
      baseType: 'Input',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        maxLength: 50,
      },
    },
    {
      label: '中文标准名称',
      name: 'zh_hans_name',
      rules: !culIsShow()
        ? [{ required: true, message: '请输入中文标准名称' }]
        : [],
      baseType: 'Input',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        maxLength: 100,
      },
    },
    {
      label: '英文标准名称',
      name: 'en_name',
      baseType: 'Input',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        maxLength: 200,
      },
    },
    {
      label: '标准状态',
      name: 'status',
      rules: !culIsShow()
        ? [{ required: true, message: '请选择标准状态' }]
        : [],
      baseType: 'Select',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请选择' : '',
        options: [
          { value: 1, label: '即将施行' },
          { value: 2, label: '现行' },
          { value: 3, label: '废止' },
        ],
      },
    },
    {
      label: '中国标准分类号(CCS)',
      name: 'china_numbers',
      baseType: 'Input',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        maxLength: 50,
      },
    },
    {
      label: '国际标准分类号(ICS)',
      name: 'international_numbers',
      baseType: 'Input',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        maxLength: 50,
      },
    },
    {
      label: '发布日期',
      name: 'release_time',
      rules: !culIsShow()
        ? [{ required: true, message: '请选择发布日期' }]
        : [],
      baseType: 'DatePicker',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请选择' : '',
        format: 'YYYY-MM-DD',
      },
    },
    {
      label: '实施日期',
      name: 'implement_time',
      rules: !culIsShow()
        ? [{ required: true, message: '请选择实施日期' }]
        : [],
      baseType: 'DatePicker',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请选择' : '',
        format: 'YYYY-MM-DD',
      },
    },
    {
      label: '发布单位',
      name: 'unit',
      rules: !culIsShow()
        ? [{ required: true, message: '请输入发布单位' }]
        : [],
      baseType: 'Input',
      baseItem: {
        disabled: culIsShow(),
        placeholder: !culIsShow() ? '请输入' : '',
        maxLength: 100,
      },
    },
    {
      baseType: '',
      baseItem: {},
    },
  ];
}
