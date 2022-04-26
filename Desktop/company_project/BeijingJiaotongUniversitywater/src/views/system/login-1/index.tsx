/**
 * @file 登录页
 */
import { useEffect, useState } from 'react';
// import { GithubOutlined, ZhihuOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import './index.less';
// import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
// import { apiUserLogin, apiUserLoginByMobile } from './service';
import { useHistory } from 'react-router-dom';
import { setUserInfo } from '../../../store/module/user';
import FormWrap from '../component/FormWrap';
// eslint-disable-next-line import/no-cycle
import LoginItem from '../component/LoginItem';
import { apiMenuList, middle_login } from '../../../api/api';
import { removeToken, setToken } from '../../../utils/cookie';
import VerifyUtils, { Toast } from '@/utils/verifty';
import { filterChaeck } from '@/components/LayoutSideBar/filterCheck';
import { RoleFilter } from '@/components/LayoutSideBar/role';

// interface LoginProps extends RouteComponentProps {
//   setUserInfo: (userInfo: UserState) => void;
// }

interface FormProp {
  account?: string;
  mobile?: string;
  password?: string;
  code?: number;
}

function Login() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState('account');
  const [form] = Form.useForm();
  const history = useHistory();
  // const next = () => {
  //   const params = new URLSearchParams(window.location.search);
  //   const redirectURL = params.get('redirectURL');
  //   if (redirectURL) {
  //     window.location.href = redirectURL;
  //     return;
  //   }
  //   // props.history.push('/');
  // };

  const onSubmit = async () => {
    await form.validateFields().then(res => {
      const values = res as FormProp;
      if (values.account && values.password) {
        middle_login({
          password: values.password,
          username: values.account,
          // eslint-disable-next-line @typescript-eslint/no-shadow
        }).then((res: any) => {
          // @ts-ignore
          if (res.data.code === 200) {
            setToken(res?.data?.token as string);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            apiMenuList().then((es: any) => {
              if (es.data.code === 200) {
                console.log(
                  RoleFilter(es.data.data),
                  filterChaeck(es.data.data),
                  '989989',
                );
                sessionStorage.setItem('updatePsw', res.data.updatePsw);
                if (res.data.updatePsw) {
                  // @ts-ignore
                  sessionStorage.setItem('username', res.data.userId);
                }
                history.push(RoleFilter(es.data.data)[0].path as string);
                // setRoutes(RoleFilter(es.data.data));
                // sessionStorage.setItem('role', JSON.stringify(es.data.data));
                // if (filterChaeck(es.data.data))
                //   setPath(String(filterChaeck(es.data.data)));
                // // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                // // setPath(filterCheck(res.data.data) as string);
                // // console.log(filterCheck(res.data.data), 'sidebar.opened');
              } else VerifyUtils.Toast('info', es.data.msg);
            });
          } else {
            Toast('error', res.data.msg);
          }
        });
        // next();
        // apiUserLogin({
        //   account: values.account,
        //   password: values.password,
        // })
        //   .then(({ data }: { data: UserState }) => {
        // props.setUserInfo({
        //   token: '123',
        //   avatar: 'http://q.net',
        //   account: 'qi',
        //   mobile: '13119911998',
        //   role: 1,
        //   id: 1,
        // });
        // next();
        //   })
        //   .catch(() => {});
      }

      // if (values.mobile && values.code) {
      //   apiUserLoginByMobile({ mobile: values.mobile, code: values.code })
      //     .then(({ data }: { data: UserState }) => {
      //       props.setUserInfo(data);

      //       next();
      //     })
      //     .catch(() => {});
      // }
    });
  };
  useEffect(() => {
    removeToken();
  }, []);
  return (
    <FormWrap className='page-login'>
      {/* <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab='账号密码登录' key='account' />
        <Tabs.TabPane tab='手机号登录' key='mobile' />
      </Tabs> */}

      <Form onFinish={onSubmit} form={form}>
        {activeTab === 'account' ? (
          <>
            <LoginItem.Account form={form} />
            <LoginItem.Password form={form} />
          </>
        ) : (
          <>
            <LoginItem.Mobile form={form} />
            <LoginItem.Code form={form} />
          </>
        )}

        <Form.Item>
          <Button block htmlType='submit' type='primary'>
            登录
          </Button>
        </Form.Item>

        <Form.Item>
          <div className='align--between'>
            {/* <div className='page-login__others'>
              其他登录方式
              <GithubOutlined className='page-login__icon' />
              <ZhihuOutlined className='page-login__icon' />
            </div> */}
            {/* <Link to='/system/register'>注册账号</Link> */}
          </div>
        </Form.Item>
      </Form>
    </FormWrap>
  );
}

export default connect(() => ({}), {
  setUserInfo,
})(Login);
