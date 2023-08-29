import React from 'react';
import { Navigate } from 'react-router-dom';

import lazyLoad from '@/components/Loadable/index';

export default [
  {
    path: '/',
    element: <Navigate to="/login" />,
    // errorElement: <ErrorPage />,
    // meta: {
    //   title: '首页',
    // },
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
