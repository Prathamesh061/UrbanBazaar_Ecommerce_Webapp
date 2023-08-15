import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Slider from "@material-ui/core/Slider";
import "./products.css";
import MetaData from "../Utility/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Electronics",
  "Smartphones",
];

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [filterBoxOpen, setFilterBoxOpen] = useState(false);
  const dispatch = useDispatch();
  const { productName } = useParams();
  const navigate = useNavigate();

  const {
    products,
    loading,
    productsCount,
    filteredProductsCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  function priceHandler(event, newPrice) {
    setPrice(newPrice);
  }

  function ratingHandler(e, newRating) {
    setRatings(newRating);
  }

  function handleFilterClear(e) {
    e.preventDefault();
    setCurrentPage(1);
    setPrice([0, 50000]);
    setCategory("");
    setRatings(0);
    navigate(`/products`);
    setFilterBoxOpen(false);
  }

  function handleFilterState() {
    setFilterBoxOpen((prevState) => !prevState);
  }

  function handleBlurClick() {
    setFilterBoxOpen(false);
  }

  useEffect(() => {
    setCurrentPage(1);
    dispatch(getProduct({ productName, page: 1, price, category, ratings }));
  }, [productName, ratings, category, price]);

  useEffect(() => {
    dispatch(
      getProduct({ productName, page: currentPage, price, category, ratings })
    );
  }, [dispatch, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Products - UrbanBazaar`} />
          <div className="products">
            <h2 className="products-header">Products</h2>
            <a href="#" className="btn filter-btn" onClick={handleFilterState}>
              Filters
            </a>
            <div className="product-container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div
              className={`${filterBoxOpen ? "filter-box-open-cover" : ""}`}
              onClick={handleBlurClick}
            ></div>

            <div
              className={`filter-box ${filterBoxOpen ? "filter-box-open" : ""}`}
            >
              <div className="price-box">
                <div className="filter-header">Price</div>
                <Slider
                  className="price-box__slider"
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="on"
                  aria-label="range-slider"
                  min={0}
                  step={500}
                  max={50000}
                />
              </div>
              <div className="filter-header">Categories</div>
              <ul className="category-box">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="category-box__item"
                    onClick={() => {
                      setCategory(category);
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <div className="ratings-box">
                <div className="filter-header">Ratings</div>
                <Slider
                  className="ratings-box__slider"
                  value={ratings}
                  onChange={ratingHandler}
                  marks
                  valueLabelDisplay="on"
                  step={0.5}
                  aria-label="continuous-slider"
                  min={0}
                  max={5}
                />
              </div>
              <a
                href="#"
                className="btn filter-box__clear"
                onClick={handleFilterClear}
              >
                Clear
              </a>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              productsCount={filteredProductsCount}
              resultPerPage={resultPerPage}
            />
          </div>
        </>
      )}
    </>
  );
}
export default Products;
