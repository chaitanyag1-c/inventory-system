import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useAddProductMutation } from '../../app/features/productsApi';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('product[name]', values.name);
    formData.append('product[description]', values.description);
    formData.append('product[price]', values.price);
    formData.append('product[quantity]', values.quantity);
    formData.append('product[sku]', values.sku);
    if (imageFile) {
      formData.append('product[image_file]', imageFile);
    }

    try {
      await addProduct(formData).unwrap();
      console.log('Product created successfully!');
      navigate('/products');
    } catch (err) {
      console.error('Error creating product:', err);
    }
    console.log(formData)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '30px' }}>
      <Button
        type="default"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '20px' }}
      >
        🔙 Back
      </Button>

      <Form
        name="product-add"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="SKU" name="sku" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Product Image">
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
