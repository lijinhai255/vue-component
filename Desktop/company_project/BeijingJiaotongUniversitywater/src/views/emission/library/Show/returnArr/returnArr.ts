import { FormInstance } from 'antd';
import { UploadType } from '../type/index';
export const expectReductionArr = () => {
  let arr = [];
  for (let index = 0; index < 31; index++) {
    arr.push({ dictValue: index, dictLabel: index });
  }
  return arr;
};
// 新建并网 风力
export function LeftArr(isTrue: boolean) {
  return [
    {
      name: '项目名称',
      type: 'input',
      title: 'projectName',
      class: 'a1',
      disabled: isTrue,
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '项目名称不能为空' },
            {
              type: 'string',
              max: 50,
              message: '不能超过50个字符',
            },
          ]
        : [],
    },

    {
      name: '项目所在地',
      type: 'Cascader',
      class: 'a2',
      title: 'areaCodes',
      disabled: isTrue,
      //   areaDatalist: areaData,
      placeholder: !isTrue ? '请选择' : '',
      require: !isTrue
        ? [{ required: true, message: '项目所在地不能为空' }]
        : [],
    },
    {
      name: '市/县-乡镇信息补充',
      type: 'input',
      class: 'a3',
      disabled: isTrue,
      title: 'projectAddress',
      placeholder: !isTrue ? '请输入' : '',
      require: [
        {
          type: 'string',
          max: 50,
          message: '不能超过50个字符',
        },
      ],
    },
    {
      name: '机组信息',
      type: 'inputList',
      class: 'oneRow',
      disabled: isTrue,
      title: 'generatorList',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [{ required: true, message: '机组信息不能为空' }] : [],
    },
    {
      name: '拟装机容量',
      placeholder: !isTrue ? '请输入' : '',
      type: 'InputNumber',
      class: 'oneRow8',
      addonAfter: 'MW',
      step: '0.0001',
      title: 'expectCapacity',
      disabled: true,
      require: !isTrue
        ? [
            { required: true, message: '机组信息不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
    },
    {
      name: '立项批复时间',
      type: 'year',
      title: 'replyTime',
      class: 'a5',
      disabled: isTrue,
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '立项批复时间不能为空' }]
        : [],
    },
    {
      name: '年均净上网电量',
      type: 'InputNumber',
      title: 'yearAvgElec',
      class: 'a6',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '年均净上网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1', '2'],
    },
    // 风力发电 改建-并网
    {
      name: '投产前历年数据填写：',
      type: 'InputNumberButton',
      title: 'yearElecList',
      class: 'a7',
      step: '0.0001',
      disabled: false,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '投产前历年数据填写不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    {
      name: '既有发电设备投产运行日期',
      type: 'year',
      title: 'deviceOpenedDate',
      class: 'a5',
      disabled: isTrue,
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [] : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    {
      name: '年均净上网电量',
      type: 'InputNumber',
      title: 'yearAvgElec',
      class: 'a6',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '年均净上网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    //扩建-并网
    {
      name: '既有发电机组年平均发电量',
      type: 'InputNumber',
      title: 'deviceAvgElec',
      class: 'a6',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    {
      name: '新增机组净上网电量',
      type: 'InputNumber',
      title: 'newDeviceElec',
      class: 'a6',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '新增机组净上网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    {
      name: '减排量预估',
      type: 'InputNumber',
      title: 'expectReduction',
      class: 'a6',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: true,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '减排量预估不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    //=============
    {
      name: '净上网电量参考上限',
      type: 'InputNumber',
      title: 'elecRefLimit',
      class: 'a7',
      step: '0.0001',
      disabled: true,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '净上网电量参考上限不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1', '2', '3', '4'],
    },
    {
      name: '所在地排放因子',
      type: 'input',
      title: 'locationFactor',
      class: 'a7',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '所在地排放因子不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1', '2', '3', '4'],
    },
    {
      name: '减排量预估',
      type: 'InputNumber',
      title: 'expectReduction',
      class: 'a7',
      step: '0.0001',
      disabled: true,
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '减排量预估能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1', '2'],
    },
    //风力发电 新建 -非并网
    {
      name: '投运前历年数据填写：',
      type: 'InputNumberButton',
      // class: 'oneRow1',
      disabled: false,
      title: 'generatorList',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [] : [],
      tempEnergyType: ['1', '2', '3', '4'],
      tempProjectType: ['2'],
    },
    {
      name: '投运前发电设备数量',
      type: 'select',
      title: 'deviceNum',
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'tCO₂/m3',
      placeholder: !isTrue ? '请输入' : '',
      select_list: expectReductionArr(),
      require: !isTrue ? [] : [],
      tempEnergyType: ['1', '2', '3', '4'],
      tempProjectType: ['2'],
    },
    {
      name: '年发电量',
      type: 'InputNumber',
      title: 'yearElec',
      // class: 'a6',
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '年发电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2', '3', '4'],
      tempProjectType: ['2'],
    },

    // 潮汐发电 - 新建并网
    {
      name: '年均净上网电量',
      type: 'InputNumber',
      title: 'yearAvgElec',
      class: 'a6',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '年均净上网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['1'],
    },
    {
      name: '所在地排放因子',
      type: 'input',
      title: 'locationFactor',
      class: 'a7',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '所在地排放因子不能为空' }]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['1'],
    },
    {
      name: '减排量预估',
      type: 'InputNumber',
      title: 'expectReduction',
      class: 'a7',
      step: '0.0001',
      disabled: true,
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '减排量预估不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['1'],
    },
    // 潮汐发电 - 新建非并网
    // {
    //   name: '投运前发电设备数量',
    //   type: 'select',
    //   title: 'deviceNum',
    //    step:'0.0001',
    //   disabled: isTrue,
    //   addonAfter: 'tCO₂/m3',
    //   placeholder: !isTrue ? '请输入' : '',
    //   select_list: expectReductionArr(),
    //   require: !isTrue
    //     ? [{ required: true, message: '投运前发电设备数量不能为空' }]
    //     : [],
    //   tempEnergyType: ['3'],
    //   tempProjectType: ['2'],
    // },
    // {
    //   name: '投产前历年数据填写：',
    //   type: 'InputNumberButton',
    //   title: 'yearElecList',
    //   class: 'a7',
    //    step:'0.0001',
    //   disabled: false,
    //   addonAfter: 'MWh',
    //   placeholder: !isTrue ? '请输入' : '',
    //   require: !isTrue
    //     ? [{ required: true, message: '投产前历年数据填写不能为空' }]
    //     : [],
    //   tempEnergyType: ['3'],
    //   tempProjectType: ['2'],
    // },
    // 地热发电 - 新建并网
    {
      name: '年均净上网电量',
      type: 'InputNumber',
      title: 'yearAvgElec',
      class: 'a6',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '年均净上网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1'],
    },
    {
      name: '所在地排放因子',
      type: 'input',
      title: 'locationFactor',
      class: 'a7',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '所在地排放因子不能为空' }]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1'],
    },
    {
      name: '减排量预估',
      type: 'InputNumber',
      title: 'expectReduction',
      class: 'a7',
      step: '0.0001',
      disabled: true,
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '减排量预估能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1'],
    },
    // 地热发电 - 新建非并网
    {
      name: '地热井二氧化碳平均浓度',
      type: 'InputNumber',
      title: 'carbonDioxideConc',
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'tCO2/吨蒸汽',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            {
              pattern: /^\d+(\.\d{0,8})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1', '2'],
    },
    {
      name: '地热井甲烷平均浓度',
      type: 'InputNumber',
      title: 'methaneConc',
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'tCH4/吨蒸汽',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            {
              pattern: /^\d+(\.\d{0,8})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1', '2'],
    },
    {
      name: '地热井蒸汽年产量',
      type: 'InputNumber',
      title: 'steamYearOutput',
      step: '0.0001',
      disabled: isTrue,
      addonAfter: '吨蒸汽',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1', '2'],
    },
  ];
}
export function sourceArr(
  isTrue: boolean,
  form: FormInstance,
  gridConnectFile: UploadType[],
) {
  return [
    {
      name: '可研报告',
      placeholder: !isTrue ? '中文分号间隔' : '',
      title: 'feasibilityReportFile',
      disabled: isTrue,
      type: 'upload',
      maxCount: 1,
      require: [{ required: true, message: '可研报告不能为空' }],
      child: [
        {
          name: '可研报告名称',
          type: 'input',
          title: 'feasibilityReportName',
          class: 'a7',
          step: '0.0001',
          disabled: isTrue,
          placeholder: !isTrue ? '请输入' : '',
          require: !isTrue
            ? [{ required: true, message: '可研报告名称不能为空' }]
            : [],
        },
      ],
    },
    {
      name: '核准批复文件',
      placeholder: !isTrue ? '中文分号间隔' : '',
      title: 'projectApprovalFile',
      disabled: isTrue,
      type: 'upload',
      maxCount: 1,
      require: [{ required: true, message: '核准批复文件不能为空' }],
      child: [
        {
          name: '核准批复文件名称',
          type: 'input',
          title: 'projectApprovalName',
          class: 'a7',
          step: '0.0001',
          disabled: isTrue,
          placeholder: !isTrue ? '请输入' : '',
          require: !isTrue
            ? [{ required: true, message: '核准批复文件名称不能为空' }]
            : [],
        },
        {
          name: '核准批复发文字号',
          type: 'input',
          title: 'projectApprovalInfo',
          class: 'a7',
          step: '0.0001',
          disabled: isTrue,
          placeholder: !isTrue ? '请输入' : '',
          require: !isTrue
            ? [{ required: true, message: '核准批复发文字号不能为空' }]
            : [],
        },
      ],
    },
    {
      name: '环评报告',
      placeholder: !isTrue ? '中文分号间隔' : '',
      title: 'envAssessmentFile',
      disabled: isTrue,
      type: 'upload',
      maxCount: 1,
      require: [{ required: true, message: '环评报告不能为空' }],
      child: [
        {
          name: '环评报告文件名称',
          type: 'input',
          title: 'envAssessmentName',
          class: 'a7',
          step: '0.0001',
          disabled: isTrue,
          placeholder: !isTrue ? '请输入' : '',
          require: !isTrue
            ? [{ required: true, message: '环评报告不能为空' }]
            : [],
        },
      ],
    },
    {
      name: '环评批复文件',
      placeholder: !isTrue ? '中文分号间隔' : '',
      title: 'envApprovalFile',
      disabled: isTrue,
      type: 'upload',
      maxCount: 1,
      require: [{ required: true, message: '环评批复文件不能为空' }],
      child: [
        {
          name: '环评批复文件名称',
          type: 'input',
          title: 'envApprovalName',
          class: 'a7',
          step: '0.0001',
          disabled: isTrue,
          placeholder: !isTrue ? '请输入' : '',
          require: !isTrue
            ? [{ required: true, message: '环评批复文件名称不能为空' }]
            : [],
        },
        {
          name: '环评批复发文字号',
          type: 'input',
          title: 'envApprovalInfo',
          class: 'a7',
          step: '0.0001',
          disabled: isTrue,
          placeholder: !isTrue ? '请输入' : '',
          require: !isTrue
            ? [{ required: true, message: '环评批复发文字号不能为空' }]
            : [],
        },
      ],
    },
    {
      name: '并网文件',
      placeholder: !isTrue ? '中文分号间隔' : '',
      title: 'gridConnectFile',
      disabled: isTrue,
      type: 'upload',
      tooltip:
        '可能包括但不限于：电力业务许可证、并网调度协议、并网合同、并网验收文件等',
      maxCount: 10,
      require:
        gridConnectFile?.length > 0 || form.getFieldValue('gridConnectName')
          ? [{ required: true, message: '并网文件不能为空' }]
          : [],
      child: [
        {
          name: '并网文件名称',
          type: 'input',
          title: 'gridConnectName',
          class: 'a7',
          step: '0.0001',
          disabled: isTrue,
          placeholder: !isTrue ? '请输入' : '',
          require:
            gridConnectFile?.length > 0 || form.getFieldValue('gridConnectName')
              ? [{ required: true, message: '并网文件名称不能为空' }]
              : [],
        },
      ],
    },
  ];
}

export const examColumns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '审核时间',
    dataIndex: 'auditTime',
    key: 'auditTime',
  },
  {
    title: '审核结果',
    dataIndex: 'auditStatus_name',
    key: 'auditStatus_name',
  },
  {
    title: '备注',
    dataIndex: 'auditContent',
    key: 'auditContent',
  },
];
export const examColumns2 = [
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '抄送发起方',
    dataIndex: 'fromOrgName',
  },
  {
    title: '抄送接收方',
    dataIndex: 'toOrgName',
  },
  {
    title: '抄送时间',
    dataIndex: 'createTime',
  },
];
