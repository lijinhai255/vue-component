/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import Style from '@styles/UserIndex.module.scss';
import { useHistory } from 'react-router-dom';
import { Dictionary } from 'lodash';
import {
  apiCreateUser,
  apiEditeUser,
  changeStatus,
  getAddUserInfo,
  User,
} from './service';
import { userAddList, UserType } from './InfoJson';
import VerifyUtils, { Toast } from '@/utils/verifty';
import { apiresetPwd } from '@/api/api';

export interface AddOrEditUserProps {
  visible: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
}

function AddOrEditUser() {
  const [form] = Form.useForm<UserType>();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [showTitle, setShowTitle] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [UserList, setUserList] = useState<User>({});
  const [userAddLists, setuserAddLists] = useState<Array<any>>([]);
  const objList = (obj: Dictionary<any>) => {
    const arr: any = [];
    Object.keys(obj).forEach((item: string) => {
      const obje = {
        id: item,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: obj[item],
      };
      arr.push(obje);
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return arr;
    // for (const i in obj) {
    //   const o = { name: i, tel: obj[i] };
    //   arr.push(o);
    // }
    // console.log(arr);
    // const newObj = {};
    // arr.forEach((item, index) => {
    //   newObj[index] = item;
    // });
  };
  const getAddUserInfoList = () => {
    getAddUserInfo().then((res: any) => {
      if (res.data.code === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // res.data.data.roles = res.data.data.roles.join('、');
        setuserAddLists(userAddList(objList(res.data.roles)));
      }
    });
  };
  const checkEdit = (id: number, url: string | null) => {
    // apiUpdateMenu()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    apiEditeUser(id).then((res: any) => {
      if (res.data.code === 500) Toast('warn', res.data.msg);
      if (res.data.code === 200) {
        setUserList(res.data.data);
        if (url === 'edit') {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          getAddUserInfo().then((es: any) => {
            if (es.data.code === 200) {
              const arr: string[] = [];
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const obj = es.data.roles;
              Object.getOwnPropertyNames(obj).forEach(function (
                key: string | number | any,
              ) {
                // eslint-disable-next-line
                res.data.data.roles.forEach((item: string) => {
                  if (obj[key] === item) arr.push(key);
                });
              });
              res.data.data.roleIds = arr;
              form.setFieldsValue({ ...res.data.data });
              getAddUserInfoList();
            }
          });
        } else {
          setuserAddLists(userAddList(res.data.data.roles.join('、')));
        }
      }
    });
  };

  useEffect(() => {
    const url =
      window.location.search !== '' && window.location.search !== undefined
        ? window.location.search.split('=')[0].split('?')[1]
        : '';
    setShowTitle(url);
    if (url === 'check' || url === 'edit') {
      const id = Number(window.location.search.split('=')[1]);
      checkEdit(id, url);
    } else {
      getAddUserInfoList();
    }
  }, []);
  const onSave = (e: any) => {
    console.log(e);
    console.log(showTitle);
    if (showTitle === 'edit') {
      console.log(e);
      console.log(showTitle);
      const id = Number(window.location.search.split('=')[1]);
      changeStatus({ ...e, userId: id }).then((res: any) => {
        if (res.data.code === 500) VerifyUtils.Toast('info', res.data.msg);
        if (res.data.code === 200) {
          history.push('/auth/user');

          VerifyUtils.Toast('success', '修改成功');
        }
      });
    } else {
      apiCreateUser({ ...e }).then((res: any) => {
        if (res.data.code === 500) Toast('warn', res.data.msg);
        if (res.data.code === 200) {
          history.push('/auth/user');
          Toast('success', '新增成功');
        }
      });
    }
  };
  const onFile = (e: any) => {
    console.log(e);
    if (
      e.values.roleIds === undefined ||
      e.values.roleIds === null ||
      e.values.roleIds.length === 0
    )
      Toast('error', '请至少选择一个账号角色');
  };
  return (
    <div className={Style.user_All}>
      {showTitle === '' || showTitle === 'edit' ? (
        <Form
          form={form}
          className={Style.user_All}
          onFinishFailed={e => onFile(e)}
          onFinish={e => onSave(e)}
        >
          <div className={Style.user_bg}>
            {userAddLists.length > 0
              ? userAddLists.map((item: any) => {
                  return (
                    <Form.Item
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      label={item.label}
                      labelCol={{
                        style: { width: 80 },
                      }}
                      wrapperCol={{
                        style: { width: 10 },
                      }}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      name={item.id}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      rules={item.require}
                    >
                      {item.type === 'input' ? (
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        <Input
                          disabled={
                            !!(item.label === '账号：' && showTitle === 'edit')
                          }
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          maxLength={item.max}
                          className={Style.user_input}
                        />
                      ) : (
                        <Checkbox.Group>
                          {item.checkList.length > 0
                            ? item.checkList.map(
                                (atem: {
                                  id: any;
                                  name:
                                    | boolean
                                    | ReactChild
                                    | ReactFragment
                                    | ReactPortal
                                    | null
                                    | undefined;
                                }) => {
                                  return (
                                    <Checkbox
                                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                      value={atem.id}
                                      style={{ lineHeight: '32px' }}
                                    >
                                      {atem.name}
                                    </Checkbox>
                                  );
                                },
                              )
                            : ''}
                        </Checkbox.Group>
                      )}
                    </Form.Item>
                  );
                })
              : ''}
          </div>
          <Form.Item className={Style.save_Btn}>
            <Button
              className={`${Style.save_btn_button} ${Style.save_btn_button_cancel}`}
              onClick={() => history.push('/auth/user')}
            >
              取消
            </Button>
            <Button
              htmlType='submit'
              className={`${Style.save_btn_button} ${Style.save_btn_button_save}`}
              type='primary'
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className={Style.user_addList}>
          {userAddLists.map(item => {
            return (
              <p className={Style.user_addList_list}>
                <span className={Style.user_addList_span}>{item.label}</span>
                {/* @ts-ignore */}
                <span className={Style.user_addList_span_list}>
                  {item.label === '账号角色：' ? (
                    <span>{item.checkList}</span>
                  ) : (
                    // @ts-ignore
                    <span className={Style.user_add_res}>
                      {/* @ts-ignore */}
                      {UserList[item.id] ? UserList[item.id] : '--'}
                      <span
                        onClick={() => setVisible(true)}
                        style={{
                          display: item.label === '账号：' ? 'block' : 'none',
                        }}
                      >
                        重置密码
                      </span>
                    </span>
                  )}
                </span>
              </p>
            );
          })}
          <Form.Item className={Style.save_Btn}>
            <Button
              htmlType='submit'
              className={`${Style.save_btn_button} ${Style.save_btn_button_save}`}
              type='primary'
              onClick={() => {
                history.push('/auth/user');
              }}
            >
              返回
            </Button>
          </Form.Item>
        </div>
      )}
      {/* 重置密码提示框 */}
      <Modal
        title='提示'
        visible={visible}
        onOk={() => {
          if (window.location.search) {
            const id = Number(window.location.search.split('=')[1]);
            apiresetPwd({ userId: id }).then((res: any) => {
              if (res.data.code === 200) {
                VerifyUtils.Toast('success', res.data.msg);
                setVisible(false);
              }
              if (res.data.code === 500) {
                VerifyUtils.Toast('error', res.data.msg);
              }
            });
            console.log(id);
          }
          console.log(UserList);
        }}
        // confirmLoading={() => {}}
        onCancel={() => setVisible(false)}
      >
        <p className={Style.restPass}>
          该账号将重置为默认密码：
          <span style={{ color: '#09C199' }}>carbon123456</span>，确认继续？
        </p>
      </Modal>
    </div>
  );
}

export default AddOrEditUser;
