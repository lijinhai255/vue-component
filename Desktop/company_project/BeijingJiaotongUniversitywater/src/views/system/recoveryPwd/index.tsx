/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { memo } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Form, Input } from 'antd';
import { RuleObject } from 'antd/lib/form';
import { updatePwd } from '@/views/auth/user/service';
import './index.scss';
import VerifyUtils from '@/utils/verifty';

function RecoveryPwd() {
  const [form] = Form.useForm();
  const history = useHistory();
  const handleCfmPwd = (
    _rules: RuleObject,
    value: any,
    callback: (error?: any) => void,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const loginpass = form.getFieldsValue().password;
    if (loginpass === undefined) {
      callback(new Error('请输入新密码'));
    } else if (loginpass && loginpass !== value) {
      // @ts-ignore
      callback(new Error('两次密码输入不一致'));
    } else {
      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  };
  return (
    <>
      <div className='chanagePassTittle'>修改密码</div>
      <div className='changetitles'>
        为了更安全地使用企业碳减排账户管理系统，请修改登陆密码
      </div>
      <Form
        form={form}
        className='
            changePass'
        labelAlign='left'
        labelCol={{ span: 7, offset: 1 }}
        onFinish={e => {
          console.log(e);
          updatePwd({
            newPassword: e.checkPassowrd as string,
          }).then((res: any) => {
            if (res.data.code === 200) {
              VerifyUtils.Toast('success', '修改成功');
              sessionStorage.setItem('updatePsw', 'false');
              history.push('/');
            }
            if (res.data.code === 500) VerifyUtils.Toast('info', res.data.msg);
          });
        }}
      >
        <Form.Item
          label='新密码'
          name='password'
          rules={[
            {
              validator: (
                _rules: RuleObject,
                value: any,
                callback: (error?: any) => void,
              ) => {
                const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,32}$/;
                const result = re.test(value);
                if (result) {
                  callback();
                } else {
                  callback(
                    new Error(
                      '密码至少包含大写字母，小写字母，数字，且不少于8位',
                    ),
                  );
                }
              },
            },
          ]}
        >
          <Input.Password min={8} max={32} />
        </Form.Item>
        <Form.Item
          label='确认新密码'
          name='checkPassowrd'
          rules={[
            {
              validator: (rules, value, callback) => {
                handleCfmPwd(rules, value, callback);
              },
            },
          ]}
        >
          <Input.Password min={8} max={32} />
        </Form.Item>
        <ul className='footertip'>
          <li>密码需满足以下要求：</li>
          <li>1、同时包含大写字母、小写字母和数字</li>
          <li>2、密码长度为8-32位</li>
          <li>3、不是常见密码</li>
        </ul>
        <Form.Item className='footer_btn'>
          <Button type='primary' className='footer_btn_sub' htmlType='submit'>
            确定
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default memo(RecoveryPwd);
