import React from 'react';
import { Button, Result } from 'antd';

const Page404: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="您访问的页面不存在"
    extra={
      <Button type="primary" href="/">
        Back Home
      </Button>
    }
  />
);

export default Page404;
