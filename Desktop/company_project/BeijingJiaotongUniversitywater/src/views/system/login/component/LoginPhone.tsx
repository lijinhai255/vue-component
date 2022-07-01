import { Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { Child, List, list, listHtml, sendobj } from './loginJson';
import style from './login.module.scss';
import VerifyUtils from '@/utils/verifty';
import { apiLogin, apiRegister, apiVfcode } from '../../service';
import { modify_reset } from '@/api/api';
import { userInfo } from '../loginRes';

let secondInterval: number | null = null;
const IphoneScreen = () => {
  const [type, settype] = useState<string>('密码登录'); // setType
  const [form] = Form.useForm<sendobj>();
  const [vfcodeClass, setvfcodeClass] = useState<string>(style.linecode); // 验证码的form单样式
  const [seconds, setseconds] = useState<number>(0); // 验证码倒计时
  const sendcode = () => {
    console.log(form.getFieldsValue().username);
    if (
      form.getFieldsValue().username === undefined ||
      form.getFieldsValue().username === null ||
      form.getFieldsValue().username === ''
    ) {
      VerifyUtils.Toast('info', '请输入手机号');
    } else {
      apiVfcode({ mobile: form.getFieldsValue().username }).then(({ data }) => {
        if (data.code === 200) {
          setseconds(60);
          VerifyUtils.Toast('success', '发送成功');
        } else {
          VerifyUtils.Toast('info', data.msg);
        }
      });
    }
  };
  useEffect(() => {
    setseconds(0);
  }, [type]);
  useEffect(() => {
    if (seconds === 0) {
      if (secondInterval) clearInterval(secondInterval);
      setseconds(0);
    } else if (seconds === 60) {
      if (secondInterval) clearInterval(secondInterval);
      if (seconds > 0) {
        secondInterval = window.setInterval(() => {
          setseconds((n: number) => {
            return n - 1;
          });
        }, 1000);
      }
    }
  }, [seconds]);
  // eslint-disable-next-line consistent-return
  const chanageInt = (e: string) => {
    switch (e) {
      case '校验':
        return setvfcodeClass(style.linecode_check);
      case '失败':
        return setvfcodeClass(style.linecode_error);
      case '获取验证码':
        return sendcode();
      default:
        settype(e);
        form.resetFields();
        if (Cookies.get('username')) {
          form.setFieldsValue({
            ...form.getFieldsValue(),
            username: Cookies.get('username'),
          });
        }
    }
  };
  // eslint-disable-next-line consistent-return
  const filtertype = (sendtype: string, e: sendobj) => {
    console.log(sendtype, e, 'sendtype=sendtype');
    switch (sendtype) {
      case '登录':
        return {
          url: apiLogin,
          data: e,
        };
      case '企业用户注册':
        return {
          url: apiRegister,
          data: e,
        };
      case '忘记密码':
        return {
          url: modify_reset,
          data: e,
        };
      default:
    }
  };
  useEffect(() => {
    if (Cookies.get('username')) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        username: Cookies.get('username'),
      });
    }
    console.log(Cookies.get('username'));
  }, []);
  const lofingrom = (e: sendobj) => {
    delete e.test;
    const sendtype: string =
      type === '验证码登录' || type === '密码登录' ? '登录' : type;
    const data = filtertype(sendtype, e)?.data;
    filtertype(sendtype, e)
      ?.url(
        data || {
          username: '',
          password: '',
          vfcode: '',
        },
      )
      .then((res: AxiosResponse) => {
        console.log(res.data, 'data=data');
        if (res.data.code === 200) {
          if (sendtype === '忘记密码') {
            VerifyUtils.Toast('success', '密码修改成功');
            settype('密码登录');
          } else {
            userInfo(res.data.data, e.username);
          }
        } else VerifyUtils.Toast('info', res.data.msg);
      });
  };
  const loginList = useMemo(() => {
    const loginHtml: List[] = list.filter((item: List) => item.label === type);
    return loginHtml.length > 0 ? (
      <div>
        {/* {type === '验证码登录' || type === '密码登录' ? (
          <div className={style.lofinfilter}>
            <span
              className={type === '密码登录' ? style.normalspan : ''}
              onClick={() => {
                settype('密码登录');
              }}
            >
              密码登录
            </span>
            <span className={style.normalline}></span>
            <span
              className={type === '验证码登录' ? style.normalspan : ''}
              onClick={() => settype('验证码登录')}
            >
              验证码登录
            </span>
          </div>
        ) : (
          <div className={loginHtml[0].className}>{loginHtml[0].label}</div>
        )} */}
        <Form
          form={form}
          onFinishFailed={e => {
            if (
              e.values.vfcode === undefined ||
              e.values.vfcode === '' ||
              e.values.vfcode.length < 6
            )
              chanageInt('失败');
          }}
          onValuesChange={(e: sendobj) => {
            if (e.username) {
              setseconds(0);
            }
            if (e.vfcode) {
              if (e.vfcode.length < 6) {
                chanageInt('失败');
              }
            }
          }}
          onFinish={(e: sendobj) => lofingrom(e)}
        >
          {loginHtml[0].children.map((item: Child, index: number) => {
            return (
              <Form.Item
                name={item.name === '' ? 'test' : item.name}
                // eslint-disable-next-line
                key={index}
                rules={item.rules}
                className={`${item.itemclass}`}
              >
                {listHtml(
                  item.type,
                  item.placeholder,
                  item.lineClass,
                  seconds,
                  vfcodeClass,
                  chanageInt,
                )}
              </Form.Item>
            );
          })}
        </Form>
      </div>
    ) : (
      ''
    );
  }, [type, vfcodeClass, seconds]);
  return (
    <div
      className={style.loginContent}
      style={
        ['忘记密码', '企业用户注册'].indexOf(type) >= 0
          ? { maxHeight: '500px' }
          : {}
      }
    >
      {/* {JSON.stringify(type)}=type */}
      {loginList}
    </div>
  );
};
export default IphoneScreen;
