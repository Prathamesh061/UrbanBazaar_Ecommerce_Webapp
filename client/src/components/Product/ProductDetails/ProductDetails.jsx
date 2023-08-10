import React, { useEffect } from "react";
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../../actions/productAction";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import MetaData from "../../Utility/MetaData";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#ffa506",
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, []);

  return (
    <>
      <div className="product-details-container">
        <Link to={`..`} relative="path" className="back-btn">
          &larr; <span>Back to all products</span>
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

                <div className="stock-container">
                  <span className="increase-stock-btn">
                    <FontAwesomeIcon icon={faAdd} className="icon-clr" />
                  </span>

                  <input type="number" className="stock-input" min={1} />

                  <span className="decrease-stock-btn">
                    <FontAwesomeIcon icon={faMinus} className="icon-clr" />
                  </span>
                </div>
                <button className="add-to-cart btn">Add To Cart</button>

                <div>
                  Status:{" "}
                  <b
                    className={product.stock < 1 ? "red-color" : "green-color"}
                  >
                    {product < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </div>

                <button className="submit-review btn">Submit Review</button>
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
