/**
 * @file 注册页
 */
import { memo, useMemo, useState, useEffect } from 'react';
import { Form, Input, Modal, Radio, Image, Button, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import store from '@/store';
import {
  apiAddress,
  apiEnterpriseAudit,
  apiorgAudit,
  // apiSystemOrgDetail,
} from '@/views/system/register/service';
import style from '../index.module.scss';
// import { RcFile } from 'antd/lib/upload';
// import { Rule } from 'antd/lib/form';

import VerifyUtils from '@/utils/verifty';
import {
  dataFilter,
  EnterpriseContentList,
  getCurrency,
} from '../jsontsx/enterprise';

import { audit_detail, org_detail } from '@/api/api';

// interface ItemType {
//   title?: string;
//   name?: string;
//   require?: Rule[];
//   placeholder?: string;
//   type?: string;
//   class?: string;
//   buttontext?: string;
//   value?: string;
//   disabled?: boolean;
//   select_list?: {
//     dictLabel?: string;
//     dictValue?: string;
//     id?: string | number;
//     name?: string;
//   }[];
//   maxLength?: number;
//   isNeedButton?: boolean;
//   defaultValue?: string;
//   dataSource?: [];
//   modelLabel?: string;
//   allowClear?: boolean;
//   childLabel?: string;
// }

function Register() {
  // const [form] = Form.useForm();
  const [examForm] = Form.useForm();
  const { user } = store.getState();
  console.log(user, 'user=user');
  const history = useHistory();
  const [detailList, setDetailList] = useState<any>({});
  // const [fileList, setFileList] = useState<
  //   {
  //     uid: string;
  //     name: string;
  //     status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
  //     url?: string;
  //     originFileObj?: RcFile;
  //   }[]
  // >([]);
  // const [areaData, getAreaData] = useState<
  //   {
  //     addressCode: number;
  //     addressLevel: number;
  //     addressName: string;
  //     pcode: number;
  //   }[]
  // >([]);
  const [companyData, setCompanyata] = useState<{
    createTime?: string;
    auditContent?: string;
    id?: string;
  }>({
    createTime: '',
  });
  const [isModalVisible, changIisModalVisible] = useState(false);
  // const onChange = (newFileList: any) => {
  //   // setFileList(newFileList.file);
  // };
  // 组织信息
  const companyItemFn = useMemo<any[]>(() => {
    return history.location.pathname === '/business-infor/list/exam' ||
      history.location.pathname === '/business-infor/list/detail'
      ? [
          {
            name: '审核状态',
            title: 'orgStatus',
            classNames: 'oneName',
          },
          {
            name: '审核说明',
            title: 'auditContent',
            classNames: 'twoName',
          },
          {
            name: '变更记录',
            title: 'changeLog',
            classNames: 'threeName',
          },
          ...EnterpriseContentList(
            false,
            false,
            '',
            [],
            [],
            false,
            false,
            () => {},
            () => {},
            () => {},
            () => {},
            '列表',
          ),
        ]
      : [
          {
            name: '审核状态',
            title: 'orgStatus',
            classNames: 'oneName',
          },
          {
            name: '审核说明',
            title: 'auditContent',
            classNames: 'twoName',
          },
          ...EnterpriseContentList(
            false,
            false,
            '',
            [],
            [],
            false,
            false,
            () => {},
            () => {},
            () => {},
            () => {},
            '列表',
          ),
        ];
  }, [detailList]);
  const reExamine = () => {
    return (
      ['exam'].some(item => history.location.pathname.indexOf(item) >= 0) ||
      ['detail'].some(item => history.location.pathname.indexOf(item) >= 0)
    );
  };
  const getDetail = () => {
    if (
      history.location.pathname === '/auth/org/examine' ||
      history.location.pathname === '/business-infor/list/exam' ||
      history.location.pathname === '/business-infor/list/detail'
    ) {
      const id =
        history.location.pathname === '/business-infor/list/exam' ||
        history.location.pathname === '/business-infor/list/detail'
          ? history.location.search.split('?')[1]
          : history.location.search.split('?id=')[1];
      setCompanyata({ ...companyData, id });
      const url =
        history.location.pathname === '/business-infor/list/exam' ||
        history.location.pathname === '/business-infor/list/detail'
          ? audit_detail
          : org_detail;
      url({ id }).then((res: any) => {
        if (res.data.code === 200) {
          const list = res.data.data;

          apiAddress().then((resItem: any) => {
            console.log(resItem);
            if (resItem.data.code === 200) {
              let contactCodes: string | undefined = '';
              let depositBankCodes: string | undefined = '';
              let produceCodes: string | undefined = '';
              let regCodes: string | undefined = '';
              if (list.contactCodes) {
                contactCodes = dataFilter(resItem.data.data, list.contactCodes);
                console.log(contactCodes, list.contactCodes, 'contactCodes');
              }
              if (list.depositBankCodes)
                depositBankCodes = dataFilter(
                  resItem.data.data,
                  list.depositBankCodes,
                );
              if (list.produceCodes)
                produceCodes = dataFilter(resItem.data.data, list.produceCodes);
              if (list.regCodes)
                regCodes = dataFilter(resItem.data.data, list.regCodes);
              const registeredCapitalCurrency = getCurrency.filter(
                (item: any) =>
                  Number(item.id) === list.registeredCapitalCurrency,
              )[0];
              // const operationPeriodType =
              // list.operationPeriodType === 1
              //   ? list.operationPeriod
              //   : list.operationPeriod
              //   ? `${list.operationPeriod}至无固定期限`
              //   : '无固定期限';
              const operationPeriodType =
                list.operationPeriodType === 1
                  ? list.operationPeriod
                  : '无固定期限';
              const newList = {
                ...list,
                contactAreaCode: `${contactCodes}${list.contactAddress}`,
                depositBankAreaCode: `${depositBankCodes}${list.depositBankAddress}`,
                produceAreaCode: `${produceCodes}${list.produceAddress}`,
                regAreaCode: `${regCodes}${list.regAddress}`,
                registeredCapitalCurrency: registeredCapitalCurrency
                  ? registeredCapitalCurrency.name
                  : '',
                businessLicense:
                  list.businessLicense !== null
                    ? list.businessLicense[0].url
                    : '',
                legalRepresentativeIdType:
                  list.legalRepresentativeIdType === 1 ? '身份证' : '护照',
                operationPeriodType,
                orgStatus:
                  Number(list.orgStatus) === 0
                    ? 'success'
                    : Number(list.orgStatus) === 1
                    ? 'warning'
                    : 'error',
              };
              setDetailList(newList);
            }
          });
        }
      });
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <>
      {/* {JSON.stringify(areaData)}=areaData */}
      {/* <h2 className={style.h2Text}>填写企业信息</h2> */}
      <div className={style.organizationCon}>
        {companyItemFn.map((item: any) => {
          return item.name !== ' ' ? (
            <div className={style[item.classNames]}>
              <div className={style.orgDetailCon} style={{ display: 'flex' }}>
                <span className={style.orgDetailConTitle}>{item.name}:</span>
                {item.title === 'businessLicense' ? (
                  <Image
                    width={150}
                    height={102}
                    src={detailList[item.title]}
                  />
                ) : item.title === 'orgStatus' ? (
                  <span style={{ height: '26px', lineHeight: '26px' }}>
                    {/* @ts-ignore */}
                    <Tag color={detailList[item.title]}>
                      {detailList[item.title] === 'success'
                        ? '审核通过'
                        : detailList[item.title] === 'warning'
                        ? '审核中'
                        : '审核不通过'}
                    </Tag>
                  </span>
                ) : (
                  <span className={style.log}>
                    {detailList[item.title] || '--'}
                  </span>
                )}
                <span
                  className={style.changStatus}
                  style={{
                    display:
                      item.name === '审核状态' &&
                      detailList[item.title] === 'warning' &&
                      history.location.pathname !==
                        '/business-infor/list/detail'
                        ? 'block'
                        : 'none',
                  }}
                  onClick={() => {}}
                >
                  <Button
                    type='primary'
                    onClick={() => changIisModalVisible(true)}
                  >
                    审核
                  </Button>
                </span>
              </div>
            </div>
          ) : (
            ''
          );
        })}
      </div>
      {/* <Form
        form={form}
        colon={true}
        size='middle'
        layout='horizontal'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        className={style.from_companyInfo}
      >
        1212121212121
        {renderLeftItem(companyItemFn)}
      </Form> */}
      {reExamine() && (
        <Modal
          title='审核'
          visible={isModalVisible}
          onOk={async () => {
            await examForm.validateFields().then(async value => {
              if (Number(value.auditPass) === 0 && !value.auditContent) {
                changIisModalVisible(true);
                VerifyUtils.Toast('error', '请填写审核不通过原因');
              } else if (
                history.location.pathname === '/business-infor/list/exam'
              ) {
                await apiEnterpriseAudit({
                  // 审核接口
                  ...value,
                  id: companyData.id,
                }).then(async ({ data }) => {
                  if (data.code === 200) {
                    changIisModalVisible(false);
                    examForm.resetFields();
                    getDetail();
                    VerifyUtils.ToastText('success', '审核成功');
                  } else await VerifyUtils.ToastText('info', data.msg);
                });
              } else {
                await apiorgAudit({
                  // 审核接口
                  ...value,
                  id: companyData.id,
                }).then(async ({ data }) => {
                  if (data.code === 200) {
                    changIisModalVisible(false);
                    examForm.resetFields();
                    getDetail();
                    VerifyUtils.ToastText('success', '审核成功');
                  } else await VerifyUtils.ToastText('info', data.msg);
                });
              }
              return '';
            });
          }}
          onCancel={() => {
            changIisModalVisible(false);
            examForm.resetFields();
          }}
        >
          <Form form={examForm} size='middle'>
            <Form.Item
              name='auditPass'
              label='审核意见'
              rules={[{ required: true, message: '审核意见不能为空' }]}
            >
              <Radio.Group>
                <Radio value='1'>审核通过</Radio>
                <Radio value='0'>审核不通过</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='审核说明' name='auditContent'>
              <Input.TextArea placeholder='请输入审核说明' />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default memo(Register);
