import { Footer } from '@/components';
import { GITHUB_URL, LOGIN_BG, SYSTEM_LOGO } from '@/constants';
import { login } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Helmet, Link, history, useModel } from '@umijs/max';
import { Divider, Space, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(() => {
  return {
    logo: {
      verticalAlign: '-webkit-baseline-middle',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: "url('" + LOGIN_BG + "')",
      backgroundSize: '100% 100%',
    },
  };
});
const Login: React.FC = () => {
  const [, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({
        ...values,
        type,
      });
      if (user) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(user);
      // 如果失败去设置用户错误信息
      setUserLoginState(user);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img className={styles.logo} alt="logo" src={SYSTEM_LOGO} />}
          title="凌云用户中心系统"
          subTitle={'企业核心的用户中心系统，基于 Spring Boot + React 开发的全栈项目'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号密码登录',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入登录账号'}
                rules={[
                  {
                    required: true,
                    message: '登录账号是必填项！',
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: '账号长度不小于 4 位！',
                  },
                  {
                    max: 16,
                    type: 'string',
                    message: '账号长度不大于 16 位！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入登录密码'}
                rules={[
                  {
                    required: true,
                    message: '登录密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '登录密码长度不小于 8 位！',
                  },
                  {
                    max: 16,
                    type: 'string',
                    message: '登录密码长度不大于 16 位!',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type="vertical" />}>
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <Link to="/user/register">没账号，去注册</Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  float: 'right',
                }}
              >
                忘记密码 ?
              </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
