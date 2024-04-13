import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminSideBar from "../../Components/Admin/Admin Side Bar/AdminSideBar";
import TableHOC from "../../Components/Table/TableHOC";
import "./CSS/Dashboard.css";
import "./CSS/Products.css";
import { useAllProductsQuery } from "../../Redux/api/productApi";
import { useSelector } from "react-redux";

const columns = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const data = [
  {
    photo: "product1.jpg",
    name: "Product 1",
    price: "$10.99",
    stock: 20,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product2.jpg",
    name: "Product 2",
    price: "$19.99",
    stock: 15,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product3.jpg",
    name: "Product 3",
    price: "$29.99",
    stock: 5,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product4.jpg",
    name: "Product 4",
    price: "$14.50",
    stock: 30,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product5.jpg",
    name: "Product 5",
    price: "$24.99",
    stock: 10,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product6.jpg",
    name: "Product 6",
    price: "$39.99",
    stock: 8,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product7.jpg",
    name: "Product 7",
    price: "$49.99",
    stock: 12,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product8.jpg",
    name: "Product 8",
    price: "$9.99",
    stock: 25,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product9.jpg",
    name: "Product 9",
    price: "$79.99",
    stock: 3,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
  {
    photo: "product10.jpg",
    name: "Product 10",
    price: "$54.99",
    stock: 18,
    action: <Link to={`/admin/products/productchange`}>Manage</Link>,
  },
];

const Products = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { data } = useAllProductsQuery(user?._id);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img src={`http://localhost:5000/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/products/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);
  const Table = TableHOC(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();
  return (
    <div className="admin-container product">
      <AdminSideBar />
      {Table}
      <Link to="/admin/products/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
