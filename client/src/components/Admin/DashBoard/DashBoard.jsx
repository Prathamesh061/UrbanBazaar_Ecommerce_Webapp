import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../Layout/Loader/Loader";
import { Doughnut, Line } from "react-chartjs-2";
import "./dashboard.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAdminProducts } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";
import { getAllUsers } from "../../../actions/userAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Title,
  Legend
);

function DashBoard() {
  const { products } = useSelector((state) => state.products);
  let outOfStock = 0;
  products &&
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock += 1;
      }
    });
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { orders, loading } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["#ffa506"],
        hoverBackgroundColor: ["#ffa506"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#B27092", "#87BAAB"],
        hoverBackgroundColor: ["#B27045"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, []);

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
  }, [user, isAuthenticated]);

  return loading ? (
    <Loader />
  ) : (
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
      <div className="dashboard-main">
        <h2 className="dashboard-header">Dashboard</h2>
        <div className="dashboard-summry">
          <div className="dashboard-total-amount">
            Total Amount <span>3000</span>
          </div>
        </div>

        <div className="dashboard-summary-links">
          <Link to="/admin/products" className="dashboard-summary-link">
            Product <span>{products?.length}</span>
          </Link>
          <Link to="/admin/orders" className="dashboard-summary-link">
            Orders <span>{orders?.length}</span>
          </Link>
          <Link to="/admin/users" className="dashboard-summary-link">
            Users <span>{users?.length}</span>
          </Link>
        </div>

        <div className="chart">
          <Line data={lineState} className="line-chart" />
        </div>

        <div className="doughnut-chart-container">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
