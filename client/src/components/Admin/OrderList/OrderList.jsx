import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAlert } from "../../../contexts/alertContext";
import {
  clearErrors,
  getAllOrders,
  deleteOrder,
} from "../../../actions/orderAction";
import { Button } from "@material-ui/core";
import MetaData from "../../Utility/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import "./orderList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDeleteLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";

function OrderList() {
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { orders, error } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  function handleOrderDelete(id) {
    dispatch(deleteOrder(id));
  }
  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 150,
      flex: 0.5,
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
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <FontAwesomeIcon icon={faEdit} className="icon-clr" />
            </Link>
            <Button>
              <FontAwesomeIcon
                icon={faDeleteLeft}
                className="icon-clr"
                onClick={() =>
                  handleOrderDelete(params.getValue(params.id, "id"))
                }
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.orderItems.length,
        amount: new Intl.NumberFormat("en-HI", {
          style: "currency",
          currency: "INR",
        }).format(item.totalPrice),
        status: item.orderStatus,
      });
    });

  console.log(isDeleted);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    } else if (user.role && user.role !== "admin") {
      navigate(
        `/login?message=Dashboard: Only Admin View.&login=active&redirectTo=${location.pathname}`
      );
    }

    if (error) {
      alert(error, "errory");
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError, "errory");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Order successfully deleted!", "success");
      navigate("/admin/orders");
      dispatch({
        type: DELETE_ORDER_RESET,
      });
    }

    dispatch(getAllOrders());
  }, [dispatch, isDeleted, deleteError]);
  return (
    <>
      <MetaData title="Orders : Admin" />
      <div className="dashboard-container">
        <div className="dashboard-toggle" aria-label="dashboard toggler">
          {!openDashboardToggle ? (
            <FontAwesomeIcon
              icon={faBars}
              className="icon-clr"
              onClick={() => setOpenDashboardToggle(true)}
            />
          ) : null}
        </div>
        <div
          className={`dashboard-sidebar-container ${
            openDashboardToggle ? "show" : ""
          }`}
        >
          <Sidebar setOpenDashboardToggle={setOpenDashboardToggle} />
        </div>
        <div className="dashboard-main product-list-container">
          <h2 className="dashboard-header product-list-container__header">
            All ORDERS
          </h2>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            disableSelectionOnClick
            className="product-list-table"
            autoHeight
          />
        </div>
      </div>
    </>
  );
}

export default OrderList;
