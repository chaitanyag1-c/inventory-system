import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button, Layout, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getUserDetail } from '../../app/utils/user';
const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  // Customize these product submenus as needed
  const productMenu = (
    <Menu>
      <Menu.Item key="view-products">
        <Link to="/products">All Products</Link>
      </Menu.Item>
      <Menu.Item key="add-product">
        <Link to="/product/new">Add Product</Link>
      </Menu.Item>
    </Menu>
  );

    const userMenu = (
    <Menu>
      <Menu.Item key="view-details">
        <Link to="/user_details">View Details</Link>
      </Menu.Item>
      <Menu.Item key="change-password">
        <Link to="/change_user_password">Change Password</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Log Out
      </Menu.Item>

    </Menu>
  );

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        background: '#fff',
        boxShadow: '0 2px 8px #f0f1f2',
      }}
    >
      {/* Logo - left */}
      <div style={{ fontWeight: 900, fontSize: 24, color: '#1890ff', letterSpacing: 1,cursor: 'pointer' }} onClick={()=> navigate('/')}>
        MyInventory
      </div>

      {/* Menu - right */}
      <div>
        {!isLoggedIn ? (
          <>
            <Button type="link" onClick={() => navigate('/signin')} style={{ marginRight: 8 }}>
              Sign In
            </Button>
            <Button type="primary" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Dropdown overlay={productMenu}>
              <Button type="link">
                Products <DownOutlined />
              </Button>
            </Dropdown>

            <Dropdown overlay={userMenu}>
              <Button type="link">
               {getUserDetail('name')}  <DownOutlined />
              </Button>
            </Dropdown>

            <Button danger onClick={handleLogout} style={{ marginLeft: 12 }}>
              Log Out
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
