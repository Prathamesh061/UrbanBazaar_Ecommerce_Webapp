import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../../Utility/MetaData";
import Loader from "../../Layout/Loader/Loader";
import { DataGrid } from "@material-ui/data-grid";
import "./orders.css";
import { myOrders } from "../../../actions/orderAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "delivered"
          ? "message"
          : "error";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <FontAwesomeIcon icon={faLocationArrow} className="icon-clr" />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: new Intl.NumberFormat("en-HI", {
          style: "currency",
          currency: "INR",
        }).format(item.totalPrice),
      });
    });
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }
    dispatch(myOrders());
  }, []);
  return (
    <>
      <MetaData title={`Orders || UrbanBazaar`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="orders-container">
          <h3 className="orders-heading">{`${user.name}'s orders`}</h3>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="orders-table"
            autoHeight
          />
        </div>
      )}
    </>
  );
}

export default Orders;
