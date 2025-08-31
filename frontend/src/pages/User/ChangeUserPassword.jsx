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
  Alert,
} from 'antd';

import { useNavigate } from 'react-router-dom';
import { useUserDetailsQuery,useUpdateUserPasswordMutation } from '../../app/features/authApi';
const { Title, Text } = Typography;

const ChangeUserPassword = () => {
  const [capsLockOn, setCapsLockOn] = useState(false);

  
const [form] = Form.useForm();  
const { data: userDetailObj, error, isLoading,refetch  } = useUserDetailsQuery(undefined, {
refetchOnMountOrArgChange: true,
});
const [updateUserPassword,{isLoading: isUpdateLoading,isError,isSuccess} ] = useUpdateUserPasswordMutation()

const navigate = useNavigate()




useEffect(() => {
if (userDetailObj) {
    const {  email } = userDetailObj;
    form.setFieldsValue({
    email,
    });
}
}, [userDetailObj, form]);
if (isLoading) return <div>Loading...</div>;
if (error) return <div>⚠️ Error loading User</div>;
 const handleKeyPress = (event) => {
    const isCapsLock = event.getModifierState && event.getModifierState('CapsLock');
    setCapsLockOn(isCapsLock);
  };
const onFinish = async (values) => {
    console.log(values)
  try{
    const response = await updateUserPassword(values).unwrap()
    notification.success({
      message: `Password changed successfully Mubarak ho Please Login Again`,
      placement: 'bottomLeft'
    })
    console.log(response)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }
  catch(err){
    console.log(err?.data?.errors[0])
    
      let  description = err.data.errors[0]; 
      
      notification.error({
        message: 'Failed',
        description,
        placement: 'bottomLeft'
      });
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
              <Input placeholder="your.email@example.com" disabled />
            </Form.Item>

              <Form.Item
                         label="Current Password"
                         name="current_password"
                         rules={[{ required: true, message: 'Please input your Current password!' }]}
                         hasFeedback
                       >
                         <Input.Password placeholder="Enter current password"
                         onKeyDown={handleKeyPress}
          onKeyUp={handleKeyPress}
                         />
                       </Form.Item>
            {capsLockOn && (
        <Alert
          message="Caps Lock is ON"
          type="warning"
          showIcon
          style={{ marginTop: '8px' }}
        />
      )}

             <Form.Item
                         label="New Password"
                         name="password"
                         rules={[{ required: true, message: 'Please input your new password!' },
                          ({ getFieldValue }) => ({
                             validator(_, value) {
                               if (getFieldValue('current_password') === value) {
                                 return Promise.reject(
                                 new Error('The password you entered matched with current password!')
                               );
                               }
                               return Promise.resolve();
                             },
                           }),

                         ]}
                         hasFeedback
                       >
                         <Input.Password placeholder="Enter password"  onKeyDown={handleKeyPress}
          onKeyUp={handleKeyPress}/>
                       </Form.Item>
           
                       <Form.Item
                         label="Confirm New Password"
                         name="password_confirmation"
                         dependencies={['password']}
                         hasFeedback
                         rules={[
                           { required: true, message: 'Please confirm your new password!' },
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
                         <Input.Password placeholder="Confirm password"  onKeyDown={handleKeyPress}
          onKeyUp={handleKeyPress}/>
                       </Form.Item>
            
               <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading = {isUpdateLoading}
                block
                style={{ fontWeight: 600, borderRadius: 8 }}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>

        </Space>
      </Card>
    </div>
  );
};

export default ChangeUserPassword;
