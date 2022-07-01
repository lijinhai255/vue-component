import { Button, Form, Input } from 'antd';
import React from 'react';
import style from './login.module.scss';

export interface LoginListIndex {
  list: List[];
  ruleList: RuleList;
}

export interface List {
  label: string;
  className: string;
  lineClass: string;
  children: Child[];
}

export interface Child {
  type: string;
  name: string;
  placeholder: string;
  lineClass: string;
  itemclass: string;
  rules: any[];
}

export interface RuleList {
  username: Password[];
  vfcode: Vfcode[];
  password: Password[];
  replacepassword: Password[];
}

export interface Password {
  required?: boolean;
  message: string;
  pattern?: unknown;
}

export interface Vfcode {
  required?: boolean;
  message: string;
  min?: number;
}
export interface sendobj {
  username: string;
  password: string;
  vfcode: string;
  test?: string;
}

export interface Indexlogin {
  code: number;
  data: Data;
  msg: string;
}

export interface Data {
  accessToken: string;
  expiresIn: number;
  hasPassword: string;
  orgId: number;
  orgName: string;
  orgStatus: string;
  orgType: string;
  orgUpdateTime: string;
  username: string;
}

const passreg = /^[0-9A-Za-z]{8,20}$/;
const ruleList: LoginListIndex['ruleList'] = {
  username: [
    { required: true, message: '请输入手机号' },
    // {
    //   pattern:
    //     /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    //   message: '手机号错误',
    // },
  ],
  vfcode: [
    { required: true, message: '请输入验证码' },
    // @ts-ignore
    () => ({
      // @ts-ignore
      validator(_, value) {
        if (value) {
          if (value.length === 6) {
            return Promise.resolve();
          }
        }
        return Promise.reject(new Error('格式不正确!'));
      },
    }),
  ],
  password: [
    // @ts-ignore
    () => ({
      // @ts-ignore
      validator(_, value) {
        if (passreg.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('用户名或密码错误'));
      },
    }),
  ],
  replacepassword: [
    {
      required: true,
      message: '请确认登录密码!',
    },
    {
      pattern: /^[a-zA-Z0-9_]*$/,
      message: '密码格式不正确',
    },
    // @ts-ignore
    ({ getFieldValue }) => ({
      // @ts-ignore
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('与登录密码不一致!'));
      },
    }),
  ],
};

export const list: LoginListIndex['list'] = [
  {
    label: '忘记密码',
    className: `${style.codetitle} ${style.findcode}`,
    lineClass: `${style.codeLine}`,
    children: [
      {
        type: 'input',
        name: 'username',
        placeholder: '手机号',
        itemclass: `${style.codeLine}`,
        lineClass: `${style.codeItem}`,
        rules: ruleList.username,
      },
      {
        type: 'code',
        name: 'vfcode',
        placeholder: '短信验证码',
        itemclass: `${style.codeLine}`,
        lineClass: `${style.codelist}`,
        rules: ruleList.vfcode,
      },
      {
        type: 'password',
        name: 'password',
        placeholder: '新密码(8-20位字母和数字)',
        itemclass: `${style.codeLine}`,
        lineClass: `${style.codeItem}`,
        rules: ruleList.password,
      },
      {
        type: 'password',
        name: 'replacepassword',
        itemclass: `${style.codeLine}`,
        placeholder: '重复新密码',
        lineClass: `${style.codeItem}`,
        rules: ruleList.replacepassword,
      },
      {
        type: 'sendbtn',
        name: '',
        itemclass: `${style.codeLine}`,
        placeholder: '确认修改',
        lineClass: `${style.codeItem}`,
        rules: [],
      },
      {
        type: 'aleadylogin',
        name: '',
        placeholder: '确认修改',
        itemclass: `${style.codeLineitem}`,
        lineClass: `${style.codeItem}`,
        rules: [],
      },
    ],
  },
  {
    label: '企业用户注册',
    className: `${style.codetitle} ${style.findcode}`,
    lineClass: `${style.codeLine}`,
    children: [
      {
        type: 'input',
        name: 'username',
        placeholder: '手机号',
        itemclass: `${style.codeLine}`,
        lineClass: `${style.codeItem}`,
        rules: ruleList.username,
      },
      {
        type: 'code',
        name: 'vfcode',
        placeholder: '短信验证码',
        itemclass: `${style.codeLine}`,
        lineClass: `${style.codelist}`,
        rules: ruleList.vfcode,
      },
      {
        type: 'password',
        name: 'password',
        placeholder: '设置密码(8-20位字母和数字)',
        itemclass: `${style.codeLine}`,
        lineClass: `${style.codeItem}`,
        rules: ruleList.password,
      },
      {
        type: 'password',
        name: 'replacepassword',
        itemclass: `${style.codeLine}`,
        placeholder: '重复新密码',
        lineClass: `${style.codeItem}`,
        rules: ruleList.replacepassword,
      },
      {
        type: 'sendbtn',
        name: '',
        itemclass: `${style.codeLine}`,
        placeholder: '快速注册',
        lineClass: `${style.codeItem}`,
        rules: [],
      },
      {
        type: 'aleadylogin',
        name: '',
        placeholder: '确认修改',
        itemclass: `${style.codeLineitem}`,
        lineClass: `${style.codeItem}`,
        rules: [],
      },
    ],
  },
  {
    label: '验证码登录',
    className: `${style.codetitle} ${style.findcode}`,
    lineClass: `${style.codeLine}`,
    children: [
      {
        type: 'input',
        name: 'username',
        placeholder: '手机号',
        itemclass: `${style.codeLine74}`,
        lineClass: `${style.codeItem}`,
        rules: ruleList.username,
      },
      {
        type: 'code',
        name: 'vfcode',
        placeholder: '短信验证码',
        itemclass: `${style.codelogin}`,
        lineClass: `${style.codeItem}`,
        rules: ruleList.vfcode,
      },
      {
        type: 'forgetpasstext',
        name: '',
        itemclass: `${style.codeforget}`,
        placeholder: '登录',
        lineClass: `${style.codeItem}`,
        rules: [],
      },
      {
        type: 'sendbtn',
        name: '',
        itemclass: `${style.codelogin}`,
        placeholder: '登录',
        lineClass: `${style.codeItem}`,
        rules: [],
      },
      {
        type: 'signlogins',
        name: '',
        placeholder: '确认修改',
        itemclass: `${style.codeLineitemlogin}`,
        lineClass: `${style.codeItem}`,
        rules: [],
      },
    ],
  },
  {
    label: '密码登录',
    className: `${style.codetitle} ${style.findcode}`,
    lineClass: `${style.codeLine}`,
    children: [
      {
        type: 'input',
        name: 'username',
        placeholder: '用户名',
        itemclass: `${style.codeLine74}`,
        lineClass: `${style.codeItem}`,
        rules: ruleList.username,
      },
      {
        type: 'password',
        name: 'password',
        placeholder: '请输入登录密码',
        itemclass: `${style.codelogin}`,
        lineClass: `${style.codeItem}`,
        rules: ruleList.password,
      },
      // {
      //   type: 'forgetpass',
      //   name: '',
      //   itemclass: `${style.codeforget}`,
      //   placeholder: '登录',
      //   lineClass: `${style.codeItem}`,
      //   rules: [],
      // },
      {
        type: 'sendbtn',
        name: '',
        itemclass: `${style.codelogin}`,
        placeholder: '登录',
        lineClass: `${style.codeItem}`,
        rules: [],
      },
      // {
      //   type: 'signlogins',
      //   name: '',
      //   placeholder: '确认修改',
      //   itemclass: `${style.codeLineitemlogin}`,
      //   lineClass: `${style.codeItem}`,
      //   rules: [],
      // },
    ],
  },
];
export const listHtml = (
  type: string,
  placeholder: string,
  lineClass: string,
  seconds: number,
  vfcodeClass: string,
  chanageInt: (e: string) => void,
) => {
  switch (type) {
    case 'input':
      return (
        <Input placeholder={placeholder} className={lineClass} maxLength={11} />
      );
    case 'password':
      return (
        <Input.Password
          placeholder={placeholder}
          className={lineClass}
          maxLength={20}
        />
      );
    case 'code':
      return (
        <span>
          <span className={vfcodeClass}>
            <Input
              className={style.linecodeClass}
              placeholder={placeholder}
              maxLength={6}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                chanageInt(
                  e.currentTarget.value.length === 0 ? '失败' : '校验',
                );
              }}
            />
            <span className={style.line} />
            <Form.Item name='vfcode' noStyle>
              <Button
                type='link'
                disabled={seconds !== 0}
                className={seconds === 0 ? style.sendcode : style.alsendcode}
                onClick={() => chanageInt('获取验证码')}
              >
                {seconds === 0 ? '获取验证码' : `已发送(${seconds}s)`}
              </Button>
            </Form.Item>
          </span>
          <span className={style.codetip}>
            {seconds === 0 ? '' : ' 验证码已发送，15分钟内输入有效码'}
          </span>
        </span>
      );
    case 'sendbtn':
      return (
        <Button type='primary' htmlType='submit' className={style.subbtns}>
          {placeholder}
        </Button>
      );
    case 'sendpassbtn':
      return (
        <Button type='primary' htmlType='submit' className={style.sendpassbtn}>
          {placeholder}
        </Button>
      );
    case 'sendbtnlogin':
      return (
        <Button type='primary' htmlType='submit' className={style.subbtns30}>
          {placeholder}
        </Button>
      );
    case 'aleadylogin':
      return (
        <span className={style.logintext}>
          已有账号？<span onClick={() => chanageInt('密码登录')}>去登录</span>
        </span>
      );
    case 'forgetpass':
      return (
        <span
          className={style.loginforgreen}
          onClick={() => chanageInt('忘记密码')}
        >
          忘记密码
        </span>
      );
    case 'forgetpasstext':
      return <span className={style.loginforgreen} />;
    case 'signlogin':
      return (
        <span
          className={style.logintextgreen}
          onClick={() => chanageInt('企业用户注册')}
        >
          企业用户注册
        </span>
      );
    case 'signlogins':
      return (
        <span
          className={style.logintextgreenforget}
          onClick={() => chanageInt('企业用户注册')}
        >
          企业用户注册
        </span>
      );
    default:
      return <Input placeholder={placeholder} className={lineClass} />;
  }
};
