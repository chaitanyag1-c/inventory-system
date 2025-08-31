import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Card, Flex, notification } from 'antd';
import { useSignInMutation } from '../../app/features/authApi';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignIn = () => {
  const [SignIn, { isLoading,isError }] = useSignInMutation();
const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      const result = await SignIn(values).unwrap();
      // Handle success: store token, redirect, etc.
     localStorage.setItem('token', result.token);
     localStorage.setItem('user', JSON.stringify(result.user));
      notification.success({
        message: 'Success',
        description: 'Sign in successful!',
        placement: 'bottomLeft',
      });
      navigate('/')
    } catch (err) {
  let description = 'Sign-in failed.';
  console.log(err)
  if (err?.data?.error) {
    description = err.data.error; // This will be "Invalid email or password"
  }
  notification.error({
    message: 'Sign In Failed',
    description,
    placement: 'bottomLeft'
  });
}

  };

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #fff 100%)'
      }}
    >
      <Card
        style={{
          minWidth: 350,
          maxWidth: 370,
          boxShadow: '0 6px 32px 0 rgba(24, 144, 255, 0.12)',
          borderRadius: 12,
          padding: '32px 24px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 0, fontWeight: 900, color: '#1677ff' }}>
            Sign In
          </Title>
          <Text type="secondary">Welcome back! Please sign in to your account</Text>
        </div>
        <Form
          layout="vertical"
          name="login"
          initialValues={{ remember: true }}
          style={{ width: '100%' }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'The input is not valid E-mail!' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{
                fontWeight: 600,
                borderRadius: 8
              }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text>
            Don't have an account?{' '}
            <a style={{ color: '#1677ff', fontWeight: 500 }} onClick={()=>{navigate('/signup')}}>
              Register now!
            </a>
          </Text>
        </div>
      </Card>
    </Flex>
  );
};

export default SignIn;
