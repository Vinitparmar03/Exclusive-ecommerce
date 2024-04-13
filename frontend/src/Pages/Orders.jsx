import React, { useEffect, useState } from "react";
import TableHOC from "../Components/Table/TableHOC";
import "./CSS/Order.css";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import { useSelector } from "react-redux";
import { useMyOrdersQuery } from "../Redux/api/orderApi";
import "./CSS/Orders.css";

const column = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const Orders = () => {
  const { user } = useSelector((state) => state.userReducer);

  const { isLoading, data } = useMyOrdersQuery(user?.id);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          id: i._id,
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
        }))
      );
  }, [data]);

  const Table = TableHOC(
    column,
    rows,
    "user-orders",
    "Orders",
    rows.length > 6 ? true : false
  )();
  return (
    <div className="my-orders">
      <Breadcrum />
      {isLoading ? <h1>Loading...</h1> : Table}
    </div>
  );
};

export default Orders;
