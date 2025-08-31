import React, { useState } from "react";
import { useGetProductsQuery } from "../../app/features/productsApi";
import { Button, Space, Input, Row, Col, Card, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

export default function ProductCatalogList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useGetProductsQuery({ page, per_page: perPage, search });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>⚠️ Error loading products</div>;

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <h3>Products</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate("/product/new")}>Add Product</Button>
        <Input.Search
          placeholder="Search products"
          allowClear
          onSearch={(value) => {
            setPage(1); // reset to page 1
            setSearch(value);
          }}
          style={{ width: 200 }}
        />
      </Space>

      <Row gutter={[16, 16]}>
        {(data?.data || []).map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              style={{ width: '100%', height: 350, display: 'flex', flexDirection: 'column' }}
              cover={
                <img
                  alt={product.name}
                  src={product.image_url}
                  style={{ height: 180, objectFit: 'cover', width: '100%' }}
                />
              }
            >
              <Card.Meta title={product.name} description={product.description} />
              <p style={{ marginTop: 'auto', fontWeight: 'bold' }}>Price: ${product.price}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Component */}
      {data?.pagination && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination
            current={data.pagination.current_page}
            total={data.pagination.total_count}
            pageSize={perPage}
            showSizeChanger={false}
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}
