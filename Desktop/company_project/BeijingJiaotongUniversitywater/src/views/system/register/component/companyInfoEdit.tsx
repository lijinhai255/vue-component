/**
 * @file 注册页
 */
import { memo, useCallback, useState, useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import store from '@/store';

import {
  apiAddress,
  EnterpriseCreate,
  apiSystemOrgDetail,
  apiEnterpriseEdit,
} from '@/views/system/register/service';
import style from '../style.module.scss';
import { RcFile } from 'antd/lib/upload';
import VerifyUtils, { PersonKeys } from '@/utils/verifty';
import { EnterpriseContentList, getCurrency } from '../jsontsx/enterprise';
// import { UploadFile } from 'antd/lib/upload/interface';
import moment from 'moment';
import { IconFont } from '@/components/IconFont';
import Permission from '@/utils/permission';

function Register() {
  const [form] = Form.useForm();
  const [isvisable, setisvisable] = useState(false);
  const history = useHistory();
  const { user } = store.getState();
  const [showDate, setShowDate] = useState('禁用');
  const [previewVisible, setpreviewVisible] = useState(false);
  const [fileList, setFileList] = useState<
    {
      uid: string;
      name: string;
      status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
      url?: string;
      originFileObj?: RcFile;
    }[]
  >([]);
  const [showLoad, setshowLoad] = useState(false);
  const [mag, setMag] = useState(true);
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
  const [isEdit, changeIsEdit] = useState<boolean>(true);

  const onSubmit = async () => {
    await form.validateFields().then((res: EnterpriseCreate) => {
      let values = res;
      let newVal = {
        foundDate: moment(form.getFieldsValue().foundDate).format(
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
        operationPeriodType: Mage === null ? 1 : Mage,
      };
      let val = { ...values, ...newVal, operationPeriodType: Number(Mage) };
      // let produceAreaCodeStr = values.produceAreaCode[2];
      // //@ts-ignore
      // let regAreaCodeStr = values.regAreaCode[2];
      //@ts-ignore
      apiEnterpriseEdit({
        ...val,
        id: companyData.id
          ? companyData.id
          : JSON.parse(sessionStorage.getItem('userinfo') as string).orgId,
      })
        .then(({ data }) => {
          if (data.code === 200) {
            changeIsEdit(true);
            setisvisable(true);
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
    setMag(!e);
    setShowDate(e ? '禁用' : '');
  };
  const setarea = (e: any, b: any) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      [e]: b,
    });
  };
  const removeItem = (e: string) => {
    if (e === '查看') setpreviewVisible(!previewVisible);
    if (e === '删除') {
      setFileList([]);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        businessLicense: [],
      });
    }
  };
  // 组织信息
  const renderLeftItem = useCallback(() => {
    console.log(form.getFieldsValue().businessLicense, fileList);
    if (showLoad) {
      return EnterpriseContentList(
        isEdit,
        mag,
        'ComDatePicker',
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
      ).map((item: any, index: number) => {
        return (
          <Form.Item
            className={item.classNames ? style[item.classNames] : style.oneName}
            key={index}
            label={item.name}
            name={item.title}
            rules={item.require}
          >
            {item.label}
          </Form.Item>
        );
      });
    }
  }, [
    areaData,
    fileList,
    companyData,
    isEdit,
    mag,
    showDate,
    showLoad,
    previewVisible,
  ]);
  const apiAddressFn = async () => {
    await apiAddress().then(({ data }) => {
      if (data.code === 200) {
        getAreaData(data.data);
      }
    });
  };
  const apiSystemOrgDetailFn = async () => {
    if (user.orgId) {
      await apiSystemOrgDetail({ id: user.orgId ? user.orgId : '' }).then(
        (res: any) => {
          let data = res.data;
          console.log(data, 'datadata');
          // @ts-ignore
          if (data.data.operationPeriodType !== null) {
            // @ts-ignore
            setMage(data.data.operationPeriodType);
            // @ts-ignore
            setMag(data.data.operationPeriodType === 2 ? false : true);
          }
          console.log(
            getCurrency.filter(
              (item: any) =>
                // @ts-ignore
                item.name === data.data.legalRepresentativeIdType_name,
            ),
            data.data.foundDate,
          );
          form.setFieldsValue({
            ...data.data,
            businessLicense:
              data.data.businessLicense !== null
                ? data.data.businessLicense
                : [],
            // @ts-ignore
            contactAreaCode:
              // @ts-ignore
              data.data.contactAreaCode !== 0 ? data.data.contactCodes : null,
            // @ts-ignore
            regAreaCode:
              data.data.regAreaCode !== 0 ? data.data.regCodes : null,
            // @ts-ignore
            depositBankAreaCode:
              data.data.depositBankAreaCode !== 0
                ? // @ts-ignore
                  data.data.depositBankCodes
                : null,
            // @ts-ignore
            produceAreaCode:
              // @ts-ignore
              data.data.produceAreaCode !== 0 ? data.data.produceCodes : null,
            // actualController: '',
            approvalDate:
              data.data.approvalDate !== null
                ? moment(data.data.approvalDate)
                : null,
            foundDate:
              data.data.foundDate !== null ? moment(data.data.foundDate) : null,
            operationPeriod:
              data.data.operationPeriod !== null
                ? moment(data.data.operationPeriod)
                : null,

            employeeNumber:
              data.data.employeeNumber === 0 ? '' : data.data.employeeNumber,
          });

          // @ts-ignore
          if (data.data.businessLicense !== null) {
            // @ts-ignore
            setFileList(data.data.businessLicense);
          }
          setshowLoad(true);
          // getCompanyData(data.data);
        },
      );
    }
  };
  useEffect(() => {
    if (areaData.length > 0) {
      apiSystemOrgDetailFn();
    }
    console.log(areaData);
  }, [areaData]);
  useEffect(() => {
    apiAddressFn();
  }, []);
  return (
    <>
      <Form
        form={form}
        layout='vertical'
        requiredMark={false}
        size='middle'
        className={style.from_companyInfo}
      >
        {renderLeftItem()}
      </Form>
      <Form.Item className={style.listBtn}>
        {isEdit ? (
          <>
            <Permission flag='/business-infor/detail/edit'>
              <Button
                type='primary'
                className={style.button}
                onClick={async () => {
                  changeIsEdit(false);
                }}
              >
                编辑
              </Button>
            </Permission>
          </>
        ) : (
          <>
            <Button
              type='primary'
              className={style.button}
              style={{ width: '68px' }}
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
              提交
            </Button>
            <Button
              style={{ width: '68px', marginLeft: '20px' }}
              onClick={async () => {
                changeIsEdit(true);
                window.location.reload();
              }}
              type='default'
            >
              取消
            </Button>
          </>
        )}
      </Form.Item>
      <Modal
        title='提示'
        visible={isvisable}
        cancelText='返回'
        okText='查看变更审核'
        footer={[
          <Button
            onClick={() => {
              setisvisable(false);
              changeIsEdit(true);
            }}
          >
            返回
          </Button>,
          <Permission flag={'/business-infor/list'}>
            <Button
              type='primary'
              onClick={() => {
                setisvisable(false);
                history.push('/business-infor/list');
                changeIsEdit(true);
              }}
            >
              查看变更审核
            </Button>
          </Permission>,
        ]}
        onOk={() => {}}
        onCancel={() => {
          setisvisable(false);
          changeIsEdit(true);
        }}
      >
        <IconFont
          type={'icon-icon-zhifuchenggong'}
          style={{ fontSize: ' 64px', display: 'block', marginBottom: '20px' }}
        />
        <span
          style={{
            textAlign: 'center',
            display: 'block',
            marginBottom: '0px',
          }}
        >
          您已提交企业信息的审核申请，预计在1-2个工作日内完成审核。
        </span>
      </Modal>
    </>
  );
}

export default memo(Register);
