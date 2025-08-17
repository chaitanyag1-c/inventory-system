import React, { useEffect } from 'react';
import { Button, Form, Input, Spin, Alert } from 'antd';
import { useShowProductQuery,useUpdateProductMutation } from '../../app/features/productsApi';
import { useNavigate, useParams } from 'react-router-dom';

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, } = useShowProductQuery(id);
  const [updateProduct, { isLoading: isUpdating, isSuccess, isError: isUpdateError }] = useUpdateProductMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      const { name, description, price, sku, quantity } = product;
      form.setFieldsValue({
        name,
        description,
        price,
        sku,
        quantity,
      });
    }
  }, [product, form]);

  const onFinish = async (values) => {
    const { name, description, price, quantity, sku } = values;

    const Product = {
      product: {
        name,
        description,
        price,
        quantity,
        sku,
        id
      },
    };

    try {
      // Call your mutation here
      const result = await updateProduct(Product).unwrap();
      console.log('Product updated successfully!');
    } catch (err) {
      console.log('Error updating product.');
    }
  };

  const onFinishFailed = (errorInfo) => {
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
        🔙 Back
      </Button>

      {/* Show loading spinner while fetching product */}
      {isLoading ? (
        <Spin tip="Loading product..." size="large" />
      ) : isError ? (
        <Alert
          message="Error loading product"
          description={error?.data?.message || 'Something went wrong'}
          type="error"
          showIcon
        />
      ) : (
        <Form
          name="productUpdate"
          form={form}
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
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="SKU"
            name="sku"
            rules={[{ required: true, message: 'Please input SKU!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input quantity!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading= {isUpdating}>
              Update Product
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ProductUpdate;
