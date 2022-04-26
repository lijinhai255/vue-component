import { Suspense, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import { getPageTitle, systemRouteList } from '../router/utils';
import { Routes } from '../router/config';
import './UserLayout.less';

const UserLayout = () => {
  const [isError] = useState(false);
  const history = useHistory();
  if (isError) {
    return (
      <Result
        status='warning'
        title='系统错误，请联系管理员'
        extra={
          <Button type='primary' key='console'>
            Go Contact
          </Button>
        }
      />
    );
  }

  const title = getPageTitle(systemRouteList);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={title} />
      </Helmet>

      <div
        className={
          history.location.pathname === '/system/register' ||
          history.location.pathname === '/system/result'
            ? 'container container_bg'
            : 'container'
        }
      >
        <div className='content'>
          <div className='top'>
            {/* <Typography.Title className='header'>
              <Link to='/'>
                <span className='title'>企业碳减排账户管理系统</span>
              </Link>
            </Typography.Title> */}
            {/* <div className='desc'>让所有产品都有碳足迹</div> */}
          </div>
          <Suspense fallback={<Spin className='layout__loading' />}>
            <Switch>
              {systemRouteList.map((menu: Routes) => (
                <Route
                  exact
                  key={menu.path}
                  path={menu.path}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  component={menu.component}
                />
              ))}
            </Switch>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
