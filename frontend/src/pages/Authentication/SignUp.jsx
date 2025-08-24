import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  Typography,
  Card,
  Space,
  Divider,
} from 'antd';
import { useSignUpMutation } from '../../app/features/authApi';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignUp = () => {
  const [createSignUp, { isLoading }] = useSignUpMutation();
  const [form] = Form.useForm();
const navigate = useNavigate()
  const onFinish = async (values) => {
    const { email, password, password_confirmation, first_name, last_name } = values;
    const body = { email, password, password_confirmation, first_name, last_name };

    try {
     const response = await createSignUp(body).unwrap();
      notification.success({
        message: 'Success',
        description: 'Sign Up successful! You can now sign in.',
        placement: 'bottomLeft',
      });
      form.resetFields();
      navigate('/signin')
      //localStorage.setItem('token', response.token);

    } catch (err) {
      let description = 'Sign-up failed.';
      if (err?.data?.errors) {
        // If errors is an object or array, try to format it nicely
        if (typeof err.data.errors === 'string') {
          description = err.data.errors;
        } else if (typeof err.data.errors === 'object') {
          description = Object.values(err.data.errors)
            .flat()
            .join(' ');
        }
      }
      notification.error({
        message: 'Sign up Failed',
        description,
        placement: 'bottomLeft',
      });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 12,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
        }}
        bordered={false}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: '#1D39C4', fontWeight: 900 }}>
              Create Account
            </Title>
            <Text type="secondary">Sign up to get started with your account</Text>
          </div>

          <Form
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            scrollToFirstError
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' },
              ]}
            >
              <Input placeholder="your.email@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              hasFeedback
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="password_confirmation"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The passwords you entered do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                { required: true, message: 'Please input your first name!' },
                { whitespace: true, message: 'First name cannot be empty!' },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                { required: true, message: 'Please input your last name!' },
                { whitespace: true, message: 'Last name cannot be empty!' },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('You must accept the agreement')),
                },
              ]}
            >
              <Checkbox>
                I have read the <a href="/agreement" target="_blank" rel="noopener noreferrer">agreement</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                style={{ fontWeight: 600, borderRadius: 8 }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>Already have an account?</Divider>

          <div style={{ textAlign: 'center' }}>
            <Button type="link" onClick={()=>{navigate('/signin')}} style={{ color: '#1D39C4', fontWeight: 600 }}>
              Sign In
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default SignUp;
