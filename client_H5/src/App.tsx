import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { FIND, UPDATE } from './graphql/demo';

import './App.css';
import { Button, Form, ImageUploader, Input } from 'antd-mobile';
import { useUploadOSS } from './hooks/useUploadOSS';

const App: React.FC = () => {
  const uploadHandler = useUploadOSS();
  const { loading, data } = useQuery(FIND, {
    variables: {
      id: '4fc75020-25bb-4d68-9111-018b0f9426e1',
    },
  });

  const [update] = useMutation(UPDATE);

  const handleClick = (values: any) => {
    console.log(values);
    update({
      variables: {
        id: '73d0dce3-40c9-4ad1-92ad-f5734f1db9ca',
        params: {
          ...values,
          account: 'ooo',
        },
      },
    });
  };

  return (
    <div>
      data: {JSON.stringify(data)}
      <p>loading:{`${loading}`}</p>
      <Form
        layout='horizontal'
        onFinish={handleClick}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }>
        <Form.Item name='name' label='姓名'>
          <Input />
        </Form.Item>
        <Form.Item name='desc' label='描述'>
          <Input />
          {/* <input onChange={onChangeDescHandler} /> */}
        </Form.Item>
        <Form.Item>
          <ImageUploader upload={uploadHandler} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
