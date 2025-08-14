import React from "react";
import { useGetProductsQuery } from "../app/features/productsApi";
import { Space, Table, Tag } from 'antd';
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const { data: products, error, isLoading } = useGetProductsQuery();
 const navigate = useNavigate(); 
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
    {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },

  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: text => <a>{parseInt(text)}</a>,
  },
    {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
      {
    title: 'quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
    {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={()=>{handlegridClick(record)}}>Show</a>
        
        <a onClick={()=>{handleEditClick(record)}}>Edit</a>

      </Space>
    ),
  },
] 

const handlegridClick = (record) =>{
console.log(record.id)
navigate(`/products/${record.id}`)
}
const handleEditClick = (record) =>{
    console.log(record.id)
    navigate(`/products/update/${record.id}`)
}

  if (isLoading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">⚠️ Error loading products</div>;
  }
if (products)
    {


  return (
    <>
    {/* <section style={styles.container}>
      <h2 style={styles.heading}>🛒 Product List</h2>
      {products.length === 0 ? (
        <p style={styles.empty}>No products available.</p>
      ) : (
        <ul style={styles.list}>
          {products.map(({ id, name, price }) => (
            <li key={id} style={styles.item}>
              <span style={styles.name}>{name}</span>
              <span style={styles.price}>₹{parseFloat(price)}</span>
            </li>
          ))}
        </ul>
      )}
    </section> */}
    <h3>Products</h3>
    <Table columns={columns} dataSource={products} />;
    </>
  );
}
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },
  heading: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid #eee",
  },
  name: {
    fontWeight: "500",
  },
  price: {
    color: "#007bff",
    fontWeight: "bold",
  },
};
