import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAlert } from "../../../contexts/alertContext";
import {
  getAllReviews,
  deleteReviews,
  clearErrors,
} from "../../../actions/productAction";
import { Button } from "@material-ui/core";
import MetaData from "../../Utility/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../Layout/Loader/Loader";
import "./adminProductReviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDeleteLeft,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import {
  ALL_REVIEW_RESET,
  DELETE_REVIEW_RESET,
} from "../../../constants/productConstants";

function AdminProductReviews() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  function handleReviewDeletion(reviewId) {
    dispatch(deleteReviews(reviewId, productId));
  }

  function handleProductReviewsSubmit(e) {
    e.preventDefault();

    dispatch({ type: ALL_REVIEW_RESET });
    dispatch(getAllReviews(productId));
  }
  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 100, flex: 0.3 },
    { field: "user", headerName: "User", minWidth: 150, flex: 0.3 },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 150,
      flex: 0.3,
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
            <Button>
              <FontAwesomeIcon
                icon={faDeleteLeft}
                className="icon-clr"
                onClick={() =>
                  handleReviewDeletion(params.getValue(params.id, "id"))
                }
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
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
      alert("Review successfully deleted!", "success");
      navigate("/admin/reviews");
      dispatch({
        type: DELETE_REVIEW_RESET,
      });
      dispatch(getAllReviews(productId));
    }
  }, [dispatch, isDeleted, deleteError, error, reviews, loading]);
  return (
    <>
      <MetaData title="ALL REVIEWS : Admin" />
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
        <div className="product-review-container">
          <form
            className="product-review-form"
            onSubmit={handleProductReviewsSubmit}
          >
            <h3 className="dashboard-header create-product-header">
              Get Reviews
            </h3>
            <div className="product-namy">
              <FontAwesomeIcon icon={faIdBadge} className="icon-clr" />
              <input
                type="text"
                placeholder="Product ID..."
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              className="user-update-btn btn"
              type="submit"
              disabled={loading || !productId}
            >
              Get
            </button>
          </form>
          {loading ? (
            <Loader />
          ) : reviews?.length > 0 ? (
            <>
              {" "}
              <h3 className="dashboard-header product-list-container__header">
                All REVIEWS
              </h3>
              <DataGrid
                columns={columns}
                rows={rows}
                pageSize={10}
                disableSelectionOnClick
                className="product-list-table"
                autoHeight
              />
            </>
          ) : (
            <div className="empty-cart">
              <h3>No reviews yet!</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminProductReviews;
