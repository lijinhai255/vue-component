/**
  @file app
 */
import { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { layoutRouteList } from './router/utils';
import { Routes } from './router/config';
import config from './config';
import 'moment/locale/zh-cn';
import './styles/public.scss';
import './styles/index.less';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
function App() {
  return (
    <Suspense fallback={<Spin size='large' className='layout__loading' />}>
      <Router basename={config.BASENAME}>
        <ConfigProvider locale={zh_CN}>
          <Switch>
            {layoutRouteList.map((route: Routes) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </ConfigProvider>
      </Router>
    </Suspense>
  );
}

export default App;
