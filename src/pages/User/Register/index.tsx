import { Footer } from '@/components';
import { LOGIN_BG, SYSTEM_LOGO } from '@/constants';
import { register } from '@/services/ant-design-pro/api';
import {FieldNumberOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, Link, history } from '@umijs/max';
import { Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
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

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();

  const handleSubmit = async (values: API.RegisterParams) => {
    // 获取表单项填写的值
    const { userPassword, checkPassword } = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致！');
      return;
    }
    try {
      // 注册
      const userId = await register({
        ...values,
        type,
      });
      if (userId > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        if (!history) {
          return;
        }
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/user/login');
        return;
      } else {
        throw new Error(`register error id = ${userId}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
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
                label: '账号密码注册',
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
                placeholder={'请输入注册账号'}
                rules={[
                  {
                    required: true,
                    message: '注册账号是必填项！',
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
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <FieldNumberOutlined />,
                }}
                placeholder={'请输入星球编号'}
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                  {
                    max: 5,
                    type: 'string',
                    message: '星球编号长度不大于 5 位！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请设置账号密码'}
                rules={[
                  {
                    required: true,
                    message: '账号密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '账号密码长度不小于 8 位！',
                  },
                  {
                    max: 16,
                    type: 'string',
                    message: '账号密码长度不大于 16 位！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请确认账号密码'}
                rules={[
                  {
                    required: true,
                    message: '账号密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '账号密码长度不小于 8 位！',
                  },
                  {
                    max: 16,
                    type: 'string',
                    message: '账号密码长度不大于 16 位！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
              paddingRight: 8,
              float: 'right',
            }}
          >
            <Link to="/user/login">老用户？返回登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
