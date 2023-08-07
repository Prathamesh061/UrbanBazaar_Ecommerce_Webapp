import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import "./products.css";
import { useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import RangeSlider from "../RangeSlider/RangeSlider";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { productName } = useParams();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct({ productName, page: currentPage }));
  }, [dispatch, productName, currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="products">
            <h2 className="products-header">Products</h2>
            <div className="product-container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="filter-container">
              <h3 className="products-filter">Filters</h3>
              <div className="filter-list">
                <div className="filter-item">
                  {<RangeSlider min={100} max={500} />}
                </div>
                <div className="filter-item">Size</div>
                <div className="filter-item">Color</div>
              </div>
            </div>
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
}
export default Products;
