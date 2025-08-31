import React, { useState,useEffect } from 'react';
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

import { useNavigate } from 'react-router-dom';
import { useUserDetailsQuery,useUpdateUserMutation } from '../../app/features/authApi';
const { Title, Text } = Typography;

const ShowUser = () => {

const [form] = Form.useForm();  
const { data: userDetailObj, error, isLoading,refetch  } = useUserDetailsQuery(undefined, {
refetchOnMountOrArgChange: true,
});

const [updateUser, { isLoading: isUpdating, isSuccess, isError: isUpdateError }] = useUpdateUserMutation();

const navigate = useNavigate()


useEffect(() => {
if (userDetailObj) {
    const { name, email, first_name, last_name, created_at } = userDetailObj;
    form.setFieldsValue({
    name,
    email,
    first_name,
    last_name
    });
}
}, [userDetailObj, form]);
if (isLoading) return <div>Loading...</div>;
if (error) return <div>⚠️ Error loading User</div>;
  const onFinish = async (values) => {
    console.log(values)
    try
    {
        const response = await updateUser(values).unwrap()
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log(response) 
        await refetch();
    }
    catch{
        console.log("Error in updating")
    }
  }

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
              View Account
            </Title>
          </div>
            <h2>Welcome {userDetailObj?  userDetailObj.name : ''} </h2>    

            <div>Created at : {userDetailObj.created_at} </div>   
            <div>Last Updated at : {userDetailObj.updated_at} </div>   
   <Form
            form={form}
            name="register"
            layout="vertical"
            scrollToFirstError
            onFinish={onFinish}
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
            
               <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                
                block
                style={{ fontWeight: 600, borderRadius: 8 }}
              >
                Update
              </Button>
            </Form.Item>
          </Form>

        </Space>
      </Card>
    </div>
  );
};

export default ShowUser;
