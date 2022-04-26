/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @file 新建排放数据
 */
import { memo, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './organizationalManagement.scss';
import { Form, Row, Col } from 'antd';
import { assign, compact, differenceWith, noop } from 'lodash';
// import { EmptyLoading } from '@/components/EmptyLoading';
import { Button } from '@/components/Button';
import {
  ActivityDataListElement,
  // AddEmissionSelectItem,
  Children,
  EmissionArr,
  EmissionFormType,
  EmissionInfoValues,
  EmissionSources,
  FormValueTargetPath,
  GasCheckedSubKey,
  GreenhouseGasesList,
  PrpducegGasList,
  UnitList,
} from './types';
// import { Toast } from '@/utils/verifty';
import {
  caculateCategorys,
  genLabelSelectOptions,
  renderChildren,
  uniqBy,
  useGasMap,
} from './utils';
import { checkList } from '@/components/Selector';

type EmissionFormValue = Omit<EmissionInfoValues, 'emission_source'> & {
  emission_source?: number;
};

const AddEmissionData = () => {
  const isFirstLoad = useRef(true);
  const [form] = Form.useForm();
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();

  const [
    source, // setSource
  ] = useState<EmissionSources>();

  // 为了数据联动，保留一份和form相同的数据
  const [unionType, setUnionType] = useState<EmissionFormValue>();

  const gasMap = useGasMap(source);
  const computedEmissionsCategorys = useMemo(() => {
    // 排放子类别
    const allEmissionsCategorySubs = source?.emissions_sub_category_list;
    // 类别
    const emissionsCategorys = caculateCategorys(
      allEmissionsCategorySubs || [],
    );

    return emissionsCategorys;
  }, [source]);
  // 根据选中的
  const computedEmissionsSubCategorys = useMemo(() => {
    if (unionType?.emissions_category) {
      return source?.emissions_sub_category_list?.filter(
        // @ts-ignore
        ({ emissions_category }) =>
          emissions_category === unionType.emissions_category,
      );
    }
    return source?.emissions_sub_category_list;
  }, [unionType?.emissions_category]);
  // 首次进入数据初始化
  // useEffect(() => {
  //   const p1 = getEmissions().catch(() => {
  //     Toast('error', '网络错误');
  //   });
  //   let p2 = Promise.resolve();
  //   if (editId) {
  //     p2 = getEmissionInfo(+editId).then(({ data }) => {
  //       const r = data.data;
  //       if (r) {
  //         r.gas_type = r.produce_gas_type_list.map(
  //           ({ prpduce_gas_name }) => prpduce_gas_name,
  //         );
  //         r.produce_gas_type_list.forEach(gas => {
  //           r[gas.prpduce_gas_name] = gas;
  //         });
  //         p1.then(sourceData => {
  //           const em = sourceData?.emission_source_list?.find(
  //             ({ label, label_two }) =>
  //               Object.is(
  //                 `${label}${label_two}`,
  //                 `${r.emission_source}${r.facility}`,
  //               ),
  //           )?.value;
  //           const facility = sourceData?.facility_list?.find(
  //             ({ label }) => label === r.facility,
  //           )?.value;
  //           setUnionType({
  //             ...r,
  //             emission_source: em,
  //             facility,
  //           });
  //         }).finally(() => {
  //           isFirstLoad.current = false;
  //         });
  //       }
  //     });
  //   }
  //   Promise.allSettled([p1, p2]).finally(() => {
  //     if (!editId) isFirstLoad.current = false;
  //   });
  // }, []);

  const setFormValue = (target: FormValueTargetPath, val: any) => {
    if (isFirstLoad.current) return;
    const r = assign({}, unionType, form.getFieldsValue());
    if (target instanceof Array) {
      target.forEach((key, index) => {
        r[key] = val?.[index];
      });
    } else if (target instanceof Object) {
      Object.keys(target).forEach((key, i) => {
        let gasVal = r[key];
        if (!gasVal) {
          r[key] = {};
          gasVal = r[key];
        }
        target[key].forEach((subKey, j) => {
          gasVal[subKey] = val[i + j];
        });
      });
    } else {
      r[target] = val;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setUnionType(state => assign({}, state, r));
    form.setFieldsValue({
      ...r,
    });
  };

  // 根据选中的气体判断渲染的组件
  const gasComponentsRender = (gasItem: PrpducegGasList): Children[] => {
    const { label: gas, greenhouse_gases_list } = gasItem;

    const unitAndGWPListMap = {
      greenhouse_gases_unit_list: greenhouse_gases_list?.reduce((tmp, next) => {
        return [...tmp, ...next.greenhouse_gases_unit_list];
      }, [] as UnitList[]),
      potential_energy_list: greenhouse_gases_list?.reduce((tmp, next) => {
        return [...tmp, ...next.potential_energy_list];
      }, [] as ActivityDataListElement[]),
    } as GreenhouseGasesList;

    // 单位
    const units = uniqBy(
      genLabelSelectOptions(unitAndGWPListMap?.greenhouse_gases_unit_list),
      'label',
    );

    // 潜势
    const gwpList = uniqBy(
      unitAndGWPListMap?.potential_energy_list?.map(({ label }) => ({
        label,
        value: label,
      })) || [],
      'label',
    );
    const gwpPlaceholder = gwpList?.[0]?.label;
    const baseComponentType: Children[] = [
      {
        type: EmissionFormType.select,
        props: {
          label: '单位',
          value: unionType?.[gas]?.[GasCheckedSubKey.prpduce_gas_unit],
          name: [gas, GasCheckedSubKey.prpduce_gas_unit],
          rules: [{ required: true, message: '单位不为空' }],
          onChange: () => {},
          options: units,
        },
      },
      {
        type: EmissionFormType.selectAndMsgBox,
        props: {
          label: 'GWP潜势',
          name: [gas, GasCheckedSubKey.potential_energy_name],
          name2: [gas, GasCheckedSubKey.potential_energy_numeric],
          placeholder: `选择版本${
            gwpPlaceholder ? `,默认${gwpPlaceholder}` : ''
          }`,
          secondPlaceholder: '默认出现排放因子',
          value: unionType?.[gas]?.[GasCheckedSubKey.potential_energy_name],
          secondValue:
            unionType?.[gas]?.[GasCheckedSubKey.potential_energy_numeric], // potential_energy_numeric
          rules: [{ required: true, message: 'GWP潜势不为空' }],
          onChange: val => {
            setFormValue(
              {
                [gas]: [
                  GasCheckedSubKey.potential_energy_name,
                  GasCheckedSubKey.potential_energy_numeric,
                ],
              },
              [
                val,
                unitAndGWPListMap?.potential_energy_list?.find(
                  ({ label }) => label === val,
                )?.label_two,
              ],
            );
          },
          options: gwpList,
        },
      },
    ];
    const label = `${gas}排放因子`;

    const caculateType =
      //  根据排放源 依赖关系渲染选择框，如果是用户输入的排放源这里可以手动修改排放因子
      // 和 富城 确认，这里要写死
      (
        gas === 'HFCs' || gas === 'PFCs'
          ? {
              type: EmissionFormType.selectAndMsgBox,
              props: {
                label,
                placeholder: '物种选择',
                name: [gas, GasCheckedSubKey.greenhouse_gases],
                name2: [gas, GasCheckedSubKey.prpduce_gas_emission_factor],
                secondPlaceholder: '默认出现排放因子',
                value: unionType?.[gas]?.[GasCheckedSubKey.greenhouse_gases],
                secondValue:
                  unionType?.[gas]?.[
                    GasCheckedSubKey.prpduce_gas_emission_factor
                  ],
                onSecondValueChange: val => {
                  setFormValue(
                    { [gas]: [GasCheckedSubKey.prpduce_gas_emission_factor] },
                    [val],
                  );
                },
                rules: [{ required: true, message: '排放因子不为空' }],
                rules2: [
                  {
                    required: true,
                    message: '排放因子大于0且不为空',
                    min: 0,
                    transform: (val: string) => +val,
                    type: 'number',
                  },
                ],
                onChange: (val: string) => {
                  setFormValue(
                    {
                      [gas]: [
                        GasCheckedSubKey.greenhouse_gases,
                        GasCheckedSubKey.prpduce_gas_emission_factor,
                      ],
                    },
                    [
                      val,
                      greenhouse_gases_list.find(it => it.label === val)
                        ?.label_two,
                    ],
                  );
                },
                options: genLabelSelectOptions(greenhouse_gases_list),
              },
            }
          : {
              type: EmissionFormType.input,
              props: {
                prop2: {
                  name: [gas, GasCheckedSubKey.greenhouse_gases],
                },
                label,
                value:
                  unionType?.[gas]?.[
                    GasCheckedSubKey.prpduce_gas_emission_factor
                  ],
                name: [gas, GasCheckedSubKey.prpduce_gas_emission_factor],
                type: 'number',
                rules: [
                  {
                    required: true,
                    message: '排放因子大于0且不为空',
                    min: 0,
                    transform: val => +val,
                    type: 'number',
                  },
                ],
                onChange: val => {
                  setFormValue(
                    {
                      [gas]: [
                        GasCheckedSubKey.greenhouse_gases,
                        GasCheckedSubKey.prpduce_gas_emission_factor,
                      ],
                    },
                    // @ts-ignore
                    [gas, val > 0 ? +val : undefined],
                  );
                },
              },
            }
      ) as Children;
    return [caculateType, ...baseComponentType];
  };

  // 根据 checkbox 选中的气体渲染组件
  const computedChildren = (): Children[] => {
    let res = [] as Children[];
    const checkedGasType = compact(unionType?.gas_type as string[]);

    res =
      checkedGasType
        ?.map((gas: string) =>
          gasComponentsRender({
            label: gas,
            greenhouse_gases_list: gasMap[gas],
          }),
        )
        .flat() || [];
    return res;
  };

  // if (editId && (!source || !unionType)) return <EmptyLoading />;
  // if (!Object.keys(gasMap)?.length) return <EmptyLoading />;

  // type AddSelectItem = {
  //   label: string;
  //   type: keyof AddEmissionSelectItem;
  //   parentId?: number;
  // };
  // const addItem = async ({ label, type }: AddSelectItem) => {
  //   // 不允许添加相同数据
  //   switch (type) {
  //     case 'facility':
  //       // if (source?.facility_list?.find(opt => opt.label === label))
  //       //   return message.error(`${label} 已经在列表中`);
  //       break;
  //     case 'activitydatarecord':
  //       if (source?.activity_data_list?.find(opt => opt.label === label))
  //         return Toast('warn', `${label} 已经在列表中`);
  //       break;
  //     case 'emissionsourcedepartment':
  //       if (
  //         source?.emission_source_department_list?.find(
  //           opt => opt.label === label,
  //         )
  //       )
  //         Toast('warn', `${label} 已经在列表中`);
  //       break;
  //     case 'emissionfactorsource':
  //       if (
  //         source?.emission_factor_source_list?.find(opt => opt.label === label)
  //       )
  //         Toast('warn', `${label} 已经在列表中`);
  //       break;
  //     default:
  //   }

  //   // await addEmissionSelectItem({
  //   //   rely_type: type,
  //   //   label,
  //   //   edition: editionTypeNum,
  //   // }).then(({ data }) => {
  //   //   if (data?.code === 200 && data?.data?.label === label) {
  //   //     if (type === 'activitydatarecord') {
  //   //       const activity_data_record_mode_list = [
  //   //         data.data,
  //   //         ...(source?.activity_data_record_mode_list || []),
  //   //       ];
  //   //       // @ts-ignore
  //   //       setSource({ ...source, activity_data_record_mode_list });
  //   //     } else if (type === 'emissionsourcedepartment') {
  //   //       const emission_source_department_list = [
  //   //         data.data,
  //   //         ...(source?.emission_source_department_list || []),
  //   //       ];
  //   //       // @ts-ignore
  //   //       setSource({ ...source, emission_source_department_list });
  //   //     } else {
  //   //       return getEmissions();
  //   //     }
  //   //   } else {
  //   //     Toast('error', '添加失败');
  //   //   }
  //   // });
  // };

  const emissionArr: EmissionArr[] = [
    {
      title: '基础数据录入',
      props: {},
      children: [
        {
          type: EmissionFormType.select,
          props: {
            label: '设施/活动',
            name: 'facility',
            rules: [{ required: true, message: '设施/活动不为空' }],
            onChange: val => {
              setFormValue(['facility'], [val]);
            },
            // onAddItem: async label => addItem({ label, type: 'facility' }),
            // onDelItem: async e => {
            //   await delItem({
            //     item: e,
            //     type: 'facility',
            //   });
            // },
            options: checkList(source?.facility_list),
          },
        },
        {
          type: EmissionFormType.select,
          props: {
            label: '排放源',
            // onAddItem: unionType?.facility
            //   ? async label => {
            //       await addEmissionSelectItemWithRelation({
            //         edition: editionTypeNum,
            //         facility: unionType?.facility,
            //         label,
            //         rely_type: 'emission_source',
            //       });
            //     }
            //   : undefined,
            // onDelItem: async (e, item) =>
            //   delEmissionSelectItemWithRelations({
            //     id:
            //       source?.emission_source_list?.find(
            //         t => `${t.label} (${t.label_two})` === item,
            //       )?.value || '',
            //     rely_type: 'emission_source',
            //   }).then(() => getEmissions()),

            name: 'emission_source',
            rules: [{ required: true, message: '排放源不为空' }],
            onChange: val => {
              setFormValue(['emission_source'], [val]);
            },
            options: source?.emission_source_list?.map(t => ({
              ...t,
              key: t.value || t.label,
              value: t.value,
              label: `${t.label} (${t.label_two})`,
            })),
          },
        },
        {
          type: EmissionFormType.doubleSelect,
          props: {
            label: '排放类别',
            name2: 'emissions_subcategory',
            name: 'emissions_category',
            rules: [{ required: true, message: '排放类别不为空' }],
            rules2: [{ required: true, message: '排放子类别不为空' }],
            props: [
              {
                placeholder: '排放主类别',
                value: unionType?.emissions_category,
                onChange: val => {
                  setFormValue(['emissions_category'], [val]);
                },
                // 后台不要value，所以在这里都是用label
                options: genLabelSelectOptions(computedEmissionsCategorys),
              },
              {
                placeholder: '排放子类别',
                onChange: val => {
                  setFormValue('emissions_subcategory', val);
                },
                // onAddItem:
                //   unionType?.emissions_category && unionType?.emission_source
                //     ? async label =>
                //         addEmissionSelectItemWithRelation({
                //           edition: editionTypeNum,
                //           emissions_category:
                //             source?.emissions_sub_category_list?.find(
                //               ({ emissions_category }) =>
                //                 emissions_category ===
                //                 unionType.emissions_category,
                //             )?.emissions_category || '',
                //           emission_source:
                //             source?.emission_source_list.find(
                //               ({ value }) =>
                //                 value === unionType.emission_source,
                //             )?.value || '',
                //           label,
                //           rely_type: 'emissions_sub_category',
                //         })
                //     : undefined,
                // onDelItem: async (e, item) =>
                //   delEmissionSelectItemWithRelations({
                //     id:
                //       getSelectOptionsValue(
                //         item,
                //         source?.emissions_sub_category_list,
                //       ) || '',
                //     rely_type: 'emissions_category',
                //   }).then(() => getEmissions()),
                value: unionType?.emissions_subcategory,
                options: genLabelSelectOptions(
                  uniqBy(computedEmissionsSubCategorys || [], 'label'),
                ),
              },
            ],
          },
        },
      ],
    },
    {
      title: '基础属性选择',
      props: {},
      children: [
        {
          type: EmissionFormType.input,
          props: {
            label: '活动数据',
            name: 'active_data',
            type: 'number',
            rules: [
              {
                required: true,
                message: '活动数据不为空且大于0',
                min: 0,
                transform: val => +val,
                type: 'number',
              },
            ],
            onChange: noop,
          },
        },
        {
          type: EmissionFormType.select,
          props: {
            label: '单位',
            name: 'unit',
            rules: [{ required: true, message: '单位不为空' }],
            onChange: noop,
            options: uniqBy(
              genLabelSelectOptions(source?.emission_source_unit_list),
              'label',
            ),
          },
        },
        {
          type: EmissionFormType.select,
          props: {
            label: '活动数据记录方式',
            name: 'active_data_record_mode',
            rules: [{ required: true, message: '活动数据记录方式不为空' }],
            onChange: () => {},
            // onAddItem: async label =>
            //   addItem({ label, type: 'activitydatarecord' }),
            // onDelItem: async (e, item) =>
            //   delItem({
            //     item:
            //       getSelectOptionsValue(
            //         item,
            //         source?.activity_data_record_mode_list,
            //       ) || '',
            //     type: 'activitydatarecord',
            //   }),
            options: genLabelSelectOptions(
              source?.activity_data_record_mode_list,
            ),
          },
        },
        {
          type: EmissionFormType.select,
          props: {
            label: '活动数据类别',
            name: 'active_data_type',
            value: unionType?.active_data_type,
            rules: [{ required: true, message: '活动数据类别不为空' }],
            onChange: val => {
              setFormValue(
                ['active_data_type', 'active_data_grade'],
                [
                  val,
                  source?.activity_data_list?.find(({ label }) => val === label)
                    ?.label_two,
                ],
              );
            },
            options: genLabelSelectOptions(source?.activity_data_list),
          },
        },
        {
          type: EmissionFormType.select,
          props: {
            label: '活动数据得分',
            name: 'active_data_grade',
            placeholder: '与活动数据类别关联',
            value: unionType?.active_data_grade,
            rules: [{ required: true, message: '活动数据得分不为空' }],
            onChange: val => {
              setFormValue(
                ['active_data_type', 'active_data_grade'],
                [
                  source?.activity_data_list?.find(
                    ({ label_two }) => val === label_two,
                  )?.label,
                  val,
                ],
              );
            },
            options: source?.activity_data_list?.map(({ label_two }) => ({
              label: label_two,
              value: label_two,
            })),
          },
        },
        {
          type: EmissionFormType.select,
          props: {
            label: '保存部门',
            name: 'department',
            rules: [{ required: true, message: '保存部门不为空' }],
            onChange: () => {},
            // onAddItem: async label =>
            //   addItem({ label, type: 'emissionsourcedepartment' }),
            // onDelItem: async (e, item) =>
            //   delItem({
            //     item:
            //       getSelectOptionsValue(
            //         item,
            //         source?.emission_source_department_list,
            //       ) || '',
            //     type: 'emissionsourcedepartment',
            //   }),
            options: genLabelSelectOptions(
              source?.emission_source_department_list,
            ),
          },
        },
      ],
    },
    {
      title: '产生气体种类',
      props: {
        childrenColSpan: [24],
      },
      children: [
        {
          type: EmissionFormType.checkboxGroup,
          props: {
            value: unionType?.gas_type,
            options: Object.keys(gasMap),
            label: '气体种类',
            name: 'gas_type',
            rules: [{ required: true, message: '气体种类不为空' }],
            onChange: gas_type => {
              const newGas = differenceWith(
                gas_type as string[],
                unionType?.gas_type || [],
              );
              if (newGas.length) {
                // 生成新气体的空数据
                newGas.forEach(gas => {
                  setFormValue(
                    {
                      [gas]: [
                        GasCheckedSubKey.potential_energy_name,
                        GasCheckedSubKey.potential_energy_numeric,
                        GasCheckedSubKey.prpduce_gas_emission_factor,
                        GasCheckedSubKey.greenhouse_gases,
                        GasCheckedSubKey.prpduce_gas_unit,
                      ],
                    },
                    [],
                  );
                });
              }
              setFormValue('gas_type', gas_type);
            },
          },
        },
        ...computedChildren(),
      ],
    },
    {
      title: '排放因子类别',
      props: {},
      children: [
        {
          type: EmissionFormType.select,
          props: {
            label: '排放因子类别',
            name: 'emission_factor',
            value: unionType?.emission_factor,
            rules: [{ required: true, message: '排放因子类别不为空' }],
            onChange: val => {
              setFormValue(
                ['emission_factor', 'emission_factor_grade'],
                [
                  val,
                  source?.emission_source_emission_factor_list?.find(
                    ({ label }) => val === label,
                  )?.label_two,
                ],
              );
            },
            options: genLabelSelectOptions(
              source?.emission_source_emission_factor_list,
            ),
          },
        },
        {
          type: EmissionFormType.select,
          props: {
            label: '排放因子得分',
            name: 'emission_factor_grade',
            placeholder: '与活动因子类别关联',
            value: unionType?.emission_factor_grade,
            rules: [{ required: true, message: '排放因子得分不为空' }],
            onChange: val => {
              setFormValue(
                ['emission_factor_grade', 'emission_factor'],
                [
                  val,
                  source?.emission_source_emission_factor_list?.find(
                    ({ label_two }) => val === label_two,
                  )?.label,
                ],
              );
            },
            options: source?.emission_source_emission_factor_list?.map(
              ({ label_two }) => ({ label: label_two, value: label_two }),
            ),
          },
        },
        {
          type: EmissionFormType.select,
          props: {
            label: '排放因子来源',
            name: 'emission_factor_source',
            placeholder: '确定排放源后默认展示',
            rules: [{ required: true, message: '排放因子来源不为空' }],
            onChange: val => {
              setFormValue('emission_factor_source', val);
            },
            // onAddItem: async label =>
            //   addItem({ label, type: 'emissionfactorsource' }),
            // onDelItem: async (e, item) =>
            //   delItem({
            //     item:
            //       getSelectOptionsValue(
            //         item,
            //         source?.emission_factor_source_list,
            //       ) || '',
            //     type: 'emissionfactorsource',
            //   }),
            options: genLabelSelectOptions(source?.emission_factor_source_list),
          },
        },
      ],
    },
  ];
  const save = async () => {
    await form
      .validateFields()
      .then(({ gas_type, ...res }) => {
        // 处理成接口需要的数据
        res.produce_gas_type_list = [];
        res.carbon_emission_info = id;
        // const emission_source = source?.emission_source_list.find(
        //   ({ value }) => value === unionType?.emission_source,
        // )?.label;
        // const facility = source?.facility_list.find(
        //   ({ value }) => value === unionType?.facility,
        // )?.label;
        // gas_type?.forEach((gas: string) => {
        //   res.produce_gas_type_list.push({
        //     ...res[gas],
        //     prpduce_gas_id:
        //       unionType?.produce_gas_type_list?.find(
        //         // @ts-ignore
        //         ({ prpduce_gas_name }) => prpduce_gas_name === gas,
        //       )?.id || '',
        //     prpduce_gas_name: gas,
        //   });
        // });
        // const emission_factor_type =
        //   source?.emission_source_emission_factor_list?.find(
        //     ({ label }) => label === res.emission_factor,
        //   )?.value || '';
        // const emission_factor_source =
        //   source?.emission_factor_source_list?.find(
        //     ({ label }) => label === res.emission_factor_source,
        //   )?.value || '';

        // const noErrMsg = '未知错误';
        // if (editId) {
        //   return putEmissionSourceData(editId, {
        //     ...res,
        //     emission_source,
        //     facility,
        //     edition: editionTypeNum,
        //   })
        //     .then(({ data }) => {
        //       if (data?.code === 201) {
        //         return Toast('warn', `${data?.msg}` || noErrMsg);
        //       }
        //       Toast('success', '更新成功');
        //       finishFn();
        //     })
        //     .catch(() => {
        //       Toast('error', '更新失败');
        //     })
        //     .catch(noop);
        // }
        // return createEmissionSourceData({
        //   ...res,
        //   emission_source,
        //   facility,
        //   edition: editionTypeNum,
        // }).then(({ data }) => {
        //   if (data?.code === 201) {
        //     return Toast('warn', `${data?.msg}` || noErrMsg);
        //   }
        //   Toast('success', '创建成功');
        //   finishFn();
        // });
      })
      .catch(noop);
  };
  return (
    <div className='add_emission_data'>
      <div>
        <Form
          className='addlist_content_From'
          initialValues={unionType}
          form={form}
          name='basic'
        >
          {emissionArr.map(({ title, children, props }) => (
            <>
              <div className='add_emission_data_title'>{title}</div>
              {children.length > 0 && (
                <Row className='basic_data'>
                  {children.map((item, index) => (
                    // eslint-disable-next-line react/prop-types
                    <Col span={props?.childrenColSpan?.[index] ?? 8}>
                      {renderChildren(item)}
                    </Col>
                  ))}
                </Row>
              )}
            </>
          ))}
          <Form.Item className='submit_button'>
            <Button onClick={() => history.go(-1)}>取消</Button>
            <Button type='primary' onClick={async () => save()}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default memo(AddEmissionData);
