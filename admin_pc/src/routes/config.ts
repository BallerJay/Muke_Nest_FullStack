import React from 'react';

import lazyLoad from '@/components/Loadable/index';

export default [
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('@/pages/Home'))),
  },
  {
    path: '/login',
    element: lazyLoad(React.lazy(() => import('@/pages/Login'))),
  },
  {
    path: '*',
    element: lazyLoad(React.lazy(() => import('@/pages/404'))),
  },
];
