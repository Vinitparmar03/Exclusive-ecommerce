import React from "react";
import TableHOC from "../../Components/Table/TableHOC";
import { Link } from "react-router-dom";
import AdminSideBar from "../../Components/Admin/Admin Side Bar/AdminSideBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAllOrdersQuery } from "../../Redux/api/orderApi";
import "./CSS/Dashboard.css";
import Skeleton from "../../Components/Skeleton/Skeleton";

const columns = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transactions = () => {
  const { user } = useSelector((state) => state.userReducer);

  const { isLoading, data } = useAllOrdersQuery(user?.id);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          user: i.user.name,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transactions/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);
  const Table = TableHOC(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container transaction">
      <AdminSideBar />
      {isLoading ? <Skeleton length={20} /> : Table}
    </div>
  );
};

export default Transactions;
