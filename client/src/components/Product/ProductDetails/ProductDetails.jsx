import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, addReview } from "../../../actions/productAction";
import { addItemsToCart } from "../../../actions/cartAction";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import MetaData from "../../Utility/MetaData";
import { Rating } from "@material-ui/lab";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
} from "@material-ui/core";
import "./productDetails.css";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const { isAuthenticated } = useSelector((state) => state.user);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#ffa506",
  };

  function increaseQuantity() {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  }

  function handleAddToCart() {
    dispatch(addItemsToCart(params.id, quantity));

    navigate("/cart");
  }

  function handleReviewSubmit() {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(addReview(myForm));

    setOpen(false);
  }
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, []);

  return (
    <>
      <div className="product-details-container">
        <Link
          to={url.get("redirectTo") || `..`}
          relative="path"
          className="profile-back-btn"
        >
          &larr; <span>Back</span>
        </Link>
        {product && (
          <>
            {" "}
            <h3 className="product-name">{product.name}</h3>
            <MetaData title={`${product.name} - UrbanBazaar`} />{" "}
          </>
        )}

        <Carousel className="product-img-carousel">
          {product &&
            product.images.map((item, i) => (
              <img
                src={item.url}
                alt={`${i} slides`}
                className="product-img-carousel__item"
                key={item.url}
              />
            ))}
        </Carousel>

        <div className="details-container">
          <div className="product-details">
            {product ? (
              <>
                <div className="product-id">#{product._id}</div>

                <div className="product-rating">
                  {product.rating}
                  <FontAwesomeIcon icon={faStar} className="icon-clr" /> (
                  <span>{product.numOfReviews} reviews</span>)
                </div>

                <h3 className="product-price">
                  {new Intl.NumberFormat("en-HI", {
                    style: "currency",
                    currency: "INR",
                  }).format(product.price)}
                </h3>

                {product.stock >= 1 ? (
                  <>
                    <div className="stock-container">
                      <span
                        className="increase-stock-btn"
                        onClick={decreaseQuantity}
                      >
                        <FontAwesomeIcon icon={faMinus} className="icon-clr" />
                      </span>

                      <input
                        type="number"
                        className="stock-input"
                        min={1}
                        value={quantity}
                        readOnly
                      />

                      <span
                        className="decrease-stock-btn"
                        onClick={increaseQuantity}
                      >
                        <FontAwesomeIcon icon={faAdd} className="icon-clr" />
                      </span>
                    </div>
                    <button
                      disabled={product.stock < 1}
                      className="add-to-cart btn"
                      onClick={handleAddToCart}
                    >
                      {" "}
                      Add To Cart
                    </button>
                  </>
                ) : null}

                <div>
                  Status:{" "}
                  <b
                    className={product.stock < 1 ? "red-color" : "green-color"}
                  >
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </div>

                <button
                  className="submit-review btn"
                  onClick={() => setOpen(true)}
                >
                  Submit Review
                </button>
                <Dialog aria-labelledby="simple-dialog-title" open={open}>
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="dialog-content">
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                    <textarea
                      cols="30"
                      rows="5"
                      className="dialog-text-area"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                      Cancel
                    </Button>
                    <Button color="primary" onClick={handleReviewSubmit}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : null}
          </div>
        </div>
        <nav className="product-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
            className={"product-detail-nav__item"}
          >
            Reviews
          </NavLink>
          <NavLink
            to="description"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            className={"product-detail-nav__item"}
          >
            Description
          </NavLink>
        </nav>
        {product && <Outlet context={{ product }} />}
      </div>
    </>
  );
};

export default ProductDetails;
