/**
 * @file 登录页
 */
import { useState } from 'react';
// import { GithubOutlined, ZhihuOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import './index.less';
// import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
// import { apiUserLogin, apiUserLoginByMobile } from './service';
import { setUserInfo } from '@store/module/user';
// eslint-disable-next-line import/no-cycle
// import IconFont from './components/iconfont';
// import loginBg from '@assets/icon/lj/login/login-bg.png';
// import loginSlogan from '@assets/icon/lj/login/login-slogan.svg';
import './login.scss';
import IphoneScreen from './component/LoginPhone';
// interface LoginProps extends RouteComponentProps {
//   setUserInfo: (userInfo: UserState) => void;
// }

function Login() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div>
      <div className='logintext'>企业碳减排账户管理系统</div>
      <Row className='login_content'>
        <Col span={6}>
          <IphoneScreen />
        </Col>
      </Row>
    </div>
  );
}

export default connect(() => ({}), {
  setUserInfo,
})(Login);
