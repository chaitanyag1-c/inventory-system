import React from 'react';
import { Button, Card, Typography, Row, Col, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetail } from '../../app/utils/user';
const { Title, Text } = Typography;

const Home = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
 const userName = () => getUserDetail('name');
  return (
    <Row
      style={{
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(120deg, #f0f4ff 0%, #ffffff 100%)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Col xs={22} sm={16} md={12} lg={10} xl={8}>
        <Card
          style={{
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            padding: 32,
            textAlign: 'center',
          }}
        >
          <Title level={2} style={{ color: '#1890ff', fontWeight: 700, marginBottom: 0 }}>
            MyInventory
          </Title>
          <Text type="secondary" style={{ fontSize: 18 }}>
            Efficient Product & Inventory Management
          </Text>

          <div style={{ margin: '36px 0 16px' }}>
            <Text style={{ fontSize: 16 }}>
              Welcome { userName()  } ! Track, manage, and secure your products with ease using our microservices-powered backend and modern UI.
            </Text>
          </div>

          {!token ? (
            <Space>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </Button>
              <Button
                type="default"
                size="large"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </Space>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/products')}
              style={{ margin: '20px 0' }}
            >
              Go To Products
            </Button>
          )}

          <Card
            type="inner"
            style={{ marginTop: 24, borderRadius: 12, background: '#f5faff' }}
            bordered={false}
          >
            <Title level={4} style={{ marginBottom: 12, color: '#1d39c4' }}>
              Why choose MyInventory?
            </Title>
            <ul style={{ textAlign: 'left', margin: 0, padding: 0, listStyle: 'none' }}>
              <li>• Add, view, and manage your products easily</li>
              <li>• Secure JWT-based authentication</li>
              <li>• Built with robust microservices backend</li>
              <li>• Fast, responsive Ant Design interface</li>
            </ul>
          </Card>

          <div style={{ marginTop: 30, color: '#888', fontSize: 13 }}>
            © {new Date().getFullYear()} MyInventory
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
