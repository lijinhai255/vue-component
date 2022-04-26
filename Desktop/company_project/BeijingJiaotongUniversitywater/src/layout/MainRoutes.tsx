import { useMemo, memo, ReactNode } from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { Routes } from '../router/config';
import Auth from './Auth';
import { businessRouteList } from '../router/utils';
import AsyncRoutes from './AsyncRoutes';

function renderRoute(route: Routes) {
  // const title = getPageTitle(businessRouteList);

  const { component: Component } = route;

  return (
    <Route
      key={route.path}
      exact={route.path !== '*'}
      path={route.path}
      render={props => (
        <Auth {...props} route={route}>
          <Helmet>
            {/* <title>{title}</title>
            <meta name='description' content={title} /> */}
          </Helmet>
          {/* @ts-ignore */}
          <Component {...props} />
        </Auth>
      )}
    />
  );
}

function renderRouteList(): ReactNode[] {
  const result: ReactNode[] = [];

  businessRouteList.forEach((child: Routes) => {
    result.push(renderRoute(child));
  });

  return result;
}

function MainRoutes() {
  const routeList = useMemo(() => renderRouteList(), []);

  return <AsyncRoutes>{routeList}</AsyncRoutes>;
}

export default memo(MainRoutes);
