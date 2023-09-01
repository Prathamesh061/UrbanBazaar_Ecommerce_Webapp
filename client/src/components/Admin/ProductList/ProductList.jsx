import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { clearErrors, getAdminProducts } from "../../../actions/productAction";
import { Button } from "@material-ui/core";
import MetaData from "../../Utility/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import "./productList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDeleteLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

function ProductList() {
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { products, error } = useSelector((state) => state.products);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 100, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      flex: 0.5,
      type: "number",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <FontAwesomeIcon icon={faEdit} className="icon-clr" />
            </Link>
            <Button>
              <FontAwesomeIcon icon={faDeleteLeft} className="icon-clr" />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: new Intl.NumberFormat("en-HI", {
          style: "currency",
          currency: "INR",
        }).format(item.price),
        name: item.name,
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
    dispatch(getAdminProducts());
  }, []);
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
      </div>
    </>
  );
}

export default ProductList;
