import React, { useState } from "react";
import { useGetProductsQuery, useDeleteProductMutation } from "../../app/features/productsApi";
import { Button, Space, Table, Popconfirm, Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useGetProductsQuery({ page, per_page: perPage, search });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (record) => {
    try {
      await deleteProduct(record.id).unwrap();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price", render: (text) => `₹${parseFloat(text)}`,sorter: (a, b) => a.price - b.price },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Deleted At",
      dataIndex: "deleted_at",
      key: "deleted_at",
      render: (text) =>
        text ? new Date(text).toLocaleString("en-US") : <span style={{ color: "#999" }}>Not deleted</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/products/${record.id}`)}>Show</Button>
          <Button type="link" onClick={() => navigate(`/products/update/${record.id}`)}>Edit</Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger loading={isDeleting}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.data || []}
        pagination={{
          current: data?.pagination?.current_page || 1,
          pageSize: perPage,
          total: data?.pagination?.total_count || 0,
          onChange: (page, pageSize) => {
            setPage(page);
            setPerPage(pageSize);
          },
        }}
      />
    </>
  );
}
