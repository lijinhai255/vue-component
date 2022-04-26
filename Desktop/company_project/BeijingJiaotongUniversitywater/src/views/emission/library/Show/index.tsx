import { FC, useEffect, useState, useMemo, useCallback } from 'react';
// import IconFont from '@components/iconfont';
import {
  Form,
  Col,
  Button,
  Row,
  DatePicker,
  InputNumber,
  message,
  Upload,
  Cascader,
  Select,
  Modal,
} from 'antd';
import { useFormik } from 'formik';
import VerifyUtils, { PersonKeys } from '@utils/verifty';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import style from '../index.module.scss';
import { combineClassName, getFileSuffix } from '@/utils';
import ReturnFromItem from './Component/FromItem';
import Content from './Component/Content';
import {
  ColUmsType,
  apiInfoDraft,
  apiInfoSubmit,
  apiDataSubmit,
  apiInfoDetail,
  apiProjectDetail,
  apiProjectAudit,
  apiProjectInfoList,
  apiDataDraft,
  apiProjectAuditInfoList,
  apiProjectDataAuditInfoList,
  apiinfoCcList,
  apiQueryProjectConfigData,
  apiDataCalc,
  apiProjectCalc,
} from '../../service';
import { apiAddress } from '@/views/system/register/service';
import useSyncCallback from '@/utils/useSyncCallback';
import { sourceArr, LeftArr } from './returnArr/returnArr'; // 新建并网
import { companyItemFnArr } from './returnArr/companyItemFnArr';
import ExamDetail from './Component/ExamDetail';
import ExamModel from './Component/ExamModel';
import Footer from './Component/ComFooter';
import ReturnUpload from './Component/ReturnUpload';
/**-----监测--------**/
import { metionArr } from './returnArr/metionArr'; // 风力发电 新建并网
import ProductionModel from './Component/ProductionModel'; // 投产历年发电量
// 计算方式
import { fossilTypeArr } from './CulNumber/index';
import {
  returnFileList,
  fromGetData,
  fromGetAreaCodes,
  returnApiDataDraftObj,
  returnApiInfoDraftObj,
  returnApiDataSubmitObj,
  returnApiInfoSubmitObj,
  culSomeArr,
} from './utils';
import {
  ItemType,
  UploadType,
  ProjectListType,
  AreaData,
  ExamData,
  ExamData2,
  FormikConsumptionType,
  ProductionDataType,
} from './type/index';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { Option } = Select;

const Orgstaff: FC = () => {
  // 可研项目
  const [feasibilityReportFile, setFeasibilityReportFile] = useState<
    UploadType[]
  >([]);
  //立项文件
  const [projectApprovalFile, setProjectApprovalFile] = useState<UploadType[]>(
    [],
  );
  // 环评报告
  const [envAssessmentFile, setEnvAssessmentFile] = useState<UploadType[]>([]);
  // 环评批复文件
  const [envApprovalFile, setEnvApprovalFile] = useState<UploadType[]>([]);
  // 并网文件
  const [gridConnectFile, setGridConnectFile] = useState<UploadType[]>([]);
  // 下网文件
  const [elecUpFile, setElecUpFile] = useState<UploadType[]>([]);
  // 下网文件
  const [elecDownFile, setElecDownFile] = useState<UploadType[]>([]);
  // 实际发电量上传文件
  const [actualElectFile, setActualElectFile] = useState<UploadType[]>([]);

  // const [imageLoading, changeImageLoading] = useState(false);
  const history = useHistory();
  const [dataValue, changeDataValue] = useState<{
    auditStatus?: number | string;
    energyType?: number | string;
    projectType?: number | string;
    locationFactor?: number | string;
    netElecUp?: number | string;
    actualReduction?: number | string;
    gridConnectName?: string;
    gridConnectFile?: UploadType[];
  }>({});
  const [projectList, getProjectList] = useState<ProjectListType[]>([]);
  // const [currentAreaParams, getCurentAreaParams] = useState<CurrentAreaParams>({
  //   addressCode: '',
  //   addressId: '',
  //   createTime: '',
  //   id: '',
  //   locationFactor: '',
  //   updateTime: '',
  //   yearHours: '',
  // });
  // 获取枚举值
  const [areaData, getAreaData] = useState<AreaData[]>([]);
  // 获取减排项目
  const [examData, getExmaData] = useState<ExamData[]>([]);
  const [examData2, getExmaData2] = useState<ExamData2[]>([]);
  const [isModalVisible, changeIsModalVisible] = useState(false);
  const [isShowGridConnectFile, changeIsGridConnectFile] =
    useState<boolean>(false); // 判断并网文件 是否需要 展示
  // 控制 投产前历年发电量弹窗 还是其他类型的弹窗
  //订单详情 进来 缓存 energyType projectType
  const [catchEnergyType, getCatchEnergyType] = useState<string>('1');
  const [catchProjectType, getCatchProjectType] = useState<string>('1');
  const [title, changeTitle] = useState('');
  const [examForm] = Form.useForm();
  const [form] = Form.useForm();
  const [queryProjectConfigData, getQueryProjectConfigData] = useState<{
    reductionParamCheckProject?: {
      checkStatus: number;
      fieldName: string;
    }[];
    reductionParamShowProject?: {
      checkStatus: number;
      fieldName: string;
    }[];
    reductionParamUncheckProject?: {
      checkStatus: number;
      fieldName: string;
    }[];
  }>({});
  const [catchData, getCatchData] = useState<
    FormikConsumptionType[] | ProductionDataType[]
  >([]);
  const initFile = () => {
    setActualElectFile([]);
    setElecDownFile([]);
    setElecUpFile([]);
    setGridConnectFile([]);
    setEnvApprovalFile([]);
    setEnvAssessmentFile([]);
    setProjectApprovalFile([]);
    setFeasibilityReportFile([]);
  };
  // 获取参数配置相关方法
  const apiQueryProjectConfigDataFn = async (
    energyType?: string,
    projectType?: string,
  ) => {
    await apiQueryProjectConfigData({
      energyType: energyType || '1',
      projectType: projectType || '1',
      type: history.location.pathname.indexOf('monitor') >= 0 ? '2' : '1',
    }).then(({ data }) => {
      getQueryProjectConfigData({
        reductionParamCheckProject: data?.data?.reductionParamCheckProject,
        reductionParamShowProject: data?.data?.reductionParamShowProject,
        reductionParamUncheckProject: data?.data?.reductionParamUncheckProject,
      });
    });
  };
  //@ts-ignore
  const setFileList = (item: { title?: string }, newArr: newFileList[]) => {
    console.log(item.title, 'item.title=item.title', newArr);
    if (item.title === 'feasibilityReportFile') {
      setFeasibilityReportFile([...newArr]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        feasibilityReportFile: newArr.length > 0 ? [...newArr] : null,
      });
      return;
    }
    if (item.title === 'projectApprovalFile') {
      setProjectApprovalFile([...newArr]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        projectApprovalFile: newArr.length > 0 ? [...newArr] : null,
      });
      return;
    }
    if (item.title === 'envAssessmentFile') {
      setEnvAssessmentFile([...newArr]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        envAssessmentFile: newArr.length > 0 ? [...newArr] : null,
      });
      return;
    }
    if (item.title === 'envApprovalFile') {
      setEnvApprovalFile([...newArr]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        envApprovalFile: newArr.length > 0 ? [...newArr] : null,
      });
      return;
    }
    if (item.title === 'gridConnectFile') {
      setGridConnectFile([...newArr]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        gridConnectFile: newArr.length > 0 ? [...newArr] : null,
      });
      return;
    }
    if (item.title === 'elecUpFile') {
      setElecUpFile([...newArr]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        elecUpFile: newArr.length > 0 ? [...newArr] : null,
      });
      return;
    }
    if (item.title === 'elecDownFile') {
      setElecDownFile([...newArr]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        elecDownFile: newArr.length > 0 ? [...newArr] : null,
      });
      return;
    }
    if (item.title === 'actualElectFile') {
      setActualElectFile([...newArr]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        actualElectFile: newArr.length > 0 ? [...newArr] : null,
      });
      return;
    }
  };
  // 控制 投产前历年发电量
  const [isProductionModelVisible, changeIsProductionModelVisible] =
    useState<boolean>(false);

  const culData = async (
    type: keyof ColUmsType,
    index: number,
    value: string,
  ) => {
    let arr = formik.values;
    arr[index][type] = value;
    await formik.setValues([...arr]);
    // 判断arr
    let culArr = arr.some(item => item.ratedPower && item.num);
    if (culArr) {
      form.setFieldsValue({
        ...form.getFieldsValue(true),
        generatorList: formik.values,
      });
    }
    if (history.location.pathname.includes('monitor')) {
      culMontorNumber();
    } else {
      culNumber();
    }
  };
  const culDataCompution = async (
    type: keyof { consumption: string; fossilFuelType: string },
    index: number,
    value: string,
  ) => {
    let arr = formikConsumption.values;
    arr[index][type] = value;
    await formikConsumption.setValues([...arr]);
    form.setFieldsValue({
      ...form.getFieldsValue(true),
      fossilFuelList: formikConsumption.values,
    });
    culNumber();
  };
  const formik = useFormik<ColUmsType[]>({
    // 机组信息
    initialValues: [{ ratedPower: '', num: '' }],
    onSubmit: values => {
      console.log(values, 'values');
    },
  }); // 机组信息
  const formikConsumption = useFormik<FormikConsumptionType[]>({
    // 化石燃料消耗量
    initialValues: [
      {
        fossilFuelType: null, //化石燃料类型,可用值:1,2,3
        consumption: null, //消耗量
        deviceElec: null, // 投运前自用发电设备发电量
        year: null, //  年份
        unitType: null, //单位
      },
    ],
    onSubmit: values => {
      console.log(values, 'values');
    },
  }); // 化石燃料消耗量
  // 投产前历年发电量
  const productionData = useFormik<ProductionDataType[]>({
    // 投产前历年发电量
    initialValues: [
      {
        netElecUp: null,
        year: null,
      },
    ],
    onSubmit: values => {
      console.log(values, 'values');
    },
  }); // 投产前历年发电量
  // 审核 相关数据
  // const [auditInfo, getAyditInfo] = useState({});

  const culDisAbled = () => {
    return ['detail', 'examine', 'exam'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  // 基本信息
  // companyItemFn
  const companyItemFn = useMemo<ItemType[]>(() => {
    return companyItemFnArr(culDisAbled(), form.getFieldValue('energyType'));
  }, [dataValue, areaData]);
  const culArr = (arr: ItemType[]) => {
    let newArr: ItemType[] = [];
    arr.map(item => {
      if (
        [
          ...(queryProjectConfigData?.reductionParamCheckProject
            ? queryProjectConfigData?.reductionParamCheckProject
            : []),
          ...(queryProjectConfigData?.reductionParamShowProject
            ? queryProjectConfigData?.reductionParamShowProject
            : []),
        ].some(it => {
          return it.fieldName === item.title && it.checkStatus === 1;
        })
      ) {
        newArr.push(item);
      }
      if (
        [
          ...(queryProjectConfigData?.reductionParamUncheckProject
            ? queryProjectConfigData?.reductionParamUncheckProject
            : []),
        ].some(it => it.fieldName == item.title && it.checkStatus === 1)
      ) {
        // return item;
        console.log(
          item.title === 'gridConnectFile',
          isShowGridConnectFile === false,
          isShowGridConnectFile,
          item.title,
        );
        newArr.push(item);
      } else {
        if (item.title === 'projectAddress') {
          // return { ...item, type: 'empty', name: '' };
          newArr.push({ ...item, type: 'empty', name: '' });
        }
        if (
          item.title === 'gridConnectFile' &&
          isShowGridConnectFile === false
        ) {
          // return [
          //   { ...item, type: 'empty', name: '' },
          //   { ...item, type: 'empty', name: '' },
          // ];
          newArr.push({ ...item, type: 'empty', name: '' });
          newArr.push({ ...item, type: 'empty', name: '' });
        }

        // return { ...item };
      }
    });
    return newArr;
  };
  const culFromType = (arr: ItemType[]) => {
    let newArr: ItemType[] = [];
    arr.map(item => {
      if (!item.tempEnergyType && !item.tempProjectType) {
        newArr.push(item);
      }
      if (
        item?.tempEnergyType?.some(
          it => it === form.getFieldValue('energyType'),
        ) &&
        item?.tempProjectType?.some(
          it => it === form.getFieldValue('projectType'),
        )
      ) {
        newArr.push(item);
      }
      // return {} as ItemType;
    });
    return newArr ? newArr : ([] as ItemType[]);
  };
  // 监测数据 返回表单数组
  const metionItemFn = useMemo<ItemType[]>(() => {
    return culFromType(
      culArr(
        metionArr(
          culDisAbled(),
          isShowGridConnectFile,
          projectList,
        ) as ItemType[],
      ),
    );
  }, [dataValue, areaData, isShowGridConnectFile, queryProjectConfigData]);
  // 项目信息 返回表单数组
  const leftItemFn = useMemo<ItemType[]>(() => {
    return culFromType(
      culArr(LeftArr(culDisAbled()) as ItemType[]),
    ) as ItemType[];
  }, [dataValue, areaData, queryProjectConfigData]);

  // 新建项目计算公式
  const culNumber = async () => {
    await apiProjectCalc({
      ...form.getFieldsValue(true),
      areaCode: fromGetAreaCodes('areaCodes', form),
      replyTime: fromGetData('replyTime', form),
      generatorList: culSomeArr<ColUmsType>(formik.values as ColUmsType[])
        ? formik.values
        : [],
      feasibilityReportFile,
      projectApprovalFile,
      envAssessmentFile,
      envApprovalFile,
      gridConnectFile,
      deviceOpenedDate: fromGetData('  replyTime ', form), // 新增
      fossilFuelList: culSomeArr<FormikConsumptionType>(
        formikConsumption.values,
      )
        ? formikConsumption.values
        : [], //新增
      yearElecList: culSomeArr<ProductionDataType>(productionData.values)
        ? productionData.values
        : [], // 新增
    }).then(({ data }) => {
      if (data.code === 500) return message.error(data.msg);
      form.setFieldsValue({
        ...form.getFieldsValue(true),
        expectReduction: data?.data?.expectReduction,
        elecRefLimit: data?.data?.elecRefLimit,
        expectCapacity: data?.data?.expectCapacity,
        locationFactor: data?.data?.locationFactor,
      });
      changeDataValue({
        ...dataValue,
        ...data.data,
        locationFactor: data?.data?.locationFactor,
      });
    });
  };
  // 项目监测计算公式
  const culMontorNumber = async () => {
    await apiDataCalc({
      ...form.getFieldsValue(true),
      startDate: fromGetData('endDate', form, 0),
      endDate: fromGetData('endDate', form, 1),
    }).then(({ data }) => {
      console.log(data, 'data=data=data');
      if (data.code === 500) return message.error(data.msg);
      form.setFieldsValue({
        ...form.getFieldsValue(true),
        locationFactor: data?.data?.locationFactor,
        netElecUp: data?.data?.netElecUp,
        actualReduction: data?.data?.actualReduction,
        actualCapacity: data?.data?.actualCapacity,
      });
      changeDataValue({
        ...dataValue,
        locationFactor: data?.data?.locationFactor,
        netElecUp: data?.data?.netElecUp,
        actualReduction: data?.data?.actualReduction,
      });
    });
  };
  // 来源信息
  const sourceItemFn = useMemo<ItemType[]>(() => {
    return culArr(sourceArr(culDisAbled(), form, gridConnectFile));
  }, [
    areaData,
    feasibilityReportFile,
    projectApprovalFile,
    envAssessmentFile,
    envApprovalFile,
    gridConnectFile,
    queryProjectConfigData,
    dataValue,
    form.getFieldsValue(true),
  ]);
  // 机组信息
  const renderRow = (item: {
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
  }) => {
    return formik.values.map((it, index) => {
      return (
        <Row gutter={24} style={{ marginBottom: '10px' }}>
          <Col span={12}>
            <InputNumber
              controls={false}
              stringMode
              disabled={item.disabled}
              placeholder={item.placeholder}
              maxLength={item.maxLength}
              addonAfter='MW'
              max='99.9999'
              min='0.0001'
              step='0.0001'
              value={it.ratedPower}
              style={{ width: '100%' }}
              onChange={value => {
                culData('ratedPower', index, Number(value).toFixed(4));
              }}
            />
          </Col>
          <Col span={culDisAbled() ? 12 : 9} style={{ paddingLeft: '13px' }}>
            <InputNumber
              disabled={item.disabled}
              placeholder={item.placeholder}
              maxLength={item.maxLength}
              min='1'
              max='1000000'
              precision={0}
              addonAfter='台'
              value={it.num}
              style={{ width: '100%' }}
              onChange={value => {
                culData('num', index, value);
              }}
            />
          </Col>
          {!culDisAbled() && (
            <Col span={2} style={{ paddingLeft: '12px' }}>
              {Number(index) > 0 ? (
                <Button
                  danger
                  onClick={async () => {
                    let arr = formik.values.filter((_, ind) => ind !== index);
                    formik.setValues([...arr]);
                    // culNumber();
                    await culNumberCallback();
                  }}
                >
                  删除机组信息
                </Button>
              ) : (
                <Button
                  type='primary'
                  ghost
                  onClick={() => {
                    let arr = formik.values;
                    formik.setValues([...arr, { ratedPower: '', num: '' }]);
                  }}
                >
                  新增机组信息
                </Button>
              )}
            </Col>
          )}
        </Row>
      );
    });
  };
  // 化石燃料 消耗量
  const renderConsumpRow = (item: {
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
  }) => {
    return formikConsumption.values.map((it, index) => {
      return (
        <Row gutter={24} style={{ marginBottom: '10px' }}>
          <Col span={10}>
            <Select
              style={{ width: '100%' }}
              placeholder='请选择'
              value={it.fossilFuelType}
              onChange={e => {
                console.log(e, 'e=e=e');
                try {
                  let obj = fossilTypeArr.filter(
                    item => Number(item.fossilFuelType) === Number(e),
                  )[0];
                  console.log(obj, 'obj-obj');
                  form.setFieldsValue({
                    ...form.getFieldsValue(true),
                    ...obj,
                  });
                  changeDataValue({
                    ...dataValue,
                    ...obj,
                  });
                  culDataCompution('fossilFuelType', index, e);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {fossilTypeArr.map((item, index) => {
                return (
                  <Option key={index} value={item.fossilFuelType}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={10} style={{ padding: 0 }}>
            <InputNumber
              disabled={item.disabled}
              placeholder={item.placeholder}
              maxLength={item.maxLength}
              min='1'
              max='500'
              precision={0}
              addonAfter={form.getFieldValue('emissionFactorUnit')}
              value={it.consumption ? it.consumption : undefined}
              style={{ width: '100%' }}
              onChange={value => {
                // culData('num', index, value);
                culDataCompution('consumption', index, value);
              }}
            />
          </Col>
          {!culDisAbled() && (
            <Col span={4}>
              {Number(index) > 0 ? (
                <Button
                  danger
                  onClick={async () => {
                    let arr = formikConsumption.values.filter(
                      (_, ind) => ind !== index,
                    );
                    formikConsumption.setValues([...arr]);
                    // culNumber();
                    await culNumberCallback();
                  }}
                >
                  删除燃料类型
                </Button>
              ) : (
                <Button
                  type='primary'
                  ghost
                  onClick={async () => {
                    let arr = formikConsumption.values;
                    await formikConsumption.setValues([
                      ...arr,
                      {
                        fossilFuelType: null, //化石燃料类型,可用值:1,2,3
                        consumption: null, //消耗量
                        deviceElec: null, // 投运前自用发电设备发电量
                        year: null, //  年份
                        unitType: null, //单位
                      },
                    ]);
                  }}
                >
                  新增燃料类型
                </Button>
              )}
            </Col>
          )}
        </Row>
      );
    });
  };
  const renderLeftItem = useCallback(
    (LeftItem: ItemType[], className?: string) => {
      return (
        <Col
          span={24}
          className={combineClassName(
            `${style.col} ${className ? style[className] : ''}`,
          )}
        >
          {LeftItem.map(item => {
            if (item.type === 'Cascader') {
              return (
                <ReturnFromItem item={item}>
                  <Cascader
                    placeholder={item.placeholder}
                    options={areaData}
                    disabled={item.disabled}
                    // displayRender={label => {
                    //   return label[label.length - 1];
                    // }}
                    // expandTrigger='hover'
                    fieldNames={{
                      value: 'code',
                      label: 'name',
                      children: 'children',
                    }}
                    // @ts-ignore
                    onChange={async () => {
                      // await apiAreaParamFn(value);
                      await culNumber();
                    }}
                  />
                </ReturnFromItem>
              );
            }
            if (item.type === 'input') {
              return (
                <ReturnFromItem
                  item={item}
                  onChangeFn={() => {
                    if (item.title === 'yearAvgElec') {
                      culNumber();
                    }
                    if (
                      ['elecUp', 'elecDown', 'actualElec'].indexOf(
                        item.title ? item.title : '',
                      ) >= 0
                    ) {
                      culMontorNumber();
                    }
                  }}
                ></ReturnFromItem>
              );
            }
            if (item.type === 'InputNumber') {
              return (
                <ReturnFromItem
                  item={item}
                  onChangeFn={() => {
                    if (
                      ['yearAvgElec', 'newDeviceElec'].indexOf(
                        item.title ? item.title : '',
                      ) >= 0
                    ) {
                      culNumber();
                    }
                    if (
                      ['elecUp', 'elecDown', 'actualElec'].indexOf(
                        item.title ? item.title : '',
                      ) >= 0
                    ) {
                      culMontorNumber();
                    }
                    if (
                      history.location.pathname.indexOf('monitor') >= 0 &&
                      [
                        'carbonDioxideConc',
                        'methaneConc',
                        'steamYearOutput',
                      ].indexOf(item.title ? item.title : '') >= 0
                    ) {
                      culMontorNumber();
                    }
                  }}
                ></ReturnFromItem>
              );
            }
            // inputList
            if (item.type === 'inputList') {
              return (
                <ReturnFromItem item={item}>{renderRow(item)}</ReturnFromItem>
              );
            }
            // 化石消耗量
            if (item.type === 'inputConsumptionList') {
              return (
                <ReturnFromItem item={item}>
                  {renderConsumpRow(item)}
                </ReturnFromItem>
              );
            }
            if (item.type === 'year') {
              return (
                <ReturnFromItem
                  item={item}
                  dataValue={moment(form.getFieldValue('year'), 'YYYY')}
                ></ReturnFromItem>
              );
            }
            if (item.type === 'RangePicker') {
              return (
                <ReturnFromItem item={item}>
                  <RangePicker
                    style={{ width: '33%' }}
                    disabled={item.disabled}
                    // value={moment(form.getFieldValue('year'), 'YYYY')}
                  />
                </ReturnFromItem>
              );
            }
            if (item.type === 'upload') {
              return (
                <ReturnUpload>
                  {item.child
                    ? item.child.map(it => {
                        return (
                          <ReturnFromItem
                            item={it}
                            //@ts-ignore
                            onChangeFn={e => {
                              if (it.title === 'gridConnectName') {
                                console.log(e?.target?.value, it);
                                changeDataValue({
                                  ...dataValue,
                                  gridConnectName: e?.target?.value,
                                });
                              }
                            }}
                          ></ReturnFromItem>
                        );
                      })
                    : ''}
                  <ReturnFromItem
                    item={item}
                    beforeUploadFn={file => {
                      console.log(
                        form.getFieldValue('gridConnectFile'),
                        'gridConnectFile',
                      );
                      if (
                        // @ts-ignore
                        form.getFieldValue('gridConnectFile') &&
                        form.getFieldValue('gridConnectFile')?.length >= 10
                      ) {
                        message.error(`并网文件最多上传10份`);
                        return Upload.LIST_IGNORE;
                      }
                      if (file.size > Number(10) * 1024 * 1024) {
                        message.error(`最大10M`);
                        return Upload.LIST_IGNORE;
                      }
                      let suffx = getFileSuffix(file.name);
                      if (
                        !(
                          [
                            'pdf',
                            'jpg',
                            'png',
                            'PDF',
                            'JPG',
                            'PNG',
                            'JPEG',
                          ].indexOf(suffx) >= 0
                        )
                      ) {
                        message.error(`仅支持PDF、JPG、PNG格式的文件`);
                        return Upload.LIST_IGNORE;
                      }
                      return true;
                    }}
                    fileChanganeFn={({ fileList: newFileList }) => {
                      const newArr = newFileList.map(item => {
                        if (item.status === 'done' && item.originFileObj) {
                          if (item.response.code === 200) {
                            return {
                              ...item.response.data,
                            };
                          }
                          if (item.response.code !== 200) {
                            return {
                              uid: item.uid,
                              name: item.name,
                              status: 'error',
                              url: '',
                            };
                          }
                          VerifyUtils.ToastText(
                            item.response.code as PersonKeys,
                            item.response.msg,
                          );
                        }
                        return item;
                      });
                      setFileList(item, newArr);
                    }}
                    fileList={returnFileList(
                      item,
                      feasibilityReportFile,
                      projectApprovalFile,
                      envAssessmentFile,
                      envApprovalFile,
                      gridConnectFile,
                      elecUpFile,
                      elecDownFile,
                      actualElectFile,
                    )}
                  ></ReturnFromItem>
                </ReturnUpload>
              );
            }
            if (item.type === 'RadioGroup') {
              return (
                <ReturnFromItem
                  item={item}
                  disabled={culDisAbled()}
                  onChangeRadioGroupFn={async e => {
                    changeIsGridConnectFile(false); // 监测是 并网文件 初始化
                    let energyType = form.getFieldValue('energyType');
                    let projectType = form.getFieldValue('projectType');
                    let id = form.getFieldValue('id');
                    form.resetFields();
                    form.setFieldsValue({
                      energyType,
                      projectType,
                      id,
                    });
                    await formik.setValues([{ ratedPower: '', num: '' }]);
                    await formikConsumption.setValues([
                      {
                        fossilFuelType: null,
                        consumption: null,
                        deviceElec: null,
                        year: null,
                        unitType: null,
                      },
                    ]);
                    await productionData.setValues([
                      {
                        netElecUp: null,
                        year: null,
                      },
                    ]);
                    if (item.title === 'energyType') {
                      changeDataValue({
                        ...dataValue,
                        energyType: e.target.value,
                        projectType: '1',
                      });
                      form.setFieldsValue({
                        ...form.getFieldsValue(true),
                        energyType: e.target.value,
                        projectType: '1',
                      });
                    }
                    if (item.title === 'projectType') {
                      changeDataValue({
                        ...dataValue,
                        projectType: e.target.value,
                      });
                      form.setFieldsValue({
                        ...form.getFieldsValue(true),
                        projectType: e.target.value,
                        energyType,
                      });

                      // await apiInfoDetailFn();
                    }
                    if (
                      Number(form.getFieldValue('energyType')) ===
                        Number(catchEnergyType) &&
                      Number(form.getFieldValue('projectType')) ===
                        Number(catchProjectType) &&
                      history.location.pathname.indexOf('add') === -1
                    ) {
                      await apiInfoDetailFn();
                    }
                    // 获取参数配置
                    await apiQueryProjectConfigDataFn(
                      form.getFieldValue('energyType'),
                      form.getFieldValue('projectType'),
                    );
                  }}
                ></ReturnFromItem>
              );
            }
            if (item.type === 'select') {
              return (
                <ReturnFromItem
                  item={item}
                  onSelectChangeFn={async e => {
                    initFile();
                    //监测数据  项目选择 修改所在地的排放因子
                    if (
                      history.location.pathname.indexOf('/mession-monitor') >=
                        0 &&
                      item.title === 'projectId'
                    ) {
                      try {
                        let obj = projectList.find(
                          item => `${item.dictValue}` === `${e}`,
                        );
                        form.setFieldsValue({
                          ...form.getFieldsValue(),
                          locationFactor: obj?.locationFactor,
                          projectId: e,
                          projectType: `${obj?.projectType}`,
                          energyType: `${obj?.energyType}`,
                        });
                        culMontorNumber();
                        changeDataValue({
                          ...dataValue,
                          projectType: `${obj?.projectType}`,
                          energyType: `${obj?.energyType}`,
                        });
                        if (
                          obj?.gridConnectFile &&
                          obj?.gridConnectFile?.length > 0
                        ) {
                          changeIsGridConnectFile(false);
                        } else {
                          if (Number(obj?.projectType) === 2) {
                            changeIsGridConnectFile(false);
                          } else {
                            changeIsGridConnectFile(true);
                          }
                          // culGridConnectFile();
                        }
                        changeDataValue({
                          ...form.getFieldsValue(),
                          factorType: e,
                        });
                        // 获取参数配置
                        await apiQueryProjectConfigDataFn(
                          form.getFieldValue('energyType'),
                          form.getFieldValue('projectType'),
                        );
                      } catch (error) {
                        console.log(error);
                      }
                      return;
                    }
                  }}
                ></ReturnFromItem>
              );
            }
            //投产前历年发电量
            if (item.type === 'InputNumberButton') {
              return (
                <ReturnFromItem
                  item={item}
                  onChangeFn={() => {
                    console.log('选择');
                    changeIsProductionModelVisible(true);
                    changeTitle(item.title ? item.title : '');
                    // let arr: FormikConsumptionType[] | ProductionDataType[] =
                    //   item.title === 'generatorList'
                    //     ? formikConsumption.values
                    //     : productionData.values;
                    let newArr = JSON.parse(
                      JSON.stringify(
                        item.title === 'generatorList'
                          ? formikConsumption.values
                          : productionData.values,
                      ),
                    );
                    getCatchData([...newArr]);
                  }}
                  styleList={{
                    flexDirection: 'row',
                    alignItems: 'end',
                  }}
                ></ReturnFromItem>
              );
            }
            if (item.type === 'empty') {
              return (
                <ReturnFromItem
                  item={item}
                  onChangeFn={() => {
                    console.log('选择');
                    changeIsProductionModelVisible(true);
                  }}
                  styleList={{
                    flexDirection: 'row',
                    alignItems: 'end',
                  }}
                ></ReturnFromItem>
              );
            }
            return '';
          })}
        </Col>
      );
    },
    [
      dataValue,
      formik.values,
      formikConsumption.values,
      areaData,
      feasibilityReportFile,
      projectApprovalFile,
      envAssessmentFile,
      envApprovalFile,
      gridConnectFile,
      projectList,
      elecDownFile,
      elecUpFile,
      actualElectFile,
      isShowGridConnectFile,
      form.getFieldsValue(true),
      queryProjectConfigData,
    ],
  );
  // 获取项目-详情 : 项目详情或者监测数据详情
  const apiInfoDetailFn = async () => {
    const id = new URLSearchParams(location.search).get('id') || '';
    if (history.location.pathname.indexOf('monitor') >= 0) {
      await apiProjectDetail({ id }).then(async ({ data }) => {
        form.setFieldsValue({
          ...data.data,
          projectName: data?.data?.projectName,
          areaCodes: data?.data?.areaCodes,
          projectId: `${data?.data?.projectId}`,
          endDate: data?.data?.startDate
            ? [
                moment(data?.data?.startDate, 'YYYY-MM-DD'),
                moment(data?.data?.endDate, 'YYYY-MM-DD'),
              ]
            : null,
          //@ts-ignore
          projectType: `${data?.data?.projectType}`,
          //@ts-ignore
          energyType: `${data?.data?.energyType}`,
        });
        // @ts-ignore
        changeDataValue({
          ...data.data,
        });
        // @ts-ignore
        // apiAreaParamFn(data.data.areaCodes);
        if (data.data?.gridConnectFile) {
          setGridConnectFile(data.data?.gridConnectFile);
          if (data.data?.gridConnectFile?.length > 0) {
            changeIsGridConnectFile(true);
          } else {
            // changeIsGridConnectFile(false);
            let obj = projectList.find(
              item => `${item.dictValue}` === `${data?.data?.projectId}`,
            );
            if (obj) {
              if (obj?.gridConnectFile && obj?.gridConnectFile?.length > 0) {
                changeIsGridConnectFile(false);
              } else {
                if (Number(obj?.projectType) === 2) {
                  changeIsGridConnectFile(false);
                } else {
                  changeIsGridConnectFile(true);
                }
              }
            }
          }
        }
        if (data?.data?.elecDownFile) {
          setElecDownFile(data.data?.elecDownFile);
        }
        if (data?.data?.elecUpFile) {
          setElecUpFile(data.data?.elecUpFile);
        }
        // 实际发电量
        if (data?.data?.actualElectFile) {
          setActualElectFile(data.data?.actualElectFile);
        }
        await formik.setValues([...data.data?.generatorList]);
        /*--缓存参数配置---*/
        getCatchEnergyType(data.data.energyType ? data.data.energyType : '');
        getCatchProjectType(data.data.projectType ? data.data.projectType : '');
        // 获取参数配置
        await apiQueryProjectConfigDataFn(
          data.data.energyType,
          data.data.projectType,
        );
      });

      return;
    }
    await apiInfoDetail({ id }).then(async ({ data }) => {
      form.setFieldsValue({
        ...data.data,
        projectName: data?.data?.projectName,
        areaCodes: data?.data?.areaCodes,
        replyTime: data?.data?.replyTime
          ? moment(data?.data?.replyTime, 'YYYY-MM-DD')
          : data?.data?.replyTime,
        //@ts-ignore
        projectType: `${data?.data?.projectType}`,
        //@ts-ignore
        energyType: `${data.data.energyType}`,
        deviceOpenedDate: data?.data?.deviceOpenedDate
          ? moment(data?.data?.deviceOpenedDate, 'YYYY-MM-DD')
          : data?.data?.deviceOpenedDate,
      });
      //@ts-ignore
      changeDataValue({
        ...data.data,
      });
      // await apiAreaParamFn(data.data.areaCodes);
      await formik.setValues([...data?.data?.generatorList]);
      if (data?.data?.fossilFuelList) {
        await formikConsumption.setValues([...data?.data?.fossilFuelList]);
      }
      if (data?.data?.yearElecList) {
        await productionData.setValues([...data?.data?.yearElecList]);
      }
      if (data.data.feasibilityReportFile) {
        setFeasibilityReportFile([...data.data.feasibilityReportFile]);
      }
      if (data?.data?.projectApprovalFile) {
        setProjectApprovalFile(data.data?.projectApprovalFile);
      }
      if (data?.data?.envAssessmentFile) {
        setEnvAssessmentFile(data.data?.envAssessmentFile);
      }
      if (data.data?.envApprovalFile) {
        setEnvApprovalFile(data.data?.envApprovalFile);
      }
      if (data.data?.gridConnectFile) {
        setGridConnectFile(data.data?.gridConnectFile);
      }
      /*--缓存参数配置---*/
      getCatchEnergyType(data.data.energyType ? data.data.energyType : '');
      getCatchProjectType(data.data.projectType ? data.data.projectType : '');
      // 获取参数配置
      await apiQueryProjectConfigDataFn(
        data.data.energyType,
        data.data.projectType,
      );
    });
  };
  const apiAddressFn = async () => {
    await apiAddress().then(({ data }) => {
      if (data.code === 200) {
        getAreaData(data.data);
      }
    });
  };
  //@ts-ignore
  const culNumberCallback = useSyncCallback(culNumber);

  // useEffect(() => {
  //   if (Number(currentAreaParams?.yearHours)) {
  //     culNumber();
  //   }
  // }, [currentAreaParams]);

  // 获取全量项目π
  const apiProjectInfoListFn = async () => {
    await apiProjectInfoList({ auditStatus: 2 }).then(async ({ data }) => {
      if (data.code === 200) {
        let newArr = data.data.map(
          (item: {
            id: string;
            projectName: string;
            locationFactor: string;
            gridConnectFile: [];
            projectType: string;
            energyType: string;
          }) => {
            return {
              dictValue: item.id,
              dictLabel: item.projectName,
              locationFactor: item.locationFactor,
              gridConnectFile: item.gridConnectFile,
              energyType: item?.energyType,
              projectType: item?.projectType,
            };
          },
        );
        getProjectList([...newArr]);
      }
    });
  };
  useEffect(() => {
    if (
      projectList.length > 0 &&
      history.location.pathname.indexOf('add') === -1
    )
      apiInfoDetailFn();
  }, [projectList]);
  const culDetail = () => {
    return ['detail', 'examine', 'edit', 'exam'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  // 获取审核数据
  const apiAuditInfoList = async () => {
    const id = new URLSearchParams(location.search).get('id') || '';
    if (history.location.pathname.indexOf('monitor') >= 0) {
      await apiProjectDataAuditInfoList({ id }).then(({ data }) => {
        getExmaData([...data.data]);
      });
      return;
    }
    await apiProjectAuditInfoList({ id }).then(({ data }) => {
      getExmaData([...data.data]);
    });
    await apiinfoCcList({ id }).then(({ data }) => {
      getExmaData2([...data.data]);
    });
  };

  useEffect(() => {
    apiAddressFn();
    // 项目监测 请求项目
    if (history.location.pathname.indexOf('monitor') >= 0) {
      apiProjectInfoListFn();
    }
    if (culDetail()) {
      apiInfoDetailFn();
      apiAuditInfoList();
      return;
    }

    form.setFieldsValue({
      projectType: '1',
      energyType: '1',
      generatorList: formik.values,
    });
    apiQueryProjectConfigDataFn();
  }, []);
  const culRenderLeftItem = () => {
    //    风力发电 新建并网
    return renderLeftItem(leftItemFn, 'tree');
  };
  const renturnContent = () => {
    return (
      <Content
        renderLeftItem={renderLeftItem}
        metionItemFn={metionItemFn}
        culRenderLeftItem={culRenderLeftItem}
        sourceItemFn={sourceItemFn}
        companyItemFn={companyItemFn}
        form={form}
      ></Content>
    );
  };
  const apiInfoSubmitFn = async (
    value: { dictType: string },
    id: string | null,
    force: boolean,
  ) => {
    await apiInfoSubmit(
      returnApiInfoSubmitObj(
        value,
        form,
        formik,
        formikConsumption,
        productionData,
        feasibilityReportFile,
        projectApprovalFile,
        envAssessmentFile,
        envApprovalFile,
        gridConnectFile,
        force,
      ),
      id,
    ).then(({ data }) => {
      if (data.code === 200) {
        history.go(-1);
        return;
      }
      if (data.code === 10014) {
        Modal.confirm({
          icon: <ExclamationCircleOutlined />,
          content: '您输入的数据远超过当地平均值上限，建议检查后进行送审',
          okText: <Button type='default'>{'继续送审'}</Button>,
          okType: 'link',
          cancelText: <Button type='default'>{'返回检查'}</Button>,
          cancelButtonProps: {
            type: 'link',
            style: { marginRight: '-20px' },
          },
          onOk: async () => {
            await apiInfoSubmitFn(value, id, true);
          },
        });
        return;
      }
    });
  };
  const apiDataSubmitFn = async (
    value: { dictType: string },
    id: string | null,
    force: boolean,
  ) => {
    await apiDataSubmit(
      returnApiDataSubmitObj(
        value,
        form,
        formik,
        elecUpFile,
        elecDownFile,
        gridConnectFile,
        force,
      ),
      id,
    ).then(({ data }) => {
      if (data.code === 200) {
        history.go(-1);
        return;
      }
      if (data.code === 10014) {
        Modal.confirm({
          icon: <ExclamationCircleOutlined />,
          content: '您输入的数据远超过当地平均值上限，建议检查后进行送审',
          okText: <Button type='default'>{'继续送审'}</Button>,
          okType: 'link',
          cancelText: <Button type='default'>{'返回检查'}</Button>,
          cancelButtonProps: {
            type: 'link',
            style: { marginRight: '-20px' },
          },
          onOk: async () => {
            await apiDataSubmitFn(value, id, true);
          },
        });
        return;
      }
      VerifyUtils.Toast('error', data.msg);
    });
  };
  return (
    <>
      {/* {JSON.stringify(isShowGridConnectFile)}=isShowGridConnectFile */}
      <div className={style.organization}>{renturnContent()}</div>
      <ExamDetail examData={examData} examData2={examData2}></ExamDetail>
      {
        <Footer
          examineFn={() => changeIsModalVisible(true)}
          dragFn={async () => {
            let isSuccess = form
              .getFieldsError(['projectName', 'projectAddress'])
              .some(item => item.errors[0]);
            if (isSuccess) {
              return VerifyUtils.Toast('error', '表单提交有误');
            }
            if (history.location.pathname.indexOf('/mession-monitor') >= 0) {
              await apiDataDraft(
                returnApiDataDraftObj(
                  form,
                  formik,
                  dataValue,
                  elecUpFile,
                  elecDownFile,
                  gridConnectFile,
                ),
              ).then(({ data }) => {
                if (data.code === 200) {
                  history.go(-1);
                  return;
                }
                VerifyUtils.Toast('error', data.msg);
              });
              return;
            }
            await apiInfoDraft(
              returnApiInfoDraftObj(
                form,
                formik,
                formikConsumption,
                productionData,
                dataValue,
                feasibilityReportFile,
                projectApprovalFile,
                envAssessmentFile,
                envApprovalFile,
                gridConnectFile,
              ),
            ).then(({ data }) => {
              if (data.code === 200) {
                history.go(-1);
                return;
              }
              VerifyUtils.Toast('error', data.msg);
            });
          }} //保存草稿
          saveData={async () => {
            await form.validateFields().then(async value => {
              const id =
                dataValue.auditStatus === -1
                  ? null
                  : new URLSearchParams(location.search).get('id') || '';
              if (history.location.pathname.indexOf('monitor') >= 0) {
                await apiDataSubmitFn(value, id, false);
                return;
              }
              await apiInfoSubmitFn(value, id, false);
            });
          }} // 提交审核
        />
      }
      <ExamModel
        examForm={examForm}
        isModalVisible={isModalVisible}
        onOk={async () => {
          await examForm.validateFields().then(async value => {
            console.log(value);
            const id = new URLSearchParams(location.search).get('examid') || '';
            if (value.auditPass === '0' && !value.auditContent) {
              return message.error('请填写审核不通过原因');
            }
            await apiProjectAudit({ ...value, id: Number(id) }).then(
              ({ data }) => {
                if (data.code === 200) {
                  changeIsModalVisible(false);
                  examForm.resetFields();
                  history.go(-1);
                }
                VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
              },
            );

            return '';
          });
        }}
        onCancel={() => {
          changeIsModalVisible(false);
          examForm.resetFields();
        }}
      />
      <ProductionModel
        isModalVisible={isProductionModelVisible}
        onOk={async () => {
          // if(title==='generatorList'){
          let isCompany = culSomeArr<
            FormikConsumptionType | ProductionDataType
          >(
            title === 'generatorList'
              ? formikConsumption.values
              : productionData.values,
          );
          if (!isCompany) return message.error('数据不能为空');
          form.setFieldsValue({
            ...form.getFieldsValue(true),
            yearElecList: formikConsumption.values,
            fossilFuelList: productionData.values,
          });
          // }
          changeIsProductionModelVisible(false);
          await culNumber();
        }}
        productionData={
          title === 'generatorList'
            ? formikConsumption.values
            : productionData.values
        }
        onCancel={async () => {
          if (title === 'generatorList') {
            await formikConsumption.setValues([
              ...(catchData as FormikConsumptionType[]),
            ]);
          } else {
            await productionData.setValues([
              ...(catchData as ProductionDataType[]),
            ]);
          }
          changeIsProductionModelVisible(false);
        }}
        productionDataFrom={
          title === 'generatorList' ? formikConsumption : productionData
        }
        title={title}
      />
      {/* <Modal visible={true}></Modal> */}
    </>
  );
};

export default Orgstaff;
