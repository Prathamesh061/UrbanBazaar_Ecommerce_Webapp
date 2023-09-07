import { DataGrid } from "@material-ui/data-grid";
import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAlert } from "../../../contexts/alertContext";
import { Button } from "@material-ui/core";
import MetaData from "../../Utility/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import "./users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDeleteLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { deleteUser, getAllUsers } from "../../../actions/userAction";
import { clearErrors } from "../../../actions/productAction";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import Loader from "../../Layout/Loader/Loader";

function Users() {
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const alert = useAlert();

  function handleDeleteUser(id) {
    dispatch(deleteUser(id));
  }

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 100, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "message upperCase"
          : "error upperCase";
      },
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <FontAwesomeIcon icon={faEdit} className="icon-clr" />
            </Link>
            <Button>
              <FontAwesomeIcon
                icon={faDeleteLeft}
                className="icon-clr"
                onClick={() =>
                  handleDeleteUser(params.getValue(params.id, "id"))
                }
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      });
    });

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
      alert(message, "success");
      navigate("/admin/users");
      dispatch({
        type: DELETE_USER_RESET,
      });
    }
    dispatch(getAllUsers());
  }, [dispatch, isDeleted, deleteError, error, message]);
  return (
    <>
      <MetaData title="Products : Admin" />
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
        {loading ? (
          <Loader />
        ) : (
          <div className="dashboard-main product-list-container">
            <h2 className="dashboard-header product-list-container__header">
              All PRODUCTS
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
        )}
      </div>
    </>
  );
}

export default Users;
