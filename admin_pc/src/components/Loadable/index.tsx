import React, { Suspense } from 'react';

import styles from './index.module.less';

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => (
  <Suspense fallback={<div className={styles.overlayContent}>正在加载中</div>}>
    <Comp />
  </Suspense>
);

export default lazyLoad;
