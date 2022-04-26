import { memo, ReactNode } from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../store/types';
import TransitionMain from '../components/TransitionMain';
import { setSideBarRoutes } from '../store/module/app';

interface AsyncRoutesProps {
  children: ReactNode;
}

// function formatMenuToRoute(menus: Menu[]): Routes[] {
//   const result: Routes[] = [];

//   menus.forEach(menu => {
//     const route: Routes = {
//       path: menu.url,
//       meta: {
//         title: menu.name,
//         icon: menu.icon,
//       },
//     };
//     if (menu.children) {
//       route.children = formatMenuToRoute(menu.children);
//     }
//     result.push(route);
//   });

//   return result;
// }

function AsyncRoutes(props: AsyncRoutesProps) {
  // 通过接口获取有权限的路由
  // if (!props.init) {
  //   apiGetMenuList()
  //     .then(({ data }) => {
  //       props.setSideBarRoutes(formatMenuToRoute(data.list));
  //     })
  //     .catch(() => {});

  //   return <Spin className='layout__loading' />;
  // }

  return <TransitionMain>{props.children}</TransitionMain>;
}

export default connect(({ app }: IStoreState) => ({ init: app.init }), {
  setSideBarRoutes,
})(memo(AsyncRoutes));
