import React, { useState } from "react";
import { useGetProductsQuery } from "../../app/features/productsApi";
import { Button, Space, Input,Row,Col,Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function ProductCatalogList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useGetProductsQuery({ page, per_page: perPage, search });
  


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>⚠️ Error loading products</div>;

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
        cover={<img alt={product.name} src={product.image} />}
      >
        <Card.Meta title={product.name} description={product.description} />
        <p>Price: ${product.price}</p>
      </Card>
    </Col>
  ))}
</Row>



    </>
  );
}
