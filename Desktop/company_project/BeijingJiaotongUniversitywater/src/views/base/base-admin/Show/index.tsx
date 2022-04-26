import { FC, useEffect, useState, useMemo, useCallback } from 'react';
// import IconFont from '@components/iconfont';
import {
  Form,
  Input,
  Select,
  Button,
  Cascader,
  Checkbox,
  Modal,
  Image,
  Tag,
} from 'antd';
import { Option } from 'antd/es/mentions';
// import { getToken } from '@utils/cookie';
import { Rule } from 'antd/lib/form';
import style from '../index.module.scss';
import { apiOrgTree } from '@/views/base/service';
import { useHistory } from 'react-router-dom';
import CompanyInfoExamine from '@/views/system/register/component/companyInfoExamine';
import FormWrap from '@/views/system/component/FormWrap';
import VerifyUtils from '@/utils/verifty';
import {
  modify_mobile,
  org_create,
  org_detail,
  role_list,
  user_create,
  user_detail,
  user_edit,
} from '@/api/api';
import { RolesList } from './interfaceJson';
import { FormLabelAlign } from 'antd/lib/form/interface';
import {
  dataFilter,
  EnterpriseContentList,
  getCurrency,
} from '@/views/system/register/jsontsx/enterprise';
import { apiAddress } from '@/views/system/register/service';
interface ItemType {
  title: string;
  name: string;
  require: Rule[];
  labelAlign?: FormLabelAlign;
  placeholder: string;
  type: string;
  nameId?: string | null | undefined;
  textId?: string | null | undefined;
  class?: string;
  buttontext?: string;
  value?: string;
  select_list?: any[];
  maxLength?: number;
  show?: string;
  className?: string;
  isNeedButton?: boolean;
}

const Orgstaff: FC = () => {
  // const [imageLoading, changeImageLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [mechanism, setmechanism] = useState<any>([]);
  // 组织类型列表
  const [orgList, setorgLists] = useState<any>([]);
  // 选中组织类型
  const [orgType, setorgType] = useState<string>('');
  // 选中组织类型
  const [financial, setfinancial] = useState<any>([]);
  const [OrganizationType, setOrganizationType] = useState<
    RolesList['organizationTypeOrg']
  >({});
  const [Iphonevisible, setIphonevisible] = useState(false);
  const [userRole, setuserRole] = useState<any>([]);
  const [detailList, setDetailList] = useState<any>({});
  const [DetailId, setDetailId] = useState('');
  const [previewVisible] = useState(false);
  const [formValue, changeFormValue] = useState<{
    orgType?: string;
    bankOrgId?: string;
    id?: string;
    contactEmail?: string;
    contactMobile?: string;
    contactName?: string;
    orgName?: string;
  }>({});
  // const [orgTree, getOrgTree] = useState<{ orgName: string }[]>([]);
  const culDisAble = () => {
    return ['detail', 'examine'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  useEffect(() => {
    console.log(OrganizationType);
    if (OrganizationType.titleId) {
      role_list({ orgType: OrganizationType.orgType }).then(({ data }) => {
        if (data.code === 200) {
          console.log(data.data);
          let arr: any[] = [];
          data.data.forEach((item: any) => {
            arr.push({
              label: item.roleName,
              value: item.id,
            });
          });
          setuserRole(arr);
        }
      });
    }
  }, [OrganizationType]);

  // 金融机构,征信机构,人民银行
  const getdetailJson = (type: string) => {
    let name =
      type === '金融机构' || type === '征信机构' || type === '人民银行'
        ? '机构'
        : type === '贷款企业'
        ? ''
        : '核算';
    switch (name) {
      case '机构':
        return [
          {
            name: '审核状态',
            title: 'orgStatus',
            classNames: 'oneName',
          },
          {
            name: <span> 组织名称</span>,
            title: 'orgName',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 组织类型</span>,
            title: 'orgType_name',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 创建者</span>,
            title: 'createByUsername',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 联系人</span>,
            title: 'contactName',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 联系电话</span>,
            title: 'contactMobile',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 电子邮箱</span>,
            title: 'contactEmail',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
        ];
      case '核算':
        return [
          {
            name: '审核状态',
            title: 'orgStatus',
            classNames: 'oneName',
          },
          {
            name: <span> 组织名称</span>,
            title: 'orgName',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 组织类型</span>,
            title: 'orgType_name',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 所属金融机构</span>,
            title: 'bankOrgId',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 创建者</span>,
            title: 'createByUsername',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 联系人</span>,
            title: 'contactName',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 联系电话</span>,
            title: 'contactMobile',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 电子邮箱</span>,
            title: 'contactEmail',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
        ];
      default:
        return [
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
            name: <span> 创建者</span>,
            title: 'createByUsername',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
          },
          {
            name: <span> 组织类型</span>,
            title: 'orgType_name',
            classNames: 'oneName',
            disabled: true,
            placeholder: '请输入',
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
    }
  };
  // 用户详情
  const UserDeatil = useMemo(() => {
    console.log(history.location.pathname);
    return history.location.pathname === '/auth/user/detail'
      ? [
          {
            name: '手机号',
            title: 'username',
            classNames: 'detail_20',
            show: true,
          },
          {
            name: '所属组织',
            title: 'orgType_name',
            classNames: 'detail_20',
            show: false,
          },
          {
            name: '用户角色',
            title: 'roleNames',
            classNames: 'detail_20',
            show: false,
          },
        ]
      : history.location.pathname === '/business-infor/list/detail'
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
            previewVisible,
            () => {},
            () => {},
            () => {},
            () => {},
            '列表',
          ),
        ]
      : getdetailJson(detailList.orgType_name);
  }, [detailList]);
  // 来源信息
  const sourceItemFn = useMemo<any[]>(() => {
    return [
      {
        name: '组织名称：',
        type: 'input',
        title: 'orgName',
        labelAlign: 'left',
        maxLength: 200,
        placeholder: !culDisAble() ? '请输入' : '',
        require: !culDisAble()
          ? [
              { required: true, message: '请输入组织名称' },
              { max: 200, message: '最多可输入200个字符' },
            ]
          : [],
      },

      {
        name: '组织类型：',
        type: 'select',
        title: 'orgType',
        labelAlign: 'left',
        placeholder: !culDisAble() ? '请选择' : '',
        select_list: orgList,
        require: !culDisAble()
          ? [{ required: true, message: '请选择组织类型' }]
          : [],
      },
      {
        name: '金融机构',
        type: 'debounceSelect',
        title: 'bankOrgId',
        labelAlign: 'left',
        select_list: financial,
        show:
          form.getFieldsValue().orgType === 3 || !form.getFieldsValue().orgType
            ? '隐藏'
            : '',
        placeholder: !culDisAble() ? '请输入' : '',
        require:
          orgType === '核查机构'
            ? !culDisAble()
              ? [{ required: true, message: '请选择金融机构' }]
              : []
            : [],
      },
      {
        name: '联系人：',
        type: 'input',
        title: 'contactName',
        labelAlign: 'left',
        maxLength: 50,
        placeholder: !culDisAble() ? '请输入' : '',
        require: !culDisAble()
          ? [{ required: true, message: '请输入联系人' }]
          : [],
      },
      {
        name: '联系电话：',
        type: 'input',
        title: 'contactMobile',
        labelAlign: 'left',
        maxLength: 13,
        placeholder: !culDisAble() ? '请输入' : '',
        require: !culDisAble()
          ? [{ required: true, message: '请输入联系电话' }]
          : [],
      },
      {
        name: '电子邮箱：',
        type: 'input',
        labelAlign: 'left',
        title: 'contactEmail',
        placeholder: !culDisAble() ? '请输入' : '',
        require: !culDisAble()
          ? [
              { required: true, message: '请输入电子邮箱 ' },
              {
                type: 'email',
                message: '电子邮箱不正确',
              },
            ]
          : [],
      },
    ];
  }, [
    form.getFieldsValue(true),
    mechanism,
    orgList,
    OrganizationType,
    financial,
  ]);
  const userItemFn = useMemo<any[]>(() => {
    return [
      {
        name: '手机号',
        type: 'input',
        className: 'oneName',
        title: 'username',
        labelAlign: 'left',
        placeholder: !culDisAble() ? '请输入' : '',
        maxLength: 11,
        require: !culDisAble()
          ? [
              { required: true, message: '请输入手机号' },
              {
                pattern:
                  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                message: '手机号错误',
              },
            ]
          : [],
      },

      {
        name: '所属组织',
        type: 'Cascader',
        title: 'orgId',
        className: 'oneName',
        labelAlign: 'left',
        placeholder: !culDisAble() ? '请输入' : '',
        select_list: mechanism,
        require: !culDisAble()
          ? [{ required: true, message: '所属组织不能为空' }]
          : [],
      },
      {
        name: '用户角色',
        type: 'checkBox',
        title: 'roleIds',
        nameId: 'id',
        textId: 'roleName',
        className: 'threeName',
        select_list: userRole,
        labelAlign: 'left',
        show: userRole.length > 0 ? '显示' : '隐藏',
        placeholder: !culDisAble() ? '请输入' : '',
        require: form.getFieldValue('orgId')
          ? !culDisAble()
            ? [{ required: true, message: '用户角色不能为空' }]
            : []
          : [],
      },
    ];
  }, [form.getFieldsValue(true), mechanism, userRole]);
  const renderLeftItem = useCallback(
    (LeftItem: ItemType[]) => {
      return LeftItem.map(item => {
        if (item.show === '隐藏') {
          return '';
        }
        if (item.type === 'input') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign={item.labelAlign}
              rules={item.require}
            >
              <Input
                disabled={
                  history.location.pathname === '/auth/user/edit'
                    ? true
                    : culDisAble()
                }
                placeholder={item.placeholder}
                maxLength={item.maxLength}
              />
            </Form.Item>
          );
        }
        if (item.type === 'select') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign={item.labelAlign}
              rules={item.require}
            >
              <Select
                disabled={culDisAble()}
                placeholder={item.placeholder}
                onChange={(value, list: any) => {
                  console.log(value, list, 'orgType');
                  setorgType(list.children);
                  if (item.title === 'orgType') {
                    changeFormValue({
                      orgType: value,
                    });
                  }
                  if (history.location.pathname === '/auth/org/add') {
                    checkList(3, '');
                  }
                }}
              >
                {item?.select_list &&
                  item.select_list?.map(
                    (tem: { id: string | number; name: string }) => {
                      return (
                        // @ts-ignore
                        <Option value={tem.id ? tem.id : ''}>{tem.name}</Option>
                      );
                    },
                  )}
              </Select>
            </Form.Item>
          );
        }
        if (item.type === 'debounceSelect') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign={item.labelAlign}
              rules={item.require}
            >
              <Select
                showSearch
                placeholder={item.placeholder}
                filterOption={false}
                onSearch={async e => {
                  await checkList(3, e);
                }}
                disabled={orgType === ''}
                maxTagCount={5}
                // notFoundContent={fetching ? <Spin size='small' /> : null}
                options={item.select_list}
                fieldNames={{
                  label: 'orgName',
                  value: 'id',
                }}
              />
            </Form.Item>
          );
        }
        if (item.type === 'disabledinput') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign={item.labelAlign}
              rules={item.require}
            >
              <Input disabled placeholder={item.placeholder} maxLength={100} />
            </Form.Item>
          );
        }
        if (item.type === 'text') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign={item.labelAlign}
              rules={item.require}
            >
              <span> {item.value}</span>
            </Form.Item>
          );
        }
        if (item.type === 'Cascader') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign={item.labelAlign}
              rules={item.require}
            >
              <Cascader
                fieldNames={{
                  label: 'titleName',
                  value: 'titleId',
                  children: 'orgList',
                }}
                options={item.select_list}
                disabled={history.location.pathname === '/auth/user/edit'}
                // disabled={}
                onChange={(e: any[], b: any) => {
                  setOrganizationType(b[1]);
                }}
                placeholder='请选择'
              />
            </Form.Item>
          );
        }
        if (item.type === 'checkBox') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign={item.labelAlign}
              rules={item.require}
              className={item.className ? style[item.className] : ''}
            >
              <Checkbox.Group>
                {item.select_list?.map((item: any) => {
                  return <Checkbox value={item.value}>{item.label}</Checkbox>;
                })}
              </Checkbox.Group>
            </Form.Item>
          );
        }
        return '';
      });
    },
    [formValue],
  );

  // 图片上传
  // const apiFileUploadFn = async file => {
  //   const { data } = await apiFileUpload(file);
  // };
  const apiOrgTreeFn = async () => {
    await apiOrgTree({
      likeOrgName: '',
    }).then(({ data }) => {
      console.log(data, 'data=data');
      if (data.code !== 200) VerifyUtils.Toast('info', data.msg);
      if (data?.data[0]) {
        let orgLists: any[] = [];
        data.data.forEach((item: any) => {
          item.titleName = item.orgType_name;
          item.titleId = item.orgType;
          item.orgList.forEach((atem: any) => {
            atem.titleName = atem.orgName;
            atem.titleId = atem.id;
          });
          // 组织类型
          if (
            item.orgType_name === '金融机构' ||
            item.orgType_name === '核查机构'
          ) {
            console.log(item);
            item.id = item.orgType;
            item.name = item.orgType_name;
            orgLists.push(item);
          }
        });
        setorgLists([
          {
            id: 3,
            name: '金融机构',
          },
          {
            id: 4,
            name: '核查机构',
          },
        ]);
        setmechanism(data.data);
      } else {
        setmechanism([]);
      }
    });
  };
  const checkList = (value: any, likeOrgName: string) => {
    console.log(value);
    apiOrgTree({
      orgType: value,
      likeOrgName: likeOrgName,
    }).then(({ data }) => {
      if (data.code === 200) {
        if (data.data.length > 0) {
          setfinancial(data.data[0].orgList);
        } else {
          setfinancial([]);
        }
      } else {
        VerifyUtils.Toast('info', data.msg);
      }
    });
  };
  // 新增组织方法
  // const apiOrgCreateFn = async (params: { bankOrgId: string[] }) => {
  //   await apiOrgCreate({ ...params, bankOrgId: params.bankOrgId[0] }).then(
  //     ({ data }) => {
  //       console.log(data, 'data=darta');
  //       if (data.code === 200) {
  //         history.go(-1);
  //       }
  //     },
  //   );
  // };
  // 获取组织详情 接口
  const apiSystemOrgDetailFn = async () => {
    const id = new URLSearchParams(location.search).get('id') || '';
    console.log(id);
    // await apiSystemOrgDetail({ id }).then(({ data }) => {
    //   console.log(data);
    //   const {
    //     bankOrgId,
    //     contactEmail,
    //     contactMobile,
    //     contactName,
    //     orgName,
    //     orgType,
    //     id,
    //   } = data.data;
    //   form.setFieldsValue({
    //     bankOrgId,
    //     contactEmail,
    //     contactMobile,
    //     contactName,
    //     orgName,
    //     orgType,
    //   });
    //   changeFormValue({
    //     bankOrgId,
    //     contactEmail,
    //     contactMobile,
    //     contactName,
    //     orgName,
    //     orgType,
    //     id,
    //   });
    // });
  };
  //
  const submitUser = (value: any) => {
    // console.log(
    //   value,
    //   OrganizationType,
    //   history.location.search.split('?')[1].split('id='),
    // );
    const submit =
      history.location.pathname === '/auth/user/edit'
        ? {
            id:
              history.location.search.split('?').length > 0
                ? history.location.search.split('?')[1].split('id=')[1]
                : '',
            roleIds: value.roleIds,
          }
        : {
            orgType: OrganizationType.orgType,
            orgId: OrganizationType.titleId,
            roleIds: value.roleIds,
            username: value.username,
          };
    const url =
      history.location.pathname === '/auth/user/edit' ? user_edit : user_create;
    url(submit).then(({ data }) => {
      console.log(data);
      if (data.code !== 200) VerifyUtils.Toast('error', data.msg);
      if (data.code === 200) {
        VerifyUtils.Toast(
          'success',
          history.location.pathname === '/auth/user/edit'
            ? '编辑成功'
            : '新增成功',
        );
        history.goBack();
      }
    });
    console.log(submit);
  };
  const submitOrg = (value: any) => {
    org_create(value).then(({ data }) => {
      console.log(data);
      if (data.code !== 200) VerifyUtils.Toast('error', data.msg);
      if (data.code === 200) {
        VerifyUtils.Toast('success', '新增成功');
        history.goBack();
      }
    });
  };
  const getDetail = (id: string) => {
    if (history.location.pathname === '/auth/org/detail') {
      console.log(id);
      org_detail({ id: id }).then((res: any) => {
        if (res.data.code === 200) {
          let list = res.data.data;
          apiAddress().then((resItem: any) => {
            if (resItem.data.code === 200) {
              let contactCodes: string | undefined = '';
              let depositBankCodes: string | undefined = '';
              let produceCodes: string | undefined = '';
              let regCodes: string | undefined = '';
              if (list.contactCodes) {
                contactCodes = dataFilter(resItem.data.data, list.contactCodes);
                console.log(contactCodes, 'contactCodes');
              }
              if (list.depositBankCodes) {
                depositBankCodes = dataFilter(
                  resItem.data.data,
                  list.depositBankCodes,
                );
              }
              if (list.produceCodes) {
                produceCodes = dataFilter(
                  resItem.data.data,
                  list.depositBankCodes,
                );
              }
              if (list.regCodes) {
                regCodes = dataFilter(resItem.data.data, list.regCodes);
              }
              console.log('registeredCapitalCurrency', 'new');
              const registeredCapitalCurrency = getCurrency.filter(
                (item: any) =>
                  Number(item.id) === list.registeredCapitalCurrency,
              )[0];
              // const operationPeriodType =
              //   list.operationPeriodType === 1
              //     ? list.operationPeriod
              //     : list.operationPeriod
              //     ? `${list.operationPeriod}至无固定期限`
              //     : '无固定期限';
              const operationPeriodType =
                list.operationPeriodType === 1
                  ? list.operationPeriod
                  : '无固定期限';
              let newList = {
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
                operationPeriodType: operationPeriodType,
                orgStatus:
                  Number(list.orgStatus) === 0
                    ? 'success'
                    : Number(list.orgStatus) === 1
                    ? 'warning'
                    : 'error',
              };
              if (newList.orgType_name === '核查机构') {
                org_detail({ id: newList.bankOrgId }).then((resItem: any) => {
                  newList = {
                    ...newList,
                    bankOrgId: resItem.data.data.orgName,
                  };
                  setDetailList(newList);
                });
              } else {
                setDetailList(newList);
                console.log(newList, 'new');
              }
            }
          });
        }
      });
    } else {
      if (history.location.pathname === '/auth/user/edit') {
        if (id.split('id=').length > 1) {
          id = id.split('id=')[1];
        }
      }
      user_detail({ id: id }).then((res: any) => {
        if (res.data.code === 200) {
          setDetailList(res.data.data);
          let orgType_name: string | number[] = [
            res.data.data.orgType,
            res.data.data.orgId,
          ];
          setOrganizationType({
            titleId: res.data.data.orgType,
            orgType: res.data.data.orgType,
          });
          console.log(orgType_name);
          form.setFieldsValue({ ...res.data.data, orgId: orgType_name });
        }
      });
    }
  };
  useEffect(() => {
    if (
      history.location.pathname === '/auth/user/detail' ||
      history.location.pathname === '/auth/org/detail' ||
      history.location.pathname === '/auth/user/edit'
    ) {
      if (history.location.search.split('?').length > 0) {
        getDetail(history.location.search.split('?')[1]);
        setDetailId(history.location.search.split('?')[1]);
      }
      if (history.location.pathname == '/auth/user/edit') {
        apiOrgTreeFn();
        apiSystemOrgDetailFn();
      }
    } else {
      // console.log(apiFileUploadFn, 'apiFileUploadFn');
      // apiFileUploadFn();
      apiOrgTreeFn();
      apiSystemOrgDetailFn();
    }
  }, []);
  const renderContent = () => {
    if (history.location.pathname.indexOf('examine') >= 0) {
      return (
        <FormWrap
          style={
            ['exam', 'detail'].some(
              item => history.location.pathname.indexOf(item) >= 0,
            )
              ? { width: '100%', marginTop: '16px', minHeight: '716px' }
              : {}
          }
        >
          <CompanyInfoExamine />
        </FormWrap>
      );
    }

    const returnItme = () => {
      if (history.location.pathname.indexOf('/auth/user') >= 0) {
        return userItemFn;
      }
      return sourceItemFn;
    };
    return (
      <>
        <div className={style.company}>
          {/* {JSON.stringify(orgTree)}=orgTree */}
          {/* {JSON.stringify(form.getFieldValue('orgType'))}=orgType */}
          {history.location.pathname === '/auth/user/detail' ? (
            UserDeatil.map((item: any) => {
              return (
                <div className={style.userdetails}>
                  <span className={style[item.classNames]}>{item.name}:</span>
                  <span>{detailList[item.title]}</span>
                  <span
                    className={style.chanage}
                    style={{ display: item.show ? 'block' : 'none' }}
                    onClick={() => setIphonevisible(true)}
                  >
                    更换手机号
                  </span>
                </div>
              );
            })
          ) : history.location.pathname === '/auth/org/detail' ||
            history.location.pathname === '/auth/org/examine' ? (
            <div className={style.orgDetail}>
              {UserDeatil.map((item: any) => {
                return item.name !== ' ' ? (
                  <div className={style[item.classNames]}>
                    <div className={style.orgDetailCon}>
                      <span className={style.orgDetailConTitle}>
                        {item.name}:
                      </span>
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
                        className={style.chanage}
                        style={{ display: item.show ? 'block' : 'none' }}
                        onClick={() => setIphonevisible(true)}
                      >
                        更换手机号
                      </span>
                    </div>
                  </div>
                ) : (
                  ''
                );
              })}
            </div>
          ) : (
            <div
              className={style.content}
              style={{
                width:
                  history.location.pathname === '/auth/org/add'
                    ? ''
                    : history.location.pathname === '/auth/user/add' ||
                      history.location.pathname === '/auth/user/edit'
                    ? '80%'
                    : '50%',
              }}
            >
              <Form
                className={
                  history.location.pathname === '/auth/org/add'
                    ? style.organizationConList
                    : history.location.pathname === '/auth/user/add' ||
                      history.location.pathname === '/auth/user/edit'
                    ? style.userConList
                    : style.organizationCon
                }
                form={form}
                size='middle'
                labelCol={{
                  style: { width: 80 },
                }}
              >
                {renderLeftItem(returnItme())}
              </Form>
            </div>
          )}
        </div>
        <div
          className={style.DrawerBtn}
          style={{
            textAlign: 'center',
            padding: '20px',
            borderTop: '1px solid #efefef',
          }}
        >
          {culDisAble() ? (
            <>
              <Button
                onClick={() => {
                  history.go(-1);
                }}
              >
                返回
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => history.goBack()}>取消</Button>
              <Button
                className='marginLeft20'
                type='primary'
                onClick={async () => {
                  await form.validateFields().then(async value => {
                    if (
                      history.location.pathname === '/auth/user/add' ||
                      history.location.pathname === '/auth/user/edit'
                    ) {
                      submitUser(value);
                    } else {
                      submitOrg(value);
                    }
                  });
                }}
              >
                保存
              </Button>
            </>
          )}
          {/* 更换手机号 */}
          <Modal
            title='更换手机号'
            visible={Iphonevisible}
            onOk={() => {}}
            onCancel={() => setIphonevisible(false)}
            footer={false}
          >
            <Form
              className={style.chanageIphone}
              labelCol={{ span: 5 }}
              form={form}
              onFinish={e => {
                console.log(e);
                if (e.mobile === detailList.username) {
                  VerifyUtils.Toast('info', '该手机号已注册');
                } else {
                  modify_mobile({
                    ...e,
                    id: DetailId !== '' ? DetailId : '',
                  }).then((res: any) => {
                    if (res.data.code === 200) {
                      VerifyUtils.Toast('success', '更换成功');
                      setIphonevisible(false);
                      getDetail(DetailId);
                    } else {
                      VerifyUtils.Toast('error', res.data.msg);
                    }
                  });
                }
              }}
            >
              <Form.Item label='现手机号'>
                <span>{detailList.username}</span>
              </Form.Item>
              <Form.Item label='所属组织'>
                <span>{detailList.orgType_name}</span>
              </Form.Item>
              <Form.Item
                name={'mobile'}
                label='新手机号'
                rules={[
                  { required: true, message: '请输入新手机号' },
                  {
                    pattern:
                      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: '手机号错误',
                  },
                ]}
              >
                <Input maxLength={11} />
              </Form.Item>
              <Form.Item className={style.submit}>
                <Button onClick={() => setIphonevisible(false)}>取消</Button>
                <Button
                  className={style.submiy}
                  type='primary'
                  htmlType='submit'
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </>
    );
  };
  return renderContent();
};

export default Orgstaff;
