import React from 'react';

import { Button, Checkbox, Form, Input  } from 'antd';
import { useAddProductMutation } from '../../app/features/productsApi';
import { useNavigate } from 'react-router-dom';




const ProductAdd = () => {
  const [addProduct, { isLoading, isSuccess, isError }] = useAddProductMutation();
  const navigate = useNavigate()
  const onFinish = async (values) => {
  console.log('Success:', values);
  const {name,description,price,quantity,sku} = values
  console.log(name)
  console.log(description)

  const Product = {
    "product":{
        "name": name,
        "description": description,
        "price": price,
        "quantity": quantity,
        "sku": sku
    }
  };
  try
  {
    const result = await addProduct(Product).unwrap();
      console.log('Product updated successfully!');
  }
  catch (err) {
      console.log('Error updating product.');
    }
  
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
  
  return (
    <div style={{ padding: '30px' }}>
      {/* Back Button */}
      <Button 
        type="default" 
        
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '20px' }}
      >
        🔙Back
      </Button>

     

    
     <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please input your desc!' }]}
    >
      <Input />
    </Form.Item>

        <Form.Item
      label="sku"
      name="sku"
      rules={[{ required: true, message: 'Please input your desc!' }]}
    >
      <Input />
    </Form.Item>

     <Form.Item
      label="Price"
      name="price"
      rules={[{ required: true, message: 'Please input your desc!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Quantity"
      name="quantity"
      rules={[{ required: true, message: 'Please input your desc!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
     

     
    </div>
  );
};

export default ProductAdd;
