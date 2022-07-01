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
  Row,
  Col,
} from 'antd';
import { Option } from 'antd/es/mentions';
// import { getToken } from '@utils/cookie';
import { Rule } from 'antd/lib/form';
import { useHistory } from 'react-router-dom';
import { FormLabelAlign } from 'antd/lib/form/interface';
import style from '../index.module.scss';
import {
  apiOrgTree,
  apiGetRolePage,
  apiOrganizationPage,
  apiUserAdd,
  apiUserEdit,
  apiUserDetail,
  apiOrgAdd,
  apiOrgEdit,
  apiOrgDetail,
  apiResetPwd,
} from '@/views/base/service';
import VerifyUtils from '@/utils/verifty';
import { RolesList } from './interfaceJson';
import {
  // dataFilter,
  EnterpriseContentList,
  // getCurrency,
} from '@/views/system/register/jsontsx/enterprise';

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
  // const [orgList, setorgLists] = useState<any>([]);
  // 选中组织类型
  const [orgType, setorgType] = useState<string>('');
  // 选中组织类型
  const [financial, setfinancial] = useState<any>([]);
  const [OrganizationType, setOrganizationType] = useState<
    RolesList['organizationTypeOrg']
  >({});
  const [userRole, setuserRole] = useState<any>([]);
  const [detailList, setDetailList] = useState<any>({});
  const [previewVisible] = useState(false);
  // const [formValue, changeFormValue] = useState<{
  //   orgType?: string;
  //   bankOrgId?: string;
  //   id?: string;
  //   contactEmail?: string;
  //   contactMobile?: string;
  //   contactName?: string;
  //   orgName?: string;
  //   parent_id?: string;
  // }>({});
  const [visible, setVisible] = useState<boolean>(false);

  const onClose = () => {
    setVisible(!visible);
  };
  const onOk = async () => {
    const res = await apiResetPwd({ username: detailList.username });
    if (res.data.code === 200) {
      setVisible(!visible);
      VerifyUtils.Toast('success', '重置成功');
    } else {
      VerifyUtils.Toast('info', res.data.msg);
    }
  };
  // const [orgTree, getOrgTree] = useState<{ orgName: string }[]>([]);
  const culDisAble = () => {
    return ['detail', 'examine'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  useEffect(() => {
    if (history.location.pathname.indexOf('/auth/user') >= 0) {
      apiGetRolePage({ page: 1, page_size: 100 }).then(({ data }) => {
        if (data.code === 200) {
          console.log(data.data);
          const arr: any[] = [];
          data.data.results.forEach((item: any) => {
            arr.push({
              label: item.name,
              value: item.id,
            });
          });
          setuserRole(arr);
        }
      });
    }
  }, [OrganizationType]);

  // 用户详情
  const UserDeatil = useMemo(() => {
    console.log(history.location.pathname);
    return history.location.pathname === '/auth/user/detail'
      ? [
          {
            name: '账号',
            title: 'username',
            show: true,
          },
          {
            name: '姓名',
            title: 'nick_name',
          },
          {
            name: '联系方式',
            title: 'phone',
          },
          {
            name: '所属组织',
            title: 'organization_name',
          },
          {
            name: '角色',
            title: 'role',
            type: 'checkBox',
          },
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
        ];
  }, [detailList]);
  // 组织管理-
  const orgItemFn = useMemo<any[]>(() => {
    return [
      {
        name: '组织名称',
        type: 'input',
        title: 'name',
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
        name: '组织简称',
        type: 'input',
        title: 'abbreviation',
        labelAlign: 'left',
        maxLength: 200,
        placeholder: !culDisAble() ? '请输入' : '',
        require: !culDisAble()
          ? [
              { required: true, message: '请输入组织简称' },
              { max: 200, message: '最多可输入200个字符' },
            ]
          : [],
      },
      {
        name: '组织编码',
        type: 'input',
        title: 'org_code',
        labelAlign: 'left',
        maxLength: 50,
        placeholder: !culDisAble() ? '请输入' : '',
        require: !culDisAble()
          ? [
              { required: true, message: '请输入组织编码' },
              { max: 50, message: '最多可输入50个字符' },
            ]
          : [],
      },
      {
        name: '上级组织',
        type: 'select',
        title: 'parent_name',
        labelAlign: 'left',
        placeholder: !culDisAble() ? '请选择' : '',
        select_list: mechanism,
        require: !culDisAble()
          ? [{ required: true, message: '请选择上级组织' }]
          : [],
      },
    ];
  }, [
    form.getFieldsValue(true),
    mechanism,
    // orgList,
    OrganizationType,
    financial,
  ]);
  // 用户管理-
  const userItemFn = useMemo<any[]>(() => {
    return [
      {
        name: '账号',
        type: 'input',
        className: 'oneName',
        title: 'username',
        labelAlign: 'left',
        placeholder: !culDisAble() ? '请输入' : '',
        maxLength: 50,
        require: !culDisAble()
          ? [{ required: true, message: '请输入账号' }]
          : [],
      },
      {
        name: '姓名',
        type: 'input',
        className: 'oneName',
        title: 'nick_name',
        labelAlign: 'left',
        placeholder: !culDisAble() ? '请输入' : '',
        maxLength: 50,
        require: !culDisAble()
          ? [{ required: true, message: '请输入姓名' }]
          : [],
      },
      {
        name: '联系方式',
        type: 'input',
        className: 'oneName',
        title: 'phone',
        labelAlign: 'left',
        placeholder: !culDisAble() ? '请输入' : '',
        maxLength: 11,
        require: !culDisAble()
          ? [
              { required: true, message: '请输入联系方式' },
              {
                pattern:
                  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                message: '联系方式错误',
              },
            ]
          : [],
      },
      {
        name: '所属组织',
        type: 'select',
        title: 'organization_id',
        className: 'oneName',
        labelAlign: 'left',
        placeholder: !culDisAble() ? '请输入' : '',
        select_list: mechanism,
        require: !culDisAble()
          ? [{ required: true, message: '请选择所属组织' }]
          : [],
      },
      {
        name: '角色',
        type: 'checkBox',
        title: 'role',
        nameId: 'id',
        textId: 'roleName',
        className: 'threeName',
        select_list: userRole,
        labelAlign: 'left',
        show: userRole.length > 0 ? '显示' : '隐藏',
        placeholder: !culDisAble() ? '请输入' : '',
        require: !culDisAble()
          ? [{ required: true, message: '请至少选择一个角色' }]
          : [],
      },
    ];
  }, [form.getFieldsValue(true), mechanism, userRole]);
  const renderLeftItem = useCallback((LeftItem: ItemType[]) => {
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
                history.location.pathname === '/auth/user/edit' &&
                item.name === '账号'
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
                console.log(item, value, list, '"parent_name"');
                setorgType(list.children);
                // if (item.title === 'parent_name') {
                //   changeFormValue({
                //     parent_id: value,
                //   });
                // }
                if (history.location.pathname === '/auth/org/add') {
                  // checkList(3, '');
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
              <Row>
                {item.select_list?.map((item: any) => {
                  return (
                    <Col span={8}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        );
      }
      return '';
    });
  }, []);

  // 图片上传
  // const apiFileUploadFn = async file => {
  //   const { data } = await apiFileUpload(file);
  // };
  // 获取组织列表
  const apiOrgTreeFn = async () => {
    await apiOrganizationPage({
      page: 1,
      page_size: 100,
    }).then(({ data }) => {
      console.log(data, 'data=data');
      if (data.code !== 200) VerifyUtils.Toast('info', data.msg);
      if (data?.data) {
        data.data.results.forEach((item: any) => {
          item.titleName = item.name;
          item.titleId = item.id;
        });
        setmechanism(data.data.results);
      } else {
        setmechanism([]);
      }
    });
  };
  const checkList = (value: any, likeOrgName: string) => {
    console.log(value);
    apiOrgTree({
      orgType: value,
      likeOrgName,
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
  // 保存-用户
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
            organization_id: value.organization_id,
            nick_name: value.nick_name,
            phone: value.phone,
            role: value.role,
          }
        : {
            // orgType: OrganizationType.orgType,
            // orgId: OrganizationType.titleId,
            organization_id: value.organization_id,
            username: value.username,
            nick_name: value.nick_name,
            phone: value.phone,
            role: value.role,
          };
    const url =
      history.location.pathname === '/auth/user/edit'
        ? apiUserEdit
        : apiUserAdd;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
  // 保存-组织
  const submitOrg = (value: any) => {
    // console.log(value, 'value');
    interface subType {
      abbreviation: string;
      name: string;
      org_code: string;
      parent_id: string;
      id?: string;
    }
    const submit: subType = {
      abbreviation: value.abbreviation,
      name: value.name,
      org_code: value.org_code,
      parent_id: value.parent_name || '-',
    };
    if (history.location.pathname === '/auth/org/edit') {
      submit.id =
        history.location.search.split('?').length > 0
          ? history.location.search.split('?')[1].split('id=')[1]
          : '';
    }
    const url =
      history.location.pathname === '/auth/org/edit' ? apiOrgEdit : apiOrgAdd;
    url(submit).then(({ data }) => {
      console.log(data);
      if (data.code !== 200) VerifyUtils.Toast('error', data.msg);
      if (data.code === 200) {
        VerifyUtils.Toast(
          'success',
          history.location.pathname === '/auth/org/edit'
            ? '编辑成功'
            : '新增成功',
        );
        history.goBack();
      }
    });
    console.log(submit);
  };
  const getDetail = (id: string) => {
    if (history.location.pathname === '/auth/org/detail') {
      console.log(id);
    } else {
      if (
        history.location.pathname === '/auth/user/edit' ||
        history.location.pathname === '/auth/user/detail'
      ) {
        if (id.split('id=').length > 1) {
          // todo fix search
          // eslint-disable-next-line
          id = id.split('id=')[1];
        }
        apiUserDetail({ id }).then((res: any) => {
          if (res.data.code === 200) {
            setDetailList(res.data.data);
            const roleId: [] = res.data.data.role.map((item: { id: any }) => {
              return item.id;
            });
            // setOrganizationType({
            //   titleId: res.data.data.orgType,
            //   orgType: res.data.data.orgType,
            // });
            console.log(roleId, 'roleId');
            form.setFieldsValue({ ...res.data.data, role: roleId });
          }
        });
      }
      if (history.location.pathname === '/auth/org/edit') {
        if (id.split('id=').length > 1) {
          // todo fix search
          // eslint-disable-next-line
          id = id.split('id=')[1];
        }
        apiOrgDetail({ id }).then((res: any) => {
          if (res.data.code === 200) {
            setDetailList(res.data.data);
            form.setFieldsValue({ ...res.data.data });
          }
        });
      }
    }
  };
  useEffect(() => {
    if (
      history.location.pathname === '/auth/user/detail' ||
      history.location.pathname === '/auth/org/edit' ||
      history.location.pathname === '/auth/user/edit'
    ) {
      if (history.location.search.split('?').length > 0) {
        getDetail(history.location.search.split('?')[1]);
        // setDetailId(history.location.search.split('?')[1]);
      }
      if (
        history.location.pathname === '/auth/user/edit' ||
        history.location.pathname === '/auth/org/edit'
      ) {
        apiOrgTreeFn();
      }
    } else {
      // console.log(apiFileUploadFn, 'apiFileUploadFn');
      // apiFileUploadFn();
      apiOrgTreeFn();
    }
  }, []);
  const renderContent = () => {
    // 渲染组织 、 用户新增页面组件
    const returnItme = () => {
      if (history.location.pathname.indexOf('/auth/user') >= 0) {
        return userItemFn;
      }
      return orgItemFn;
    };
    return (
      <>
        <div className={style.company}>
          {history.location.pathname === '/auth/user/detail' ? (
            UserDeatil.map((item: any) => {
              return (
                <div className={style.userdetails}>
                  <div className={style.detail_title}>
                    <span>{item.name}</span>
                    <span
                      className={style.chanage}
                      style={{ display: item.show ? 'block' : 'none' }}
                      onClick={() => setVisible(true)}
                    >
                      重置密码
                    </span>
                  </div>
                  {/* <div className={style.detail_input}>{item.title}</div> */}
                  {item.type && item.type === 'checkBox' ? (
                    <div className={style.detail_checkBox}>
                      <Row>
                        {detailList[item.title]?.map((it: any) => {
                          return (
                            <Col span={8}>
                              <Checkbox value={it.id} checked disabled>
                                {it.name}
                              </Checkbox>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  ) : (
                    <div className={style.detail_input}>
                      {detailList[item.title]}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              className={style.content}
              style={{
                width: '80%',
              }}
            >
              <Form
                className={style.userConList}
                form={form}
                size='middle'
                layout='vertical'
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
            <Button
              onClick={() => {
                history.go(-1);
              }}
            >
              返回
            </Button>
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
                      console.log(value, 'value');
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
        </div>
        {/* 重置密码弹层 */}
        <Modal
          maskClosable
          visible={visible}
          title='重置密码'
          width='400px'
          onCancel={onClose}
          onOk={onOk}
        >
          <p>
            该用户：
            <span className={style.modal_pwd_span}>{detailList.username} </span>
            的登录密码
          </p>
          <p>
            将重置为默认密码：
            <span className={style.modal_pwd_span}>carbon123456</span>
            ，确认继续？
          </p>
        </Modal>
      </>
    );
  };
  return renderContent();
};

export default Orgstaff;
