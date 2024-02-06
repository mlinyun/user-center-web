import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import { FieldNumberOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { TabsProps } from 'antd';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, Link } from 'umi';
import styles from './index.less';
import { SYSTEM_LOGO } from '@/constants';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: API.RegisterParams) => {
    // 获取表单项填写的值
    const { userPassword, checkPassword } = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    try {
      // 注册
      const id = await register({
        ...values,
        type,
      });
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      } else {
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const items: TabsProps['items'] = [{ key: 'account', label: '账号密码注册' }];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img className={styles.logo} alt="logo" src={SYSTEM_LOGO} />}
          title="凌云用户中心系统"
          subTitle={'企业核心的用户中心系统，基于 Spring Boot + React 开发的全栈系统'}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType} items={items} />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
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
                  prefix: <FieldNumberOutlined className={styles.prefixIcon} />,
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
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不小于 8 位！',
                  },
                  {
                    max: 16,
                    type: 'string',
                    message: '密码长度不大于 16 位！'
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不小于 8 位！',
                  },
                  {
                    max: 16,
                    type: 'string',
                    message: '密码长度不大于 16 位！'
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
