import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'antd/es/form/Form';
import { modify_password } from '@/api/api';
import VerifyUtils from '@/utils/verifty';

interface Props {
  visable: boolean | undefined;
  handelcancel: () => void;
}
function ChangeSteganogram(Props: Props) {
  const { visable, handelcancel } = Props;
  const [form] = useForm();
  const [confirmLoading, setconfirmLoading] = useState(false);
  const formList = [
    {
      label: '旧密码',
      show: sessionStorage.getItem('userinfo')
        ? JSON.parse(sessionStorage.getItem('userinfo') as string)
            .hasPassword === 1
          ? true
          : false
        : false,
      name: 'oldPassword',
      rules: [{ required: true, message: '请输入旧密码' }],
      item: <Input minLength={8} placeholder='请输入' maxLength={20} />,
    },
    {
      label: '新密码',
      show: true,
      name: 'newPassword',
      rules: [
        {
          required: true,
          pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
          message: '密码应为8-20位字母和数字的组合',
        },
      ],
      item: (
        <Input.Password minLength={8} placeholder='请输入' maxLength={20} />
      ),
    },
    {
      label: '重复新密码',
      show: true,
      name: 'newPasswords',
      rules: [
        {
          required: true,
          message: ' ',
        },
        () => ({
          validator(rule: any, value: any) {
            if (value === '' || value === null || value === undefined) {
              return Promise.reject('请输入新密码');
            } else if (!value || form.getFieldValue('newPassword') === value) {
              return Promise.resolve();
            }
            return Promise.reject('两次密码输入不一致');
          },
        }),
      ],
      item: (
        <Input.Password minLength={8} placeholder='请输入' maxLength={20} />
      ),
    },
  ];
  const handleCancel = () => {
    setconfirmLoading(false);
    form.resetFields();
    handelcancel();
  };
  const handleOk = () => {};
  useEffect(() => {}, []);
  return (
    <Modal
      className='chanageForm'
      title='修改密码'
      visible={visable}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        onFinish={e => {
          console.log(e);
          const subForm = e;
          delete subForm.newPasswords;
          modify_password(subForm).then((res: any) => {
            console.log(res);
            if (res.data.code === 500) VerifyUtils.Toast('info', res.data.msg);
            else {
              VerifyUtils.Toast('success', '修改成功');
              setTimeout(() => {
                handleCancel();
              }, 0);
            }
          });
          console.log(subForm);
        }}
      >
        {formList.map((item: any, index: number) => {
          return item.show ? (
            <Form.Item
              name={item.name}
              rules={item.rules}
              label={item.label}
              key={index}
            >
              {item.item}
            </Form.Item>
          ) : (
            ''
          );
        })}
        <Form.Item className='submitBtns'>
          <Button className='btn cancel' onClick={handleCancel}>
            取消
          </Button>
          <Button className='btn' type='primary' htmlType='submit'>
            确认
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ChangeSteganogram;
