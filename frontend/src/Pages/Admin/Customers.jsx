import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import TableHOC from "../../Components/Table/TableHOC";
import AdminSideBar from "../../Components/Admin/Admin Side Bar/AdminSideBar";
import "./CSS/Dashboard.css";
import "./CSS/Products.css";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../Redux/api/userApi";
import { useSelector } from "react-redux";
import userDP from "../../assets/userDP.jpg";
import "./CSS/Dashboard.css";

const columns = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [rows, setRows] = useState([]);

  const { data } = useAllUsersQuery(user?.id);
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    const res = await deleteUser({ userId, adminUserId: user?.id });
    console.log(res);
  };

  useEffect(() => {
    if (data && data.users) {
      setRows(
        data?.users.map((i) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={i.photo || userDP}
              alt={i.name}
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <MdDelete />
            </button>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container customer">
      <AdminSideBar />
      {Table}
    </div>
  );
};

export default Customers;
