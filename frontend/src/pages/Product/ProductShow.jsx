import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyShowProductQuery } from '../../app/features/productsApi';
import { Card, Col, Row, Spin, Alert, Typography, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ProductShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Hook to navigate to the previous page

  // Destructure the lazy query hook
  const [trigger, { data: product, error, isLoading }] = useLazyShowProductQuery();

  useEffect(() => {
    // Only trigger the query if there's an id in the URL
    if (id) {
      trigger(id);
    }
  }, [id, trigger]);

  // Loader spinner
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Spin indicator={antIcon} />
        </div>
      )}

      {error && !isLoading && (
        <Alert message="Error" description={error.message} type="error" showIcon />
      )}

      {!isLoading && !error && product && (
        <Row justify="center">
          
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<img alt={product.name} src= {product.image_url} />}
              style={{ width: 300, marginTop: 20 }}
            >
              <Title level={2}>{product.name}</Title>
              <Paragraph>{product.description}</Paragraph>
              <Title level={4}>Price: ${product.price}</Title>
            </Card>
          </Col>
        </Row>
      )}

      {!product && !isLoading && !error && (
        <Alert message="Product Not Found" description="Sorry, the product could not be found." type="warning" showIcon />
      )}
    </div>
  );
};

export default ProductShow;
