/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { memo } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Form, Input } from 'antd';
import { RuleObject } from 'antd/lib/form';
import { apiAccountPwd } from '@/views/system/service';
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
    <div>
      <div
        style={{
          background: '#005BAC',
          color: '#fff',
          fontSize: '20px',
          padding: '24px',
        }}
      >
        水务系统碳中和智能化管理平台
      </div>
      <div className='chanagePassTittle'>修改密码</div>
      <div className='changetitles'>
        为了更安全地使用碳中和智能化管理平台，请修改登陆密码
      </div>
      <Form
        form={form}
        className='changePass'
        labelAlign='left'
        colon={false}
        labelCol={{ span: 7, offset: 1 }}
        onFinish={async e => {
          console.log(e);
          const res = await apiAccountPwd({
            confirm_password: e.checkPassowrd,
            new_password: e.password,
            old_password: 'carbon123456',
          });
          if (res.data.code === 200) {
            VerifyUtils.Toast('success', '修改成功');
            sessionStorage.setItem('updatePsw', 'false');
            history.push('/');
          } else {
            VerifyUtils.Toast('info', res.data.msg);
          }
        }}
      >
        <div className='label'>新密码</div>
        <Form.Item
          label=''
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
          <Input.Password min={8} placeholder='请输入' max={32} />
        </Form.Item>
        <div className='label'>确认新密码</div>
        <Form.Item
          label=''
          name='checkPassowrd'
          rules={[
            {
              validator: (rules, value, callback) => {
                handleCfmPwd(rules, value, callback);
              },
            },
          ]}
        >
          <Input.Password min={8} max={32} placeholder='请输入' />
        </Form.Item>
        <Form.Item className='footer_btn'>
          <Button type='primary' className='footer_btn_sub' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
        <ul
          className='footertip'
          style={{ background: '#F7F8F9', padding: '12px' }}
        >
          <li>密码需满足以下要求：</li>
          <li>1、同时包含大写字母、小写字母和数字</li>
          <li>2、密码长度为8-32位</li>
          <li>3、不是常见密码</li>
        </ul>
      </Form>
    </div>
  );
}

export default memo(RecoveryPwd);
