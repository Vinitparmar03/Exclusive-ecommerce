import TableHOC from "../../Table/TableHOC";
import "./DashboardTable.css";

const columns = [
  {
    Header: "Id",
    accessor: "_id",
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

const DashboardTable = ({ data = [] }) => {
  return TableHOC(columns, data, "transaction-box", "Top transaction")();
};

export default DashboardTable;
