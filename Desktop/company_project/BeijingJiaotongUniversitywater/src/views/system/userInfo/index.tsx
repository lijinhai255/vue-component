/**
 * @file 账户信息页
 */
import { FC, memo, useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Modal, Row, Col, Tooltip } from 'antd';
import './index.scss';
import { RuleObject } from 'antd/lib/form';
import { apiAccountDetail, apiAccountPwd } from '../service';
import VerifyUtils from '@/utils/verifty';
// interface userInfoParams {
//   id: string;
// }

const UserInfo: FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [detailList, setDetailList] = useState<any>([]);
  useEffect(() => {
    console.log(form, 'form');
    apiAccountDetail({}).then((res: any) => {
      if (res.data.code === 200) {
        setDetailList(res.data.data.role);
        console.log(res, 'res');
        form.setFieldsValue({ ...res.data.data });
      }
    });
  }, []);
  const onClose = () => {
    setVisible(!visible);
  };
  const onOk = async () => {
    // console.log(form.getFieldsValue(), 'form.getFieldsValue()');
    const { oldPassword, password, checkPassowrd } = form.getFieldsValue();
    const params = {
      confirm_password: checkPassowrd,
      new_password: password,
      old_password: oldPassword,
    };
    const res = await apiAccountPwd(params);
    // console.log(res, 'res');
    if (res.data.code === 200) {
      VerifyUtils.Toast('success', '修改成功');
      setVisible(!visible);
    } else {
      VerifyUtils.Toast('error', res.data.msg);
    }
  };
  const handleCfmPwd = (
    _rules: RuleObject,
    value: any,
    callback: (error?: any) => void,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    <div className='wrapper'>
      <div className='chanagePassTittle'>账号信息</div>
      <Form name='account' form={form} className='changePass' colon={false}>
        <div className='label'>
          <span>账号</span>
          <span onClick={() => setVisible(true)}>修改密码</span>
        </div>
        <Form.Item name='username'>
          <Input disabled placeholder='请输入' />
        </Form.Item>
        <div className='label'>姓名</div>
        <Form.Item name='nick_name'>
          <Input disabled placeholder='请输入' />
        </Form.Item>
        <div className='label'>所属公司</div>
        <Form.Item name='organization_name'>
          <Input disabled placeholder='请输入' />
        </Form.Item>
        <div className='label'>联系电话</div>
        <Form.Item name='phone'>
          <Input disabled placeholder='请输入' />
        </Form.Item>
        <div className='label'>账户角色</div>
        <Form.Item name='role'>
          <Row>
            {detailList?.map((it: any) => {
              return (
                <Col span={8}>
                  <Checkbox
                    className='checkbox_label'
                    value={it.id}
                    checked
                    disabled
                  >
                    {it.name}
                  </Checkbox>
                </Col>
              );
            })}
          </Row>
        </Form.Item>
      </Form>
      <Modal
        maskClosable
        visible={visible}
        title='修改密码'
        width='380px'
        onCancel={onClose}
        onOk={onOk}
        className='userinfo_modal'
      >
        <Form name='editPwd' form={form} layout='vertical'>
          {/* <div className='label'>
            <span className='star'>*</span>旧密码
          </div> */}
          <Form.Item label='旧密码' name='oldPassword' required>
            <Input min={8} max={32} placeholder='请输入' />
          </Form.Item>
          {/* <div className='label'>
            <span className='star'>*</span>新密码
          </div> */}
          <Form.Item
            label='新密码'
            name='password'
            required
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
                    callback(new Error('密码格式不正确'));
                  }
                },
              },
            ]}
          >
            <Input
              min={8}
              max={32}
              placeholder='请输入'
              suffix={
                <Tooltip title='密码为字母和数字的组合 长度为8-32位 不是常见密码'>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
          </Form.Item>
          {/* <div className='label'>
            <span className='star'>*</span>确认密码
          </div> */}
          <Form.Item
            label='确认密码'
            name='checkPassowrd'
            required
            rules={[
              {
                validator: (rules, value, callback) => {
                  handleCfmPwd(rules, value, callback);
                },
              },
            ]}
          >
            <Input min={8} max={32} placeholder='请输入' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(UserInfo);
