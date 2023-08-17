import { useState } from 'react';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import { useMutation } from '@apollo/client';

import styles from './index.module.less';
import { LOGIN, SEND_CODE_MSG } from '../../graphql/auth';

type LoginType = 'phone' | 'account';

interface IValue {
  tel: string;
  code: string;
}

const Login: React.FC = () => {
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const [loginType, setLoginType] = useState<LoginType>('phone');

  const handleLogin = async (values: IValue) => {
    const res = await login({
      variables: values,
    });

    if (res.data.login) {
      message.success('登录成功🎉🎉');
      return;
    }

    message.error('登录失败');
  };

  return (
    <div className={styles.container}>
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大的代码托管平台"
        onFinish={handleLogin}>
        <Tabs centered activeKey={loginType} onChange={activeKey => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key="account" tab="账号密码登录" />
          <Tabs.TabPane key="phone" tab="手机号登录" />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className="prefixIcon" />,
              }}
              placeholder="用户名: admin or user"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              placeholder="密码: ant.design"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className="prefixIcon" />,
              }}
              name="tel"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder="请输入验证码"
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              phoneName="tel"
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async (tel: string) => {
                const res = await run({
                  variables: {
                    tel,
                  },
                });
                console.log(res, 'aaa');

                if (res.data.sendCodeMsg) {
                  message.success('获取验证码成功🎉🎉');
                } else {
                  message.error('获取验证码失败');
                }
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}>
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <div
            style={{
              float: 'right',
            }}>
            忘记密码
          </div>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
