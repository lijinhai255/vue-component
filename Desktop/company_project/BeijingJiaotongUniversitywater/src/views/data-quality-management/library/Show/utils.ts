import { ItemType } from '@/views/system/register/jsontsx/enterprise';
import { FormInstance } from 'antd';
import { FormikValues } from 'formik';
import { UploadType } from './type/index';
//判断数组中是否有值
export function culSomeArr<T>(arr: T[]): boolean {
  return arr.every(item => {
    return Object.values(item)?.every(it => {
      return it !== null;
    });
  });
}

export const returnFileList = (
  item: ItemType,
  feasibilityReportFile: UploadType[],
  projectApprovalFile: UploadType[],
  envAssessmentFile: UploadType[],
  envApprovalFile: UploadType[],
  gridConnectFile: UploadType[],
  elecUpFile: UploadType[],
  elecDownFile: UploadType[],
  actualElectFile: UploadType[],
) => {
  if (item.title === 'feasibilityReportFile') {
    return feasibilityReportFile;
  }
  if (item.title === 'projectApprovalFile') {
    return projectApprovalFile;
  }
  if (item.title === 'envAssessmentFile') {
    return envAssessmentFile;
  }
  if (item.title === 'envApprovalFile') {
    return envApprovalFile;
  }
  if (item.title === 'gridConnectFile') {
    return gridConnectFile;
  }
  if (item.title === 'elecUpFile') {
    return elecUpFile;
  }
  if (item.title === 'elecDownFile') {
    return elecDownFile;
  }
  if (item.title === 'actualElectFile') {
    return actualElectFile;
  }
};
//定义一个方法 从表单中获取日期格式返回字符串
export const fromGetData = (
  endDate: string[] | string,
  form: FormInstance,
  index?: number,
) => {
  if (endDate === 'endDate') {
    return form.getFieldValue(endDate)
      ? form
          .getFieldValue(endDate)
          [index ? index : 0].format('YYYY-MM-DD HH:mm:ss')
      : null;
  }
  return form.getFieldValue(endDate)
    ? form.getFieldValue(endDate).format('YYYY-MM-DD HH:mm:ss')
    : null;
};
// 定义放法  获取表单中的地区编号
export const fromGetAreaCodes = (areaCodes: string, form: FormInstance) => {
  return form.getFieldValue(areaCodes)
    ? form.getFieldValue(areaCodes)[form.getFieldValue(areaCodes).length - 1]
    : null;
};
// 定义方法 用于处理提交的数据

// 处理 保存草稿监测数据
export const returnApiDataDraftObj = (
  form: FormInstance,
  formik: FormikValues,
  dataValue: { auditStatus?: number | string },
  elecUpFile: UploadType[],
  elecDownFile: UploadType[],
  gridConnectFile: UploadType[],
) => {
  return {
    ...form.getFieldsValue(true),
    startDate: fromGetData('endDate', form, 0),
    endDate: fromGetData('endDate', form, 1),
    generatorList: formik.values,
    elecUpFile,
    elecDownFile,
    gridConnectFile,
    id: dataValue.auditStatus === -1 ? null : form.getFieldValue('id'),
  };
};
//处理 保存草稿 项目数据
export const returnApiInfoDraftObj = (
  form: FormInstance,
  formik: FormikValues,
  formikConsumption: FormikValues,
  productionData: FormikValues,
  dataValue: { auditStatus?: number | string },
  feasibilityReportFile: UploadType[],
  projectApprovalFile: UploadType[],
  envAssessmentFile: UploadType[],
  envApprovalFile: UploadType[],
  gridConnectFile: UploadType[],
) => {
  return {
    ...form.getFieldsValue(true),
    areaCode: fromGetAreaCodes('areaCodes', form),
    replyTime: fromGetData('replyTime', form),
    feasibilityReportFile,
    projectApprovalFile,
    envAssessmentFile,
    envApprovalFile,
    gridConnectFile,
    generatorList: formik.values,
    id: dataValue.auditStatus === -1 ? null : form.getFieldValue('id'),
    deviceOpenedDate: fromGetData('deviceOpenedDate', form), // 新增
    fossilFuelList: formikConsumption.values, //新增
    yearElecList: productionData.values, // 新增
  };
};
export const returnApiDataSubmitObj = (
  value: { dictType: string },
  form: FormInstance,
  formik: FormikValues,
  elecUpFile: UploadType[],
  elecDownFile: UploadType[],
  gridConnectFile: UploadType[],
  force: boolean,
) => {
  return {
    ...value,
    startDate: fromGetData('endDate', form, 0),
    endDate: fromGetData('endDate', form, 1),
    generatorList: culSomeArr(formik.values) ? formik.values : [],
    elecUpFile,
    elecDownFile,
    gridConnectFile,
    force,
  };
};
export const returnApiInfoSubmitObj = (
  value: { dictType: string },
  form: FormInstance,
  formik: FormikValues,
  formikConsumption: FormikValues,
  productionData: FormikValues,
  feasibilityReportFile: UploadType[],
  projectApprovalFile: UploadType[],
  envAssessmentFile: UploadType[],
  envApprovalFile: UploadType[],
  gridConnectFile: UploadType[],
  force: boolean,
) => {
  return {
    ...value,
    areaCode: fromGetAreaCodes('areaCodes', form),
    replyTime: fromGetData('replyTime', form),
    generatorList: culSomeArr(formik.values) ? formik.values : [],
    feasibilityReportFile,
    projectApprovalFile,
    envAssessmentFile,
    envApprovalFile,
    gridConnectFile,
    deviceOpenedDate: fromGetData('  replyTime ', form), // 新增
    fossilFuelList: culSomeArr(formikConsumption.values)
      ? formikConsumption.values
      : [], //新增
    yearElecList: culSomeArr(productionData.values)
      ? productionData.values
      : [], // 新增
    force,
  };
};
