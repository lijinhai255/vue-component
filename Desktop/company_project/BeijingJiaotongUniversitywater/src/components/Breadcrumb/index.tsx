/* eslint-disable */
import { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { Routes } from '../../router/config';
import './index.less';
import { getBreadcrumbs } from '@/router/utils';

/* eslint-enable */

function Breadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<Routes[]>([]);

  const history = useHistory();

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbs());

    const unListen = history.listen(() => {
      setBreadcrumbs(getBreadcrumbs());
    });

    return () => {
      unListen();
    };
  }, []);
  return (
    <div className='breadcrumb-container'>
      <Breadcrumb style={{ cursor: 'pointer' }}>
        {breadcrumbs.map((route: Routes, index) => (
          <Breadcrumb.Item
            key={route.path}
            onClick={() => {
              if (index > 0) {
                history.push(route.path);
              }
            }}
          >
            {route.meta.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default memo(Breadcrumbs);
