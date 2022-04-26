/**
 * @file 注册页
 */
import { memo, useMemo, useState, useEffect, useCallback } from 'react';
import { Button, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import store from '@/store';

import {
  apiAddress,
  apiEnterpriseCreate,
  EnterpriseCreate,
  apiEnterpriseRegEdit,
  apiSystemOrgDetail,
} from '@/views/system/register/service';
import style from '../style.module.scss';
// import { UploadChangeParam } from 'antd/lib/upload';
import VerifyUtils, { PersonKeys } from '@/utils/verifty';
import { EnterpriseContentList, getCurrency } from '../jsontsx/enterprise';
// import { UploadFile } from 'antd/lib/upload/interface';
import moment from 'moment';

function Register() {
  const [form] = Form.useForm();
  const { user } = store.getState();
  const [showDate, setShowDate] = useState('');
  const type = new URLSearchParams(location.search).get('type') || '';
  const [fileList, setFileList] = useState<any>([]);
  const [mag, setMag] = useState(false);
  const [previewVisible, setpreviewVisible] = useState(false);
  // const [del, setdel] = useState('');
  const [Mage, setMage] = useState(1);
  const [areaData, getAreaData] = useState<
    {
      addressCode: number;
      addressLevel: number;
      addressName: string;
      pcode: number;
    }[]
  >([]);
  const [companyData] = useState<{
    createTime?: string;
    auditContent?: string;
    id?: string;
  }>({
    createTime: '',
  });
  const history = useHistory();
  const onSubmit = async () => {
    await form.validateFields().then((res: EnterpriseCreate) => {
      let values = res;
      let newVal = {
        foundDate:
          form.getFieldsValue().foundDate === ''
            ? ''
            : moment(form.getFieldsValue().foundDate).format(
                'YYYY-MM-DD HH:MM:SS',
              ),
        depositBankAreaCode: form.getFieldsValue().depositBankAreaCode.pop(),
        operationPeriod:
          form.getFieldsValue().operationPeriod === '' ||
          !form.getFieldsValue().operationPeriod
            ? ''
            : moment(form.getFieldsValue().operationPeriod).format(
                'YYYY-MM-DD HH:MM:SS',
              ),
        approvalDate: form.getFieldsValue().approvalDate
          ? moment(form.getFieldsValue().approvalDate).format(
              'YYYY-MM-DD HH:MM:SS',
            )
          : '',
        businessLicense: fileList,
        regAreaCode: form.getFieldsValue().regAreaCode.pop(),
        produceAreaCode: form.getFieldsValue().produceAreaCode.pop(),
        contactAreaCode: form.getFieldsValue().contactAreaCode.pop(),
        operationPeriodType: Mage,
      };
      // //@ts-ignore
      // let produceAreaCodeStr = values.produceAreaCode[2];
      // //@ts-ignore
      // let regAreaCodeStr = values.regAreaCode[2];
      if (type === 'edit') {
        let val = { ...values, ...newVal };
        apiEnterpriseRegEdit({
          ...val,
          id:
            history.location.pathname === '/system/register'
              ? JSON.parse(sessionStorage.getItem('userinfo') as string).orgId
              : companyData.id
              ? companyData.id
              : '',
        })
          .then(({ data }) => {
            if (data.code === 200) {
              console.log(data);
              // sessionStorage.setItem('userinfo',JSON.stringify({
              //   ...JSON.parse(sessionStorage.getItem('userinfo') as string),
              //   orgUpdateTime:data.data.
              // }))
              history.push('/system/result?resule=1');
            } else {
              VerifyUtils.ToastText('error', data.msg);
            }
          })
          .catch(() => {});
        return;
      }
      apiEnterpriseCreate({ ...values, ...newVal })
        .then(({ data }) => {
          if (data.code === 200) {
            history.push('/system/result?resule=1');
            sessionStorage.setItem(
              'userinfo',
              JSON.stringify({
                ...JSON.parse(sessionStorage.getItem('userinfo') as string),
                // @ts-ignore
                orgUpdateTime: data.data.updateTime,
                // @ts-ignore
                orgName: data.data.orgName,
              }),
            );
          } else {
            VerifyUtils.ToastText('error', data.msg);
          }
        })
        .catch(() => {});
    });
  };
  // 文件上传
  const uploadImage = useCallback(({ fileList: newFileList }) => {
    const newArr = newFileList.map(
      (item: {
        status: string;
        originFileObj: any;
        response: { code: number; data: any; msg: string };
        uid: any;
        name: any;
      }) => {
        if (item.status === 'done' && item.originFileObj) {
          if (item.response.code === 200) {
            return item.response.data;
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
      },
    );
    console.log(newArr);
    setFileList(newArr);
    form.setFieldsValue({ businessLicense: newArr });
  }, []);
  // 经营日期改变

  const getDate = () => {
    if (isNaN(Number(form.getFieldsValue().operationPeriodType))) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        operationPeriodType: 1,
      });
    }
  };
  const setDate = (e: boolean) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      operationPeriodType: !e ? 2 : 1,
      operationPeriod: e ? '' : form.getFieldsValue().operationPeriod,
    });
    setMage(!e ? 1 : 2);
    setMag(e);
    setShowDate(e === true ? '禁用' : '');
    console.log(form.getFieldsValue(), e);
  };
  const setarea = (e: any, b: any) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      [e]: b,
    });
    console.log(e, b, form.getFieldsValue());
  };
  const removeItem = (e: any) => {
    console.log(e);
    if (e === '查看') {
      setpreviewVisible(!previewVisible);
    }
    if (e === '删除') {
      setFileList(() => {
        return [];
      });
      form.setFieldsValue({
        ...form.getFieldsValue(),
        businessLicense: [],
      });
    }
  };
  // 组织信息
  const companyItemFn = useMemo<any[]>(() => {
    console.log(form.getFieldsValue().businessLicense, fileList);
    return EnterpriseContentList(
      false,
      mag,
      'resDatePicker',
      areaData,
      fileList,
      showDate,
      previewVisible,
      removeItem,
      uploadImage,
      getDate,
      setDate,
      '',
      setarea,
    );
  }, [fileList, areaData, mag, showDate, previewVisible]);
  const apiAddressFn = async () => {
    await apiAddress().then(({ data }) => {
      if (data.code === 200) {
        getAreaData(data.data);
      }
    });
  };
  const apiSystemOrgDetailFn = async () => {
    console.log(user);
    await apiSystemOrgDetail({ id: user.orgId ? user.orgId : '' }).then(
      ({ data }) => {
        console.log(data.data, 'data=data');
        // @ts-ignore
        if (data.data.operationPeriodType !== null) {
          // @ts-ignore
          setMage(data.data.operationPeriodType);
          // @ts-ignore
          setMag(data.data.operationPeriodType === 2);
          // @ts-ignore
          setShowDate(data.data.operationPeriodType === 2 ? '禁用' : '');
        }
        // @ts-ignore
        if (data.data.businessLicense !== null) {
          // @ts-ignore
          setFileList(data.data.businessLicense);
        }
        console.log(
          getCurrency.filter(
            (item: any) =>
              // @ts-ignore
              item.name === data.data.legalRepresentativeIdType_name,
          ),
        );
        form.setFieldsValue({
          ...data.data,
          // businessLicense: null,
          // @ts-ignore
          contactAreaCode: data.data.contactCodes,
          // @ts-ignore
          regAreaCode: data.data.regCodes,
          // @ts-ignore
          depositBankAreaCode: data.data.depositBankCodes,
          // @ts-ignore
          produceAreaCode: data.data.produceCodes,
          // actualController: '',
          approvalDate: moment('2012-03-03'),
          foundDate: moment(data.data.foundDate),
          operationPeriod:
            Number(data.data.operationPeriodType) === 1
              ? moment(data.data.operationPeriod)
              : null,
          employeeNumber:
            data.data.employeeNumber === 0 ? '' : data.data.employeeNumber,
          operationPeriodType: mag,
        });

        // getCompanyData(data.data);
      },
    );
  };
  useEffect(() => {
    if (areaData.length > 0) {
      if (type === 'edit') {
        apiSystemOrgDetailFn();
      }
      if (type === 'basic') {
        apiSystemOrgDetailFn();
      }
    }
  }, [areaData]);
  useEffect(() => {
    apiAddressFn();
  }, []);
  return (
    <>
      <h2 className={style.h2Text}>填写企业信息</h2>
      <Form
        form={form}
        layout='vertical'
        size='middle'
        requiredMark={false}
        className={style.from_companyInfo}
      >
        {companyItemFn.map((item: any, index: number) => {
          return (
            <Form.Item
              className={
                item.classNames ? style[item.classNames] : style.oneName
              }
              key={index}
              label={item.name}
              name={item.title}
              rules={item.require}
            >
              {item.label}
            </Form.Item>
          );
        })}
      </Form>
      <Form.Item className={style.formSubmit}>
        <Button
          type='primary'
          className={style.button}
          onClick={async () => {
            form.setFieldsValue({
              ...form.getFieldsValue(),
              // @ts-ignore
              operationPeriodType: !form.getFieldsValue().operationPeriod
                ? undefined
                : form.getFieldsValue().operationPeriod === '' &&
                  Number(Mage) === 1
                ? undefined
                : Number(Mage),
            });
            await form.validateFields().then(async value => {
              console.log(value);
              await onSubmit();
            });
          }}
        >
          保存
        </Button>
      </Form.Item>
    </>
  );
}

export default memo(Register);
