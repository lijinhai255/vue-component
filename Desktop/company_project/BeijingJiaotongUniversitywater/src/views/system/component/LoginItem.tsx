import { FC, memo } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { InputProps } from 'antd/lib/input';
import { FormItemProps, FormInstance } from 'antd/lib/form';
import FormInputItem from './FormItem';
import { apiGetVerifyCode } from '../login-1/service';

export interface LoginItemType {
  Account: FC<LoginItemProps>;
  Password: FC<LoginItemProps>;
  Confirm: FC<LoginItemProps>;
  Mobile: FC<LoginItemProps>;
  Code: FC<LoginItemProps>;
}

interface LoginItemConfig {
  name: string;
  rules: any[];
  inputProps: InputProps & { visibilityToggle?: boolean };
}

/* eslint-disable */
interface LoginItemProps {
  countStatic?: number;
  onGetMobileCode?: (cb: () => void) => void;
  form: FormInstance;
}
/* eslint-enable */

const config: { [key in keyof LoginItemType]: LoginItemConfig } = {
  Account: {
    name: 'account',
    inputProps: {
      prefix: <UserOutlined />,
      placeholder: '请输入账号',
      type: 'text',
    },
    rules: [{ required: true, message: '请输入合法账号', min: 0, max: 50 }],
  },
  Mobile: {
    name: 'mobile',
    inputProps: {
      prefix: <UserOutlined />,
      placeholder: '11位合法手机号',
      type: 'mobile',
    },
    rules: [{ required: true, message: '请输入合法手机号', len: 11 }],
  },
  Password: {
    name: 'password',
    inputProps: {
      prefix: <LockOutlined />,
      placeholder: '请输入密码',
      type: 'password',
      visibilityToggle: true,
    },
    rules: [{ required: true, message: ' ' }],
  },
  Confirm: {
    name: 'repassword',
    inputProps: {
      id: 'confirm',
      prefix: <LockOutlined />,
      placeholder: '确认密码',
      type: 'password',
      visibilityToggle: true,
    },
    rules: [],
  },

  Code: {
    name: 'code',
    inputProps: {
      placeholder: '请输入密码',
      prefix: <LockOutlined />,
      type: 'code',
    },
    rules: [{ required: true, message: '请输入验证码', len: 6 }],
  },
};

const formProps: FormItemProps = {
  hasFeedback: true,
  children: null,
};

function Account(props: LoginItemProps) {
  const otherProp = { ...config.Account, ...props };
  return <FormInputItem formProps={formProps} {...otherProp} />;
}

function Password(props: LoginItemProps) {
  return (
    <FormInputItem formProps={formProps} {...config.Password} {...props} />
  );
}

function Confirm(props: LoginItemProps) {
  return (
    <FormInputItem
      formProps={formProps}
      {...config.Confirm}
      {...props}
      rules={[
        { required: true, message: '请输入合法密码' },
        {
          validator: (
            rules: any,
            value: string,
            callback: (message?: string) => void,
          ) => {
            if (value && value !== props.form.getFieldValue('password')) {
              callback('两次输入的密码不一致，请重新输入');
            }

            callback();
          },
        },
      ]}
    />
  );
}

function Mobile(props: LoginItemProps) {
  return <FormInputItem formProps={formProps} {...config.Mobile} {...props} />;
}

function Code(props: LoginItemProps) {
  // 在测试环境下，接口会直接跑错，显示验证码,所以需要在catch的情况下 也回调
  const onGetMobileCode = async (cb: () => void) => {
    await props.form.validateFields(['mobile']).then(res => {
      apiGetVerifyCode({ mobile: res.mobile as unknown as string }).finally(
        () => {
          cb();
        },
      );
    });
  };

  return (
    <FormInputItem
      formProps={{ children: null }}
      {...config.Code}
      {...props}
      onGetMobileCode={onGetMobileCode}
    />
  );
}
const LoginItem: LoginItemType = {
  Account: memo(Account),
  Password: memo(Password),
  Confirm: memo(Confirm),
  Mobile: memo(Mobile),
  Code: memo(Code),
};
export default LoginItem;
