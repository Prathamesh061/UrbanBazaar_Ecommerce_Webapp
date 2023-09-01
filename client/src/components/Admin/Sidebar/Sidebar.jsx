import React from "react";
import logo from "/site-logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronCircleDown,
  faChevronCircleUp,
  faDashboard,
  faList,
  faListAlt,
  faPlus,
  faStar,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";

function Sidebar({ setOpenDashboardToggle }) {
  return (
    <div className="sidebar-container">
      <div className="close-sidebar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="icon-clr"
          onClick={() => setOpenDashboardToggle(false)}
        />
      </div>
      <Link to="/" className="site-logo-link">
        <img src={logo} alt="UrbanBazaar" className="site-logo" />
      </Link>
      <Link to="/admin/dashboard" className="sidebar-link">
        <div>
          <FontAwesomeIcon icon={faDashboard} className="icon-clr" />
          <span>Dashboard</span>
        </div>
      </Link>
      <Link className="sidebar-link">
        <TreeView
          defaultCollapseIcon={
            <FontAwesomeIcon icon={faChevronCircleDown} className="icon-clr" />
          }
          defaultExpandIcon={
            <FontAwesomeIcon icon={faChevronCircleUp} className="icon-clr" />
          }
        >
          <TreeItem nodeId="1" label="Products">
            <Link to={"/admin/products"} className="sidebar-link">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<FontAwesomeIcon icon={faList} className="icon-clr" />}
              />
            </Link>
            <Link to={"/admin/product"} className="sidebar-link">
              <TreeItem
                nodeId="3"
                label="Create"
                icon={<FontAwesomeIcon icon={faPlus} className="icon-clr" />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to={"/admin/orders"} className="sidebar-link">
        <div>
          <FontAwesomeIcon icon={faListAlt} className="icon-clr" />
          <span>Orders</span>
        </div>
      </Link>
      <Link to={"/admin/users"} className="sidebar-link">
        <div>
          <FontAwesomeIcon icon={faUserAlt} className="icon-clr" />
          <span>Users</span>
        </div>
      </Link>
      <Link to={"/admin/reviews"} className="sidebar-link">
        <div>
          <FontAwesomeIcon icon={faStar} className="icon-clr" />
          <span>Reviews</span>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
