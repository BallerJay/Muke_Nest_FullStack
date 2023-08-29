import React, { Suspense } from 'react';
import { Spin } from 'antd';

import styles from './index.module.less';

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => (
  <Suspense
    fallback={
      <div className={styles.overlayContent}>
        <Spin size="large" />
      </div>
    }>
    <Comp />
  </Suspense>
);

export default lazyLoad;
