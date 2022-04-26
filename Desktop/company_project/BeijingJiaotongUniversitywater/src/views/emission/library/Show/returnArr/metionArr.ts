export function metionArr(
  isTrue: boolean,
  isShowGridConnectFile: boolean,
  projectList: {
    dictValue: string;
    dictLabel: string;
    locationFactor: string;
    gridConnectFile?: [] | undefined;
  }[],
) {
  return [
    {
      name: '项目选择',
      type: 'select',
      title: 'projectId',
      select_list: projectList,
      class: 'a1',
      disabled: isTrue,
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [{ required: true, message: '项目选择不能为空' }] : [],
    },

    isShowGridConnectFile
      ? {
          name: '并网文件',
          type: 'upload',
          // class: 'oneRow2',
          title: 'gridConnectFile',
          maxCount: 10,
          disabled: isTrue,
          tooltip:
            '可能包括但不限于：电力业务许可证、并网调度协议、并网合同、并网验收文件等',
          placeholder: !isTrue ? '请选择' : '',
          require: !isTrue
            ? [{ required: true, message: '并网文件不能为空' }]
            : [],
          child: [
            {
              name: '并网文件名称',
              type: 'input',
              title: 'gridConnectName',
              // class: 'oneRow2',
              disabled: isTrue,
              placeholder: !isTrue ? '请输入' : '',
              require: !isTrue
                ? [{ required: true, message: '并网文件名称不能为空' }]
                : [],
            },
          ],
        }
      : {
          name: '',
          class: 'oneRow2',
          type: 'empty',
          title: 'gridConnectFile',
        },
    {
      name: '监测时间段',
      type: 'RangePicker',
      class: 'oneRow3',
      disabled: isTrue,
      title: 'endDate',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '监测时间段不能为空' }]
        : [],
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
      name: '装机容量',
      placeholder: !isTrue ? '请输入' : '',
      type: 'input',
      class: 'oneRow8',
      addonAfter: 'MW',
      title: 'actualCapacity',
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
      name: '上网电量',
      type: 'InputNumber',
      class: 'oneRow5',
      title: 'elecUp',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '上网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1'],
    },
    {
      name: '上传附件',
      type: 'upload',
      class: 'a15',
      title: 'elecUpFile',
      maxCount: 1,
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [{ required: true, message: '上传附件不能为空' }] : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1'],
    },
    {
      name: '上传附件',
      type: 'upload',
      class: 'a16',
      title: 'elecDownFile',
      disabled: isTrue,
      maxCount: 1,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [{ required: true, message: '上传附件不能为空' }] : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1'],
    },
    {
      name: '下网电量',
      type: 'InputNumber',
      class: 'oneRow6',
      title: 'elecDown',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '下网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1', '3'],
    },
    {
      name: '净上网电量',
      type: 'InputNumber',
      class: 'a11',
      title: 'netElecUp',
      disabled: true,
      step: '0.0001',
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '净上网电量不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1'],
    },
    {
      name: '所在地排放因子',
      type: 'input',
      class: 'a12',
      title: 'locationFactor',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '所在地排放因子不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1'],
    },
    {
      name: '实际减排量',
      type: 'InputNumber',
      class: 'a13',
      title: 'actualReduction',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际减排量不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['1'],
    },
    // {
    //   name: '并网点信息',
    //   type: 'input',
    //   // class: 'a14',/
    //   disabled: isTrue,
    //   title: 'gridConnectBranch',
    //   placeholder: !isTrue ? '请输入' : '',
    //   require: !isTrue
    //     ? [{ required: true, message: '并网点信息不能为空' }]
    //     : [],
    //   tempEnergyType: ['1', '2'],
    //   tempProjectType: ['1'],
    // },
    // 风力发电 新建非并网
    {
      name: '实际发电量',
      type: 'InputNumber',
      class: 'oneRow5',
      title: 'actualElec',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '上网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['2'],
    },
    {
      name: '实际发电量上传附件',
      type: 'upload',
      class: 'a15',
      title: 'actualElectFile',
      maxCount: 1,
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [{ required: true, message: '上传附件不能为空' }] : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['2'],
    },
    {
      name: '排放因子',
      type: 'input',
      class: 'a12',
      title: 'locationFactor',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [{ required: true, message: '排放因子不能为空' }] : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['2'],
    },
    {
      name: '实际减排量',
      type: 'InputNumber',
      class: 'a13',
      title: 'actualReduction',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际减排量不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['2'],
    },
    // 风力发电  改建并网
    {
      name: '上网电量',
      type: 'InputNumber',
      class: 'oneRow5',
      title: 'elecUp',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '上网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    {
      name: '上网电量上传附件',
      type: 'upload',
      class: 'a15',
      title: 'elecUpFile',
      maxCount: 1,
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '上网电量上传附件不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    {
      name: '下网电量上传',
      type: 'upload',
      class: 'a16',
      title: 'elecDownFile',
      disabled: isTrue,
      maxCount: 1,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '下网电量上传不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    {
      name: '下网电量',
      type: 'InputNumber',
      class: 'oneRow6',
      title: 'elecDown',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '下网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    // {
    //   name: '并网点信息',
    //   type: 'InputNumber',
    //   class: 'a11',
    //   title: 'gridConnectBranch',
    //   disabled: isTrue,
    //   step:'0.0001',
    //   addonAfter: 'MWh',
    //   placeholder: !isTrue ? '请输入' : '',
    //   require: !isTrue
    //     ? [{ required: true, message: '并网点信息不能为空' }]
    //     : [],
    //   tempEnergyType: ['1', '2'],
    //   tempProjectType: ['3'],
    // },
    {
      name: '净上网电量',
      type: 'InputNumber',
      class: 'a11',
      title: 'netElecUp',
      disabled: true,
      step: '0.0001',
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '净上网电量不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    {
      name: '所在地排放因子',
      type: 'input',
      class: 'a12',
      title: 'locationFactor',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '所在地排放因子不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    {
      name: '实际减排量',
      type: 'InputNumber',
      class: 'a13',
      title: 'actualReduction',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际减排量不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['3'],
    },
    // 风力发电 扩建并网
    {
      name: '新增机组上网电量',
      type: 'InputNumber',
      class: 'oneRow5',
      title: 'elecUp',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '新增机组上网电量不能为空' },
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
      name: '上网电量附件上传',
      type: 'upload',
      class: 'a15',
      title: 'elecUpFile',
      maxCount: 1,
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '上网电量附件上传不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    {
      name: '下网电量附件上传',
      type: 'upload',
      class: 'a16',
      title: 'elecDownFile',
      disabled: isTrue,
      maxCount: 1,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '下网电量附件上传不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    {
      name: '新增机组下网电量',
      type: 'InputNumber',
      class: 'oneRow6',
      title: 'elecDown',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '下网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    // {
    //   name: '并网点信息',
    //   type: 'InputNumber',
    //   class: 'a11',
    //   title: 'gridConnectBranch',
    //   disabled: isTrue,
    //   step:'0.0001',
    //   addonAfter: 'MWh',
    //   placeholder: !isTrue ? '请输入' : '',
    //   require: !isTrue
    //     ? [{ required: true, message: '并网点信息不能为空' }]
    //     : [],
    //   tempEnergyType: ['1', '2'],
    //   tempProjectType: ['4'],
    // },
    {
      name: '净上网电量',
      type: 'InputNumber',
      class: 'a11',
      title: 'netElecUp',
      disabled: true,
      step: '0.0001',
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '净上网电量不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    {
      name: '所在地排放因子',
      type: 'input',
      class: 'a12',
      title: 'locationFactor',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '所在地排放因子不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    {
      name: '实际减排量',
      type: 'InputNumber',
      class: 'a13',
      title: 'actualReduction',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际减排量不能为空' }]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    {
      name: '发电厂整体上网电量',
      type: 'InputNumber',
      title: 'plantElecUp',
      disabled: isTrue,
      step: '0.0001',
      class: 'a21',
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '发电厂整体上网电量不能为空' },
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
      name: '发电厂整体下网电量',
      type: 'InputNumber',
      title: 'plantElecDown',
      disabled: isTrue,
      step: '0.0001',
      class: 'a22',
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '发电厂整体下网电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['1', '2'],
      tempProjectType: ['4'],
    },
    // 潮汐发电 新建并网
    {
      name: '上网电量',
      type: 'InputNumber',
      class: 'oneRow5',
      title: 'elecUp',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '上网电量不能为空' },
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
      name: '上网电量附件上传',
      type: 'upload',
      class: 'a15',
      title: 'elecUpFile',
      maxCount: 1,
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '上网电量附件不能为空' }]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['1'],
    },
    {
      name: '下网电量附件上传',
      type: 'upload',
      class: 'a16',
      title: 'elecDownFile',
      disabled: isTrue,
      maxCount: 1,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '下网电量附件不能为空' }]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['1'],
    },
    {
      name: '下网电量',
      type: 'InputNumber',
      class: 'oneRow6',
      title: 'elecDown',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '下网电量不能为空' },
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
      name: '净上网电量',
      type: 'InputNumber',
      class: 'a11',
      title: 'netElecUp',
      disabled: true,
      step: '0.0001',
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '净上网电量不能为空' }]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['1'],
    },
    {
      name: '所在地排放因子',
      type: 'input',
      class: 'a12',
      title: 'locationFactor',
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
      name: '实际减排量',
      type: 'InputNumber',
      class: 'a13',
      title: 'actualReduction',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际减排量不能为空' }]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['1'],
    },
    // {
    //   name: '并网点信息',
    //   type: 'InputNumber',
    //   // class: 'a13',
    //   title: 'gridConnectBranch',
    //   disabled: isTrue,
    //   step:'0.0001',
    //   addonAfter: 'tCO₂e',
    //   placeholder: !isTrue ? '请输入' : '',
    //   require: !isTrue
    //     ? [{ required: true, message: '并网点信息不能为空' }]
    //     : [],
    //   tempEnergyType: ['3'],
    //   tempProjectType: ['1'],
    // },
    // 潮汐发电 新建非并网
    {
      name: '实际发电量',
      type: 'InputNumber',
      class: 'oneRow5',
      title: 'actualElec',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '实际发电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['2'],
    },
    {
      name: '实际发电量附件上传',
      type: 'upload',
      class: 'a15',
      title: 'actualElectFile',
      maxCount: 1,
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际发电量附件上传不能为空' }]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['2'],
    },
    {
      name: '排放因子',
      type: 'input',
      class: 'a11',
      title: 'locationFactor',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [{ required: true, message: '排放因子不能为空' }] : [],
      tempEnergyType: ['3'],
      tempProjectType: ['2'],
    },
    {
      name: '实际减排量',
      type: 'InputNumber',
      class: 'a13',
      title: 'actualReduction',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际减排量不能为空' }]
        : [],
      tempEnergyType: ['3'],
      tempProjectType: ['2'],
    },
    // 地热 新建-并网
    {
      name: '上网电量',
      type: 'InputNumber',
      class: 'oneRow5',
      title: 'elecUp',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '上网电量不能为空' },
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
      name: '上网电量附件上传',
      type: 'upload',
      class: 'a15',
      title: 'elecUpFile',
      maxCount: 1,
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '上网电量附件上传不能为空' }]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1'],
    },
    {
      name: '下网电量附件上传',
      type: 'upload',
      class: 'a16',
      title: 'elecDownFile',
      disabled: isTrue,
      maxCount: 1,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '下网电量附件上传不能为空' }]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1'],
    },
    {
      name: '下网电量',
      type: 'InputNumber',
      class: 'oneRow6',
      title: 'elecDown',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '下网电量不能为空' },
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
      class: 'a11',
      title: 'locationFactor',
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
      name: '实际减排量',
      type: 'InputNumber',
      class: 'a13',
      title: 'actualReduction',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际减排量不能为空' }]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1'],
    },
    {
      name: '净上网电量',
      type: 'InputNumber',
      class: 'a13',
      title: 'netElecUp',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '净上网电量不能为空' }]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['1'],
    },
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
      tempProjectType: ['1'],
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
      tempProjectType: ['1'],
    },
    {
      name: '地热井蒸汽监测期内产量',
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
      tempProjectType: ['1'],
    },
    {
      name: '并网点信息',
      type: 'input',
      // class: 'a14',/
      disabled: isTrue,
      title: 'gridConnectBranch',
      placeholder: !isTrue ? '请输入' : '',
      addonAfter: '变电站',
      require: !isTrue
        ? [{ required: true, message: '并网点信息不能为空' }]
        : [],
      tempEnergyType: ['1', '2', '3', '4'],
      tempProjectType: ['1', '3', '4'],
    },
    // 地热发电 - 新建非并网
    {
      name: '实际发电量',
      type: 'InputNumber',
      class: 'oneRow5',
      title: 'actualElec',
      max: 999999999.0,
      min: 0.0001,
      step: '0.0001',
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [
            { required: true, message: '实际发电量不能为空' },
            {
              pattern: /^\d+(\.\d{0,4})?$/,
              message: '输入正确数值格式',
            },
          ]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['2'],
    },
    {
      name: '实际发电量附件上传',
      type: 'upload',
      class: 'a15',
      title: 'actualElectFile',
      maxCount: 1,
      disabled: isTrue,
      addonAfter: 'MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际发电量附件上传不能为空' }]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['2'],
    },
    {
      name: '排放因子',
      type: 'input',
      class: 'a11',
      title: 'locationFactor',
      disabled: true,
      addonAfter: 'tCO₂e/MWh',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue ? [{ required: true, message: '排放因子不能为空' }] : [],
      tempEnergyType: ['4'],
      tempProjectType: ['2'],
    },
    {
      name: '实际减排量',
      type: 'InputNumber',
      class: 'a13',
      title: 'actualReduction',
      disabled: true,
      step: '0.0001',
      addonAfter: 'tCO₂e',
      placeholder: !isTrue ? '请输入' : '',
      require: !isTrue
        ? [{ required: true, message: '实际减排量不能为空' }]
        : [],
      tempEnergyType: ['4'],
      tempProjectType: ['2'],
    },
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
      tempProjectType: ['2'],
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
      tempProjectType: ['2'],
    },
    {
      name: '地热井蒸汽监测期内产量',
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
      tempProjectType: ['2'],
    },
  ];
}
